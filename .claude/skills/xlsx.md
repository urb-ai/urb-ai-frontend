---
name: urbai-xlsx
description: "Folosește acest skill când trebuie să generezi sau să editezi fișiere Excel (.xlsx) în contextul UrbAI. Cazuri de utilizare: deviz estimativ costuri proiect, tabel indicatori urbanistici comparativi, situație suprafețe, calcul POT/CUT, rapoarte usage/facturare pentru admin dashboard, export date proiecte în format tabelar, foi de calcul pentru arhitecți."
---

# UrbAI — Generare Fișiere Excel (XLSX)

## Stack

| Task | Tool |
|------|------|
| Creare / editare cu formule și formatare | `openpyxl` (Python) |
| Analiză date, export simplu | `pandas` (Python) |
| Browser (React, fără server) | `SheetJS / xlsx` npm |

---

## Cazuri de Utilizare UrbAI

### 1. Deviz Estimativ Costuri Proiect
Generat automat din datele wizardului — suprafețe, tarife, TVA 21%.

### 2. Tabel Indicatori Urbanistici
Comparație Existent / Propus / Admis PUG pentru POT, CUT, Rh, spații verzi.

### 3. Raport Usage Admin
Număr documente generate, credite consumate, venituri per plan (Free/Pro/Business/Enterprise).

### 4. Situație Suprafețe (pentru RLU)
Zone funcționale, suprafețe, procente din total.

---

## Generare Server-Side cu openpyxl (Node.js backend)

### Deviz Estimativ — exemplu complet

```python
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def generate_deviz(wizard_data, output_path):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Deviz Estimativ"

    # Culori UrbAI
    BLUE_DARK  = "1E3A5F"
    BLUE_BRAND = "2563EB"
    BLUE_LIGHT = "EFF6FF"
    GRAY_TEXT  = "6B7280"
    WHITE      = "FFFFFF"

    # Lățimi coloane
    ws.column_dimensions['A'].width = 35
    ws.column_dimensions['B'].width = 15
    ws.column_dimensions['C'].width = 15
    ws.column_dimensions['D'].width = 15
    ws.column_dimensions['E'].width = 18

    # Header firmă
    ws.merge_cells('A1:E1')
    ws['A1'] = wizard_data.get('firma_proiectant', 'Firma Proiectant')
    ws['A1'].font = Font(name='Arial', bold=True, size=14, color=BLUE_DARK)
    ws['A1'].alignment = Alignment(horizontal='left')

    ws.merge_cells('A2:E2')
    ws['A2'] = f"DEVIZ ESTIMATIV — {wizard_data.get('titlu_proiect', 'Proiect')}"
    ws['A2'].font = Font(name='Arial', bold=True, size=12, color=BLUE_BRAND)
    ws['A2'].alignment = Alignment(horizontal='center')

    ws.row_dimensions[2].height = 28

    # Spațiu
    ws.row_dimensions[3].height = 8

    # Header tabel
    headers = ['Descriere', 'U.M.', 'Cantitate', 'Preț unitar (€)', 'Total (€)']
    for col, h in enumerate(headers, 1):
        cell = ws.cell(row=4, column=col, value=h)
        cell.font = Font(name='Arial', bold=True, size=10, color=WHITE)
        cell.fill = PatternFill('solid', fgColor=BLUE_DARK)
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = Border(
            bottom=Side(style='thin', color='FFFFFF'),
            right=Side(style='thin', color='FFFFFF')
        )
    ws.row_dimensions[4].height = 30

    # Rânduri de date
    rows = wizard_data.get('deviz_rows', [
        ('Documentație PUZ — Memoriu tehnic', 'buc', 1, 500),
        ('Documentație PUZ — RLU', 'buc', 1, 300),
        ('Planșe urbanistice', 'buc', 4, 150),
        ('Aviz oportunitate', 'buc', 1, 200),
    ])

    data_start = 5
    for i, (desc, um, cant, pret) in enumerate(rows):
        row = data_start + i
        fill_color = BLUE_LIGHT if i % 2 == 0 else WHITE
        border = Border(
            bottom=Side(style='thin', color='E5E7EB'),
            right=Side(style='thin', color='E5E7EB')
        )

        ws.cell(row=row, column=1, value=desc).font = Font(name='Arial', size=10)
        ws.cell(row=row, column=2, value=um).alignment = Alignment(horizontal='center')
        ws.cell(row=row, column=3, value=cant).alignment = Alignment(horizontal='center')
        ws.cell(row=row, column=4, value=pret).number_format = '#,##0.00'
        # FORMULĂ — nu hardcoda valoarea calculată
        ws.cell(row=row, column=5).value = f'=C{row}*D{row}'
        ws.cell(row=row, column=5).number_format = '#,##0.00'

        for col in range(1, 6):
            ws.cell(row=row, column=col).fill = PatternFill('solid', fgColor=fill_color)
            ws.cell(row=row, column=col).border = border

    last_data_row = data_start + len(rows) - 1
    total_row = last_data_row + 1
    tva_row = total_row + 1
    grand_row = tva_row + 1

    # Subtotal, TVA, Total
    def summary_row(row_num, label, formula, is_grand=False):
        ws.merge_cells(f'A{row_num}:D{row_num}')
        ws[f'A{row_num}'] = label
        ws[f'A{row_num}'].font = Font(name='Arial', bold=True, size=10,
                                       color=WHITE if is_grand else BLUE_DARK)
        ws[f'A{row_num}'].fill = PatternFill('solid', fgColor=BLUE_DARK if is_grand else BLUE_LIGHT)
        ws[f'A{row_num}'].alignment = Alignment(horizontal='right')

        ws[f'E{row_num}'] = formula
        ws[f'E{row_num}'].number_format = '#,##0.00'
        ws[f'E{row_num}'].font = Font(name='Arial', bold=True, size=10,
                                       color=WHITE if is_grand else BLUE_DARK)
        ws[f'E{row_num}'].fill = PatternFill('solid', fgColor=BLUE_DARK if is_grand else BLUE_LIGHT)

    summary_row(total_row, 'Subtotal (fără TVA)', f'=SUM(E{data_start}:E{last_data_row})')
    summary_row(tva_row,   f'TVA (21%)',           f'=E{total_row}*0.21')
    summary_row(grand_row, 'TOTAL CU TVA',         f'=E{total_row}+E{tva_row}', is_grand=True)

    ws.row_dimensions[grand_row].height = 25

    # Footer
    footer_row = grand_row + 2
    ws[f'A{footer_row}'] = f"Generat automat de UrbAI · {wizard_data.get('data', '')}"
    ws[f'A{footer_row}'].font = Font(name='Arial', size=8, color=GRAY_TEXT, italic=True)

    wb.save(output_path)
    return output_path
```

