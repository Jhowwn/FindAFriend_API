import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  findByCity(city: string, page: number): Promise<Pet[] | null>
  findByCharacteristics(
    characteristics: string,
    page: number,
  ): Promise<Pet[] | null>
}
