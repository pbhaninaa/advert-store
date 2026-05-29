import { storeConfig } from '../config'

/** Convert local SA number (e.g. 0782141216) to international WhatsApp format. */
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
  let message = `Hello ${name}, I would like to place an order:\n\n`

  cartLines.forEach((line, index) => {
    const lineTotal = line.price * line.qty
    message += `${index + 1}. ${line.title} x${line.qty} — ${formatPrice(lineTotal)}\n`
  })

  const total = cartLines.reduce((sum, line) => sum + line.price * line.qty, 0)
  message += `\nTotal: ${formatPrice(total)}\n`
  message += `\nPlease confirm availability and delivery details.`

  if (customerNote.trim()) {
    message += `\n\nNote: ${customerNote.trim()}`
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
