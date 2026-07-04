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
    <div className="min-h-screen bg-[#f8f5f1] text-[#111111] overflow-x-hidden">
      <Navigation />
      <main>
        {/* Profile Header */}
        <section className="relative pt-40 pb-16 px-6 flex flex-col items-center text-center bg-[#f8f5f1] border-b border-[#e2d9ce]">
          {/* Avatar */}
          <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#e2d9ce] hover:scale-105 transition-transform duration-500 ease-out bg-[#f0ebe3]">
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
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#e2d9ce] bg-white text-[#6b6460] text-xs font-semibold tracking-wider uppercase mb-4">
            Mohanad Barakat
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#111111] mb-4">
            Meet the CEO
          </h1>

          <p className="text-base md:text-lg text-[#6b6460] max-w-2xl leading-relaxed">
            Former <span className="font-semibold text-[#111111]">xAI Human Data Lead</span> — translating world-scale AI research into practical solutions for the MENA region.
          </p>

          <a
            href="/Mohanad_Barakat_CV.pdf"
            download="Mohanad_Barakat_CV.pdf"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-[#111111] hover:bg-[#2a2a2a] text-white font-semibold rounded-lg transition-colors duration-200"
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
