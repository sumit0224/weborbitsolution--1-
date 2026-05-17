#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const inferRoot = async () => {
  const currentHasClient = await fs
    .stat(path.join(cwd, 'client'))
    .then((stat) => stat.isDirectory())
    .catch(() => false);
  const currentHasServer = await fs
    .stat(path.join(cwd, 'server'))
    .then((stat) => stat.isDirectory())
    .catch(() => false);

  if (currentHasClient || currentHasServer) {
    return cwd;
  }

  return path.resolve(cwd, '..');
};
const directoryExists = async (directoryPath) =>
  fs
    .stat(directoryPath)
    .then((stat) => stat.isDirectory())
    .catch(() => false);
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.html', '.md']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'dist', 'public', '.git']);
const REQUEST_TIMEOUT_MS = 10000;
const NETWORK_CONCURRENCY = 6;
const IGNORED_OUTBOUND_CHECK_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com\/?$/i,
  /^https:\/\/fonts\.gstatic\.com\/?$/i,
  /^https:\/\/www\.googletagmanager\.com\/?$/i,
  /^https:\/\/www\.clarity\.ms\/tag\/?$/i,
  /^https:\/\/api\.openai\.com\/v1\/chat\/completions\/?$/i,
];

const isStaticExternalUrl = (value) =>
  typeof value === 'string' &&
  /^https?:\/\//i.test(value) &&
  !value.includes('${') &&
  !value.includes('schema.org');

const isHttpNonLocal = (url) =>
  /^http:\/\//i.test(url) &&
  !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(url);

const normalizeRelTokens = (rel) =>
  String(rel || '')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

const findLine = (content, index) => content.slice(0, index).split('\n').length;

const walkFiles = async (startPath) => {
  const found = [];

  const walk = async (currentPath) => {
    const stat = await fs.stat(currentPath).catch(() => null);
    if (!stat) return;

    if (stat.isDirectory()) {
      const base = path.basename(currentPath);
      if (SKIP_DIRS.has(base)) return;

      const entries = await fs.readdir(currentPath);
      await Promise.all(entries.map((entry) => walk(path.join(currentPath, entry))));
      return;
    }

    if (!SOURCE_EXTENSIONS.has(path.extname(currentPath))) return;
    found.push(currentPath);
  };

  await walk(startPath);
  return found;
};

const parseFile = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf8').catch(() => '');
  if (!content) return null;

  const issues = {
    externalDofollow: [],
    missingRel: [],
    targetWithoutNoopener: [],
    hardcodedUrls: [],
    httpLinks: [],
    externalUrls: [],
  };

  const anchorPattern = /<a\b[\s\S]*?>/g;
  let anchorMatch;

  while ((anchorMatch = anchorPattern.exec(content)) !== null) {
    const anchorTag = anchorMatch[0];
    const line = findLine(content, anchorMatch.index);

    const hrefMatch =
      anchorTag.match(/href\s*=\s*["']([^"']+)["']/i) ||
      anchorTag.match(/href\s*=\s*\{`([^`]+)`\}/i);

    const href = hrefMatch?.[1] || '';
    if (!/^https?:\/\//i.test(href)) continue;

    issues.externalUrls.push(href);

    const relMatch = anchorTag.match(/rel\s*=\s*["']([^"']+)["']/i);
    const rel = relMatch?.[1] || '';
    const relTokens = normalizeRelTokens(rel);

    if (!rel) {
      issues.missingRel.push({ filePath, line, href });
    }

    if (!relTokens.includes('nofollow')) {
      issues.externalDofollow.push({ filePath, line, href });
    }

    const targetBlank =
      /target\s*=\s*["_']_blank["_']/i.test(anchorTag) ||
      /target\s*=\s*\{"_blank"\}/i.test(anchorTag) ||
      /target\s*=\s*\{'_blank'\}/i.test(anchorTag);

    if (targetBlank && !relTokens.includes('noopener')) {
      issues.targetWithoutNoopener.push({ filePath, line, href });
    }

    if (isHttpNonLocal(href)) {
      issues.httpLinks.push({ filePath, line, href });
    }
  }

  const urlLiteralPattern = /https?:\/\/[^\s"'`<>)}]+/g;
  let urlMatch;
  while ((urlMatch = urlLiteralPattern.exec(content)) !== null) {
    const url = String(urlMatch[0]).replace(/[;,]+$/, '');
    const line = findLine(content, urlMatch.index);
    if (!isStaticExternalUrl(url)) continue;

    issues.hardcodedUrls.push({ filePath, line, url });
  }

  return issues;
};

const withTimeout = async (promise, timeoutMs) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await promise(controller.signal);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

