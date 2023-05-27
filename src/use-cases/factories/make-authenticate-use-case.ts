import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ong-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const ongsRepository = new PrismaOngsRepository()
  const authenticateUseCase = new AuthenticateUseCase(ongsRepository)

  return authenticateUseCase
}
