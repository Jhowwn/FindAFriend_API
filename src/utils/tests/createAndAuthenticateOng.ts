import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOng(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.ong.create({
    data: {
      name: 'test',
      email: 'test@example.com',
      password_hash: await hash('123456', 6),
      address: 'rua test 142',
      city: 'São Paulo',
      cep: 'São Paulo',
      phone_number: '123456789',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'test@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
