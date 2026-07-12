import React, { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';
import { Link } from 'wouter';
import TiltCard from './effects/TiltCard';

// Curated, hand-picked list of the actual active repos behind the group's
// shipped work — not a live API fetch (no stars/fork counts shown; those
// would need a real-time GitHub call and are easy to fake, so they're
// omitted rather than invented). Update this list as repos are added.
//
// `private` is verified against actual anonymous reachability (gh repo view
// + a plain curl, not just what the repo happens to be named), since a
// private repo 404s for any visitor who isn't the owner. Private repos don't
// link out to GitHub at all — they link to the product's own page on this
// site (or the Ventures section as a fallback) so there are no dead links.
const REPOS = [
  {
    name: 'mbai-group',
    description: "This site — the group's portfolio, built with React, Vite, TypeScript and Tailwind.",
    tags: ['React', 'Vite', 'TypeScript'],
    url: 'https://github.com/mohanadbarakattt/mbai-group',
    private: false,
  },
  {
    name: 'autoleadss',
    description: 'AI lead-generation agency site plus a self-serve funnel-builder SaaS, live at autoleadss.com.',
    tags: ['React', 'Neon', 'SaaS'],
    url: 'https://github.com/mohanadbarakattt/autoleadss',
    private: false,
  },
  {
    name: 'virlo-studio',
    description: 'Egyptian-first AI video & image generation studio — Franco-Arabic prompting and cultural presets.',
    tags: ['AI Media', 'Franco-Arabic'],
    private: true,
    href: '/virlo',
  },
  {
    name: 'ibni',
    description: 'AI app builder that turns a plain-language idea into a working application, in Arabic or English.',
    tags: ['Codegen', 'No-Code'],
    private: true,
    href: '/ibni',
  },
  {
    name: 'nilo',
    description: 'Egyptian AI companion — conversational Franco-Arabic chat with phone-based interaction.',
    tags: ['Conversational AI', 'Arabic NLP'],
    private: true,
    href: '/#ventures',
  },
  {
    name: 'claude-hq',
    description: 'Usage dashboard and delegation tooling for orchestrating Claude agents across every project.',
    tags: ['Agent Orchestration', 'CLI'],
    url: 'https://github.com/mohanadbarakattt/claude-hq',
    private: false,
  },
  {
    name: 'mbai-ecosystem',
    description: 'Unification layer for the whole group — shared auth, shared DB schema, and the MBAI AI gateway.',
    tags: ['Shared Infra', 'Gateway'],
    private: true,
    href: '/#ventures',
  },
];

const GitHubSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="github" ref={ref} className="py-24 px-6 bg-transparent border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <Github size={14} /> Open on GitHub
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            The code behind <span className="text-gradient">every product.</span>
          </h2>
          <p className="text-[#8b93a7] max-w-2xl">
            Every venture and tool above is a real, version-controlled codebase — not a slide deck. A few of the active repos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {REPOS.map((repo, i) => (
            <div
              key={repo.name}
              className={`transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${(i % 3) * 90 + Math.floor(i / 3) * 60}ms` }}
            >
              <TiltCard className="h-full" max={5}>
                {(() => {
                  const cardClass = "glass-strong card-fx glow-border rounded-2xl p-6 h-full flex flex-col gap-4 group no-underline";
                  const cardBody = (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Github size={18} className="text-[#8b93a7] shrink-0" />
                          <span className="font-mono text-sm text-white truncate">{repo.name}</span>
                        </div>
                        {repo.private ? (
                          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border text-[#93a4c8] bg-white/[0.04] border-white/10">
                            <Lock size={10} /> Private
                          </span>
                        ) : (
                          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border text-[#34d399] bg-[rgba(16,185,129,0.12)] border-[rgba(16,185,129,0.4)]">
                            Public
                          </span>
                        )}
                      </div>

                      <p className="text-[#8b93a7] text-sm leading-relaxed flex-grow">{repo.description}</p>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <div className="flex flex-wrap gap-2 min-w-0">
                          {repo.tags.map((t) => (
                            <span key={t} className="text-[10px] px-2 py-1 rounded bg-white/[0.04] text-[#8b93a7] border border-white/10">{t}</span>
                          ))}
                        </div>
                        {repo.private ? (
                          <ArrowUpRight size={14} className="text-[#8b93a7] group-hover:text-white transition-colors shrink-0" />
                        ) : (
                          <ExternalLink size={14} className="text-[#8b93a7] group-hover:text-white transition-colors shrink-0" />
                        )}
                      </div>
                    </>
                  );

                  // Private repos 404 for anonymous visitors, so they never link
                  // to GitHub — they route to the product's own page on this
                  // site (or the Ventures section as a fallback) instead.
                  return repo.private ? (
                    <Link href={repo.href} className={cardClass}>{cardBody}</Link>
                  ) : (
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className={cardClass}>{cardBody}</a>
                  );
                })()}
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
