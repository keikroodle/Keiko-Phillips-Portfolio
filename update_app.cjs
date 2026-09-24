const fs = require('fs');

const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// Graphics
content = content.replace(
  'EdiJazzSoc Instagram',
  '{t.graphicsEdiJazzTitle}'
);
content = content.replace(
  'Social media posts for @edijazzsoc (Sept 2023 - March 2024). Showcasing my graphic design skills using Procreate, featuring mixed media combining photography and hand-drawn graphics.',
  '{t.graphicsEdiJazzDesc}'
);
content = content.replace(
  'Included a "Real Book" themed committee introduction campaign where I presented each member as a page of the omnipresent jazz standard book.',
  '{t.graphicsEdiJazzSub}'
);
content = content.replace(
  '<h3 className="font-goodgirl text-4xl mb-6 uppercase">Event Posters</h3>',
  '<h3 className="font-goodgirl text-4xl mb-6 uppercase">{t.graphicsEventPostersTitle}</h3>'
);
content = content.replace(
  '<h3 className="font-goodgirl text-4xl mb-4 uppercase">Bilingual Design</h3>',
  '<h3 className="font-goodgirl text-4xl mb-4 uppercase">{t.graphicsBilingualTitle}</h3>'
);
content = content.replace(
  'Virtual Christmas card incorporating both Japanese and English, bridging cultures and linguistic differences. Also featuring "The Phillips Times" - a custom newspaper spoof for a family trip to Berlin.',
  '{t.graphicsBilingualDesc}'
);

// Web
content = content.replace(
  'Life in the Kitchen',
  '{t.webLifeTitle}'
);
content = content.replace(
  '"A few years ago I wanted to make an archive of my grandmother’s recipes. Sadly she recently passed away in May 2026 and I have been working on adding more recipes to honour her loss."',
  '{t.webLifeDesc1}'
);
content = content.replace(
  'She had a rich life of food and memories and I wanted to showcase it in a minimalist, self-coded HTML website.',
  '{t.webLifeDesc2}'
);
content = content.replace(
  'View Live Website ↗',
  '{t.webViewLive}'
);
content = content.replace(
  'text="HTML RECIPE ARCHIVE"',
  'text={t.webImagePlaceholderText}'
);
content = content.replace(
  'dimensionsLabel="DESKTOP VIEW"',
  'dimensionsLabel={t.webImagePlaceholderDimensions}'
);

// Film
content = content.replace(
  'Culture and Power under Stalin',
  '{t.filmStalinTitle}'
);
content = content.replace(
  'Co-created a video essay for a 4th year University course. We received a mark of 85, a highly-esteemed grade in UK University standards.',
  '{t.filmStalinDesc}'
);
content = content.replace(
  'Improvised Horror Short',
  '{t.filmHorrorTitle}'
);
content = content.replace(
  'Created a (very) short film with a friend for a horror film competition. It never ended up getting submitted but we put a lot of work into it nonetheless. I also improvised the soundtrack on guitar in one take. A lot of my projects tend to be quite fluid and are dynamic to changes and new ideas in the moment.',
  '{t.filmHorrorDesc}'
);
content = content.replace(
  'Take Me As You Please',
  '{t.filmTakeMeTitle}'
);
content = content.replace(
  'For this film I was not directly involved in the direction, I helped with some aspects of production (i.e. organisation of cast and crew). I act in the second half of the film.',
  '{t.filmTakeMeDesc}'
);
content = content.replace(
  '<h3 className="font-goodgirl text-3xl md:text-5xl uppercase ">Forgo</h3>',
  '<h3 className="font-goodgirl text-3xl md:text-5xl uppercase ">{t.filmForgoTitle}</h3>'
);
content = content.replace(
  'In the first year at the University of Edinburgh I was a part of the filmmaking society. I was the costume assistant and coordinated with the lead costumes designers to create appropriate outfits for various scenes. I also lent a helping hand during production, i.e. with lighting and sound.',
  '{t.filmForgoDesc}'
);
content = content.replace(
  'Suffolk Documentary',
  '{t.filmSuffolkTitle}'
);
content = content.replace(
  'During a trip in Suffolk with my friends from high school, I made a documentary which included compiling interviews from around 10 people. Although it was a totally self led production, I learned about how much organisation is required for such a task (It involved a massive spreadsheet!). This project taught me in particular that storytelling is a beautiful, comedic but sometimes very menial task.',
  '{t.filmSuffolkDesc}'
);

// Writing
content = content.replace(
  'Estela Superyacht Agency',
  '{t.writingEstelaTitle}'
);
content = content.replace(
  'Created travel itineraries for yacht captains to potentially follow in the Balearic islands. While focused heavily on the planning mechanics, it provided a strong foundation in understanding copywriting and collating actionable information for teams.',
  '{t.writingEstelaDesc}'
);
content = content.replace(
  'Vladimir Putin gets a Sex Swing',
  '{t.writingPutinTitle}'
);
content = content.replace(
  'A co-written political satire. The name might sound alarming but it is not R-rated. It’s intended to highlight and criticise the extreme bureaucracy of Royal Mail (the British Postal System).',
  '{t.writingPutinDesc}'
);
content = content.replace(
  'EXCERPT: CHAPTER 1',
  '{t.writingExcerptLabel}'
);
content = content.replace(
  'The package was held at the sorting office. Not because of its contents, which were highly sensitive, but because a form 4B had not been stamped in triplicate by an authorized shift manager between the hours of 2:15 and 2:18 PM...',
  '{t.writingExcerptText}'
);

fs.writeFileSync(appPath, content);
console.log("App.tsx updated");
