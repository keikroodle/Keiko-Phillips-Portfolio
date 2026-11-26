import React, { useState, useEffect, useCallback, useRef } from 'react';
import { publicUrl, ResponsiveImage } from './Media';

interface GraphicsTranslations {
  navGraphics: string;
  graphicsEdiJazzTitle: string;
  graphicsEdiJazzDesc: string;
  graphicsEdiJazzSub: string;
  graphicsEventPostersTitle: string;
  graphicsBilingualTitle: string;
  graphicsBilingualDesc: string;
}

interface ArtworkItem {
  id: string;
  src: string;
  webpSrc: string;
  fallbackSrc?: string;
  alt: string;
  series: string;
}

const ARTWORKS: ArtworkItem[] = [
  {
    id: 'realbook-1',
    src: '/realbook 1 of 2 .png',
    webpSrc: '/realbook_1.webp',
    fallbackSrc: '/realbook 1 of 2.png',
    alt: 'The 2023-24 JazzSoc Committee (Part One)',
    series: 'EdiJazzSoc · Real Book'
  },
  {
    id: 'realbook-2',
    src: '/realbook 2 of 2.png',
    webpSrc: '/realbook_2.webp',
    fallbackSrc: '/realbook 2 of 2 .png',
    alt: 'Publicity Officer Keiko Phillips Feature',
    series: 'EdiJazzSoc · Real Book'
  },
  {
    id: 'insta-3',
    src: '/insta post 3.png',
    webpSrc: '/insta_post_3.webp',
    alt: 'EdiJazzSoc Semester 1 Week 5 Cat Band',
    series: 'EdiJazzSoc · Instagram'
  },
  {
    id: 'insta-1',
    src: '/insta post 1.png',
    webpSrc: '/insta_post_1.webp',
    alt: "Lil' Big Band Live in Concert",
    series: 'EdiJazzSoc · Instagram'
  },
  {
    id: 'insta-2',
    src: '/insta post 2.png',
    webpSrc: '/insta_post_2.webp',
    alt: 'Semester 1 Week 8 Events',
    series: 'EdiJazzSoc · Instagram'
  },
  {
    id: 'poster-new-steps',
    src: '/new steps.png',
    webpSrc: '/new_steps.webp',
    alt: 'New Steps Session Poster',
    series: 'Event Poster'
  },
  {
    id: 'poster-mnj',
    src: '/mnj.png',
    webpSrc: '/mnj.webp',
    alt: 'Monday Night Jazz Poster',
    series: 'Event Poster'
  },
  {
    id: 'poster-jazz-bar',
    src: '/jazz bar.png',
    webpSrc: '/jazz_bar.webp',
    alt: 'Jazz Bar Jam Poster',
    series: 'Event Poster'
  },
  {
    id: 'poster-brass-monkey',
    src: '/brass monkey.png',
    webpSrc: '/brass_monkey.webp',
    alt: 'Brass Monkey Social Poster',
    series: 'Event Poster'
  },
  {
    id: 'phillips-times',
    src: '/phillips times.jpg',
    webpSrc: '/phillips_times.webp',
    alt: 'The Phillips Times',
    series: 'Bilingual Print'
  }
];

interface ArtworkFrameProps {
  item: ArtworkItem;
  onOpen: (index: number) => void;
  index: number;
  priority?: boolean;
  darkSurface?: boolean;
  className?: string;
}

