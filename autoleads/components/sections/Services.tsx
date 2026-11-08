import { motion } from "framer-motion";
import { Bot, FileSpreadsheet, Phone, ArrowRight } from "lucide-react";

const layers = [
  {
    layer: "Build",
    layerColor: "text-blue-600",
    services: [
      { icon: Bot, step: "01", title: "Membership systems", description: "We turn a repeat service into an owned membership product: a premium subscription storefront, upfront payment through the merchant's own provider account, customer QR passes, staff redemption in seconds and a focused owner dashboard. Arabic and English, installable as a PWA.", highlight: "Sell the month upfront." },
      { icon: FileSpreadsheet, step: "02", title: "Website design & rebuilds", description: "New sites and rebuilds of slow or dated ones: brand-led design, online stores with checkout, local SEO foundations, and a clean handover of the domain, accounts and code.", highlight: "Example: Lash Cartel store." },
    ],
  },
  {
    layer: "Grow",
    layerColor: "text-emerald-600",
    services: [
      { icon: Phone, step: "03", title: "Ads management", description: "Campaign setup and ongoing management that sends traffic to the storefront or site we built, so the offer, the page and the ad tell the same story.", highlight: "One partner from ad to checkout." },
      { icon: Bot, step: "04", title: "AI-assisted lead generation", description: "The original AutoLeadss capability: AI agents source and organise market-specific leads into a live tracking sheet, and a bilingual team qualifies them and books meetings.", highlight: "200+ leads delivered across 3 markets." },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-28 relative bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,101,192,0.03),transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-3"
          >
            What We Do For You
          </motion.h2>
          <motion.h3
            variants={itemVariants}
            className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            One partner.{" "}
            <span className="accent-gradient-text">Build and grow.</span>
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Build the product your customers buy every month, the site they buy it on, and the ads and leads that bring them in.
          </motion.p>
        </motion.div>

        <div className="space-y-14">
          {layers.map((layer, li) => (
            <div key={li}>
              <div className="flex items-center gap-3 mb-6 max-w-7xl">
                <div className={`text-xs font-bold uppercase tracking-widest ${layer.layerColor} bg-muted border border-border rounded-full px-4 py-1.5`}>
                  {layer.layer}
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`grid gap-6 ${layer.services.length === 1 ? "grid-cols-1 max-w-2xl" : "grid-cols-1 md:grid-cols-2"}`}
              >
                {layer.services.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group relative bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-colors duration-300">
                          <service.icon className="w-7 h-7" />
                        </div>
                        <span className="text-5xl font-black text-foreground/[0.04] group-hover:text-primary/[0.1] transition-colors font-display leading-none">
                          {service.step}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-3 font-display">{service.title}</h4>
                      <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                        <ArrowRight className="w-4 h-4" />
                        {service.highlight}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
