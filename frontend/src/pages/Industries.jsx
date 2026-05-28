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
      icon: <Cpu className="w-14 h-14 p-3.5 bg-blue-100 text-blue-600 rounded-2xl" />,
      description: "Empowering next-gen algorithms, machine learning models, and complex computational architectures.",
      opportunity: "Scale AI products globally and secure infrastructure funding."
    },
    {
      title: "FinTech",
      icon: <CreditCard className="w-14 h-14 p-3.5 bg-pink-100 text-pink-600 rounded-2xl" />,
      description: "Disrupting traditional finance with blockchain, payments, and decentralized financial systems.",
      opportunity: "Navigate global financial compliance and access FinTech VC networks."
    },
    {
      title: "BioTech & Life Sciences",
      icon: <Activity className="w-14 h-14 p-3.5 bg-orange-100 text-orange-600 rounded-2xl" />,
      description: "Advancing human health through genetic engineering, pharmaceuticals, and biomedical research.",
      opportunity: "Connect with specialized investors and clinical testing partners."
    },
    {
      title: "AgriTech",
      icon: <Leaf className="w-14 h-14 p-3.5 bg-teal-100 text-teal-600 rounded-2xl" />,
      description: "Revolutionizing farming, crop yields, and agricultural supply chains with modern technology.",
      opportunity: "Expand into emerging markets and secure agricultural subsidies."
    },
    {
      title: "Food Tech",
      icon: <Coffee className="w-14 h-14 p-3.5 bg-teal-100 text-teal-600 rounded-2xl" />,
      description: "Innovating the food industry from alternative proteins to smart kitchen technologies.",
      opportunity: "Scale production manufacturing and establish international distribution."
    },
    {
      title: "Manufacturing & Industrial",
      icon: <Factory className="w-14 h-14 p-3.5 bg-cyan-100 text-cyan-600 rounded-2xl" />,
      description: "Modernizing production lines with Industry 4.0, IoT, and automated robotics.",
      opportunity: "Optimize supply chains and setup global manufacturing hubs."
    },
    {
      title: "MedTech",
      icon: <Stethoscope className="w-14 h-14 p-3.5 bg-red-100 text-red-600 rounded-2xl" />,
      description: "Creating life-saving medical devices, digital health apps, and diagnostic tools.",
      opportunity: "Accelerate regulatory approvals and hospital procurement networks."
    },
    {
      title: "ClimateTech",
      icon: <CloudRain className="w-14 h-14 p-3.5 bg-emerald-100 text-emerald-600 rounded-2xl" />,
      description: "Combating climate change through renewable energy, carbon capture, and sustainable practices.",
      opportunity: "Access green-tech funds and international sustainability grants."
    }
  ];

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1200px] mx-auto min-h-screen overflow-x-hidden">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-24">
        <motion.p variants={fadeUp} className="text-[11px] font-extrabold tracking-[0.35em] text-black mb-5 uppercase">Sectors</motion.p>
        <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-white bg-gradient-to-r from-[#114b53] to-[#1e6a75] px-8 py-5 rounded-3xl inline-block mb-6 tracking-tighter shadow-xl shadow-teal-500/20">
          Industries We Support
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[16px] text-black font-bold max-w-2xl mx-auto leading-relaxed">
          We bring specialized expertise and global networks to startups across diverse, high-impact industries.
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-8 lg:gap-10">
        {industries.map((ind, index) => (
          <div 
            key={index}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-4 lg:gap-6`}
          >
            {/* Title Box (Gradient) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              whileHover={{ scale: 1.02, y: -5 }}
              className="w-full lg:w-[32%] group cursor-default"
            >
              <div className={`${index % 2 === 0 ? 'bg-gradient-to-br from-[#f4625d] to-[#e24b47] shadow-rose-500/20' : 'bg-gradient-to-br from-[#0f766e] to-[#07575d] shadow-teal-900/20'} h-full rounded-[1.5rem] p-6 lg:p-8 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-500`}>
                <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-1.5 h-full bg-white/25`} />
                
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-teal-500 transition-all duration-500">
                  <div className="text-white group-hover:text-teal-500 transition-colors duration-500">
                    {React.cloneElement(ind.icon, { className: "w-6 h-6" })}
                  </div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight leading-tight">
                  {ind.title}
                </h3>
              </div>
            </motion.div>

            {/* Information Box (White) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={index % 2 === 0 ? slideInRight : slideInLeft}
              whileHover={{ scale: 1.01, y: -2 }}
              className="w-full lg:w-[68%] group cursor-default"
            >
              <div className="bg-white h-full rounded-[1.5rem] p-6 lg:p-8 border border-teal-50/80 shadow-2xl shadow-teal-100/40 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-teal-200 flex flex-col justify-center">
                <p className="text-[15px] lg:text-[17px] text-black font-semibold mb-4 leading-relaxed">
                  {ind.description}
                </p>
                
                <div className="pt-4 border-t border-teal-100/50">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase block mb-1">Startup Opportunity</span>
                  <p className="text-[14px] lg:text-[16px] font-bold text-black leading-relaxed italic">
                    "{ind.opportunity}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
