import { createTicketSvg, downloadTicket } from '../utils/ticketReceipt'

export default function DigitalTicket({ receipt }) {
  const image = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(createTicketSvg(receipt))}`
  return <div className="digital-ticket">
    <img className="digital-ticket__image" src={image} width="640" height="850" alt={`Comprobante ${receipt.operation}: ${receipt.quantity} entradas ${receipt.ticket}. Total informativo $${receipt.total.toLocaleString('es-AR')}. Sin validez de acceso.`} />
    <button type="button" className="ticket-button ticket-button--primary digital-ticket__download" onClick={() => downloadTicket(receipt)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></svg>Descargar comprobante</button>
    <p className="digital-ticket__help">Archivo SVG, listo para guardar o imprimir. El código de barras es decorativo.</p>
  </div>
}
