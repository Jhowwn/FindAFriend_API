import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetByCityUseCase } from '../fetch-pets-by-city-use-case'

export function MakeFetchPetByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new FetchPetByCityUseCase(petsRepository)

  return registerPetUseCase
}
