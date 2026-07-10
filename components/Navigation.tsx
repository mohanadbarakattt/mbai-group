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
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-1 ${compact ? 'w-full justify-center' : ''}`}
      role="group"
      aria-label={dict.nav.languageLabel}
    >
      <Globe size={13} className="text-[#8b93a7] ml-1.5 mr-0.5 shrink-0" aria-hidden />
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          aria-label={LOCALE_NAMES[l]}
          title={LOCALE_NAMES[l]}
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-colors ${
            locale === l ? 'bg-white text-[#0b1022]' : 'text-[#8b93a7] hover:text-white'
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['ventures', 'how-we-work', 'demos', 'contact'];
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

  const navLinks = [
    { id: 'ventures', name: dict.nav.ventures, href: '/#ventures', sectionId: 'ventures' },
    { id: 'process', name: dict.nav.process, href: '/#how-we-work', sectionId: 'how-we-work' },
    { id: 'demos', name: dict.nav.demos, href: '/#demos', sectionId: 'demos' },
    { id: 'contact', name: dict.nav.contact, href: '/#contact', sectionId: 'contact' },
    { id: 'our-story', name: dict.nav.ourStory, href: '/about', isExternal: true },
  ];

  const linkClass = (sectionId?: string) => {
    const isActive = sectionId && activeSection === sectionId;
    return [
      'text-sm font-medium transition-colors uppercase tracking-wide',
      isActive
        ? 'text-white border-b-2 border-cyan-400 pb-0.5'
        : 'text-[#8b93a7] hover:text-white',
    ].join(' ');
  };

  const mobileLinkClass = (sectionId?: string) => {
    const isActive = sectionId && activeSection === sectionId;
    return [
      'font-medium py-2 transition-colors',
      isActive ? 'text-white font-semibold' : 'text-[#8b93a7] hover:text-white',
    ].join(' ');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0b1022]/85 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <a href="/" onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          setIsMobileMenuOpen(false);
          if (location === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            navigate('/');
          }
        }} className="flex items-center group transform transition-transform hover:scale-105 duration-300">
          <Logo size={52} withWordmark dark />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            'isExternal' in link && link.isExternal ? (
              <Link key={link.id} href={link.href}
                className={linkClass(undefined)}>
                {link.name}
              </Link>
            ) : (
              <a key={link.id} href={link.href}
                className={linkClass(link.sectionId)}
                onClick={(e) => handleAnchorClick(e, link.href)}>
                {link.name}
              </a>
            )
          )}
          <LanguageSwitcher />
          <button
            onClick={() => { if ((window as any).Calendly) (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/autoleadss-info/30min' }); }}
            className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            {dict.nav.bookCall}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0b1022]/95 backdrop-blur-xl border-b border-white/10">
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
            <button
              onClick={() => { setIsMobileMenuOpen(false); if ((window as any).Calendly) (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/autoleadss-info/30min' }); }}
              className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-lg w-full"
            >
              {dict.nav.bookCall}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
