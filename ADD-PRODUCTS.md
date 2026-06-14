# How to Add Products (Easy Guide)

Your shop: **https://pbhaninaa.github.io/advert-store/**

You do **not** need to know coding. Update one folder on **GitHub** — drag and drop your photos and edit one JSON file.

---

## Your folder on GitHub

Everything lives here:

```
my-products/
  products.json     ← product names, prices, sizes, colours
  images/           ← drag your photos here
```

**GitHub link:** https://github.com/pbhaninaa/advert-store/tree/main/my-products

---

## Step 1 — Add or replace photos

1. Open **my-products/images** on GitHub.
2. Click **Add file** → **Upload files**.
3. **Drag and drop** your photos into the upload area (you can drop many at once).
4. Click **Commit changes** (green button at the bottom).

Use simple filenames: `red-dress.jpg`, `blue-jeans.png`

---

## Step 2 — Update products.json

1. Open **my-products/products.json** on GitHub.
2. Click the **pencil icon** (Edit this file).
3. Change product details, or copy a block to add a new product:

```json
{
  "id": 9,
  "title": "Red Summer Dress",
  "category": "Dresses",
  "price": 350,
  "image": "red-dress.jpg",
  "description": "Cotton blend. Perfect for events.",
  "sizes": ["S", "M", "L"],
  "colors": ["Red", "Black"]
}
```

4. Click **Commit changes**.

### What each field means

| Field | What to put |
|-------|-------------|
| `id` | Unique number (1, 2, 3 … never repeat) |
| `title` | Product name on the shop |
| `category` | e.g. Dresses, Tops, Bottoms — keep spelling the same |
| `price` | Numbers only (shown as R350) |
| `image` | **Exact photo filename** from the images folder |
| `description` | Short info — sent in WhatsApp orders |
| `sizes` | e.g. `["S", "M", "L"]` — use `[]` if customer types their own |
| `colors` | e.g. `["Black", "White"]` — use `[]` if customer types their own |

**Important:** `"image"` must match the photo filename exactly.

---

## Step 3 — Check the live site

After you commit on GitHub, wait **1–2 minutes**, then open:

**https://pbhaninaa.github.io/advert-store/**

Hard refresh your phone if you don’t see changes.

---

## Upload a whole folder at once

If you prepared a folder on your computer with `products.json` and an `images` folder inside:

1. On GitHub, open **my-products**.
2. Click **Add file** → **Upload files**.
3. Drag the **images** and **products.json** into the upload area.
4. If asked to replace existing files, confirm.
5. Click **Commit changes**.

---

## Remove or change a product

- **Change price or name** — edit that product in `products.json` on GitHub
- **Remove a product** — delete its `{ ... }` block (and the comma before it)
- **Change photo** — upload a new file to `images/` with the same name, or update `"image"` in JSON

---

## How customers order

1. Tap **Add to Bag** — choose size, colour, quantity
2. In the bag, they can edit details per item
3. **WhatsApp / email** only works when size and colour are filled in for every item

---

## Something wrong?

| Problem | Fix |
|---------|-----|
| Photo not showing | `"image"` in JSON must match filename in `images/` exactly |
| Website didn’t update | Wait 2 minutes after commit; hard refresh the browser |
| JSON error | Check commas and quotation marks in `products.json` |
| Need full instructions | Open **Nwabisile-Shop-User-Manual.docx** |

---

## Optional — preview on your computer

If you have the project folder on your PC:

- Double-click **PREVIEW-SHOP.bat** to preview locally
- Double-click **UPDATE-WEBSITE.bat** to publish via Git (alternative to GitHub website)

---

## Tips

- Keep category names consistent (always `Dresses`, not `Dress`)
- Compress large photos (under 500 KB each)
- Share **https://pbhaninaa.github.io/advert-store/** with customers
