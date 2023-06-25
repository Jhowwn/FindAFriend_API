import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'

export async function createAndTakeOngId(app: FastifyInstance) {
  const ong = await prisma.ong.create({
    data: {
      name: 'test',
      email: 'test3@example.com',
      password_hash: await hash('123456', 6),
      address: 'rua test 142',
      city: 'São Paulo',
      cep: 'São Paulo',
      phone_number: '123456789',
      role: 'ADMIN',
    },
  })

  const ongId = ong.id

  return { ongId }
}
