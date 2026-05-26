import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Rocket, 
  Target, 
  Briefcase, 
  Shield, 
  Zap, 
  Award, 
  Handshake, 
  Network, 
  Lightbulb, 
  ArrowRight,
  Mail,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Layers,
  Share2
} from 'lucide-react';
import { fadeUp, stagger } from '../utils/animations.js';

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.h2 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="text-4xl lg:text-[50px] font-bold text-black mb-6 tracking-tighter"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
        className="text-[17px] text-black font-bold max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay = 0, colorClass = "bg-blue-100 text-blue-600" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    custom={delay}
    whileHover={{ y: -8 }}
    className="bg-white p-8 rounded-[2rem] border border-teal-50/80 shadow-2xl shadow-teal-100/40 hover:shadow-2xl hover:shadow-teal-200/50 hover:border-teal-200 transition-all duration-300 flex flex-col h-full"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${colorClass}`}>
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">{title}</h3>
    <p className="text-black font-semibold leading-relaxed">{description}</p>
  </motion.div>
);

const Partnership = () => {
  return (
    <div className="pt-24 pb-20 relative">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 mb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p 
              variants={fadeUp}
              className="text-[12px] font-extrabold tracking-[0.4em] text-teal-500 mb-6 uppercase"
            >
              Collaborative Ecosystem
            </motion.p>
            <motion.h1 
              variants={fadeUp}
              className="text-5xl lg:text-[72px] leading-[1.1] font-bold text-white bg-gradient-to-r from-[#114b53] to-[#1e6a75] px-10 py-6 rounded-[3rem] inline-block mb-10 tracking-tighter shadow-xl shadow-teal-500/20"
            >
              Partner With Us <br />
              <span className="text-teal-200">Incubation Centers</span>
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-[20px] text-black font-bold leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              Build the Next Generation of Startups Together. We collaborate with innovation hubs and ecosystems to bridge the gap between innovation and execution.
            </motion.p>
            
             <motion.div variants={fadeUp} className="flex justify-center gap-4">
               <a 
                href="https://forms.gle/FYk8TNABaD7w2Jag8" 
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-[1.25rem] bg-white border-2 border-indigo-600 text-teal-500 flex items-center justify-center hover:bg-rose-500 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-teal-100/40 font-bold tracking-widest text-[14px] gap-2"
              >
                <Handshake size={20} /> Become a Partner
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl translate-x-1/2" />
      </section>

      {/* About Partnership */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-4xl lg:text-[46px] font-bold text-black leading-[1.1] tracking-tighter mb-8">
                Empowering founders <br /> through synergy.
              </h2>
              <p className="text-[17px] text-black font-bold leading-relaxed mb-8">
                At scaleaccessnetwork, we collaborate with incubation centers, innovation hubs, accelerators, universities, and startup ecosystems to support high-potential founders through mentorship, market access, branding, business development, and strategic growth support.
              </p>
                <p className="text-[17px] text-black font-bold leading-relaxed mb-8">
                  At scaleaccessnetwork, we collaborate with incubation centers, innovation hubs, accelerators, universities, and startup ecosystems to support high-potential founders through mentorship, market access, branding, business development, and strategic growth support.
                </p>
              <p className="text-[17px] text-black font-bold leading-relaxed">
                We believe strong ecosystems create successful startups. Through our incubation partnerships, we aim to bridge the gap between innovation and execution, ensuring every visionary founder has the platform they need to scale globally.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, label: 'Ecosystem', value: 'Global', colorClass: "bg-blue-100 text-blue-600" },
                { icon: Share2, label: 'Partners', value: '50+', colorClass: "bg-emerald-100 text-emerald-600" },
                { icon: Lightbulb, label: 'Innovation', value: 'High-Impact', colorClass: "bg-orange-100 text-orange-600" },
                { icon: Target, label: 'Focus', value: 'Growth', colorClass: "bg-teal-100 text-teal-600" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white p-8 rounded-[2rem] shadow-xl shadow-teal-100/40 border border-teal-50 text-center group hover:scale-105 transition-all duration-500"
                >
                  <div className="mb-6 flex justify-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${stat.colorClass}`}>
                      <stat.icon size={32} />
                    </div>
                  </div>
                  <p className="text-[12px] font-bold text-white/50 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner? - Refined (No Arrows, Darker Slide) */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto relative z-10">
          <SectionHeader 
            title="Why Partner With scaleaccessnetwork?" 
            subtitle="We provide specialized support tracks that complement incubation programs and accelerate startup success."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              { title: "Startup Ecosystem Support", desc: "We work closely with incubated startups to help them strengthen their business foundations and growth strategies." },
              { title: "Market Connections", desc: "Access to distribution partnerships, market expansion, business collaborations, and strategic networking opportunities." },
              { title: "Founder Development", desc: "Strategic guidance for pitch refinement, startup positioning, digital growth, and go-to-market assistance." },
              { title: "Extended Support", desc: "Enable startups to access branding, digital marketing, profiling, and investor readiness guidance." }
            ].map((item, i) => (
              <div key={i} className="relative flex">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i * 0.2}
                  className="relative p-8 rounded-xl bg-white border border-teal-50/80 shadow-2xl shadow-teal-100/40 flex flex-col w-full h-full group overflow-hidden min-h-[280px]"
                >
                  {/* Sequential Filling Dark Purple Background Animation */}
                  <motion.div 
                    animate={{ 
                      opacity: [0, 0.2, 0],
                      x: ['-100%', '0%', '100%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: i * 0.75,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-teal-600/10 pointer-events-none"
                  />

                  <div className="h-[90px] flex items-center justify-center mb-6 relative z-10">
                    <h3 className="text-2xl font-bold text-black tracking-tight leading-tight text-center">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-black font-semibold leading-relaxed relative z-10 text-[16px] text-center">
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Partner? - Kept in Image 2 style as per previous instructions */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto text-center">
          <SectionHeader 
            title="Who Can Partner With Us?" 
            subtitle="We welcome collaborations with organizations that are committed to empowering the next generation of entrepreneurs."
          />
          
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {[
              "Incubation Centers",
              "Startup Accelerators",
              "University Innovation Cells",
              "Entrepreneurship Development Cells",
              "Research & Innovation Parks",
              "Government Startup Missions",
              "Industry Associations",
              "Co-working Innovation Hubs"
            ].map((entity, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.05}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white px-8 py-5 rounded-2xl border border-teal-50/80 shadow-2xl shadow-teal-100/40 transition-all duration-300 flex items-center justify-center text-center min-w-[240px] hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 hover:border-transparent hover:shadow-teal-500/20 group cursor-default"
              >
                <span className="text-[16px] font-bold text-black group-hover:text-white leading-tight transition-colors">
                  {entity}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Opportunities - Ultra-Compact Square Grid */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SectionHeader 
            title="Partnership Opportunities" 
            subtitle="Ways we can work together to build a robust startup ecosystem."
          />
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto justify-items-center">
            {[
              {
                title: "Startup Support Collaboration",
                content: "Jointly support startups through mentorship, growth services, and ecosystem access.",
                icon: Users
              },
              {
                title: "Innovation Programs",
                content: "Collaborate on startup bootcamps, workshops, demo days, founder networking events, and innovation challenges.",
                icon: Zap
              },
              {
                title: "Market Access Support",
                content: "Help startups explore distribution opportunities, international market exposure, and business expansion pathways.",
                icon: Globe
              },
              {
                title: "Strategic Ecosystem Partnerships",
                content: "Build long-term ecosystem relationships that support startup growth and innovation.",
                icon: Network
              }
            ].map((opportunity, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="w-full aspect-square max-w-[320px] p-8 rounded-2xl bg-white border border-teal-50/80 shadow-2xl shadow-teal-100/40 flex flex-col items-center justify-start text-center group hover:scale-[1.03] transition-all duration-500 hover:border-teal-200 hover:shadow-teal-200/50"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 mb-6 mt-2 ${model.colorClass}`}>
                  <opportunity.icon size={28} />
                </div>

                <h3 className="text-2xl font-bold text-black tracking-tight leading-tight mb-4">{opportunity.title}</h3>

                <div>
                  <p className="text-black font-semibold leading-relaxed text-[15px]">{opportunity.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gain & Approach - Restored to Two-Column Layout */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            {/* What Startups Gain (Left Column) */}
            <div className="flex flex-col h-full">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-4xl font-bold text-black mb-12 tracking-tighter"
              >
                What Startups Gain
              </motion.h2>
              <div className="flex flex-col justify-between flex-grow gap-4">
                {[
                  "Business growth guidance",
                  "Branding and visibility support",
                  "Access to strategic networks",
                  "Founder mentoring",
                  "Market exploration opportunities",
                  "Startup ecosystem exposure"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i * 0.1}
                    whileHover={{ x: 12, backgroundColor: "rgba(20, 184, 166, 0.02)" }}
                    className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-teal-50/80 shadow-2xl shadow-teal-100/40 flex-grow cursor-default transition-all duration-300 hover:border-teal-200 hover:shadow-teal-200/30"
                  >
                    <CheckCircle2 className="text-blue-600" size={20} />
                    <span className="text-black font-bold text-[17px]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Our Approach (Right Column) */}
            <div className="flex flex-col h-full">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-4xl font-bold text-black mb-12 tracking-tighter"
              >
                Our Collaboration Approach
              </motion.h2>
              <div className="flex flex-col justify-between flex-grow gap-6">
                {[
                  { title: "Ethical startup support", desc: "Prioritizing the long-term well-being of founders and their ventures." },
                  { title: "Sustainable innovation", desc: "Developing solutions that stand the test of time and market fluctuations." },
                  { title: "Founder-first collaboration", desc: "Placing the founder's vision and development at the center of our work." },
                  { title: "Practical business growth", desc: "Focusing on real-world results and tangible expansion metrics." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i * 0.2}
                    whileHover={{ x: 12 }}
                    className="p-8 rounded-[2rem] bg-white border border-teal-50/80 shadow-2xl shadow-teal-100/40 flex-grow relative overflow-hidden group cursor-default hover:border-teal-200 hover:shadow-teal-200/50 transition-all duration-500"
                  >
                    <div className="flex items-center gap-6 relative z-10 h-full">
                      <span className="text-[32px] font-black text-teal-500/30 leading-none">
                        {i + 1}
                      </span>
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-black mb-2">{item.title}</h4>
                        <p className="text-black font-semibold text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ecosystems Choose scaleaccessnetwork - Redesigned to match Image 1 Style */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto text-center">
            <SectionHeader 
            title="Why Ecosystems Choose scaleaccessnetwork" 
            subtitle="We provide a structured framework to empower startups, accelerate growth, and foster sustainable innovation."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
            {[
              { title: "Incubation Centers", sub: "Startup Support", icon: Layers, colorClass: "bg-blue-100 text-blue-600" },
              { title: "Startup Accelerators", sub: "Growth Programs", icon: Rocket, colorClass: "bg-emerald-100 text-emerald-600" },
              { title: "University Innovation", sub: "Academic Synergy", icon: Lightbulb, colorClass: "bg-orange-100 text-orange-600" },
              { title: "Research & Parks", sub: "Tech Innovation", icon: Globe, colorClass: "bg-teal-100 text-teal-600" },
              { title: "Government Missions", sub: "Strategic Impact", icon: Target, colorClass: "bg-teal-100 text-teal-600" },
              { title: "Innovation Hubs", sub: "Ecosystem Access", icon: Network, colorClass: "bg-pink-100 text-pink-600" }
            ].map((entity, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.1}
                className="bg-white p-6 rounded-2xl border border-teal-50/80 shadow-2xl shadow-teal-100/40 hover:shadow-2xl hover:shadow-teal-200/50 hover:border-teal-200 transition-all duration-300 flex items-center gap-6 group text-left"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 ${entity.colorClass}`}>
                  <entity.icon size={26} />
                </div>
                <div>
                  <h4 className="text-[18px] font-bold text-black mb-1">{entity.title}</h4>
                  <p className="text-[13px] text-teal-500 font-bold uppercase tracking-wider">{entity.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-10"
          >
            <p className="text-[12px] font-extrabold tracking-[0.4em] text-teal-500 mb-2 uppercase">Ready to collaborate?</p>
            <h2 className="text-5xl lg:text-[64px] font-bold text-black tracking-tighter">Become an Incubation Partner</h2>
            <p className="text-[18px] text-black font-bold max-w-2xl mx-auto leading-relaxed">
              If your organization supports startups and innovation, we would love to explore collaboration opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-4">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <Mail size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                  <a href="mailto:scaleaccessnetwork@gmail.com" className="font-bold hover:text-teal-500 hover:underline">scaleaccessnetwork@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <Globe size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visit Website</p>
                  <a href="https://www.scaleaccessnetwork.com" target="_blank" rel="noreferrer" className="font-bold hover:text-teal-500 hover:underline">www.scaleaccessnetwork.com</a>
                </div>
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a 
                href="https://forms.gle/FYk8TNABaD7w2Jag8" 
                target="_blank"
                rel="noreferrer"
                className="mt-8 px-8 py-4 rounded-[1.25rem] bg-white border-2 border-indigo-600 text-teal-500 font-bold tracking-widest text-[14px] shadow-2xl shadow-teal-100/40 flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all"
              >
                <Handshake size={20} /> Become a Partner
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;
