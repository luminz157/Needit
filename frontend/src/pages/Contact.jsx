import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Rocket, ArrowRight, Share2 } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-20 relative z-10 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <div className="bg-[#1e0a3c] text-white rounded-[2rem] p-8 shadow-2xl shadow-[#1e0a3c]/20 relative overflow-hidden">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e0a3c] font-bold rounded-xl hover:scale-105 transition-all text-[14px] relative z-10 shadow-lg"
          >
            Go to Application Form <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white text-[#1e0a3c] border border-[#1e0a3c]/10 rounded-[2rem] p-8 shadow-xl shadow-[#1e0a3c]/5">
          <h3 className="text-xl font-bold mb-8">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1e0a3c]/5 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-[#1e0a3c]" />
              </div>
              <div>
                <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mb-1">WhatsApp / Phone</p>
                <p className="text-[15px] font-bold">+91 91089 22554</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1e0a3c]/5 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-[#1e0a3c]" />
              </div>
              <div>
                <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mb-1">Email Us</p>
                <p className="text-[15px] font-bold">foundriva@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1e0a3c]/5 flex items-center justify-center flex-shrink-0">
                <Share2 size={18} className="text-[#1e0a3c]" />
              </div>
              <div>
                <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mb-1">LinkedIn</p>
                <a 
                  href="https://linkedin.com/company/foundriva" 
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] font-bold hover:text-[#1e0a3c] transition-colors"
                >
                  Foundriva
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
