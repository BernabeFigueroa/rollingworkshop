const escapeXml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character])
const price = value => `$${value.toLocaleString('es-AR')}`

export function createTicketSvg(receipt) {
  const ticket = escapeXml(receipt.ticket)
  const operation = escapeXml(receipt.operation)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="850" viewBox="0 0 640 850" role="img" aria-labelledby="title description">
<title id="title">Comprobante del workshop Rolling Code</title><desc id="description">${ticket}. Cantidad: ${escapeXml(receipt.quantity)}. Operación ${operation}. Sin validez de acceso.</desc>
<defs><linearGradient id="red" x2="1" y2="1"><stop stop-color="#e0202a"/><stop offset="1" stop-color="#980d1c"/></linearGradient><pattern id="bars" width="29" height="44" patternUnits="userSpaceOnUse"><path d="M0 0h2v44H0zm5 0h4v44H5zm8 0h1v44h-1zm5 0h3v44h-3zm7 0h2v44h-2z" fill="#ececf0"/></pattern></defs>
<rect width="640" height="850" rx="32" fill="#0b0b0c"/><rect x="1" y="1" width="638" height="848" rx="31" stroke="#35353c" fill="none"/>
<path d="M32 0h576a32 32 0 0 1 32 32v190H0V32A32 32 0 0 1 32 0" fill="url(#red)"/>
<g font-family="Arial,Helvetica,sans-serif" fill="#fff"><text x="42" y="55" font-size="13" font-weight="700" letter-spacing="3">ROLLING CODE SCHOOL</text><text x="42" y="117" font-size="38" font-weight="700">Tu próximo paso</text><text x="42" y="161" font-size="38" font-weight="700">empieza acá.</text><text x="42" y="197" font-size="14" fill="#ffe0e4">Workshop · 19 de noviembre de 2026 · 18:00 hs</text>
<text x="42" y="267" font-size="11" letter-spacing="2" fill="#ff8492">COMPROBANTE DEL RECORRIDO</text><text x="42" y="310" font-size="30" font-weight="700">${ticket}</text>
<text x="42" y="354" font-size="13" fill="#a1a1aa">CANTIDAD</text><text x="42" y="389" font-size="24" font-weight="700">${escapeXml(receipt.quantity)}</text><text x="330" y="354" font-size="13" fill="#a1a1aa">MODALIDAD</text><text x="330" y="389" font-size="22" font-weight="700">${receipt.ticket === 'Virtual' ? 'Virtual' : 'Presencial'}</text>
<path d="M42 420h556" stroke="#303036"/><text x="42" y="455" font-size="15" fill="#a1a1aa">Subtotal</text><text x="598" y="455" text-anchor="end" font-size="18">${escapeXml(price(receipt.subtotal))}</text><text x="42" y="489" font-size="15" fill="#a1a1aa">Servicio (5%)</text><text x="598" y="489" text-anchor="end" font-size="18">${escapeXml(price(receipt.serviceFee))}</text>
<text x="42" y="549" font-size="19" font-weight="700">Total informativo</text><text x="598" y="549" text-anchor="end" font-size="32" font-weight="700">${escapeXml(price(receipt.total))}</text>
<path d="M20 589h600" stroke="#5a3339" stroke-dasharray="6 7"/><circle cy="589" r="13" fill="#fff"/><circle cx="640" cy="589" r="13" fill="#fff"/>
<text x="42" y="634" font-size="11" letter-spacing="2" fill="#a1a1aa">NÚMERO DE OPERACIÓN</text><text x="42" y="669" font-size="25" font-family="monospace" font-weight="700">${operation}</text><rect x="42" y="695" width="180" height="37" fill="url(#bars)"/><text x="42" y="771" font-size="16" font-weight="700" fill="#ff8492">SIN VALIDEZ DE ACCESO</text><text x="42" y="801" font-size="13" fill="#a1a1aa">No acredita pago, reserva ni emisión de entradas.</text></g></svg>`
}

export function downloadTicket(receipt) {
  const url = URL.createObjectURL(new Blob([createTicketSvg(receipt)], { type: 'image/svg+xml;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `comprobante-${receipt.operation.replace(/[^a-zA-Z0-9-]/g,'')}.svg`
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url),10000)
}
