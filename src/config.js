/** Edit store details and contact info here. */
export const storeConfig = {
  name: 'Nwabisile',
  tagline: 'Curated fashion — order via WhatsApp or email.',
  email: 'nwabisile.gugwana98@gmail.com',
  /** Local SA number — WhatsApp link uses international format automatically. */
  whatsappPhone: '0738632244',
  currency: 'R',

  /**
   * Price filter options — edit labels and min/max to match your stock.
   * min/max are inclusive. Omit min or max for no limit on that side.
   */
  priceRanges: [
    { id: 'all', label: 'All prices' },
    { id: 'under-250', label: 'Under R250', max: 249 },
    { id: '250-400', label: 'R250 – R400', min: 250, max: 400 },
    { id: 'over-400', label: 'Over R400', min: 401 },
  ],
}
