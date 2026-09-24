import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from './hooks/useTranslations';
import TranslationManager from './components/TranslationManager';

const Barcode = () => (
  <div className="flex h-10 md:h-12 items-end gap-[2px] opacity-90 mix-blend-multiply">
    {[2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 1, 3, 2, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1].map((w, i) => (
      <div key={i} className="bg-zine-ink h-full" style={{ width: `${w * 1.5}px` }} />
    ))}
  </div>
);

const ImagePlaceholder = ({ 
  aspectClass = "aspect-[4/5]", 
  aspectLabel = "ASPECT 4:5",
  dimensionsLabel = "1080×1350",
  text = "DROP ILLUSTRATION / SCAN HERE",
  className = "",
  imageSrc = ""
}) => (
  <div className={`image-frame relative overflow-hidden bg-zine-bg group flex items-center justify-center ${aspectClass} ${className}`}>
    <div className="absolute top-2 left-2 text-sm md:text-base font-mono text-zine-ink leading-none z-30">┌</div>
    <div className="absolute top-2 right-2 text-sm md:text-base font-mono text-zine-ink leading-none z-30">┐</div>
    <div className="absolute bottom-2 left-2 text-sm md:text-base font-mono text-zine-ink leading-none z-30">└</div>
    <div className="absolute bottom-2 right-2 text-sm md:text-base font-mono text-zine-ink leading-none z-30">┘</div>
    
    {imageSrc ? (
      <img src={imageSrc} alt={text} className="absolute inset-0 w-full h-full object-cover z-20" />
    ) : (
      <>
        <div className="placeholder-graphic relative z-10 flex flex-col items-center justify-center gap-3 text-center p-4">
          <span className="dim-tag text-xs md:text-sm font-mono text-zine-ink/60 font-bold bg-zine-bg px-2">
            [{aspectLabel} // {dimensionsLabel}]
          </span>
          <span className="placeholder-text bg-zine-ink text-zine-acid px-3 py-1 font-mono font-bold text-xs md:text-sm tracking-wider transform -rotate-2 group-hover:rotate-0 transition-transform">
            + {text} +
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <div className="text-[15rem] md:text-[25rem] font-mono leading-none text-zine-ink">+</div>
        </div>
      </>
    )}
  </div>
);

const VideoThumbnail = ({ src, alt, href, className = "w-full" }) => (
  <a href={href} target="_blank" rel="noreferrer" className={`relative group block cursor-pointer ${className}`}>
    <img src={src} alt={alt} className="w-full h-auto group-hover:opacity-80 transition-opacity" />
    <div className="absolute bottom-4 left-4 pointer-events-none">
      <div className="text-white group-hover:scale-110 transition-transform duration-200 ">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4l15 8-15 8V4z" />
        </svg>
      </div>
    </div>
  </a>
);

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isPointer = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer') !== null;
      
      if (clickable !== isPointer) {
        isPointer = clickable;
        if (cursorRef.current) {
          const img = cursorRef.current.querySelector('img');
          if (img) {
            if (clickable) {
              img.style.transform = 'translate(-50%, -50%) scale(1.2) rotate(10deg)';
            } else {
              img.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
            }
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ transform: `translate3d(-100px, -100px, 0)`, willChange: 'transform' }}
    >
      <img 
        src="/snail%20cursor.png" 
        alt="" 
        className="w-16 md:w-20 h-auto grayscale contrast-[1.2] transition-transform duration-150 ease-out"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

export default function App() {
  const [activeLang, setActiveLang] = useState<'EN' | 'JP' | 'DE' | 'RU'>('EN');
  const [activePage, setActivePage] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  const { translations, loading } = useTranslations();
  const currentLangKey = activeLang.toLowerCase() as 'en' | 'jp' | 'de' | 'ru';
  const t = translations[currentLangKey] || translations['en'];
  const bio1 = t.bio1 || '';
  const bio2 = t.bio2 || '';
  const navHome = t.navHome || '';
  const navGraphics = t.navGraphics || '';
  const navWeb = t.navWeb || '';
  const navFilm = t.navFilm || '';
  const navWriting = t.navWriting || '';
  const navCV = t.navCV || '';
  const navSnailMail = t.navSnailMail || '';
  const headingSnailMail = t.headingSnailMail || '';
  const bodySnailMail = t.bodySnailMail || '';

  return (
    <div 
      className="min-h-screen text-zine-ink font-syne selection:bg-zine-acid selection:text-zine-ink overflow-x-hidden relative"
      style={{ 
        backgroundImage: activePage === 'film' ? 'none' : 'url("/snail-bg.png")', 
        backgroundSize: '800px', 
        backgroundRepeat: 'repeat', 
        backgroundPosition: 'center' 
      }}
    >
      <CustomCursor />
      {activePage === 'film' && (
        <video 
          ref={(el) => { if (el) el.playbackRate = 0.4; }}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none" 
          src="/moving snails.webm" 
        />
      )}
      {/* Outer wrapper */}
      <div className="relative w-full max-w-[1600px] mx-auto min-h-screen pb-[100px] lg:pb-[140px]">
        
        {/* Top Masthead */}
        <header className="flex flex-col justify-center items-center p-4 md:p-6 gap-6 relative min-h-[150px] lg:min-h-[250px]">
          {/* Magazine Title Block */}
          <div className="text-center w-full z-10 cursor-pointer" onClick={() => setActivePage('home')}>
            <h1 className="font-goodgirl text-[16vw] lg:text-[8vw] leading-[0.85] tracking-tight uppercase hover:text-zine-vermilion transition-colors pb-2">
              Keiko Phillips
            </h1>
          </div>
          
          {/* Language Selector */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 font-serif text-sm md:text-base tracking-wider mt-2 md:mt-4 z-20 relative w-full max-w-4xl">
            <button 
              onClick={() => setActiveLang('EN')}
              className={`px-4 py-2 md:px-8 md:py-3 min-w-[120px] text-center transition-all ${activeLang === 'EN' ? 'bg-zine-bg text-zine-ink font-extrabold' : 'bg-zine-ink text-zine-bg hover:bg-zinc-800'}`}>
              ENGLISH
            </button>
            <button 
              onClick={() => setActiveLang('JP')}
              className={`px-4 py-2 md:px-8 md:py-3 min-w-[120px] text-center transition-all ${activeLang === 'JP' ? 'bg-zine-bg text-zine-ink font-extrabold' : 'bg-zine-ink text-zine-bg hover:bg-zinc-800'}`}>
              日本語
            </button>
            <button 
              onClick={() => setActiveLang('DE')}
              className={`px-4 py-2 md:px-8 md:py-3 min-w-[120px] text-center transition-all ${activeLang === 'DE' ? 'bg-zine-bg text-zine-ink font-extrabold' : 'bg-zine-ink text-zine-bg hover:bg-zinc-800'}`}>
              DEUTSCH
            </button>
            <button 
              onClick={() => setActiveLang('RU')}
              className={`px-4 py-2 md:px-8 md:py-3 min-w-[120px] text-center transition-all ${activeLang === 'RU' ? 'bg-zine-bg text-zine-ink font-extrabold' : 'bg-zine-ink text-zine-bg hover:bg-zinc-800'}`}>
              РУССКИЙ
            </button>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 relative min-h-[80vh]">
          
          {/* Left Column / Sidebar (Feature Index) */}
          <aside className="lg:col-span-4 flex flex-col">
            <div className="pr-4 md:pr-6 pb-4 md:pb-6 flex-grow">
              <ul className="space-y-6 md:space-y-8 font-syne font-bold text-3xl md:text-4xl xl:text-5xl uppercase leading-none flex flex-col items-start relative z-50">
                <li className={`flex items-start group cursor-pointer ${activePage === 'home' ? 'text-zine-vermilion' : 'text-zine-ink'}`} onClick={() => setActivePage('home')}>
                  <span className="px-2 py-1 group-hover:line-through decoration-zine-vermilion decoration-[6px] md:decoration-[8px] transition-all box-decoration-clone">{navHome}</span>
                </li>
                <li className={`flex items-start group cursor-pointer ${activePage === 'graphics' ? 'text-zine-vermilion' : 'text-zine-ink'}`} onClick={() => setActivePage('graphics')}>
                  <span className="px-2 py-1 group-hover:line-through decoration-zine-vermilion decoration-[6px] md:decoration-[8px] transition-all box-decoration-clone">{navGraphics}</span>
                </li>
                <li className={`flex items-start group cursor-pointer ${activePage === 'web' ? 'text-zine-vermilion' : 'text-zine-ink'}`} onClick={() => setActivePage('web')}>
                  <span className="px-2 py-1 group-hover:line-through decoration-zine-vermilion decoration-[6px] md:decoration-[8px] transition-all box-decoration-clone">{navWeb}</span>
                </li>
                <li className={`flex items-start group cursor-pointer ${activePage === 'film' ? 'text-zine-vermilion' : 'text-zine-ink'}`} onClick={() => setActivePage('film')}>
                  <span className="px-2 py-1 group-hover:line-through decoration-zine-vermilion decoration-[6px] md:decoration-[8px] transition-all box-decoration-clone">{navFilm}</span>
                </li>
                <li className={`flex items-start group cursor-pointer ${activePage === 'writing' ? 'text-zine-vermilion' : 'text-zine-ink'}`} onClick={() => setActivePage('writing')}>
                  <span className="px-2 py-1 group-hover:line-through decoration-zine-vermilion decoration-[6px] md:decoration-[8px] transition-all box-decoration-clone">{navWriting}</span>
                </li>
                <li className={`flex items-start group cursor-pointer ${activePage === 'cv' ? 'text-zine-vermilion' : 'text-zine-ink'}`} onClick={() => setActivePage('cv')}>
                  <span className="px-2 py-1 group-hover:line-through decoration-zine-vermilion decoration-[6px] md:decoration-[8px] transition-all box-decoration-clone">{navCV}</span>
                </li>
                <li className={`flex items-start group cursor-pointer ${isContactOpen ? 'text-zine-vermilion' : 'text-zine-ink'}`} onClick={() => setIsContactOpen(true)}>
                  <span className="px-2 py-1 group-hover:line-through decoration-zine-vermilion decoration-[6px] md:decoration-[8px] transition-all box-decoration-clone">{navSnailMail}</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Center Column / Main Gallery */}
          <section className={`lg:col-span-8 flex flex-col relative min-h-[80vh] ${activePage === 'home' ? 'text-zine-ink' : (activePage === 'writing' || activePage === 'cv') ? 'bg-white text-black' : 'bg-zine-ink text-zine-bg'}`}>
            {activePage === 'home' && (
              <div className="flex flex-col h-full w-full relative z-10 flex-grow">
                <div className="flex-grow p-6 md:p-12 lg:p-20 flex flex-col justify-center">
                  <div className="max-w-4xl w-full relative z-10">
                    <img src="/author%20portrait.jpg" alt="Keiko Phillips" className="w-48 md:w-64 h-auto grayscale contrast-[1.2] -rotate-3 hover:-rotate-1 transition-transform mb-8 md:mb-12 relative z-20" />
                    <img src="/statue%20mnj.png" alt="Statue" className="absolute -top-48 md:-top-80 lg:-top-[350px] xl:-top-[450px] right-[-20px] lg:right-[-100px] w-56 md:w-80 lg:w-[450px] xl:w-[600px] h-auto rotate-6 hover:rotate-2 transition-transform z-0 pointer-events-none" />
                    <div className="font-serif text-xl md:text-3xl space-y-6 md:space-y-8">
                      <p className="relative z-10 leading-[1.8em]">
                        <span className="absolute inset-y-0 left-[-16px] md:left-[-32px] w-[100vw] -z-10"
                              style={{
                                backgroundImage: 'linear-gradient(to bottom, transparent 12%, var(--color-zine-ink) 12%, var(--color-zine-ink) 88%, transparent 88%)',
                                backgroundSize: '100% 1.8em',
                                backgroundRepeat: 'repeat-y',
                                backgroundPosition: 'top'
                              }}></span>
                        <span className="text-zine-acid px-2 relative z-10">{bio1}</span>
                      </p>
                      <p className="relative z-10 leading-[1.8em]">
                        <span className="absolute inset-y-0 left-[-16px] md:left-[-32px] w-[100vw] -z-10"
                              style={{
                                backgroundImage: 'linear-gradient(to bottom, transparent 12%, var(--color-zine-ink) 12%, var(--color-zine-ink) 88%, transparent 88%)',
                                backgroundSize: '100% 1.8em',
                                backgroundRepeat: 'repeat-y',
                                backgroundPosition: 'top'
                              }}></span>
                        <span className="text-zine-acid px-2 relative z-10">{bio2}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'graphics' && (
              <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b-[4px] border-zine-ink p-4 md:p-6 lg:p-10 bg-zine-ink text-zine-bg relative overflow-hidden">
                  <h2 className="font-goodgirl text-6xl md:text-8xl z-10 relative text-white">{t.navGraphics}</h2>
                  
                </div>
                
                <div className="p-4 md:p-6 lg:p-10 border-b-[4px] border-zine-ink">
                  <div className="flex flex-col gap-6">
                    <div className="w-full font-serif text-xl md:text-2xl leading-snug max-w-4xl">
                      <div className="mb-4">
                        <h3 className="font-goodgirl text-4xl mb-4 uppercase text-zine-vermilion">{t.graphicsEdiJazzTitle}</h3>
                        <p>{t.graphicsEdiJazzDesc}</p>
                      </div>
                      <p>
                        {t.graphicsEdiJazzSub}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-12 mt-8 items-center w-full">
                      <img src="/insta post 1.png" alt="EdiJazzSoc Instagram Post 1" className="w-full max-w-2xl h-auto" />
                      <img src="/insta post 2.png" alt="EdiJazzSoc Instagram Post 2" className="w-full max-w-2xl h-auto" />
                      <img src="/insta post 3.png" alt="EdiJazzSoc Instagram Post 3" className="w-full max-w-2xl h-auto" />
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6 lg:p-10 bg-zine-ink">
                  <h3 className="font-goodgirl text-4xl mb-6 uppercase">{t.graphicsEventPostersTitle}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <img src="/new steps.png" alt="New Steps Session Poster" className="w-full h-auto" />
                    <img src="/mnj.png" alt="Monday Night Jazz Poster" className="w-full h-auto" />
                    <img src="/jazz bar.png" alt="Jazz Bar Jam Poster" className="w-full h-auto" />
                    <img src="/brass monkey.png" alt="Brass Monkey Social Poster" className="w-full h-auto" />
                  </div>
                  
                  <div className="mt-10 border-t-[3px] border-zine-ink pt-6">
                    <h3 className="font-goodgirl text-4xl mb-4 uppercase">{t.graphicsBilingualTitle}</h3>
                    <p className="font-serif text-xl mb-6">{t.graphicsBilingualDesc}</p>
                    <img src="/phillips times.jpg" alt="The Phillips Times" className="w-full max-w-2xl h-auto" />
                  </div>
                </div>
              </div>
            )}

            {activePage === 'web' && (
              <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                <div className="border-b-[4px] border-zine-ink p-4 md:p-6 lg:p-10 bg-zine-ink text-zine-bg relative overflow-hidden">
                  <h2 className="font-goodgirl text-6xl md:text-8xl z-10 relative text-white">{t.navWeb}</h2>
                  
                </div>
                
                <div className="flex flex-col flex-grow bg-zine-bg text-zine-ink">
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
                </div>
              </div>
            )}

            {activePage === 'film' && (
              <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                <div className="border-b-[4px] border-zine-ink p-4 md:p-6 lg:p-10 bg-zine-ink text-zine-bg relative overflow-hidden z-10">
                  <h2 className="font-goodgirl text-6xl md:text-8xl z-10 relative text-white">{t.navFilm}</h2>
                  
                </div>
                
                <div className="grid grid-cols-1 divide-y-[4px] divide-zine-ink relative z-10">
                  <div className="p-4 md:p-6 lg:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-zine-ink text-zine-acid font-mono font-bold px-2 py-1 text-xs">GRADE: 85</div>
                      <h3 className="font-goodgirl text-3xl md:text-5xl uppercase ">{t.filmStalinTitle}</h3>
                    </div>
                    <p className="font-serif text-xl md:text-2xl max-w-3xl mb-6 font-bold ">
                      {t.filmStalinDesc}
                    </p>
                    <VideoThumbnail href="https://drive.google.com/file/d/1FA8a854smRx0HdttsKyB0STaabJscK5r/view?usp=drive_link" src="/stalin.png" alt="Culture and Power under Stalin video essay still" className="w-full md:w-3/4" />
                  </div>

                  <div className="p-4 md:p-6 lg:p-10">
                    <h3 className="font-goodgirl text-3xl md:text-5xl uppercase mb-4 ">{t.filmHorrorTitle}</h3>
                    <p className="font-serif text-xl md:text-2xl max-w-3xl mb-6 font-bold ">
                      {t.filmHorrorDesc}
                    </p>
                    <VideoThumbnail href="https://youtu.be/iaJ2HIOF8Jg?si=yvkP1LS8nK_p5ap9" src="/horror film still.png" alt="Horror short film still" />
                  </div>

                  <div className="p-4 md:p-6 lg:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-zine-ink text-zine-bg font-mono font-bold px-2 py-1 text-xs">ACTING / PRODUCTION</div>
                      <h3 className="font-goodgirl text-3xl md:text-5xl uppercase ">{t.filmTakeMeTitle}</h3>
                    </div>
                    <p className="font-serif text-xl md:text-2xl max-w-3xl mb-6 font-bold ">
                      {t.filmTakeMeDesc}
                    </p>
                    <VideoThumbnail href="https://youtu.be/6OZKfxOHH8s?si=zlavpCGZ6KC5RfsT" src="/take me as you please.png" alt="Take me as you please film still" />
                  </div>

                  <div className="p-4 md:p-6 lg:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-zine-ink text-zine-bg font-mono font-bold px-2 py-1 text-xs">COSTUME ASSISTANT</div>
                      <h3 className="font-goodgirl text-3xl md:text-5xl uppercase ">{t.filmForgoTitle}</h3>
                    </div>
                    <p className="font-serif text-xl md:text-2xl max-w-3xl mb-6 font-bold ">
                      {t.filmForgoDesc}
                    </p>
                    <VideoThumbnail href="https://youtu.be/ytLc0Ao_O7Q?si=j8MBcAeL7ni1rzmF" src="/forgo still.png" alt="Forgo film still" />
                  </div>

                  <div className="p-4 md:p-6 lg:p-10">
                    <h3 className="font-goodgirl text-3xl md:text-5xl uppercase mb-4 ">{t.filmSuffolkTitle}</h3>
                    <p className="font-serif text-xl md:text-2xl max-w-3xl mb-6 font-bold ">
                      {t.filmSuffolkDesc}
                    </p>
                    <VideoThumbnail href="https://youtu.be/aY8UZU0QDX0?si=loCIYOzeaKtreeOE" src="/horsey island.png" alt="Suffolk documentary still" />
                  </div>
                </div>
              </div>
            )}

            {activePage === 'writing' && (
              <div 
                className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 h-full relative bg-white text-black"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, transparent 31px, #d8e5f5 31px, #d8e5f5 32px)',
                  backgroundSize: '100% 32px',
                  backgroundAttachment: 'local',
                }}
              >
                {/* Continuous vertical red margin line */}
                <div 
                  className="absolute top-0 bottom-0 w-[2px] bg-red-400 pointer-events-none z-10 left-7 sm:left-14 md:left-20"
                  aria-hidden="true"
                />

                <div className="p-4 sm:p-6 md:p-10 pl-10 sm:pl-20 md:pl-28 lg:pl-32 bg-transparent text-black relative">
                  <h2 className="font-goodgirl text-6xl md:text-8xl z-10 relative text-black">{t.navWriting}</h2>
                </div>
                
                <div className="flex flex-col flex-grow relative bg-transparent text-black divide-y-0">

                  {/* Estela Superyacht */}
                  <div className="p-4 sm:p-6 md:p-10 pl-10 sm:pl-20 md:pl-28 lg:pl-32 flex flex-col bg-transparent text-black">
                    <div className="max-w-4xl mb-4">
                      <h3 className="font-goodgirl text-3xl md:text-5xl uppercase leading-tight mb-2 break-words text-black">{t.writingEstelaTitle}</h3>
                      <p className="font-mono text-xs md:text-sm uppercase text-black/60 tracking-wider">June 2026 / Freelance</p>
                    </div>
                    <div className="max-w-3xl">
                      <p className="font-serif text-xl leading-relaxed mb-6 text-black">
                        {t.writingEstelaDesc}
                      </p>
                      <a href={(t.writingEstelaLink && t.writingEstelaLink !== '#' && t.writingEstelaLink !== 'https://www.yumpu.com/en/document/read/71276771/the-y-yachting-itineraries-2026-27/279') ? t.writingEstelaLink : 'https://www.yumpu.com/en/document/read/71276771/the-y-yachting-itineraries-2026-27/281'} target="_blank" rel="noreferrer" className="font-serif font-bold text-lg md:text-xl underline underline-offset-4 decoration-2 hover:text-zine-vermilion hover:decoration-zine-vermilion transition-colors inline-block w-fit text-black">
                        {(t.writingReadMoreBtn || 'Read Full Piece').replace(/\s*↗/, '')}
                      </a>
                    </div>
                  </div>

                  {/* Putin */}
                  <div className="p-4 sm:p-6 md:p-10 pl-10 sm:pl-20 md:pl-28 lg:pl-32 flex flex-col bg-transparent text-black">
                    <div className="max-w-4xl mb-4">
                      <h3 className="font-goodgirl text-3xl md:text-5xl uppercase leading-tight mb-2 break-words text-black">{t.writingPutinTitle}</h3>
                      <p className="font-mono text-xs md:text-sm uppercase text-black/60 tracking-wider">Political Satire</p>
                    </div>
                    <div className="max-w-3xl">
                      <p className="font-serif text-xl leading-relaxed mb-6 text-black">
                        {t.writingPutinDesc}
                      </p>
                      <a href={(t.writingPutinLink && t.writingPutinLink !== '#') ? t.writingPutinLink : '/Vladimir%20Putin%20gets%20a%20Sex%20Swing.pdf'} target="_blank" rel="noreferrer" className="font-serif font-bold text-lg md:text-xl underline underline-offset-4 decoration-2 hover:text-zine-vermilion hover:decoration-zine-vermilion transition-colors inline-block w-fit text-black">
                        {(t.writingReadMoreBtn || 'Read Full Piece').replace(/\s*↗/, '')}
                      </a>
                    </div>
                  </div>

                  {/* Isle of Dogs */}
                  <div className="p-4 sm:p-6 md:p-10 pl-10 sm:pl-20 md:pl-28 lg:pl-32 flex flex-col bg-transparent text-black">
                    <div className="max-w-4xl mb-4">
                      <h3 className="font-goodgirl text-3xl md:text-5xl uppercase leading-tight mb-2 break-words text-black">{t.writingIsleOfDogsTitle}</h3>
                      <p className="font-mono text-xs md:text-sm uppercase text-black/60 tracking-wider">Academic Essay</p>
                    </div>
                    <div className="max-w-3xl">
                      <p className="font-serif text-xl leading-relaxed mb-6 text-black">
                        {t.writingIsleOfDogsDesc}
                      </p>
                      <a href={(t.writingIsleOfDogsLink && t.writingIsleOfDogsLink !== '#') ? t.writingIsleOfDogsLink : '/Thinking%20Translation%20Essay.pdf'} target="_blank" rel="noreferrer" className="font-serif font-bold text-lg md:text-xl underline underline-offset-4 decoration-2 hover:text-zine-vermilion hover:decoration-zine-vermilion transition-colors inline-block w-fit text-black">
                        {(t.writingReadMoreBtn || 'Read Full Piece').replace(/\s*↗/, '')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'cv' && (
              <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white text-black">
                <div className="border-b-[4px] border-black p-4 md:p-6 lg:p-10 bg-white text-black relative overflow-hidden">
                  <h2 className="font-goodgirl text-6xl md:text-8xl z-10 relative text-black">{t.cvHeading}</h2>
                </div>
                
                <div className="grid grid-cols-1 divide-y-[4px] divide-black flex-grow bg-white text-black">
                  {/* Education */}
                  <div className="p-4 md:p-6 lg:p-10 bg-white text-black">
                    <h3 className="font-goodgirl text-4xl uppercase mb-8 flex items-center gap-4 text-black">
                      <span className="border-[2px] border-black text-black px-3 py-1 font-mono text-lg">01</span> {t.cvEducation}
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                          <h4 className="font-syne font-bold text-2xl uppercase text-black">University of Edinburgh</h4>
                          <span className="font-mono text-sm border border-black text-black px-2 py-1 mt-2 sm:mt-0 inline-block">Edinburgh, UK • July 2026</span>
                        </div>
                        <p className="font-serif text-xl italic mb-2 text-black">{t.cvDegree}</p>
                        <ul className="list-disc list-outside font-serif text-lg ml-6 marker:text-black space-y-1 text-black">
                          <li>{t.cvUniBullet1}</li>
                          <li>{t.cvUniBullet2}</li>
                          <li>{t.cvUniBullet3}</li>
                        </ul>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-[2px] border-black p-4 bg-white text-black flex flex-col justify-between">
                          <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-1 text-black">{t.cvStudyAbroad}</h4>
                            <p className="font-serif text-lg mb-2 text-black">{t.cvStudyAbroadBerlin}</p>
                            <span className="font-mono text-xs font-bold uppercase tracking-wider block mb-4 text-black/70">Berlin, Germany</span>
                          </div>
                          <span className="font-mono text-xs border border-black px-2 py-0.5 inline-block w-max text-black">Oct 2024 - Feb 2025</span>
                        </div>
                        <div className="border-[2px] border-black p-4 bg-white text-black flex flex-col justify-between">
                          <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-1 text-black">{t.cvStudyAbroad}</h4>
                            <p className="font-serif text-lg mb-2 text-black">{t.cvStudyAbroadBishkek}</p>
                            <span className="font-mono text-xs font-bold uppercase tracking-wider block mb-4 text-black/70">Bishkek, Kyrgyzstan</span>
                          </div>
                          <span className="font-mono text-xs border border-black px-2 py-0.5 inline-block w-max text-black">Mar 2025 - Jul 2025</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                          <h4 className="font-syne font-bold text-2xl uppercase text-black">Mill Hill County High School</h4>
                          <span className="font-mono text-sm border border-black text-black px-2 py-1 mt-2 sm:mt-0 inline-block">London, UK • June 2022</span>
                        </div>
                        <p className="font-serif text-lg mt-2 text-black">{t.cvHighSchoolALevels}</p>
                        <p className="font-serif text-lg mt-1 text-black">{t.cvHighSchoolGCSEs}</p>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="p-4 md:p-6 lg:p-10 bg-white text-black">
                    <h3 className="font-goodgirl text-4xl uppercase mb-8 flex items-center gap-4 text-black">
                      <span className="border-[2px] border-black text-black px-3 py-1 font-mono text-lg">02</span> {t.cvExperience}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <div>
                        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-baseline mb-2 border-b-[2px] border-black pb-2">
                          <h4 className="font-syne font-bold text-xl uppercase text-black">Estela Superyacht Agency</h4>
                          <span className="font-mono text-xs font-bold tracking-widest text-black/70 mt-1 xl:mt-0">MAY-JUNE 2026 • REMOTE</span>
                        </div>
                        <p className="font-serif text-lg italic mb-3 text-black">{t.cvJobEstelaRole}</p>
                        <ul className="list-disc list-outside font-serif text-base ml-5 space-y-1 marker:text-black text-black">
                          <li>{t.cvJobEstelaB1}</li>
                          <li>{t.cvJobEstelaB2}</li>
                          <li>{t.cvJobEstelaB3}</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-baseline mb-2 border-b-[2px] border-black pb-2">
                          <h4 className="font-syne font-bold text-xl uppercase text-black">Harajuku Kitchen</h4>
                          <span className="font-mono text-xs font-bold tracking-widest text-black/70 mt-1 xl:mt-0">SEP 2023 - JUL 2026 • EDINBURGH</span>
                        </div>
                        <p className="font-serif text-lg italic mb-3 text-black">{t.cvJobHarajukuRole}</p>
                        <ul className="list-disc list-outside font-serif text-base ml-5 space-y-1 marker:text-black text-black">
                          <li>{t.cvJobHarajukuB1}</li>
                          <li>{t.cvJobHarajukuB2}</li>
                          <li>{t.cvJobHarajukuB3}</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-baseline mb-2 border-b-[2px] border-black pb-2">
                          <h4 className="font-syne font-bold text-xl uppercase text-black">The Griffin</h4>
                          <span className="font-mono text-xs font-bold tracking-widest text-black/70 mt-1 xl:mt-0">JUN-AUG 2024 • LONDON</span>
                        </div>
                        <p className="font-serif text-lg italic mb-3 text-black">{t.cvJobGriffinRole}</p>
                        <ul className="list-disc list-outside font-serif text-base ml-5 space-y-1 marker:text-black text-black">
                          <li>{t.cvJobGriffinB1}</li>
                          <li>{t.cvJobGriffinB2}</li>
                          <li>{t.cvJobGriffinB3}</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-baseline mb-2 border-b-[2px] border-black pb-2">
                          <h4 className="font-syne font-bold text-xl uppercase text-black">Assembly Festival</h4>
                          <span className="font-mono text-xs font-bold tracking-widest text-black/70 mt-1 xl:mt-0">JUL-AUG 2023 • EDINBURGH</span>
                        </div>
                        <p className="font-serif text-lg italic mb-3 text-black">{t.cvJobAssemblyRole}</p>
                        <ul className="list-disc list-outside font-serif text-base ml-5 space-y-1 marker:text-black text-black">
                          <li>{t.cvJobAssemblyB1}</li>
                          <li>{t.cvJobAssemblyB2}</li>
                          <li>{t.cvJobAssemblyB3}</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-baseline mb-2 border-b-[2px] border-black pb-2">
                          <h4 className="font-syne font-bold text-xl uppercase text-black">Melody Box</h4>
                          <span className="font-mono text-xs font-bold tracking-widest text-black/70 mt-1 xl:mt-0">MAY-JUN 2023 • NAGASAKI, JP</span>
                        </div>
                        <p className="font-serif text-lg italic mb-3 text-black">{t.cvJobMelodyRole}</p>
                        <ul className="list-disc list-outside font-serif text-base ml-5 space-y-1 marker:text-black text-black">
                          <li>{t.cvJobMelodyB1}</li>
                          <li>{t.cvJobMelodyB2}</li>
                          <li>{t.cvJobMelodyB3}</li>
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-baseline mb-2 border-b-[2px] border-black pb-2">
                            <h4 className="font-syne font-bold text-xl uppercase text-black">Fun Scientists</h4>
                            <span className="font-mono text-xs font-bold tracking-widest text-black/70 mt-1 xl:mt-0">NOV 2022 - APR 2023</span>
                          </div>
                          <p className="font-serif text-lg italic mb-1 text-black">{t.cvJobFunRole}</p>
                        </div>
                        <div>
                          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-baseline mb-2 border-b-[2px] border-black pb-2">
                            <h4 className="font-syne font-bold text-xl uppercase text-black">Totteridge Tennis Club</h4>
                            <span className="font-mono text-xs font-bold tracking-widest text-black/70 mt-1 xl:mt-0">AUG 2021 - APR 2022</span>
                          </div>
                          <p className="font-serif text-lg italic mb-1 text-black">{t.cvJobTennisRole}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Skills & Leadership */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y-[4px] md:divide-y-0 md:divide-x-[4px] divide-black bg-white text-black">
                    <div className="p-4 md:p-6 lg:p-10 bg-white text-black">
                      <h3 className="font-goodgirl text-3xl uppercase mb-6 flex items-center gap-3 text-black">
                        <span className="border-[2px] border-black text-black px-2 py-1 font-mono text-sm">03</span> {t.cvLeadership}
                      </h3>
                      
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-syne font-bold text-xl uppercase mb-1 text-black">{t.cvGoetheTitle}</h4>
                          <div className="flex justify-between items-baseline mb-3">
                            <p className="font-serif text-lg italic text-black">{t.cvGoetheRole}</p>
                            <span className="font-mono text-xs font-bold tracking-widest border border-black px-1 ml-2 text-black">OCT 2021</span>
                          </div>
                          <ul className="list-disc list-outside font-serif text-base ml-5 space-y-1 marker:text-black text-black">
                            <li>{t.cvGoetheB1}</li>
                            <li>{t.cvGoetheB2}</li>
                            <li>{t.cvGoetheB3}</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-syne font-bold text-xl uppercase mb-1 text-black">{t.cvJazzTitle}</h4>
                          <div className="flex justify-between items-baseline mb-3">
                            <p className="font-serif text-lg italic text-black">{t.cvJazzRole}</p>
                            <span className="font-mono text-xs font-bold tracking-widest border border-black px-1 ml-2 text-black">2023-2026</span>
                          </div>
                          <ul className="list-disc list-outside font-serif text-base ml-5 space-y-1 marker:text-black text-black">
                            <li>{t.cvJazzB1}</li>
                            <li>{t.cvJazzB2}</li>
                            <li>{t.cvJazzB3}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-6 lg:p-10 bg-white text-black">
                      <h3 className="font-goodgirl text-3xl uppercase mb-6 flex items-center gap-3 text-black">
                        <span className="border-[2px] border-black text-black px-2 py-1 font-mono text-sm">04</span> {t.cvSkills}
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-mono text-sm font-bold tracking-widest border-b-[2px] border-black mb-3 pb-1 uppercase text-black">{t.cvSkillsLanguages}</h4>
                          <div className="font-serif text-lg text-black space-y-1">
                            <div>{t.cvSkillsLanguagesJa}</div>
                            <div>{t.cvSkillsLanguagesDe}</div>
                            <div>{t.cvSkillsLanguagesRu}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-mono text-sm font-bold tracking-widest border-b-[2px] border-black mb-3 pb-1 uppercase text-black">{t.cvSkillsTechnical}</h4>
                          <p className="font-serif text-lg text-black">
                            {t.cvSkillsTechnicalDesc}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-mono text-sm font-bold tracking-widest border-b-[2px] border-black mb-3 pb-1 uppercase text-black">{t.cvSkillsInterests}</h4>
                          <p className="font-serif text-lg text-black mb-2">
                            {t.cvSkillsInterestsCoach}
                          </p>
                          <p className="font-serif text-lg text-black">
                            {t.cvSkillsInterestsHobbies}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

                          </section>
        </main>

        {/* Footer / Pull-up Contact Menu */}
        <AnimatePresence>
          <motion.footer 
            layout
            className="fixed bottom-0 left-0 right-0 border-t-[4px] lg:border-t-[8px] border-zine-ink flex flex-col bg-zine-ink text-zine-bg z-[100] max-h-screen"
          >
            {/* Tab with arrow */}
            <div 
              className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 bg-zine-ink text-zine-acid px-3 md:px-4 py-1 border-t-[3px] lg:border-t-[4px] border-l-[3px] lg:border-l-[4px] border-r-[3px] lg:border-r-[4px] border-zine-ink cursor-pointer hover:text-zine-vermilion transition-colors z-[101] flex items-center justify-center"
              onClick={() => setIsContactOpen(!isContactOpen)}
            >
              <motion.span 
                animate={{ rotate: isContactOpen ? 180 : 0 }} 
                className="inline-block font-mono text-lg md:text-xl"
              >
                ↑
              </motion.span>
            </div>

            {/* Top Bar (always visible) */}
            <div 
              className="flex justify-center items-center py-2 md:py-3 px-4 relative overflow-hidden cursor-pointer flex-shrink-0 group"
              onClick={() => setIsContactOpen(!isContactOpen)}
            >
              <h2 className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-white group-hover:text-zine-vermilion transition-colors m-0 leading-none">
                {headingSnailMail}
              </h2>
            </div>

            {/* Expanded Snail Mail Section */}
            <AnimatePresence>
              {isContactOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-y-auto"
                >
                  <div className="p-4 md:p-6 lg:p-10 flex items-center justify-center bg-zine-ink pb-24 md:pb-32 relative overflow-hidden">
                    {/* Animated Snails */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <motion.img 
                        src="/snail%20cursor.png" 
                        className="absolute top-10 md:top-20 w-32 md:w-48 opacity-20 invert"
                        animate={{ x: ['-200px', '100vw'] }}
                        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                      />
                      <motion.img 
                        src="/snail%20cursor.png" 
                        className="absolute bottom-12 md:bottom-24 w-24 md:w-32 opacity-20 invert"
                        animate={{ x: ['100vw', '-200px'] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        style={{ scaleX: -1 }} 
                      />
                      <motion.img 
                        src="/snail%20cursor.png" 
                        className="absolute top-1/2 w-40 md:w-56 opacity-10 invert"
                        animate={{ x: ['-300px', '100vw'] }}
                        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                      />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center min-h-[40vh] w-full max-w-4xl px-4 text-center">
                      <a href="mailto:keikojphillips@outlook.com" className="font-serif italic text-3xl md:text-5xl lg:text-7xl text-zine-bg hover:text-zine-vermilion transition-colors mb-8">
                        keikojphillips@outlook.com
                      </a>
                      <p className="font-mono text-xs md:text-sm text-zine-bg/70 max-w-xl leading-relaxed lowercase mb-8 whitespace-pre-wrap">
                        {bodySnailMail}
                      </p>
                      <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-cms', { detail: { page: isContactOpen ? 'snail' : activePage } }))}
                        className="font-mono text-xs hover:text-zine-vermilion transition-colors uppercase tracking-widest cursor-pointer"
                        style={{ color: '#0d0d0d' }}
                      >
                        [Admin]
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.footer>
        </AnimatePresence>
      </div>
      <TranslationManager />
    </div>
  );
}
