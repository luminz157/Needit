import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, DollarSign, Briefcase, Shield, Settings, Layout, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: {
    y: -12,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const iconAnimation = {
  rest: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.15,
    rotate: 10,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const itemAnimation = {
  rest: { x: 0, opacity: 1 },
  hover: {
    x: 4,
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const cardCombined = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -12,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Co-Working Space",
      icon: <Layout />,
      items: ["Flexible desk plans and dedicated meeting rooms", "Community events and mentor-led networking", "High-speed internet and office support services"]
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
          const isHighlight = service.type === 'highlight';
          const isDark = !isHighlight && index % 2 === 1;
          return (
          <motion.div 
            key={index}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardCombined}
            className={`group relative ${isHighlight ? 'col-span-3 lg:max-w-[50%] mx-auto' : ''} flex flex-col ${isHighlight ? 'items-start text-left' : 'items-center text-center'} h-full min-h-[340px] rounded-[1.5rem] p-8 lg:p-10 border transition-all shadow-2xl hover:shadow-xl overflow-hidden ${
              isHighlight
                ? 'bg-[#f8fafc] text-[#1e0a3c] border-[#1e0a3c]/10 shadow-[#1e0a3c]/10 hover:shadow-[#1e0a3c]/40'
                : isDark 
                  ? 'bg-[#1e0a3c] text-white border-[#1e0a3c]/10 shadow-[#1e0a3c]/30 hover:shadow-[#1e0a3c]/50' 
                  : 'bg-white text-[#1e0a3c] border-[#1e0a3c]/5 shadow-[#1e0a3c]/10 hover:shadow-[#1e0a3c]/20'
            }`}>
            {/* Animated border glow effect */}
            <motion.div 
              className={`absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                isHighlight
                  ? 'bg-gradient-to-r from-[#1e0a3c]/10 via-[#1e0a3c]/15 to-transparent'
                  : isDark 
                    ? 'bg-gradient-to-r from-white/10 via-white/5 to-transparent' 
                    : 'bg-gradient-to-r from-[#1e0a3c]/10 via-[#1e0a3c]/5 to-transparent'
              }`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300 ${isHighlight ? 'bg-[#1e0a3c] text-white' : isDark ? 'bg-white/10 group-hover:bg-white/15' : 'bg-[#1e0a3c]/5 group-hover:bg-[#1e0a3c]/10'}`}
              initial="rest"
              whileHover="hover"
              variants={iconAnimation}
            >
              {React.cloneElement(service.icon, { className: `w-10 h-10 ${isHighlight ? 'text-white' : isDark ? 'text-white' : 'text-[#1e0a3c]'}` })}
            </motion.div>
            <h3 className={`relative z-10 text-2xl font-bold mb-4 tracking-tight ${isHighlight ? 'text-[#1e0a3c]' : isDark ? 'text-white' : 'text-[#1e0a3c]'}`}>{service.title}</h3>
            {service.note && (
              <motion.span 
                className={`relative z-10 inline-block w-fit px-3 py-1 text-xs font-bold rounded-full mb-4 ${isDark ? 'bg-white/10 text-white' : 'bg-[#1e0a3c]/10 text-[#1e0a3c]'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {service.note}
              </motion.span>
            )}
            {isHighlight ? (
              <>
                <ul className="relative z-10 list-disc list-inside space-y-3 mt-4 text-[15px] text-[#1e0a3c]/70 leading-relaxed font-bold">
                  {service.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className="relative z-10 space-y-4 w-full text-left mt-4">
                {service.items.map((item, i) => (
                  <motion.li 
                    key={i} 
                    className={`flex items-start gap-3 text-[15px] font-bold ${isDark ? 'text-white/80' : 'text-[#1e0a3c]/80'}`}
                    initial="rest"
                    whileHover="hover"
                    variants={itemAnimation}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ArrowRight size={18} className={`mt-0.5 shrink-0 transition-colors duration-300 ${isDark ? 'text-white/40 group-hover:text-white/60' : 'text-[#1e0a3c]/40 group-hover:text-[#1e0a3c]/60'}`} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )})}
      </motion.div>
    </div>
  );
}
