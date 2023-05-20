import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { ongsRoutes } from './http/controllers/ongs/routes'

export const app = fastify()

app.register(ongsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool loke DataDog/ NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})