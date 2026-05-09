import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero">
      <div className="container hero-grid">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="hero-tag">Structured Global Scaling</span>
          <h1 className="hero-title">Spot The <span>Move</span> Before The Market Reacts</h1>
          <p className="hero-desc">
            needitstartup is a Global Startup Expansion & Market Access Platform. We bridge the gap between local ambition and international execution.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn btn-primary">Start Expansion</a>
            <a href="#about" className="btn btn-outline">Learn More</a>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div style={{
            backgroundColor: 'var(--primary)',
            width: '100%',
            aspectRatio: '1',
            borderRadius: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '100px',
            fontWeight: '800',
            boxShadow: '0 40px 80px rgba(79, 70, 229, 0.15)'
          }}>
            NS
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
