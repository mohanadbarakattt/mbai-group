import { motion } from "framer-motion";
import { Database, BarChart3, FileSpreadsheet, Settings2, GraduationCap, FileText, PhoneCall, CalendarCheck, ArrowRight } from "lucide-react";

const techCards = [
  {
    icon: Database,
    title: "Real Estate Data Sourcing",
    desc: "AI agents tap publicly available real estate databases, MLS listings, county records, and investor activity to build a continuously refreshed lead pool. Data is filtered by your custom criteria — property type, location, equity position, ownership status.",
  },
  {
    icon: BarChart3,
    title: "Lead Scoring & Qualification",
    desc: "Each lead is automatically scored based on behavioral signals, ownership tenure, property equity, and market indicators. Only high-probability prospects reach your calling team — no junk leads, no wasted calls.",
  },
  {
    icon: FileSpreadsheet,
    title: "Automated Pipeline Tracking",
    desc: "AI agents instantly log every qualified lead into structured tracking spreadsheets — name, contact info, property address, estimated equity, and follow-up stage — all updated in real time so your pipeline is always clean and current.",
  },
  {
    icon: Settings2,
    title: "Continuous Optimization",
    desc: "Agents are monitored and re-tuned monthly based on conversion data. Markets producing more deals get more resources; underperforming criteria are adjusted automatically. Your system gets smarter every month.",
  },
];

const humanSteps = [
  {
    icon: GraduationCap,
    label: "Trained by the CEO",
    desc: "Each caller goes through a custom onboarding built around your market, your value proposition, and real estate objections specific to your geography.",
  },
  {
    icon: FileText,
    label: "Custom Scripts for Your Market",
    desc: "We don't use generic cold call scripts. Every market gets a custom script written and refined by the CEO — covering intro, pitch, qualification, objection handling, and booking.",
  },
  {
    icon: PhoneCall,
    label: "Daily Calls from AI-Sourced Leads",
    desc: "Callers work each day through the AI-generated pipeline. Every call is recorded and logged. No lead goes untouched — our team keeps the pressure consistent.",
  },
  {
    icon: CalendarCheck,
    label: "Meetings on Your Calendar",
    desc: "Qualified appointments are booked directly onto your calendar. You receive a daily summary of calls made, interest generated, and meetings scheduled.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Get Started",
    badge: "Day 0",
    desc: "Transfer your setup fee in crypto and fill out a quick form with your market details. Takes under 10 minutes. The moment your payment clears, the clock starts.",
  },
  {
    number: "02",
    title: "We Confirm",
    badge: "24\u201348 Hours",
    desc: "Our team verifies your payment and sends a formal confirmation. Your file is opened and assigned to the build team.",
  },
  {
    number: "03",
    title: "Strategy Session",
    badge: "Scheduled via Calendly",
    desc: "A one-on-one call with CEO Mohanad Barakat to map out your target market, ideal client profile, lead criteria, and calling scripts. Your contract is finalized here.",
  },
  {
    number: "04",
    title: "Go Live",
    badge: "30 Days from Payment",
    desc: "Your AI agents go live, your calling team is briefed, and your pipeline opens. Expect your first leads within 24 hours of launch. From here, we run everything.",
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="py-28 relative border-t border-border overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-3"
          >
            How It Works
          </motion.h2>
          <motion.h3
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            A Complete System.{" "}
            <span className="accent-gradient-text">Built to Perform.</span>
          </motion.h3>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            AI handles the data. Humans handle the conversations. Here's exactly how every piece fits together to fill your pipeline month after month.
          </motion.p>
        </motion.div>

        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-500/10 border border-blue-500/15 rounded-full px-4 py-1.5">
              The Technology
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mb-10">
            Our custom AI agents are purpose-built for real estate lead generation. They don't just scrape data — they source, score, organize, and optimize your entire pipeline automatically.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-card border border-border rounded-2xl p-7 hover:border-primary/25 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <card.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-foreground font-display mb-3">{card.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-500/10 border border-emerald-500/15 rounded-full px-4 py-1.5">
              The Human Layer
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mb-10">
            AI finds the leads — but it takes a real person to build trust, handle objections, and close a meeting. Our professional cold callers in Egypt are trained, scripted, and managed by the CEO personally.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {humanSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex gap-4 bg-card border border-border rounded-2xl p-6 hover:border-emerald-500/25 transition-all duration-300 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground font-display mb-1.5">{step.label}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/15 rounded-full px-4 py-1.5">
              Your Journey
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mb-10">
            From first payment to a fully operational pipeline in 30 days. Four clear steps — no ambiguity, no delays.
          </p>

          <div className="max-w-3xl mx-auto">
            {processSteps.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex gap-6 relative group mb-4 last:mb-0"
              >
                {index !== processSteps.length - 1 && (
                  <div className="absolute left-[28px] top-[60px] bottom-[-16px] w-[2px] bg-border group-hover:bg-primary/30 transition-colors duration-300 z-0"></div>
                )}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary border-2 border-border flex items-center justify-center font-display font-bold text-xl text-primary shadow-sm relative z-10 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300">
                  {phase.number}
                </div>
                <div className="bg-card border border-border group-hover:border-primary/20 rounded-2xl px-6 py-5 flex-1 transition-all duration-300 mb-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h4 className="text-xl font-bold text-foreground font-display">{phase.title}</h4>
                    <span className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1">
                      {phase.badge}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8 shadow-sm"
        >
          <p className="text-foreground font-display font-bold text-xl mb-3">
            This is what's waiting on the other side.
          </p>
          <p className="text-muted-foreground mb-6">
            A fully built, fully managed lead operation — running 24/7 while you focus on closing deals.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book Your Strategy Call
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
