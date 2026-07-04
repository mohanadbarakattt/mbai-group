import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.04] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-[80px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
          Ready to Stop Chasing Leads?
        </h3>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Let AI find them and our professional callers convert them into appointments — while you focus on closing deals.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Start My Operation
          <ArrowRight className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
}
