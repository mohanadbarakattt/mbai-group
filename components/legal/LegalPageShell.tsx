import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Seo from '../Seo';

interface Props {
  title: string;
  updated: string;
  seoDescription: string;
  path: string;
  children: React.ReactNode;
}

/** Shared dark layout for legal/policy pages (Privacy, Terms). */
const LegalPageShell: React.FC<Props> = ({ title, updated, seoDescription, path, children }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-transparent text-[#14110f] overflow-x-hidden">
      <Seo title={`${title} — MB AI Group`} description={seoDescription} path={path} noindex />
      <Navigation />
      <main className="relative pt-36 pb-24 px-6">
        <div className="absolute inset-0 grid-fade pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#6b645c] hover:text-[#14110f] transition-colors no-underline">
              <ArrowLeft size={15} /> Back to home
            </Link>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e6dfd2] bg-[#fffdf8] text-[#b85c38] text-xs font-semibold uppercase tracking-[0.15em]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            Draft — pending legal review
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3">{title}</h1>
          <p className="text-xs text-[#5b6478] mb-10">Last updated {updated}</p>

          <div className="bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl p-6 md:p-10 space-y-8 text-sm md:text-[15px] leading-relaxed text-[#6b645c] [&_h2]:text-[#14110f] [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-[#b85c38] [&_a]:no-underline hover:[&_a]:underline [&_strong]:text-[#14110f]">
            {children}
          </div>

          <p className="text-xs text-[#5b6478] mt-8">
            This page is a good-faith draft, not a substitute for qualified legal advice — it should be reviewed by a
            lawyer before being relied on for compliance purposes. Questions? Email{' '}
            <a href="mailto:mohanad.barakat@mbai-group.com" className="text-[#b85c38]">mohanad.barakat@mbai-group.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageShell;
