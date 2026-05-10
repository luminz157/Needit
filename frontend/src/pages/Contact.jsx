import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Rocket } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Could not connect to the server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-20 relative z-10 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-[50px] font-bold text-[#1e0a3c] mb-6 tracking-tighter"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[16px] text-[#1e0a3c]/60 font-bold max-w-2xl mx-auto leading-relaxed"
        >
          Have questions about our programs or services? Send us a message and our team will get back to you shortly.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* Main Call to Action for Startup Scouting */}
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
              Go to Application Form <ArrowRightIcon />
            </a>
          </div>

          {/* Contact Details */}
          <div className="bg-white text-[#1e0a3c] border border-[#1e0a3c]/10 rounded-[2rem] p-8 shadow-xl shadow-[#1e0a3c]/5">
            <h3 className="text-xl font-bold mb-8">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1e0a3c]/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-[#1e0a3c]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mb-1">WhatsApp / Phone</p>
                  <p className="text-[15px] font-bold">+91 08922554</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1e0a3c]/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#1e0a3c]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-[15px] font-bold">hello@needitstartup.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1e0a3c]/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#1e0a3c]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mb-1">LinkedIn</p>
                  <a href="#" className="text-[15px] font-bold hover:text-[#1e0a3c] transition-colors">Need It Startup Official</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Native Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 bg-white rounded-[2rem] p-8 lg:p-10 shadow-2xl shadow-[#1e0a3c]/10 border border-[#1e0a3c]/5"
        >
          <h3 className="text-2xl font-bold text-[#1e0a3c] mb-2">Send an Inquiry</h3>
          <p className="text-[14px] text-[#1e0a3c]/50 font-bold mb-8">This form connects directly to our backend system.</p>
          
          {isSuccess ? (
            <div className="bg-emerald-50 text-emerald-600 p-6 rounded-xl border border-emerald-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <p className="font-bold text-[15px]">Message Sent Successfully!</p>
                <p className="text-[13px] opacity-80">We've received your inquiry and will contact you shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-[#1e0a3c]/70 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-5 py-4 text-[14px] font-bold outline-none focus:border-[#1e0a3c] focus:bg-white transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-[#1e0a3c]/70 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-5 py-4 text-[14px] font-bold outline-none focus:border-[#1e0a3c] focus:bg-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#1e0a3c]/70 uppercase tracking-wider">Startup / Company Name</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-5 py-4 text-[14px] font-bold outline-none focus:border-[#1e0a3c] focus:bg-white transition-all"
                  placeholder="Your Startup Ltd."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#1e0a3c]/70 uppercase tracking-wider">Message</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-5 py-4 text-[14px] font-bold outline-none focus:border-[#1e0a3c] focus:bg-white transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold tracking-widest text-[14px] transition-all shadow-xl ${
                  isSubmitting 
                    ? 'bg-[#1e0a3c]/50 cursor-not-allowed shadow-none' 
                    : 'bg-[#1e0a3c] hover:bg-[#0f051e] shadow-[#1e0a3c]/20 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? 'Sending...' : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Small helper component
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
