const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Convert most structural rose back to teal to balance the theme
    // We want teal as primary, rose as accent (buttons, icons)

    // Text colors:
    // Change standard text highlights to teal, except for specific buttons/accents if possible.
    content = content.replace(/\btext-rose-500\b/g, 'text-teal-500');
    content = content.replace(/\btext-rose-600\b/g, 'text-teal-600');
    content = content.replace(/\btext-rose-400\b/g, 'text-teal-400');
    content = content.replace(/\btext-rose-300\b/g, 'text-teal-300');

    // Backgrounds:
    // Soft backgrounds to teal
    content = content.replace(/\bbg-rose-50\b/g, 'bg-teal-50');
    content = content.replace(/\bbg-rose-100\b/g, 'bg-teal-100');
    
    // Borders:
    content = content.replace(/\bborder-rose-50\b/g, 'border-teal-50');
    content = content.replace(/\bborder-rose-100\b/g, 'border-teal-100');
    content = content.replace(/\bborder-rose-200\b/g, 'border-teal-200');
    content = content.replace(/\bborder-rose-300\b/g, 'border-teal-300');

    // Shadows:
    content = content.replace(/\bshadow-rose-100\b/g, 'shadow-teal-100');
    content = content.replace(/\bshadow-rose-200\b/g, 'shadow-teal-200');
    content = content.replace(/\bshadow-rose-400\b/g, 'shadow-teal-400');
    content = content.replace(/\bshadow-rose-500\b/g, 'shadow-teal-500');

    // Hovers:
    content = content.replace(/\bhover:text-rose-500\b/g, 'hover:text-teal-500');
    content = content.replace(/\bhover:bg-rose-50\b/g, 'hover:bg-teal-50');
    content = content.replace(/\bhover:border-rose-200\b/g, 'hover:border-teal-200');
    content = content.replace(/\bhover:shadow-rose-200\b/g, 'hover:shadow-teal-200');

    // Re-instate Rose for Buttons (gradient to right)
    // We want gradient buttons to be coral/rose
    content = content.replace(/\bfrom-teal-500 to-teal-600\b/g, 'from-rose-500 to-rose-600');
    
    // The previous script changed all 'from-violet' to 'from-rose'.
    // Let's change the general gradients to teal
    content = content.replace(/\bfrom-rose-500\b/g, 'from-teal-500');
    content = content.replace(/\bto-rose-600\b/g, 'to-teal-600');
    content = content.replace(/\bto-rose-700\b/g, 'to-teal-700');
    
    // Re-fix the buttons explicitly:
    content = content.replace(/bg-gradient-to-r from-teal-500 to-teal-600/g, 'bg-gradient-to-r from-rose-500 to-rose-600');
    content = content.replace(/bg-gradient-to-br from-teal-500 to-teal-600/g, 'bg-gradient-to-br from-teal-500 to-teal-600'); // keep this teal for cards

    // Fix RGBA hardcoded colors to Teal (20, 184, 166)
    content = content.replace(/rgba\(244, 63, 94, /g, 'rgba(20, 184, 166, ');

    // Specific Hex fixes for Landing Page Hero text gradient
    content = content.replace(/from-\[\#f43f5e\] via-\[\#fb7185\] to-\[\#ec4899\]/g, 'from-[#14b8a6] via-[#0d9488] to-[#f43f5e]');
    
    // Change some icons back to coral/rose so they pop against the teal
    content = content.replace(/bg-emerald-100 flex items-center justify-center text-emerald-600/g, 'bg-rose-50 flex items-center justify-center text-rose-500');
    
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
console.log('Teal integration complete!');
