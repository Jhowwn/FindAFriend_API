import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { MakeFetchPetByCityUseCase } from '@/use-cases/factories/make-fetch-by-city'

export async function searchPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByCityQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = fetchByCityQuerySchema.parse(request.query)

  const fetchByCityUseCase = MakeFetchPetByCityUseCase()
  const { pet } = await fetchByCityUseCase.execute({
    city,
    page,
  })

  return reply.status(200).send({
    pet,
  })
}
