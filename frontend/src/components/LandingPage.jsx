import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Rocket, Menu, X, ArrowRight, TrendingUp, Users, Globe, Shield, Check, Zap, Target, Layout, DollarSign, Share2, Mail, Phone, ArrowLeft } from 'lucide-react';
import { fadeUp, stagger } from '../utils/animations.js';

// --- Shared Components ---

export const MainBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute inset-0 bg-[linear-gradient(90deg,#21a6a2_0%,#3fc2bb_50%,#f66f65_50%,#f45f5e_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(255,246,218,0.36),transparent_24%)]" />
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
      className="fixed pointer-events-none z-0 w-[280px] h-[280px] rounded-full blur-[110px] bg-white/18"
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
    { name: 'Partnership', href: '/partnership' },
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
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 md:top-9 left-0 right-0 z-50 h-[3.25rem] md:h-[3.75rem] overflow-visible px-4 transition-all duration-300"
      >
        <div className={`max-w-[1120px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 rounded-[1.15rem] border border-white/70 bg-white/92 shadow-[0_18px_45px_rgba(18,82,82,0.16)] backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-[0_16px_36px_rgba(18,82,82,0.20)]' : ''
      }`}>
        <a href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <img src="/1.png" alt="scaleaccessnetwork Logo" className="h-[3rem] md:h-[3.6rem] object-contain group-hover:scale-105 transition-transform" />
        </a>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {links.map((l) => (
            <a 
              key={l.name} 
              href={l.href} 
              onClick={(e) => handleNavClick(e, l)}
              className="text-[11px] lg:text-[12px] font-bold text-[#193636]/62 hover:text-[#149e9a] transition-colors tracking-tight whitespace-nowrap"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex md:hidden items-center justify-center p-2 rounded-full border border-teal-100 text-black hover:bg-teal-50 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a href="/contact" className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-[#168f96] text-white text-[11px] font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-teal-700/20 tracking-tight whitespace-nowrap">
            Explore now
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="rounded-[1.25rem] bg-white shadow-2xl shadow-teal-100/40 border border-teal-50 overflow-hidden">
            <nav className="flex flex-col gap-2 p-4">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={(e) => {
                    handleNavClick(e, l);
                    setMobileOpen(false);
                  }}
                  className="block rounded-2xl px-4 py-3 text-sm font-bold text-black/80 hover:text-teal-500 hover:bg-teal-50 transition"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="/contact"
                className="block mt-2 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-3 text-center text-sm font-bold text-white hover:opacity-95 transition"
              >
                Explore now
              </a>
            </nav>
          </div>
        </div>
      )}
      </motion.header>
    </>
  );
};

// --- Trusted Section ---

const TrustedSection = () => (
  <section className="relative z-10 bg-[#dbfbf5] px-5 pb-16 pt-20 md:px-8 md:pb-20">
    <div className="mx-auto max-w-[920px]">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { image: '/s3.png', title: 'Structured Scaling', meta: 'Workspace access', desc: 'Move from local validation to global market fit with standardized tracking metrics.' },
          { image: '/s6.png', title: 'Global Markets', meta: '12+ markets', desc: 'Premium corporate links, sandbox environments, and international distribution channels.' },
          { image: '/s2.png', title: 'Verified Readiness', meta: 'TRL 6+', desc: 'Pre-screened startup support for investor-ready and enterprise-ready teams.' }
        ].map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className="overflow-hidden rounded-[0.8rem] bg-white shadow-[0_18px_42px_rgba(20,115,113,0.14)]"
          >
            <img src={item.image} alt="" className="h-32 w-full object-cover" />
            <div className="p-5">
              <h3 className="mb-2 text-[16px] font-black leading-tight text-[#173638]">{item.title}</h3>
              <p className="mb-5 text-[11px] font-bold leading-relaxed text-[#173638]/52">{item.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-7 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                  <span className="text-[10px] font-black text-[#173638]/45">{item.meta}</span>
                </div>
                <span className="rounded-full bg-[#f6faf9] px-3 py-1.5 text-[10px] font-black text-[#173638]/70">Active</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {[0, 1, 2, 3, 4].map((dot) => (
          <span key={dot} className={`h-2 rounded-full ${dot === 0 ? 'w-2 bg-[#123f48]' : 'w-2 bg-[#1d9a9a]/55'}`} />
        ))}
      </div>
    </div>
  </section>
);

// --- How It Works Section ---

const HowItWorks = () => {
  const steps = [
    { number: '01', title: 'Start Scouting Form', desc: 'Fill out details about your startup, technology readiness, product stage, and branding.' },
    { number: '02', title: 'Screening & Selection', desc: 'Our screening committee evaluates your startup on technical maturity, business potential, and product readiness.' },
    { number: '03', title: 'Scale Program Integration', desc: 'Selected startups join our custom scale tracks, gaining direct corporate links, distribution channels, and mentor networks.' }
  ];

  return (
    <section className="relative z-10 bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-[920px] gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div>
          <p className="mb-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#f4625d]">Process & Integration</p>
          <h2 className="mb-5 max-w-[360px] text-[34px] font-black leading-[0.96] tracking-tight text-[#173638] md:text-[46px]">
            Scale with structured support.
          </h2>
          <p className="max-w-[390px] text-[13px] font-bold leading-relaxed text-[#173638]/58">
            We provide startups direct access to premium corporate links, sandbox environments, and global distribution channels.
          </p>
        </div>
        <div className="grid gap-5">
          {steps.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="grid grid-cols-[48px_1fr] gap-4 rounded-[0.9rem] bg-[#f8fffd] p-5 shadow-[0_14px_30px_rgba(20,115,113,0.08)]"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-full text-white ${idx === 0 ? 'bg-[#f4625d]' : 'bg-[#179b9b]'}`}>
                {idx === 0 ? <Rocket size={18} /> : idx === 1 ? <Shield size={18} /> : <Globe size={18} />}
              </div>
              <div>
                <h3 className="mb-1 text-[15px] font-black text-[#173638]">{s.title}</h3>
                <p className="text-[11px] font-bold leading-relaxed text-[#173638]/55">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Hero Section ---

const Hero = () => (
  <section id="home" className="relative z-20 overflow-visible px-4 pb-10 pt-32 md:pb-12 md:pt-36">
    <div className="mx-auto max-w-[1120px] rounded-[1.7rem] border border-white/45 bg-white/22 p-4 shadow-[0_30px_80px_rgba(42,72,72,0.22)] backdrop-blur-[2px] md:p-8">
      <div className="overflow-visible rounded-[1.15rem] md:rounded-[2.6rem] bg-[#dbfbf5] shadow-[0_24px_55px_rgba(18,82,82,0.18)]">
        <div className="relative pb-[240px] md:pb-[160px] overflow-visible rounded-[1.15rem] md:rounded-[2.6rem] bg-[#0f5661] text-white">
          <img src="/s6.png" alt="" className="hidden md:block absolute inset-y-0 right-0 h-full w-[62%] lg:w-1/2 object-cover opacity-82 mix-blend-screen rounded-r-[1.15rem] md:rounded-r-[2.6rem]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#073944_0%,rgba(11,93,99,0.96)_42%,rgba(17,112,112,0.20)_72%)] rounded-[1.15rem] md:rounded-[2.6rem]" />
          <div className="absolute right-[-70px] top-[-80px] h-64 w-64 rounded-full bg-[#ffefcb]/50 blur-[34px]" />

          <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-[500px] px-6 pt-12 md:px-12 md:pt-16">
            <motion.h1 
              variants={fadeUp}
              className="mb-5 text-[36px] font-black leading-[0.98] tracking-tight text-white md:text-[52px]"
            >
              From Startup to <br />
              Global Success
            </motion.h1>

            <motion.p variants={fadeUp} className="mb-7 max-w-[350px] text-[12px] font-bold leading-relaxed text-white/70 md:text-[13px]">
              We help startups scale from idea to international markets with structured execution, partnerships, and market access.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="https://docs.google.com/forms/d/1CP_Aad1Ts39tiaHTDyTEvIQT4NgroCibfqgz2qhIlvg/viewform" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f4625d] px-6 py-3 text-[12px] font-black text-white shadow-xl shadow-rose-900/20 transition-all hover:scale-105 active:scale-95 sm:w-auto">
                Apply now
              </a>
              <span className="inline-flex items-center gap-2 text-[12px] font-black text-white/78 justify-center">
                <Globe size={16} /> 12+ markets
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-6 left-1/2 z-30 w-[92%] md:w-[86%] -translate-x-1/2 rounded-[0.9rem] bg-white p-4 shadow-[0_18px_42px_rgba(18,82,82,0.22)]"
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-[1fr_1fr_0.8fr_auto] md:items-center">
              <div className="rounded-xl bg-[#f7fbfa] px-4 py-3 col-span-2 sm:col-span-1">
                <p className="text-[10px] font-black text-[#173638]/45">Program</p>
                <p className="text-[12px] font-black text-[#173638]">Global Expansion</p>
              </div>
              <div className="rounded-xl bg-[#f7fbfa] px-4 py-3 col-span-2 sm:col-span-1">
                <p className="text-[10px] font-black text-[#173638]/45">Readiness</p>
                <p className="text-[12px] font-black text-[#173638]">TRL 6+</p>
              </div>
              <div className="px-2 col-span-1 flex flex-col justify-center">
                <p className="text-[11px] font-black text-[#173638]/45">Active Startups</p>
                <p className="text-[20px] md:text-[24px] font-black leading-none text-[#168f96]">142+</p>
              </div>
              <a href="/contact" className="col-span-1 inline-flex items-center justify-center rounded-full bg-[#123f48] px-4 py-3 text-[11px] font-black text-white transition hover:bg-[#0d333a] h-full text-center">
                Explore
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

// eslint-disable-next-line no-unused-vars
const LegacyHeroMockup = () => (
    <div>
    <div>
      <div className="relative flex justify-center items-center py-8 scale-75 md:scale-90 lg:scale-75 xl:scale-100 origin-center lg:translate-x-4 xl:translate-x-0">
        {/* Floating Metric Cards */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-10 top-1/4 z-40 bg-white p-4.5 rounded-2xl shadow-2xl shadow-teal-100 border border-teal-50/50 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center"><DollarSign size={18} /></div>
          <div>
            <p className="text-[10px] font-bold opacity-30 tracking-wider text-black">Seed funding</p>
            <p className="text-[15px] font-bold text-black">$1.2M Ready</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-8 bottom-1/4 z-40 bg-white p-4.5 rounded-2xl shadow-2xl shadow-teal-100 border border-teal-50/50 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600"><Check size={18} /></div>
          <div>
            <p className="text-[10px] font-bold opacity-30 tracking-wider text-black">Track verified</p>
            <p className="text-[15px] font-bold text-black">Level 04 Track</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-10 z-30 bg-white border border-teal-50 rounded-2xl p-4.5 shadow-2xl shadow-teal-100 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest">Startups</p>
            <p className="text-[15px] font-bold text-black">42 Active</p>
          </div>
        </motion.div>

        {/* Glow Effect Behind Phones (Light Green Glow) */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 pointer-events-none z-0">
          <div className="w-[800px] h-[800px] bg-gradient-to-br from-[#38a39b]/40 via-[#eefcf9]/20 to-transparent rounded-full blur-[100px]" />
        </div>

        {/* Mockup Animation */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 0.5, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20"
        >
          <div className="w-[280px] h-[560px] bg-white rounded-[3.5rem] border-[8px] border-gray-100 shadow-2xl shadow-teal-200/40 overflow-hidden p-7 relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-gray-100" />
            <div className="mt-10">
               <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-2">scaleaccessnetwork portal</p>
               <p className="text-2xl font-bold text-black mb-6">Active tracks</p>
               
               <div className="h-44 w-full bg-gray-50 rounded-[1.8rem] mb-7 flex flex-col p-5 border border-gray-100 gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-500">Seed Round</p>
                    <TrendingUp size={14} className="text-emerald-500" />
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                      className="h-full bg-gradient-to-r from-rose-400 to-fuchsia-400 rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between items-end mt-auto">
                    <div className="space-y-1">
                      <p className="text-[8px] text-gray-400 font-bold">Progress</p>
                      <p className="text-[12px] font-bold text-black">$1.2M / $1.5M</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-emerald-500 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-black">85%</span>
                    </div>
                  </div>
               </div>
               
               <div className="space-y-3">
                  <div className="h-13 bg-gray-50 rounded-xl flex items-center px-4 gap-3 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500"><Zap size={15} /></div>
                    <p className="text-[12px] font-bold text-gray-700">Accelerator track</p>
                  </div>
                  <div className="h-13 bg-gray-50 rounded-xl flex items-center px-4 gap-3 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><Target size={15} /></div>
                    <p className="text-[12px] font-bold text-gray-700">Expert mentorship</p>
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
          <div className="w-[240px] h-[480px] bg-white rounded-[2.8rem] border-[8px] border-gray-100 shadow-2xl shadow-teal-200/30 overflow-hidden p-6 flex flex-col justify-between opacity-85">
            <div>
              <div className="mt-14 h-3.5 w-20 bg-gray-200 rounded-full mb-7" />
              <div className="h-36 w-full bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 tracking-widest">Platform stats</p>
                <div className="flex gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
            <div className="h-12 w-full bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 tracking-widest">scaleaccessnetwork.ai</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
);

// --- Platform Section (Industries Preview) ---

const PlatformSection = () => (
  <section className="relative z-10 overflow-hidden bg-white px-5 pb-20 md:px-8">
    <div className="mx-auto grid max-w-[920px] gap-10 lg:grid-cols-2 lg:items-center">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-10 cursor-pointer rounded-[0.95rem] border border-[#d8f1ed] bg-[#f8fffd] p-7 shadow-[0_18px_42px_rgba(20,115,113,0.12)]"
          onClick={() => window.location.href = '/industries'}
        >
          <div className="flex items-center justify-between mb-7">
             <div>
                <p className="text-teal-500 text-[10px] font-bold tracking-[0.2em] mb-2">INDUSTRY FOCUS</p>
                <p className="text-[14px] font-bold text-gray-700 leading-tight">Specialized networks across high-impact sectors.</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200 text-[14px] font-bold text-teal-500 shadow-sm">N</div>
          </div>
          
          <div className="h-36 w-full mb-7 relative">
             <div className="absolute -top-7 left-0 text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase">DeepTech & AI Growth</div>
             <motion.svg viewBox="0 0 400 100" className="w-full h-full">
                <motion.path
                  d="M0,80 C40,75 80,40 120,60 C160,80 200,20 240,50 C280,80 320,30 400,10"
                  stroke="#f43f5e"
                  strokeWidth="3.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
                <text x="50" y="95" fill="#e11d48" fontSize="8.5" opacity="0.7" fontWeight="700" style={{ fontFamily: "'Lato', sans-serif" }}>FINTECH</text>
                <text x="320" y="25" fill="#e11d48" fontSize="8.5" opacity="0.7" fontWeight="700" style={{ fontFamily: "'Lato', sans-serif" }}>CLIMATETECH</text>
             </motion.svg>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="text-gray-400 text-[10px] font-bold tracking-widest mb-2">Active Sectors</p>
                <p className="text-2xl font-bold text-black">8+</p>
             </div>
             <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="text-gray-400 text-[10px] font-bold tracking-widest mb-2">Total Raised</p>
                <p className="text-2xl font-bold text-black">$ 14.5M</p>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="lg:pl-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-[34px] font-black leading-[0.96] tracking-tight text-[#173638] md:text-[46px]"
        >
          Industries we <br />
          support globally.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8 max-w-md text-[13px] font-bold leading-relaxed text-[#173638]/60"
        >
          We bring specialized expertise and global networks to startups across diverse, high-impact industries including Artificial Intelligence, FinTech, BioTech, AgriTech, and ClimateTech.
        </motion.p>
        <a href="/industries" className="inline-flex items-center gap-2.5 rounded-full bg-[#f4625d] px-7 py-3.5 text-[12px] font-black text-white shadow-xl shadow-rose-900/15 transition-all hover:scale-105 active:scale-95">
          Explore Industries <ArrowRight size={18} />
        </a>
      </div>
    </div>
  </section>
);

// --- What's New Section (Services Preview) ---

const WhatsNew = () => (
  <section className="relative z-10 overflow-hidden bg-[#dbfbf5] px-5 py-20 md:px-8">
    <div className="mx-auto max-w-[920px]">
      <div className="grid gap-10 lg:grid-cols-[50%_50%] lg:items-center">
        {/* Left Side: Heading + 4 Horizontal Rectangles (50% width) */}
        <div className="space-y-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-[34px] font-black leading-[0.96] tracking-tight text-[#173638] md:text-[48px]"
            >
              Core services we <br />
              provide for you
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8 max-w-md text-[13px] font-bold leading-relaxed text-[#173638]/60"
            >
              We provide a comprehensive ecosystem of support to help you navigate every stage of your startup journey.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Market Entry',
                desc: 'Strategic international market access and digital growth strategies.',
                icon: Globe
              },
              {
                title: 'Expansion Setup',
                desc: 'Scalable export facilitation and distributor network management.',
                icon: TrendingUp
              },
              {
                title: 'Scale Globally',
                desc: 'Global manufacturing support and international growth roadmaps.',
                icon: Rocket
              },
              {
                title: 'Explore More Services',
                desc: 'Discover our full range of incubation, funding, and workspace solutions.',
                icon: Layout,
                isSpecial: true
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`flex items-center gap-4 rounded-[0.85rem] border p-5 transition-all duration-300 ${
                  service.isSpecial 
                    ? 'bg-[#f4625d] text-white border-[#f4625d] shadow-xl shadow-rose-900/10 cursor-pointer'
                    : 'bg-white text-[#173638] border-teal-50 shadow-[0_14px_30px_rgba(20,115,113,0.10)] hover:border-teal-100'
                }`}
                onClick={() => service.isSpecial && (window.location.href = '/services')}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  service.isSpecial ? 'bg-white text-teal-500' : 'bg-teal-50 text-teal-500 border border-teal-100/50'
                }`}>
                  <service.icon size={18} />
                </div>
                <div>
                  <h4 className="text-[17px] font-bold tracking-tight">{service.title}</h4>
                </div>
                <ArrowRight size={18} className={`ml-auto ${service.isSpecial ? 'text-white' : 'text-teal-500/40'}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Animation (50% width) */}
        <div className="relative flex justify-center h-full pt-16">
          <div className="relative w-full max-w-[460px] h-[500px] scale-90 xl:scale-100 origin-center">
            {/* Animated layout for large screens */}
            <div className="hidden lg:block">
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
                  className={`absolute p-7 rounded-[2.5rem] bg-white text-black border border-teal-50 flex flex-col justify-between shadow-2xl shadow-teal-100/60 ${
                    i === 0 ? "top-0 left-0 w-48 h-48 z-10" :
                    i === 1 ? "top-20 right-0 w-56 h-36 z-20" :
                    i === 2 ? "bottom-20 left-10 w-44 h-56 z-30 opacity-90" :
                    "bottom-0 right-5 w-64 h-52 z-40"
                  }`}
                  style={{ filter: "drop-shadow(0 10px 20px rgba(20, 184, 166, 0.08))" }}
                >
                  <div className="flex items-center justify-between mb-5">
                     <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-500">
                       <card.icon size={20} />
                     </div>
                     <div className="h-1.5 w-10 bg-teal-100 rounded-full" />
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 tracking-[0.15em] mb-1.5 uppercase">{card.label}</p>
                    <p className="text-2xl font-black text-indigo-950">{card.value}</p>
                  </div>

                  <div className="mt-5 space-y-2.5">
                     <div className="h-1.5 w-full bg-teal-50 rounded-2xl overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: i === 3 ? "100%" : "60%" }}
                           transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                           className="h-full bg-rose-500" 
                        />
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Static compact grid for smaller screens */}
            <div className="grid lg:hidden grid-cols-2 gap-4">
              {[
                { label: 'Startups', value: '142', icon: Rocket },
                { label: 'Mentors', value: '84', icon: Users },
                { label: 'Funding', value: '$2.4M', icon: DollarSign },
                { label: 'Programs', value: 'Active', icon: Zap }
              ].map((card, i) => (
                <div key={i} className="rounded-xl bg-white p-4 shadow-md border border-teal-50 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-500">
                      <card.icon size={18} />
                    </div>
                    <div className="h-1.5 w-10 bg-teal-100 rounded-full" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 tracking-[0.15em] uppercase">{card.label}</p>
                  <p className="text-xl font-black text-indigo-950">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Timeline Section ---

// eslint-disable-next-line no-unused-vars
const TimelineSection = () => (
  <section id="programs" className="py-20 relative z-10 overflow-hidden">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-4xl lg:text-[50px] font-bold text-black mb-7 tracking-tighter"
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
            className="w-full bg-rose-500/30"
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
                    className="w-[18px] h-[18px] bg-rose-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-4 group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-[22px] font-bold text-black mb-3">
                  <span className="text-teal-500">{step.time}</span> <span className="text-slate-300 mx-1">—</span> {step.title}
                </h3>
                <p className="text-[16px] text-black font-bold leading-relaxed max-w-2xl">
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
        className="bg-white rounded-[1.5rem] max-w-[1000px] w-full mx-auto min-h-[60vh] shadow-2xl shadow-teal-100/60 p-6 md:p-10"
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-black hover:text-teal-500 transition-colors mb-8 font-bold text-[14px]"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-[32px] font-bold text-black mb-4 tracking-tight">Terms and Conditions</h1>

        <div className="space-y-8 text-slate-600 text-[15px] leading-relaxed font-bold">
          <section>
            <p className="mb-4">
                Welcome to scaleaccessnetwork. By accessing or using our services, platform, programs, or website, you agree to comply with and be bound by the following Terms and Conditions.
              </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">1. No Guaranteed Funding or Business Outcomes</h2>
            <p>
              scaleaccessnetwork does not guarantee funding, investment, partnerships, export approvals, business growth, revenue generation, or specific commercial outcomes.
            </p>
            <p className="mt-3">
              All services are provided as strategic support, guidance, ecosystem access, consulting, and execution assistance intended to support startup development and expansion.
            </p>
          </section>
          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">2. Payments and Pricing</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>Payments are non-refundable once service execution or project work has commenced.</li>
              <li>Certain projects may follow milestone-based payment structures depending on the scope of work.</li>
              <li>Pricing may vary based on project complexity, requirements, customization, timelines, and service engagement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">3. Startup Eligibility &amp; TRL Requirements</h2>
            <p>
              Investor access, expansion support, or partnership-related services may only be available to startups that meet internal evaluation standards and applicable Technology Readiness Level (TRL) requirements.
            </p>
            <p className="mt-3">
              scaleaccessnetwork reserves the right to accept or reject applications based on eligibility, feasibility, readiness, or alignment with company objectives.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">4. Intellectual Property</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>All startup ideas, business models, pitch decks, documents, data, designs, and submitted materials remain the intellectual property of the respective founder or startup.</li>
              <li>scaleaccessnetwork may use non-confidential project information, testimonials, public collaborations, or publicly available startup achievements for portfolio, branding, promotional, or marketing purposes unless otherwise agreed upon in writing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">5. Limitation of Liability</h2>
            <p>scaleaccessnetwork shall not be held liable for:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mt-3">
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
              All decisions made by investors, external partners, agencies, or regulatory authorities remain independent of scaleaccessnetwork.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">6. Third-Party Services</h2>
            <p>
              Certain services may involve external consultants, investors, agencies, distributors, mentors, technology providers, or third-party platforms.
            </p>
              <p className="mt-3">
              scaleaccessnetwork is not responsible for independent third-party decisions, actions, delays, service quality, or outcomes resulting from such collaborations.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">7. Termination of Services</h2>
            <p>
              scaleaccessnetwork reserves the right to suspend, reject, or terminate services in cases involving:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mt-3">
              <li>Fraudulent activities</li>
              <li>False information</li>
              <li>Misuse of services</li>
              <li>Unethical conduct</li>
              <li>Policy violations</li>
              <li>Non-compliance with agreed terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">8. Changes to Terms</h2>
            <p>
              scaleaccessnetwork reserves the right to modify or update these Terms and Conditions at any time without prior notice. Continued use of the platform or services constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-[22px] font-bold text-black mb-3">9. Contact Information</h2>
            <p>
              For any questions regarding these Terms and Conditions, please contact:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mt-3">
              <li>Email: <a href="mailto:scaleaccessnetwork@gmail.com" className="text-teal-500 underline">scaleaccessnetwork@gmail.com</a></li>
              <li>Instagram: @scaleaccessnetwork</li>
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

  const services = [
    "Co-Working Space",
    "Export Support",
    "Distributor Network",
    "Manufacturing Support",
    "Investor Access",
    "Digital Marketing"
  ];

  return (
    <>
      <footer className="bg-white relative z-10">
        {/* Main Footer Content */}
        <div className="px-6 lg:px-12 py-6">
            <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-0 items-start">
              {/* About Us Section with Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 md:col-span-3"
              >
                <div className="mb-4">
                  <img src="/2.png" alt="scaleaccessnetwork Logo" className="h-[6rem] md:h-[8rem] object-contain object-left ml-[-20px]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-black tracking-tight mb-3">About Us</h3>
                  <p className="text-[13px] text-black leading-relaxed font-semibold max-w-md">
                    scaleaccessnetwork empowers early-stage founders with strategic guidance, scalable solutions, and global startup opportunities to transform innovative ideas into impactful ventures.
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
                <h3 className="text-[15px] font-bold text-black mb-4 tracking-tight">Menu</h3>
                <ul className="space-y-2">
                  <li>
                    <motion.a
                      href="/"
                      whileHover={{ x: 4 }}
                      className="inline-block text-[13px] text-black hover:text-teal-500 transition-colors font-bold"
                    >
                      Home
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/programs"
                      whileHover={{ x: 4 }}
                      className="inline-block text-[13px] text-black hover:text-teal-500 transition-colors font-bold"
                    >
                      Programs
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/industries"
                      whileHover={{ x: 4 }}
                      className="inline-block text-[13px] text-black hover:text-teal-500 transition-colors font-bold"
                    >
                      Industries
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/services"
                      whileHover={{ x: 4 }}
                      className="inline-block text-[13px] text-black hover:text-teal-500 transition-colors font-bold"
                    >
                      Services
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/blogs"
                      whileHover={{ x: 4 }}
                      className="inline-block text-[13px] text-black hover:text-teal-500 transition-colors font-bold"
                    >
                      Blogs
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/partnership"
                      whileHover={{ x: 4 }}
                      className="inline-block text-[13px] text-black hover:text-teal-500 transition-colors font-bold"
                    >
                      Partnership
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="https://docs.google.com/forms/d/1CP_Aad1Ts39tiaHTDyTEvIQT4NgroCibfqgz2qhIlvg/viewform"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 4 }}
                      className="inline-block text-[13px] text-black hover:text-teal-500 transition-colors font-bold"
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
                <h3 className="text-[15px] font-bold text-black mb-4 tracking-tight">Services</h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index}>
                      <motion.p
                        whileHover={{ x: 4 }}
                        className="text-[13px] text-black hover:text-teal-500 transition-colors font-bold cursor-pointer"
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
                <h3 className="text-[15px] font-bold text-black mb-4 tracking-tight">Contact Us</h3>
                
                <div className="space-y-3">
                  <motion.a
                    href="mailto:scaleaccessnetwork@gmail.com"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-black hover:text-teal-500 transition-colors w-fit group"
                  >
                    <Mail size={16} className="flex-shrink-0 text-blue-600" />
                    <span className="text-[13px] font-bold">scaleaccessnetwork@gmail.com</span>
                  </motion.a>

                  <motion.a
                    href="https://www.scaleaccessnetwork.com"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-black hover:text-teal-500 transition-colors w-fit group"
                  >
                    <Globe size={16} className="flex-shrink-0 text-pink-600" />
                    <span className="text-[13px] font-bold">www.scaleaccessnetwork.com</span>
                  </motion.a>

                  <motion.a
                    href="tel:+919108922554"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-black hover:text-teal-500 transition-colors w-fit"
                  >
                    <Phone size={16} className="flex-shrink-0 text-orange-600" />
                    <span className="text-[13px] font-bold">+91 91089 22554</span>
                  </motion.a>

                  <motion.a
                    href="https://instagram.com/scaleaccessnetwork"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-black hover:text-teal-500 transition-colors w-fit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <circle cx="17.5" cy="6.5" r="1.5"></circle>
                    </svg>
                    <span className="text-[13px] font-bold">@scaleaccessnetwork</span>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/company/scaleaccessnetwork"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-black hover:text-teal-500 transition-colors w-fit"
                  >
                    <Share2 size={16} className="flex-shrink-0 text-teal-600" />
                    <span className="text-[13px] font-bold">scaleaccessnetwork</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Dark Bottom Strip */}
        <div className="bg-[#0f172a] px-6 lg:px-12 py-4 border-t border-slate-100/10">
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
              © 2026 scaleaccessnetwork. All Rights Reserved.
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
      <div className="relative min-h-screen selection:bg-rose-500 selection:text-white overflow-x-hidden bg-[#2db6b1]" style={{ fontFamily: "'Lato', sans-serif" }}>
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
