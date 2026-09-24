const fs = require('fs');

const appPath = 'src/App.tsx';
let appContent = fs.readFileSync(appPath, 'utf8');

const oldEstela = `<div className="font-serif italic opacity-70">
                        <span className="font-mono not-italic text-xs uppercase block mb-2 tracking-widest opacity-80">Sample Itinerary</span>
                        "Day 1: Palma to Port d'Andratx. Departure at 0900. Navigational hazards noted near Illetas. Anchorage coordinates... recommended dining at local establishments for guests."
                      </div>`;
const newEstela = `<a href={t.writingEstelaLink || '#'} target="_blank" rel="noreferrer" className="inline-block border-[2px] border-zine-ink px-6 py-3 font-mono text-sm uppercase font-bold hover:bg-zine-ink hover:text-zine-bg transition-colors w-fit">
                        {t.writingReadMoreBtn || 'Read Full Piece ↗'}
                      </a>`;

const oldPutin = `<div className="font-serif italic opacity-70">
                        <span className="font-mono not-italic text-xs uppercase block mb-2 tracking-widest opacity-80">{t.writingExcerptLabel}</span>
                        "{t.writingExcerptText}"
                      </div>`;
const newPutin = `<a href={t.writingPutinLink || '#'} target="_blank" rel="noreferrer" className="inline-block border-[2px] border-zine-ink px-6 py-3 font-mono text-sm uppercase font-bold hover:bg-zine-ink hover:text-zine-bg transition-colors w-fit">
                        {t.writingReadMoreBtn || 'Read Full Piece ↗'}
                      </a>`;

const oldIsle = `<div className="font-serif italic opacity-70">
                        <span className="font-mono not-italic text-xs uppercase block mb-2 tracking-widest opacity-80">{t.writingIsleOfDogsExcerptLabel}</span>
                        "{t.writingIsleOfDogsExcerptText}"
                      </div>`;
const newIsle = `<a href={t.writingIsleOfDogsLink || '#'} target="_blank" rel="noreferrer" className="inline-block border-[2px] border-zine-ink px-6 py-3 font-mono text-sm uppercase font-bold hover:bg-zine-ink hover:text-zine-bg transition-colors w-fit">
                        {t.writingReadMoreBtn || 'Read Full Piece ↗'}
                      </a>`;

appContent = appContent.replace(oldEstela, newEstela);
appContent = appContent.replace(oldPutin, newPutin);
appContent = appContent.replace(oldIsle, newIsle);

fs.writeFileSync(appPath, appContent);
console.log("App.tsx updated");

// ==============================================
// Update useTranslations.ts
// ==============================================

const transPath = 'src/hooks/useTranslations.ts';
let transContent = fs.readFileSync(transPath, 'utf8');

const injectFields = (content, lang) => {
  const parts = content.split('},');
  const newFields = `    writingReadMoreBtn: "Read Full Piece ↗",
    writingEstelaLink: "#",
    writingPutinLink: "#",
    writingIsleOfDogsLink: "#"`;
  
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].includes(`${lang}: {`)) {
      // Find where writingIsleOfDogsExcerptText ends
      parts[i] = parts[i].replace(/(writingIsleOfDogsExcerptText:\s*".*?")/g, `$1,\n${newFields}`);
    }
  }
  return parts.join('},');
};

transContent = injectFields(transContent, 'en');
transContent = injectFields(transContent, 'jp');
transContent = injectFields(transContent, 'de');
transContent = injectFields(transContent, 'ru');

fs.writeFileSync(transPath, transContent);
console.log("useTranslations.ts updated");

// ==============================================
// Update TranslationManager.tsx
// ==============================================

const tmPath = 'src/components/TranslationManager.tsx';
let tmContent = fs.readFileSync(tmPath, 'utf8');

tmContent = tmContent.replace(/\{ key: 'writingExcerptLabel'.*\n/g, '');
tmContent = tmContent.replace(/\{ key: 'writingExcerptText'.*\n/g, '');
tmContent = tmContent.replace(/\{ key: 'writingIsleOfDogsExcerptLabel'.*\n/g, '');
tmContent = tmContent.replace(/\{ key: 'writingIsleOfDogsExcerptText'.*\n/g, '');

const newTMFields = `  { key: 'writingReadMoreBtn', label: 'Writing: Read More Button' },
  { key: 'writingEstelaLink', label: 'Writing: Estela URL' },
  { key: 'writingPutinLink', label: 'Writing: Putin URL' },
  { key: 'writingIsleOfDogsLink', label: 'Writing: Isle of Dogs URL' },`;

tmContent = tmContent.replace(/(];)/, `${newTMFields}\n$1`);
fs.writeFileSync(tmPath, tmContent);
console.log("TranslationManager.tsx updated");

