import { useEffect, useState } from 'react'

const ticketOptions = [
  { id: 'early', name: 'Early Bird', price: 25000, note: 'Presencial · Hasta el 31/10' },
  { id: 'general', name: 'General', price: 35000, note: 'Presencial · Desde el 1/11' },
  { id: 'virtual', name: 'Virtual', price: 15000, note: 'Transmisión en vivo y grabación' },
]

const ticketBenefits = {
  early: [
    'Acceso a las 10 charlas',
    'Kit de bienvenida Rolling Code',
    'Certificado de asistencia',
    'Coffee break y networking con los speakers',
    'Grabación de todas las charlas',
  ],
  general: [
    'Acceso a las 10 charlas',
    'Certificado de asistencia',
    'Coffee break y networking con los speakers',
    'Grabación de todas las charlas',
  ],
  virtual: [
    'Transmisión en vivo de las 10 charlas',
    'Chat para hacer preguntas a los speakers',
    'Certificado de asistencia',
    'Grabación disponible por 30 días',
  ],
}

const earlyBirdDeadline = new Date('2026-10-31T23:59:59-03:00').getTime()
const formatPrice = (amount) => `$${amount.toLocaleString('es-AR')}`

function getTimeLeft() {
  const difference = Math.max(0, earlyBirdDeadline - Date.now())
  const totalMinutes = Math.floor(difference / 60000)

  return {
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
  }
}

function ComprarEntrada() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [selectedTicket, setSelectedTicket] = useState('early')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 60000)
    return () => clearInterval(timer)
  }, [])

  const selected = ticketOptions.find((ticket) => ticket.id === selectedTicket)
  const subtotal = selected.price * quantity
  const serviceFee = Math.round(subtotal * 0.05)
  const total = subtotal + serviceFee

  const chooseTicket = (ticketId) => {
    setSelectedTicket(ticketId)
    document.getElementById('resumen-compra')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="entradas" className="tickets-section">
      <div className="tickets-container">
        <header className="tickets-heading">
          <p className="tickets-eyebrow">Entradas</p>
          <h2 className="tickets-title">Asegurá tu lugar antes de que suba el precio</h2>
          <p className="tickets-intro">Elegí cómo querés participar y reservá tu lugar en el evento.</p>
        </header>

        <aside className="early-bird-banner" aria-label="Promoción Early Bird">
          <div className="early-bird-copy">
            <p className="tickets-eyebrow">Early Bird</p>
            <h3>El precio especial termina el 31/10</h3>
            <p>Comprá antes de que la entrada presencial pase de $25.000 a $35.000.</p>
          </div>
          <div className="countdown" aria-label={`Quedan ${timeLeft.days} días, ${timeLeft.hours} horas y ${timeLeft.minutes} minutos`}>
            {[
              { label: 'días', value: timeLeft.days },
              { label: 'horas', value: timeLeft.hours },
              { label: 'min', value: timeLeft.minutes },
            ].map(({ label, value }) => (
              <div key={label} className="countdown-unit">
                <span>{String(value).padStart(2, '0')}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
          <div className="ticket-availability">
            <div className="ticket-availability__labels">
              <span>Quedan 38 de 60 Early Bird</span>
              <span>63% vendidas</span>
            </div>
            <div
              className="ticket-availability__track"
              role="progressbar"
              aria-label="Entradas Early Bird vendidas"
              aria-valuenow="63"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span />
            </div>
          </div>
        </aside>

        <div className="ticket-cards">
          {ticketOptions.map((ticket) => (
            <article
              key={ticket.id}
              className={`ticket-card${ticket.id === 'early' ? ' ticket-card--featured' : ''}`}
            >
              <div className="ticket-card__topline">
                <h3>{ticket.name}</h3>
                <span>{ticket.id === 'early' ? 'Quedan 38' : ticket.id === 'general' ? 'Desde el 1/11' : 'Disponible siempre'}</span>
              </div>
              <p className="ticket-card__price">
                {formatPrice(ticket.price)}
                {ticket.id === 'early' && <del>{formatPrice(35000)}</del>}
              </p>
              <p className="ticket-card__note">{ticket.note}</p>
              <ul className="ticket-benefits">
                {ticketBenefits[ticket.id].map((benefit) => (
                  <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>
                ))}
              </ul>
              <button
                type="button"
                className={ticket.id === 'early' ? 'ticket-button ticket-button--light' : 'ticket-button'}
                onClick={() => chooseTicket(ticket.id)}
              >
                Elegir entrada
              </button>
            </article>
          ))}
        </div>

        <div className="checkout-panel">
          <div className="checkout-form">
            <h3>Elegí tu entrada</h3>
            <div className="checkout-options" role="group" aria-label="Tipo de entrada">
              {ticketOptions.map((ticket) => (
                <button
                  key={ticket.id}
                  type="button"
                  aria-pressed={selectedTicket === ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`checkout-option${selectedTicket === ticket.id ? ' checkout-option--selected' : ''}`}
                >
                  <span>
                    <strong>{ticket.name}</strong>
                    <small>{ticket.note}</small>
                  </span>
                  <strong>{formatPrice(ticket.price)}</strong>
                </button>
              ))}
            </div>

            <div className="quantity-control">
              <span id="quantity-label">Cantidad</span>
              <div>
                <button
                  type="button"
                  aria-label="Quitar una entrada"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  −
                </button>
                <output aria-labelledby="quantity-label">{quantity}</output>
                <button
                  type="button"
                  aria-label="Agregar una entrada"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <p className="checkout-note">El cargo por servicio se calcula sobre el subtotal.</p>
          </div>

          <div id="resumen-compra" className="order-summary" aria-live="polite">
            <h3>Resumen de compra</h3>
            <p className="order-summary__event">Workshop Rolling Code School</p>
            <p className="order-summary__details">Jueves 19/11 · 18:00 hs · Gral. Paz 576, Entrepiso</p>
            <hr />
            <div className="order-summary__line">
              <span>{quantity} entrada{quantity > 1 ? 's' : ''} {selected.name}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="order-summary__line order-summary__line--muted">
              <span>Cargo por servicio (5%)</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            <hr />
            <div className="order-summary__total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="order-summary__secure">
              <span aria-hidden="true">✓</span> Pago protegido. Recibí la entrada por email.
            </p>
            <button type="button" className="ticket-button ticket-button--primary" disabled>
              Compra próximamente
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComprarEntrada
