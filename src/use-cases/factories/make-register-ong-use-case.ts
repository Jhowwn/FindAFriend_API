import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ong-repository'
import { RegisterOngUseCase } from '../create-ong-use-case'

export function MakeRegisterOngUseCase() {
  const ongRepository = new PrismaOngsRepository()
  const registerOngUseCase = new RegisterOngUseCase(ongRepository)

  return registerOngUseCase
}
