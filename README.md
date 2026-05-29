# Simple-Selling-Website

Nwabisile — a simple frontend clothing shop. Browse products, filter by category and price, add to bag, then order via WhatsApp or email.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` auto-deploy to GitHub Pages via GitHub Actions.

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push to `main`

## Customize

| File | What to edit |
|------|----------------|
| `src/data/items.js` | Products |
| `public/products Images/` | Product photos |
| `src/config.js` | Store name, contact, price filters |
| `src/themes/presets/clothing.js` | Colors & border radius |
