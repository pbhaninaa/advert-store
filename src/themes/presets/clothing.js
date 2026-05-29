/**
 * CLOTHING RESELLER PRESET
 * Clean boutique look — light background so outfit photos stand out.
 */
export default {
  name: 'Clothing Boutique',

  fonts: {
    display: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
    body: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },

  colors: {
    // ── Backgrounds ──────────────────────────────────────
    bg: '#f7f5f2',
    bgAlt: '#efeae4',
    surface: '#ffffff',
    cartBg: '#ffffff',
    cartHeader: '#1a1816',

    // ── Text ─────────────────────────────────────────────
    text: '#1a1816',
    textMuted: '#6b6560',
    textInverse: '#ffffff',
    price: '#1a1816',

    // ── Brand accent (wine / burgundy — classic fashion) ─
    accent: '#8b2942',
    accentLight: '#a83255',
    accentSoft: '#f5e6eb',

    // ── UI ───────────────────────────────────────────────
    border: '#e8e4df',
    borderStrong: '#d4cec6',
    header: 'rgba(255, 255, 255, 0.96)',
    heroOverlay: 'rgba(26, 24, 22, 0.35)',
    badge: '#8b2942',
    badgeText: '#ffffff',

    // ── Buttons ──────────────────────────────────────────
    btnPrimary: '#1a1816',
    btnPrimaryHover: '#3d3835',
    btnPrimaryText: '#ffffff',

    // ── Other ────────────────────────────────────────────
    whatsapp: '#25d366',
    shadow: 'rgba(26, 24, 22, 0.07)',
    shadowStrong: 'rgba(26, 24, 22, 0.14)',
  },

  /** Border radius — paste your own values here (e.g. '0.5rem', '12px') */
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
  },
}
