import React from 'react';
import { AppSection } from '../types';
import { Link } from 'wouter';

interface HeaderProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
          ← Back
        </Link>
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setActiveSection(AppSection.TRANSLATOR)}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            3
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              3araby
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Egyptian Edition</p>
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
        {[
          { id: AppSection.TRANSLATOR, label: 'Translate' },
          { id: AppSection.GUIDE, label: 'Rules & Guide' },
          { id: AppSection.HISTORY, label: 'History' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeSection === item.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};
