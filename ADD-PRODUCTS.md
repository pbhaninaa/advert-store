# How to Add Products

This guide explains how to add, update, or remove products on your Nwabisile advert store.

Your site is live at: **https://pbhaninaa.github.io/advert-store/**

---

## What you need

- Product photo (`.jpg` or `.png`)
- Product name, price, category, and short description
- A text editor (VS Code, Notepad, etc.)

No backend or database — everything is edited in two places:

| What | Where |
|------|--------|
| Product photos | `public/products Images/` |
| Product details | `src/data/items.js` |

---

## Step 1 — Add the product photo

1. Save your photo in this folder:

   ```
   advert-site/public/products Images/
   ```

2. Use a simple filename (no spaces if you can):

   - Good: `red-dress.jpg`, `denim-jacket.png`
   - Also works: `Red Dress.jpg` (the site handles spaces automatically)

3. Recommended size: **square or tall photo**, at least **500×500 px** so it looks sharp on phones.

---

## Step 2 — Add the product in `items.js`

Open **`src/data/items.js`** and add a new entry to the list.

Copy this template and change the values:

```javascript
{
  id: 9,                              // unique number — never repeat an id
  title: 'Red Summer Dress',
  category: 'Dresses',                  // e.g. Dresses, Tops, Bottoms, Outerwear
  price: 350,                           // number only — shown as R350
  sizes: ['S', 'M', 'L', 'XL'],         // dropdown options — use [] to let customer type
  colors: ['Red', 'Black', 'White'],    // dropdown options — use [] to let customer type
  image: productImage('red-dress.jpg'), // must match your photo filename
  description: 'Cotton blend. Perfect for events.',
},
```

### Field guide

| Field | Description |
|-------|-------------|
| `id` | Unique number for each product (1, 2, 3 …) |
| `title` | Name shown on the product card |
| `category` | Used for filters — keep names consistent (e.g. always `Dresses`, not `Dress`) |
| `price` | Price in Rands, numbers only |
| `sizes` | Array of sizes for dropdown, e.g. `['S', 'M', 'L']` — customer **must** pick one |
| `colors` | Array of colours for dropdown, e.g. `['Black', 'White']` — customer **must** pick one |
| `image` | `productImage('your-file.jpg')` — filename must match the photo in `products Images` |
| `description` | Product info sent in WhatsApp/email orders |

### Example — full file with one product

```javascript
import { productImage } from '../utils/images'

export default [
  {
    id: 1,
    title: 'Red Summer Dress',
    category: 'Dresses',
    price: 350,
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'Black'],
    image: productImage('red-dress.jpg'),
    description: 'Cotton blend. Perfect for events.',
  },
]
```

---

## How customers order (size & colour)

1. Tap **Add to Bag** — a form opens for **size**, **colour**, quantity, and optional notes.
2. In the **bag**, they can change size, colour, or notes for each item.
3. **WhatsApp / email** only works when every item has size and colour filled in.
4. The order message includes size, colour, notes, quantity, and price for each item.

---

## Step 3 — Remove or edit a product

- **Edit** — change the text or price in `items.js`, or replace the image file (same filename).
- **Remove** — delete the whole `{ ... }` block for that product from `items.js`.
- **Replace photo** — swap the file in `products Images/` and keep the same filename, or use a new filename and update `productImage('...')`.

---

## Step 4 — Preview on your computer

In the project folder, run:

```bash
npm install
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:5173`) and check your products.

---

## Step 5 — Publish to the live website

After saving your changes:

```bash
git add .
git commit -m "Add new products"
git push
```

Wait 1–2 minutes. GitHub will rebuild the site automatically.

Then open: **https://pbhaninaa.github.io/advert-store/**

Do a hard refresh on your phone if you don’t see changes (`Ctrl+F5` on desktop).

---

## Optional — change contact details

Edit **`src/config.js`**:

```javascript
email: 'nwabisile.gugwana98@gmail.com',
whatsappPhone: '0738632244',
```

---

## Optional — change colours

Edit **`src/themes/presets/clothing.js`** (or paste your colours into `src/themes/presets/custom.js` and switch the import in `src/themes/active.js`).

---

## Optional — change price filters

Edit the `priceRanges` list in **`src/config.js`** to match your price bands.

---

## Tips

- Use the **same category names** for similar items so filters work well.
- Add **`sizes`** and **`colors`** arrays on each product so customers pick the right variant at checkout.
- Compress large photos before uploading (under 500 KB each keeps the site fast).
- After pushing, share the link **https://pbhaninaa.github.io/advert-store/** — not the GitHub repo link.

---

## Need help?

If something doesn’t show after pushing:

1. Check the filename in `productImage('...')` matches the file in `products Images`.
2. Make sure each product has a **unique `id`**.
3. Hard refresh the browser or try an incognito tab.
