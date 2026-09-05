import React, { useEffect, useRef, useState } from 'react';
import { Check, Scale3D } from 'lucide-react';
import { useI18n } from '../i18n';

const Cell: React.FC<{ value: string; strong?: boolean }> = ({ value, strong }) => {
  if (value === '—') {
    return <span className="text-[#8a8278]">—</span>;
  }
  return (
    <span className={`inline-flex items-center gap-1.5 ${strong ? 'text-[#14110f] font-semibold' : 'text-[#6b645c]'}`}>
      {strong && <Check size={14} className="text-[#2f6b4f] shrink-0" />}
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
    <section ref={ref} className="py-24 px-6 bg-transparent border-y border-[#e6dfd2] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">

        <div className={`mb-12 max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <Scale3D size={14} /> {dict.comparison.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
            {dict.comparison.heading1} <span className="text-[#b85c38]">{dict.comparison.heading2}</span>
          </h2>
          <p className="text-[#6b645c] text-sm md:text-base">{dict.comparison.sub}</p>
        </div>

        <div className={`overflow-x-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
          <table className="w-full min-w-[640px] border-collapse bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl overflow-hidden">
            <thead>
              <tr className="border-b border-[#e6dfd2]">
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-[#6b645c] px-5 py-4 w-[38%]"></th>
                <th className="text-left text-xs font-bold uppercase tracking-wide text-[#14110f] px-5 py-4" style={{ color: '#b85c38' }}>{dict.comparison.columnUs}</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-[#6b645c] px-5 py-4">{dict.comparison.columnOffshore}</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-[#6b645c] px-5 py-4">{dict.comparison.columnAgency}</th>
              </tr>
            </thead>
            <tbody>
              {dict.comparison.rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-[#fffdf8]' : ''}>
                  <td className="text-sm text-[#3a342e] px-5 py-4 align-top">{row.label}</td>
                  <td className="text-sm px-5 py-4 align-top"><Cell value={row.us} strong /></td>
                  <td className="text-sm px-5 py-4 align-top"><Cell value={row.offshore} /></td>
                  <td className="text-sm px-5 py-4 align-top"><Cell value={row.agency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={`mt-5 text-xs text-[#8a8278] transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          {dict.comparison.footnote}
        </p>

      </div>
    </section>
  );
};

export default Comparison;
