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
      title: "Market Access 🌍",
      icon: <Globe className="w-8 h-8 text-[#1e0a3c]" />,
      items: ["International market entry", "Global partnerships", "Expansion strategy", "Business matchmaking"]
    },
    {
      title: "Digital Marketing & Growth 📢",
      icon: <TrendingUp className="w-8 h-8 text-[#1e0a3c]" />,
      items: ["Performance marketing", "Social media growth", "Branding", "Lead generation"]
    },
    {
      title: "Startup Funding 💰",
      icon: <DollarSign className="w-8 h-8 text-[#1e0a3c]" />,
      note: "TRL 6+ only",
      items: ["Investor introductions", "Angel network access", "VC connectivity"]
    },
    {
      title: "Incubation Support",
      icon: <Briefcase className="w-8 h-8 text-[#1e0a3c]" />,
      items: ["Mentorship", "Startup planning", "Business strategy"]
    },
    {
      title: "Export & Compliance 🚢",
      icon: <Shield className="w-8 h-8 text-[#1e0a3c]" />,
      items: ["Export facilitation", "Market entry advisory"]
    },
    {
      title: "Manufacturing & Localization 🏭",
      icon: <Settings className="w-8 h-8 text-[#1e0a3c]" />,
      items: ["Vendor identification", "Local production setup", "Supply chain support"]
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
        {services.map((service, index) => (
          <motion.div 
            key={index}
            variants={fadeUp}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="bg-white rounded-[1.5rem] p-8 border border-[#1e0a3c]/5 shadow-2xl shadow-[#1e0a3c]/10 transition-all hover:shadow-[#1e0a3c]/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#1e0a3c]/5 flex items-center justify-center mb-6">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-[#1e0a3c] mb-4 tracking-tight">{service.title}</h3>
            {service.note && (
              <span className="inline-block px-3 py-1 bg-[#1e0a3c]/10 text-[#1e0a3c] text-xs font-bold rounded-full mb-4">
                {service.note}
              </span>
            )}
            <ul className="space-y-3">
              {service.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-[#1e0a3c]/70 font-bold">
                  <ArrowRight size={16} className="mt-0.5 text-[#1e0a3c]/40 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
