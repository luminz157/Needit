const fs = require('fs');

const file = 'c:/Users/LENOVO -4HIN/OneDrive/Desktop/needit/Needit/frontend/src/pages/Partnership.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. FeatureCard Component
content = content.replace(
  /const FeatureCard = \(\{ icon: Icon, title, description, delay = 0 \}\) => \(/g,
  `const FeatureCard = ({ icon: Icon, title, description, delay = 0, colorClass = "bg-blue-50 text-blue-500" }) => (`
);
content = content.replace(
  /<div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 shadow-sm">/g,
  `<div className={\`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-sm \${colorClass}\`}>`
);

// Add colorClass to FeatureCard instances
content = content.replace(/icon=\{Users\}/, `icon={Users} colorClass="bg-blue-50 text-blue-500"`);
content = content.replace(/icon=\{Zap\}/, `icon={Zap} colorClass="bg-emerald-50 text-emerald-500"`);
content = content.replace(/icon=\{Globe\}/, `icon={Globe} colorClass="bg-pink-50 text-pink-500"`);
content = content.replace(/icon=\{Network\}/, `icon={Network} colorClass="bg-orange-50 text-orange-500"`);

// 2. "Our Global Footprint" section (remove solid purple, make white, add color classes)
content = content.replace(
  /className="bg-gradient-to-br from-violet-600 to-indigo-600 p-8 rounded-\[2rem\] shadow-2xl shadow-indigo-600\/20 border border-white\/10 text-center group hover:scale-105 transition-all duration-500"/g,
  `className="bg-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100/40 border border-indigo-50 text-center group hover:scale-105 transition-all duration-500"`
);
content = content.replace(
  /<div className="w-16 h-16 rounded-2xl bg-white\/15 flex items-center justify-center text-white shadow-inner">/g,
  `<div className={\`w-16 h-16 rounded-full flex items-center justify-center shadow-inner \${stat.colorClass}\`}>`
);
content = content.replace(
  /\{ icon: Users, label: 'Ecosystem', value: 'Global' \},/g,
  `{ icon: Users, label: 'Ecosystem', value: 'Global', colorClass: "bg-blue-50 text-blue-500" },`
);
content = content.replace(
  /\{ icon: Share2, label: 'Partners', value: '50\+' \},/g,
  `{ icon: Share2, label: 'Partners', value: '50+', colorClass: "bg-emerald-50 text-emerald-500" },`
);
content = content.replace(
  /\{ icon: Lightbulb, label: 'Innovation', value: 'High-Impact' \},/g,
  `{ icon: Lightbulb, label: 'Innovation', value: 'High-Impact', colorClass: "bg-orange-50 text-orange-500" },`
);
content = content.replace(
  /\{ icon: Target, label: 'Focus', value: 'Growth' \}/g,
  `{ icon: Target, label: 'Focus', value: 'Growth', colorClass: "bg-purple-50 text-purple-500" }`
);
// Fix text colors in "Our Global Footprint" since card is now white
content = content.replace(
  /<h4 className="text-\[40px\] font-black text-white mb-2 leading-none tracking-tight">/g,
  `<h4 className="text-[40px] font-black text-black mb-2 leading-none tracking-tight">`
);
content = content.replace(
  /<p className="text-white\/80 font-bold uppercase tracking-widest text-\[12px\]">/g,
  `<p className="text-black font-bold uppercase tracking-widest text-[12px]">`
);

// 3. Collaboration Models
content = content.replace(
  /\{ title: "Corporate Partnerships", desc: "Co-create solutions", icon: Briefcase \},/g,
  `{ title: "Corporate Partnerships", desc: "Co-create solutions", icon: Briefcase, colorClass: "bg-blue-50 text-blue-500" },`
);
content = content.replace(
  /\{ title: "Academic Integrations", desc: "Research \+ Development", icon: BookOpen \},/g,
  `{ title: "Academic Integrations", desc: "Research + Development", icon: BookOpen, colorClass: "bg-emerald-50 text-emerald-500" },`
);
content = content.replace(
  /\{ title: "Investor Networks", desc: "Venture \+ Growth Capital", icon: TrendingUp \}/g,
  `{ title: "Investor Networks", desc: "Venture + Growth Capital", icon: TrendingUp, colorClass: "bg-pink-50 text-pink-500" }`
);
content = content.replace(
  /<div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-500 mb-6 mt-2">/g,
  `<div className={\`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 mb-6 mt-2 \${model.colorClass}\`}>`
);

// 4. Why Ecosystems Choose Us
content = content.replace(
  /\{ title: "Incubation Centers", sub: "Startup Support", icon: Layers \},/g,
  `{ title: "Incubation Centers", sub: "Startup Support", icon: Layers, colorClass: "bg-blue-50 text-blue-500" },`
);
content = content.replace(
  /\{ title: "Startup Accelerators", sub: "Growth Programs", icon: Rocket \},/g,
  `{ title: "Startup Accelerators", sub: "Growth Programs", icon: Rocket, colorClass: "bg-emerald-50 text-emerald-500" },`
);
content = content.replace(
  /\{ title: "University Innovation", sub: "Academic Synergy", icon: Lightbulb \},/g,
  `{ title: "University Innovation", sub: "Academic Synergy", icon: Lightbulb, colorClass: "bg-orange-50 text-orange-500" },`
);
content = content.replace(
  /\{ title: "Research & Parks", sub: "Tech Innovation", icon: Globe \},/g,
  `{ title: "Research & Parks", sub: "Tech Innovation", icon: Globe, colorClass: "bg-purple-50 text-purple-500" },`
);
content = content.replace(
  /\{ title: "Government Missions", sub: "Strategic Impact", icon: Target \},/g,
  `{ title: "Government Missions", sub: "Strategic Impact", icon: Target, colorClass: "bg-teal-50 text-teal-500" },`
);
content = content.replace(
  /\{ title: "Innovation Hubs", sub: "Ecosystem Access", icon: Network \}/g,
  `{ title: "Innovation Hubs", sub: "Ecosystem Access", icon: Network, colorClass: "bg-pink-50 text-pink-500" }`
);
content = content.replace(
  /<div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">/g,
  `<div className={\`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 \${entity.colorClass}\`}>`
);

// 5. Success Stories (if applicable)
content = content.replace(
  /<div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">/g,
  `<div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">`
); // First one
content = content.replace(
  /<div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">/g,
  `<div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">`
); // Second one (replace only replaces first match each time)

fs.writeFileSync(file, content, 'utf8');
console.log('Updated Partnership.jsx with circular colored icons and white cards');
