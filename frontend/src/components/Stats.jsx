import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { num: "25+", label: "Global Markets" },
  { num: "500+", label: "Startups Scaled" },
  { num: "$250M+", label: "Capital Facilitated" },
  { num: "92%", label: "Success Rate" }
];

const Stats = () => {
  return (
    <div className="container">
      <motion.div 
        className="stats-bar"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {stats.map((item, index) => (
          <div key={index} className="stat-item">
            <span className="stat-num">{item.num}</span>
            <span className="stat-label">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stats;
