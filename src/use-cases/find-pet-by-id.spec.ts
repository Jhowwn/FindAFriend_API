import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { FindPetByIdUseCase } from './find-pet-by-id'

let petsRepository: InMemoryPetRepository
let sut: FindPetByIdUseCase

describe('Find a Pet by id', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetRepository()
    sut = new FindPetByIdUseCase(petsRepository)
  })

  it('Should find Pet by id', async () => {
    const createPet = await petsRepository.create({
      name: 'cão',
      description: 'Cachorro',
      age: '8',
      characteristics: 'Preto e branco',
      energy: '4',
      gender: 'Macho',
      independence: '2',
      size: 'Grande',
      type: 'Cachorro',
      ong_id: '23',
      city: 'São Paulo',
      requiredNeeds: ['teste', 'teste'],
    })

    const { pet } = await sut.execute({
      petId: createPet.id,
    })

    expect(pet.name).toEqual('cão')
  })
})
