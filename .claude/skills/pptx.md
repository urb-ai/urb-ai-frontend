---
name: urbai-pptx
description: "Folosește acest skill când trebuie să generezi prezentări PowerPoint (.pptx) în contextul UrbAI. Cazuri de utilizare: prezentare PUZ pentru consiliul local, pitch deck pentru beneficiar, prezentare pentru avizare publică, raport de activitate UrbAI, deck demo/onboarding pentru utilizatori noi."
---

# UrbAI — Generare Prezentări PPTX

## Stack

| Task | Tool |
|------|------|
| Creare de la zero | `pptxgenjs` npm (`npm install -g pptxgenjs`) |
| Editare template existent | unpack XML → editează → repack |
| Preview slides | `python scripts/thumbnail.py output.pptx` |
| Validare vizuală | Convertire la imagini cu LibreOffice |

---

## Tipuri de Prezentări UrbAI

| Tip | Destinatar | Slide-uri tipice |
|-----|-----------|-----------------|
| Prezentare PUZ Consiliu Local | Consilieri locali | Amplasament, Situație existentă, Propuneri, Indicatori, Plan reglementări |
| Prezentare Dezbatere Publică | Cetățeni | Context, Ce propunem, Beneficii, Întrebări |
| Pitch Deck Beneficiar | Investitor/dezvoltator | Proiect, Plan, Indicatori, Costuri, Timeline |
| Demo UrbAI | Potențiali clienți | Problemă, Soluție, Demo, Prețuri, Contact |

---

## Creare cu pptxgenjs

### Setup și tema UrbAI

```javascript
const pptx = new PptxGenJS();

// Dimensiuni slide (widescreen 16:9)
pptx.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5"

// Master slide UrbAI (aplică pe toate slide-urile)
pptx.defineSlideMaster({
  title: 'URBAI_MASTER',
  background: { color: 'FFFFFF' },
  objects: [
    // Linie albastră sus
    { line: { x: 0, y: 0, w: '100%', h: 0, line: { color: '2563EB', width: 4 } } },
    // Logo text stânga jos
    { text: {
      text: 'UrbAI',
      options: { x: 0.3, y: 7.1, w: 2, h: 0.3, fontSize: 9, color: '9CA3AF', fontFace: 'Arial' }
    }},
    // Număr pagină dreapta jos
    { text: {
      text: '',
      options: { x: 12.5, y: 7.1, w: 0.7, h: 0.3, fontSize: 9, color: '9CA3AF',
                 fontFace: 'Arial', align: 'right' }
    }}
  ],
  slideNumber: { x: 12.5, y: 7.1, color: '9CA3AF', fontSize: 9 }
});
```

### Slide Titlu (primul slide)

```javascript
function addTitleSlide(pptx, data) {
  const slide = pptx.addSlide({ masterName: 'URBAI_MASTER' });

  // Fundal albastru închis
  slide.background = { color: '1E3A5F' };

  // Titlu mare
  slide.addText(data.titluPrezentare, {
    x: 0.8, y: 2.2, w: 11.7, h: 1.5,
    fontSize: 40, bold: true, color: 'FFFFFF',
    fontFace: 'Arial', align: 'center'
  });

  // Subtitlu
  slide.addText(data.subtitlu || `${data.localitate} · ${data.judet}`, {
    x: 0.8, y: 3.8, w: 11.7, h: 0.5,
    fontSize: 18, color: '93C5FD',
    fontFace: 'Arial', align: 'center'
  });

  // Data și proiectant
  slide.addText(`${data.firmaProiectant} · ${new Date().toLocaleDateString('ro-RO')}`, {
    x: 0.8, y: 6.5, w: 11.7, h: 0.4,
    fontSize: 11, color: '6B7280',
    fontFace: 'Arial', align: 'center'
  });

  return slide;
}
```

### Slide Date Proiect (2 coloane)

```javascript
function addDateProiect(pptx, data) {
  const slide = pptx.addSlide({ masterName: 'URBAI_MASTER' });

  // Titlu slide
  slide.addText('Date proiect', {
    x: 0.4, y: 0.2, w: 12.5, h: 0.6,
    fontSize: 24, bold: true, color: '1E3A5F', fontFace: 'Arial'
  });

  // Linie separator sub titlu
  slide.addShape(pptx.ShapeType.line, {
    x: 0.4, y: 0.85, w: 12.5, h: 0,
    line: { color: '2563EB', width: 2 }
  });

  // Coloana stângă — beneficiar
  const leftItems = [
    ['Beneficiar', data.beneficiar?.nume],
    ['Amplasament', `${data.adresa}, ${data.localitate}`],
    ['Județ', data.judet],
    ['Nr. cadastral', data.nrCadastral],
    ['Suprafață teren', `${data.suprafataTeren} mp`],
  ];

  // Coloana dreaptă — indicatori
  const rightItems = [
    ['POT propus', `${data.pot}%`],
    ['CUT propus', data.cut],
    ['Regim înălțime', data.regimInaltime],
    ['Funcțiune', data.functiunePropusa],
    ['Spații verzi', `min. ${data.spatiiVerzi}%`],
  ];

  leftItems.forEach(([label, value], i) => {
    const y = 1.1 + i * 0.95;
    // Label
    slide.addText(label, { x: 0.4, y, w: 2.8, h: 0.35, fontSize: 9, color: '6B7280', fontFace: 'Arial' });
    // Value
    slide.addText(value || '—', { x: 0.4, y: y + 0.35, w: 5.8, h: 0.45, fontSize: 13, bold: true, color: '1E3A5F', fontFace: 'Arial' });
  });

  rightItems.forEach(([label, value], i) => {
    const y = 1.1 + i * 0.95;
    const x = 7.0;
    slide.addText(label, { x, y, w: 2.8, h: 0.35, fontSize: 9, color: '6B7280', fontFace: 'Arial' });
    // Card indicator
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: y + 0.3, w: 5.8, h: 0.55,
      fill: { color: 'EFF6FF' }, line: { color: 'BFDBFE', width: 1 }
    });
    slide.addText(value || '—', { x: x + 0.2, y: y + 0.35, w: 5.4, h: 0.45, fontSize: 14, bold: true, color: '2563EB', fontFace: 'Arial' });
  });

  return slide;
}
```

