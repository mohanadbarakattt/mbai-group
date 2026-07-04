import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-36 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(21,101,192,0.10)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-blob hero-blob-4" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(21,101,192,0.08),transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(21,101,192,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 text-primary text-sm font-medium mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Your Complete Sales Operation — Built & Run For You
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-foreground leading-[1.1] mb-8"
          >
            More Deals. Less Effort. <br className="hidden sm:block" />
            <span className="hero-gradient-text">Maximum Profit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-6"
          >
            A hybrid AI and outsourcing ecosystem for real estate owners, investors, and wholesalers. Custom AI agents find and track your leads — professional cold callers in Egypt convert them into appointments. You just close.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-block bg-primary/8 border border-primary/20 text-primary font-semibold px-5 py-3 rounded-xl text-base mb-10 backdrop-blur-sm"
          >
            One closed deal covers the entire setup. The rest is pure profit.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Start Your Operation
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#how-it-works"
              className="flex items-center justify-center px-8 py-4 rounded-xl bg-foreground/5 text-foreground font-semibold text-lg border border-border hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300"
            >
              See How It Works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: TrendingUp, label: "Unlimited Lead Supply", sub: "We handle all the prospecting" },
              { icon: Clock, label: "Save 40+ Hours a Week", sub: "No more chasing cold contacts" },
              { icon: DollarSign, label: "Profit From Day One", sub: "One deal covers everything" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 hover:border-primary/30 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{label}</p>
                  <p className="text-muted-foreground text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
