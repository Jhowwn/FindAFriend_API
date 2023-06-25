import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { createAndTakeOngId } from './createAndTakeOngId'

export async function createAndTakePet(app: FastifyInstance) {
  const { ongId } = await createAndTakeOngId(app)

  const pet = await prisma.pet.create({
    data: {
      name: 'cão',
      description: 'Cachorro',
      age: '8',
      characteristics: 'Preto e branco',
      energy: '4',
      gender: 'Macho',
      independence: '2',
      size: 'Grande',
      type: 'Cachorro',
      ong_id: ongId,
      city: 'São Paulo',
      requiredNeeds: ['teste', 'teste'],
    },
  })

  return { pet }
}
