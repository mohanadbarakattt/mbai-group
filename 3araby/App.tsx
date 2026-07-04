import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TranslatorUI } from './components/TranslatorUI';
import { GuideUI } from './components/GuideUI';
import { HistoryUI } from './components/HistoryUI';
import { AppSection, HistoryItem } from './types';

const ThreeArabyApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.TRANSLATOR);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('3araby_translation_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('3araby_translation_history', JSON.stringify(history));
  }, [history]);

  const addHistoryItem = (item: HistoryItem) => {
    setHistory(prev => [item, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {activeSection === AppSection.TRANSLATOR && (
          <TranslatorUI onNewHistory={addHistoryItem} />
        )}
        {activeSection === AppSection.GUIDE && (
          <GuideUI />
        )}
        {activeSection === AppSection.HISTORY && (
          <HistoryUI history={history} onClear={clearHistory} />
        )}
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} 3araby • Handcrafted for the Egyptian Community</p>
      </footer>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default ThreeArabyApp;
