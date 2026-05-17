import type { MetadataRoute } from 'next';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { blogPosts } from '../data/blogPosts';
import { seoGeneratedPageSlugs } from '../data/seoGeneratedPages';
import { siteConfig } from '../lib/seo';

const trimSlash = (value: string) => value.replace(/\/+$/, '');
const REQUEST_TIMEOUT_MS = 3_500;
const ROOT_DIR = process.cwd();
const mtimesCache = new Map<string, Date | null>();

const getBlogApiBaseUrl = () => {
  const configured = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
  if (configured) {
    return trimSlash(configured);
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:4000';
  }

  return '';
};

type BlogPostEntry = {
  slug?: string;
  date?: string;
  published?: boolean;
};

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  generated?: boolean;
};
type SitemapEntry = MetadataRoute.Sitemap[number];

const toAppFilePath = (routePath: string) => {
  if (!routePath || routePath === '/') {
    return 'app/page.tsx';
  }

  return `app${routePath}/page.tsx`;
};

const readFileMtime = async (relativePath: string): Promise<Date | null> => {
  if (mtimesCache.has(relativePath)) {
    return mtimesCache.get(relativePath) || null;
  }

  const absolutePath = path.join(ROOT_DIR, relativePath);
  try {
    const fileStat = await stat(absolutePath);
    const mtime = fileStat.mtime;
    mtimesCache.set(relativePath, mtime);
    return mtime;
  } catch {
    mtimesCache.set(relativePath, null);
    return null;
  }
};

const latestDate = (dates: Array<Date | null>, fallback = new Date()) => {
  const validDates = dates.filter((date): date is Date => !!date);
  if (validDates.length === 0) {
    return fallback;
  }

  return validDates.reduce((latest, current) => (current > latest ? current : latest), validDates[0]);
};

const resolveRouteSourceFiles = (route: RouteConfig) => {
  if (route.generated) {
    return ['app/[slug]/page.tsx', 'data/seoGeneratedPages.ts'];
  }

  const routePath = route.path || '/';
  const sourceFiles = [toAppFilePath(routePath)];

  if (routePath.startsWith('/tools/')) {
    sourceFiles.push(`app${routePath}/page.tsx`);
  }

  if (routePath === '/services' || routePath === '/seo-services-in-india') {
    sourceFiles.push('data/serviceSeoPages.ts');
  }

  return sourceFiles;
};

const routeIsIndexable = async (route: RouteConfig) => {
  if (route.generated) {
    const generatedTemplateExists = await readFileMtime('app/[slug]/page.tsx');
    return !!generatedTemplateExists;
  }

  const routeFile = toAppFilePath(route.path || '/');
  return !!(await readFileMtime(routeFile));
};

const fetchLiveBlogPosts = async (): Promise<BlogPostEntry[]> => {
  const apiBase = getBlogApiBaseUrl();
  if (!apiBase) {
    return [];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiBase}/api/blog/posts?limit=500`, {
      next: { revalidate: 900 },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json().catch(() => ({}))) as { posts?: BlogPostEntry[] };
    return Array.isArray(data.posts) ? data.posts : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const toolRoutes = [
    '/tools',
    '/tools/website-speed-checker',
    '/tools/meta-tag-analyzer',
    '/tools/keyword-density-checker',
    '/tools/sitemap-generator',
  ] as const;

  const baseStaticRoutes: RouteConfig[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/seo-services-in-india', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/react-js-development-company', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mobile-app-development-company', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/custom-software-development-india', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/website-development-company-in-india', priority: 0.9, changeFrequency: 'weekly' as const },
    {
      path: '/website-app-saas-development-company-india',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    { path: '/website-development-company-mumbai', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/app-development-company-bangalore', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/saas-development-company-hyderabad', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/work', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    ...toolRoutes.map((path) => ({ path, priority: 0.75, changeFrequency: 'weekly' as const })),
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/refund', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const generatedRoutes: RouteConfig[] = seoGeneratedPageSlugs.map((slug) => ({
    path: `/${slug}`,
    priority: 0.82,
    changeFrequency: 'weekly' as const,
    generated: true,
  }));

  const routeMap = new Map<string, RouteConfig>();
  [...baseStaticRoutes, ...generatedRoutes].forEach((route) => {
    routeMap.set(route.path, route);
  });
  const staticRoutes = [...routeMap.values()];

  const staticEntryCandidates = await Promise.all(
    staticRoutes.map(async (route) => {
      const isIndexable = await routeIsIndexable(route);
      if (!isIndexable) {
        return null;
      }

      const sourceFiles = resolveRouteSourceFiles(route);
      const lastModified = latestDate(await Promise.all(sourceFiles.map(readFileMtime)));

      return {
        url: `${siteConfig.url}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      };
    }),
  );
  const staticEntries = staticEntryCandidates.filter(Boolean) as SitemapEntry[];

  const liveBlogPosts = await fetchLiveBlogPosts();
  const fallbackBlogPosts = blogPosts
    .filter((post) => post.published !== false)
    .map((post) => ({ slug: post.slug, date: post.date, published: post.published }));

  const mergedPosts = new Map<string, BlogPostEntry>();
  [...fallbackBlogPosts, ...liveBlogPosts].forEach((post) => {
    const slug = String(post.slug || '').trim();
    if (!slug || post.published === false) {
      return;
    }
    mergedPosts.set(slug, post);
  });

  const blogTemplateLastModified = latestDate(
    await Promise.all([readFileMtime('app/blog/[slug]/page.tsx'), readFileMtime('data/blogPosts.ts')]),
  );

  const blogEntries: SitemapEntry[] = [...mergedPosts.values()].map((post) => {
    const parsedDate = post.date ? new Date(post.date) : new Date();
    const publishedDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    const lastModified = publishedDate > blogTemplateLastModified ? publishedDate : blogTemplateLastModified;

    return {
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
