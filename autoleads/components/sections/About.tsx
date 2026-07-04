import { motion } from "framer-motion";
import { Brain, Users, Cpu, Shield } from "lucide-react";

const pillars = [
  {
    icon: Cpu,
    title: "AI-Powered Precision",
    desc: "Custom agents built for your exact market and criteria \u2014 not generic tools.",
  },
  {
    icon: Users,
    title: "Human Reliability",
    desc: "Real conversations with trained professionals that build trust and close deals.",
  },
  {
    icon: Brain,
    title: "Information Expertise",
    desc: "Built by an ex-xAI specialist \u2014 data processing at the core of every decision.",
  },
  {
    icon: Shield,
    title: "Done-For-You",
    desc: "No setup burden, no team management \u2014 we run the entire operation for you.",
  },
];

export function About() {
  return (
    <section id="about" className="py-28 relative border-t border-border overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
              About Us
            </h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
              Built by{" "}
              <a href="https://mbai-group.com" target="_blank" rel="noopener noreferrer" className="accent-gradient-text hover:opacity-80 transition-opacity">MBAI Solutions</a>
            </h3>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                LEADS is a product of <a href="https://mbai-group.com" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:text-primary transition-colors">MBAI Solutions</a>, led by a CEO with a background at <strong className="text-foreground">xAI</strong> — specializing in information management and intelligent automation.
              </p>
              <p>
                That experience showed us a clear gap in real estate: AI is exceptional at finding, organizing, and tracking leads — but when it comes to actually speaking to people, nothing beats a skilled human voice.
              </p>
              <p>
                So we built the system that combines both. Our AI agents handle everything data-related — sourcing, tracking, documenting — while professional cold callers based in Egypt handle every conversation. The result is a high-efficiency, high-trust operation at a fraction of in-house cost.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 bg-card border border-border rounded-xl p-5 shadow-sm">
              <img
                src={`/autoleads-images/ceo-mohanad.png`}
                alt="Mohanad Barakat"
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="text-foreground font-bold font-display">Mohanad Barakat</p>
                <p className="text-primary text-sm font-medium">CEO & Founder &middot; Ex-xAI</p>
                <p className="text-muted-foreground text-xs mt-0.5">Information Management Specialist</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-colors duration-300 shadow-sm"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-foreground font-bold font-display mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
