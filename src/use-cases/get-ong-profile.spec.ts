import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { GetOngProfileUseCase } from './get-ong-profile'

let ongsRepository: InMemoryOngsRepository
let sut: GetOngProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new GetOngProfileUseCase(ongsRepository)
  })

  it('Should be able to get ong profile', async () => {
    const createdOng = await ongsRepository.create({
      name: 'test',
      email: 'test@example.com',
      password_hash: await hash('123456', 6),
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    const { ong } = await sut.execute({
      ongId: createdOng.id,
    })

    expect(ong.id).toEqual(expect.any(String))
    expect(ong.name).toEqual('test')
  })

  it('Should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        ongId: 'not-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
