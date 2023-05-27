import { OngAlreadyExistsError } from '@/use-cases/errors/ong-already-exists-error'
import { MakeRegisterOngUseCase } from '@/use-cases/factories/make-register-ong-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    phone_number: z.string().min(8),
    city: z.string(),
    cep: z.string(),
  })

  const { name, email, password, phone_number, address, city, cep } =
    registerBodySchema.parse(request.body)

  try {
    const ongUseCase = MakeRegisterOngUseCase()
    await ongUseCase.execute({
      name,
      email,
      password,
      phone_number,
      address,
      city,
      cep,
    })
  } catch (err) {
    if (err instanceof OngAlreadyExistsError) {
      reply.status(409).send({ message: err.message })

      throw err
    }
  }

  return reply.status(201).send()
}
