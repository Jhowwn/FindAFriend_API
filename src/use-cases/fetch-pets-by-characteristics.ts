import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PetUseCaseRequest {
  characteristics: string
  page: number
}

interface PetUseCaseResponse {
  pet: Pet[]
}

export class FetchPetByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    characteristics,
    page,
  }: PetUseCaseRequest): Promise<PetUseCaseResponse> {
    const pet = await this.petsRepository.findByCharacteristics(
      characteristics,
      page,
    )

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
