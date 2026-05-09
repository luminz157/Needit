import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Rocket, Menu, X, ArrowRight, TrendingUp, Activity, Star, Users, Globe, Lightbulb, Shield, Send, ExternalLink, Check, BarChart2, TrendingDown, Zap, Target, Award, PieChart, Briefcase, Layout, Layers, Box, Terminal, MousePointer2, CreditCard, DollarSign } from 'lucide-react';
import { fadeUp, stagger } from '../utils/animations.js';

// --- Shared Components ---

const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ 
      y: -8,
      transition: { duration: 0.2, ease: "easeOut" }
    }}
    className={`bg-white text-[#1e0a3c] rounded-[1.5rem] p-8 border border-[#1e0a3c]/5 shadow-2xl shadow-[#1e0a3c]/10 transition-all duration-300 hover:bg-[#1e0a3c] hover:text-white group cursor-pointer hover:shadow-[#1e0a3c]/30 ${className}`}
    style={{ boxShadow: "0 20px 40px -15px rgba(30, 10, 60, 0.15)", fontFamily: "'Lato', sans-serif" }}
  >
    {children}
  </motion.div>
);

const MainBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Faded Grid */}
    <div className="absolute inset-0 opacity-[0.04]" 
         style={{ backgroundImage: `linear-gradient(#1e0a3c 1px, transparent 1px), linear-gradient(90deg, #1e0a3c 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
    
    {/* Floating Blue Dots */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={`dot-${i}`}
        className="absolute w-1 h-1 rounded-full bg-[#1e0a3c]/30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 5 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }}
      />
    ))}

    {/* Neural Lines */}
    <svg className="w-full h-full opacity-[0.06]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      {[...Array(15)].map((_, i) => (
        <React.Fragment key={`neural-${i}`}>
          {[...Array(2)].map((_, j) => (
            <motion.line
              key={`line-${i}-${j}`}
              x1={Math.random() * 1000}
              y1={Math.random() * 1000}
              x2={Math.random() * 1000}
              y2={Math.random() * 1000}
              stroke="#1e0a3c"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ 
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </React.Fragment>
      ))}
    </svg>
  </div>
);

const MouseBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 45, stiffness: 250 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 w-[250px] h-[250px] rounded-full blur-[90px] bg-[#1e0a3c]/10"
      style={{ x, y }}
    />
  );
};

// --- Navbar Section ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: "What's new?", href: '#whats-new' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      let offset = 0; 
      if (id === '#whats-new') offset = 100;
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-[#1e0a3c]/5 py-2.5' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-[#1e0a3c] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <Rocket size={18} className="text-white" />
          </div>
          <span className="text-[20px] font-bold tracking-tighter text-[#1e0a3c] whitespace-nowrap">Needit.</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a 
              key={l.name} 
              href={l.href} 
              onClick={(e) => scrollToSection(e, l.href)}
              className="text-[13px] font-bold text-[#1e0a3c]/50 hover:text-[#1e0a3c] transition-colors tracking-tight whitespace-nowrap"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 flex-shrink-0">
          <a href="#" className="px-7 py-2.5 rounded-xl bg-[#1e0a3c] text-white text-[14px] font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/10 tracking-wider whitespace-nowrap">
            Explore now
          </a>
        </div>
      </div>
    </motion.header>
  );
};

// --- Hero Section ---

const Hero = () => (
  <section id="home" className="relative pt-24 pb-14 overflow-hidden bg-white">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.35em] text-[#1e0a3c]/30 mb-5">Keep your money safe !</motion.p>
        <motion.h1 
          variants={fadeUp}
          className="text-5xl lg:text-[60px] leading-[1.05] font-bold text-[#1e0a3c] mb-7 tracking-tighter"
        >
          Best startup <br />
          investing platform <br />
          for your future.
        </motion.h1>
        
        <motion.div variants={fadeUp} className="flex items-center gap-5 mb-9">
          <div className="flex -space-x-3.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-11 h-11 rounded-full border-[5px] border-white bg-[#1e0a3c]/5 shadow-sm" />
            ))}
          </div>
          <div className="pl-1">
            <p className="text-[18px] font-bold text-[#1e0a3c] leading-none mb-1">168K +</p>
            <p className="text-[10px] font-bold text-[#1e0a3c]/40 tracking-widest">Realtime users</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-7">
          <button className="w-14 h-14 rounded-full bg-[#1e0a3c] flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all shadow-xl shadow-[#1e0a3c]/15">
            <ArrowRight size={24} />
          </button>
          <p className="text-[15px] text-[#1e0a3c]/50 max-w-[320px] font-bold leading-relaxed">
            Needit unites and secures a growing ecosystem of specialized startup tracks.
          </p>
        </motion.div>
      </motion.div>

      <div className="relative flex justify-center items-center py-8 scale-95 lg:scale-100 origin-center">
        {/* Floating Metric Cards */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-10 top-1/4 z-40 bg-white p-4.5 rounded-2xl shadow-2xl shadow-[#1e0a3c]/20 border border-[#1e0a3c]/5 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1e0a3c]/5 flex items-center justify-center text-[#1e0a3c]"><DollarSign size={18} /></div>
          <div>
            <p className="text-[10px] font-bold opacity-30 tracking-wider">Seed funding</p>
            <p className="text-[15px] font-bold text-[#1e0a3c]">$1.2M Ready</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-8 bottom-1/4 z-40 bg-white p-4.5 rounded-2xl shadow-2xl shadow-[#1e0a3c]/20 border border-[#1e0a3c]/5 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600"><Check size={18} /></div>
          <div>
            <p className="text-[10px] font-bold opacity-30 tracking-wider">Track verified</p>
            <p className="text-[15px] font-bold text-[#1e0a3c]">Level 04 Track</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-10 z-30 bg-white border border-[#1e0a3c]/10 rounded-2xl p-4.5 shadow-2xl shadow-[#1e0a3c]/15 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#1e0a3c]/40 tracking-widest">Growth</p>
            <p className="text-[15px] font-bold text-[#1e0a3c]">+45.2%</p>
          </div>
        </motion.div>

        {/* Mockup Animation */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 0.5, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20"
        >
          <div className="w-[280px] h-[560px] bg-[#1e0a3c] rounded-[3.5rem] border-[10px] border-[#1e0a3c] shadow-2xl shadow-[#1e0a3c]/40 overflow-hidden p-9 text-white relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-white/5" />
            <div className="mt-10">
               <p className="text-[10px] font-bold opacity-30 tracking-widest mb-2">Needit portal</p>
               <p className="text-2xl font-bold mb-8">Active tracks</p>
               
               <div className="h-44 w-full bg-white/5 rounded-[2.2rem] mb-9 flex flex-col p-7 border border-white/5 gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold opacity-40">Funding round</p>
                    <TrendingUp size={14} className="text-emerald-400" />
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                      className="h-full bg-white/40" 
                    />
                  </div>
                  <div className="flex justify-between items-end mt-auto">
                    <div className="space-y-1">
                      <p className="text-[8px] opacity-30 font-bold">Progress</p>
                      <p className="text-[12px] font-bold">$1.2M / $1.5M</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-emerald-400 flex items-center justify-center">
                      <span className="text-[9px] font-bold">85%</span>
                    </div>
                  </div>
               </div>
               
               <div className="space-y-3.5">
                  <div className="h-14 bg-white/10 rounded-xl flex items-center px-4.5 gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400"><Zap size={16} /></div>
                    <p className="text-[12px] font-bold opacity-60">Accelerator track</p>
                  </div>
                  <div className="h-14 bg-white/10 rounded-xl flex items-center px-4.5 gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-blue-400"><Target size={16} /></div>
                    <p className="text-[12px] font-bold opacity-60">Expert mentorship</p>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
        
        {/* Background Decorative Phone */}
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -0.5, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -right-4 top-24 z-10"
        >
          <div className="w-[240px] h-[480px] bg-[#1e0a3c] rounded-[2.8rem] border-[9px] border-[#1e0a3c] shadow-2xl shadow-[#1e0a3c]/30 overflow-hidden p-7 text-white flex flex-col justify-between opacity-70">
            <div>
              <div className="mt-14 h-3.5 w-20 bg-white/10 rounded-full mb-7" />
              <div className="h-36 w-full bg-white/5 rounded-2xl p-5 space-y-4">
                <p className="text-[10px] font-bold opacity-20 tracking-widest">Platform stats</p>
                <div className="flex gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-1.5 w-full bg-white/10 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
            <div className="h-12 w-full bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-[10px] font-bold opacity-30 tracking-widest">Needit.ai</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- Trusted Partner Section (About) ---

const TrustedSection = () => (
  <section id="about" className="py-20 bg-white/30 backdrop-blur-sm relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10 lg:gap-20">
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-[46px] font-bold text-[#1e0a3c] leading-[1.1] tracking-tighter"
          >
            Your trusted partner of <br />
            early startups.
          </motion.h2>
        </div>
        <div className="flex-1 lg:pt-3">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[16px] text-[#1e0a3c]/40 font-bold leading-relaxed max-w-lg"
          >
            Needit provides the foundational support every early-stage startup needs to thrive. From technical infrastructure to expert-led mentorship, we ensure your journey is backed by industry best practices and a global network of specialized startup tracks.
          </motion.p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {[
          { id: '01.', title: 'Expert guidance', desc: 'Tailored tools for every stage of your startup journey. We provide hands-on support to turn vision into reality.' },
          { id: '02.', title: 'Best practices', desc: 'Needit unites and secures a growing ecosystem of startup tracks based on deep industry insights.', isMiddle: true },
          { id: '03.', title: 'Secure growth', desc: 'Enterprise-grade security and blockchain integration for your peace of mind and scalable future.' }
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className={`flex flex-col p-10 rounded-[2.2rem] border transition-all duration-500 h-[400px] justify-between shadow-2xl shadow-[#1e0a3c]/10 ${
              s.isMiddle 
                ? "bg-[#1e0a3c] text-white border-[#1e0a3c] shadow-[#1e0a3c]/30" 
                : "bg-white text-[#1e0a3c] border-[#1e0a3c]/5 hover:bg-gray-50 hover:shadow-[#1e0a3c]/20"
            }`}
          >
            <div>
              <p className={`text-[13px] font-bold mb-7 tracking-[0.25em] ${s.isMiddle ? "opacity-40" : "opacity-20"}`}>{s.id}</p>
              <h3 className="text-[22px] font-bold mb-4 leading-tight tracking-tight">{s.title}</h3>
              <p className={`text-[15px] font-bold leading-relaxed ${s.isMiddle ? "opacity-70" : "opacity-40"}`}>{s.desc}</p>
            </div>
            
            <button className={`w-fit px-7 py-2.5 rounded-xl font-bold text-[12px] transition-all tracking-widest ${
              s.isMiddle 
                ? "bg-white text-[#1e0a3c] hover:scale-105" 
                : "bg-[#1e0a3c] text-white hover:scale-105"
            }`}>
              Learn more
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Portfolio Process Section (Services) ---

const HowItWorks = () => (
  <section id="services" className="py-20 bg-white/30 backdrop-blur-sm relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-[50px] font-bold text-[#1e0a3c] mb-7 tracking-tighter"
        >
          Build your startup portfolio
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[16px] text-[#1e0a3c]/40 font-bold max-w-2xl mx-auto leading-relaxed"
        >
          Unlock the potential of your startup with our comprehensive vetting and launch system. We provide the tools, mentorship, and network you need to transition from a simple idea to a market-ready, funded enterprise.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          { 
            icon: Target, 
            title: 'Submit idea', 
            desc: 'Present your vision to our panel of experts. We look for scalable solutions and passionate founders ready to disrupt the status quo.' 
          },
          { 
            icon: Shield, 
            title: 'Get vetted', 
            desc: 'Go through our rigorous selection process. Our tracks ensure your business model is sound and your technology is enterprise-grade.',
            isMiddle: true 
          },
          { 
            icon: Rocket, 
            title: 'Launch', 
            desc: 'Scale globally with world-class mentors. Access exclusive funding rounds and partner with industry leaders to accelerate your traction.' 
          }
        ].map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className={`flex flex-col p-10 rounded-[2.2rem] border transition-all duration-500 h-[420px] items-center text-center justify-between shadow-2xl shadow-[#1e0a3c]/10 ${
              step.isMiddle 
                ? "bg-[#1e0a3c] text-white border-[#1e0a3c] shadow-[#1e0a3c]/30" 
                : "bg-white text-[#1e0a3c] border-[#1e0a3c]/5 hover:bg-gray-50 hover:shadow-[#1e0a3c]/20"
            }`}
          >
            <div className="flex flex-col items-center">
              <div 
                className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center mb-9 shadow-lg ${
                  step.isMiddle ? "bg-white/10 text-white" : "bg-[#1e0a3c]/5 text-[#1e0a3c]"
                }`}
              >
                <step.icon size={36} />
              </div>
              <h3 className="text-[24px] font-bold mb-5 tracking-tight">{step.title}</h3>
              <p className={`text-[15px] font-bold leading-relaxed ${step.isMiddle ? "opacity-70" : "opacity-40"}`}>
                {step.desc}
              </p>
            </div>
            <div className={`flex items-center gap-2.5 font-bold text-[13px] tracking-[0.15em] ${step.isMiddle ? "text-white" : "text-[#1e0a3c]"}`}>
              Stage {i + 1} <ArrowRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Platform Section ---

const PlatformSection = () => (
  <section className="py-20 bg-white/30 backdrop-blur-sm relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#1e0a3c] rounded-[2.5rem] p-10 text-white relative z-10 shadow-2xl shadow-[#1e0a3c]/40"
        >
          <div className="flex items-center justify-between mb-9">
             <div>
               <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] mb-2">$4,528 USD</p>
               <p className="text-[14px] font-bold text-white/50 leading-tight">Real-time growth tracking and analytics ecosystem.</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-[14px] font-bold shadow-lg">N</div>
          </div>
          
          <div className="h-36 w-full mb-9 relative">
             <div className="absolute -top-7 left-0 text-[10px] font-bold opacity-30 tracking-[0.15em] uppercase">Market growth index</div>
             <motion.svg viewBox="0 0 400 100" className="w-full h-full">
                <motion.path
                  d="M0,80 C40,75 80,40 120,60 C160,80 200,20 240,50 C280,80 320,30 400,10"
                  stroke="white"
                  strokeWidth="3.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
                <text x="50" y="95" fill="white" fontSize="8.5" opacity="0.4" fontWeight="700" style={{ fontFamily: "'Lato', sans-serif" }}>Q1 START</text>
                <text x="340" y="25" fill="white" fontSize="8.5" opacity="0.4" fontWeight="700" style={{ fontFamily: "'Lato', sans-serif" }}>ATH TARGET</text>
             </motion.svg>
          </div>

          <div className="grid grid-cols-2 gap-5">
             <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-white/40 text-[10px] font-bold tracking-widest mb-2">Growth</p>
                <p className="text-2xl font-bold">+45.0%</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-white/40 text-[10px] font-bold tracking-widest mb-2">Funded</p>
                <p className="text-2xl font-bold">$ 14.5M</p>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="lg:pl-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-[48px] font-bold text-[#1e0a3c] leading-[1.05] mb-7 tracking-tighter"
        >
          Trusted platform <br />
          anytime & anywhere.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[16px] text-[#1e0a3c]/40 font-bold leading-relaxed mb-9 max-w-md"
        >
          Needit is more than just an investment portal; it's a comprehensive ecosystem designed for the modern entrepreneur. We combine real-time data analytics with a secure blockchain-backed infrastructure.
        </motion.p>
        <button className="px-9 py-4.5 rounded-xl bg-[#1e0a3c] text-white font-bold text-[13px] tracking-[0.15em] flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-900/15">
          Learn more <ArrowRight size={18} />
        </button>
      </div>
    </div>
  </section>
);

// --- What's New Section ---

const WhatsNew = () => (
  <section id="whats-new" className="py-20 bg-white/30 backdrop-blur-sm relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
      <div className="-mt-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-[48px] font-bold text-[#1e0a3c] leading-[1.05] mb-10 tracking-tighter"
        >
          What's new we <br />
          provide for you ?
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
          {[
            { icon: Layout, title: 'Modular UI', desc: 'Customizable dashboard components for founders.' },
            { icon: Layers, title: 'Multi-chain', desc: 'Secure asset management across platforms.' },
            { icon: Box, title: 'Sandbox', desc: 'Test and iterate ideas in real-time.' },
            { icon: Terminal, title: 'Dev-SDK', desc: 'Build faster with integrated Needit tools.' }
          ].map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(30, 10, 60, 1)", color: "white" }}
              className="flex gap-4 p-7 rounded-[2rem] border border-[#1e0a3c]/5 group transition-all duration-300 cursor-pointer bg-white shadow-lg shadow-[#1e0a3c]/5"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1e0a3c] flex-shrink-0 flex items-center justify-center text-white shadow-md group-hover:bg-white group-hover:text-[#1e0a3c] transition-colors">
                <f.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1e0a3c] group-hover:text-white text-[18px] mb-1.5 transition-colors tracking-tight">{f.title}</h4>
                <p className="text-[14px] text-[#1e0a3c]/30 group-hover:text-white/60 font-bold leading-snug transition-colors">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end py-8">
        <div className="relative w-full max-w-[460px] h-[500px]">
          {[
            { label: 'Revenue', value: '$42k', icon: TrendingUp },
            { label: 'Users', value: '1,284', icon: Users },
            { label: 'Cap', value: '$2.4M', icon: Activity },
            { label: 'Analytics', value: 'Active', icon: MousePointer2 }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, i % 2 === 0 ? 0.5 : -0.5, 0]
              }}
              transition={{ 
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
              className={`absolute p-7 rounded-[2.5rem] bg-[#1e0a3c] text-white flex flex-col justify-between shadow-2xl shadow-[#1e0a3c]/50 ${
                i === 0 ? "top-0 left-0 w-48 h-48 z-10" :
                i === 1 ? "top-20 right-0 w-56 h-36 z-20" :
                i === 2 ? "bottom-20 left-10 w-44 h-56 z-30 opacity-90" :
                "bottom-0 right-5 w-64 h-52 z-40"
              }`}
              style={{ filter: "drop-shadow(0 0 15px rgba(30, 10, 60, 0.3))" }}
            >
              <div className="flex items-center justify-between mb-5">
                 <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                   <card.icon size={20} />
                 </div>
                 <div className="h-1.5 w-10 bg-white/20 rounded-full" />
              </div>
              
              <div>
                <p className="text-[10px] font-bold opacity-30 tracking-[0.15em] mb-1.5">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>

              <div className="mt-5 space-y-2.5">
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: i === 3 ? "100%" : "60%" }}
                       transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                       className="h-full bg-white/30" 
                    />
                 </div>
                 {i === 3 && (
                   <div className="flex gap-2.5 pt-2.5">
                     <div className="h-9 flex-1 bg-white/10 rounded-xl" />
                     <div className="h-9 w-9 bg-white rounded-xl shadow-inner shadow-black/10" />
                   </div>
                 )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- Footer ---

const Footer = () => (
  <footer className="pt-24 pb-12 bg-white/80 backdrop-blur-md border-t border-[#1e0a3c]/5 relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#1e0a3c] flex items-center justify-center shadow-xl shadow-[#1e0a3c]/15">
              <Rocket size={20} className="text-white" />
            </div>
            <span className="text-[22px] font-bold tracking-tighter text-[#1e0a3c]">Needit.</span>
          </div>
          <p className="text-[#1e0a3c]/30 text-[14px] leading-relaxed max-w-xs mb-10 font-bold tracking-widest">
            Empowering founders everywhere with secure tracks.
          </p>
          <div className="flex gap-4">
             {[Users, Globe, Send, ExternalLink].map((Icon, i) => (
               <div key={i} className="w-10 h-10 rounded-full bg-[#1e0a3c] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-xl shadow-[#1e0a3c]/15">
                 <Icon size={20} />
               </div>
             ))}
          </div>
        </div>
        
        {[
          { title: 'Products', items: ['Tracks', 'Founder', 'SDKs'] },
          { title: 'Information', items: ['Market', 'Token', 'Main'] },
          { title: 'Resources', items: ['FAQ', 'Blog', 'DOC'] }
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-[#1e0a3c] text-[15px] mb-8 tracking-tight uppercase">{col.title}</h4>
            <ul className="space-y-4">
              {col.items.map(item => (
                <li key={item}><a href="#" className="text-[14px] font-bold text-[#1e0a3c]/30 hover:text-[#1e0a3c] transition-colors tracking-widest">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-1">
          <h4 className="font-bold text-[#1e0a3c] text-[15px] mb-8 tracking-tight uppercase">Newsletter</h4>
          <input 
             type="text" 
             placeholder="Email" 
             className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-5 py-4 text-[13px] font-bold outline-none mb-3 tracking-widest"
          />
          <button className="w-full py-4 bg-[#1e0a3c] text-white font-bold rounded-xl text-[12px] shadow-xl shadow-[#1e0a3c]/20 tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">Subscribe</button>
        </div>
      </div>

      <div className="pt-12 border-t border-[#1e0a3c]/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[11px] font-bold text-[#1e0a3c]/20 tracking-[0.25em]">© 2026 NEEDIT. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-10 text-[11px] font-bold text-[#1e0a3c]/20 tracking-[0.25em]">
          <a href="#" className="hover:text-[#1e0a3c] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#1e0a3c] transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Landing Page ---

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-[#1e0a3c] selection:text-white overflow-x-hidden bg-white" style={{ fontFamily: "'Lato', sans-serif" }}>
      <MainBackground />
      <MouseBackground />
      <Navbar />
      <Hero />
      <TrustedSection />
      <HowItWorks />
      <PlatformSection />
      <WhatsNew />
      <Footer />
    </div>
  );
}
