import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, Shield } from "lucide-react";

// Direct contact only. The old version asked for a crypto setup fee and had a
// form that never sent anything (it only logged to the console), so it was
// replaced with the same email / WhatsApp channels used on the main site.
const EMAIL = "mohanad.barakat@mbai-group.com";
const WHATSAPP = "https://wa.me/201100054278";

export function Contact() {
  return (
    <section id="contact" className="py-28 bg-card border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-primary/[0.06] blur-[150px] pointer-events-none"></div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Get Started</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to <span className="accent-gradient-text">Get Started?</span>
          </h3>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Tell us about your business: what you sell, who your customers are and what you want to grow.
            We'll reply with a plan and a quote for memberships, a website, ads or lead generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={`mailto:${EMAIL}?subject=AutoLeadss%20enquiry`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-5 h-5" /> Email us
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-background text-foreground font-semibold hover:border-primary/40 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              { icon: Clock, title: "Reply within 24–48 hours", sub: "From the founder, not a bot" },
              { icon: Shield, title: "No payment up front", sub: "You get a plan and a quote first" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-4 bg-background p-4 rounded-xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold">{title}</h4>
                  <p className="text-sm text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
