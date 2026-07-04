import React from 'react';
import { HistoryItem } from '../types';

interface HistoryUIProps {
  history: HistoryItem[];
  onClear: () => void;
}

export const HistoryUI: React.FC<HistoryUIProps> = ({ history, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-3xl">
          📜
        </div>
        <h3 className="text-xl font-bold">Your history is empty</h3>
        <p className="text-slate-500">Start translating to see your recent activity here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-2xl font-bold">Recent Translations</h2>
        <button
          onClick={onClear}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="glass-morphism rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-indigo-500/30 transition-all">
            <div className="flex-1 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
                {new Date(item.timestamp).toLocaleString()}
              </span>
              <p className="text-lg text-indigo-400 font-medium">"{item.input}"</p>
            </div>
            <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <div>
                <p className="text-xs text-slate-500">English</p>
                <p className="text-white">{item.result.english}</p>
              </div>
              <div className="text-right md:text-left">
                <p className="text-xs text-slate-500">Arabic Script</p>
                <p className="text-xl text-slate-200" dir="rtl">{item.result.arabicScript}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
