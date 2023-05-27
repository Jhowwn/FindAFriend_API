import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ong-repository'
import { GetOngProfileUseCase } from '../get-ong-profile'

export function makeGetOngProfileUseCase() {
  const ongsRepository = new PrismaOngsRepository()
  const ongUseCase = new GetOngProfileUseCase(ongsRepository)

  return ongUseCase
}
