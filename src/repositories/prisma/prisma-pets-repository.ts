import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findByCity(city: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: { city },
      take: 20,
      skip: (page - 1) * 20,
    })
    return pets
  }

  async findByCharacteristics(characteristics: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: { characteristics },
      take: 20,
      skip: (page - 1) * 20,
    })
    return pets
  }
}
