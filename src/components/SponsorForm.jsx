import { useRef, useState } from 'react'

const maxSize = 5 * 1024 * 1024
const allowedTypes = new Set(['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'])

function UploadIcon() {
  return <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 16H6a4 4 0 0 1-1-7.87 7 7 0 0 1 13-1A4.5 4.5 0 0 1 18 16h-1M12 20V10m-4 4 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export default function SponsorForm() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [dragging, setDragging] = useState(false)
  const input = useRef(null)
  const confirmation = useRef(null)

  function chooseFile(next) {
    setStatus('')
    setFile(null)
    if (!next) { setError(''); return }
    if (!allowedTypes.has(next.type)) { setError('Seleccioná un logo PNG, SVG, JPG o WEBP.'); return }
    if (next.size > maxSize) { setError('El logo debe pesar como máximo 5 MB.'); return }
    setError('')
    setFile(next)
  }

  function submit(event) {
    event.preventDefault()
    if (error) { input.current.focus(); return }
    event.currentTarget.reset()
    setFile(null)
    setError('')
    setDragging(false)
    setStatus('Completaste los datos de tu postulación correctamente.')
    requestAnimationFrame(() => {
      confirmation.current?.focus({ preventScroll: true })
      confirmation.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    })
  }

  return <section id="sumate-sponsor" className="landing-container landing-section sponsor-application" aria-labelledby="sponsor-form-title">
    <header className="sponsor-application__header"><h2 id="sponsor-form-title">Sumate como Sponsor</h2><p>Conectá tu marca con más de 120 talentos IT, programadores junior, semi-seniors y líderes tecnológicos del norte argentino. Completá el formulario y nos contactaremos en menos de 24 horas hábiles.</p></header>
    <form className="sponsor-form" onSubmit={submit} onChange={() => setStatus('')}>
      <div className="sponsor-form__row">
        <label htmlFor="sponsor-name">Nombre <span>*</span><input id="sponsor-name" name="name" autoComplete="given-name" placeholder="Ej. Martín" required maxLength={80} pattern=".*\S.*" /></label>
        <label htmlFor="sponsor-surname">Apellido <span>*</span><input id="sponsor-surname" name="surname" autoComplete="family-name" placeholder="Ej. González" required maxLength={80} pattern=".*\S.*" /></label>
      </div>
      <div className="sponsor-form__row">
        <label htmlFor="sponsor-company">Empresa <span>*</span><input id="sponsor-company" name="company" autoComplete="organization" placeholder="Ej. Acme Technologies" required maxLength={120} pattern=".*\S.*" /></label>
        <label htmlFor="sponsor-email">Email corporativo <span>*</span><input id="sponsor-email" name="email" type="email" autoComplete="email" placeholder="martin@acme.com" required maxLength={254} /></label>
      </div>
      <label htmlFor="sponsor-tier">Tipo de sponsor <span>*</span><select id="sponsor-tier" name="tier" defaultValue="" required><option value="" disabled>Seleccioná un nivel de sponsoreo</option><option value="diamond">Diamante — Main partner</option><option value="gold">Oro — Gold tier</option><option value="bronze">Bronce — Bronze tier</option></select></label>
      <div><label htmlFor="sponsor-logo">Logo de la empresa</label><div className={`sponsor-dropzone${dragging ? ' is-dragging' : ''}`} onDragOver={event => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); input.current.value = ''; chooseFile(event.dataTransfer.files[0]) }}>
        <input ref={input} id="sponsor-logo" name="logo" type="file" accept=".png,.svg,.jpg,.jpeg,.webp" aria-describedby="sponsor-file-help sponsor-file-error" aria-invalid={Boolean(error)} onChange={event => chooseFile(event.target.files[0])} />
        <span className="sponsor-upload-icon"><UploadIcon /></span><strong>{file ? file.name : 'Hacé clic para adjuntar tu logo o arrastralo aquí'}</strong><p id="sponsor-file-help">Archivos aceptados: PNG, SVG, JPG o WEBP (fondo transparente recomendado, máx. 5 MB)</p>
      </div><p id="sponsor-file-error" className="sponsor-error" role="alert">{error}</p>{file && <button type="button" className="sponsor-remove" onClick={() => { chooseFile(null); input.current.value = '' }}>Quitar logo</button>}</div>
      <label htmlFor="sponsor-message">Mensaje opcional<textarea id="sponsor-message" name="message" rows={4} maxLength={2000} placeholder="Contanos sobre tu empresa y por qué buscás ser Sponsor del evento" /></label>
      <button className="sponsor-submit" type="submit"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m21 3-6 18-4-8-8-4 18-6ZM11 13 21 3" strokeLinejoin="round" /></svg>Enviar postulación de Sponsor</button>
      <p className="sponsor-notice">Los campos con * son obligatorios. Este formulario todavía no envía datos.</p>
    </form>
    {status && <div ref={confirmation} className="sponsor-confirmation" role="status" tabIndex={-1}>
      <span className="sponsor-confirmation__icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg></span>
      <div><h3>¡Postulación completada!</h3><p>{status}</p><small>El formulario quedó limpio. No se enviaron datos a un servidor.</small></div>
    </div>}
  </section>
}
