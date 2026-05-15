---
name: urbai-pdf
description: "Folosește acest skill când trebuie să generezi, convertești sau procesezi fișiere PDF în contextul UrbAI. Cazuri de utilizare: export document urbanistic ca PDF (din DOCX generat), generare PDF non-editabil pentru depunere la primărie, adăugare ștampilă/watermark pe documente, merge mai multe PDF-uri (memoriu + planșe + avize) într-un singur dosar, OCR pe documente scanate (CF, PUG), extragere text din planșe PDF."
---

# UrbAI — Procesare și Generare PDF

## Stack

| Task | Tool |
|------|------|
| Generare PDF nou | `reportlab` (Python) sau `jsPDF` (browser) |
| DOCX → PDF | LibreOffice headless (`soffice.py`) |
| Merge PDF-uri | `pypdf` |
| Split, rotate, watermark | `pypdf` sau `qpdf` |
| OCR documente scanate | `pytesseract` + `pdf2image` |
| Extragere text/tabele | `pdfplumber` |

---

## Cazuri de Utilizare UrbAI

### 1. Export Document ca PDF
Utilizatorul generează un memoriu tehnic → vrea PDF non-editabil pentru depunere oficială.

### 2. Dosar Complet (Merge)
Memoriu + RLU + Planșe + Avize → un singur PDF pentru depunere la primărie.

### 3. OCR pe Documente Uploadate
CF scanat, Plan cadastral, extras PUG → extrage text pentru auto-fill wizard.

### 4. Watermark "DRAFT" / Ștampilă
Document în lucru → adaugă watermark. Document final → adaugă ștampilă firmă.

---

## 1. DOCX → PDF (cea mai folosită operație)

```python
# Backend Node.js apelează un script Python
import subprocess
import os

def docx_to_pdf(docx_path, output_dir):
    """Convertește DOCX la PDF folosind LibreOffice headless."""
    result = subprocess.run(
        ['python', 'scripts/office/soffice.py',
         '--headless', '--convert-to', 'pdf',
         '--outdir', output_dir, docx_path],
        capture_output=True, text=True
    )
    pdf_name = os.path.splitext(os.path.basename(docx_path))[0] + '.pdf'
    return os.path.join(output_dir, pdf_name)
```

Sau direct din bash:
```bash
python scripts/office/soffice.py --headless --convert-to pdf memoriu.docx --outdir /output/
```

---

## 2. Generare PDF cu ReportLab (fișiere simple)

### PDF Document Urbanistic

