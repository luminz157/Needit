const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Change rounded-full to rounded-2xl (rounded square) for icon wrappers
    // This targets wrappers like: w-14 h-14 p-3.5 bg-blue-50 text-blue-500 rounded-full
    content = content.replace(/(w-\d+\s+h-\d+\s+p-\d+(?:\.\d+)?\s+bg-[a-z]+-50\s+text-[a-z]+-500\s+)rounded-full/g, '$1rounded-2xl');
    
    // Target wrappers like: w-14 h-14 rounded-full flex items-center...
    content = content.replace(/(w-\d+\s+h-\d+\s+)rounded-full(\s+flex\s+items-center\s+justify-center)/g, '$1rounded-2xl$2');

    // Target any remaining rounded-full that immediately precede or follow a bg-{color}-50 for icons
    content = content.replace(/rounded-full(\s+bg-[a-z]+-50\b)/g, 'rounded-2xl$1');
    content = content.replace(/(bg-[a-z]+-50\s+)rounded-full/g, '$1rounded-2xl');

    // Make the icon backgrounds more solid by changing -50 to -100 and text to -600 for contrast
    // ONLY for the icon colors (blue, emerald, pink, orange, purple, teal, cyan, red)
    const colors = ['blue', 'emerald', 'pink', 'orange', 'purple', 'teal', 'cyan', 'red'];
    colors.forEach(c => {
        // bg-color-50 -> bg-color-100
        content = content.replace(new RegExp(`bg-${c}-50(?![0-9])`, 'g'), `bg-${c}-100`);
        // text-color-500 -> text-color-600
        content = content.replace(new RegExp(`text-${c}-500(?![0-9])`, 'g'), `text-${c}-600`);
    });

    // 2. Change Animations to Gorgeous Purple
    if (filePath.endsWith('LandingPage.jsx')) {
        // Change MouseBackground gradient
        content = content.replace(
            /bg-gradient-to-tr from-emerald-500\/10 via-blue-500\/10 to-red-500\/10/g,
            'bg-gradient-to-tr from-[#a855f7]/20 via-[#c084fc]/15 to-[#d946ef]/20'
        );
        // Change MainBackground faint grid if any dark blue remains
        // Actually grid is currently rgba(0,0,0,0.5), which is fine, but let's make it a very subtle purple if needed.
        content = content.replace(
            /linear-gradient\(rgba\(0, 0, 0, 0.5\) 1px/g,
            'linear-gradient(rgba(168, 85, 247, 0.15) 1px'
        );
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated shapes and solid backgrounds in:', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            processFile(fullPath);
        }
    }
}

walkDir('c:/Users/LENOVO -4HIN/OneDrive/Desktop/needit/Needit/frontend/src');
