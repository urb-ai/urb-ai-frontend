---
name: urbai-docx
description: "Folosește acest skill ori de câte ori trebuie să generezi un document Word (.docx) în UrbAI: Memoriu PUZ, Memoriu PUD, RLU, Aviz de Oportunitate, Certificat de Urbanism sau orice alt document urbanistic românesc. Skill-ul acoperă: generare document nou din date wizard + text AI, populare template .docx existent cu date proiect, export profesional cu antet firmă, tabel indicatori, TOC, header/footer."
---

# UrbAI — Generare Documente DOCX

## Stack & Librării

| Task | Tool |
|------|------|
| Document nou programatic | `docx` npm (`npm install docx`) |
| Template existent (.docx firmă) | unpack XML → injectează → repack |
| Validare output | `python scripts/office/validate.py` |

---

## Structura Standard Document Urbanistic

Orice document generat de UrbAI respectă această structură:

```
1. Antet (Header)
   - Logo firmă proiectant (stânga) + nr. document + dată (dreapta)
   - Linie separator albastră (#2563eb)

2. Titlu document
   - Ex: "MEMORIU DE PREZENTARE — Plan Urbanistic Zonal"
   - Font Arial Bold 16pt, centrat, albastru (#2563eb)

3. Bloc Date Esențiale (tabel 2 coloane)
   - Beneficiar, adresă, nr. cadastral, suprafață teren
   - Proiectant, CUI, șef proiect

4. Secțiuni generate de AI (1...N)
   - Heading Arial Bold 13pt albastru
   - Body Arial 11pt justified, spațiere 1.15

5. Tabel Indicatori Urbanistici (dacă există)
   - POT, CUT, Rh, retragerile, spații verzi, parcaje

6. Concluzii

7. Semnături (tabel: Proiectant / Beneficiar / Verificator)

8. Footer
   - Pagina X / Y | Numele firmei | Data
```

---

## Creare Document Nou cu `docx` npm

### Setup minimal

```javascript
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, NumberFormat, LevelFormat,
  TabStopType, TabStopPosition, PageBreak
} from 'docx';
import { saveAs } from 'file-saver'; // sau URL.createObjectURL pentru browser
```

### Pagină A4 — configurare obligatorie UrbAI

```javascript
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Arial', size: 22 } } // 11pt default
    },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal',
        run: { size: 26, bold: true, color: '2563EB', font: 'Arial' },
        paragraph: {
          spacing: { before: 280, after: 140 },
          outlineLevel: 0 // obligatoriu pentru TOC
        }
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal',
        run: { size: 24, bold: true, color: '2563EB', font: 'Arial' },
        paragraph: {
          spacing: { before: 200, after: 100 },
          outlineLevel: 1
        }
      },
      {
        id: 'BodyText', name: 'Body Text', basedOn: 'Normal',
        run: { size: 22, font: 'Arial', color: '1F2937' },
        paragraph: {
          spacing: { line: 276, lineRule: 'auto', after: 120 }, // 1.15 line height
          alignment: AlignmentType.JUSTIFIED
        }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4 în DXA
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1701 } // 2cm top/right/bottom, 3cm stânga
      }
    },
    headers: { default: buildHeader(wizardData) },
    footers: { default: buildFooter(wizardData) },
    children: [/* conținut */]
  }]
});
```

### Header cu logo + nr. document

```javascript
function buildHeader(data) {
  return new Header({
    children: [
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '2563EB', space: 1 } },
        tabStops: [{ type: TabStopType.RIGHT, position: 9026 }],
        children: [
          new TextRun({ text: data.firmaProiectant || 'Firma Proiectant', bold: true, size: 18 }),
          new TextRun({ text: `\tNr. ${data.nrDocument || '___'} / ${new Date().getFullYear()}`, size: 18, color: '6B7280' })
        ]
      })
    ]
  });
}
```

### Footer cu paginare

```javascript
function buildFooter(data) {
  return new Footer({
    children: [
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 2, color: 'E5E7EB', space: 1 } },
        tabStops: [
          { type: TabStopType.CENTER, position: 4513 },
          { type: TabStopType.RIGHT, position: 9026 }
        ],
        children: [
          new TextRun({ text: data.firmaProiectant || '', size: 16, color: '9CA3AF' }),
          new TextRun({ text: '\t', size: 16 }),
          new PageNumber({ size: 16, color: '9CA3AF' }),
          new TextRun({ text: '\t' + new Date().toLocaleDateString('ro-RO'), size: 16, color: '9CA3AF' })
        ]
      })
    ]
  });
}
```

### Tabel Date Esențiale (2 coloane)

