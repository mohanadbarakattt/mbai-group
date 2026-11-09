import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import Navigation from './Navigation';
import Experience from './Experience';
import TechStack from './TechStack';
import Footer from './Footer';
import ResumeFAB from './ResumeFAB';
import Seo from './Seo';
import { useI18n } from '../i18n';

const AboutPage: React.FC = () => {
  const { dict } = useI18n();
  const [avatarSrc, setAvatarSrc] = useState('/avatar.png');

  return (
    <div className="min-h-screen bg-transparent text-[#f1f5f4] overflow-x-hidden">
      <Seo
        title="Mohanad Barakat, Founder & AI Engineer · MB AI Group"
        description="Mohanad Barakat: AI Engineer & Founder of MB AI Group, ex-xAI Human Data Lead (Grok). Career, education and CV."
        path="/about"
        type="profile"
      />
      <Navigation />
      <main>
        {/* Profile Header */}
        <section className="relative pt-40 pb-16 px-6 flex flex-col items-center text-center bg-transparent border-b border-[#263437] overflow-hidden">
          <div className="hidden" />
          {/* Avatar */}
          <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 z-10">
<div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#263437] hover:scale-105 transition-transform duration-500 ease-out bg-[#10191c]">
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
          <div className="relative z-10 inline-block px-4 py-1.5 rounded-full border border-[#263437] bg-[#11191c] text-[#2a9d8f] text-xs font-semibold tracking-wider uppercase mb-4">
            {dict.about.kicker}
          </div>

          <h1 className="relative z-10 text-3xl md:text-5xl font-bold mb-4">
            {dict.about.headingPre} <span className="text-[#2a9d8f]">{dict.about.headingGradient}</span>
          </h1>

          <p className="relative z-10 text-base md:text-lg text-[#a7b7b4] max-w-2xl leading-relaxed">
            {dict.about.blurb}
          </p>

          <a
            href="/Mohanad_Barakat_CV.pdf"
            download="Mohanad_Barakat_CV.pdf"
            className="btn-primary relative z-10 mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-xl"
          >
            <FileText size={16} />
            {dict.about.downloadCv}
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
