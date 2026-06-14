import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} from 'docx'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = join(root, 'Nwabisile-Shop-User-Manual.docx')

const LIVE_URL = 'https://pbhaninaa.github.io/advert-store/'
const GITHUB_FOLDER = 'https://github.com/pbhaninaa/advert-store/tree/main/my-products'
const WHATSAPP = '0738632244'
const EMAIL = 'nwabisile.gugwana98@gmail.com'

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ text, heading: level, spacing: { before: 280, after: 120 } })
}

function para(text, options = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...options,
    children: [new TextRun({ text, size: 22, ...options.run })],
  })
}

function bullet(text, level = 0) {
  return new Paragraph({
    text,
    bullet: { level },
    spacing: { after: 80 },
  })
}

function boldPara(label, value) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: label, bold: true, size: 22 }),
      new TextRun({ text: value, size: 22 }),
    ],
  })
}

function codeBlock(lines) {
  return lines.map(
    (line) =>
      new Paragraph({
        spacing: { after: 0 },
        shading: { type: ShadingType.CLEAR, fill: 'F5F5F5' },
        children: [new TextRun({ text: line, font: 'Consolas', size: 20 })],
      }),
  )
}

function tableRow(cells, header = false) {
  return new TableRow({
    children: cells.map(
      (text) =>
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          shading: header ? { type: ShadingType.CLEAR, fill: 'E8E0DC' } : undefined,
          children: [
            new Paragraph({
              children: [new TextRun({ text, bold: header, size: 20 })],
            }),
          ],
        }),
    ),
  })
}

function fieldTable(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [tableRow(['Field', 'What to put'], true), ...rows.map((r) => tableRow(r))],
  })
}

function problemTable(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [tableRow(['Problem', 'What to do'], true), ...rows.map((r) => tableRow(r))],
  })
}

