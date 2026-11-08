import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

// Client work and open-source projects (not MB AI Group ventures).
// Every description here comes from the project's own README or live site.
const PROJECTS = [
  {
    name: 'Lash Cartel',
    kind: 'Client work',
    accent: '#c2577a',
    thumbnail: '/thumbnails/lashcartel.webp',
    text: 'E-commerce store for Lash Cartel Cosmetics: cluster lashes, DIY lash kits and mascara, with Stripe checkout. Built for the client; the brand and store belong to them.',
    href: 'https://lash-cartel-ten.vercel.app',
    hrefLabel: 'View preview',
    repo: 'https://github.com/mohanadbarakattt/lashcartel-store',
  },
  {
    name: 'ApexOne Knowledge Assistant',
    kind: 'Assessment build',
    accent: '#3b82f6',
    thumbnail: '/thumbnails/apexone.webp',
    text: 'A CPU-only, local employee knowledge assistant built for a hiring assessment on synthetic company documents. It retrieves only authorized evidence, checks each claim and citation, and declines when it cannot support an answer. 10 assessment cases and 98 automated tests passing.',
    repo: 'https://github.com/mohanadbarakattt/apexone-knowledge-assistant',
  },
  {
    name: 'Claude HQ',
    kind: 'Open source',
    accent: '#d97757',
    thumbnail: '/thumbnails/claude-hq.webp',
    text: 'Mission control for Claude Code: a live usage dashboard for rate-limit windows, searchable recall of local sessions, compiled briefings for new sessions, and a cheap-model agent trio. One stdlib Python file, no telemetry.',
    repo: 'https://github.com/mohanadbarakattt/claude-hq',
  },
  {
    name: 'Grok HQ',
    kind: 'Open source',
    accent: '#6b645c',
    thumbnail: '/thumbnails/grok-hq.webp',
    text: 'Mission control for builders using Grok / xAI, the open-source counterpart to Claude HQ: a stdlib Python CLI and local dashboard for usage logs, session search, digests and briefings. Your data stays on the machine.',
    repo: 'https://github.com/mohanadbarakattt/grok-hq',
  },
];

const Projects: React.FC = () => (
  <section id="projects" className="py-24 px-6 border-t border-[#e6dfd2]">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 max-w-2xl">
        <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.18em] mb-3">Client work &amp; open source</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight text-[#14110f]">Recent projects</h2>
        <p className="text-[#6b645c] text-base md:text-lg leading-relaxed">Work outside the five ventures: a client store, a grounded-retrieval build, and two open-source tools for AI coding agents.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <article key={p.name} className="bg-[#fffdf8] border border-[#e6dfd2] rounded-xl p-6 flex flex-col">
            <img src={p.thumbnail} alt={`${p.name}: ${p.kind}`} loading="lazy" decoding="async" width={1280} height={720} className="w-full aspect-video object-cover rounded-lg border border-[#e6dfd2] mb-5" />
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-[#14110f]">{p.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border" style={{ color: p.accent, borderColor: `${p.accent}44` }}>{p.kind}</span>
            </div>
            <p className="text-[#6b645c] text-sm leading-relaxed mb-5">{p.text}</p>
            <div className="mt-auto flex gap-4 text-sm font-medium">
              {p.href && <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#b85c38]">{p.hrefLabel} <ArrowUpRight size={14} /></a>}
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#3a342e]"><Github size={14} /> GitHub</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
