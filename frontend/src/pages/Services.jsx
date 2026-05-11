import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, DollarSign, Briefcase, Shield, Settings, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Market Access",
      icon: <Globe />,
      items: ["International market entry", "Global partnerships", "Expansion strategy", "Business matchmaking"]
    },
    {
      title: "Export Support",
      icon: <Shield />,
      items: ["Regulatory guidance for export markets", "Export documentation and customs support", "Market clearance and compliance assistance", "Strategic export route planning"]
    },
    {
      title: "Distributor Network",
      icon: <Briefcase />,
      items: ["Channel partner sourcing and onboarding", "Distributor agreement support", "Market coverage planning", "Logistics and local distribution coordination"]
    },
    {
      title: "Manufacturing Support",
      icon: <Settings />,
      items: ["Vendor evaluation and selection", "Local production setup", "Manufacturing optimization", "Quality assurance and supply chain support"]
    },
    {
      title: "Investor Access",
      note: "For eligible startups",
      icon: <TrendingUp />,
      items: ["Investor introductions and networking", "Pitch deck preparation", "Due diligence readiness", "Capital raise guidance"]
    },
    {
      title: "Grant Application",
      icon: <DollarSign />,
      items: ["Grant opportunity sourcing", "Proposal and application support", "Submission tracking", "Eligibility and documentation review"]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-16">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.35em] text-[#1e0a3c] opacity-50 mb-5 uppercase">What We Offer</motion.p>
        <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-[#1e0a3c] mb-6 tracking-tighter">
          Detailed Services
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[16px] text-[#1e0a3c]/60 font-bold max-w-2xl mx-auto leading-relaxed">
          Comprehensive support tailored to accelerate your startup's growth, from market validation to global expansion.
        </motion.p>
      </motion.div>

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={stagger}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service, index) => {
          const isDark = index % 2 === 1;
          return (
          <motion.div 
            key={index}
            variants={fadeUp}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`group flex flex-col items-center text-center h-full min-h-[340px] rounded-[1.5rem] p-8 lg:p-10 border transition-all shadow-2xl hover:shadow-xl ${
              isDark 
                ? "bg-[#1e0a3c] text-white border-[#1e0a3c]/10 shadow-[#1e0a3c]/30 hover:shadow-[#1e0a3c]/50" 
                : "bg-white text-[#1e0a3c] border-[#1e0a3c]/5 shadow-[#1e0a3c]/10 hover:shadow-[#1e0a3c]/20"
            }`}
          >
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:rotate-[45deg] ${isDark ? "bg-white/10" : "bg-[#1e0a3c]/5"}`}>
              {React.cloneElement(service.icon, { className: `w-10 h-10 ${isDark ? "text-white" : "text-[#1e0a3c]"}` })}
            </div>
            <h3 className={`text-2xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-[#1e0a3c]"}`}>{service.title}</h3>
            {service.note && (
              <span className={`inline-block w-fit px-3 py-1 text-xs font-bold rounded-full mb-4 ${isDark ? "bg-white/10 text-white" : "bg-[#1e0a3c]/10 text-[#1e0a3c]"}`}>
                {service.note}
              </span>
            )}
            <ul className="space-y-4 w-full text-left mt-4">
              {service.items.map((item, i) => (
                <li key={i} className={`flex items-start gap-3 text-[15px] font-bold ${isDark ? "text-white/80" : "text-[#1e0a3c]/80"}`}>
                  <ArrowRight size={18} className={`mt-0.5 shrink-0 ${isDark ? "text-white/40" : "text-[#1e0a3c]/40"}`} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )})}
      </motion.div>
    </div>
  );
}
