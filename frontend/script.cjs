const fs = require('fs');
const path = require('path');

const colors = ['text-red-500', 'text-emerald-500', 'text-blue-500', 'text-pink-500', 'text-orange-500', 'text-teal-500', 'text-purple-500', 'text-cyan-500'];
let colorIndex = 0;

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            
            // Replace text-indigo-600 and text-violet-600 with colorful classes, but ONLY inside JSX tags that start with an uppercase letter (which are typically Lucide icons)
            content = content.replace(/(<[A-Z][A-Za-z0-9]+\s+[^>]*?className=(['"]))([^>]*?)(text-(?:indigo|violet)-(?:500|600))([^>]*?\2)/g, (match, p1, p2, p3, p4, p5) => {
                const newColor = colors[colorIndex % colors.length];
                colorIndex++;
                updated = true;
                return p1 + p3 + newColor + p5;
            });

            if (updated) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated icons in:', fullPath);
            }
        }
    }
}

walkDir('c:/Users/LENOVO -4HIN/OneDrive/Desktop/needit/Needit/frontend/src');
