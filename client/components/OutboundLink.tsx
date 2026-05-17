import type { AnchorHTMLAttributes } from 'react';

type OutboundLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  newTab?: boolean;
  nofollow?: boolean;
};

const mergeRel = (existing: string | undefined, additions: string[]) =>
  [...new Set([...(existing?.split(/\s+/).filter(Boolean) || []), ...additions])].join(' ');

const OutboundLink = ({
  href,
  rel,
  target,
  newTab = true,
  nofollow = true,
  ...props
}: OutboundLinkProps) => {
  const shouldOpenInNewTab = newTab || target === '_blank';
  const relTokens = ['external'];

  if (shouldOpenInNewTab) {
    relTokens.push('noopener', 'noreferrer');
  }

  if (nofollow) {
    relTokens.push('nofollow');
  }

  return (
    <a
      {...props}
      href={href}
      target={shouldOpenInNewTab ? '_blank' : target}
      rel={mergeRel(rel, relTokens)}
    />
  );
};

export default OutboundLink;

