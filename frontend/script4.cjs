const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Pattern: <div className="... bg-indigo-50 ..."> \s* <IconName ... text-red-500 ... />
    // We want to replace bg-indigo-50 with bg-red-50
    
    // This regex looks for a div containing bg-indigo-50, followed by whitespace and an icon with a colored text class.
    content = content.replace(/(<div[^>]*className="[^"]*)bg-indigo-50([^"]*"[^>]*>\s*<[A-Z][A-Za-z0-9]+\s+[^>]*?className="[^"]*text-([a-z]+)-500)/g, '$1bg-$3-50$2');

    // Also let's fix any bg-indigo-50/50 in Services.jsx fees list
    content = content.replace(/(<div[^>]*className="[^"]*)bg-indigo-50\/50([^"]*"[^>]*>\s*<[A-Z][A-Za-z0-9]+\s+[^>]*?className="[^"]*text-([a-z]+)-500)/g, '$1bg-$3-50/50$2');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Synced wrapper backgrounds in:', filePath);
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
