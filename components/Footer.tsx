import React from 'react';
import { Link } from 'wouter';
import Logo from './Logo';
import { useI18n } from '../i18n';

const Footer: React.FC = () => {
  const { dict } = useI18n();
  // Mirrors the main nav's order (see components/Navigation.tsx) — matches
  // the homepage's actual scroll flow, plus "How We Work", "GitHub" and
  // "Claude" sections the top nav keeps off its already-tight bar.
  const exploreLinks = [
    { id: 'ventures', label: dict.footer.venturesLink, href: '/#ventures' },
    { id: 'demos', label: dict.footer.demosLink, href: '/#demos' },
    { id: 'github', label: dict.footer.githubLink, href: '/#github' },
    { id: 'how-we-work', label: dict.nav.process, href: '/#how-we-work' },
    { id: 'claude', label: dict.footer.claudeLink, href: '/#claude' },
    { id: 'contact', label: dict.footer.contactLink, href: '/#contact' },
    { id: 'our-story', label: dict.footer.ourStory, href: '/about' },
  ];
  const legalLinks = [
    { id: 'privacy', label: dict.footer.privacy, href: '/privacy' },
    { id: 'terms', label: dict.footer.terms, href: '/terms' },
  ];

  return (
    <footer className="bg-[#111111] border-t border-[#222]">
      {/* Explore / legal links */}
      <div className="border-b border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-5 text-center sm:text-left">
          <nav aria-label={dict.footer.explore} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {exploreLinks.map((l) => (
              <a key={l.id} href={l.href} className="text-xs font-medium uppercase tracking-wide text-[#8b93a7] hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <nav aria-label={dict.footer.legal} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.id} href={l.href} className="text-xs font-medium uppercase tracking-wide text-[#8b93a7] hover:text-white transition-colors no-underline">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Quick links bar */}
      <div className="border-b border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <a
            href="https://wa.me/201100054278"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            +20 110 005 4278
          </a>
          <span className="hidden sm:block text-white/20 text-xs">·</span>
          <a
            href="mailto:mohanad.barakat@mbai-group.com"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            mohanad.barakat@mbai-group.com
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Logo size={44} dark withWordmark />
          </div>
          <p className="text-[#aaa] text-sm">{dict.footer.copyright.replace('{year}', String(new Date().getFullYear()))}</p>
          <p className="text-[#888] text-xs">{dict.footer.location}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
