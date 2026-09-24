const fs = require('fs');

const useTranslationsPath = 'src/hooks/useTranslations.ts';
let useTranslationsContent = fs.readFileSync(useTranslationsPath, 'utf8');

const newFieldsEN = `    writingIsleOfDogsTitle: "Thinking Translation: Isle of Dogs (2018)",
    writingIsleOfDogsDesc: "An academic essay discussing the portrayal of fictional translators, the translation process, and linguistic and cultural differences in Wes Anderson's animation, Isle of Dogs.",
    writingIsleOfDogsExcerptLabel: "EXCERPT: INTRODUCTION",
    writingIsleOfDogsExcerptText: "Wes Anderson’s animation Isle of Dogs (2018) tells the story of English-speaking dogs persecuted and deported to Trash Island by a dog-hating regime in the fictional Megasaki City in Japan. The original version of this film is created for an English-speaking audience, yet Anderson avoids adding English subtitles over the Japanese dialogue."`;

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

const newFieldsTM = `    { key: 'writingIsleOfDogsTitle', label: 'Writing: Isle of Dogs Title' },
    { key: 'writingIsleOfDogsDesc', label: 'Writing: Isle of Dogs Desc', isTextarea: true },
    { key: 'writingIsleOfDogsExcerptLabel', label: 'Writing: Isle of Dogs Excerpt Label' },
    { key: 'writingIsleOfDogsExcerptText', label: 'Writing: Isle of Dogs Excerpt Text', isTextarea: true }`;

tmContent = tmContent.replace(/(key: 'writingExcerptText', label: 'Writing: Excerpt Text', isTextarea: true\s*})/, `$1,\n${newFieldsTM}`);
fs.writeFileSync(tmPath, tmContent);

console.log("Translations updated");
