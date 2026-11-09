import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n';

/** Real product screens framed as glass devices, not conceptual placeholder UIs. */
const ProductFrames: React.FC = () => (
  <div className="hero-products" aria-label="TUT, IBNI and Virlo Studio product previews">
    <div className="product-light" aria-hidden="true" />
    <a className="product-device product-device-main" href="https://tutapp.co" target="_blank" rel="noopener noreferrer" aria-label="Open TUT, sourced AI travel guide for Egypt">
      <div className="device-toolbar"><span /><span /><span /><b>tutapp.co</b><span className="device-live" /></div>
      <img src="/tut/tut-desktop.webp" alt="TUT: Ask about Egypt. See where the answer came from." width="1280" height="800" fetchPriority="high" decoding="async" />
    </a>
    <a className="product-device product-device-ibni" href="https://ibni-v2.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Try IBNI AI app builder">
      <div className="device-toolbar"><b>IBNI</b><small>AI app builder</small></div>
      <img src="/thumbnails/ibni.jpg" alt="IBNI codegen concept preview" width="960" height="540" decoding="async" />
    </a>
    <a className="product-device product-device-virlo" href="https://virlo-studio.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Open Virlo Studio">
      <div className="device-toolbar"><b>Virlo Studio</b><small>Video + image</small></div>
      <img src="/thumbnails/virlo.jpg" alt="Virlo Studio AI video and image workspace concept" width="960" height="540" decoding="async" />
    </a>
    <div className="device-reflection" aria-hidden="true" />
  </div>
);

const Hero: React.FC = () => {
  const { dict } = useI18n();
  return (
    <section id="hero" className="hero-dark">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker"><span /> AI product studio · Cairo &amp; Dubai</p>
          <h1>{dict.hero.line1}<br /><span>{dict.hero.line2}</span></h1>
          <p className="hero-description">{dict.hero.sub}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm">{dict.hero.ctaBook} <ArrowUpRight size={16} /></a>
            <a href="#ventures" className="glass-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm">Explore our work <ArrowRight size={16} /></a>
          </div>
          <div className="hero-proof"><span>{dict.hero.statLead}</span><i /><span>{dict.hero.statProducts}</span></div>
        </div>
        <ProductFrames />
      </div>
      <a href="#highlights" className="hero-scroll">Explore the group <span>↓</span></a>
    </section>
  );
};

export default Hero;
