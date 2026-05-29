import { storeConfig } from '../config'
import { enrichCartLine } from '../utils/productOptions'

/** Convert local SA number (e.g. 0738632244) to international WhatsApp format. */
export function formatWhatsAppPhone(phone) {
  let digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0')) {
    digits = '27' + digits.slice(1)
  }
  return digits
}

export function formatPrice(amount) {
  return `${storeConfig.currency}${Number(amount).toLocaleString('en-ZA')}`
}

export function buildOrderMessage(cartLines, customerNote = '') {
  const { name } = storeConfig
  const lines = cartLines.map(enrichCartLine)

  let message = `Hello ${name}, I would like to place an order:\n\n`

  lines.forEach((line, index) => {
    const lineTotal = line.price * line.qty
    message += `*Item ${index + 1}: ${line.title}*\n`

    if (line.category) {
      message += `Category: ${line.category}\n`
    }

    if (line.size) {
      message += `Size: ${line.size}\n`
    }

    if (line.color) {
      message += `Colour: ${line.color}\n`
    }

    if (line.description) {
      message += `Product info: ${line.description}\n`
    }

    if (line.itemNote) {
      message += `Item note: ${line.itemNote}\n`
    }

    message += `Quantity: ${line.qty}\n`
    message += `Unit price: ${formatPrice(line.price)}\n`
    message += `Subtotal: ${formatPrice(lineTotal)}\n`

    if (index < lines.length - 1) {
      message += `\n`
    }
  })

  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  message += `\n*ORDER TOTAL: ${formatPrice(total)}*\n`
  message += `\nPlease confirm availability and delivery details.`

  if (customerNote.trim()) {
    message += `\n\n*Delivery / order note:*\n${customerNote.trim()}`
  }

  return message
}

export function getWhatsAppCheckoutUrl(cartLines, note = '') {
  const phone = formatWhatsAppPhone(storeConfig.whatsappPhone)
  const text = encodeURIComponent(buildOrderMessage(cartLines, note))
  return `https://wa.me/${phone}?text=${text}`
}

export function getEmailCheckoutUrl(cartLines, note = '') {
  const subject = encodeURIComponent(`Order Request — ${storeConfig.name}`)
  const body = encodeURIComponent(buildOrderMessage(cartLines, note))
  return `mailto:${storeConfig.email}?subject=${subject}&body=${body}`
}
