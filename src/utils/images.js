/** Folder under `public/` where product photos are stored. */
export const PRODUCT_IMAGES_FOLDER = 'products Images'

/** Build a URL for a file inside the product images folder. */
export function productImage(filename) {
  const path = `${PRODUCT_IMAGES_FOLDER}/${filename}`
  return `${import.meta.env.BASE_URL}${encodeURI(path)}`
}
