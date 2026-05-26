const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // === TAILWIND CLASS REPLACEMENTS ===
    
    // Primary accent: violet/indigo/purple → rose (coral)
    content = content.replace(/\bfrom-violet-600\b/g, 'from-rose-500');
    content = content.replace(/\bto-indigo-600\b/g, 'to-rose-600');
    content = content.replace(/\bfrom-violet-700\b/g, 'from-rose-600');
    content = content.replace(/\bto-indigo-700\b/g, 'to-rose-700');
    content = content.replace(/\bbg-violet-600\b/g, 'bg-rose-500');
    content = content.replace(/\bbg-indigo-600\b/g, 'bg-rose-500');
    content = content.replace(/\bbg-violet-500\b/g, 'bg-rose-400');
    content = content.replace(/\bbg-indigo-500\b/g, 'bg-rose-400');
    
    // Text colors
    content = content.replace(/\btext-violet-600\b/g, 'text-rose-500');
    content = content.replace(/\btext-indigo-600\b/g, 'text-rose-500');
    content = content.replace(/\btext-violet-500\b/g, 'text-rose-400');
    content = content.replace(/\btext-indigo-500\b/g, 'text-rose-400');
    content = content.replace(/\btext-indigo-300\b/g, 'text-rose-300');
    content = content.replace(/\btext-indigo-400\b/g, 'text-rose-400');
    
    // Borders
    content = content.replace(/\bborder-indigo-700\b/g, 'border-rose-300');
    content = content.replace(/\bborder-indigo-800\b/g, 'border-rose-400');
    content = content.replace(/\bborder-indigo-100\b/g, 'border-rose-100');
    content = content.replace(/\bborder-indigo-200\b/g, 'border-rose-200');
    content = content.replace(/\bborder-indigo-50\b/g, 'border-rose-50');
    content = content.replace(/\bborder-violet-200\b/g, 'border-rose-200');
    content = content.replace(/\bborder-violet-100\b/g, 'border-rose-100');
    
    // Backgrounds
    content = content.replace(/\bbg-indigo-50\b/g, 'bg-rose-50');
    content = content.replace(/\bbg-indigo-100\b/g, 'bg-rose-100');
    content = content.replace(/\bbg-violet-50\b/g, 'bg-rose-50');
    content = content.replace(/\bbg-violet-100\b/g, 'bg-rose-100');
    
    // Shadows
    content = content.replace(/\bshadow-indigo-100\b/g, 'shadow-rose-100');
    content = content.replace(/\bshadow-indigo-200\b/g, 'shadow-rose-200');
    content = content.replace(/\bshadow-indigo-500\b/g, 'shadow-rose-400');
    content = content.replace(/\bshadow-indigo-600\b/g, 'shadow-rose-500');
    content = content.replace(/\bshadow-violet-200\b/g, 'shadow-rose-200');
    content = content.replace(/\bshadow-violet-500\b/g, 'shadow-rose-400');
    
    // Hover states
    content = content.replace(/\bhover:text-indigo-600\b/g, 'hover:text-rose-500');
    content = content.replace(/\bhover:bg-indigo-50\b/g, 'hover:bg-rose-50');
    content = content.replace(/\bhover:border-indigo-200\b/g, 'hover:border-rose-200');
    content = content.replace(/\bhover:shadow-indigo-200\b/g, 'hover:shadow-rose-200');
    
    // Ring / focus
    content = content.replace(/\bring-indigo-500\b/g, 'ring-rose-400');
    
    // Gradient from/to with opacity
    content = content.replace(/from-violet-600\/\d+/g, 'from-rose-500/20');
    content = content.replace(/to-indigo-600\/\d+/g, 'to-rose-600/20');
    
    // Selection highlight in App.jsx
    content = content.replace(/selection:bg-indigo-600/g, 'selection:bg-rose-500');
    
    // Some specific icon bg replacements for variety (teal as secondary)
    // Keep the diverse icon colors but swap purple-related ones to teal
    content = content.replace(/\bbg-purple-100\b/g, 'bg-teal-100');
    content = content.replace(/\btext-purple-600\b/g, 'text-teal-600');
    content = content.replace(/\bbg-purple-50\b/g, 'bg-teal-50');
    content = content.replace(/\btext-purple-500\b/g, 'text-teal-500');
    
    // Gradient badge pills
    content = content.replace(/\bfrom-violet-500\b/g, 'from-rose-400');
    content = content.replace(/\bto-indigo-500\b/g, 'to-rose-500');
    
    // Specific hex replacements
    content = content.replace(/#a855f7/g, '#f43f5e');  // violet-500 → rose-500
    content = content.replace(/#8b5cf6/g, '#fb7185');  // violet-500 → rose-400
    content = content.replace(/#7c3aed/g, '#e11d48');  // violet-600 → rose-600
    content = content.replace(/#6366f1/g, '#f43f5e');  // indigo-500 → rose-500
    content = content.replace(/#d946ef/g, '#14b8a6');  // fuchsia → teal accent for graph line
    content = content.replace(/#c084fc/g, '#fb7185');  // purple-300 → rose-400
    
    // Fix any remaining indigo/violet references in gradient/bg contexts
    content = content.replace(/\bbg-gradient-to-br from-violet-600 to-indigo-600\b/g, 'bg-gradient-to-br from-rose-500 to-rose-600');
    content = content.replace(/\bfrom-indigo-600\b/g, 'from-rose-500');
    content = content.replace(/\bto-violet-600\b/g, 'to-rose-600');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated theme in:', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
            processFile(fullPath);
        }
    }
}

walkDir('c:/Users/LENOVO -4HIN/OneDrive/Desktop/needit/Needit/frontend/src');
console.log('Theme conversion complete!');