const doc = new Document({
  creator: 'Nwabisile Shop',
  title: 'Nwabisile Shop — User Manual',
  description: 'How to add products and update the online shop',
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: 'Nwabisile Online Shop', bold: true, size: 44, color: '5C2E2E' }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: 'User Manual', size: 32, color: '666666' })],
        }),

        para(
          'This guide explains how to update your online shop using GitHub. You do not need to know programming — drag and drop your photos and edit one file.',
        ),
        boldPara('Your live shop: ', LIVE_URL),
        boldPara('Your products folder on GitHub: ', GITHUB_FOLDER),
        boldPara('WhatsApp: ', WHATSAPP),
        boldPara('Email: ', EMAIL),

        heading('1. What you need'),
        bullet('A phone or computer with internet'),
        bullet('Access to your GitHub shop (login details from the person who set up the site)'),
        bullet('Product photos (.jpg or .png)'),
        bullet('Your updated products.json file (or edit it on GitHub)'),

        heading('2. Your products folder'),
        para('All products live in ONE folder on GitHub called my-products:'),
        ...codeBlock([
          'my-products/',
          '  products.json     ← names, prices, sizes, colours',
          '  images/           ← drag your photos here',
        ]),
        para('Open it here: ' + GITHUB_FOLDER),

        heading('3. Step 1 — Upload photos (drag and drop)'),
        bullet('Open my-products/images on GitHub'),
        bullet('Click Add file, then Upload files'),
        bullet('Drag and drop your photos into the upload area'),
        bullet('Click Commit changes at the bottom of the page'),
        bullet('Use simple names: red-dress.jpg or blue-jeans.png'),
        bullet('Recommended: square or tall photos, at least 500 × 500 pixels'),

        heading('4. Step 2 — Update products.json'),
        para('Open my-products/products.json on GitHub and click the pencil icon (Edit).'),
        para('Each product looks like this. Copy a block and change the details:'),
        ...codeBlock([
          '{',
          '  "id": 9,',
          '  "title": "Red Summer Dress",',
          '  "category": "Dresses",',
          '  "price": 350,',
          '  "image": "red-dress.jpg",',
          '  "description": "Cotton blend. Perfect for events.",',
          '  "sizes": ["S", "M", "L"],',
          '  "colors": ["Red", "Black"]',
          '}',
        ]),
        para('Important rules when editing:'),
        bullet('Every product needs a unique id number (1, 2, 3 …)'),
        bullet('The "image" name must match the photo filename exactly'),
        bullet('Put a comma after each product block, except the last one'),
        bullet('Keep quotation marks " exactly as shown'),

        heading('5. What each field means', HeadingLevel.HEADING_2),
        fieldTable([
          ['id', 'Unique number for each product — never repeat'],
          ['title', 'Product name shown on the shop'],
          ['category', 'e.g. Dresses, Tops, Bottoms — use the same spelling for filters'],
          ['price', 'Numbers only (the shop shows R350)'],
          ['image', 'Exact photo filename from the images folder'],
          ['description', 'Short product info — sent in WhatsApp orders'],
          ['sizes', 'Size options e.g. ["S", "M", "L"] — use [] if customer types their own'],
          ['colors', 'Colour options e.g. ["Black", "White"] — use [] if customer types their own'],
        ]),

        heading('6. Step 3 — Upload a whole folder at once'),
        bullet('Prepare a folder on your computer with products.json and an images folder inside'),
        bullet('On GitHub, open my-products'),
        bullet('Click Add file → Upload files'),
        bullet('Drag products.json and your photos into the upload area'),
        bullet('If asked to replace files, click OK'),
        bullet('Click Commit changes'),

        heading('7. Step 4 — Check the live website'),
        bullet('After Commit changes, wait 1–2 minutes'),
        bullet('Open ' + LIVE_URL + ' on your phone or computer'),
        bullet('Hard refresh if you do not see changes (pull down on phone, or Ctrl+F5 on computer)'),
        para('GitHub rebuilds your shop automatically every time you commit.'),

        heading('8. Change or remove a product'),
        bullet('Change price or name — edit that product in products.json on GitHub'),
        bullet('Remove a product — delete its whole { ... } block from products.json'),
        bullet('Change photo — upload a new file to images/ or update "image" in JSON'),
        bullet('Always click Commit changes when finished'),

        heading('9. How your customers order'),
        bullet('Customer browses products and taps Add to Bag'),
        bullet('They choose size, colour, quantity, and optional notes'),
        bullet('In the bag they can edit size, colour, and notes for each item'),
        bullet('They tap Order via WhatsApp or Order via Email'),
        bullet('Size and colour must be filled in for every item before checkout works'),
        bullet('You receive a detailed message with product info, sizes, colours, and total price'),

        heading('10. If something goes wrong'),
        problemTable([
          ['Photo not showing', 'Check that "image" in products.json matches the filename exactly'],
          ['Website did not update', 'Wait 2 minutes after Commit, then hard refresh the browser'],
          ['Cannot edit on GitHub', 'Ask for login access to the advert-store repository'],
          ['JSON error / shop will not load', 'Check for missing commas or quotation marks in products.json'],
        ]),

        heading('11. Helpful tips'),
        bullet('Keep category names consistent (always "Dresses", not "Dress")'),
        bullet('Compress large photos (under 500 KB each) so the site loads fast on phones'),
        bullet('Share the shop link with customers — not the GitHub link'),
        bullet('Replace sample photos with your real product photos'),

        heading('12. Quick checklist'),
        bullet('Photos uploaded to my-products/images/ on GitHub'),
        bullet('products.json updated with correct names, prices, sizes, and colours'),
        bullet('Clicked Commit changes'),
        bullet('Checked live site on phone after 1–2 minutes'),

        new Paragraph({
          spacing: { before: 400 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: '— End of manual —',
              italics: true,
              size: 20,
              color: '888888',
            }),
          ],
        }),
      ],
    },
  ],
})

const buffer = await Packer.toBuffer(doc)
writeFileSync(outputPath, buffer)
console.log(`\nCreated: ${outputPath}\n`)
