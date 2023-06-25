import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PetUseCaseRequest {
  city: string
  page: number
}

interface PetUseCaseResponse {
  pet: Pet[]
}

export class FetchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    city,
    page,
  }: PetUseCaseRequest): Promise<PetUseCaseResponse> {
    const pet = await this.petsRepository.findByCity(city, page)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
