import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { FetchPetByCityUseCase } from './fetch-pets-by-city-use-case'

let petsRepository: InMemoryPetRepository
let sut: FetchPetByCityUseCase

describe('Register a new Pet', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetRepository()
    sut = new FetchPetByCityUseCase(petsRepository)
  })

  it('Should fetch Pets by the city', async () => {
    await petsRepository.create({
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
      city: 'São Paulo',
      page: 1,
    })

    expect(pet).toHaveLength(1)
    expect(pet).toEqual([expect.objectContaining({ city: 'São Paulo' })])
    expect(pet).toEqual([
      expect.objectContaining({
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
      }),
    ])
  })

  it('Should be able to fetch a paginate pets by the city', async () => {
    for (let i = 0; i < 22; i++) {
      petsRepository.create({
        name: `Cão ${i}`,
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
    }

    const { pet } = await sut.execute({
      city: 'São Paulo',
      page: 2,
    })

    expect(pet).toHaveLength(2)
  })
})
