const fs = require('fs');
const tmPath = 'src/components/TranslationManager.tsx';
let tmContent = fs.readFileSync(tmPath, 'utf8');

tmContent = tmContent.replace(/\{ key: 'cvLeadership', label: 'CV: Leadership' \}/g, "{ key: 'cvLeadership', label: 'CV: Leadership' },");

fs.writeFileSync(tmPath, tmContent);
