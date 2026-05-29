import { productImage } from '../utils/images'

/**
 * Add your clothing items here.
 *
 * Photos go in: public/products Images/
 *
 * Each product:
 *   id          — unique number
 *   title       — product name
 *   category    — e.g. Dresses, Tops, Bottoms
 *   price       — number (currency from config.js)
 *   image       — filename in products Images folder
 *   description — fabric, fit, etc. (sent in WhatsApp order)
 *   sizes       — list for dropdown e.g. ['S', 'M', 'L'] — leave [] to let customer type
 *   colors      — list for dropdown e.g. ['Black', 'White'] — leave [] to let customer type
 */
export default [
  {
    id: 1,
    title: 'Floral Midi Dress',
    category: 'Dresses',
    price: 450,
    sizes: ['S', 'M', 'L'],
    colors: ['Floral print', 'Navy floral'],
    image: productImage('floral-midi-dress.jpg'),
    description: 'Light floral print. Perfect for summer outings.',
  },
  {
    id: 2,
    title: 'High-Waist Mom Jeans',
    category: 'Bottoms',
    price: 380,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue denim', 'Black denim'],
    image: productImage('mom-jeans.jpg'),
    description: 'Classic denim. Comfortable stretch fit.',
  },
  {
    id: 3,
    title: 'Oversized Blazer',
    category: 'Outerwear',
    price: 520,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Black', 'Grey'],
    image: productImage('oversized-blazer.jpg'),
    description: 'Structured neutral blazer. Dress up or down.',
  },
  {
    id: 4,
    title: 'Ribbed Crop Top',
    category: 'Tops',
    price: 180,
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'White', 'Brown'],
    image: productImage('ribbed-crop-top.jpg'),
    description: 'Soft ribbed cotton.',
  },
  {
    id: 5,
    title: 'Linen Wide-Leg Trousers',
    category: 'Bottoms',
    price: 340,
    sizes: ['S', 'M', 'L'],
    colors: ['Natural', 'White', 'Olive'],
    image: productImage('linen-trousers.jpg'),
    description: 'Breathable linen blend. Relaxed elegant fit.',
  },
  {
    id: 6,
    title: 'Chunky Knit Cardigan',
    category: 'Knitwear',
    price: 290,
    sizes: ['One size'],
    colors: ['Cream', 'Camel', 'Grey'],
    image: productImage('knit-cardigan.jpg'),
    description: 'Cosy oversized knit.',
  },
  {
    id: 7,
    title: 'Satin Maxi Skirt',
    category: 'Dresses',
    price: 220,
    sizes: ['S', 'M', 'L'],
    colors: ['Emerald', 'Champagne', 'Black'],
    image: productImage('satin-maxi-skirt.jpg'),
    description: 'Flowing satin skirt.',
  },
  {
    id: 8,
    title: 'Classic White Tee',
    category: 'Tops',
    price: 150,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Grey'],
    image: productImage('white-tee.jpg'),
    description: 'Premium cotton basic. Wardrobe essential.',
  },
]
