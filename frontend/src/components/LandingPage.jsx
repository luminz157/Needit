import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Rocket, Menu, X, ArrowRight, TrendingUp, Activity, Star, Users, Globe, Lightbulb, Shield, Send, ExternalLink, Check, BarChart2, TrendingDown, Zap, Target, Award, PieChart, Briefcase } from 'lucide-react';
import { fadeUp, stagger } from '../utils/animations.js';

// --- Shared Components ---

const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ 
      y: -8,
      transition: { duration: 0.2, ease: "easeOut" }
    }}
    className={`bg-white text-[#1e0a3c] rounded-[1.5rem] p-8 border border-[#1e0a3c]/5 shadow-xl shadow-blue-900/5 transition-all duration-300 hover:bg-[#1e0a3c] hover:text-white group cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

const NetworkBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
    <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      {[...Array(12)].map((_, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={Math.random() * 1000}
          cy={Math.random() * 1000}
          r="1.5"
          fill="#1e0a3c"
          initial={{ opacity: 0.1 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={`line-${i}`}
          d={`M${Math.random() * 1000},${Math.random() * 1000} L${Math.random() * 1000},${Math.random() * 1000}`}
          stroke="#1e0a3c"
          strokeWidth="0.4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.15 }}
          transition={{ 
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
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
      className="fixed pointer-events-none z-0 w-[250px] h-[250px] rounded-full blur-[90px] bg-[#1e0a3c]/8"
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
      const offset = 100; // Increased offset for better header visibility
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
        scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-[#1e0a3c]/5 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#1e0a3c] flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
            <Rocket size={20} className="text-white" />
          </div>
          <span className="text-[20px] font-bold tracking-tighter text-[#1e0a3c]">NEEDIT.</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a 
              key={l.name} 
              href={l.href} 
              onClick={(e) => scrollToSection(e, l.href)}
              className="text-[15px] font-bold text-[#1e0a3c]/50 hover:text-[#1e0a3c] transition-colors tracking-tight"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <a href="#" className="px-8 py-3 rounded-xl bg-[#1e0a3c] text-white text-[15px] font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/10">
          Explore now
        </a>
      </div>
    </motion.header>
  );
};

// --- Hero Section ---

const Hero = () => (
  <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-white">
    <NetworkBackground />
    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 pt-12">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.25em] text-[#1e0a3c]/30 uppercase mb-6">Keep your money safe !</motion.p>
        <motion.h1 
          variants={fadeUp}
          style={{ textShadow: "0 0 40px rgba(30,10,60,0.1)" }}
          className="text-5xl lg:text-[62px] leading-[1.05] font-bold text-[#1e0a3c] mb-6 tracking-tighter"
        >
          Best startup <br />
          investing platform <br />
          for your future.
        </motion.h1>
        
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-11 h-11 rounded-full border-[5px] border-white bg-[#1e0a3c]/5 shadow-md" />
            ))}
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#1e0a3c] leading-none mb-1">168K +</p>
            <p className="text-[11px] font-bold text-[#1e0a3c]/40 uppercase tracking-widest">Realtime Users</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-6">
          <button className="w-14 h-14 rounded-full bg-[#1e0a3c] flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all shadow-xl">
            <ArrowRight size={26} />
          </button>
          <p className="text-[15px] text-[#1e0a3c]/50 max-w-[300px] font-bold leading-relaxed">
            Needit unites and secures a growing ecosystem of specialized startup tracks.
          </p>
        </motion.div>
      </motion.div>

      <div className="relative flex justify-center items-center pt-4 scale-95 origin-center">
        {/* Informative Badge 1 */}
        <motion.div
          animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-10 z-30 bg-white border border-[#1e0a3c]/10 rounded-2xl p-4 shadow-xl flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#1e0a3c]/40 uppercase">Growth</p>
            <p className="text-[14px] font-bold text-[#1e0a3c]">+45.2%</p>
          </div>
        </motion.div>

        {/* Informative Badge 2 */}
        <motion.div
          animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-10 left-0 z-30 bg-white border border-[#1e0a3c]/10 rounded-2xl p-4 shadow-xl flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-[#1e0a3c]/10 flex items-center justify-center text-[#1e0a3c]">
            <Activity size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#1e0a3c]/40 uppercase">Active</p>
            <p className="text-[14px] font-bold text-[#1e0a3c]">12k Daily</p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20"
        >
          <div className="w-[280px] h-[560px] bg-[#1e0a3c] rounded-[3.5rem] border-[10px] border-[#1e0a3c] shadow-2xl overflow-hidden p-9 text-white relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-white/5" />
            <div className="mt-10">
               <p className="text-[10px] font-bold opacity-30 tracking-widest uppercase mb-1">Portfolio</p>
               <p className="text-2xl font-bold mb-8">$ 1,44,528.00</p>
               
               {/* Informative content inside rectangle */}
               <div className="h-44 w-full bg-white/5 rounded-[2rem] mb-8 flex flex-col p-6 border border-white/5 gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold opacity-40">Monthly Rev</p>
                    <TrendingUp size={14} className="text-emerald-400" />
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="h-full bg-white/40" 
                    />
                  </div>
                  <div className="flex justify-between items-end mt-auto">
                    <div className="space-y-1">
                      <p className="text-[8px] opacity-30">Goal</p>
                      <p className="text-[12px] font-bold">$20k</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-white flex items-center justify-center">
                      <span className="text-[8px] font-bold">65%</span>
                    </div>
                  </div>
               </div>
               
               <div className="space-y-3.5">
                  <div className="h-14 bg-white/10 rounded-xl flex items-center px-4 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><Zap size={14} /></div>
                    <div className="h-2 w-24 bg-white/10 rounded-full" />
                  </div>
                  <div className="h-14 bg-white/10 rounded-xl flex items-center px-4 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><Target size={14} /></div>
                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -1, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -right-2 top-24 z-10"
        >
          <div className="w-[240px] h-[480px] bg-[#1e0a3c] rounded-[2.5rem] border-[8px] border-[#1e0a3c] shadow-xl overflow-hidden p-7 text-white flex flex-col justify-between opacity-80">
            <div>
              <div className="mt-14 h-3.5 w-20 bg-white/10 rounded-full mb-6" />
              <div className="h-36 w-full bg-white/5 rounded-2xl p-5 space-y-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-2/3 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="h-11 w-full bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-[10px] font-bold opacity-30">ANALYTICS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- Trusted Partner Section (About) ---

const TrustedSection = () => (
  <section id="about" className="py-24 bg-white relative">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10 lg:gap-20 -mt-10">
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl lg:text-[44px] font-bold text-[#1e0a3c] leading-[1.15] tracking-tighter"
          >
            Your trusted partner of <br />
            early startups.
          </motion.h2>
        </div>
        <div className="flex-1 lg:pt-2">
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[16px] text-[#1e0a3c]/40 font-bold leading-relaxed"
          >
            Needit provides the foundational support every early-stage startup needs to thrive. From technical infrastructure to expert-led mentorship, we ensure your journey is backed by industry best practices and a global network of specialized startup tracks.
          </motion.p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {[
          { id: '01.', title: 'Expert Guidance', desc: 'Tailored tools for every stage of your startup journey.' },
          { id: '02.', title: 'Best Practices', desc: 'Needit unites and secures a growing ecosystem of startup tracks.', isMiddle: true },
          { id: '03.', title: 'Secure Growth', desc: 'Enterprise-grade security for your peace of mind.' }
        ].map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className={`flex flex-col p-10 rounded-[2rem] border transition-all duration-500 h-[380px] justify-between ${
              s.isMiddle 
                ? "bg-[#1e0a3c] text-white border-[#1e0a3c] shadow-2xl shadow-blue-900/40" 
                : "bg-white text-[#1e0a3c] border-[#1e0a3c]/5 shadow-xl shadow-blue-900/5 hover:bg-gray-50"
            }`}
          >
            <div>
              <p className={`text-[13px] font-bold mb-6 tracking-widest ${s.isMiddle ? "opacity-40" : "opacity-20"}`}>{s.id}</p>
              <h3 className="text-[22px] font-bold mb-3 leading-tight">{s.title}</h3>
              <p className={`text-[15px] font-bold leading-relaxed ${s.isMiddle ? "opacity-70" : "opacity-40"}`}>{s.desc}</p>
            </div>
            
            <button className={`w-fit px-6 py-2 rounded-full font-bold text-[13px] transition-all ${
              s.isMiddle 
                ? "bg-white text-[#1e0a3c] hover:scale-105" 
                : "bg-[#1e0a3c] text-white hover:scale-105"
            }`}>
              Learn More
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Platform Section ---

const PlatformSection = () => (
  <section className="py-24 bg-white overflow-hidden relative">
    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
      <div className="relative">
        <div className="bg-[#1e0a3c] rounded-[2.5rem] p-10 text-white relative z-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
             <div>
               <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">$4,528 USD</p>
               <p className="text-[13px] font-bold text-white/50">Real-time growth tracking and analytics.</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-[13px] font-bold">N</div>
          </div>
          
          <div className="h-32 w-full mb-8 relative">
             <motion.svg viewBox="0 0 400 100" className="w-full h-full">
                <motion.path
                  d="M0,80 C40,75 80,40 120,60 C160,80 200,20 240,50 C280,80 320,30 400,10"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
             </motion.svg>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/40 text-[10px] font-bold uppercase mb-1">Growth</p>
                <p className="text-xl font-bold">+45.0%</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/40 text-[10px] font-bold uppercase mb-1">Funded</p>
                <p className="text-xl font-bold">$ 14.5M</p>
             </div>
          </div>
        </div>
      </div>

      <div className="lg:pl-10">
        <h2 className="text-4xl lg:text-[48px] font-bold text-[#1e0a3c] leading-[1.1] mb-6 tracking-tighter">
          Trusted platform <br />
          anytime & anywhere.
        </h2>
        <p className="text-[16px] text-[#1e0a3c]/40 font-bold leading-relaxed mb-8 max-w-md">
          Needit unites and secures a growing ecosystem of specialized startup tracks.
        </p>
        <button className="px-9 py-4 rounded-xl bg-[#1e0a3c] text-white font-bold text-[15px] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/15">
          Learn More <ArrowRight size={18} />
        </button>
      </div>
    </div>
  </section>
);

// --- Portfolio Process Section (Services) ---

const HowItWorks = () => (
  <section id="services" className="py-24 bg-white relative scroll-mt-20">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16 pt-8">
        <h2 className="text-4xl lg:text-[48px] font-bold text-[#1e0a3c] mb-6 tracking-tighter">Build your startup portfolio</h2>
        <p className="text-[16px] text-[#1e0a3c]/40 font-bold max-w-2xl mx-auto leading-relaxed">
          Unlock the potential of your startup with our comprehensive vetting and launch system. We provide the tools, mentorship, and network you need to transition from a simple idea to a market-ready, funded enterprise.
        </p>
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
            title: 'Get Vetted', 
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
            whileHover={{ y: -10 }}
            className={`flex flex-col p-10 rounded-[2rem] border transition-all duration-500 h-[400px] items-center text-center justify-between ${
              step.isMiddle 
                ? "bg-[#1e0a3c] text-white border-[#1e0a3c] shadow-2xl shadow-blue-900/40" 
                : "bg-white text-[#1e0a3c] border-[#1e0a3c]/5 shadow-xl shadow-blue-900/5 hover:bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center">
              <div 
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg ${
                  step.isMiddle ? "bg-white/10 text-white" : "bg-[#1e0a3c]/5 text-[#1e0a3c]"
                }`}
              >
                <step.icon size={32} />
              </div>
              <h3 className="text-[24px] font-bold mb-6 tracking-tight">{step.title}</h3>
              <p className={`text-[15px] font-bold leading-relaxed ${step.isMiddle ? "opacity-70" : "opacity-40"}`}>
                {step.desc}
              </p>
            </div>
            <div className={`flex items-center gap-2 font-bold text-[14px] ${step.isMiddle ? "text-white" : "text-[#1e0a3c]"}`}>
              Stage {i + 1} <ArrowRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- What's New Section ---

const WhatsNew = () => (
  <section id="whats-new" className="py-24 bg-white overflow-hidden relative">
    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <h2 className="text-4xl lg:text-[48px] font-bold text-[#1e0a3c] leading-[1.1] mb-10 tracking-tighter">
          What's new we <br />
          provide for you ?
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
          {[
            { icon: Shield, title: 'Security', desc: 'State-of-the-art protection.' },
            { icon: TrendingUp, title: 'Milestones', desc: 'Track your growth progress.' },
            { icon: Globe, title: 'Global', desc: 'Connect with mentors.' },
            { icon: BarChart2, title: 'API', desc: 'Integrate your favorite tools.' }
          ].map((f, i) => (
            <div key={i} className="flex gap-4 group cursor-default items-center">
              <div className="w-11 h-11 rounded-full bg-[#1e0a3c] flex-shrink-0 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <f.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1e0a3c] text-[18px] mb-1">{f.title}</h4>
                <p className="text-[14px] text-[#1e0a3c]/30 font-bold leading-tight">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end">
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 2, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <div className="w-[280px] h-[560px] bg-[#1e0a3c] rounded-[3rem] border-[10px] border-[#1e0a3c] shadow-2xl overflow-hidden p-10 text-white flex flex-col justify-between">
             <div>
               <p className="text-2xl font-bold mb-4 leading-tight">Join to build <br/> the future.</p>
               <button className="px-5 py-2 bg-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">Sign Up</button>
             </div>
             <button className="w-full py-4 bg-white text-[#1e0a3c] font-bold rounded-xl text-[15px] shadow-xl active:scale-95 transition-all">Join Now</button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- Footer ---

const Footer = () => (
  <footer className="pt-24 pb-12 bg-white border-t border-[#1e0a3c]/5">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#1e0a3c] flex items-center justify-center shadow-xl">
              <Rocket size={20} className="text-white" />
            </div>
            <span className="text-[22px] font-bold tracking-tighter text-[#1e0a3c]">NEEDIT.</span>
          </div>
          <p className="text-[#1e0a3c]/30 text-[14px] leading-relaxed max-w-xs mb-10 font-bold uppercase tracking-wide">
            Empowering founders everywhere.
          </p>
          <div className="flex gap-4">
             {[Users, Globe, Send, ExternalLink].map((Icon, i) => (
               <div key={i} className="w-10 h-10 rounded-full bg-[#1e0a3c] flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer shadow-md">
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
            <h4 className="font-bold text-[#1e0a3c] text-[15px] mb-8 tracking-tight">{col.title}</h4>
            <ul className="space-y-4">
              {col.items.map(item => (
                <li key={item}><a href="#" className="text-[14px] font-bold text-[#1e0a3c]/30 hover:text-[#1e0a3c] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-1">
          <h4 className="font-bold text-[#1e0a3c] text-[15px] mb-8 tracking-tight">Newsletter</h4>
          <input 
             type="text" 
             placeholder="Email" 
             className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-5 py-4 text-[14px] font-bold outline-none mb-3"
          />
          <button className="w-full py-4 bg-[#1e0a3c] text-white font-bold rounded-xl text-[12px] shadow-lg">Subscribe</button>
        </div>
      </div>

      <div className="pt-12 border-t border-[#1e0a3c]/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[11px] font-bold text-[#1e0a3c]/20 uppercase tracking-[0.2em]">© 2026 NEEDIT. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8 text-[11px] font-bold text-[#1e0a3c]/20 uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-[#1e0a3c] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#1e0a3c] transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Landing Page ---

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-[#1e0a3c] selection:text-white overflow-x-hidden bg-white">
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
