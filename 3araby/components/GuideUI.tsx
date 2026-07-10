import React from 'react';

export const GuideUI: React.FC = () => {
  // Egyptian Franco convention (see FRANCO_EGYPTIAN_ARABIC_GUIDE): only 2, 3, 5, 7
  // have no Latin equivalent and get a dedicated digit. Everything else — including
  // ط/ت→T, ص/س/ث→S, ض/ذ/ز/ظ→Z — collapses onto plain Latin letters; there is no
  // "6", "9", "8", or "9'" in real Cairo texting, so those rows were removed rather
  // than taught as if they were standard.
  const rules = [
    { num: '2', letter: 'أ / ء / ق (silent)', example: '2alam (Pen), 2ahwa (Coffee)' },
    { num: '3', letter: 'ع', example: '3amel eh? (How are you doing?)' },
    { num: 'gh', letter: 'غ', example: 'ghaly (Expensive) — "3\'" is a rarer alternate spelling' },
    { num: '5', letter: 'خ', example: '5alas (Finished)' },
    { num: '7', letter: 'ح', example: '7abibi (My love)' },
    { num: 'T', letter: 'ت / ط', example: 'tayeb (Okay/Fine) — both letters collapse to plain T' },
    { num: 'S', letter: 'ث / س / ص', example: 'sa7 (Right) — all three collapse to plain S' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">The Franco System</h2>
        <p className="text-slate-400 leading-relaxed">
          Franco (also known as Arabizi) emerged in the 90s when mobile keyboards lacked Arabic characters.
          Users adapted by using the Latin alphabet and numbers to represent phonetic Arabic sounds.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rules.map((rule) => (
          <div key={rule.num} className="glass-morphism rounded-xl p-6 border-b-2 border-indigo-500/50 hover:bg-white/10 transition-colors">
            <div className="text-4xl font-bold text-indigo-500 mb-2">{rule.num}</div>
            <div className="text-2xl mb-2">{rule.letter}</div>
            <p className="text-xs text-slate-500 font-mono">{rule.example}</p>
          </div>
        ))}
      </div>

      <section className="glass-morphism rounded-2xl p-8 space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-indigo-400">💡</span> Tips for Reading Franco
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
          <li className="flex gap-3">
            <span className="text-indigo-500 font-bold">•</span>
            <span><strong>Write what you say:</strong> There are no strict spelling rules. It's purely phonetic.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 font-bold">•</span>
            <span><strong>Vowels are flexible:</strong> 'E' or 'A' can often be used interchangeably for the same sound.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 font-bold">•</span>
            <span><strong>Egyptian Context:</strong> Many words are heavily abbreviated (e.g., 'msh' instead of 'mosh').</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 font-bold">•</span>
            <span><strong>Double Letters:</strong> 'ee' usually represents a long 'Ye' sound (ي).</span>
          </li>
        </ul>
      </section>

      <section className="text-center py-10 opacity-50">
        <p className="text-sm">Don't worry if it seems confusing—with a bit of practice, it becomes second nature! 🇪🇬</p>
      </section>
    </div>
  );
};
