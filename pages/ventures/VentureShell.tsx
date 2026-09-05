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

/** Shared dark layout for venture pages (Virlo / IBNI / TUT / Be3ly). */
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
    <div className="min-h-screen bg-transparent text-[#e8ecf4] overflow-x-hidden">
      <Seo
        title={`${name} — ${tagline} · MB AI Group`}
        description={sub}
        path={path}
        jsonLd={productJsonLd}
      />
      <Navigation />
      <main className="relative pt-36 pb-24 px-6">
        <div className="aurora w-[520px] h-[520px] -top-20 -right-32" style={{ background: `radial-gradient(circle, ${accent}44, transparent 60%)` }} />
        <div className="absolute inset-0 grid-fade pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-10">
            <Link href="/#ventures" className="inline-flex items-center gap-2 text-sm text-[#8b93a7] hover:text-white transition-colors no-underline">
              <ArrowLeft size={15} /> Back to the portfolio
            </Link>
          </div>

          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            {name} · {tagline} · {status}
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-6 max-w-3xl">{headline}</h1>
          <p className="text-base md:text-lg text-[#8b93a7] max-w-2xl leading-relaxed mb-8">{sub}</p>

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
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                  {previewLabel || 'Interactive concept preview'}
                </p>
                <div className="rounded-2xl overflow-hidden border border-white/10" style={{ boxShadow: `0 0 80px -24px ${accent}88` }}>
                  {children}
                </div>
              </div>
              <p className="text-xs text-[#5b6478] mb-16">
                {previewNote || `This is a working concept preview — the full ${name} product is in active development.`}
              </p>
            </>
          )}

          {!children && <div className="mb-16" />}

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pillars.map((p) => (
              <div key={p.title} className="glass-strong card-fx rounded-2xl p-6">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: accent }} />
                <h3 className="font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-[#8b93a7] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          {/* CTA — honest contact fallback (Calendly embed is currently unavailable) */}
          <div className="glow-border rounded-2xl p-10 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0e17, #0d1220)' }}>
            <div className="aurora w-72 h-72 -top-10 left-1/2 -translate-x-1/2" style={{ background: `radial-gradient(circle, ${accent}55, transparent 60%)` }} />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Want to talk about {name}?</h2>
              <p className="text-[#8b93a7] text-sm mb-8 max-w-xl mx-auto">
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-sm text-[#cdd4e2] hover:text-white hover:border-white/30 transition-colors no-underline"
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
