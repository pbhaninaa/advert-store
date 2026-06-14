/** Product photos live in public/my-products/images/ (synced from my-products/images/). */
export const PRODUCT_IMAGES_FOLDER = 'my-products/images'

/** Build a URL for a photo filename inside the product images folder. */
export function productImage(filename) {
  const path = `${PRODUCT_IMAGES_FOLDER}/${filename}`
  return `${import.meta.env.BASE_URL}${encodeURI(path)}`
}
