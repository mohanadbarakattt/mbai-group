import { useEffect } from 'react';

/**
 * Lightweight, dependency-free per-route SEO manager.
 *
 * This is a pure client-rendered SPA (Vite + React, no SSR/prerendering), so
 * this component cannot make route-specific <title>/<meta>/OG tags visible to
 * crawlers that don't execute JavaScript — that gap is a real, larger effort
 * (SSR or a prerender step) tracked separately. What it *does* fix: today
 * every route shares one static, identical <title>/description/OG set from
 * index.html. This gives every route its own real per-page title, description,
 * canonical URL, OG/Twitter tags, and optional JSON-LD once the page hydrates —
 * which is what any JS-executing crawler (including Google, and most social
 * unfurlers) actually sees, and a real improvement for browser tabs, bookmarks,
 * and share-link previews regardless.
 *
 * Deliberately avoids react-helmet-async: it has no confirmed React 19 peer
 * range at the time of writing, and this ~50-line hook covers everything this
 * project actually needs without adding a dependency.
 */

const SITE_URL = 'https://mbai-group.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  /** Extra JSON-LD object(s) to inject only while this route is mounted. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
  }
  el.setAttribute('content', content);
  if (created) document.head.appendChild(el);
  return el;
}

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', `${SITE_URL}${path}`);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    const robotsEl = upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
    }
    canonical.setAttribute('href', `${SITE_URL}${path}`);
    if (createdCanonical) document.head.appendChild(canonical);

    let ldScript: HTMLScriptElement | null = null;
    if (jsonLd) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.setAttribute('data-seo-route-jsonld', 'true');
      ldScript.text = JSON.stringify(jsonLd);
      document.head.appendChild(ldScript);
    }

    return () => {
      document.title = prevTitle;
      // Reset robots meta back to the indexable default so leaving a noindex
      // route (e.g. /admin) doesn't leak into whatever route mounts next.
      robotsEl.setAttribute('content', 'index, follow');
      if (ldScript) ldScript.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, noindex, jsonLd]);

  return null;
}
