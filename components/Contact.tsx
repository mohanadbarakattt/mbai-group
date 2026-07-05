import React, { useEffect, useRef, useState } from 'react';

// TODO: Replace '#' placeholders with real social handles when confirmed
const INSTAGRAM_URL = '#';
const FACEBOOK_URL = '#';
const LINKEDIN_URL = 'https://www.linkedin.com/company/mbai-solutions';

const Contact: React.FC = () => {
  const calendlyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cal = (window as any).Calendly;
    if (cal && calendlyRef.current) {
      cal.initInlineWidget({
        url: 'https://calendly.com/autoleadss-info/30min',
        parentElement: calendlyRef.current,
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 bg-[#080b14] border-t border-white/10">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — contact details */}
          <div>
            {/* Heading block */}
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <p className="text-[#8b93a7] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Get in Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Let's talk about your project.
              </h2>
              <p className="text-[#8b93a7] leading-relaxed mb-10">
                Book a call directly using the calendar, or reach out through any of the channels below. We typically respond within a few hours.
              </p>
            </div>

            <div className="space-y-4">

              {/* WhatsApp */}
              <a
                href="https://wa.me/201100054278"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 glass-strong card-fx rounded-xl px-5 py-4 transition-all duration-700 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#8b93a7] uppercase tracking-wide mb-0.5">WhatsApp</p>
                  <p className="text-sm font-semibold text-white">+20 110 005 4278</p>
                </div>
                <svg className="text-white/40 group-hover:text-white transition-colors shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>

              {/* Email */}
              <a
                href="mailto:mohanad.barakat@mbai-group.com"
                className={`flex items-center gap-4 glass-strong card-fx rounded-xl px-5 py-4 transition-all duration-700 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b6460" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#8b93a7] uppercase tracking-wide mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-white">mohanad.barakat@mbai-group.com</p>
                </div>
                <svg className="text-white/40 group-hover:text-white transition-colors shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>

              {/* Social row */}
              <div
                className={`flex items-center gap-3 pt-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* Instagram */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 flex-1 glass-strong card-fx rounded-xl px-4 py-3 transition-all duration-200 group"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b6460" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#6b6460"/>
                  </svg>
                  <span className="text-xs font-medium text-[#8b93a7]">Instagram</span>
                </a>

                {/* Facebook */}
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 flex-1 glass-strong card-fx rounded-xl px-4 py-3 transition-all duration-200 group"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#6b6460">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-xs font-medium text-[#8b93a7]">Facebook</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 flex-1 glass-strong card-fx rounded-xl px-4 py-3 transition-all duration-200 group"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#6b6460">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-xs font-medium text-[#8b93a7]">LinkedIn</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right — Calendly inline widget */}
          <div
            className={`bg-white glass-strong rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="px-6 pt-6 pb-2 border-b border-white/10">
              <p className="text-sm font-semibold text-white">Book a 30-min Strategy Call</p>
              <p className="text-xs text-[#8b93a7] mt-0.5">Pick a time that works for you — no commitment required.</p>
            </div>
            <div
              ref={calendlyRef}
              style={{ width: '100%', height: '700px' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
