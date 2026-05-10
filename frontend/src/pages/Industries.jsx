import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CreditCard, Activity, Leaf, Coffee, Factory, Stethoscope, CloudRain } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Industries() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const industries = [
    {
      title: "Artificial Intelligence & DeepTech",
      icon: <Cpu className="w-8 h-8 text-[#1e0a3c]" />,
      description: "Empowering next-gen algorithms, machine learning models, and complex computational architectures.",
      opportunity: "Scale AI products globally and secure infrastructure funding."
    },
    {
      title: "FinTech",
      icon: <CreditCard className="w-8 h-8 text-[#1e0a3c]" />,
      description: "Disrupting traditional finance with blockchain, payments, and decentralized financial systems.",
      opportunity: "Navigate global financial compliance and access FinTech VC networks."
    },
    {
      title: "BioTech & Life Sciences",
      icon: <Activity className="w-8 h-8 text-[#1e0a3c]" />,
      description: "Advancing human health through genetic engineering, pharmaceuticals, and biomedical research.",
      opportunity: "Connect with specialized investors and clinical testing partners."
    },
    {
      title: "AgriTech",
      icon: <Leaf className="w-8 h-8 text-[#1e0a3c]" />,
      description: "Revolutionizing farming, crop yields, and agricultural supply chains with modern technology.",
      opportunity: "Expand into emerging markets and secure agricultural subsidies."
    },
    {
      title: "Food",
      icon: <Coffee className="w-8 h-8 text-[#1e0a3c]" />,
      description: "Innovating the food industry from alternative proteins to smart kitchen technologies.",
      opportunity: "Scale production manufacturing and establish international distribution."
    },
    {
      title: "Manufacturing & Industrial",
      icon: <Factory className="w-8 h-8 text-[#1e0a3c]" />,
      description: "Modernizing production lines with Industry 4.0, IoT, and automated robotics.",
      opportunity: "Optimize supply chains and setup global manufacturing hubs."
    },
    {
      title: "MedTech",
      icon: <Stethoscope className="w-8 h-8 text-[#1e0a3c]" />,
      description: "Creating life-saving medical devices, digital health apps, and diagnostic tools.",
      opportunity: "Accelerate regulatory approvals and hospital procurement networks."
    },
    {
      title: "ClimateTech",
      icon: <CloudRain className="w-8 h-8 text-[#1e0a3c]" />,
      description: "Combating climate change through renewable energy, carbon capture, and sustainable practices.",
      opportunity: "Access green-tech funds and international sustainability grants."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-16">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.35em] text-[#1e0a3c] opacity-50 mb-5 uppercase">Sectors</motion.p>
        <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-[#1e0a3c] mb-6 tracking-tighter">
          Industries We Support
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[16px] text-[#1e0a3c]/60 font-bold max-w-2xl mx-auto leading-relaxed">
          We bring specialized expertise and global networks to startups across diverse, high-impact industries.
        </motion.p>
      </motion.div>

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={stagger}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {industries.map((ind, index) => (
          <motion.div 
            key={index}
            variants={fadeUp}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="bg-white rounded-[1.5rem] p-8 border border-[#1e0a3c]/5 shadow-xl shadow-[#1e0a3c]/5 transition-all hover:shadow-[#1e0a3c]/20 group flex flex-col h-full"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1e0a3c]/5 flex items-center justify-center mb-6 group-hover:bg-[#1e0a3c] group-hover:text-white transition-colors">
              {ind.icon}
            </div>
            <h3 className="text-lg font-bold text-[#1e0a3c] mb-3 tracking-tight">{ind.title}</h3>
            <p className="text-[14px] text-[#1e0a3c]/60 font-medium mb-6 flex-grow leading-relaxed">
              {ind.description}
            </p>
            <div className="pt-5 border-t border-[#1e0a3c]/10 mt-auto">
              <p className="text-[10px] font-bold tracking-widest text-[#1e0a3c]/40 uppercase mb-2">Startup Opportunity</p>
              <p className="text-[13px] font-bold text-[#1e0a3c]/80 leading-tight">{ind.opportunity}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
