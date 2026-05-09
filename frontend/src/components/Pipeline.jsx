import React from 'react';
import { motion } from 'framer-motion';

const stages = [
  {
    tag: "Stage 1",
    title: "Startup Growth",
    desc: "Scale operationally and strategically within your home market.",
    items: ["Incubation & Mentorship", "Branding & Growth Marketing", "Operational Growth Strategy"]
  },
  {
    tag: "Stage 2",
    title: "Global Expansion",
    desc: "The core transition: moving from local growth to international scaling.",
    items: ["Export Facilitation & Compliance", "Market Access & Localization", "Manufacturing & Distribution Setup"],
    featured: true
  },
  {
    tag: "Stage 3",
    title: "Investment Readiness",
    desc: "Helping mature (TRL 6+) startups attract global capital.",
    items: ["VC Access & Investor Matching", "Pitch Preparation & Strategy", "Strategic Cross-border Partnerships"]
  }
];

const Pipeline = () => {
  return (
    <section id="pipeline">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Expansion Pipeline</span>
          <h2 className="section-title">Stage-Based Scaling System</h2>
          <p className="sec-sub">We don't just provide funding. We provide a structured pipeline from growth to global execution.</p>
        </div>

        <div className="card-grid">
          {stages.map((stage, idx) => (
            <motion.div 
              key={idx} 
              className="card"
              style={stage.featured ? { borderColor: 'var(--primary)', boxShadow: '0 20px 40px var(--primary-glow)' } : {}}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <span className="hero-tag" style={{ marginBottom: '12px' }}>{stage.tag}</span>
              <h3 className="card-title">{stage.title}</h3>
              <p className="text-muted">{stage.desc}</p>
              <ul className="card-list">
                {stage.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pipeline;
