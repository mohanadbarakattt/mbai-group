import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Calendar } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Props {
  name: string;
  accent: string;
  tagline: string;
  headline: React.ReactNode;
  sub: string;
  children: React.ReactNode;
  pillars: { title: string; text: string }[];
}

/** Shared dark layout for venture preview pages (Virlo / IBNI / TUT). */
const VentureShell: React.FC<Props> = ({ name, accent, tagline, headline, sub, children, pillars }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/autoleadss-info/30min' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05060c] text-[#e8ecf4] overflow-x-hidden">
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
            {name} · {tagline} · In Development
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-6 max-w-3xl">{headline}</h1>
          <p className="text-base md:text-lg text-[#8b93a7] max-w-2xl leading-relaxed mb-12">{sub}</p>

          {/* Interactive concept demo */}
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} /> Interactive concept preview
            </p>
            <div className="rounded-2xl overflow-hidden border border-white/10" style={{ boxShadow: `0 0 80px -24px ${accent}88` }}>
              {children}
            </div>
          </div>
          <p className="text-xs text-[#5b6478] mb-16">
            This is a working concept preview — the full {name} product is in active development and launches soon.
          </p>

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

          {/* CTA */}
          <div className="glow-border rounded-2xl p-10 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0e17, #0d1220)' }}>
            <div className="aurora w-72 h-72 -top-10 left-1/2 -translate-x-1/2" style={{ background: `radial-gradient(circle, ${accent}55, transparent 60%)` }} />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Want early access to {name}?</h2>
              <p className="text-[#8b93a7] text-sm mb-8 max-w-xl mx-auto">
                We're onboarding early partners now. Book a call and we'll walk you through the roadmap.
              </p>
              <button onClick={openCalendly} className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl">
                <Calendar size={16} /> Book a 30-min Strategy Call
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VentureShell;
