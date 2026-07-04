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

/** Shared layout for venture preview pages (Virlo / IBNI / TUT). */
const VentureShell: React.FC<Props> = ({ name, accent, tagline, headline, sub, children, pillars }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/autoleadss-info/30min' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] text-[#111111] overflow-x-hidden">
      <Navigation />
      <main className="pt-36 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <Link href="/#ventures" className="inline-flex items-center gap-2 text-sm text-[#6b6460] hover:text-[#111111] transition-colors no-underline">
              <ArrowLeft size={15} /> Back to the portfolio
            </Link>
          </div>

          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e2d9ce] bg-white text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            {name} · {tagline} · In Development
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-6 max-w-3xl">{headline}</h1>
          <p className="text-base md:text-lg text-[#6b6460] max-w-2xl leading-relaxed mb-12">{sub}</p>

          {/* Interactive concept demo */}
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9490] mb-3">Interactive concept preview</p>
            {children}
          </div>
          <p className="text-xs text-[#9a9490] mb-16">
            This is a working concept preview — the full {name} product is in active development and launches soon.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pillars.map((p) => (
              <div key={p.title} className="glass-card rounded-2xl p-6">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: accent }} />
                <h3 className="font-bold text-[#111111] mb-2">{p.title}</h3>
                <p className="text-sm text-[#6b6460] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="glass-card rounded-2xl p-10 text-center bg-[#111111] border-none">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Want early access to {name}?</h2>
            <p className="text-white/60 text-sm mb-8 max-w-xl mx-auto">
              We're onboarding early partners now. Book a call and we'll walk you through the roadmap.
            </p>
            <button
              onClick={openCalendly}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-[#f0ebe3] text-[#111111] font-semibold rounded-lg transition-colors"
            >
              <Calendar size={16} /> Book a 30-min Strategy Call
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VentureShell;
