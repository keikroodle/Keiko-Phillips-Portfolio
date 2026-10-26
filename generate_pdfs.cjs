const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

function generateEnglishCV() {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const black = [20, 20, 20];
  const charcoal = [60, 60, 60];
  const vermilion = [218, 56, 32];
  const lightGray = [235, 235, 235];
  const muted = [100, 100, 100];

  let y = 45;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...black);
  doc.text('KEIKO PHILLIPS', margin, y);

  // Subtitle / Title
  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...vermilion);
  doc.text('MULTILINGUAL CREATIVE & COMMUNICATIONS SPECIALIST', margin, y);

  // Contact line
  y += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...charcoal);
  doc.text('Edinburgh / London / Berlin  •  keikojphillips@outlook.com  •  First Class Hons (Edinburgh 2026)', margin, y);

  // Divider line
  y += 12;
  doc.setDrawColor(...black);
  doc.setLineWidth(1.5);
  doc.line(margin, y, margin + contentWidth, y);

  // SECTION HELPER
  function addSectionHeading(num, title) {
    y += 18;
    doc.setFillColor(...lightGray);
    doc.rect(margin, y - 10, contentWidth, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...black);
    doc.text(`${num}  ${title.toUpperCase()}`, margin + 6, y + 2);
    y += 10;
  }

  // 01 PROFILE & LANGUAGES
  addSectionHeading('01', 'Profile, Languages & Technical Skills');

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...charcoal);
  const profileLines = doc.splitTextToSize(
    'Multilingual creative and University of Edinburgh graduate (First Class Honours in German and Russian Studies) working across graphic design, communications, film, web, and copywriting. Seeking roles in Germany where language and creativity intersect: content creation, brand communications, cultural programming, and localisation.',
    contentWidth
  );
  doc.text(profileLines, margin, y);
  y += profileLines.length * 11 + 4;

  // Languages Table / Badges
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...black);
  doc.text('Languages:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoal);
  doc.text('English (Native)  |  Japanese (Native)  |  German (C1 Advanced)  |  Russian (B1 Distinction in Spoken Russian)', margin + 65, y);

  // Technical Skills
  y += 13;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...black);
  doc.text('Design & Web:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoal);
  doc.text('Procreate, Figma, Adobe Photoshop, InDesign, HTML/CSS, React, Firebase, AI-assisted development tools', margin + 65, y);

  y += 13;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...black);
  doc.text('Media & Film:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoal);
  doc.text('Film Direction, Cinematography, Video Editing (Premiere Pro, LumaFusion, Shotcut), Multilingual Subtitling', margin + 65, y);

  // 02 RELEVANT EXPERIENCE
  addSectionHeading('02', 'Relevant Experience (Creative & Communications)');

  function addJob(role, company, dateLoc, bullets) {
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...black);
    doc.text(company, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    const dateWidth = doc.getTextWidth(dateLoc);
    doc.text(dateLoc, margin + contentWidth - dateWidth, y);

    y += 11;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...vermilion);
    doc.text(role, margin, y);

    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...charcoal);
    bullets.forEach(b => {
      const bLines = doc.splitTextToSize(`• ${b}`, contentWidth - 10);
      doc.text(bLines, margin + 6, y);
      y += bLines.length * 10;
    });
  }

  addJob('Copywriter & Itinerary Planner', 'Estela Superyacht Agency', 'May 2026 – June 2026 • Remote', [
    'Authored luxury travel itineraries and editorial content for yacht captains and high-net-worth clients in the Balearic Islands.',
    'Refined luxury brand storytelling and coordinated closely with an international team of travel writers and planners.'
  ]);

  addJob('Publicity Officer & Secretary', 'Edinburgh University Jazz Society', '2023 – 2026 • Edinburgh, UK', [
    'Conceived and designed comprehensive visual identities, poster campaigns, and social media content for weekly concerts and festivals.',
    'Managed venue liaison, committee communications, room bookings, and inclusive student engagement.'
  ]);

  addJob('Director, Cinematographer & Editor', "Independent Film: 'Where the Land Meets the Sky'", '2023 – 2026 • Edinburgh & International', [
    'Directed, filmed, and edited short documentary and experimental film projects investigating cultural narratives, language, and landscape.',
    'Engineered complete post-production workflow including colour grading, sound design, and multilingual subtitling (EN, JA, DE, RU).'
  ]);

  addJob('Hackathon Participant & Representative (Special Mention)', 'Goethe-Institut UK', 'Oct 2021 • London / Online', [
    'Collaborated in a multidisciplinary team developing an AI linguistic translation model switching register between formal and informal German.',
    'Awarded "Special Mention" for innovative linguistic problem solving and cross-cultural communication.'
  ]);

  addJob('Seasonal Bartender & Cross-Cultural Liaison', 'Melody Box', 'May 2023 – June 2023 • Nagasaki, Japan', [
    'Immersed in native Japanese professional workplace culture, communicating seamlessly in Japanese with team and customers.',
    'Acted as bilingual cultural bridge between local staff and international visitors while mastering regional hospitality techniques.'
  ]);

  // 03 EDUCATION
  addSectionHeading('03', 'Education');

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...black);
  doc.text('The University of Edinburgh', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text('2022 – 2026 • Edinburgh, UK', margin + contentWidth - 110, y);

  y += 11;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...vermilion);
  doc.text('MA (Hons) German and Russian Studies — First Class Honours', margin, y);

  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...charcoal);
  doc.text('• Awarded Distinction in Spoken Russian. Extensive coursework in cultural studies, translation, and German modern literature.', margin + 6, y);

  y += 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...black);
  doc.text('Study Abroad Year (2024–2025):', margin + 6, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoal);
  doc.text('Freie Universität Berlin (Oct 2024–Feb 2025) & London School of Languages, Bishkek (Mar 2025–Jul 2025)', margin + 140, y);

  y += 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...black);
  doc.text('Mill Hill County High School', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text('2015 – 2022 • London, UK', margin + contentWidth - 95, y);

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...charcoal);
  doc.text('• A Levels: German (A*), History (A), Mathematics (A), Japanese (A)', margin + 6, y);
  y += 10;
  doc.text('• 9 GCSEs, grades 9–7 including Maths and English', margin + 6, y);

  // 04 HOSPITALITY & COACHING (CONDENSED)
  addSectionHeading('04', 'Hospitality & Coaching (Condensed)');

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...black);
  doc.text('Hospitality, Event Service & Coaching Experience', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text('2021 – 2026 • Edinburgh & London', margin + contentWidth - 130, y);

  y += 11;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...charcoal);
  doc.text('Harajuku Kitchen (AA Rosette Front of House), Assembly Festival (Fringe Bartender), The Griffin (Bar Staff), Fun Scientists, Totteridge Tennis Club', margin, y);

  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...charcoal);
  const hospLines = doc.splitTextToSize(
    '• Transferable Skills: Thrived in high-pressure, fast-turnaround festival and fine-dining environments; mastered high-volume cash handling, multicultural customer mediation, rapid problem-solving, and youth coaching as an LTA Level 1 Tennis Coach.',
    contentWidth - 10
  );
  doc.text(hospLines, margin + 6, y);

  return doc;
}

