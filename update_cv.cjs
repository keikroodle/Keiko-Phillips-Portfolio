const fs = require('fs');

const useTranslationsPath = 'src/hooks/useTranslations.ts';
let useTranslationsContent = fs.readFileSync(useTranslationsPath, 'utf8');

const newFieldsEN = `    cvHeading: "Curriculum Vitae",
    cvEducation: "Education",
    cvExperience: "Experience",
    cvLeadership: "Leadership"`;

const injectFields = (content, lang) => {
  const parts = content.split('},');
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].includes(`${lang}: {`)) {
      parts[i] = parts[i].replace(/(writingExcerptText:\s*".*?")/g, `$1,\n${newFieldsEN}`);
    }
  }
  return parts.join('},');
};

useTranslationsContent = injectFields(useTranslationsContent, 'en');
useTranslationsContent = injectFields(useTranslationsContent, 'jp');
useTranslationsContent = injectFields(useTranslationsContent, 'de');
useTranslationsContent = injectFields(useTranslationsContent, 'ru');

fs.writeFileSync(useTranslationsPath, useTranslationsContent);

const tmPath = 'src/components/TranslationManager.tsx';
let tmContent = fs.readFileSync(tmPath, 'utf8');

const newFieldsTM = `    { key: 'cvHeading', label: 'CV: Heading' },
    { key: 'cvEducation', label: 'CV: Education' },
    { key: 'cvExperience', label: 'CV: Experience' },
    { key: 'cvLeadership', label: 'CV: Leadership' }`;

tmContent = tmContent.replace(/(key: 'writingExcerptText', label: 'Writing: Excerpt Text', isTextarea: true\s*})/, `$1,\n${newFieldsTM}`);
fs.writeFileSync(tmPath, tmContent);

const appPath = 'src/App.tsx';
let appContent = fs.readFileSync(appPath, 'utf8');

appContent = appContent.replace(
  '<h2 className="font-goodgirl text-6xl md:text-8xl z-10 relative text-white">Curriculum Vitae</h2>',
  '<h2 className="font-goodgirl text-6xl md:text-8xl z-10 relative text-white">{t.cvHeading}</h2>'
);
appContent = appContent.replace(
  '<span className="bg-zine-vermilion text-zine-bg border-[3px] border-transparent px-3 py-1 font-mono text-lg">01</span> Education</h3>',
  '<span className="bg-zine-vermilion text-zine-bg border-[3px] border-transparent px-3 py-1 font-mono text-lg">01</span> {t.cvEducation}</h3>'
);
appContent = appContent.replace(
  '<span className="bg-zine-acid text-zine-ink px-3 py-1 font-mono text-lg">02</span> Experience</h3>',
  '<span className="bg-zine-acid text-zine-ink px-3 py-1 font-mono text-lg">02</span> {t.cvExperience}</h3>'
);
appContent = appContent.replace(
  '<span className="bg-zine-ink text-zine-bg border-[3px] border-transparent px-2 py-1 font-mono text-sm">03</span> Leadership</h3>',
  '<span className="bg-zine-ink text-zine-bg border-[3px] border-transparent px-2 py-1 font-mono text-sm">03</span> {t.cvLeadership}</h3>'
);

fs.writeFileSync(appPath, appContent);

console.log("CV updated");
