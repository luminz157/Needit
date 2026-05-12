import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Calendar, Clock } from 'lucide-react';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([
    {
      date: 'May 11, 2026',
      title: 'How Indian Startups Can Scale Globally in 2026',
      excerpt: 'India is rapidly becoming one of the world’s strongest startup ecosystems. From DeepTech and FinTech to AgriTech, BioTech, Climate Tech, and MedTech, Indian entrepreneurs are building innovative solutions that are attracting global attention.',
      category: 'STRATEGY',
      likes: 12,
      image: '/IMAGES/IMAGE_1.png',
      liked: false
    },
    {
      date: 'May 10, 2026',
      title: 'The New Generation of Indian Startups',
      excerpt: 'Today’s startups are solving real-world problems using technology, innovation, and scalable business models. Modern startups are built to grow quickly and enter multiple markets.',
      category: 'INNOVATION',
      likes: 8,
      image: '/IMAGES/IMAGE_2.png',
      liked: false
    },
    {
      date: 'May 09, 2026',
      title: 'Challenges Faced by Early-Stage Startups',
      excerpt: 'Even with strong ideas, many startups struggle because they lack access to the right resources and networks. Some common startup challenges include accessing investors and branding.',
      category: 'GROWTH',
      likes: 5,
      image: '/IMAGES/IMAGE_3.png',
      liked: false
    },
    {
      date: 'May 08, 2026',
      title: 'Why Investor Readiness Matters',
      excerpt: 'Investors evaluate product readiness, technology maturity, revenue potential, and team capability. Startups operating at TRL 6 and above often attract stronger investor interest.',
      category: 'FUNDING',
      likes: 15,
      image: '/IMAGES/IMAGE_4.png',
      liked: false
    },
    {
      date: 'May 07, 2026',
      title: 'The Importance of Branding and Digital Presence',
      excerpt: 'In today’s digital world, branding is no longer optional. A startup’s online presence directly affects how customers, investors, and partners perceive the business.',
      category: 'MARKETING',
      likes: 7,
      image: '/IMAGES/IMAGE_5.png',
      liked: false
    },
    {
      date: 'May 06, 2026',
      title: 'Global Expansion Opportunities for Indian Startups',
      excerpt: 'Indian startups are now expanding into Southeast Asia, Middle East, Europe, North America, and Africa. Global expansion creates opportunities for larger customer bases.',
      category: 'GLOBAL',
      likes: 21,
      image: '/IMAGES/IMAGE_6.png',
      liked: false
    },
    {
      date: 'May 05, 2026',
      title: 'How Distribution Networks Help Startups Grow',
      excerpt: 'Distribution plays a major role in startup scaling. Even innovative products struggle without proper market access. Strong distributor and channel partner networks help startups reach new markets.',
      category: 'DISTRIBUTION',
      likes: 9,
      image: '/IMAGES/IMAGE_7.png',
      liked: false
    },
    {
      date: 'May 04, 2026',
      title: 'Why Incubation and Ecosystem Support Matter',
      excerpt: 'Startup ecosystems provide mentorship, networking, strategic guidance, industry access, and collaboration opportunities. Incubation support helps founders avoid common mistakes.',
      category: 'ECOSYSTEM',
      likes: 11,
      image: '/IMAGES/IMAGE_8.png',
      liked: false
    },
    {
      date: 'May 03, 2026',
      title: 'The Future of Indian Startups',
      excerpt: 'India’s startup ecosystem is entering a transformational phase. The future belongs to startups that think globally, build scalable systems, and focus on innovation.',
      category: 'FUTURE',
      likes: 18,
      image: '/IMAGES/IMAGE_9.png',
      liked: false
    }
  ]);

  useEffect(() => {
    // Check localStorage for previously liked posts
    const likedPosts = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
    setBlogPosts(prev => prev.map(post => ({
      ...post,
      liked: likedPosts.includes(post.title)
    })));

    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 800);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleLike = (index) => {
    const post = blogPosts[index];
    if (post.liked) return; // Only allow one like per user

    const newLikedStatus = !post.liked;
    
    setBlogPosts(prev => {
      const newPosts = [...prev];
      newPosts[index] = { 
        ...newPosts[index], 
        likes: newPosts[index].likes + 1,
        liked: true 
      };
      
      // Persist to localStorage
      const likedTitles = newPosts.filter(p => p.liked).map(p => p.title);
      localStorage.setItem('likedBlogs', JSON.stringify(likedTitles));
      
      return newPosts;
    });
  };

  const handleShare = async (post, index) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#post-${index}`;
    const shareData = {
      title: post.title,
      text: `Check out this blog post: ${post.title}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " - " + shareUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 bg-transparent">
      {/* Blogs Grid Section */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {blogPosts.map((post, i) => (
            <motion.article
              id={`post-${i}`}
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gray-100 rounded-[1.5rem] overflow-hidden mb-6 relative shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
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
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(i);
                        }}
                        className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors group/like ${
                          post.liked ? 'text-red-500' : 'text-[#1e0a3c]/40 hover:text-red-500'
                        }`}
                      >
                        <Heart 
                          size={14} 
                          className={`transition-all ${
                            post.liked ? 'fill-red-500 text-red-500' : 'group-hover/like:fill-red-500 group-hover/like:text-red-500'
                          }`} 
                        /> 
                        {post.likes} {post.likes === 1 ? 'LIKE' : 'LIKES'}
                      </button>
                   </div>
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       handleShare(post, i);
                     }}
                     className="p-2 rounded-full hover:bg-[#1e0a3c]/5 transition-colors group/share"
                   >
                      <Share2 size={16} className="text-[#1e0a3c]/40 group-hover/share:text-[#1e0a3c]" />
                   </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;




