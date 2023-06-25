import { OngsRepository } from '@/repositories/ogns-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type Gender = 'Femea' | 'Macho'

interface PetUseCaseRequest {
  name: string
  description: string
  gender: Gender
  type: string
  age: string
  energy: string
  size: string
  independence: string
  characteristics: string
  city: string
  ongId: string
  requeriedNeed: string[]
}

interface PetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private ongsRepository: OngsRepository,
  ) { }

  async execute({
    name,
    description,
    age,
    gender,
    characteristics,
    energy,
    independence,
    type,
    size,
    city,
    ongId,
    requeriedNeed,
  }: PetUseCaseRequest): Promise<PetUseCaseResponse> {
    const ong = await this.ongsRepository.findById(ongId)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      characteristics,
      energy,
      gender,
      independence,
      size,
      type,
      ong: ongId,
      city,
      requiredNeeds: requeriedNeed,
    })

    return {
      pet,
    }
  }
}
