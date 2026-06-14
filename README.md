# advert-store

Nwabisile — a simple frontend clothing shop. Browse products, filter by category and price, add to bag, then order via WhatsApp or email.

**Live site:** https://pbhaninaa.github.io/advert-store/

---

## Update products on GitHub (drag & drop)

Everything goes in **`my-products/`** on GitHub:

```
my-products/
  products.json    ← edit on GitHub (pencil icon)
  images/          ← drag photos here (Upload files)
```

| Action | What to do |
|--------|------------|
| **Open folder** | https://github.com/pbhaninaa/advert-store/tree/main/my-products |
| **Add photos** | Open `images/` → Add file → Upload files → drag photos → Commit |
| **Edit products** | Open `products.json` → pencil icon → edit → Commit |
| **Full guide** | `Nwabisile-Shop-User-Manual.docx` or `ADD-PRODUCTS.md` |

After each commit, the live site updates in 1–2 minutes.

---

## Developers

```bash
npm install
npm run sync-products
npm run dev
```

Build syncs `my-products/` → `public/my-products/` automatically.

## Customize

| File | What to edit |
|------|----------------|
| **`my-products/`** | Products & photos |
| `src/config.js` | Store name, contact, price filters |
| `src/themes/presets/clothing.js` | Colors & border radius |
