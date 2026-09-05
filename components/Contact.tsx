import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';

// Instagram/Facebook are intentionally omitted until real, confirmed handles exist.
const INSTAGRAM_URL = '';
const FACEBOOK_URL = '';
const LINKEDIN_URL = 'https://www.linkedin.com/company/mbai-solutions';

const Contact: React.FC = () => {
  const { dict } = useI18n();
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

  return (
    <section ref={sectionRef} id="contact" className="py-28 px-6 bg-[#f0ebe1] border-t border-[#e6dfd2]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">

          <div>
            <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.18em] mb-3">{dict.contact.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#14110f] mb-4 leading-tight">
                {dict.contact.heading}
              </h2>
              <p className="text-[#6b645c] leading-relaxed mb-10">
                {dict.contact.body}
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/201100054278"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 bg-[#fffdf8] border border-[#e6dfd2] rounded-lg px-5 py-4 transition-all duration-700 group hover:border-[#d9d0c0] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="w-10 h-10 rounded-md bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#6b645c] uppercase tracking-wide mb-0.5">{dict.contact.whatsapp}</p>
                  <p className="text-sm font-semibold text-[#14110f]">+20 110 005 4278</p>
                </div>
                <svg className="text-[#8a8278] group-hover:text-[#14110f] transition-colors shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>

              <a
                href="mailto:mohanad.barakat@mbai-group.com"
                className={`flex items-center gap-4 bg-[#fffdf8] border border-[#e6dfd2] rounded-lg px-5 py-4 transition-all duration-700 group hover:border-[#d9d0c0] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="w-10 h-10 rounded-md bg-[#f7f3ec] border border-[#e6dfd2] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b645c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#6b645c] uppercase tracking-wide mb-0.5">{dict.contact.email}</p>
                  <p className="text-sm font-semibold text-[#14110f]">mohanad.barakat@mbai-group.com</p>
                </div>
                <svg className="text-[#8a8278] group-hover:text-[#14110f] transition-colors shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>

              <div
                className={`flex items-center gap-3 pt-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '300ms' }}
              >
                {INSTAGRAM_URL && (
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 flex-1 bg-[#fffdf8] border border-[#e6dfd2] rounded-lg px-4 py-3" aria-label="Instagram">
                    <span className="text-xs font-medium text-[#6b645c]">Instagram</span>
                  </a>
                )}
                {FACEBOOK_URL && (
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 flex-1 bg-[#fffdf8] border border-[#e6dfd2] rounded-lg px-4 py-3" aria-label="Facebook">
                    <span className="text-xs font-medium text-[#6b645c]">Facebook</span>
                  </a>
                )}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 flex-1 bg-[#fffdf8] border border-[#e6dfd2] rounded-lg px-4 py-3 hover:border-[#d9d0c0] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#6b645c">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-xs font-medium text-[#6b645c]">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div
            className={`bg-[#fffdf8] rounded-xl overflow-hidden border border-[#e6dfd2] transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="px-6 pt-6 pb-3 border-b border-[#e6dfd2]">
              <p className="text-sm font-semibold text-[#14110f]">{dict.contact.calendlyTitle}</p>
              <p className="text-xs text-[#6b645c] mt-0.5">{dict.contact.calendlySub}</p>
            </div>
            <div className="px-6 py-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b85c38]/08 border border-[#b85c38]/25 text-[#9a4a2c] text-[11px] font-semibold uppercase tracking-wider">
                Booking calendar unavailable
              </div>
              <p className="text-sm text-[#6b645c] leading-relaxed">
                {dict.contact.bookingUnavailable}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="mailto:mohanad.barakat@mbai-group.com" className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm no-underline">
                  {dict.contact.email}
                </a>
                <a
                  href="https://wa.me/201100054278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm no-underline"
                >
                  {dict.contact.whatsapp}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