function generateGermanLebenslauf() {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  const colDateWidth = 115;
  const colContentX = margin + colDateWidth + 10;
  const colContentWidth = contentWidth - colDateWidth - 10;

  // Colors
  const black = [20, 20, 20];
  const charcoal = [50, 50, 50];
  const vermilion = [218, 56, 32];
  const lightGray = [240, 240, 240];
  const muted = [110, 110, 110];

  let y = 45;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...black);
  doc.text('LEBENSLAUF', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...vermilion);
  doc.text('Keiko Phillips', margin + 160, y);

  y += 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...charcoal);
  doc.text('E-Mail: keikojphillips@outlook.com  |  Wohnorte: Edinburgh / London / Berlin  |  Abschluss: First Class Honours (2026)', margin, y);

  y += 10;
  doc.setDrawColor(...black);
  doc.setLineWidth(1.5);
  doc.line(margin, y, margin + contentWidth, y);

  function addSectionHeader(title) {
    y += 18;
    doc.setFillColor(...lightGray);
    doc.rect(margin, y - 9, contentWidth, 15, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...black);
    doc.text(title.toUpperCase(), margin + 6, y + 2);
    y += 10;
  }

  function addRow(dateStr, titleStr, descLines) {
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...charcoal);
    doc.text(dateStr, margin + 4, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...black);
    doc.text(titleStr, colContentX, y);

    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...charcoal);
    descLines.forEach(l => {
      const split = doc.splitTextToSize(l, colContentWidth);
      doc.text(split, colContentX, y);
      y += split.length * 9.5;
    });
  }

  // 1. PROFIL & BERUFSZIEL
  addSectionHeader('1. Profil & Sprachen (Überblick)');
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...charcoal);
  const pLines = doc.splitTextToSize(
    'Mehrsprachige Kreative mit First Class Honours der University of Edinburgh (Germanistik & Russistik). Schwerpunkt auf Kommunikation, Grafikdesign, Video-/Filmerstellung, Web und mehrsprachigem Texten. Sucht Positionen in Deutschland an der Schnittstelle von Sprache und kreativer Gestaltung.',
    contentWidth
  );
  doc.text(pLines, margin + 4, y);
  y += pLines.length * 10 + 4;

  addRow('Sprachkenntnisse', 'Englisch & Japanisch (Muttersprachen)', [
    'Deutsch: C1 (Fortgeschritten / Verhandlungssicher in Wort und Schrift)',
    'Russisch: B1 (Gute Mittelstufe, Auszeichnung für mündliche Sprachbeherrschung)'
  ]);

  addRow('Software & Tools', 'Design, Web & Multimedia', [
    'Design: Procreate, Figma, Adobe Photoshop, InDesign, Typografie, Plakat- & Buchgestaltung',
    'Web: HTML/CSS, React, Firebase, Tailwind CSS, KI-gestützte Entwicklungswerkzeuge',
    'Video & Audio: Filmregie, Premiere Pro, LumaFusion, Shotcut, mehrsprachige Untertitelung'
  ]);

  // 2. RELEVANTE BERUFSERFAHRUNG
  addSectionHeader('2. Relevante Berufserfahrung & Kreativprojekte');

  addRow('05/2026 – 06/2026', 'Estela Superyacht Agency (Remote) – Copywriterin & Reiseroutenplanerin', [
    'Erstellung anspruchsvoller redaktioneller Texte und Reiserouten für Yachtkapitäne auf den Balearen.',
    'Entwicklung von markengerechtem Storytelling im Bereich Luxusreisen in internationaler Abstimmung.'
  ]);

  addRow('10/2023 – 06/2026', 'Edinburgh University Jazz Society – Öffentlichkeitsbeauftragte & Schriftführerin', [
    'Verantwortlich für die visuelle Identität, Plakatkampagnen und Social-Media-Marketing aller Konzerte.',
    'Koordination von Veranstaltungsorten, Raumreservierungen und Künstlerbetreuung.'
  ]);

  addRow('2023 – 2026', "Film- & Videoproduktion – Regisseurin & Cutterin ('Where the Land Meets the Sky')", [
    'Regie, Kamera und Schnitt von Kurz- und Dokumentarfilmen über Landschaft, Identität und Sprache.',
    'Vollständige Postproduktion inklusive Farbkorrektur, Sounddesign und Untertiteln in EN, JA, DE, RU.'
  ]);

  addRow('10/2021', 'Goethe-Institut UK – Teilnehmerin KI-Hackathon („Besondere Erwähnung“)', [
    'Mitentwicklung eines Sprachmodells zur automatisierten Registeranpassung (formell/informell im Deutschen).',
    'Ausgezeichnet mit „Special Mention“ für innovative linguistische Lösungsansätze.'
  ]);

  addRow('05/2023 – 06/2023', 'Melody Box (Nagasaki, Japan) – Saisonale Barmitarbeiterin', [
    'Vollständige sprachliche und berufliche Einbindung in ein japanisches Arbeitsumfeld.',
    'Kulturelle und sprachliche Vermittlung zwischen lokalem Personal und internationalen Gästen.'
  ]);

  // 3. AUSBILDUNG & STUDIUM
  addSectionHeader('3. Ausbildung & Studium');

  addRow('09/2022 – 06/2026', 'The University of Edinburgh – MA (Hons) German and Russian Studies', [
    'Abschluss: First Class Honours (Auszeichnung für mündliche Sprachbeherrschung in Russisch)',
    'Schwerpunkte: Deutsche Literatur und Kultur, Übersetzungswissenschaft, Sprachvermittlung'
  ]);

  addRow('10/2024 – 02/2025', 'Freie Universität Berlin – Auslandssemester', [
    'Vertiefung in Germanistik, Kulturtheorie und akademischem Schreiben auf Deutsch'
  ]);

  addRow('03/2025 – 07/2025', 'London School of Languages (Bischkek, Kirgisistan) – Sprachstudium', [
    'Intensives russisches Sprach- und Kulturprogramm in Zentralasien'
  ]);

  addRow('2015 – 2022', 'Mill Hill County High School (London, UK)', [
    'A-Levels: Deutsch (A*), Geschichte (A), Mathematik (A), Japanisch (A)',
    '9 GCSEs mit Noten 9–7 inklusive Mathematik und Englisch'
  ]);

  // 4. GASTRONOMIE & COACHING
  addSectionHeader('4. Gastronomie, Service & Coaching (Transferierbare Kompetenzen)');

  addRow('2021 – 2026', 'Gastronomie & Jugendcoaching (Edinburgh & London)', [
    'Stationen: Harajuku Kitchen (AA Rosette Front of House), Assembly Festival (Fringe Bar), The Griffin London, Fun Scientists (Hortassistenz), Totteridge Tennis Club (LTA Tennistrainerin)',
    'Kompetenzen: Belastbarkeit bei Großveranstaltungen, exzellente Serviceorientierung, Kassenführung, Konfliktlösung und Teamführung im Schichtdienst.'
  ]);

  return doc;
}

// Generate both
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const cvEn = generateEnglishCV();
const enPath = path.join(publicDir, 'Keiko_Phillips_CV_English.pdf');
fs.writeFileSync(enPath, Buffer.from(cvEn.output('arraybuffer')));
console.log('Generated:', enPath);

const cvDe = generateGermanLebenslauf();
const dePath = path.join(publicDir, 'Keiko_Phillips_Lebenslauf_Deutsch.pdf');
fs.writeFileSync(dePath, Buffer.from(cvDe.output('arraybuffer')));
console.log('Generated:', dePath);
