import React, { useMemo, useState } from 'react';
import { Check, MapPin, Package, Store, Truck, UtensilsCrossed, Wrench } from 'lucide-react';

type TemplateId = 'store' | 'restaurant' | 'services';

interface Template {
  id: TemplateId;
  labelAr: string;
  labelEn: string;
  icon: React.ReactNode;
  accent: string;
  products: { name: string; price: string; cat: string }[];
}

const TEMPLATES: Template[] = [
  {
    id: 'store',
    labelAr: 'متجر',
    labelEn: 'Store',
    icon: <Store size={14} />,
    accent: '#10b981',
    products: [
      { name: 'عباية حرير — أسود', price: '850 ج.م', cat: 'عبايات' },
      { name: 'شال كشمير', price: '320 ج.م', cat: 'إكسسوارات' },
      { name: 'فستان سهرة', price: '1,450 ج.م', cat: 'فساتين' },
    ],
  },
  {
    id: 'restaurant',
    labelAr: 'مطعم',
    labelEn: 'Restaurant',
    icon: <UtensilsCrossed size={14} />,
    accent: '#f59e0b',
    products: [
      { name: 'كشري ملكي', price: '65 ج.م', cat: 'أطباق' },
      { name: 'طعمية مشكل', price: '35 ج.م', cat: 'سندوتشات' },
      { name: 'عصير مانجو', price: '40 ج.م', cat: 'مشروبات' },
    ],
  },
  {
    id: 'services',
    labelAr: 'خدمات',
    labelEn: 'Services',
    icon: <Wrench size={14} />,
    accent: '#38bdf8',
    products: [
      { name: 'قص وتصفيف', price: '150 ج.م', cat: 'شعر' },
      { name: 'حلاقة كاملة', price: '90 ج.م', cat: 'حلاقة' },
      { name: 'صبغة', price: '280 ج.م', cat: 'صبغات' },
    ],
  },
];

const GOVERNORATES = [
  { name: 'القاهرة', fee: '40 ج.م' },
  { name: 'الجيزة', fee: '45 ج.م' },
  { name: 'الإسكندرية', fee: '55 ج.م' },
  { name: 'أسوان', fee: '75 ج.م' },
];

const SLUGS: Record<TemplateId, string> = {
  store: 'atelier-noor',
  restaurant: 'koshari-balad',
  services: 'barber-cairo',
};

