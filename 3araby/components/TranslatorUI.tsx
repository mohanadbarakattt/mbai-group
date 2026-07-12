import React, { useState } from 'react';
import { translateFranco, RateLimitError, ConfigError } from '../services/geminiService';
import { TranslationResult, HistoryItem } from '../types';

interface TranslatorUIProps {
  onNewHistory: (item: HistoryItem) => void;
}

export const TranslatorUI: React.FC<TranslatorUIProps> = ({ onNewHistory }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    try {
      const translation = await translateFranco(input);
      setResult(translation);
      onNewHistory({
        id: Math.random().toString(36).substr(2, 9),
        input,
        result: translation,
        timestamp: Date.now()
      });
    } catch (err) {
      if (err instanceof RateLimitError) {
        setError('The AI is busy right now. Please wait a moment and try again.');
      } else if (err instanceof ConfigError) {
        setError("This demo's translation engine isn't configured correctly right now — we've noted it. Try again later, or explore the Franco guide tab in the meantime.");
      } else {
        setError('Translation failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Egyptian Franco Translator</h2>
        <p className="text-slate-400">Instantly convert Franco-Egyptian text to English and Arabic script.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Card */}
        <div className="glass-morphism rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Input</span>
            <button
              onClick={() => setInput('')}
              className="text-xs text-slate-500 hover:text-white"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleTranslate(); } }}
            placeholder="e.g., 7abibi enta fein? wa7ashteny awee..."
            className="w-full h-40 bg-transparent border-none text-xl resize-none focus:ring-0 placeholder:text-slate-700 outline-none"
          />
          <button
            onClick={handleTranslate}
            disabled={loading || !input.trim()}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Translating...
              </>
            ) : 'Translate Now'}
          </button>
        </div>

        {/* Output Card */}
        <div className="glass-morphism rounded-2xl p-6 space-y-6 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Result</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
              <div>
                <p className="text-xs text-slate-500 mb-1">English</p>
                <p className="text-2xl text-white font-medium">{result.english}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Arabic Script</p>
                <p className="text-3xl text-indigo-200" dir="rtl">{result.arabicScript}</p>
              </div>
              {result.explanation && (
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <p className="text-xs text-slate-400 italic">Context: {result.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-30 py-10">
              <div className="w-16 h-16 border-2 border-dashed border-slate-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">?</span>
              </div>
              <p className="text-sm text-slate-500">Translations will appear here.</p>
            </div>
          )}

          {error && (
            <div className="absolute inset-x-0 bottom-0 bg-red-500/10 p-4 border-t border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { q: 'ezayek?', a: 'How are you?' },
          { q: '3amel eh?', a: 'What are you doing?' },
          { q: 'mesh fahem 7aga', a: "I don't understand anything" }
        ].map((example, i) => (
          <button
            key={i}
            onClick={() => setInput(example.q)}
            className="text-left p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group"
          >
            <p className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors uppercase">Try this</p>
            <p className="font-medium text-slate-300">{example.q}</p>
            <p className="text-xs text-slate-600">{example.a}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