const checkUrl = async (url) => {
  const test = async (method, signal) => {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal,
      headers: { 'user-agent': 'LinkAudit/1.0 (+https://www.weborbitsolution.in)' },
    });
    return response.status;
  };

  let status = await withTimeout((signal) => test('HEAD', signal), REQUEST_TIMEOUT_MS);
  if (status === null || status === 405) {
    status = await withTimeout((signal) => test('GET', signal), REQUEST_TIMEOUT_MS);
  }

  if (status === null) return { url, status: 'unreachable', severity: 'high' };
  if (status >= 200 && status < 400) return { url, status, severity: 'none' };
  if ([401, 403, 429, 999].includes(status)) return { url, status, severity: 'medium' };
  return { url, status, severity: 'high' };
};

const runInBatches = async (items, worker, batchSize) => {
  const output = [];
  for (let index = 0; index < items.length; index += batchSize) {
    const batch = items.slice(index, index + batchSize);
    const batchResults = await Promise.all(batch.map(worker));
    output.push(...batchResults);
  }
  return output;
};

const dedupeByLocation = (items, keyFn) => {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, item);
  }
  return [...map.values()];
};

const main = async () => {
  const root = await inferRoot();
  const candidateDirs = ['client', 'server'].map((dir) => path.join(root, dir));
  const sourceDirs = (
    await Promise.all(
      candidateDirs.map(async (dir) => ((await directoryExists(dir)) ? dir : null)),
    )
  ).filter(Boolean);

  const allFiles = (
    await Promise.all(
      sourceDirs.map((dir) => walkFiles(dir).catch(() => [])),
    )
  ).flat();

  const aggregate = {
    externalDofollow: [],
    missingRel: [],
    targetWithoutNoopener: [],
    hardcodedUrls: [],
    httpLinks: [],
    externalUrls: [],
  };

  const parsed = await Promise.all(allFiles.map(parseFile));
  parsed.filter(Boolean).forEach((entry) => {
    aggregate.externalDofollow.push(...entry.externalDofollow);
    aggregate.missingRel.push(...entry.missingRel);
    aggregate.targetWithoutNoopener.push(...entry.targetWithoutNoopener);
    aggregate.hardcodedUrls.push(...entry.hardcodedUrls);
    aggregate.httpLinks.push(...entry.httpLinks);
    aggregate.externalUrls.push(...entry.externalUrls);
  });

  aggregate.externalDofollow = dedupeByLocation(
    aggregate.externalDofollow,
    (item) => `${item.filePath}:${item.line}:${item.href}`,
  );
  aggregate.missingRel = dedupeByLocation(
    aggregate.missingRel,
    (item) => `${item.filePath}:${item.line}:${item.href}`,
  );
  aggregate.targetWithoutNoopener = dedupeByLocation(
    aggregate.targetWithoutNoopener,
    (item) => `${item.filePath}:${item.line}:${item.href}`,
  );
  aggregate.hardcodedUrls = dedupeByLocation(
    aggregate.hardcodedUrls,
    (item) => `${item.filePath}:${item.line}:${item.url}`,
  );
  aggregate.httpLinks = dedupeByLocation(
    aggregate.httpLinks,
    (item) => `${item.filePath}:${item.line}:${item.href}`,
  );

  const outboundCandidates = [
    ...new Set([
      ...aggregate.externalUrls,
      ...aggregate.hardcodedUrls.map((item) => item.url),
    ]),
  ]
    .filter((url) => isStaticExternalUrl(url))
    .filter((url) => !url.includes('localhost'))
    .filter((url) => !url.includes('*'))
    .filter((url) => !IGNORED_OUTBOUND_CHECK_PATTERNS.some((pattern) => pattern.test(url)))
    .slice(0, 250);

  const brokenOutbound = await runInBatches(outboundCandidates, checkUrl, NETWORK_CONCURRENCY);

  const report = {
    scannedFiles: allFiles.length,
    counts: {
      externalDofollow: aggregate.externalDofollow.length,
      missingRel: aggregate.missingRel.length,
      targetWithoutNoopener: aggregate.targetWithoutNoopener.length,
      hardcodedUrls: aggregate.hardcodedUrls.length,
      httpLinks: aggregate.httpLinks.length,
      outboundUrlsChecked: brokenOutbound.length,
      brokenOrBlockedOutbound: brokenOutbound.filter((item) => item.severity !== 'none').length,
    },
    details: {
      externalDofollow: aggregate.externalDofollow,
      missingRel: aggregate.missingRel,
      targetWithoutNoopener: aggregate.targetWithoutNoopener,
      httpLinks: aggregate.httpLinks,
      hardcodedUrls: aggregate.hardcodedUrls,
      outboundUrlChecks: brokenOutbound,
    },
  };

  console.log(JSON.stringify(report, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
