import { useEffect, useRef, useState } from 'react'
import './EventChat.css'
import { answerEventQuestion } from '../utils/eventAssistant'

const topics = ['Entradas y precios', 'Agenda y horarios', 'Speakers', 'Cómo llegar', 'Ser sponsor']
const welcome = { text: '¡Hola! Soy el asistente del workshop. Puedo ayudarte con entradas, charlas, ubicación y sponsors.', bot: true }


export default function EventChat({ open, onClose }) {
  const panel = useRef(null)
  const history = useRef(null)
  const [messages, setMessages] = useState([welcome])
  const [question, setQuestion] = useState('')

  useEffect(() => {
    if (!open) return
    const dialog = panel.current
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = overflow }
  },[open])

  useEffect(() => { if (history.current) history.current.scrollTop = history.current.scrollHeight },[messages,open])

  function ask(value) {
    const query = value.trim().slice(0,300)
    if (!query) return
    setMessages(current => [...current.slice(-37),{ text: query, bot: false },{ ...answerEventQuestion(query), bot: true }])
    setQuestion('')
  }

  return <dialog ref={panel} className="event-chat" aria-labelledby="event-chat-title" aria-describedby="event-chat-description" onClose={onClose}>
    <header className="event-chat__header"><div><h2 id="event-chat-title">Rolling Bot</h2><p id="event-chat-description">Tu guía del workshop · Respuestas automáticas</p></div><button type="button" aria-label="Cerrar chat" onClick={onClose}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></header>
    <div ref={history} className="event-chat__messages" role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversación">{messages.map((message,index) => <div key={index} className={`event-chat__message${message.bot ? '' : ' event-chat__message--user'}`}><span className="sr-only">{message.bot ? 'Asistente: ' : 'Vos: '}</span><p>{message.text}</p>{message.href && <a href={message.href} onClick={onClose} {...(message.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{message.label} ↗</a>}</div>)}</div>
    <div className="event-chat__topics" aria-label="Consultas frecuentes">{topics.map(topic => <button type="button" key={topic} onClick={() => ask(topic)}>{topic}</button>)}</div>
    <form className="event-chat__form" onSubmit={event => { event.preventDefault(); ask(question) }}><label className="sr-only" htmlFor="event-chat-question">Tu consulta sobre el evento</label><input id="event-chat-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={300} placeholder="Escribí tu consulta…" autoComplete="off" /><button type="submit" disabled={!question.trim()} aria-label="Enviar consulta"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg></button></form>
  </dialog>
}
