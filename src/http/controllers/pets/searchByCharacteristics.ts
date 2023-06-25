import { MakeFetchPetByCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-by-characteristics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function searchPetByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByCharacteristicsQuerySchema = z.object({
    characteristics: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { characteristics, page } = fetchByCharacteristicsQuerySchema.parse(
    request.query,
  )

  const fetchByCharacteristicsUseCase = MakeFetchPetByCharacteristicsUseCase()
  const { pet } = await fetchByCharacteristicsUseCase.execute({
    characteristics,
    page,
  })

  return reply.status(200).send({
    pet,
  })
}
