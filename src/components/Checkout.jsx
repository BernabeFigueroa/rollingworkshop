import { useEffect, useRef, useState } from 'react'
import { validatePersonal, validatePayment } from '../utils/checkoutValidation'
import DigitalTicket from './DigitalTicket'

const steps = ['Entrada', 'Datos', 'Pago', 'Listo']
const emptyPersonal = { name: '', surname: '', email: '', dni: '', phone: '' }
const emptyPayment = { holder: '', number: '', expiry: '', cvv: '' }
const formatPrice = (amount) => `$${amount.toLocaleString('es-AR')}`
const personalFields = [
  { name: 'name', label: 'Nombre', autoComplete: 'given-name', maxLength: 80, placeholder: 'Tu nombre' },
  { name: 'surname', label: 'Apellido', autoComplete: 'family-name', maxLength: 80, placeholder: 'Tu apellido' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', maxLength: 254, placeholder: 'nombre@correo.com', wide: true },
  { name: 'dni', label: 'DNI', inputMode: 'numeric', autoComplete: 'off', maxLength: 8, placeholder: '12345678' },
  { name: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel', maxLength: 25, placeholder: '381 123 4567' },
]
const paymentFields = [
  { name: 'holder', label: 'Titular de la tarjeta', autoComplete: 'off', maxLength: 100, placeholder: 'Nombre y apellido', wide: true },
  { name: 'number', label: 'Número de tarjeta', inputMode: 'numeric', autoComplete: 'off', maxLength: 23, placeholder: 'Número de tu tarjeta', wide: true },
  { name: 'expiry', label: 'Vencimiento', inputMode: 'numeric', autoComplete: 'off', maxLength: 5, placeholder: 'MM/AA' },
  { name: 'cvv', label: 'Código de seguridad', type: 'password', inputMode: 'numeric', autoComplete: 'off', maxLength: 4, placeholder: '123' },
]

function Field({ field, value, error, onChange }) {
  const { name, label, wide, ...props } = field
  return <label className={`purchase-field${wide ? ' purchase-field--wide' : ''}`} htmlFor={`purchase-${name}`}>
    <span>{label} <span aria-hidden="true">*</span></span>
    <input {...props} id={`purchase-${name}`} name={name} value={value} required aria-invalid={Boolean(error)} aria-describedby={error ? `purchase-${name}-error` : undefined} onChange={event => onChange(name, event.target.value)} />
    {error && <span id={`purchase-${name}-error`} className="purchase-error">{error}</span>}
  </label>
}

export default function Checkout({ ticketOptions, selectedTicket, onSelect, quantity, onQuantity }) {
  const [step, setStep] = useState(0)
  const [personal, setPersonal] = useState(emptyPersonal)
  const [payment, setPayment] = useState(emptyPayment)
  const [errors, setErrors] = useState({})
  const [receipt, setReceipt] = useState(null)
  const [quantityDraft, setQuantityDraft] = useState(null)
  const form = useRef(null)
  const heading = useRef(null)
  const submitted = useRef(false)
  const previousStep = useRef(0)
  const selected = ticketOptions.find(ticket => ticket.id === selectedTicket) || ticketOptions[0]
  const subtotal = selected.price * quantity
  const serviceFee = Math.round(subtotal * .05)
  const total = subtotal + serviceFee

  function quantityError(value) {
    if (!/^\d+$/.test(String(value)) || Number(value) < 1) return 'Ingresá una cantidad entera mayor que cero.'
    const amount = Number(value) * selected.price
    if (!Number.isSafeInteger(Number(value)) || !Number.isSafeInteger(amount + Math.round(amount * .05))) return 'La cantidad es demasiado grande para calcular el importe.'
    return ''
  }

  function changeQuantity(value) {
    setQuantityDraft(value)
    const error = quantityError(value)
    if (!error) onQuantity(Number(value))
    setErrors(current => { const next = { ...current }; delete next.quantity; return next })
  }

  function adjustQuantity(value) {
    const error = quantityError(value)
    if (error) { setErrors(current => ({ ...current, quantity: error })); return }
    setQuantityDraft(null)
    onQuantity(value)
    setErrors(current => { const next = { ...current }; delete next.quantity; return next })
  }

  useEffect(() => {
    if (previousStep.current !== step) {
      heading.current?.focus({ preventScroll: true })
      form.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
    }
    previousStep.current = step
  }, [step])

  function update(setter, name, value) {
    setter(current => ({ ...current, [name]: value }))
    setErrors(current => { const next = { ...current }; delete next[name]; return next })
  }

  function changePayment(name, value) {
    if (name === 'number') value = value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim()
    if (name === 'expiry') {
      const number = value.replace(/\D/g, '').slice(0, 4)
      value = number.length > 2 ? `${number.slice(0, 2)}/${number.slice(2)}` : number
    }
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4)
    update(setPayment, name, value)
  }

  function next(event) {
    event.preventDefault()
    const invalidQuantity = step === 0 ? quantityError(quantityDraft ?? quantity) : ''
    const nextErrors = step === 1 ? validatePersonal(personal) : step === 2 ? validatePayment(payment) : invalidQuantity ? { quantity: invalidQuantity } : {}
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      form.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus()
      return
    }
    if (step === 2) {
      if (submitted.current) return
      submitted.current = true
      setReceipt({ operation: `RC-${crypto.randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}`, name: `${personal.name.trim()} ${personal.surname.trim()}`, email: personal.email.trim(), ticket: selected.name, quantity, subtotal, serviceFee, total })
      setPayment(emptyPayment)
      setPersonal(emptyPersonal)
    }
    setStep(current => Math.min(current + 1, 3))
  }

  function back() {
    setErrors({})
    setPayment(emptyPayment)
    setStep(current => Math.max(0, current - 1))
  }

  function restart() {
    setReceipt(null)
    setPersonal(emptyPersonal)
    setPayment(emptyPayment)
    setErrors({})
    submitted.current = false
    onQuantity(1)
    setQuantityDraft(null)
    setStep(0)
  }

  return <div className="checkout-panel" id="checkout">
    <header className="checkout-heading"><div><p className="section-eyebrow">Tus entradas</p><h2 className="section-title">Finalizá tu compra</h2></div><ol aria-label="Pasos de compra">{steps.map((label, index) => <li key={label} aria-current={index === step ? 'step' : undefined} className={index < step ? 'is-complete' : ''}>{index + 1} {label}</li>)}</ol></header>
    <div className="checkout-grid">
      <form className="checkout-form purchase-form" onSubmit={next} ref={form} noValidate autoComplete={step === 2 ? 'off' : 'on'}>
        <h3 ref={heading} tabIndex={-1}>{['Elegí tu entrada', 'Tus datos personales', 'Datos de tu tarjeta', '¡Proceso completado!'][step]}</h3>
        {step === 0 && <>
          <fieldset className="checkout-options"><legend className="sr-only">Tipo de entrada</legend>{ticketOptions.map(ticket => <label key={ticket.id} className={`checkout-option${selectedTicket === ticket.id ? ' checkout-option--selected' : ''}`}><input type="radio" name="ticket" value={ticket.id} checked={selectedTicket === ticket.id} onChange={() => onSelect(ticket.id)} /><span><strong>{ticket.name}</strong><small>{ticket.note}</small></span><strong>{formatPrice(ticket.price)}</strong></label>)}</fieldset>
          <div className="quantity-control"><label id="quantity-label" htmlFor="purchase-quantity">Cantidad</label><div><button type="button" aria-label="Quitar una entrada" disabled={quantity <= 1} onClick={() => adjustQuantity(Math.max(1, quantity - 1))}>−</button><input id="purchase-quantity" name="quantity" className="quantity-input" type="text" inputMode="numeric" pattern="[0-9]*" required value={quantityDraft ?? String(quantity)} aria-invalid={Boolean(errors.quantity)} aria-describedby={errors.quantity ? 'purchase-quantity-error' : 'quantity-help'} onDoubleClick={event => event.currentTarget.select()} onChange={event => changeQuantity(event.target.value)} onBlur={() => { const error = quantityError(quantityDraft ?? quantity); if (error) setErrors(current => ({ ...current, quantity: error })) }} /><button type="button" aria-label="Agregar una entrada" onClick={() => adjustQuantity(quantity + 1)}>+</button></div></div><p id="quantity-help" className="purchase-help">Escribí la cantidad o usá los botones. Doble clic para seleccionar el número.</p>{errors.quantity && <p id="purchase-quantity-error" className="purchase-error-summary" role="alert">{errors.quantity}</p>}
        </>}
        {step === 1 && <><p className="purchase-help">Completá todos los campos para continuar. El DNI se ingresa sin puntos y el teléfono con código de área.</p><div className="purchase-fields">{personalFields.map(field => <Field key={field.name} field={field} value={personal[field.name]} error={errors[field.name]} onChange={(name, value) => update(setPersonal, name, value)} />)}</div></>}
        {step === 2 && <><div className="purchase-fields">{paymentFields.map(field => <Field key={field.name} field={field} value={payment[field.name]} error={errors[field.name]} onChange={changePayment} />)}</div><p className="purchase-help">Ingresá el número, el vencimiento y el código de seguridad de la tarjeta.</p></>}
        {step === 3 && receipt && <div className="purchase-success"><div role="status"><span className="purchase-success__mark" aria-hidden="true">✓</span><p>Gracias, {receipt.name}. Completaste todos los pasos.</p></div><DigitalTicket receipt={receipt} /><p className="purchase-help">No se realizó ningún cobro ni se emitieron entradas. Los datos de tarjeta se eliminaron del formulario.</p><button type="button" className="purchase-back" onClick={restart}>Elegir otras entradas</button></div>}
        {Object.keys(errors).length > 0 && <p className="purchase-error-summary" role="alert">Revisá los campos indicados antes de continuar.</p>}
        {step < 3 && <><div className="purchase-actions">{step > 0 && <button type="button" className="purchase-back" onClick={back}>Volver</button>}<button className="ticket-button ticket-button--primary" type="submit">{step === 2 ? 'Finalizar' : 'Continuar'}</button></div><p className="checkout-note">No se realizará ningún cobro. Tus datos no se envían ni se guardan.</p></>}
      </form>
      <aside id="resumen-compra" className="order-summary" aria-label="Resumen de compra"><p className="section-eyebrow">Tu pedido</p><p className="order-summary__event">Workshop Rolling Code School</p><p className="order-summary__details">Jueves 19/11 · 18:00 hs · {selectedTicket === 'virtual' ? 'Transmisión en vivo' : 'Gral. Paz 576, Entrepiso'}</p><hr /><div className="order-summary__line"><span>{receipt?.quantity ?? quantity} entrada{(receipt?.quantity ?? quantity) > 1 ? 's' : ''} {receipt?.ticket ?? selected.name}</span><span>{formatPrice(receipt?.subtotal ?? subtotal)}</span></div><div className="order-summary__line order-summary__line--muted"><span>Cargo por servicio (5%)</span><span>{formatPrice(receipt?.serviceFee ?? serviceFee)}</span></div><hr /><div className="order-summary__total"><span>Total</span><span>{formatPrice(receipt?.total ?? total)}</span></div>{receipt && <p className="purchase-receipt-email">Email de referencia: {receipt.email}</p>}<p className="order-summary__secure">El importe es informativo. No se realizará ningún cobro.</p></aside>
    </div>
  </div>
}
