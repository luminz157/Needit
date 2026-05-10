import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Building, Clock } from 'lucide-react';

export default function Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/admin/contacts`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setContacts(data.data);
      } else {
        setError(data.error || 'Failed to fetch contacts');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 relative z-10 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-end mb-12">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[#1e0a3c] mb-2 tracking-tighter"
          >
            Founder Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[15px] text-[#1e0a3c]/60 font-bold tracking-wide"
          >
            View and manage your startup inquiries
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1e0a3c] text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-[#1e0a3c]/20 flex items-center gap-3"
        >
          <Users size={18} />
          <span>{contacts.length} Total Inquiries</span>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-[#1e0a3c] border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 font-bold">
          {error}
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white border border-[#1e0a3c]/10 rounded-[2rem] p-16 text-center shadow-xl shadow-[#1e0a3c]/5">
          <div className="w-20 h-20 bg-[#1e0a3c]/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-[#1e0a3c]/40" />
          </div>
          <h3 className="text-xl font-bold text-[#1e0a3c] mb-2">No inquiries yet</h3>
          <p className="text-[#1e0a3c]/50 font-medium">When users submit the contact form, they will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {contacts.map((contact, index) => (
            <motion.div 
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-[#1e0a3c]/5 border border-[#1e0a3c]/10 flex flex-col md:flex-row gap-8"
            >
              <div className="md:w-1/3 space-y-4">
                <div>
                  <p className="text-[11px] font-bold text-[#1e0a3c]/40 uppercase tracking-widest mb-1">Name</p>
                  <p className="font-bold text-[#1e0a3c] text-[16px]">{contact.name}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#1e0a3c]/50" />
                  <a href={`mailto:${contact.email}`} className="text-[14px] font-bold text-[#1e0a3c] hover:underline">
                    {contact.email}
                  </a>
                </div>
                
                {contact.company && (
                  <div className="flex items-center gap-2">
                    <Building size={14} className="text-[#1e0a3c]/50" />
                    <span className="text-[14px] font-bold text-[#1e0a3c]/80">{contact.company}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 pt-2 border-t border-[#1e0a3c]/10">
                  <Clock size={14} className="text-[#1e0a3c]/40" />
                  <span className="text-[12px] font-bold text-[#1e0a3c]/40 uppercase">
                    {new Date(contact.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="md:w-2/3 bg-[#1e0a3c]/5 rounded-xl p-5 border border-[#1e0a3c]/10">
                <p className="text-[11px] font-bold text-[#1e0a3c]/40 uppercase tracking-widest mb-3">Message / Inquiry</p>
                <p className="text-[#1e0a3c]/80 text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
                  {contact.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