const IbniDemo: React.FC = () => {
  const [templateId, setTemplateId] = useState<TemplateId>('store');
  const [shopName, setShopName] = useState('أتيليه نور');
  const [govIdx, setGovIdx] = useState(0);
  const [published, setPublished] = useState(false);

  const template = useMemo(
    () => TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0],
    [templateId],
  );
  const slug = SLUGS[templateId];
  const gov = GOVERNORATES[govIdx];

  const publish = () => setPublished(true);

  const pickTemplate = (id: TemplateId) => {
    setTemplateId(id);
    setPublished(false);
    if (id === 'store') setShopName('أتيليه نور');
    if (id === 'restaurant') setShopName('كشري البلد');
    if (id === 'services') setShopName('حلاق القاهرة');
  };

  return (
    <div className="w-full h-full grid md:grid-cols-2 text-[#e8ecf4]" style={{ background: '#0a0e17' }}>
      <div className="p-5 border-b md:border-b-0 md:border-r space-y-4" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d1220' }}>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478]">1 · اختر التصميم</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {TEMPLATES.map((t) => {
              const active = t.id === templateId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => pickTemplate(t.id)}
                  className="rounded-xl px-2.5 py-2.5 text-left transition-colors"
                  style={{
                    background: active ? `${t.accent}18` : '#111726',
                    border: `1px solid ${active ? `${t.accent}66` : 'rgba(255,255,255,0.08)'}`,
                    color: active ? t.accent : '#8b93a7',
                  }}
                >
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                    {t.icon} {t.labelAr}
                  </span>
                  <span className="block text-[10px] mt-0.5 opacity-70">{t.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478]">2 · اسم المتجر</label>
          <input
            value={shopName}
            onChange={(e) => { setShopName(e.target.value); setPublished(false); }}
            className="mt-2 w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
            style={{ background: '#111726', border: '1px solid rgba(255,255,255,0.08)', color: '#e8ecf4' }}
          />
          <p className="mt-1.5 text-[11px] text-[#5b6478] font-mono">ibni.app/s/{slug}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478] flex items-center gap-1.5">
            <Package size={11} /> 3 · منتجات جاهزة
          </label>
          <ul className="mt-2 space-y-1.5">
            {template.products.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs"
                style={{ background: '#111726', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span>
                  <span className="text-[#e8ecf4] font-medium">{p.name}</span>
                  <span className="text-[#5b6478] ml-2">{p.cat}</span>
                </span>
                <span className="font-semibold" style={{ color: template.accent }}>{p.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478] flex items-center gap-1.5">
            <Truck size={11} /> 4 · شحن للمحافظات
          </label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {GOVERNORATES.map((g, i) => (
              <button
                key={g.name}
                type="button"
                onClick={() => setGovIdx(i)}
                className="text-[11px] px-2.5 py-1.5 rounded-full transition-colors"
                style={{
                  background: i === govIdx ? 'rgba(16,185,129,0.16)' : '#111726',
                  border: `1px solid ${i === govIdx ? 'rgba(16,185,129,0.45)' : 'rgba(255,255,255,0.08)'}`,
                  color: i === govIdx ? '#34d399' : '#8b93a7',
                }}
              >
                {g.name} · {g.fee}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-[#5b6478]">27 محافظة — مثال على أربعة هنا.</p>
        </div>

        <button
          type="button"
          onClick={publish}
          className="btn-primary w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
        >
          {published ? <><Check size={15} /> منشور على ibni.app</> : 'انشر المتجر · Publish'}
        </button>
        <p className="text-[11px] text-[#5b6478] leading-relaxed">
          الدفع عند الاستلام (COD) فقط — من غير كارت. اللوحة تستقبل الطلبات وتقارير المبيعات.
        </p>
      </div>

      <div className="p-5 flex items-center justify-center min-h-[320px]" style={{ background: '#080b12' }}>
        <div
          className="w-full max-w-[240px] rounded-[1.8rem] overflow-hidden transition-shadow duration-500"
          style={{
            border: '5px solid #1b2233',
            boxShadow: published ? `0 0 40px -8px ${template.accent}99` : '0 0 24px -12px rgba(0,0,0,0.6)',
          }}
        >
          <div className="px-4 py-3.5 text-white" style={{ background: `linear-gradient(120deg, ${template.accent}, #047857)` }}>
            <p className="text-[10px] opacity-80 flex items-center gap-1">
              <Store size={10} /> ibni.app/s/{slug}
            </p>
            <p className="font-bold text-sm leading-tight mt-0.5">{shopName || 'متجرك'}</p>
            <p className="text-[10px] opacity-80 mt-1">{template.labelAr} · {template.labelEn}</p>
          </div>
          <div className="p-3.5 space-y-2.5" style={{ background: '#0d1220' }}>
            {template.products.map((p) => (
              <div key={p.name} className="rounded-lg p-2.5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between gap-2 text-xs">
                  <span className="text-[#e8ecf4] font-medium leading-snug">{p.name}</span>
                  <span className="shrink-0 font-semibold" style={{ color: template.accent }}>{p.price}</span>
                </div>
                <p className="text-[10px] text-[#5b6478] mt-1">{p.cat}</p>
              </div>
            ))}
            <div className="rounded-lg px-2.5 py-2 text-[11px] text-[#8b93a7] flex items-center gap-1.5" style={{ background: '#111726' }}>
              <MapPin size={11} style={{ color: template.accent }} />
              شحن إلى {gov.name}: {gov.fee}
            </div>
            <div className="rounded-lg text-white text-center text-xs font-semibold py-2.5" style={{ background: template.accent }}>
              اطلب الآن · الدفع عند الاستلام
            </div>
            {published && (
              <p className="text-[10px] text-center text-emerald-400 font-medium pt-0.5">
                ✓ المتجر جاهز يستقبل طلبات
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IbniDemo;
