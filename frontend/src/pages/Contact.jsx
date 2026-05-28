import { motion } from 'framer-motion';
import { Mail, Phone, Rocket, ArrowRight, Share2, Globe, Users, Zap } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-20 relative z-10 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <div className="bg-gradient-to-br from-[#164a4d] to-[#267a7a] text-white rounded-[2rem] p-8 shadow-2xl shadow-teal-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Rocket size={100} />
          </div>
          <h3 className="text-2xl font-bold mb-4 relative z-10">Startup Scouting Form</h3>
          <p className="text-[14px] font-medium text-white/80 mb-8 relative z-10">
            Looking for Global Expansion, Distribution, or Investor Access? Please fill out our official scouting form to be considered for our programs.
          </p>
          <a
            href="https://docs.google.com/forms/d/1CP_Aad1Ts39tiaHTDyTEvIQT4NgroCibfqgz2qhIlvg/viewform"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl hover:scale-105 transition-all text-[14px] relative z-10 shadow-lg shadow-indigo-950/20"
          >
            Go to Application Form <ArrowRight size={18} />
          </a>
        </div>

        {/* WHY US Section for Application Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-[#dbfbf5] rounded-[2rem] p-8 shadow-2xl shadow-teal-100/40 border border-[#c6f0e8]"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-[#173638]">WHY US</h3>
            <p className="mb-6 text-[14px] font-medium text-[#173638]/70">We focus on founder-first programs, global market access, and hands-on execution to help startups scale.</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[{
                title: 'Founder-First',
                desc: 'Built for startup founders.',
                icon: Users
              },{
                title: 'Global Vision',
                desc: 'International market support.',
                icon: Globe
              },{
                title: 'Strong Network',
                desc: 'Partners, investors, mentors.',
                icon: Users
              },{
                title: 'Execution Focused',
                desc: 'Not just advice — execution.',
                icon: Zap
              }].map((c, i) => (
                <div key={i} className="rounded-xl bg-white p-5 shadow-[0_14px_30px_rgba(20,115,113,0.08)] border border-white">
                  <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-3 text-teal-600">
                    <c.icon size={20} />
                  </div>
                  <h4 className="font-bold mb-1 text-[#173638] text-[15px]">{c.title}</h4>
                  <p className="text-[12px] font-semibold leading-relaxed text-[#173638]/60">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="bg-white text-black border border-teal-50/80 rounded-[2rem] p-8 shadow-2xl shadow-teal-100/40">
          <h3 className="text-xl font-bold mb-8">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-cyan-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp / Phone</p>
                <p className="text-[15px] font-bold">+91 91089 22554</p>
              </div>
            </div>
      
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-red-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                <p className="text-[15px] font-bold">scaleaccessnetwork@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Share2 size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">LinkedIn</p>
                <a 
                  href="https://linkedin.com/company/scaleaccessnetwork" 
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] font-bold hover:text-teal-500 transition-colors"
                >
                  scaleaccessnetwork
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
