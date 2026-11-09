import { ArrowUpRight } from "lucide-react";

export function CaseStudy() {
  return (
    <section id="case-study" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Example work · Website build</p>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Lash Cartel Cosmetics</h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">An e-commerce store for a lash brand selling cluster lashes, DIY lash kits and precision mascara, with product pages, a lash-match flow and Stripe checkout. Designed and built by AutoLeadss for the client, who owns the brand and the store.</p>
          <a href="https://www.lashcartelcosmetics.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">Visit the live store <ArrowUpRight className="w-4 h-4" /></a>
        </div>
        <a href="https://www.lashcartelcosmetics.com" target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden border border-border shadow-lg">
          <img src="/autoleads-images/lashcartel.webp" alt="Lash Cartel Cosmetics store home page" loading="lazy" decoding="async" className="w-full" />
        </a>
      </div>
    </section>
  );
}
