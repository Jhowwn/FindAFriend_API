import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet-use-case'
import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ong-repository'

export function MakeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const ongRepository = new PrismaOngsRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    petsRepository,
    ongRepository,
  )

  return registerPetUseCase
}
