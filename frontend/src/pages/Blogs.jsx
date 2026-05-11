import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, Share2, Calendar, Clock } from 'lucide-react';

const Blogs = () => {
  const [rotation, setRotation] = useState(0);
  const images = [
    { id: 1, title: 'Global Expansion', color: 'bg-blue-500' },
    { id: 2, title: 'DeepTech Innovation', color: 'bg-purple-500' },
    { id: 3, title: 'FinTech Growth', color: 'bg-emerald-500' },
    { id: 4, title: 'AgriTech Solutions', color: 'bg-orange-500' },
    { id: 5, title: 'BioTech Frontiers', color: 'bg-pink-500' },
    { id: 6, title: 'Climate Tech', color: 'bg-cyan-500' },
  ];

  const handleNext = () => setRotation(r => r - 60);
  const handlePrev = () => setRotation(r => r + 60);

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, []);

  const posts = [
    {
      date: 'May 11, 2026',
      title: 'How Indian Startups Can Scale Globally in 2026',
      excerpt: 'India is rapidly becoming one of the world’s strongest startup ecosystems. From DeepTech and FinTech to AgriTech, BioTech, Climate Tech, and MedTech, Indian entrepreneurs are building innovative solutions that are attracting global attention.',
      category: 'STRATEGY',
      comments: 12
    },
    {
      date: 'May 10, 2026',
      title: 'The New Generation of Indian Startups',
      excerpt: 'Today’s startups are solving real-world problems using technology, innovation, and scalable business models. Modern startups are built to grow quickly and enter multiple markets.',
      category: 'INNOVATION',
      comments: 8
    },
    {
      date: 'May 09, 2026',
      title: 'Challenges Faced by Early-Stage Startups',
      excerpt: 'Even with strong ideas, many startups struggle because they lack access to the right resources and networks. Some common startup challenges include accessing investors and branding.',
      category: 'GROWTH',
      comments: 5
    },
    {
      date: 'May 08, 2026',
      title: 'Why Investor Readiness Matters',
      excerpt: 'Investors evaluate product readiness, technology maturity, revenue potential, and team capability. Startups operating at TRL 6 and above often attract stronger investor interest.',
      category: 'FUNDING',
      comments: 15
    },
    {
      date: 'May 07, 2026',
      title: 'The Importance of Branding and Digital Presence',
      excerpt: 'In today’s digital world, branding is no longer optional. A startup’s online presence directly affects how customers, investors, and partners perceive the business.',
      category: 'MARKETING',
      comments: 7
    },
    {
      date: 'May 06, 2026',
      title: 'Global Expansion Opportunities for Indian Startups',
      excerpt: 'Indian startups are now expanding into Southeast Asia, Middle East, Europe, North America, and Africa. Global expansion creates opportunities for larger customer bases.',
      category: 'GLOBAL',
      comments: 21
    },
    {
      date: 'May 05, 2026',
      title: 'How Distribution Networks Help Startups Grow',
      excerpt: 'Distribution plays a major role in startup scaling. Even innovative products struggle without proper market access. Strong distributor and channel partner networks help startups reach new markets.',
      category: 'DISTRIBUTION',
      comments: 9
    },
    {
      date: 'May 04, 2026',
      title: 'Why Incubation and Ecosystem Support Matter',
      excerpt: 'Startup ecosystems provide mentorship, networking, strategic guidance, industry access, and collaboration opportunities. Incubation support helps founders avoid common mistakes.',
      category: 'ECOSYSTEM',
      comments: 11
    },
    {
      date: 'May 03, 2026',
      title: 'The Future of Indian Startups',
      excerpt: 'India’s startup ecosystem is entering a transformational phase. The future belongs to startups that think globally, build scalable systems, and focus on innovation.',
      category: 'FUTURE',
      comments: 18
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 bg-white">
      {/* 3D Image Carousel Section */}
      <section className="mb-6 relative overflow-hidden h-[180px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#1e0a3c]/5 to-white pointer-events-none" />
        
        <div className="relative w-full max-w-[800px] h-full flex items-center justify-center perspective-[2000px]">
          <motion.div
            className="relative w-[150px] h-[80px] preserve-3d"
            animate={{ rotateY: rotation }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            {images.map((img, i) => (
              <div
                key={img.id}
                className="absolute inset-0 rounded-[0.5rem] border-[2px] border-white shadow-lg overflow-hidden backface-hidden"
                style={{
                  transform: `rotateY(${i * 60}deg) translateZ(160px)`,
                }}
              >
                <div className={`w-full h-full ${img.color} flex items-center justify-center text-white p-2 text-center`}>
                  <div className="w-full h-full border border-white/20 rounded flex items-center justify-center text-[6px] uppercase tracking-tighter font-black leading-none">
                    {img.title}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Controls */}
          <button 
            onClick={handlePrev}
            className="absolute left-10 z-20 p-4 rounded-full bg-white shadow-xl text-[#1e0a3c] hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-10 z-20 p-4 rounded-full bg-white shadow-xl text-[#1e0a3c] hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Blogs Grid Section */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gray-100 rounded-[1.5rem] overflow-hidden mb-6 relative shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <div className="w-full h-full bg-[#1e0a3c]/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                   <div className="w-2/3 h-2/3 border-2 border-dashed border-[#1e0a3c]/20 rounded-2xl flex items-center justify-center text-[#1e0a3c]/20 font-bold uppercase tracking-widest text-xs">
                     {post.category} Image Placeholder
                   </div>
                </div>
                <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black tracking-widest text-[#1e0a3c]">
                  {post.category}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[11px] font-bold text-[#1e0a3c]/40 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                  <span className="w-1 h-1 bg-[#1e0a3c]/20 rounded-full" />
                  <span className="flex items-center gap-1.5"><Clock size={12} /> 5 min read</span>
                </div>

                <h3 className="text-2xl font-bold text-[#1e0a3c] leading-[1.2] tracking-tight group-hover:text-[#1e0a3c]/70 transition-colors">
                  {post.title}
                </h3>

                <p className="text-[15px] text-[#1e0a3c]/60 font-medium leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-[#1e0a3c]/5">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1e0a3c]/40 uppercase tracking-widest">
                        <MessageSquare size={12} /> {post.comments} COMMENTS
                      </div>
                   </div>
                   <div className="p-2 rounded-full hover:bg-[#1e0a3c]/5 transition-colors">
                      <Share2 size={16} className="text-[#1e0a3c]/40" />
                   </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}} />
    </div>
  );
};

export default Blogs;
