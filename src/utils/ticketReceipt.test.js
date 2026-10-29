import test from 'node:test'
import assert from 'node:assert/strict'
import { createTicketSvg } from './ticketReceipt.js'

const receipt = { operation: 'RC-123456789ABC', ticket: 'Early Bird', quantity: 2, subtotal: 50000, serviceFee: 2500, total: 52500 }

test('el comprobante contiene los importes, la operación y la limitación de acceso', () => {
  const svg = createTicketSvg(receipt)
  for (const text of ['RC-123456789ABC','Early Bird','52.500','50.000','2.500','SIN VALIDEZ DE ACCESO','No acredita pago']) assert.ok(svg.includes(text))
  assert.ok(svg.includes('Presencial'))
})

test('escapa el contenido del comprobante y no incorpora datos personales ni bancarios', () => {
  const svg = createTicketSvg({ ...receipt, ticket: '<script>alert(1)</script>', name: 'Nombre privado', email: 'privado@example.com', cvv: '123' })
  assert.ok(!svg.includes('<script>'))
  assert.ok(svg.includes('&lt;script&gt;'))
  assert.ok(!svg.includes('Nombre privado'))
  assert.ok(!svg.includes('privado@example.com'))
})

test('identifica la modalidad virtual', () => {
  const svg = createTicketSvg({ ...receipt, ticket: 'Virtual' })
  assert.ok(svg.includes('Virtual'))
  assert.ok(!svg.includes('Presencial'))
})
