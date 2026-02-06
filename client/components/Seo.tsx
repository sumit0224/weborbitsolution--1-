import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const upsertMetaTag = (selector: string, attrs: Record<string, string>) => {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => {
      element!.setAttribute(key, value);
    });
    document.head.appendChild(element);
  } else {
    Object.entries(attrs).forEach(([key, value]) => {
      element!.setAttribute(key, value);
    });
  }
};

const upsertLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

const upsertJsonLd = (data?: Record<string, unknown> | Array<Record<string, unknown>>) => {
  const id = 'seo-jsonld';
  const existing = document.getElementById(id);
  if (!data) {
    if (existing) {
      existing.remove();
    }
    return;
  }
  const script = existing || document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  if (!existing) {
    document.head.appendChild(script);
  }
};

const Seo = ({ title, description, path, image, type = 'website', jsonLd }: SeoProps) => {
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const canonicalUrl = `${baseUrl}${path === '/' ? '' : path}`;
    const existingOgImage =
      document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
    const metaImage = image || import.meta.env.VITE_OG_IMAGE || existingOgImage;

    document.title = title;

    upsertMetaTag('meta[name="description"]', { name: 'description', content: description });
    upsertMetaTag('meta[name="robots"]', { name: 'robots', content: 'index, follow' });

    upsertMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMetaTag('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    if (metaImage) {
      upsertMetaTag('meta[property="og:image"]', { property: 'og:image', content: metaImage });
      upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: metaImage });
    }

    upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertLinkTag('canonical', canonicalUrl);
    upsertJsonLd(jsonLd);
  }, [title, description, path, image, type, jsonLd]);

  return null;
};

export default Seo;
