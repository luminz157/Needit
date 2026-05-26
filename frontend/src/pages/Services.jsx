import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, Megaphone, Users, Handshake, FileText, Globe, Tag, Calendar, X } from 'lucide-react';

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
  const [showTerms, setShowTerms] = useState(false);

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
        { icon: <Tag size={16} className="text-orange-600" />, text: "Fees: ₹20,000" }
      ]
    },
    {
      title: "Digital Marketing Support",
      description: "Brand building, social media management, content strategy, ad campaign setup and lead generation for startups.",
      icon: <Megaphone fill="currentColor" />,
      image: "/s2.png",
      fees: [
        { icon: <Tag size={16} className="text-teal-600" />, text: "Fees: ₹20,000" }
      ]
    },
    {
      title: "Co-Working Space Support",
      description: "Access to co-working spaces, incubation networks and startup ecosystem to help you build and grow.",
      icon: <Users fill="currentColor" />,
      image: "/s3.png",
      fees: [
        { icon: <Tag size={16} className="text-teal-600" />, text: "Fees: ₹20,000" }
      ]
    },
    {
      title: "Investor Access Support",
      tag: "TRL 6+ Only",
      description: "Investor readiness guidance, pitch deck review, VC & angel investor introductions and funding network access.",
      icon: <Handshake fill="currentColor" />,
      image: "/s4.png",
      fees: [
        { icon: <Tag size={16} className="text-cyan-600" />, text: "Fees: ₹20,000" }
      ]
    },
    {
      title: "Global Expansion Support",
      description: "International market research, business expansion strategy, global partnerships and trade connections.",
      icon: <Globe fill="transparent" />,
      image: "/s6.png",
      fees: [
        { icon: <Tag size={16} className="text-red-600" />, text: "Fees: ₹20,000" }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-16">
        <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-white bg-gradient-to-r from-[#114b53] to-[#1e6a75] px-8 py-5 rounded-3xl inline-block mb-4 tracking-tighter shadow-xl shadow-teal-500/20">
          Our Services
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[16px] text-black font-bold max-w-2xl mx-auto leading-relaxed">
          scaleaccessnetwork empowers high-potential startups by providing end-to-end support for growth, global expansion, and investor access.
        </motion.p>
      </motion.div>

      <div className="mx-auto w-full max-w-[1120px]">
        {/* Large screens: top row 3 cards, bottom row 2 cards centered */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.slice(0,3).map((service, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, ease: "easeOut", delay: index * 0.1 } 
                },
                hover: { y: -5, transition: { duration: 0.3, ease: "easeOut" } }
              }}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-teal-50/80 shadow-2xl shadow-teal-100/40 hover:border-teal-200 transition-all duration-300 hover:shadow-teal-200/50"
            >
              <div className="relative h-44 w-full overflow-hidden bg-teal-50">
                <img src={service.image} alt={service.title} className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.08] object-cover ${service.imageClass || ''}`} />
                <svg className="absolute top-0 left-0 h-full w-32 text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,0 L0,100 L35,100 Q100,50 35,0 Z" />
                </svg>
                <div className="absolute top-1/2 left-5 -translate-y-1/2 text-teal-500">
                  {React.cloneElement(service.icon, { size: 48, strokeWidth: 1.5 })}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start gap-3 mb-2 min-h-[56px]">
                  <h3 className="text-[19px] font-bold text-black leading-snug">{service.title}</h3>
                  {service.tag && (
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap mt-1 border border-amber-200">
                      {service.tag}
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-black font-semibold leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="flex flex-col gap-2 mt-auto">
                  {service.fees.map((fee, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px] font-semibold text-black bg-teal-50/50 px-3 py-2 rounded-lg border border-teal-100/50">
                      {fee.icon}
                      <span>{fee.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row for large screens: center the two remaining cards */}
        <div className="hidden lg:flex justify-center gap-x-8 mt-8">
          {services.slice(3).map((service, idx) => (
            <div key={idx} className="w-[33%]">
              <motion.div 
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: idx * 0.1 } },
                  hover: { y: -5, transition: { duration: 0.3, ease: "easeOut" } }
                }}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-teal-50/80 shadow-2xl shadow-teal-100/40 hover:border-teal-200 transition-all duration-300 hover:shadow-teal-200/50 h-full"
              >
                <div className="relative h-44 w-full overflow-hidden bg-teal-50">
                  <img src={service.image} alt={service.title} className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.08] object-cover ${service.imageClass || ''}`} />
                  <svg className="absolute top-0 left-0 h-full w-32 text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
                    <path d="M0,0 L0,100 L35,100 Q100,50 35,0 Z" />
                  </svg>
                  <div className="absolute top-1/2 left-5 -translate-y-1/2 text-teal-500">
                    {React.cloneElement(service.icon, { size: 48, strokeWidth: 1.5 })}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start gap-3 mb-2 min-h-[56px]">
                    <h3 className="text-[19px] font-bold text-black leading-snug">{service.title}</h3>
                    {service.tag && (
                      <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap mt-1 border border-amber-200">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] text-black font-semibold leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-col gap-2 mt-auto">
                    {service.fees.map((fee, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px] font-semibold text-black bg-teal-50/50 px-3 py-2 rounded-lg border border-teal-100/50">
                        {fee.icon}
                        <span>{fee.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile & tablet fallback: simple 2-column grid */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, ease: "easeOut", delay: index * 0.1 } 
                },
                hover: { y: -5, transition: { duration: 0.3, ease: "easeOut" } }
              }}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-teal-50/80 shadow-2xl shadow-teal-100/40 hover:border-teal-200 transition-all duration-300 hover:shadow-teal-200/50"
            >
              <div className="relative h-44 w-full overflow-hidden bg-teal-50">
                <img src={service.image} alt={service.title} className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.08] object-cover ${service.imageClass || ''}`} />
                <svg className="absolute top-0 left-0 h-full w-32 text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,0 L0,100 L35,100 Q100,50 35,0 Z" />
                </svg>
                <div className="absolute top-1/2 left-5 -translate-y-1/2 text-teal-500">
                  {React.cloneElement(service.icon, { size: 48, strokeWidth: 1.5 })}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start gap-3 mb-2 min-h-[56px]">
                  <h3 className="text-[19px] font-bold text-black leading-snug">{service.title}</h3>
                  {service.tag && (
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap mt-1 border border-amber-200">
                      {service.tag}
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-black font-semibold leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="flex flex-col gap-2 mt-auto">
                  {service.fees.map((fee, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px] font-semibold text-black bg-teal-50/50 px-3 py-2 rounded-lg border border-teal-100/50">
                      {fee.icon}
                      <span>{fee.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Terms and Conditions Section */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={fadeUp}
        className="mt-16 max-w-3xl mx-auto text-center"
      >
        <button 
          onClick={() => setShowTerms(true)}
          className="text-black font-bold hover:text-teal-500 flex items-center justify-center gap-2 mx-auto transition-colors bg-white hover:bg-teal-50/30 px-8 py-3.5 rounded-full border border-teal-100/80 shadow-sm"
        >
          <span>Terms and Conditions</span>
        </button>
      </motion.div>

      {/* Modal Popup - rendered via Portal to cover footer/navbar */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {showTerms && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                  <button 
                    onClick={() => setShowTerms(false)}
                    className="p-2 -ml-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800 focus:outline-none"
                  >
                    <X size={20} />
                  </button>
                  <h2 className="text-xl font-bold text-black">Terms and Conditions</h2>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                  <ul className="space-y-4 text-[15px] text-gray-600 list-disc list-inside leading-relaxed">
                    <li>Consultation fees are non-refundable once service execution begins.</li>
                    <li>Investor access support is subject to startup evaluation and scalability assessment.</li>
                    <li>Manufacturing, distribution, and export support are dependent on sector feasibility and partner availability.</li>
                    <li>Digital marketing advertising budgets are separate from service charges.</li>
                    <li>scaleaccessnetwork does not guarantee funding, investment approvals, distributor onboarding, or export approvals.</li>
                    <li>Timelines may vary depending on startup requirements and third-party coordination.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
