const fs = require('fs');

const useTranslationsPath = 'src/hooks/useTranslations.ts';
let useTranslationsContent = fs.readFileSync(useTranslationsPath, 'utf8');

const newFieldsEN = `    graphicsEdiJazzTitle: "EdiJazzSoc Instagram",
    graphicsEdiJazzDesc: "Social media posts for @edijazzsoc (Sept 2023 - March 2024). Showcasing my graphic design skills using Procreate, featuring mixed media combining photography and hand-drawn graphics.",
    graphicsEdiJazzSub: "Included a \\"Real Book\\" themed committee introduction campaign where I presented each member as a page of the omnipresent jazz standard book.",
    graphicsEventPostersTitle: "Event Posters",
    graphicsBilingualTitle: "Bilingual Design",
    graphicsBilingualDesc: "Virtual Christmas card incorporating both Japanese and English, bridging cultures and linguistic differences. Also featuring \\"The Phillips Times\\" - a custom newspaper spoof for a family trip to Berlin.",
    webLifeTitle: "Life in the Kitchen",
    webLifeDesc1: "\\"A few years ago I wanted to make an archive of my grandmother’s recipes. Sadly she recently passed away in May 2026 and I have been working on adding more recipes to honour her loss.\\"",
    webLifeDesc2: "She had a rich life of food and memories and I wanted to showcase it in a minimalist, self-coded HTML website.",
    webViewLive: "View Live Website ↗",
    webImagePlaceholderText: "HTML RECIPE ARCHIVE",
    webImagePlaceholderDimensions: "DESKTOP VIEW",
    filmStalinTitle: "Culture and Power under Stalin",
    filmStalinDesc: "Co-created a video essay for a 4th year University course. We received a mark of 85, a highly-esteemed grade in UK University standards.",
    filmHorrorTitle: "Improvised Horror Short",
    filmHorrorDesc: "Created a (very) short film with a friend for a horror film competition. It never ended up getting submitted but we put a lot of work into it nonetheless. I also improvised the soundtrack on guitar in one take. A lot of my projects tend to be quite fluid and are dynamic to changes and new ideas in the moment.",
    filmTakeMeTitle: "Take Me As You Please",
    filmTakeMeDesc: "For this film I was not directly involved in the direction, I helped with some aspects of production (i.e. organisation of cast and crew). I act in the second half of the film.",
    filmForgoTitle: "Forgo",
    filmForgoDesc: "In the first year at the University of Edinburgh I was a part of the filmmaking society. I was the costume assistant and coordinated with the lead costumes designers to create appropriate outfits for various scenes. I also lent a helping hand during production, i.e. with lighting and sound.",
    filmSuffolkTitle: "Suffolk Documentary",
    filmSuffolkDesc: "During a trip in Suffolk with my friends from high school, I made a documentary which included compiling interviews from around 10 people. Although it was a totally self led production, I learned about how much organisation is required for such a task (It involved a massive spreadsheet!). This project taught me in particular that storytelling is a beautiful, comedic but sometimes very menial task.",
    writingEstelaTitle: "Estela Superyacht Agency",
    writingEstelaDesc: "Created travel itineraries for yacht captains to potentially follow in the Balearic islands. While focused heavily on the planning mechanics, it provided a strong foundation in understanding copywriting and collating actionable information for teams.",
    writingPutinTitle: "Vladimir Putin gets a Sex Swing",
    writingPutinDesc: "A co-written political satire. The name might sound alarming but it is not R-rated. It’s intended to highlight and criticise the extreme bureaucracy of Royal Mail (the British Postal System).",
    writingExcerptLabel: "EXCERPT: CHAPTER 1",
    writingExcerptText: "The package was held at the sorting office. Not because of its contents, which were highly sensitive, but because a form 4B had not been stamped in triplicate by an authorized shift manager between the hours of 2:15 and 2:18 PM..."`;

// A simple function to just duplicate english fields into other languages for now, so they can translate it later
// In the prompt, the user asks "For each language can you translate the snail mail and the heading sections?" - they already saw I did that.
// Now they just say "okay now i want to be able to translate the text in each subpage." Meaning I should just set up the fields.

const injectFields = (content, lang) => {
  const marker = `bodySnailMail: `;
  const regex = new RegExp(`(${marker}.*)`, 'g');
  // Find where the marker is in the specific language block
  // Actually it's easier to just do string replacement
  // We'll replace `bodySnailMail: "..."` with `bodySnailMail: "...", \n ${newFieldsEN}`
  
  // get the exact line for this language's bodySnailMail
  const parts = content.split('},');
  
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].includes(`${lang}: {`)) {
      parts[i] = parts[i].replace(/(bodySnailMail:\s*".*?")/g, `$1,\n${newFieldsEN}`);
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

const newFieldsTM = `    { key: 'graphicsEdiJazzTitle', label: 'Graphics: EdiJazz Title' },
    { key: 'graphicsEdiJazzDesc', label: 'Graphics: EdiJazz Desc', isTextarea: true },
    { key: 'graphicsEdiJazzSub', label: 'Graphics: EdiJazz Sub', isTextarea: true },
    { key: 'graphicsEventPostersTitle', label: 'Graphics: Event Posters' },
    { key: 'graphicsBilingualTitle', label: 'Graphics: Bilingual Title' },
    { key: 'graphicsBilingualDesc', label: 'Graphics: Bilingual Desc', isTextarea: true },
    { key: 'webLifeTitle', label: 'Web: Life Title' },
    { key: 'webLifeDesc1', label: 'Web: Life Desc 1', isTextarea: true },
    { key: 'webLifeDesc2', label: 'Web: Life Desc 2', isTextarea: true },
    { key: 'webViewLive', label: 'Web: View Live' },
    { key: 'webImagePlaceholderText', label: 'Web: Placeholder Text' },
    { key: 'webImagePlaceholderDimensions', label: 'Web: Placeholder Dims' },
    { key: 'filmStalinTitle', label: 'Film: Stalin Title' },
    { key: 'filmStalinDesc', label: 'Film: Stalin Desc', isTextarea: true },
    { key: 'filmHorrorTitle', label: 'Film: Horror Title' },
    { key: 'filmHorrorDesc', label: 'Film: Horror Desc', isTextarea: true },
    { key: 'filmTakeMeTitle', label: 'Film: Take Me Title' },
    { key: 'filmTakeMeDesc', label: 'Film: Take Me Desc', isTextarea: true },
    { key: 'filmForgoTitle', label: 'Film: Forgo Title' },
    { key: 'filmForgoDesc', label: 'Film: Forgo Desc', isTextarea: true },
    { key: 'filmSuffolkTitle', label: 'Film: Suffolk Title' },
    { key: 'filmSuffolkDesc', label: 'Film: Suffolk Desc', isTextarea: true },
    { key: 'writingEstelaTitle', label: 'Writing: Estela Title' },
    { key: 'writingEstelaDesc', label: 'Writing: Estela Desc', isTextarea: true },
    { key: 'writingPutinTitle', label: 'Writing: Putin Title' },
    { key: 'writingPutinDesc', label: 'Writing: Putin Desc', isTextarea: true },
    { key: 'writingExcerptLabel', label: 'Writing: Excerpt Label' },
    { key: 'writingExcerptText', label: 'Writing: Excerpt Text', isTextarea: true }`;

tmContent = tmContent.replace(/(key: 'bodySnailMail', label: 'Snail Mail Body', isTextarea: true\s*})/, `$1,\n${newFieldsTM}`);
fs.writeFileSync(tmPath, tmContent);

console.log("Done updating schema");
