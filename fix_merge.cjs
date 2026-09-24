const fs = require('fs');

const path = 'src/hooks/useTranslations.ts';
let content = fs.readFileSync(path, 'utf8');

const replacement = `      (docSnap) => {
        if (docSnap.exists()) {
          const dbData = docSnap.data();
          const merged = { ...DEFAULT_TRANSLATIONS };
          
          // Deep merge for each language to ensure new keys in DEFAULT_TRANSLATIONS
          // aren't wiped out by an older database document
          for (const lang of Object.keys(DEFAULT_TRANSLATIONS)) {
            merged[lang] = {
              ...DEFAULT_TRANSLATIONS[lang],
              ...(dbData[lang] || {})
            };
          }
          
          setTranslations(merged);
        } else {`;

content = content.replace(
  `      (docSnap) => {
        if (docSnap.exists()) {
          setTranslations(docSnap.data() as Translations);
        } else {`,
  replacement
);

fs.writeFileSync(path, content);
console.log("Merge logic updated");
