import { Prisma } from '@prisma/client'
import { OngsRepository } from '../ogns-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOngsRepository implements OngsRepository {
  async create(data: Prisma.OngCreateInput) {
    const ong = await prisma.ong.create({
      data,
    })

    return ong
  }
}
