import { Prisma } from '@prisma/client'
import { OngsRepository } from '../ogns-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOngsRepository implements OngsRepository {
  async findByEmail(email: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        email,
      },
    })

    return ong
  }

  async create(data: Prisma.OngCreateInput) {
    const ong = await prisma.ong.create({
      data,
    })

    return ong
  }
}
