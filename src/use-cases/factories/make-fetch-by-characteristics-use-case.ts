import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetByCharacteristicsUseCase } from '../fetch-pets-by-characteristics'

export function MakeFetchPetByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new FetchPetByCharacteristicsUseCase(
    petsRepository,
  )

  return registerPetUseCase
}
