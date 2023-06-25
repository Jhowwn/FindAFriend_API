import { OngAlreadyExistsError } from '@/use-cases/errors/ong-already-exists-error'
import { MakeRegisterOngUseCase } from '@/use-cases/factories/make-register-ong-use-case'
import { MakeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    gender: z.enum(['Femea', 'Macho']),
    characteristics: z.string(),
    energy: z.string(),
    independence: z.string(),
    type: z.string(),
    size: z.string(),
    city: z.string(),
    requeriedNeed: z.string().array(),
    ongId: z.string(),
  })

  const {
    name,
    age,
    gender,
    characteristics,
    energy,
    city,
    description,
    independence,
    size,
    type,
    ongId,
    requeriedNeed,
  } = registerBodySchema.parse(request.body)

  try {
    const petUseCase = MakeRegisterPetUseCase()

    await petUseCase.execute({
      name,
      age,
      gender,
      characteristics,
      energy,
      city,
      description,
      independence,
      size,
      type,
      ongId,
      requeriedNeed,
    })
  } catch (err) {
    if (err instanceof OngAlreadyExistsError) {
      reply.status(409).send({ message: err.message })

      throw err
    }
  }

  return reply.status(201).send()
}