const ArtworkFrame = ({
  item,
  onOpen,
  index,
  priority = false,
  darkSurface = false,
  className = ''
}: ArtworkFrameProps) => {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`View ${item.alt}`}
      className={`group block w-full text-left relative overflow-hidden focus-visible:outline-2 focus-visible:outline-zine-vermilion focus-visible:outline-offset-2 ${className}`}
    >
      {!failed ? (
        <picture className="block w-full">
          <source srcSet={publicUrl(item.webpSrc)} type="image/webp" />
          <img
            src={publicUrl(item.src)}
            alt={item.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const img = e.currentTarget;
              if (item.fallbackSrc && img.dataset.retried !== 'true') {
                img.dataset.retried = 'true';
                img.src = publicUrl(item.fallbackSrc);
              } else {
                setFailed(true);
              }
            }}
            className="w-full h-auto block transition-transform duration-200 ease-out group-hover:scale-[1.015]"
          />
        </picture>
      ) : (
        <div
          className={`w-full aspect-[4/5] p-6 flex flex-col justify-between ${
            darkSurface ? 'bg-zinc-900 text-zine-bg' : 'bg-zine-rule/40 text-zine-ink'
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-zine-vermilion">
            {item.series}
          </span>
          <span className="font-syne font-bold text-lg uppercase leading-snug">
            {item.alt}
          </span>
        </div>
      )}
    </button>
  );
};

export default function GraphicsSection({ t }: { t: GraphicsTranslations }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const spread1Ref = useRef<HTMLDivElement>(null);
  const spread2Ref = useRef<HTMLDivElement>(null);
  const spread3Ref = useRef<HTMLDivElement>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + ARTWORKS.length) % ARTWORKS.length));
  }, []);
  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % ARTWORKS.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const scrollToSpread = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeArtwork = lightboxIndex !== null ? ARTWORKS[lightboxIndex] : null;

  return (
    <div className="flex flex-col bg-zine-bg text-zine-ink">
      {/* Bauhaus Zine Masthead */}
      <div className="px-4 py-6 md:px-8 md:py-10 lg:px-10 border-b border-zine-ink">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-goodgirl text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] text-zine-ink [text-wrap:balance]">
            {t.navGraphics}
          </h2>

          {/* Pure Geometric Bauhaus Cluster + Functional Index Jump */}
          <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
            <nav aria-label="Graphics sections" className="flex items-center gap-1 font-mono text-xs tabular-nums">
              <button
                type="button"
                onClick={() => scrollToSpread(spread1Ref)}
                className="min-h-[44px] px-3 py-2 text-zine-ink hover:text-zine-vermilion transition-colors uppercase font-bold whitespace-nowrap"
              >
                01
              </button>
              <span className="text-zine-ink/30" aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => scrollToSpread(spread2Ref)}
                className="min-h-[44px] px-3 py-2 text-zine-ink hover:text-zine-vermilion transition-colors uppercase font-bold whitespace-nowrap"
              >
                02
              </button>
              <span className="text-zine-ink/30" aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => scrollToSpread(spread3Ref)}
                className="min-h-[44px] px-3 py-2 text-zine-ink hover:text-zine-vermilion transition-colors uppercase font-bold whitespace-nowrap"
              >
                03
              </button>
            </nav>

            <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
              <span className="block w-8 h-8 md:w-10 md:h-10 rounded-full bg-zine-vermilion" />
              <span className="block w-8 h-8 md:w-10 md:h-10 bg-zine-ink" />
            </div>
          </div>
        </div>
      </div>

      {/* 01 · EdiJazzSoc Instagram & Real Book Spread */}
      <section ref={spread1Ref} className="px-4 py-8 md:px-8 md:py-12 lg:px-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Compact Bauhaus Editorial Column */}
          <div className="xl:col-span-4 xl:sticky xl:top-8">
            <div className="font-mono text-xs font-bold tracking-[0.2em] text-zine-vermilion tabular-nums mb-2">
              01
            </div>
            <h3 className="font-syne font-extrabold text-2xl md:text-3xl uppercase tracking-tight leading-[1.05] text-zine-ink mb-4 [text-wrap:balance]">
              {t.graphicsEdiJazzTitle}
            </h3>
            <div className="font-serif text-base leading-relaxed text-zine-ink/85 space-y-3">
              <p>{t.graphicsEdiJazzDesc}</p>
              <p>{t.graphicsEdiJazzSub}</p>
            </div>
            <div className="w-10 h-1.5 bg-zine-vermilion mt-6" aria-hidden="true" />
          </div>

          {/* Real Book Diptych — Artwork Dominant */}
          <div className="xl:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-start">
              <ArtworkFrame item={ARTWORKS[0]} index={0} onOpen={setLightboxIndex} priority />
              <ArtworkFrame item={ARTWORKS[1]} index={1} onOpen={setLightboxIndex} priority />
            </div>
          </div>
        </div>

        {/* Instagram Geometric Trio (De Stijl 8 + 4 Proportion) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mt-6 md:mt-8 items-start">
          <div className="md:col-span-8">
            <ArtworkFrame item={ARTWORKS[2]} index={2} onOpen={setLightboxIndex} />
          </div>
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-5">
            <ArtworkFrame item={ARTWORKS[3]} index={3} onOpen={setLightboxIndex} />
            <ArtworkFrame item={ARTWORKS[4]} index={4} onOpen={setLightboxIndex} />
          </div>
        </div>
      </section>

      {/* 02 · Event Posters Exhibition Wall (Ink Surface — Zero Outlines Needed) */}
      <section ref={spread2Ref} className="bg-zine-ink text-zine-bg px-4 py-8 md:px-8 md:py-12 lg:px-10">
        <div className="flex items-end justify-between gap-6 mb-6 md:mb-10 pb-4 border-b border-zine-bg/20">
          <div>
            <div className="font-mono text-xs font-bold tracking-[0.2em] text-zine-vermilion tabular-nums mb-1">
              02
            </div>
            <h3 className="font-syne font-extrabold text-2xl md:text-4xl uppercase tracking-tight leading-none text-zine-bg [text-wrap:balance]">
              {t.graphicsEventPostersTitle}
            </h3>
          </div>
          <div className="w-5 h-5 md:w-6 md:h-6 bg-zine-vermilion shrink-0" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 items-start">
          <ArtworkFrame item={ARTWORKS[5]} index={5} onOpen={setLightboxIndex} darkSurface />
          <ArtworkFrame item={ARTWORKS[6]} index={6} onOpen={setLightboxIndex} darkSurface />
          <ArtworkFrame item={ARTWORKS[7]} index={7} onOpen={setLightboxIndex} darkSurface />
          <ArtworkFrame item={ARTWORKS[8]} index={8} onOpen={setLightboxIndex} darkSurface />
        </div>
      </section>

      {/* 03 · Bilingual Design Spread */}
      <section ref={spread3Ref} className="px-4 py-8 md:px-8 md:py-12 lg:px-10 bg-zine-bg text-zine-ink border-t border-zine-ink">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Broadsheet Artwork Dominant */}
          <div className="xl:col-span-7">
            <ArtworkFrame item={ARTWORKS[9]} index={9} onOpen={setLightboxIndex} />
          </div>

          {/* Editorial Column */}
          <div className="xl:col-span-5 xl:pt-2">
            <div className="font-mono text-xs font-bold tracking-[0.2em] text-zine-vermilion tabular-nums mb-2">
              03
            </div>
            <h3 className="font-syne font-extrabold text-2xl md:text-3xl uppercase tracking-tight leading-[1.05] text-zine-ink mb-4 [text-wrap:balance]">
              {t.graphicsBilingualTitle}
            </h3>
            <p className="font-serif text-base md:text-[17px] leading-relaxed text-zine-ink/85">
              {t.graphicsBilingualDesc}
            </p>
            <div className="w-10 h-1.5 bg-zine-ink mt-6" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Unobstructed Artwork Lightbox */}
      {activeArtwork && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeArtwork.alt}
          onClick={closeLightbox}
          className="fixed inset-0 z-[200] bg-zine-ink/95 text-zine-bg flex flex-col justify-between p-4 md:p-8"
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between gap-4 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline gap-4 min-w-0">
              <span className="font-mono text-xs font-bold text-zine-vermilion tabular-nums shrink-0">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(ARTWORKS.length).padStart(2, '0')}
              </span>
              <span className="font-syne font-bold text-sm md:text-base uppercase tracking-tight truncate">
                {activeArtwork.alt}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close artwork viewer"
              className="min-h-[44px] px-4 py-2 font-mono text-xs uppercase font-bold border border-zine-bg/30 text-zine-bg hover:bg-zine-vermilion hover:border-zine-vermilion transition-colors shrink-0 whitespace-nowrap"
            >
              CLOSE ✕
            </button>
          </div>

          {/* Artwork Stage */}
          <div
            className="flex-grow flex items-center justify-center min-h-0 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ResponsiveImage
              src={activeArtwork.src}
              webpSrc={activeArtwork.webpSrc}
              alt={activeArtwork.alt}
              loading="eager"
              className="max-h-[76vh] max-w-full w-auto h-auto object-contain"
            />
          </div>

          {/* Bottom Controls */}
          <div
            className="flex items-center justify-between gap-4 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-xs text-zine-bg/60 uppercase tracking-wider hidden sm:inline">
              {activeArtwork.series}
            </span>

            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous artwork"
                className="min-h-[44px] px-5 py-2 font-mono text-xs uppercase font-bold border border-zine-bg/30 text-zine-bg hover:bg-zine-bg hover:text-zine-ink transition-colors whitespace-nowrap"
              >
                ← PREV
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next artwork"
                className="min-h-[44px] px-5 py-2 font-mono text-xs uppercase font-bold border border-zine-bg/30 text-zine-bg hover:bg-zine-bg hover:text-zine-ink transition-colors whitespace-nowrap"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
