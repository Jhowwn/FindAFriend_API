import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function ongsRoutes(app: FastifyInstance) {
  app.post('/ongs', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
  //* *Authenticated */

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
