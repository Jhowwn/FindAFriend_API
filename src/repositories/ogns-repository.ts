import { Ong, Prisma } from '@prisma/client'

export interface OngsRepository {
  findByEmail(email: string): Promise<Ong | null>
  findById(id: string): Promise<Ong | null>
  create(data: Prisma.OngCreateInput): Promise<Ong>
}
