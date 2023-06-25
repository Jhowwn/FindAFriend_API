import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { RegisterPetUseCase } from './register-pet-use-case'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'

let petsRepository: InMemoryPetRepository
let ongsRepository: InMemoryOngsRepository
let sut: RegisterPetUseCase

describe('Register a new Pet', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetRepository()
    ongsRepository = new InMemoryOngsRepository()
    sut = new RegisterPetUseCase(petsRepository, ongsRepository)
  })

  it('Should create a new Pet', async () => {
    const { id } = await ongsRepository.create({
      name: 'test',
      email: 'test@example.com',
      password_hash: '123456',
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    const { pet } = await sut.execute({
      name: 'cão',
      description: 'Cachorro',
      age: '8',
      characteristics: 'Preto e branco',
      energy: '4',
      gender: 'Macho',
      independence: '2',
      size: 'Grande',
      type: 'Cachorro',
      ongId: id,
      city: 'São Paulo',
      requeriedNeed: ['teste', 'teste'],
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('cão')
    expect(pet.requiredNeeds).toHaveLength(2)
  })
})
