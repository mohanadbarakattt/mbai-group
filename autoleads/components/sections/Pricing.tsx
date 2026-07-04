import { motion } from "framer-motion";
import { CheckCircle2, Bitcoin, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Setup & Build",
    type: "One-Time Investment",
    price: "$50,000",
    description:
      "We build your complete operation from the ground up — AI lead agents, automated tracking spreadsheets, and your dedicated calling team. Fully configured for your market and live within 30 days.",
    features: [
      "Custom AI agents built and configured for your market",
      "Automated lead tracking spreadsheets set up",
      "Egyptian calling team hired, trained, and briefed",
      "Call scripts and objection handling prepared",
      "One-on-one strategy session with our CEO",
      "Go-Live in 30 days from payment",
    ],
  },
  {
    name: "Monthly Retainer",
    type: "12-Month Contract · Billed Monthly",
    price: "$5,000 / mo",
    description:
      "We keep the entire operation running under a 12-month contract — managing the AI agents, maintaining the lead flow, supervising the calling team, and keeping your pipeline full every month.",
    features: [
      "300+ qualified leads sourced and tracked monthly",
      "AI agents maintained and continuously optimized",
      "Spreadsheets updated and organized in real time",
      "All inbound and outbound calls handled for you",
      "Calling team fully managed and supervised",
      "Monthly results summary and pipeline overview",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
            Investment & Returns
          </h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            An Investment That{" "}
            <span className="accent-gradient-text">Pays for Itself</span>
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            In real estate, a single commission can be worth <strong className="text-foreground">$50,000 to $500,000+</strong>. One closed deal covers the entire setup — and every deal after that is pure return.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-8 bg-primary/5 border border-primary/15 rounded-2xl px-8 py-5 text-center"
        >
          <p className="text-primary font-bold text-lg mb-1">Think of it this way:</p>
          <p className="text-muted-foreground">
            You invest <strong className="text-foreground">$50,000 once</strong> to build a world-class sales operation, then{" "}
            <strong className="text-foreground">$5,000/month</strong> to keep it running on a 12-month contract.
            One closed deal brings in <strong className="text-foreground">$50,000–$500,000+</strong>.
            The math speaks for itself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-10 flex items-center justify-center gap-3 bg-amber-500/5 border border-amber-500/15 rounded-xl px-6 py-4"
        >
          <Bitcoin className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-amber-600">Cryptocurrency only.</strong> All payments are accepted exclusively via crypto. Proof of payment is required to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {plans.map((plan, index) => (
              <div key={index} className={index === 0 ? "md:border-r md:border-border md:pr-10" : ""}>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-1">{plan.type}</p>
                <h4 className="text-2xl font-display font-bold text-foreground mb-2">{plan.name}</h4>
                <div className="text-3xl font-black accent-gradient-text font-display mb-3">{plan.price}</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.description}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-muted-foreground text-sm mt-8 mb-8">
          $50,000 one-time setup fee + $5,000/month on a 12-month contract. Payment accepted via cryptocurrency only.
        </p>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
