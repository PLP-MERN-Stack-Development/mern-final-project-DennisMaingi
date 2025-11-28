import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src'); // adjust if your code is in another folder

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match local imports without .js extension
  const importRegex = /import\s+([^\n]+)\s+from\s+['"](\..+?)['"];?/g;

  content = content.replace(importRegex, (match, p1, p2) => {
    // Ignore if it already ends with .js
    if (p2.endsWith('.js')) return match;
    return `import ${p1} from '${p2}.js';`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed imports in ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      fixImportsInFile(fullPath);
    }
  }
}

walkDir(SRC_DIR);
console.log('🎉 All local imports fixed!');
