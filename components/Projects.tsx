import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

// Client work and open-source projects (not MB AI Group ventures).
// Every description here comes from the project's own README or live site.
type Project = { name: string; kind: string; accent: string; thumbnail: string; text: string; repo: string; href?: string; hrefLabel?: string };

const PROJECTS: Project[] = [
  {
    name: 'ApexOne Knowledge Assistant',
    kind: 'Assessment build',
    accent: '#2a9d8f',
    thumbnail: '/media/repo-apexone.webp',
    text: 'A CPU-only, local employee knowledge assistant built for the Kentrick.ai hiring assessment on synthetic company documents. It retrieves only authorized evidence, checks each claim and citation, and declines when it cannot support an answer. 10 assessment cases and 98 automated tests passing.',
    repo: 'https://github.com/mohanadbarakattt/apexone-knowledge-assistant',
  },
  {
    name: 'Claude HQ',
    kind: 'Open source',
    accent: '#2a9d8f',
    thumbnail: '/media/repo-claude-hq.webp',
    text: 'Mission control for Claude Code: a live usage dashboard for rate-limit windows, searchable recall of local sessions, compiled briefings for new sessions, and a cheap-model agent trio. One stdlib Python file, no telemetry.',
    repo: 'https://github.com/mohanadbarakattt/claude-hq',
  },
  {
    name: 'Grok HQ',
    kind: 'Open source',
    accent: '#2a9d8f',
    thumbnail: '/media/repo-grok-hq.webp',
    text: 'Mission control for builders using Grok / xAI, the open-source counterpart to Claude HQ: a stdlib Python CLI and local dashboard for usage logs, session search, digests and briefings. Your data stays on the machine.',
    repo: 'https://github.com/mohanadbarakattt/grok-hq',
  },
];

const Projects: React.FC = () => (
  <section id="projects" className="py-24 px-6 border-t border-[#263437]">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 max-w-2xl">
        <p className="text-[#2a9d8f] text-xs font-semibold uppercase tracking-[0.18em] mb-3">Open source &amp; builds</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight text-[#f1f5f4]">Recent projects</h2>
        <p className="text-[#a7b7b4] text-base md:text-lg leading-relaxed">Builds outside the five ventures: a grounded-retrieval assessment build and two open-source tools for AI coding agents.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <article key={p.name} className="glass-card rounded-2xl p-6 flex flex-col">
            <img src={p.thumbnail} alt={`${p.name}: ${p.kind}`} loading="lazy" decoding="async" width={1200} height={600} className="w-full aspect-[2/1] object-cover rounded-lg border border-[#263437] mb-5" />
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-[#f1f5f4]">{p.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border" style={{ color: p.accent, borderColor: `${p.accent}44` }}>{p.kind}</span>
            </div>
            <p className="text-[#a7b7b4] text-sm leading-relaxed mb-5">{p.text}</p>
            <div className="mt-auto flex gap-4 text-sm font-medium">
              {p.href && <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#2a9d8f]">{p.hrefLabel} <ArrowUpRight size={14} /></a>}
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#c3cecc]"><Github size={14} /> GitHub</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
