const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// Replace the writing grid
const startMarker = '<div className="grid grid-cols-1 lg:grid-cols-2 divide-y-[4px] lg:divide-y-0 lg:divide-x-[4px] divide-zine-ink flex-grow">';
const endMarker = '</div>\n                </div>\n              </div>\n            )}\n\n            {activePage === \'cv\' && (';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const originalBlock = content.substring(startIndex, endIndex + '</div>'.length);
  
  const newWritingBlock = `<div className="flex flex-col flex-grow divide-y-[4px] divide-zine-ink">
                  <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-[4px] lg:divide-y-0 lg:divide-x-[4px] divide-zine-ink">
                    <div className="p-4 md:p-6 lg:p-10 bg-zine-bg text-zine-ink">
                      <h3 className="font-goodgirl text-3xl md:text-4xl uppercase mb-4">{t.writingEstelaTitle}</h3>
                      <div className="font-mono text-sm font-bold bg-zine-ink text-zine-bg px-2 py-1 inline-block mb-6">JUNE 2026 / FREELANCE</div>
                      <p className="font-serif text-xl leading-snug text-zine-ink/90">
                        {t.writingEstelaDesc}
                      </p>
                      <div className="mt-8 p-6 bg-zine-bg text-zine-ink border-[2px] border-dashed border-zine-ink/30 relative">
                        <div className="absolute -top-3 -left-3 bg-zine-acid px-2 font-mono text-xs font-bold border-[2px] border-zine-ink">SAMPLE ITINERARY</div>
                        <p className="font-mono text-sm opacity-50 blur-[2px] select-none">
                          Day 1: Palma to Port d'Andratx. Departure at 0900. Navigational hazards noted near Illetas. Anchorage coordinates... [REDACTED COPY TEXT] ...recommended dining at local establishments for guests.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 lg:p-10 bg-zine-bg text-zine-ink">
                      <h3 className="font-goodgirl text-3xl md:text-4xl uppercase mb-4">{t.writingPutinTitle}</h3>
                      <div className="font-mono text-sm font-bold bg-zine-vermilion text-zine-bg px-2 py-1 inline-block mb-6">POLITICAL SATIRE</div>
                      <p className="font-serif text-xl leading-snug text-zine-ink/90 mb-6">
                        {t.writingPutinDesc}
                      </p>
                      
                      <div className="mt-8 border-l-[4px] border-zine-vermilion pl-6">
                        <h4 className="font-mono font-bold text-sm text-zine-rule mb-4 tracking-widest">{t.writingExcerptLabel}</h4>
                        <p className="font-serif italic text-lg opacity-80 leading-relaxed">
                          {t.writingExcerptText}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 lg:p-10 bg-zine-bg text-zine-ink">
                    <h3 className="font-goodgirl text-3xl md:text-4xl uppercase mb-4">{t.writingIsleOfDogsTitle}</h3>
                    <div className="font-mono text-sm font-bold bg-zine-acid text-zine-ink px-2 py-1 inline-block mb-6">ACADEMIC ESSAY</div>
                    <p className="font-serif text-xl leading-snug text-zine-ink/90 mb-6">
                      {t.writingIsleOfDogsDesc}
                    </p>
                    
                    <div className="mt-8 border-l-[4px] border-zine-acid pl-6">
                      <h4 className="font-mono font-bold text-sm text-zine-rule mb-4 tracking-widest">{t.writingIsleOfDogsExcerptLabel}</h4>
                      <p className="font-serif italic text-lg opacity-80 leading-relaxed">
                        {t.writingIsleOfDogsExcerptText}
                      </p>
                    </div>
                  </div>
                </div>`;
                
  content = content.replace(originalBlock, newWritingBlock);
  fs.writeFileSync(appPath, content);
  console.log("App.tsx fixed");
} else {
  console.log("Could not find markers.");
}
