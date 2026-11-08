import { motion } from "framer-motion";

const stats = [
  { value: "200+", label: "Leads Delivered", sub: "Across client engagements" },
  { value: "3", label: "MENA Markets Served", sub: "Egypt, UAE and beyond" },
  { value: "2 wks", label: "Membership Build", sub: "After deposit and approved content" },
  { value: "AR + EN", label: "Bilingual by Default", sub: "Storefronts, sites and dashboards" },
];

export function Stats() {
  return (
    <section id="results" className="py-20 bg-card border-y border-border relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(21,101,192,0.04),transparent_60%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
            Real Results
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            What You Can Expect
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-display font-black accent-gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-base font-bold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs font-medium text-muted-foreground">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
