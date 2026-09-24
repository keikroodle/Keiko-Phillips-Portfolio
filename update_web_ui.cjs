const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

const originalWebBlock = `<div className="p-4 md:p-6 lg:p-10 flex-grow">
                  <div className="max-w-3xl">
                    <h3 className="font-goodgirl text-4xl md:text-5xl uppercase mb-4">{t.webLifeTitle}</h3>
                    <p className="font-serif text-2xl md:text-3xl leading-snug mb-8 text-zine-ink/90">
                      {t.webLifeDesc1}
                    </p>
                    <p className="font-serif text-xl md:text-2xl leading-snug mb-8">
                      {t.webLifeDesc2}
                    </p>
                    
                    <a href="https://keikophillips.github.io/lifeinthekitchen/index" target="_blank" rel="noreferrer" className="inline-block bg-zine-vermilion text-zine-bg font-mono font-bold px-6 py-4 uppercase tracking-widest transition-transform hover:-translate-y-1 border-[3px] border-transparent hover:border-zine-ink mb-10">
                      {t.webViewLive}
                    </a>
                  </div>

                  <img src="/lifeinthekitchen.png" alt="Life in the Kitchen screenshot" className="w-full border-[4px] border-zine-ink object-cover" />
                </div>`;

const newWebBlock = `<div className="flex flex-col flex-grow bg-zine-bg text-zine-ink">
                  <div className="p-4 md:p-6 lg:p-10 border-b-[4px] border-zine-ink">
                    <div className="max-w-3xl">
                      <h3 className="font-goodgirl text-4xl md:text-5xl uppercase mb-4">{t.webLifeTitle}</h3>
                      <p className="font-serif text-2xl md:text-3xl leading-snug mb-8 text-zine-ink/90">
                        {t.webLifeDesc1}
                      </p>
                      <p className="font-serif text-xl md:text-2xl leading-snug mb-8">
                        {t.webLifeDesc2}
                      </p>
                      
                      <a href="https://keikophillips.github.io/lifeinthekitchen/index" target="_blank" rel="noreferrer" className="inline-block bg-zine-vermilion text-zine-bg font-mono font-bold px-6 py-4 uppercase tracking-widest transition-transform hover:-translate-y-1 border-[3px] border-transparent hover:border-zine-ink">
                        {t.webViewLive}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex w-full">
                    <img src="/lifeinthekitchen.png" alt="Life in the Kitchen screenshot" className="w-full object-cover object-top border-none" />
                  </div>
                </div>`;

content = content.replace(originalWebBlock, newWebBlock);
fs.writeFileSync(appPath, content);
console.log("Updated web section layout.");
