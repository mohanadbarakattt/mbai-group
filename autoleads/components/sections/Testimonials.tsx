import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, PenLine } from "lucide-react";
import { TestimonialSubmitModal } from "./TestimonialSubmitModal";

const testimonials = [
  {
    quote: "We used to spend half our week chasing cold leads with nothing to show for it. Now our team only takes calls with people who are already interested. Our deal volume doubled in 60 days.",
    author: "Rami Khalil",
    role: "Managing Director, Premium Realty Group",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&auto=format&q=80",
  },
  {
    quote: "The ROI is undeniable. We closed one deal in the first month that paid for the entire setup three times over. The system keeps running and so does the revenue.",
    author: "Sarah Jenkins",
    role: "CEO, Apex Property Partners",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format&q=80",
  },
  {
    quote: "I was skeptical about outsourcing calls to Egypt, but the quality blew me away. Professional, polished, and they know our market inside out. Our calendar has never been this full.",
    author: "Marcus Thorne",
    role: "Founder, Thorne Properties",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&auto=format&q=80",
  },
];

export function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="testimonials" className="py-28 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
            Client Results
          </h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Real Companies. <span className="accent-gradient-text">Real Growth.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border relative group hover:border-primary/25 transition-colors duration-300 shadow-sm"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-foreground/[0.04] group-hover:text-primary/[0.1] transition-colors duration-300" />
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={t.image}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h5 className="text-foreground font-bold font-display">{t.author}</h5>
                  <p className="text-primary text-sm font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <p className="text-muted-foreground text-sm">Got results to share?</p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border hover:border-primary/40 bg-card hover:bg-primary/5 text-foreground text-sm font-semibold transition-all duration-200 group"
          >
            <PenLine size={15} className="text-primary group-hover:scale-110 transition-transform duration-200" />
            Share Your Result
          </button>
        </motion.div>
      </div>

      <TestimonialSubmitModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
