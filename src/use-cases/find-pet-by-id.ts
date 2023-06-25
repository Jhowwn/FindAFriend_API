import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PetUseCaseRequest {
  petId: string
}

interface PetUseCaseResponse {
  pet: Pet
}

export class FindPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ petId }: PetUseCaseRequest): Promise<PetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