```python
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT

def generate_pdf(wizard_data, ai_sections, output_path):
    # Pagină A4, margini: stânga 3cm, rest 2cm
    doc = SimpleDocTemplate(
        output_path, pagesize=A4,
        leftMargin=3*cm, rightMargin=2*cm,
        topMargin=2*cm, bottomMargin=2*cm
    )

    # Culori UrbAI
    BLUE_DARK  = colors.HexColor('#1E3A5F')
    BLUE_BRAND = colors.HexColor('#2563EB')
    BLUE_LIGHT = colors.HexColor('#EFF6FF')
    GRAY       = colors.HexColor('#6B7280')

    # Stiluri
    styles = getSampleStyleSheet()

    style_h1 = ParagraphStyle('H1UrbAI',
        fontName='Helvetica-Bold', fontSize=13,
        textColor=BLUE_BRAND, spaceBefore=20, spaceAfter=8,
        leading=18
    )
    style_body = ParagraphStyle('BodyUrbAI',
        fontName='Helvetica', fontSize=11,
        textColor=colors.HexColor('#1F2937'),
        alignment=TA_JUSTIFY, spaceBefore=4, spaceAfter=6,
        leading=15
    )
    style_label = ParagraphStyle('LabelUrbAI',
        fontName='Helvetica-Bold', fontSize=9,
        textColor=GRAY
    )

    story = []

    # Header firmă
    story.append(Paragraph(
        f"<font color='#1E3A5F'><b>{wizard_data.get('firma_proiectant', '')}</b></font>",
        ParagraphStyle('Firma', fontName='Helvetica-Bold', fontSize=14, textColor=BLUE_DARK)
    ))
    story.append(Spacer(1, 6))

    # Titlu document
    story.append(Paragraph(
        wizard_data.get('titlu_document', 'MEMORIU DE PREZENTARE — Plan Urbanistic Zonal'),
        ParagraphStyle('TitluDoc', fontName='Helvetica-Bold', fontSize=14,
                       textColor=BLUE_BRAND, alignment=TA_CENTER, spaceBefore=10, spaceAfter=16)
    ))

    # Tabel date esențiale
    date_rows = [
        ['Beneficiar', wizard_data.get('beneficiar_nume', '—')],
        ['Amplasament', f"{wizard_data.get('adresa', '')}, {wizard_data.get('localitate', '')}, jud. {wizard_data.get('judet', '')}"],
        ['Nr. cadastral', wizard_data.get('nr_cadastral', '—')],
        ['Suprafață teren', f"{wizard_data.get('suprafata_teren', '—')} mp"],
        ['Proiectant', wizard_data.get('firma_proiectant', '—')],
        ['Șef proiect', wizard_data.get('sef_proiect', '—')],
    ]

    tabel_date = Table(date_rows, colWidths=[5*cm, 11*cm])
    tabel_date.setStyle(TableStyle([
        ('FONTNAME',    (0,0), (-1,-1), 'Helvetica'),
        ('FONTNAME',    (0,0), (0,-1), 'Helvetica-Bold'),
        ('FONTSIZE',    (0,0), (-1,-1), 10),
        ('TEXTCOLOR',   (0,0), (0,-1), BLUE_DARK),
        ('TEXTCOLOR',   (1,0), (1,-1), colors.HexColor('#1F2937')),
        ('BACKGROUND',  (0,0), (0,-1), BLUE_LIGHT),
        ('BACKGROUND',  (1,0), (1,-1), colors.white),
        ('GRID',        (0,0), (-1,-1), 0.5, colors.HexColor('#E5E7EB')),
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [BLUE_LIGHT, colors.white]),
        ('TOPPADDING',  (0,0), (-1,-1), 6),
        ('BOTTOMPADDING',(0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(tabel_date)
    story.append(Spacer(1, 20))

    # Secțiuni AI
    sectiuni = [
        ('1. OBIECTUL DOCUMENTAȚIEI', ai_sections.get('obiect', '')),
        ('2. SITUAȚIA EXISTENTĂ',     ai_sections.get('situatie_existenta', '')),
        ('3. REGLEMENTĂRI PROPUSE',   ai_sections.get('reglementari', '')),
        ('4. CONCLUZII',              ai_sections.get('concluzii', '')),
    ]

    for titlu, text in sectiuni:
        story.append(Paragraph(titlu, style_h1))
        for paragraf in text.split('\n'):
            if paragraf.strip():
                story.append(Paragraph(paragraf.strip(), style_body))
        story.append(Spacer(1, 8))

    # Tabel indicatori
    story.append(Paragraph('INDICATORI URBANISTICI', style_h1))
    ind_rows = [
        ['Indicator', 'Existent', 'Propus', 'Admis PUG'],
        ['POT (%)',         '—', wizard_data.get('pot', '—'),  wizard_data.get('pot_pug', '—')],
        ['CUT',             '—', wizard_data.get('cut', '—'),  wizard_data.get('cut_pug', '—')],
        ['Regim înălțime',  '—', wizard_data.get('rh', '—'),   wizard_data.get('rh_pug', '—')],
        ['Spații verzi (%)', '—', wizard_data.get('spatii_verzi', '—'), 'min. 20%'],
    ]

    tabel_ind = Table(ind_rows, colWidths=[5*cm, 3.5*cm, 3.5*cm, 4*cm])
    tabel_ind.setStyle(TableStyle([
        ('FONTNAME',     (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTNAME',     (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE',     (0,0), (-1,-1), 10),
        ('TEXTCOLOR',    (0,0), (-1,0), colors.white),
        ('BACKGROUND',   (0,0), (-1,0), BLUE_DARK),
        ('TEXTCOLOR',    (2,1), (2,-1), BLUE_BRAND),
        ('FONTNAME',     (2,1), (2,-1), 'Helvetica-Bold'),
        ('ALIGN',        (1,0), (-1,-1), 'CENTER'),
        ('GRID',         (0,0), (-1,-1), 0.5, colors.HexColor('#E5E7EB')),
        ('ROWBACKGROUNDS',(0,1), (-1,-1), [colors.white, BLUE_LIGHT]),
        ('TOPPADDING',   (0,0), (-1,-1), 7),
        ('BOTTOMPADDING',(0,0), (-1,-1), 7),
        ('LEFTPADDING',  (0,0), (0,-1), 8),
    ]))
    story.append(tabel_ind)

    # Header și footer pe fiecare pagină
    def on_page(canvas, doc):
        canvas.saveState()
        # Footer
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(GRAY)
        canvas.drawString(3*cm, 1.2*cm, wizard_data.get('firma_proiectant', ''))
        canvas.drawRightString(A4[0] - 2*cm, 1.2*cm,
                               f"Pagina {doc.page}")
        # Linie footer
        canvas.setStrokeColor(colors.HexColor('#E5E7EB'))
        canvas.setLineWidth(0.5)
        canvas.line(3*cm, 1.5*cm, A4[0] - 2*cm, 1.5*cm)
        canvas.restoreState()

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    return output_path
```

---

## 3. Merge PDF-uri (Dosar Complet)

