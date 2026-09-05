import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import Logo from './Logo';
import { useI18n, LOCALE_LABELS, LOCALE_NAMES } from '../i18n';
import type { Locale } from '../i18n';

const LOCALES: Locale[] = ['en', 'ar', 'franco'];

const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { locale, setLocale, dict } = useI18n();
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-[#e6dfd2] bg-[#fffdf8] p-1 ${compact ? 'w-full justify-center' : ''}`}
      role="group"
      aria-label={dict.nav.languageLabel}
    >
      <Globe size={13} className="hidden lg:block text-[#6b645c] ml-1.5 mr-0.5 shrink-0" aria-hidden />
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          aria-label={LOCALE_NAMES[l]}
          title={LOCALE_NAMES[l]}
          className={`px-1.5 lg:px-2.5 py-1 rounded-full text-[10px] lg:text-[11px] font-semibold uppercase tracking-wide transition-colors ${
            locale === l ? 'bg-[#14110f] text-[#f7f3ec]' : 'text-[#6b645c] hover:text-[#14110f]'
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
};

const Navigation: React.FC = () => {
  const { dict } = useI18n();
  const [location, navigate] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['ventures', 'demos', 'how-we-work', 'contact'];
    const observers: IntersectionObserver[] = [];
    const sectionVisibility: Record<string, number> = {};

    const pickActive = () => {
      if (window.scrollY < 80) {
        setActiveSection('');
        return;
      }
      let best = '';
      let bestRatio = 0;
      for (const id of sectionIds) {
        if ((sectionVisibility[id] ?? 0) > bestRatio) {
          bestRatio = sectionVisibility[id];
          best = id;
        }
      }
      setActiveSection(best);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          sectionVisibility[id] = entry.intersectionRatio;
          pickActive();
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
      );
      observer.observe(el);
      observers.push(observer);
    });

    window.addEventListener('scroll', pickActive, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', pickActive);
    };
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    const id = href.slice(hashIndex + 1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
      setIsMobileMenuOpen(false);
    }
  };

  // Ordered to match the actual scroll flow of the homepage (Ventures then
  // Demos then How We Work then Contact — see App.tsx's Home section order).
  const navLinks = [
    { id: 'ventures', name: dict.nav.ventures, href: '/#ventures', sectionId: 'ventures' },
    { id: 'demos', name: dict.nav.demos, href: '/#demos', sectionId: 'demos' },
    { id: 'process', name: dict.nav.process, href: '/#how-we-work', sectionId: 'how-we-work' },
    { id: 'contact', name: dict.nav.contact, href: '/#contact', sectionId: 'contact' },
    { id: 'our-story', name: dict.nav.ourStory, href: '/about', isExternal: true },
  ];

  const linkClass = (sectionId?: string) => {
    const isActive = sectionId && activeSection === sectionId;
    return [
      'text-xs lg:text-sm font-medium transition-colors uppercase tracking-wide',
      isActive
        ? 'text-[#14110f] border-b-2 border-[#b85c38] pb-0.5'
        : 'text-[#6b645c] hover:text-[#14110f]',
    ].join(' ');
  };

  const mobileLinkClass = (sectionId?: string) => {
    const isActive = sectionId && activeSection === sectionId;
    return [
      'font-medium py-2 transition-colors',
      isActive ? 'text-[#14110f] font-semibold' : 'text-[#6b645c] hover:text-[#14110f]',
    ].join(' ');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#f7f3ec]/95 border-b border-[#e6dfd2] py-3 shadow-[0_1px_0_rgba(20,17,15,0.04)]' : 'bg-[#f7f3ec]/80 border-b border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex justify-between items-center gap-2">

        <a href="/" onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          setIsMobileMenuOpen(false);
          if (location === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            navigate('/');
          }
        }} className="flex items-center shrink-0 group">
          {/* Dark mark for cream nav */}
          <span className="lg:hidden"><Logo size={44} /></span>
          <span className="hidden lg:inline-flex"><Logo size={52} withWordmark /></span>
        </a>

        <div className="hidden md:flex items-center gap-2 lg:gap-6 min-w-0">
          {navLinks.map((link) =>
            'isExternal' in link && link.isExternal ? (
              <Link key={link.id} href={link.href}
                className={`whitespace-nowrap ${linkClass(undefined)}`}>
                {link.name}
              </Link>
            ) : (
              <a key={link.id} href={link.href}
                className={`whitespace-nowrap ${linkClass(link.sectionId)}`}
                onClick={(e) => handleAnchorClick(e, link.href)}>
                {link.name}
              </a>
            )
          )}
          <LanguageSwitcher />
          <a
            href="/#contact"
            className="btn-primary min-w-0 text-xs lg:text-sm font-semibold px-3 lg:px-5 py-2 lg:py-2.5 rounded-md truncate max-w-[130px] lg:max-w-none no-underline inline-flex items-center justify-center"
            title={dict.nav.bookCall}
            onClick={(e) => handleAnchorClick(e, '/#contact')}
          >
            {dict.nav.bookCall}
          </a>
        </div>

        <button className="md:hidden text-[#14110f]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#f7f3ec] border-b border-[#e6dfd2]">
          <div className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) =>
              'isExternal' in link && link.isExternal ? (
                <Link key={link.id} href={link.href}
                  className={mobileLinkClass(undefined)}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ) : (
                <a key={link.id} href={link.href}
                  className={mobileLinkClass(link.sectionId)}
                  onClick={(e) => handleAnchorClick(e, link.href)}>
                  {link.name}
                </a>
              )
            )}
            <LanguageSwitcher compact />
            <a
              href="/#contact"
              className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-md w-full no-underline inline-flex items-center justify-center"
              onClick={(e) => { setIsMobileMenuOpen(false); handleAnchorClick(e, '/#contact'); }}
            >
              {dict.nav.bookCall}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
