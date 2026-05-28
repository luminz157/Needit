import { useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"]
  });

  const phases = [
    {
      title: "Validate",
      desc: "Focus on establishing a strong brand identity, conducting thorough market validation, and developing a comprehensive go-to-market strategy to ensure a solid foundation."
    },
    {
      title: "Expand",
      desc: "Begin your international journey by securing dedicated export support and establishing reliable distributor networks to build your initial global presence."
    },
    {
      title: "Scale",
      desc: "Optimize your manufacturing pipelines and gain exclusive access to our network of investors to rapidly scale your operations worldwide."
    }
  ];

  const timeline = [
    { time: "30-Day", title: "Market Readiness", desc: "Complete market research, validate product-market fit, and finalize your go-to-market strategy." },
    { time: "60-Day", title: "Expansion Setup", desc: "Secure necessary compliance, begin distributor networking, and establish your initial presence." },
    { time: "90-Day", title: "Global Scaling Roadmap", desc: "Launch operations, secure strategic partnerships, and prepare for TRL 6+ investor pitching." }
  ];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-20">
        <motion.p variants={fadeUp} className="text-[11px] font-extrabold tracking-[0.35em] text-black mb-5 uppercase">Core Program</motion.p>
        <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-white bg-gradient-to-r from-[#114b53] to-[#1e6a75] px-8 py-5 rounded-3xl inline-block mb-6 tracking-tighter shadow-xl shadow-teal-500/20">
          Startup Global Expansion Program
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[16px] text-black font-bold max-w-2xl mx-auto leading-relaxed">
          A structured, phased approach designed to build credibility and systematically scale your business into international markets.
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-stretch">
        {/* Phases Section */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-black mb-8 tracking-tight">Expansion Phases</h2>
          <div className="flex flex-col gap-6 flex-grow">
            {phases.map((phase, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group bg-white rounded-[1.5rem] p-8 border border-teal-50/80 shadow-2xl shadow-teal-100/40 relative overflow-hidden flex-grow cursor-default hover:shadow-2xl hover:border-teal-200"
              >
                {/* Left accent line */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-3" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 pl-4">
                    <h3 className="text-xl font-bold text-black tracking-tight transition-transform duration-300 group-hover:translate-x-2">{phase.title}</h3>
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 0 }}
                      className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    >
                      <ArrowRight size={20} className="text-pink-600" />
                    </motion.div>
                  </div>
                  <p className="text-[15px] text-black font-semibold leading-relaxed pl-4 transition-transform duration-300 group-hover:translate-x-2">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col h-full lg:pl-10">
          <h2 className="text-2xl font-bold text-black mb-8 tracking-tight">Timeline</h2>
          
          <div ref={containerRef} className="space-y-12 relative flex-grow">
            {/* Background Line */}
            <div className="absolute top-0 left-[0.9rem] bottom-0 w-[2px] -translate-x-px bg-teal-50 z-0" />
            
            {/* Animated Active Scroll Line */}
            <motion.div 
              style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              className="absolute top-0 left-[0.9rem] bottom-0 w-[2px] -translate-x-px bg-gradient-to-b from-teal-500 to-teal-600 z-0"
            />
            
            {timeline.map((item, index) => (
              <motion.div key={index} variants={fadeUp} className="relative flex items-start gap-8 z-10">
                <div className="w-8 h-8 rounded-full bg-white border-4 border-indigo-600 flex items-center justify-center shrink-0 z-10 shadow-sm mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-lg font-bold text-teal-500">{item.time}</p>
                    <span className="w-5 h-[2px] bg-teal-100"></span>
                    <p className="text-xl font-bold text-black">{item.title}</p>
                  </div>
                  <p className="text-[15px] text-black font-semibold leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-16 pt-8">
            <a href="/contact" className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold flex items-center justify-center gap-2 hover:from-rose-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/20">
              Start Your Journey <ArrowRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
