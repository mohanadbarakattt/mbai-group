import React, { useEffect, useRef, useState } from 'react';
import { Check, Scale3D } from 'lucide-react';
import { useI18n } from '../i18n';

const Cell: React.FC<{ value: string; strong?: boolean }> = ({ value, strong }) => {
  if (value === '—') {
    return <span className="text-[#5b6480]">—</span>;
  }
  return (
    <span className={`inline-flex items-center gap-1.5 ${strong ? 'text-white font-semibold' : 'text-[#aab2c5]'}`}>
      {strong && <Check size={14} className="text-emerald-400 shrink-0" />}
      {value}
    </span>
  );
};

const Comparison: React.FC = () => {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-[#0e1533]/70 border-y border-white/10 relative overflow-hidden">
      <div className="aurora w-[460px] h-[460px] bottom-0 right-0" style={{ background: 'radial-gradient(circle, rgba(217,120,79,0.16), transparent 60%)' }} />
      <div className="max-w-5xl mx-auto relative">

        <div className={`mb-12 text-center max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
            <Scale3D size={14} /> {dict.comparison.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            {dict.comparison.heading1} <span className="text-gradient">{dict.comparison.heading2}</span>
          </h2>
          <p className="text-[#8b93a7] text-sm md:text-base">{dict.comparison.sub}</p>
        </div>

        <div className={`overflow-x-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
          <table className="w-full min-w-[640px] border-collapse glass-strong rounded-2xl overflow-hidden">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-[#8b93a7] px-5 py-4 w-[38%]"></th>
                <th className="text-left text-xs font-bold uppercase tracking-wide text-white px-5 py-4" style={{ color: '#e3a83f' }}>{dict.comparison.columnUs}</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-[#8b93a7] px-5 py-4">{dict.comparison.columnOffshore}</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-[#8b93a7] px-5 py-4">{dict.comparison.columnAgency}</th>
              </tr>
            </thead>
            <tbody>
              {dict.comparison.rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                  <td className="text-sm text-[#cdd4e2] px-5 py-4 align-top">{row.label}</td>
                  <td className="text-sm px-5 py-4 align-top"><Cell value={row.us} strong /></td>
                  <td className="text-sm px-5 py-4 align-top"><Cell value={row.offshore} /></td>
                  <td className="text-sm px-5 py-4 align-top"><Cell value={row.agency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={`mt-5 text-xs text-[#5b6480] transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          {dict.comparison.footnote}
        </p>

      </div>
    </section>
  );
};

export default Comparison;