```javascript
function buildDateEsentiale(data) {
  const borderGray = { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' };
  const borders = { top: borderGray, bottom: borderGray, left: borderGray, right: borderGray };

  const row = (label, value) => new TableRow({
    children: [
      new TableCell({
        borders,
        width: { size: 3000, type: WidthType.DXA },
        shading: { fill: 'EFF6FF', type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, color: '1E3A5F' })] })]
      }),
      new TableCell({
        borders,
        width: { size: 6026, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: value || '—', size: 20 })] })]
      })
    ]
  });

  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: [3000, 6026],
    rows: [
      row('Beneficiar', data.beneficiar?.nume),
      row('Adresă beneficiar', data.beneficiar?.adresa),
      row('Amplasament', `${data.adresa}, ${data.localitate}, jud. ${data.judet}`),
      row('Nr. cadastral', data.nrCadastral),
      row('Suprafață teren', `${data.suprafataTeren} mp`),
      row('Proiectant', data.proiectant?.firma),
      row('Șef proiect', data.proiectant?.sefProiect),
    ]
  });
}
```

### Tabel Indicatori Urbanistici

```javascript
function buildTabelIndicatori(data) {
  const header = (text) => new TableCell({
    shading: { fill: '1E3A5F', type: ShadingType.CLEAR },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, bold: true, color: 'FFFFFF', size: 18 })]
    })]
  });

  const cell = (text, highlight = false) => new TableCell({
    shading: { fill: highlight ? 'EFF6FF' : 'FFFFFF', type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 140, right: 140 },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: text || '—', size: 20, bold: highlight })]
    })]
  });

  const w = 9026 / 4;
  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: [w, w, w, w],
    rows: [
      new TableRow({ children: [header('Indicator'), header('Existent'), header('Propus'), header('Admis PUG')] }),
      new TableRow({ children: [cell('POT (%)'), cell(data.potExistent), cell(data.pot, true), cell(data.potAdmisPug)] }),
      new TableRow({ children: [cell('CUT'), cell(data.cutExistent), cell(data.cut, true), cell(data.cutAdmisPug)] }),
      new TableRow({ children: [cell('Regim înălțime'), cell('—'), cell(data.regimInaltime, true), cell(data.rhAdmisPug)] }),
      new TableRow({ children: [cell('Spații verzi (%)'), cell('—'), cell(data.spatiiVerzi, true), cell('min. 20%')] }),
    ]
  });
}
```

### Secțiune text AI

```javascript
function buildSectiune(nr, titlu, textAI) {
  // Împarte textul AI în paragrafe după \n
  const paragrafe = (textAI || '').split('\n').filter(p => p.trim().length > 0);

  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun(`${nr}. ${titlu}`)]
    }),
    ...paragrafe.map(p => new Paragraph({
      style: 'BodyText',
      children: [new TextRun(p.trim())]
    }))
  ];
}
```

### Export ca Blob (browser)

```javascript
export async function generateDocxBlob(wizardData, aiSections) {
  const doc = new Document({ /* ... */ });
  return await Packer.toBlob(doc);
}

export function downloadDocx(blob, numeFisier) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = numeFisier; // ex: "PUZ-Proiect-Ionescu-2025.docx"
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

---

## Populare Template .docx al Firmei (Faza 3)

Când arhitectul uploadează propriul template Word:

```
1. unpack: python scripts/office/unpack.py template.docx unpacked/
2. Înlocuiește placeholder-ele în unpacked/word/document.xml:
   {beneficiar} → data.beneficiar.nume
   {nr_cadastral} → data.nrCadastral
   {text_obiect} → aiSections.obiect
   etc.
3. repack: python scripts/office/pack.py unpacked/ output.docx --original template.docx
```

Placeholder-ele în template Word se scriu ca `{nume_camp}` și se înlocuiesc cu str_replace în XML.

---

## Reguli Critice UrbAI

- **Font: Arial pretutindeni** — nu schimba fontul fără cerere explicită
- **Albastru: #2563EB** — culoarea brandului UrbAI, folosită pentru headinguri și accente
- **Pagină A4** — 11906 × 16838 DXA, margine stânga 3cm (1701 DXA), rest 2cm (1134 DXA)
- **NICIODATĂ `\n` în TextRun** — folosește Paragraph-uri separate
- **NICIODATĂ unicode bullets** — folosește LevelFormat.BULLET cu numbering config
- **ShadingType.CLEAR** — niciodată SOLID (cauzează fundal negru)
- **Tabele: dual widths** — setează `columnWidths` pe Table ȘI `width` pe fiecare TableCell
- **WidthType.DXA** — niciodată PERCENTAGE (se strică în Google Docs)
- **Text generat de AI** — împarte întotdeauna după `\n` și creează Paragraph-uri separate
- **Toate textele în română** — diacritice corecte (ă, â, î, ș, ț)

---

## Tipuri de Documente UrbAI

| Document | Secțiuni principale |
|----------|---------------------|
| Memoriu PUZ | Obiect, Situație existentă, Reglementări propuse, Concluzii |
| Memoriu PUD | Obiect, Amplasament, Propuneri, Concluzii |
| RLU | Dispoziții generale, Zone funcționale, Reglementări per zonă |
| Aviz Oportunitate | Solicitant, Amplasament, Justificare, Propunere rețea stradală |
| Certificat Urbanism | Date teren, Reglementări, Avize necesare |

---

## Dependențe

```bash
npm install docx file-saver
```

Server-side (Node.js): `Packer.toBuffer(doc)` → trimite ca stream
Browser (React): `Packer.toBlob(doc)` → `URL.createObjectURL`
