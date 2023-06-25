import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      characteristics: data.characteristics,
      energy: data.energy,
      gender: data.gender,
      independence: data.independence,
      size: data.size,
      type: data.type,
      city: data.city,
      ong_id: data.ong_id,
      requiredNeeds: data.requiredNeeds ?? [],
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(petId: string) {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCity(city: string, page: number) {
    const pet = this.items
      .filter((item) => item.city === city)
      .slice((page - 1) * 20, page * 20)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCharacteristics(characteristics: string, page: number) {
    const pet = this.items
      .filter((item) => item.characteristics === characteristics)
      .slice((page - 1) * 20, page * 20)

    if (!pet) {
      return null
    }

    return pet
  }
}
