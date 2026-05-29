import { productImage } from '../utils/images'

/**
 * Add your clothing items here.
 *
 * Photos go in: public/products Images/
 *
 * Each product:
 *   id          — unique number
 *   title       — item name
 *   category    — e.g. Dresses, Tops, Bottoms (shown as badge)
 *   price       — number (currency from config.js)
 *   image       — filename in products Images folder
 *   description — size info, fabric, etc.
 */
export default [
  {
    id: 1,
    title: 'Floral Midi Dress',
    category: 'Dresses',
    price: 450,
    image: productImage('floral-midi-dress.jpg'),
    description: 'Light floral print. Sizes S–L. Perfect for summer outings.',
  },
  {
    id: 2,
    title: 'High-Waist Mom Jeans',
    category: 'Bottoms',
    price: 380,
    image: productImage('mom-jeans.jpg'),
    description: 'Classic blue denim. Sizes 28–36. Comfortable stretch fit.',
  },
  {
    id: 3,
    title: 'Oversized Blazer',
    category: 'Outerwear',
    price: 520,
    image: productImage('oversized-blazer.jpg'),
    description: 'Structured neutral blazer. Sizes S–XL. Dress up or down.',
  },
  {
    id: 4,
    title: 'Ribbed Crop Top',
    category: 'Tops',
    price: 180,
    image: productImage('ribbed-crop-top.jpg'),
    description: 'Soft ribbed cotton. Sizes S–L. Available in black & white.',
  },
  {
    id: 5,
    title: 'Linen Wide-Leg Trousers',
    category: 'Bottoms',
    price: 340,
    image: productImage('linen-trousers.jpg'),
    description: 'Breathable linen blend. Sizes S–L. Relaxed elegant fit.',
  },
  {
    id: 6,
    title: 'Chunky Knit Cardigan',
    category: 'Knitwear',
    price: 290,
    image: productImage('knit-cardigan.jpg'),
    description: 'Cosy oversized knit. One size fits most. Cream & camel.',
  },
  {
    id: 7,
    title: 'Satin Maxi Skirt',
    category: 'Dresses',
    price: 220,
    image: productImage('satin-maxi-skirt.jpg'),
    description: 'Flowing satin skirt. Sizes S–L. Emerald & champagne.',
  },
  {
    id: 8,
    title: 'Classic White Tee',
    category: 'Tops',
    price: 150,
    image: productImage('white-tee.jpg'),
    description: 'Premium cotton basic. Sizes S–XXL. Wardrobe essential.',
  },
]