### Slide Indicatori (4 carduri mari)

```javascript
function addIndicatoriSlide(pptx, data) {
  const slide = pptx.addSlide({ masterName: 'URBAI_MASTER' });

  slide.addText('Indicatori urbanistici propuși', {
    x: 0.4, y: 0.2, w: 12.5, h: 0.6,
    fontSize: 24, bold: true, color: '1E3A5F', fontFace: 'Arial'
  });

  const carduri = [
    { label: 'POT maxim',        value: `${data.pot}%`,          sub: 'Procent ocupare teren', color: '2563EB' },
    { label: 'CUT maxim',        value: data.cut,                  sub: 'Coeficient utilizare teren', color: '7C3AED' },
    { label: 'Regim înălțime',   value: data.regimInaltime,        sub: 'Nr. niveluri', color: '059669' },
    { label: 'Spații verzi min.',  value: `${data.spatiiVerzi}%`, sub: 'Din suprafața totală', color: 'D97706' },
  ];

  carduri.forEach((card, i) => {
    const x = 0.4 + (i % 2) * 6.5;
    const y = 1.2 + Math.floor(i / 2) * 2.8;

    // Card background
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 6.1, h: 2.4,
      fill: { color: 'F8FAFC' },
      line: { color: 'E2E8F0', width: 1 }
    });

    // Accent bar sus
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 6.1, h: 0.08,
      fill: { color: card.color }, line: { color: card.color, width: 0 }
    });

    // Label
    slide.addText(card.label, {
      x: x + 0.3, y: y + 0.25, w: 5.5, h: 0.35,
      fontSize: 11, color: '6B7280', fontFace: 'Arial'
    });

    // Valoare mare
    slide.addText(card.value || '—', {
      x: x + 0.3, y: y + 0.6, w: 5.5, h: 1.1,
      fontSize: 48, bold: true, color: card.color, fontFace: 'Arial'
    });

    // Sub-label
    slide.addText(card.sub, {
      x: x + 0.3, y: y + 1.85, w: 5.5, h: 0.35,
      fontSize: 9, color: '9CA3AF', fontFace: 'Arial', italic: true
    });
  });

  return slide;
}
```

### Slide Text (secțiune memoriu)

```javascript
function addTextSlide(pptx, titlu, textAI) {
  const slide = pptx.addSlide({ masterName: 'URBAI_MASTER' });

  slide.addText(titlu, {
    x: 0.4, y: 0.2, w: 12.5, h: 0.6,
    fontSize: 22, bold: true, color: '1E3A5F', fontFace: 'Arial'
  });

  slide.addShape(pptx.ShapeType.line, {
    x: 0.4, y: 0.85, w: 12.5, h: 0,
    line: { color: '2563EB', width: 2 }
  });

  // Împarte textul în max 4 paragrafe vizibile
  const paragrafe = (textAI || '').split('\n').filter(p => p.trim()).slice(0, 4);

  slide.addText(paragrafe.join('\n\n'), {
    x: 0.4, y: 1.05, w: 12.5, h: 6.2,
    fontSize: 13, color: '374151', fontFace: 'Arial',
    valign: 'top', align: 'left', paraSpaceAfter: 8
  });

  return slide;
}
```

### Export

```javascript
export async function generatePptxBlob(wizardData, aiSections) {
  const pptx = new PptxGenJS();
  // defineSlideMaster(...)

  addTitleSlide(pptx, wizardData);
  addDateProiect(pptx, wizardData);
  addTextSlide(pptx, '1. Obiectul documentației', aiSections.obiect);
  addTextSlide(pptx, '2. Situația existentă', aiSections.situatie_existenta);
  addIndicatoriSlide(pptx, wizardData);
  addTextSlide(pptx, '3. Reglementări propuse', aiSections.reglementari);
  addTextSlide(pptx, '4. Concluzii', aiSections.concluzii);

  return await pptx.write({ outputType: 'blob' });
}
```

---

## Reguli Critice UrbAI

- **Layout: LAYOUT_WIDE (16:9)** — standard pentru prezentări moderne
- **Font: Arial pretutindeni** — consistent cu DOCX și XLSX
- **Culori brand**: `1E3A5F` (titluri), `2563EB` (accente), `EFF6FF` (fundal carduri)
- **Slide titlu: fundal `1E3A5F` (albastru închis)** — text alb, nu invers
- **NICIODATĂ linii decorative sub titluri** — folosește spațiu sau culoare fundal
- **NICIODATĂ bare colorate full-width** — arată AI-generated, nu profesional
- **Text: max 6-7 rânduri per slide** — dacă e mai mult, împarte pe 2 slide-uri
- **Verifică overflow text** — `extract-text output.pptx` după generare
- **Fiecare slide are un element vizual** — shape, card, icon, sau tabel
- **Toate textele în română** — diacritice corecte

---

## QA Obligatoriu

```bash
# 1. Verifică conținut
extract-text output.pptx

# 2. Convertire la imagini pentru inspecție vizuală
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
rm -f slide-*.jpg
pdftoppm -jpeg -r 150 output.pdf slide
ls -1 "$PWD"/slide-*.jpg
```

---

## Dependențe

```bash
npm install pptxgenjs
```
