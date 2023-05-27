import { makeGetOngProfileUseCase } from '@/use-cases/factories/make-get-ong-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetOngProfileUseCase()

  const { ong } = await getUserProfile.execute({
    ongId: request.user.sub,
  })

  return reply.status(200).send({ ...ong, password_hash: undefined })
}
