import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';

interface Props {
  name: string;
  accent: string;
  tagline: string;
  headline: React.ReactNode;
  sub: string;
  children?: React.ReactNode;
  pillars: { title: string; text: string }[];
  /** Route path, e.g. "/virlo" — used for canonical/OG tags and JSON-LD. */
  path: string;
  /**
   * Real-world status label — must stay in sync with the same venture's
   * entry in components/Ventures.tsx (VENTURE_META) and components/Demos.tsx
   * (ENTRIES) so the badge here never contradicts what the rest of the site
   * says about the product.
   */
  status: 'Preview' | 'Coming soon' | 'Building' | 'Live';
  /** Optional live/demo product URL shown as an external CTA. */
  externalUrl?: string;
  externalLabel?: string;
  /** Override the default "Interactive concept preview" label above children. */
  previewLabel?: string;
  /** Override the disclaimer under the preview. */
  previewNote?: string;
}

/** Shared cream editorial layout for venture pages (Virlo / IBNI / TUT / Be3ly). */
const VentureShell: React.FC<Props> = ({
  name, accent, tagline, headline, sub, children, pillars, path, status,
  externalUrl, externalLabel, previewLabel, previewNote,
}) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${name} — ${tagline}`,
    description: sub,
    brand: { '@type': 'Organization', name: 'MB AI Group' },
    url: `https://mbai-group.com${path}`,
  };

  return (
    <div className="min-h-screen bg-transparent text-[#14110f] overflow-x-hidden">
      <Seo
        title={`${name} — ${tagline} · MB AI Group`}
        description={sub}
        path={path}
        jsonLd={productJsonLd}
      />
      <Navigation />
      <main className="relative pt-36 pb-24 px-6">
        <div className="hidden" />
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-10">
            <Link href="/#ventures" className="inline-flex items-center gap-2 text-sm text-[#6b645c] hover:text-[#14110f] transition-colors no-underline">
              <ArrowLeft size={15} /> Back to the portfolio
            </Link>
          </div>

          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e6dfd2] bg-[#fffdf8] text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            {name} · {tagline} · {status}
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] mb-6 max-w-3xl">{headline}</h1>
          <p className="text-base md:text-lg text-[#6b645c] max-w-2xl leading-relaxed mb-8">{sub}</p>

          {externalUrl && (
            <div className="mb-12">
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl no-underline"
              >
                {externalLabel || `Open ${name}`}
              </a>
            </div>
          )}

          {children && (
            <>
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a8278] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                  {previewLabel || 'Interactive concept preview'}
                </p>
                <div className="rounded-2xl overflow-hidden border border-[#e6dfd2]" style={{ boxShadow: 'none' }}>
                  {children}
                </div>
              </div>
              <p className="text-xs text-[#8a8278] mb-16">
                {previewNote || `This is a working concept preview — the full ${name} product is in active development.`}
              </p>
            </>
          )}

          {!children && <div className="mb-16" />}

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pillars.map((p) => (
              <div key={p.title} className="bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl p-6">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: accent }} />
                <h3 className="font-bold text-[#14110f] mb-2">{p.title}</h3>
                <p className="text-sm text-[#6b645c] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          {/* CTA — honest contact fallback (Calendly embed is currently unavailable) */}
          <div className="border border-[#e6dfd2] rounded-2xl p-10 text-center relative overflow-hidden" style={{ background: '#fffdf8' }}>
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-[#14110f] mb-3">Want to talk about {name}?</h2>
              <p className="text-[#6b645c] text-sm mb-8 max-w-xl mx-auto">
                Online booking is temporarily unavailable. Reach us directly by email or WhatsApp — we typically respond within a few hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="mailto:mohanad.barakat@mbai-group.com" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl no-underline">
                  <Mail size={16} /> Email us
                </a>
                <a
                  href="https://wa.me/201100054278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#e6dfd2] text-sm text-[#3a342e] hover:text-[#14110f] hover:border-[#d9d0c0] transition-colors no-underline"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VentureShell;
