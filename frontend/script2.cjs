const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Pattern for existing colored icons: className="... text-blue-500 ..."
    // E.g., <Cpu className="w-8 h-8 text-blue-500" />
    
    // Pattern 1: w-8 h-8 text-blue-500
    content = content.replace(/(w-[89]|w-10)\s+(h-[89]|h-10)\s+text-([a-z]+)-500/g, 'w-14 h-14 p-3.5 bg-$3-50 text-$3-500 rounded-full');
    
    // Pattern 2: text-blue-500 w-8 h-8
    content = content.replace(/text-([a-z]+)-500\s+(w-[89]|w-10)\s+(h-[89]|h-10)/g, 'w-14 h-14 p-3.5 bg-$1-50 text-$1-500 rounded-full');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Added background to icons in:', filePath);
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
