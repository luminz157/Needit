import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Factory, Megaphone, Users, Handshake, FileText, Globe, Tag, Calendar } from 'lucide-react';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardCombined = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Manufacturing, Export & Distribution Support",
      description: "Manufacturer sourcing, coordination, export guidance, distributor network access and international market entry support.",
      icon: <Factory fill="currentColor" />,
      image: "/s1.png",
      fees: [
        { icon: <Tag size={16} className="text-[#1e0a3c]" />, text: "Consultation Fees: ₹10,000 (One-Time)" }
      ]
    },
    {
      title: "Digital Marketing Support",
      description: "Brand building, social media management, content strategy, ad campaign setup and lead generation for startups.",
      icon: <Megaphone fill="currentColor" />,
      image: "/s2.png",
      fees: [
        { icon: <Calendar size={16} className="text-[#1e0a3c]" />, text: "Fees: ₹20,000 / Month" }
      ]
    },
    {
      title: "Co-Working Space Support",
      description: "Access to co-working spaces, incubation networks and startup ecosystem to help you build and grow.",
      icon: <Users fill="currentColor" />,
      image: "/s3.png",
      fees: [
        { icon: <Tag size={16} className="text-[#1e0a3c]" />, text: "Support Fees: ₹10,000 (One-Time)" }
      ]
    },
    {
      title: "Investor Access Support",
      tag: "TRL 6+ Only",
      description: "Investor readiness guidance, pitch deck review, VC & angel investor introductions and funding network access.",
      icon: <Handshake fill="currentColor" />,
      image: "/s4.png",
      fees: [
        { icon: <Tag size={16} className="text-[#1e0a3c]" />, text: "3% Success Fee on Total Funds Raised" }
      ]
    },
    {
      title: "Grant Application Guidance",
      description: "End-to-end support in identifying, applying and securing government and private grants for your startup.",
      icon: <FileText fill="currentColor" />,
      image: "/s5.png",
      fees: [
        { icon: <Tag size={16} className="text-[#1e0a3c]" />, text: "Consultation Fees: ₹10,000 (One-Time)" }
      ]
    },
    {
      title: "Global Expansion Support",
      description: "International market research, business expansion strategy, global partnerships and trade connections.",
      icon: <Globe fill="transparent" />,
      image: "/s6.jpeg",
      fees: [
        { icon: <Tag size={16} className="text-[#1e0a3c]" />, text: "Consultation Fees: ₹10,000 (One-Time)" }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-16">
        <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-[#1e0a3c] mb-4 tracking-tighter">
          Our Services
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[16px] text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Foundriva empowers high-potential startups by providing end-to-end support for growth, global expansion, and investor access.
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
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardCombined}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-44 w-full overflow-hidden bg-gray-50">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              
              {/* Curved Background for Icon */}
              <svg className="absolute top-0 left-0 h-full w-32 text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
                <path d="M0,0 L0,100 L35,100 Q100,50 35,0 Z" />
              </svg>
              
              {/* Icon Container */}
              <div className="absolute top-1/2 left-6 -translate-y-1/2 text-[#1e0a3c]">
                {React.cloneElement(service.icon, { size: 48, strokeWidth: 1.5 })}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start gap-3 mb-2 min-h-[56px]">
                <h3 className="text-[19px] font-bold text-[#1e0a3c] leading-snug">{service.title}</h3>
                {service.tag && (
                  <span className="bg-[#1e0a3c]/5 text-[#1e0a3c] text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap mt-1 border border-[#1e0a3c]/10">
                    {service.tag}
                  </span>
                )}
              </div>
              
              <p className="text-[14px] text-gray-600 leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              {/* Fees Section */}
              <div className="flex flex-col gap-2 mt-auto">
                {service.fees.map((fee, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] font-semibold text-[#1e0a3c] bg-[#1e0a3c]/5 px-3 py-2 rounded-lg border border-[#1e0a3c]/10">
                    {fee.icon}
                    <span>{fee.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
