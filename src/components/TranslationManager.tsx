import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations, Translations } from '../hooks/useTranslations';

export type CategoryKey = 'all' | 'home' | 'graphics' | 'web' | 'film' | 'writing' | 'cv' | 'snail' | 'nav';

interface FieldConfig {
  key: keyof Translations['en'];
  label: string;
  category: Exclude<CategoryKey, 'all'>;
  isTextarea?: boolean;
}

const CATEGORIES: { id: CategoryKey; label: string; pageKey?: string }[] = [
  { id: 'all', label: 'All Sections' },
  { id: 'home', label: 'Home / Bio', pageKey: 'home' },
  { id: 'graphics', label: 'Graphics & Posters', pageKey: 'graphics' },
  { id: 'web', label: 'Web Design', pageKey: 'web' },
  { id: 'film', label: 'Video & Film', pageKey: 'film' },
  { id: 'writing', label: 'Writing & Satire', pageKey: 'writing' },
  { id: 'cv', label: 'CV & Resume', pageKey: 'cv' },
  { id: 'snail', label: 'Snail Mail (Contact)', pageKey: 'snail' },
  { id: 'nav', label: 'Navigation Menu', pageKey: 'nav' },
];

const FIELDS: FieldConfig[] = [
  // Home / Bio
  { key: 'bio1', label: 'Bio Paragraph 1', category: 'home', isTextarea: true },
  { key: 'bio2', label: 'Bio Paragraph 2', category: 'home', isTextarea: true },

  // Graphics & Posters
  { key: 'graphicsEdiJazzTitle', label: 'EdiJazzSoc - Project Title', category: 'graphics' },
  { key: 'graphicsEdiJazzDesc', label: 'EdiJazzSoc - Project Description', category: 'graphics', isTextarea: true },
  { key: 'graphicsEdiJazzSub', label: 'EdiJazzSoc - Real Book Campaign Context', category: 'graphics', isTextarea: true },
  { key: 'graphicsEventPostersTitle', label: 'Event Posters - Section Heading', category: 'graphics' },
  { key: 'graphicsBilingualTitle', label: 'Bilingual Design - Heading', category: 'graphics' },
  { key: 'graphicsBilingualDesc', label: 'Bilingual Design - Description', category: 'graphics', isTextarea: true },

  // Web Design
  { key: 'webLifeTitle', label: 'Life in the Kitchen - Project Title', category: 'web' },
  { key: 'webLifeDesc1', label: 'Life in the Kitchen - Description Paragraph 1', category: 'web', isTextarea: true },
  { key: 'webLifeDesc2', label: 'Life in the Kitchen - Description Paragraph 2', category: 'web', isTextarea: true },
  { key: 'webViewLive', label: 'View Live Website Button Label', category: 'web' },
  { key: 'webImagePlaceholderText', label: 'Image Placeholder Label', category: 'web' },
  { key: 'webImagePlaceholderDimensions', label: 'Image Placeholder Dimensions', category: 'web' },

  // Video & Film
  { key: 'filmStalinTitle', label: 'Culture & Power under Stalin - Title', category: 'film' },
  { key: 'filmStalinDesc', label: 'Culture & Power under Stalin - Description', category: 'film', isTextarea: true },
  { key: 'filmHorrorTitle', label: 'Improvised Horror Short - Title', category: 'film' },
  { key: 'filmHorrorDesc', label: 'Improvised Horror Short - Description', category: 'film', isTextarea: true },
  { key: 'filmTakeMeTitle', label: 'Take Me As You Please - Title', category: 'film' },
  { key: 'filmTakeMeDesc', label: 'Take Me As You Please - Description', category: 'film', isTextarea: true },
  { key: 'filmForgoTitle', label: 'Forgo - Title', category: 'film' },
  { key: 'filmForgoDesc', label: 'Forgo - Description', category: 'film', isTextarea: true },
  { key: 'filmSuffolkTitle', label: 'Suffolk Documentary - Title', category: 'film' },
  { key: 'filmSuffolkDesc', label: 'Suffolk Documentary - Description', category: 'film', isTextarea: true },

  // Writing & Satire
  { key: 'writingEstelaTitle', label: 'Estela Superyacht Agency - Title', category: 'writing' },
  { key: 'writingEstelaDesc', label: 'Estela Superyacht Agency - Description', category: 'writing', isTextarea: true },
  { key: 'writingEstelaLink', label: 'Estela Superyacht Agency - Link URL', category: 'writing' },
  { key: 'writingPutinTitle', label: 'Vladimir Putin Satire - Title', category: 'writing' },
  { key: 'writingPutinDesc', label: 'Vladimir Putin Satire - Description', category: 'writing', isTextarea: true },
  { key: 'writingPutinLink', label: 'Vladimir Putin Satire - Link URL', category: 'writing' },
  { key: 'writingIsleOfDogsTitle', label: 'Thinking Translation: Isle of Dogs - Title', category: 'writing' },
  { key: 'writingIsleOfDogsDesc', label: 'Thinking Translation: Isle of Dogs - Description', category: 'writing', isTextarea: true },
  { key: 'writingIsleOfDogsLink', label: 'Thinking Translation: Isle of Dogs - Link URL', category: 'writing' },
  { key: 'writingReadMoreBtn', label: 'Read Full Piece Button Text', category: 'writing' },

  // CV & Resume
  { key: 'cvHeading', label: 'CV Main Heading', category: 'cv' },
  { key: 'cvEducation', label: 'CV Education Section Heading', category: 'cv' },
  { key: 'cvDegree', label: 'CV Degree', category: 'cv' },
  { key: 'cvUniBullet1', label: 'CV University - Distinction/Speaking', category: 'cv' },
  { key: 'cvUniBullet2', label: 'CV University - Publicity Officer', category: 'cv' },
  { key: 'cvUniBullet3', label: 'CV University - Secretary', category: 'cv' },
  { key: 'cvStudyAbroad', label: 'CV Study Abroad Heading', category: 'cv' },
  { key: 'cvHighSchoolALevels', label: 'CV High School - A Levels', category: 'cv' },
  { key: 'cvHighSchoolGCSEs', label: 'CV High School - GCSEs', category: 'cv' },
  { key: 'cvExperience', label: 'CV Experience Section Heading', category: 'cv' },
  { key: 'cvJobEstelaRole', label: 'CV Estela - Role', category: 'cv' },
  { key: 'cvJobEstelaB1', label: 'CV Estela - Bullet 1', category: 'cv' },
  { key: 'cvJobEstelaB2', label: 'CV Estela - Bullet 2', category: 'cv' },
  { key: 'cvJobEstelaB3', label: 'CV Estela - Bullet 3', category: 'cv' },
  { key: 'cvJobHarajukuRole', label: 'CV Harajuku Kitchen - Role', category: 'cv' },
  { key: 'cvJobHarajukuB1', label: 'CV Harajuku Kitchen - Bullet 1', category: 'cv' },
  { key: 'cvJobHarajukuB2', label: 'CV Harajuku Kitchen - Bullet 2', category: 'cv' },
  { key: 'cvJobHarajukuB3', label: 'CV Harajuku Kitchen - Bullet 3', category: 'cv' },
  { key: 'cvJobGriffinRole', label: 'CV The Griffin - Role', category: 'cv' },
  { key: 'cvJobGriffinB1', label: 'CV The Griffin - Bullet 1', category: 'cv' },
  { key: 'cvJobGriffinB2', label: 'CV The Griffin - Bullet 2', category: 'cv' },
  { key: 'cvJobGriffinB3', label: 'CV The Griffin - Bullet 3', category: 'cv' },
  { key: 'cvJobAssemblyRole', label: 'CV Assembly Festival - Role', category: 'cv' },
  { key: 'cvJobAssemblyB1', label: 'CV Assembly Festival - Bullet 1', category: 'cv' },
  { key: 'cvJobAssemblyB2', label: 'CV Assembly Festival - Bullet 2', category: 'cv' },
  { key: 'cvJobAssemblyB3', label: 'CV Assembly Festival - Bullet 3', category: 'cv' },
  { key: 'cvJobMelodyRole', label: 'CV Melody Box - Role', category: 'cv' },
  { key: 'cvJobMelodyB1', label: 'CV Melody Box - Bullet 1', category: 'cv' },
  { key: 'cvJobMelodyB2', label: 'CV Melody Box - Bullet 2', category: 'cv' },
  { key: 'cvJobMelodyB3', label: 'CV Melody Box - Bullet 3', category: 'cv' },
  { key: 'cvJobFunRole', label: 'CV Fun Scientists - Role', category: 'cv' },
  { key: 'cvJobTennisRole', label: 'CV Totteridge Tennis - Role', category: 'cv' },
  { key: 'cvLeadership', label: 'CV Leadership Section Heading', category: 'cv' },
  { key: 'cvGoetheTitle', label: 'CV Goethe Institut Hackathon - Title', category: 'cv' },
  { key: 'cvGoetheRole', label: 'CV Goethe Institut Hackathon - Role', category: 'cv' },
  { key: 'cvGoetheB1', label: 'CV Goethe - Bullet 1', category: 'cv' },
  { key: 'cvGoetheB2', label: 'CV Goethe - Bullet 2', category: 'cv' },
  { key: 'cvGoetheB3', label: 'CV Goethe - Bullet 3', category: 'cv' },
  { key: 'cvJazzTitle', label: 'CV Jazz Society - Title', category: 'cv' },
  { key: 'cvJazzRole', label: 'CV Jazz Society - Role', category: 'cv' },
  { key: 'cvJazzB1', label: 'CV Jazz Society - Bullet 1', category: 'cv' },
  { key: 'cvJazzB2', label: 'CV Jazz Society - Bullet 2', category: 'cv' },
  { key: 'cvJazzB3', label: 'CV Jazz Society - Bullet 3', category: 'cv' },
  { key: 'cvSkills', label: 'CV Skills Section Heading', category: 'cv' },
  { key: 'cvSkillsLanguages', label: 'CV Skills - Languages Heading', category: 'cv' },
  { key: 'cvSkillsLanguagesJa', label: 'CV Skills - Japanese', category: 'cv' },
  { key: 'cvSkillsLanguagesDe', label: 'CV Skills - German', category: 'cv' },
  { key: 'cvSkillsLanguagesRu', label: 'CV Skills - Russian', category: 'cv' },
  { key: 'cvSkillsTechnical', label: 'CV Skills - Technical Heading', category: 'cv' },
  { key: 'cvSkillsTechnicalDesc', label: 'CV Skills - Technical Description', category: 'cv' },
  { key: 'cvSkillsInterests', label: 'CV Skills - Interests Heading', category: 'cv' },
  { key: 'cvSkillsInterestsCoach', label: 'CV Skills - Tennis Coach', category: 'cv' },
  { key: 'cvSkillsInterestsHobbies', label: 'CV Skills - Hobbies & Interests', category: 'cv' },

  // Snail Mail
  { key: 'headingSnailMail', label: 'Snail Mail Heading', category: 'snail' },
  { key: 'bodySnailMail', label: 'Snail Mail Body Text', category: 'snail', isTextarea: true },

  // Navigation
  { key: 'navHome', label: 'Nav: Home', category: 'nav' },
  { key: 'navGraphics', label: 'Nav: Graphics & Posters', category: 'nav' },
  { key: 'navWeb', label: 'Nav: Web Design', category: 'nav' },
  { key: 'navFilm', label: 'Nav: Video & Film', category: 'nav' },
  { key: 'navWriting', label: 'Nav: Writing & Satire', category: 'nav' },
  { key: 'navCV', label: 'Nav: CV & Resume', category: 'nav' },
  { key: 'navSnailMail', label: 'Nav: Snail Mail', category: 'nav' },
];

