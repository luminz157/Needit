import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Rocket, Menu, X, ArrowRight, TrendingUp, Activity, Star, Users, Globe, Lightbulb, Shield, Send, ExternalLink, Check, BarChart2, TrendingDown, Zap, Target, Award, PieChart, Briefcase, Layout, Layers, Box, Terminal, MousePointer2, CreditCard, DollarSign, Share2, Heart, Mail, Phone, ArrowLeft } from 'lucide-react';
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

export const MainBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Faded Grid */}
    <div className="absolute inset-0 opacity-[0.06]" 
         style={{ backgroundImage: `linear-gradient(#1e0a3c 1px, transparent 1px), linear-gradient(90deg, #1e0a3c 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
  </div>
);

export const MouseBackground = () => {
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

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Programs', href: '/programs' },
    { name: 'Industries', href: '/industries' },
    { name: 'Services', href: '/services' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Application', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (link.href === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    
    // For other links like /services, /programs, /industries
    navigate(link.href);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-sm py-1.5' : 'py-2.5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <img src="/final_logo_cropped.png" alt="Needit Logo" className="h-10 md:h-14 lg:h-18 object-contain group-hover:scale-105 transition-transform" />
        </a>

        <nav className="hidden md:flex items-center gap-5 lg:gap-8 xl:gap-10">
          {links.map((l) => (
            <a 
              key={l.name} 
              href={l.href} 
              onClick={(e) => handleNavClick(e, l)}
              className="text-sm md:text-[16px] font-bold text-[#1e0a3c]/50 hover:text-[#1e0a3c] transition-colors tracking-tight whitespace-nowrap"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex md:hidden items-center justify-center p-2 rounded-full border border-[#1e0a3c]/10 text-[#1e0a3c] hover:bg-[#1e0a3c]/5 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a href="/contact" className="hidden md:inline-flex px-6 py-2 rounded-xl bg-[#1e0a3c] text-white text-[14px] font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1e0a3c]/20 tracking-wider whitespace-nowrap">
            Explore now
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="rounded-[2rem] bg-white shadow-2xl shadow-[#1e0a3c]/10 border border-[#1e0a3c]/10 overflow-hidden">
            <nav className="flex flex-col gap-2 p-4">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={(e) => {
                    handleNavClick(e, l);
                    setMobileOpen(false);
                  }}
                  className="block rounded-2xl px-4 py-3 text-sm font-bold text-[#1e0a3c]/80 hover:text-[#1e0a3c] hover:bg-[#1e0a3c]/5 transition"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="/contact"
                className="block mt-2 rounded-2xl bg-[#1e0a3c] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#1b0730] transition"
              >
                Explore now
              </a>
            </nav>
          </div>
        </div>
      )}
    </motion.header>
  );
};

// --- Hero Section ---

const Hero = () => (
  <section id="home" className="relative pt-24 pb-14 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-12 items-center">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.35em] text-[#1e0a3c] opacity-50 mb-5 uppercase">Global Expansion Framework</motion.p>
        <motion.h1 
          variants={fadeUp}
          className="text-5xl lg:text-[50px] leading-[1.1] font-bold text-[#1e0a3c] mb-10 tracking-tighter"
        >
          From Startup to <br />
          Global Success <Globe className="inline-block text-[#1e0a3c] w-[1em] h-[1em] -mt-2 ml-1" />
        </motion.h1>

        <motion.p variants={fadeUp} className="text-[16px] text-[#1e0a3c]/60 font-bold leading-relaxed mb-9 max-w-md">
          We help startups scale from idea to international markets with structured execution, partnerships, and market access.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
          <a href="https://docs.google.com/forms/d/1CP_Aad1Ts39tiaHTDyTEvIQT4NgroCibfqgz2qhIlvg/viewform" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#1e0a3c] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1e0a3c]/20 font-bold tracking-widest text-[13px] gap-2">
            <Rocket size={18} /> Apply for Global Expansion
          </a>
        </motion.div>
        
        <motion.p variants={fadeUp} className="mt-6 text-[12px] font-bold text-[#1e0a3c]/40">
          * Click Apply to fill out our Startup Scouting Form to get started.
        </motion.p>
      </motion.div>

      <div className="relative flex justify-center items-center py-8 scale-75 md:scale-90 lg:scale-75 xl:scale-100 origin-center lg:translate-x-4 xl:translate-x-0">
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
            <p className="text-[10px] font-bold text-[#1e0a3c]/40 tracking-widest">Startups</p>
            <p className="text-[15px] font-bold text-[#1e0a3c]">42 Active</p>
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
                    <p className="text-[10px] font-bold opacity-40">Seed Round</p>
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
  <section id="about" className="py-20 relative z-10 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
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
          { id: '01.', title: 'Expert guidance', desc: 'Tailored tools for every stage of your startup journey. We provide hands-on support to turn vision into reality. Leverage our global network of seasoned founders to navigate complex challenges and accelerate your market entry.' },
          { id: '02.', title: 'Best practices', desc: 'Needit unites and secures a growing ecosystem of startup tracks based on deep industry insights. Benefit from structured frameworks that optimize your operations, reduce risk, and maximize your potential for rapid scaling.' },
          { id: '03.', title: 'Secure growth', desc: 'Enterprise-grade security and blockchain integration for your peace of mind and scalable future. Protect your assets while maintaining the agility needed to innovate and capture new market opportunities.' }
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[2.2rem] border transition-all duration-500 h-auto min-h-[400px] justify-between shadow-2xl shadow-[#1e0a3c]/30 bg-[#1e0a3c] text-white border-[#1e0a3c] hover:shadow-[#1e0a3c]/50"
          >
            <div className="flex flex-col items-center text-center justify-center h-full gap-4">
              <p className="text-[72px] font-bold text-white tracking-tighter leading-none mb-8">{s.id.replace('.', '')}</p>
              <h3 className="text-[24px] font-bold leading-tight tracking-tight">{s.title}</h3>
              <p className="text-[15px] font-bold leading-relaxed opacity-70 px-2">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Programs Preview Section (How It Works) ---

const HowItWorks = () => (
  <section className="py-20 relative z-10 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-[50px] font-bold text-[#1e0a3c] mb-7 tracking-tighter"
        >
          Global Expansion Program
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[16px] text-[#1e0a3c]/40 font-bold max-w-2xl mx-auto leading-relaxed"
        >
          A structured, phased approach designed to build credibility and systematically scale your business into international markets.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          { 
            icon: Target, 
            title: 'Validate', 
            desc: 'Focus on Branding, Market validation, and comprehensive Go-to-market planning. Establish a strong foundation with targeted customer research and tailored value propositions.'
          },
          { 
            icon: Shield, 
            title: 'Expand', 
            desc: 'Secure Export support and establish international Distributor setups. Leverage strategic partnerships and compliance frameworks to seamlessly enter high-growth global markets.',
            isMiddle: true 
          },
          { 
            icon: Rocket, 
            title: 'Scale', 
            desc: 'Optimize Manufacturing pipelines and gain exclusive Investor access to scale globally. Accelerate your traction with top-tier VC connectivity and enterprise localization.'
          }
        ].map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="flex flex-col p-8 rounded-[2.2rem] border transition-all duration-500 h-auto min-h-[360px] items-center text-center justify-between shadow-2xl shadow-[#1e0a3c]/30 bg-[#1e0a3c] text-white border-[#1e0a3c] hover:shadow-[#1e0a3c]/50 cursor-pointer group"
            onClick={() => window.location.href = '/programs'}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-[1.8rem] flex items-center justify-center mb-6 shadow-lg bg-white/10 text-white">
                <step.icon size={32} />
              </div>
              <h3 className="text-[32px] md:text-[36px] font-bold mb-4 tracking-tight text-white">{step.title}</h3>
              <p className="text-[14px] md:text-[15px] font-medium leading-relaxed opacity-70 px-2 group-hover:opacity-90 transition-opacity">
                {step.desc}
              </p>
            </div>
            {step.isMiddle && (
              <div className="flex items-center gap-2 px-6 py-3 bg-white text-[#1e0a3c] font-bold rounded-xl hover:scale-105 transition-all text-[14px] mt-8 shadow-lg">
                View Program <ArrowRight size={16} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Platform Section (Industries Preview) ---

const PlatformSection = () => (
  <section className="py-20 relative z-10 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#1e0a3c] rounded-[2.5rem] p-10 text-white relative z-10 shadow-2xl shadow-[#1e0a3c]/40 cursor-pointer"
          onClick={() => window.location.href = '/industries'}
        >
          <div className="flex items-center justify-between mb-9">
             <div>
               <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] mb-2">INDUSTRY FOCUS</p>
               <p className="text-[14px] font-bold text-white/50 leading-tight">Specialized networks across high-impact sectors.</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-[14px] font-bold shadow-lg">N</div>
          </div>
          
          <div className="h-36 w-full mb-9 relative">
             <div className="absolute -top-7 left-0 text-[10px] font-bold opacity-30 tracking-[0.15em] uppercase">DeepTech & AI Growth</div>
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
                <text x="50" y="95" fill="white" fontSize="8.5" opacity="0.4" fontWeight="700" style={{ fontFamily: "'Lato', sans-serif" }}>FINTECH</text>
                <text x="320" y="25" fill="white" fontSize="8.5" opacity="0.4" fontWeight="700" style={{ fontFamily: "'Lato', sans-serif" }}>CLIMATETECH</text>
             </motion.svg>
          </div>

          <div className="grid grid-cols-2 gap-5">
             <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-white/40 text-[10px] font-bold tracking-widest mb-2">Active Sectors</p>
                <p className="text-2xl font-bold">8+</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-white/40 text-[10px] font-bold tracking-widest mb-2">Total Raised</p>
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
          Industries we <br />
          support globally.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[16px] text-[#1e0a3c]/40 font-bold leading-relaxed mb-9 max-w-md"
        >
          We bring specialized expertise and global networks to startups across diverse, high-impact industries including Artificial Intelligence, FinTech, BioTech, AgriTech, and ClimateTech.
        </motion.p>
        <a href="/industries" className="inline-flex px-9 py-4.5 rounded-xl bg-[#1e0a3c] text-white font-bold text-[13px] tracking-[0.15em] items-center gap-2.5 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-900/15">
          Explore Industries <ArrowRight size={18} />
        </a>
      </div>
    </div>
  </section>
);

// --- What's New Section (Services Preview) ---

const WhatsNew = () => (
  <section className="py-20 relative z-10 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
      <div className="-mt-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-[48px] font-bold text-[#1e0a3c] leading-[1.05] mb-10 tracking-tighter"
        >
          Core services we <br />
          provide for you
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
          {[
            { icon: Globe, title: 'Market Access', desc: 'International market entry & Global partnerships.' },
            { icon: TrendingUp, title: 'Digital Growth', desc: 'Performance marketing, Branding & Lead generation.' },
            { icon: DollarSign, title: 'Startup Funding', desc: 'Investor introductions & VC connectivity (TRL 6+).' },
            { icon: Briefcase, title: 'Incubation', desc: 'Mentorship, Startup planning & Business strategy.' }
          ].map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(30, 10, 60, 1)", color: "white" }}
              className="flex gap-4 p-7 rounded-[2rem] border border-[#1e0a3c]/5 group transition-all duration-300 cursor-pointer bg-white shadow-lg shadow-[#1e0a3c]/5"
              onClick={() => window.location.href = '/services'}
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
        <div className="relative w-full max-w-[460px] h-[500px] scale-75 md:scale-90 lg:scale-75 xl:scale-100 origin-center lg:origin-right cursor-pointer" onClick={() => window.location.href = '/services'}>
          {[
            { label: 'Startups', value: '142', icon: Rocket },
            { label: 'Mentors', value: '84', icon: Users },
            { label: 'Funding', value: '$2.4M', icon: DollarSign },
            { label: 'Programs', value: 'Active', icon: Zap }
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

// --- Timeline Section ---

const TimelineSection = () => (
  <section id="programs" className="py-20 relative z-10 overflow-hidden">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-4xl lg:text-[50px] font-bold text-[#1e0a3c] mb-7 tracking-tighter"
        >
          Timeline Section
        </motion.h2>
      </div>

      <div className="relative ml-2 md:ml-10">
        {/* Timeline Vertical Line */}
        <div className="absolute top-4 bottom-4 left-[14px] w-[3px] bg-gray-200/40 rounded-full overflow-hidden">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full bg-[#1e0a3c]/30"
          />
        </div>

        <div className="space-y-12">
          {[
            { 
              time: '30-Day', 
              title: 'Market Readiness', 
              desc: 'Complete market research, validate product-market fit, and finalize your go-to-market strategy.' 
            },
            { 
              time: '60-Day', 
              title: 'Expansion Setup', 
              desc: 'Secure necessary compliance, begin distributor networking, and establish your initial presence.' 
            },
            { 
              time: '90-Day', 
              title: 'Global Scaling Roadmap', 
              desc: 'Launch operations, secure strategic partnerships, and prepare for TRL 6+ investor pitching.' 
            }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.15 }}
              className="relative flex items-start gap-8"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex items-center justify-center bg-transparent mt-1 group">
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center shadow-md border-4 border-white relative cursor-pointer"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    className="w-[18px] h-[18px] bg-[#1e0a3c] rounded-full flex items-center justify-center transition-colors"
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-4 group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-[22px] font-bold text-[#1e0a3c] mb-3">
                  <span className="text-[#1e0a3c]">{step.time}</span> <span className="text-[#1e0a3c]/40 mx-1">—</span> {step.title}
                </h3>
                <p className="text-[16px] text-[#1e0a3c]/50 font-bold leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- Terms and Conditions Modal ---

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[1.5rem] max-w-[1000px] w-full mx-auto min-h-[60vh] shadow-2xl shadow-[#1e0a3c]/20 p-6 md:p-10"
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#1e0a3c] hover:text-[#1e0a3c]/70 transition-colors mb-8 font-bold text-[14px]"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-[32px] font-bold text-[#1e0a3c] mb-4 tracking-tight">Terms and Conditions</h1>
        <p className="text-sm text-[#1e0a3c]/70 mb-8">Last Updated: 2025</p>

        <div className="space-y-8 text-[#1e0a3c]/80 text-[15px] leading-relaxed font-bold">
          <section>
            <p className="mb-4">
              Welcome to NeedItStartup. By accessing or using our services, platform, programs, or website, you agree to comply with and be bound by the following Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">1. No Guaranteed Funding or Business Outcomes</h2>
            <p>
              NeedItStartup does not guarantee funding, investment, partnerships, export approvals, business growth, revenue generation, or specific commercial outcomes.
            </p>
            <p className="mt-3">
              All services are provided as strategic support, guidance, ecosystem access, consulting, and execution assistance intended to support startup development and expansion.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">2. Payments and Pricing</h2>
            <ul className="list-disc list-inside space-y-2 text-[#1e0a3c]/80">
              <li>Payments are non-refundable once service execution or project work has commenced.</li>
              <li>Certain projects may follow milestone-based payment structures depending on the scope of work.</li>
              <li>Pricing may vary based on project complexity, requirements, customization, timelines, and service engagement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">3. Startup Eligibility &amp; TRL Requirements</h2>
            <p>
              Investor access, expansion support, or partnership-related services may only be available to startups that meet internal evaluation standards and applicable Technology Readiness Level (TRL) requirements.
            </p>
            <p className="mt-3">
              NeedItStartup reserves the right to accept or reject applications based on eligibility, feasibility, readiness, or alignment with company objectives.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">4. Intellectual Property</h2>
            <ul className="list-disc list-inside space-y-2 text-[#1e0a3c]/80">
              <li>All startup ideas, business models, pitch decks, documents, data, designs, and submitted materials remain the intellectual property of the respective founder or startup.</li>
              <li>NeedItStartup may use non-confidential project information, testimonials, public collaborations, or publicly available startup achievements for portfolio, branding, promotional, or marketing purposes unless otherwise agreed upon in writing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">5. Limitation of Liability</h2>
            <p>NeedItStartup shall not be held liable for:</p>
            <ul className="list-disc list-inside space-y-2 text-[#1e0a3c]/80 mt-3">
              <li>Funding rejection</li>
              <li>Investor decisions</li>
              <li>Partnership outcomes</li>
              <li>Export approval delays</li>
              <li>Business losses</li>
              <li>Revenue losses</li>
              <li>Third-party actions</li>
              <li>Commercial or operational damages arising from the use of our services</li>
            </ul>
            <p className="mt-3">
              All decisions made by investors, external partners, agencies, or regulatory authorities remain independent of NeedItStartup.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">6. Third-Party Services</h2>
            <p>
              Certain services may involve external consultants, investors, agencies, distributors, mentors, technology providers, or third-party platforms.
            </p>
            <p className="mt-3">
              NeedItStartup is not responsible for independent third-party decisions, actions, delays, service quality, or outcomes resulting from such collaborations.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">7. Termination of Services</h2>
            <p>
              NeedItStartup reserves the right to suspend, reject, or terminate services in cases involving:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#1e0a3c]/80 mt-3">
              <li>Fraudulent activities</li>
              <li>False information</li>
              <li>Misuse of services</li>
              <li>Unethical conduct</li>
              <li>Policy violations</li>
              <li>Non-compliance with agreed terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">8. Changes to Terms</h2>
            <p>
              NeedItStartup reserves the right to modify or update these Terms and Conditions at any time without prior notice. Continued use of the platform or services constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-[#1e0a3c] mb-3">9. Contact Information</h2>
            <p>
              For any questions regarding these Terms and Conditions, please contact:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#1e0a3c]/80 mt-3">
              <li>Email: <a href="mailto:needitstartup@gmail.com" className="text-[#1e0a3c] underline">needitstartup@gmail.com</a></li>
              <li>Instagram: @needit_startup</li>
              <li>Phone: +91 91089 22554</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Footer ---

export const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const services = [
    "Export Support",
    "Distributor Network",
    "Manufacturing Support",
    "Investor Access",
    "Grant Application"
  ];

  return (
    <>
      <footer className="bg-white relative z-10">
        {/* Main Footer Content */}
        <div className="px-6 lg:px-12 py-10">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-0">
              {/* About Us Section with Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 md:col-span-3"
              >
                <div className="mb-12">
                  <img src="/final_logo_cropped.png" alt="NeedItStartup Logo" className="h-24 object-contain" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1e0a3c] tracking-tight mb-3">About Us</h3>
                  <p className="text-[13px] text-[#1e0a3c]/70 leading-relaxed font-bold max-w-md">
                    NeedItStartup empowers early-stage founders with strategic guidance, scalable solutions, and global startup opportunities to transform innovative ideas into impactful ventures.
                  </p>
                </div>
              </motion.div>

              {/* Spacer for right alignment */}
              <div className="hidden md:block md:col-span-1"></div>

              {/* Menu Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="col-span-1 md:col-span-2"
              >
                <h3 className="text-[15px] font-bold text-[#1e0a3c] mb-4 tracking-tight">Menu</h3>
                <ul className="space-y-2">
                  <li>
                    <motion.a
                      href="/"
                      whileHover={{ x: 4 }}
                      className="text-[13px] text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors font-bold"
                    >
                      Home
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/programs"
                      whileHover={{ x: 4 }}
                      className="text-[13px] text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors font-bold"
                    >
                      Programs
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/industries"
                      whileHover={{ x: 4 }}
                      className="text-[13px] text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors font-bold"
                    >
                      Industries
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/services"
                      whileHover={{ x: 4 }}
                      className="text-[13px] text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors font-bold"
                    >
                      Services
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-[13px] text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors font-bold"
                    >
                      Blogs
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="https://docs.google.com/forms/d/1CP_Aad1Ts39tiaHTDyTEvIQT4NgroCibfqgz2qhIlvg/viewform"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 4 }}
                      className="text-[13px] text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors font-bold"
                    >
                      Startup Applications
                    </motion.a>
                  </li>
                </ul>
              </motion.div>

              {/* Spacer between sections */}
              <div className="hidden md:block md:col-span-1"></div>

              {/* Services Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="col-span-1 md:col-span-2"
              >
                <h3 className="text-[15px] font-bold text-[#1e0a3c] mb-4 tracking-tight">Services</h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index}>
                      <motion.p
                        whileHover={{ x: 4 }}
                        className="text-[13px] text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors font-bold cursor-pointer"
                      >
                        {service}
                      </motion.p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Spacer between sections */}
              <div className="hidden md:block md:col-span-1"></div>

              {/* Contact Us Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="col-span-1 md:col-span-2"
              >
                <h3 className="text-[15px] font-bold text-[#1e0a3c] mb-4 tracking-tight">Contact Us</h3>
                
                <div className="space-y-3">
                  <motion.a
                    href="mailto:needitstartup@gmail.com"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors"
                  >
                    <Mail size={16} className="flex-shrink-0" />
                    <span className="text-[13px] font-bold">needitstartup@gmail.com</span>
                  </motion.a>

                  <motion.a
                    href="tel:+919108922554"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors"
                  >
                    <Phone size={16} className="flex-shrink-0" />
                    <span className="text-[13px] font-bold">+91 91089 22554</span>
                  </motion.a>

                  <motion.a
                    href="https://instagram.com/needit_startup"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <circle cx="17.5" cy="6.5" r="1.5"></circle>
                    </svg>
                    <span className="text-[13px] font-bold">@needit_startup</span>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/company/needitstartup"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-[#1e0a3c]/60 hover:text-[#1e0a3c] transition-colors"
                  >
                    <Share2 size={16} className="flex-shrink-0" />
                    <span className="text-[13px] font-bold">NeedItStartup</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Dark Bottom Strip */}
        <div className="bg-[#0f1929] px-6 lg:px-12 py-4 border-t border-[#1e0a3c]/10">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => setShowTerms(true)}
              className="text-[11px] font-bold text-white/60 hover:text-white transition-colors tracking-widest uppercase"
            >
              Terms & Conditions
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold text-white/40 tracking-widest"
            >
              © 2025 NeedItStartup. All Rights Reserved.
            </motion.p>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
};

// --- Main Landing Page ---

export default function LandingPage({ isRoute }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  if (!isRoute) {
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

      </div>
    );
  }

  // When used in React Router (App.jsx handles layout)
  return (
    <>
      <Hero />
      <TrustedSection />
      <HowItWorks />
      <PlatformSection />
      <WhatsNew />
    </>
  );
}