```python
from pypdf import PdfReader, PdfWriter

def merge_dosar(pdf_paths, output_path):
    """
    Combină memoriu + RLU + planșe + avize într-un singur PDF.
    pdf_paths: listă de căi în ordinea dorită
    """
    writer = PdfWriter()

    for path in pdf_paths:
        reader = PdfReader(path)
        for page in reader.pages:
            writer.add_page(page)

    with open(output_path, 'wb') as f:
        writer.write(f)

    return output_path

# Exemplu utilizare:
dosar = merge_dosar([
    'memoriu_puz.pdf',
    'rlu.pdf',
    'plansa_reglementari.pdf',
    'aviz_oportunitate.pdf',
], 'dosar_complet_puz.pdf')
```

---

## 4. Watermark "DRAFT"

```python
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import io

def add_watermark(input_pdf, output_pdf, text='DRAFT'):
    # Creează pagina watermark
    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=A4)
    c.saveState()
    c.setFont('Helvetica-Bold', 60)
    c.setFillColorRGB(0.85, 0.85, 0.85, alpha=0.4)
    c.translate(A4[0]/2, A4[1]/2)
    c.rotate(45)
    c.drawCentredString(0, 0, text)
    c.restoreState()
    c.save()
    packet.seek(0)

    watermark_page = PdfReader(packet).pages[0]
    reader = PdfReader(input_pdf)
    writer = PdfWriter()

    for page in reader.pages:
        page.merge_page(watermark_page)
        writer.add_page(page)

    with open(output_pdf, 'wb') as f:
        writer.write(f)
```

---

## 5. OCR pe Documente Scanate (CF, PUG)

```python
import pytesseract
from pdf2image import convert_from_path

def ocr_document(pdf_path, lang='ron'):
    """
    Extrage text din PDF scanat.
    lang='ron' pentru română, 'ron+eng' pentru mix.
    Returneaza text complet pentru toate paginile.
    """
    images = convert_from_path(pdf_path, dpi=300)
    full_text = ''

    for i, image in enumerate(images):
        text = pytesseract.image_to_string(image, lang=lang)
        full_text += f'\n--- Pagina {i+1} ---\n{text}'

    return full_text

# Extragere date structurate din CF
def extract_cf_data(pdf_path):
    text = ocr_document(pdf_path)
    # Claude Vision e mai bun pentru CF — trimite imaginea la AI
    # OCR e fallback când nu există Vision
    return {
        'raw_text': text,
        'needs_ai_extraction': True  # semnalează că trebuie AI pentru parsare
    }
```

---

## 6. Extragere Tabele din PDF (pdfplumber)

```python
import pdfplumber
import pandas as pd

def extract_tables_from_pug(pdf_path):
    """Extrage tabele din extras PUG (zone funcționale, indicatori)."""
    all_tables = []

    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            tables = page.extract_tables()
            for table in tables:
                if table and len(table) > 1:
                    df = pd.DataFrame(table[1:], columns=table[0])
                    df['_pagina'] = i + 1
                    all_tables.append(df)

    return all_tables
```

---

## Browser — jsPDF (React)

```javascript
import jsPDF from 'jspdf';

export function generatePdfBrowser(wizardData, aiSections) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Font și culori de bază
  doc.setFont('helvetica');
  doc.setTextColor(30, 58, 95); // BLUE_DARK

  // Titlu
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(wizardData.titluDocument || 'MEMORIU PUZ', 105, 25, { align: 'center' });

  // Body
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);

  let y = 45;
  const sections = [
    { titlu: '1. Obiectul documentației', text: aiSections.obiect },
    { titlu: '2. Situația existentă', text: aiSections.situatie_existenta },
  ];

  sections.forEach(s => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(s.titlu, 20, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    const lines = doc.splitTextToSize(s.text || '', 170);
    doc.text(lines, 20, y);
    y += lines.length * 6 + 10;

    if (y > 260) { doc.addPage(); y = 20; }
  });

  doc.save(`${wizardData.titluProiect || 'document'}.pdf`);
}
```

---

## Reguli Critice UrbAI

- **Preferă DOCX → PDF via LibreOffice** față de generare PDF direct — calitate mai bună, formatare mai fidelă
- **ReportLab pentru PDF-uri simple** (rapoarte, dovezi, ștampile)
- **jsPDF pentru browser** — când nu ai backend disponibil (Faza 1)
- **NICIODATĂ Unicode subscript/superscript în ReportLab** — folosește `<sub>` și `<super>` în Paragraph
- **OCR: `lang='ron'`** — pentru documente românești
- **Merge: ordinea contează** — memoriu → RLU → planșe → avize
- **Watermark alpha 0.3-0.4** — vizibil dar nu acoperă textul
- **Diacritice** — ă â î ș ț — verifică că fontul le suportă (Helvetica le suportă în ReportLab)
- **Margini A4**: stânga 3cm, rest 2cm — standard documente urbanistice românești

---

## Dependențe

```bash
# Server Python
pip install pypdf pdfplumber reportlab pdf2image pytesseract --break-system-packages

# Browser
npm install jspdf

# Sistem (pentru OCR)
apt-get install tesseract-ocr tesseract-ocr-ron poppler-utils
```