export default function TranslationManager() {
  const { translations, user, login, logout, saveTranslations } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<Translations>(translations);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<'all' | 'en' | 'jp' | 'de' | 'ru'>('all');

  // Sync editData when opening the manager or when translations update
  useEffect(() => {
    if (isOpen) {
      setEditData(translations);
    }
  }, [isOpen, translations]);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ page?: string; category?: string }>;
      const targetPage = customEvent?.detail?.page || customEvent?.detail?.category;
      
      if (targetPage) {
        if (targetPage === 'contact' || targetPage === 'snail') {
          setActiveCategory('snail');
        } else if (['home', 'graphics', 'web', 'film', 'writing', 'cv', 'nav'].includes(targetPage)) {
          setActiveCategory(targetPage as CategoryKey);
        } else {
          setActiveCategory('all');
        }
      }
      setIsOpen(true);
    };

    window.addEventListener('open-cms', handleOpen);
    return () => window.removeEventListener('open-cms', handleOpen);
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveTranslations(editData);
      alert("Translations saved successfully!");
    } catch (e: any) {
      alert("Failed to save: " + (e?.message || "Unknown error"));
    }
    setSaving(false);
  };

  const handleChange = (lang: keyof Translations, key: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: value
      }
    }));
  };

  const filteredFields = FIELDS.filter(field => {
    const matchesCategory = activeCategory === 'all' || field.category === activeCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const labelMatch = field.label.toLowerCase().includes(q);
    const keyMatch = field.key.toLowerCase().includes(q);
    return labelMatch || keyMatch;
  });

  const languagesToDisplay: (keyof Translations)[] = 
    selectedLang === 'all' 
      ? ['en', 'jp', 'de', 'ru'] 
      : [selectedLang];

  const currentCategoryObj = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="fixed inset-0 bg-black/85 z-[100] flex items-center justify-center p-3 md:p-6 overflow-hidden font-mono text-sm">
      <div className="bg-zinc-950 text-zinc-100 max-w-[96vw] w-full h-[94vh] flex flex-col border-2 border-zinc-700">
        
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center p-4 md:px-6 md:py-4 border-b border-zinc-800 bg-zinc-900 shrink-0 gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-zine-vermilion">
              Translation Manager
            </h2>
            <span className="text-xs font-mono uppercase bg-zinc-800 text-zinc-300 px-2 py-1 border border-zinc-700">
              {currentCategoryObj?.label || 'All Sections'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="text-xs text-zinc-400 hidden sm:inline">
                {user.email}
              </span>
            )}
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-zinc-400 hover:text-white px-3 py-1 border border-zinc-700 hover:border-zinc-500 font-bold transition-colors"
            >
              CLOSE ✕
            </button>
          </div>
        </div>

        {!user ? (
          <div className="flex flex-col items-center justify-center flex-grow p-8 text-center">
            <p className="mb-6 text-zinc-400 text-base max-w-md">
              Sign in with your authorized admin account to modify website translations across all pages and languages.
            </p>
            <button 
              onClick={login} 
              className="bg-zine-vermilion text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
            >
              SIGN IN WITH GOOGLE
            </button>
          </div>
        ) : (
          <div className="flex flex-col flex-grow overflow-hidden">
            
            {/* Top Toolbar: Subheading Category Tabs */}
            <div className="bg-zinc-900/90 border-b border-zinc-800 p-3 flex flex-col gap-3 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px] shrink-0 font-bold pr-1">
                  PAGE / SECTION:
                </span>
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? FIELDS.length 
                    : FIELDS.filter(f => f.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 uppercase font-bold shrink-0 transition-all border ${
                        isActive 
                          ? 'bg-zine-vermilion text-white border-zine-vermilion' 
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'
                      }`}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Search & Language Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex-1 min-w-[200px] max-w-md relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search field or key (e.g. title, essay, nav)..."
                    className="w-full bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zine-vermilion focus:outline-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="text-zinc-500 uppercase tracking-widest text-[10px] pr-1">
                    SHOW:
                  </span>
                  {(['all', 'en', 'jp', 'de', 'ru'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`px-2.5 py-1 uppercase font-bold border transition-colors ${
                        selectedLang === lang 
                          ? 'bg-zinc-200 text-black border-zinc-200' 
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Field Inputs Area */}
            <div className="flex-grow overflow-y-auto p-4 md:p-6 bg-zinc-950">
              {filteredFields.length === 0 ? (
                <div className="text-center py-16 text-zinc-500">
                  <p className="text-base mb-2">No fields matched your filter.</p>
                  <button 
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="text-zine-vermilion underline text-xs uppercase"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  languagesToDisplay.length === 1 
                    ? 'grid-cols-1 max-w-3xl mx-auto' 
                    : languagesToDisplay.length === 2 
                      ? 'grid-cols-1 md:grid-cols-2' 
                      : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
                }`}>
                  {languagesToDisplay.map(lang => (
                    <div key={lang} className="flex flex-col gap-5 bg-zinc-900/40 border border-zinc-800/80 p-4">
                      <div className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-700 pb-2 mb-2 flex justify-between items-center">
                        <span className="font-bold text-sm uppercase tracking-wider text-zine-vermilion">
                          {lang === 'en' ? '🇬🇧 English (en)' : 
                           lang === 'jp' ? '🇯🇵 Japanese (jp)' : 
                           lang === 'de' ? '🇩🇪 German (de)' : 
                           '🇷🇺 Russian (ru)'}
                        </span>
                        <span className="text-[10px] text-zinc-500 uppercase">
                          {filteredFields.length} {filteredFields.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>

                      {filteredFields.map(({ key, label, isTextarea, category }) => (
                        <div key={key} className="flex flex-col gap-1.5 pt-1 border-t border-zinc-800/60 first:border-0 first:pt-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <label className="text-zinc-200 text-xs font-semibold leading-tight">
                              {label}
                            </label>
                            <span className="text-[10px] text-zinc-500 font-mono shrink-0">
                              {key}
                            </span>
                          </div>

                          {isTextarea ? (
                            <textarea 
                              value={editData[lang][key] || ''}
                              onChange={(e) => handleChange(lang, key, e.target.value)}
                              rows={3}
                              className="w-full bg-zinc-800/90 border border-zinc-700 p-2.5 text-zinc-100 text-xs leading-relaxed focus:border-zine-vermilion focus:outline-none resize-y"
                              placeholder={`${label} in ${lang.toUpperCase()}...`}
                            />
                          ) : (
                            <input 
                              type="text"
                              value={editData[lang][key] || ''}
                              onChange={(e) => handleChange(lang, key, e.target.value)}
                              className="w-full bg-zinc-800/90 border border-zinc-700 p-2 text-zinc-100 text-xs focus:border-zine-vermilion focus:outline-none"
                              placeholder={`${label} in ${lang.toUpperCase()}...`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-t border-zinc-800 bg-zinc-900 shrink-0">
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span>Active Section: <strong className="text-zinc-200 uppercase">{currentCategoryObj?.label}</strong></span>
                <span className="hidden sm:inline">•</span>
                <button onClick={logout} className="hover:text-white underline hidden sm:inline">
                  Sign out
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setEditData(translations)} 
                  className="px-5 py-2 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 uppercase tracking-wider text-xs font-bold transition-colors"
                >
                  RESET
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-zine-vermilion text-white font-bold uppercase tracking-wider text-xs hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'SAVING...' : 'SAVE ALL CHANGES'}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