---

## Generare Browser-Side cu SheetJS (React)

```javascript
import * as XLSX from 'xlsx';

export function generateDevizXlsx(wizardData, aiRows) {
  const wb = XLSX.utils.book_new();

  // Date principale
  const headerRows = [
    [wizardData.firmaProiectant],
    [`DEVIZ ESTIMATIV — ${wizardData.titluProiect}`],
    [],
    ['Descriere', 'U.M.', 'Cantitate', 'Preț unitar (€)', 'Total (€)'],
  ];

  const dataRows = aiRows.map(r => [r.descriere, r.um, r.cantitate, r.pret, r.cantitate * r.pret]);

  const allRows = [
    ...headerRows,
    ...dataRows,
    [],
    ['', '', '', 'Subtotal', { f: `SUM(E5:E${4 + dataRows.length})` }],
    ['', '', '', 'TVA 21%',  { f: `E${5 + dataRows.length}*0.21` }],
    ['', '', '', 'TOTAL',    { f: `E${5 + dataRows.length}+E${6 + dataRows.length}` }],
  ];

  const ws = XLSX.utils.aoa_to_sheet(allRows);

  // Lățimi coloane
  ws['!cols'] = [{ wch: 40 }, { wch: 10 }, { wch: 12 }, { wch: 18 }, { wch: 18 }];

  XLSX.utils.book_append_sheet(wb, ws, 'Deviz Estimativ');

  // Download
  XLSX.writeFile(wb, `Deviz-${wizardData.titluProiect || 'proiect'}.xlsx`);
}
```

---

## Tabel Indicatori Urbanistici

```python
def generate_indicatori(data, output_path):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Indicatori Urbanistici"

    indicatori = [
        ('POT (%)',           data.get('pot_existent', '—'), data.get('pot'),       data.get('pot_pug', '—')),
        ('CUT',               data.get('cut_existent', '—'), data.get('cut'),       data.get('cut_pug', '—')),
        ('Regim înălțime',    '—',                           data.get('rh'),        data.get('rh_pug', '—')),
        ('Spații verzi (%)',  '—',                           data.get('spatii_verzi'), 'min. 20%'),
        ('Retragere față (m)','—',                           data.get('ret_strada'), '—'),
        ('Retragere spate (m)','—',                          data.get('ret_spate'),  '—'),
    ]

    headers = ['Indicator', 'Existent', 'Propus', 'Admis PUG']
    for col, h in enumerate(headers, 1):
        c = ws.cell(row=1, column=col, value=h)
        c.font = Font(name='Arial', bold=True, color='FFFFFF', size=10)
        c.fill = PatternFill('solid', fgColor='1E3A5F')
        c.alignment = Alignment(horizontal='center')

    for i, (ind, ex, prop, adm) in enumerate(indicatori):
        row = i + 2
        for col, val in enumerate([ind, ex, prop, adm], 1):
            c = ws.cell(row=row, column=col, value=val)
            c.font = Font(name='Arial', size=10,
                          bold=(col == 3),
                          color='2563EB' if col == 3 else '1F2937')
            c.fill = PatternFill('solid', fgColor='EFF6FF' if col == 3 else ('F9FAFB' if i % 2 == 0 else 'FFFFFF'))
            c.alignment = Alignment(horizontal='center' if col > 1 else 'left')

    ws.column_dimensions['A'].width = 25
    for col in ['B', 'C', 'D']:
        ws.column_dimensions[col].width = 16

    wb.save(output_path)
```

---

## Reguli Critice UrbAI

- **Folosește FORMULE Excel** (`=SUM(...)`, `=C5*D5`) — nu calcula în Python și hardcoda rezultatul
- **TVA: 21%** — întotdeauna `*0.21`, nu `*0.19`
- **Monedă: Euro (€)** — format `#,##0.00`, nu RON dacă nu e specificat explicit
- **Font: Arial** — consistent cu restul documentelor UrbAI
- **Culori brand**: `1E3A5F` (header dark), `2563EB` (accent), `EFF6FF` (highlight rând)
- **ShadingType analog**: `PatternFill('solid', fgColor=...)` — verifică să nu fie negru
- **Diacritice** — ă â î ș ț corecte în toate etichetele
- **Recalculează după openpyxl**: `python scripts/recalc.py output.xlsx` dacă ai formule
- **Coloane suficient de late** — minim 15 caractere pentru coloane cu text

---

## Dependențe

```bash
# Server (Python)
pip install openpyxl pandas --break-system-packages

# Browser (React/JS)
npm install xlsx
```
