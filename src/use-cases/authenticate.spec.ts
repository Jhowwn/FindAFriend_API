import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { AuthenticateUseCase } from './authenticate'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/Invalid-credentials-error'

let ongsRepository: InMemoryOngsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new AuthenticateUseCase(ongsRepository)
  })

  it('Should be able to authenticate', async () => {
    await ongsRepository.create({
      name: 'test',
      email: 'test@example.com',
      password_hash: await hash('123456', 6),
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    const { ong } = await sut.execute({
      email: 'test@example.com',
      password: '123456',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('Should not be able authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'test@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await ongsRepository.create({
      name: 'test',
      email: 'test@example.com',
      password_hash: await hash('123456', 6),
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    await expect(() =>
      sut.execute({
        email: 'test@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
