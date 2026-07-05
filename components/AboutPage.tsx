import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import Navigation from './Navigation';
import Experience from './Experience';
import TechStack from './TechStack';
import Footer from './Footer';
import ResumeFAB from './ResumeFAB';

const AboutPage: React.FC = () => {
  const [avatarSrc, setAvatarSrc] = useState('/avatar.png');

  return (
    <div className="min-h-screen bg-[#05060c] text-[#e8ecf4] overflow-x-hidden">
      <Navigation />
      <main>
        {/* Profile Header */}
        <section className="relative pt-40 pb-16 px-6 flex flex-col items-center text-center bg-[#05060c] border-b border-white/10 overflow-hidden">
          <div className="aurora w-[440px] h-[440px] -top-10 left-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.28), transparent 60%)' }} />
          <div className="absolute inset-0 grid-fade pointer-events-none" />
          {/* Avatar */}
          <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 z-10">
            <div className="absolute -inset-1 rounded-full animate-spin-slow" style={{ background: 'conic-gradient(from 0deg, #6366f1, #22d3ee, #a855f7, #6366f1)', filter: 'blur(6px)', opacity: 0.7 }} />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 hover:scale-105 transition-transform duration-500 ease-out bg-[#0d1220]">
              <img
                src={avatarSrc}
                onError={() => {
                  if (avatarSrc === '/avatar.png') {
                    setAvatarSrc(
                      'https://api.dicebear.com/9.x/avataaars/svg?seed=Mohanad&topType=ShortHairShortFlat&facialHairType=BeardLight&clotheType=Hoodie&clotheColor=3c4f5c&hairColor=2c1b18&skinColor=fd9841&style=circle'
                    );
                  }
                }}
                alt="Mohanad Barakat"
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>
          </div>

          {/* Name & Title */}
          <div className="relative z-10 inline-block px-4 py-1.5 rounded-full glass text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4">
            Mohanad Barakat
          </div>

          <h1 className="relative z-10 text-3xl md:text-5xl font-bold mb-4">
            Meet the <span className="text-gradient">Founder & CEO</span>
          </h1>

          <p className="relative z-10 text-base md:text-lg text-[#8b93a7] max-w-2xl leading-relaxed">
            Former <span className="font-semibold text-white">xAI Human Data Lead</span> — translating world-scale AI research into practical solutions for the MENA region.
          </p>

          <a
            href="/Mohanad_Barakat_CV.pdf"
            download="Mohanad_Barakat_CV.pdf"
            className="btn-primary relative z-10 mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-xl"
          >
            <FileText size={16} />
            Download CV
          </a>
        </section>

        <Experience />
        <TechStack />
      </main>
      <ResumeFAB />
      <Footer />
    </div>
  );
};

export default AboutPage;
