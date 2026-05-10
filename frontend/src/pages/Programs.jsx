import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Programs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phases = [
    {
      title: "Phase 1 — Validate",
      items: ["Branding", "Market validation", "Go-to-market planning"]
    },
    {
      title: "Phase 2 — Expand",
      items: ["Export support", "Distributor setup"]
    },
    {
      title: "Phase 3 — Scale",
      items: ["Manufacturing", "Investor access"]
    }
  ];

  const timeline = [
    { time: "30-Day", title: "Market Readiness" },
    { time: "60-Day", title: "Expansion Setup" },
    { time: "90-Day", title: "Global Scaling Roadmap" }
  ];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-20">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.35em] text-[#1e0a3c] opacity-50 mb-5 uppercase">Core Program</motion.p>
        <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-[#1e0a3c] mb-6 tracking-tighter">
          Startup Global Expansion Program
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[16px] text-[#1e0a3c]/60 font-bold max-w-2xl mx-auto leading-relaxed">
          A structured, phased approach designed to build credibility and systematically scale your business into international markets.
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Phases Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1e0a3c] mb-8 tracking-tight">Expansion Phases</h2>
          {phases.map((phase, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              className="bg-white rounded-[1.5rem] p-8 border border-[#1e0a3c]/5 shadow-xl shadow-[#1e0a3c]/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1e0a3c]" />
              <h3 className="text-xl font-bold text-[#1e0a3c] mb-5 tracking-tight pl-4">{phase.title}</h3>
              <ul className="space-y-3 pl-4">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] text-[#1e0a3c]/80 font-bold">
                    <CheckCircle2 size={18} className="text-[#1e0a3c]/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="bg-[#1e0a3c] text-white rounded-[2rem] p-10 lg:p-12 shadow-2xl sticky top-32">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
            <Clock className="w-8 h-8 text-white/50" />
            <h2 className="text-3xl font-bold tracking-tight">Timeline</h2>
          </motion.div>
          
          <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.1rem] before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-white/20 before:to-transparent">
            {timeline.map((item, index) => (
              <motion.div key={index} variants={fadeUp} className="relative flex items-center gap-6">
                <div className="w-9 h-9 rounded-full bg-[#1e0a3c] border-4 border-white flex items-center justify-center shrink-0 z-10 shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-wider text-white/50 mb-1">{item.time}</p>
                  <p className="text-xl font-bold">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-14">
            <a href="/contact" className="w-full py-4 rounded-xl bg-white text-[#1e0a3c] font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              Start Your Journey <ArrowRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
