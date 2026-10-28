import test from 'node:test'
import assert from 'node:assert/strict'
import { answerEventQuestion } from './eventAssistant.js'

test('responde consultas de precio con importes y enlace al checkout', () => {
  const answer = answerEventQuestion('¿Cuánto cuesta la entrada virtual?')
  assert.equal(answer.href,'#entradas')
  assert.match(answer.text,/15\.000/)
  assert.match(answer.text,/5%/)
})

test('normaliza acentos y mayúsculas para encontrar la ubicación', () => {
  const answer = answerEventQuestion('¿DÓNDE ES EL EVENTO?')
  assert.equal(answer.href,'#como-llegar')
  assert.match(answer.text,/576/)
})

test('distingue agenda, speakers y postulación de sponsor', () => {
  assert.equal(answerEventQuestion('Agenda y horarios').href,'#agenda')
  assert.equal(answerEventQuestion('Speakers').href,'#speakers')
  assert.equal(answerEventQuestion('Quiero ser sponsor').href,'#sumate-sponsor')
  assert.match(answerEventQuestion('¿Quién es Mauro?').text,/Mauro Coniglio/)
})

test('no inventa respuestas a preguntas fuera de la información del evento', () => {
  const answer = answerEventQuestion('¿Hay estacionamiento privado gratuito?')
  assert.doesNotMatch(answer.text,/hay estacionamiento|estacionamiento gratuito/i)
  const unknown = answerEventQuestion('¿Cuántos años tiene la escuela?')
  assert.match(unknown.text,/No tengo información confirmada/)
  assert.equal(unknown.href,'https://rollingcodeschool.com/')
})
