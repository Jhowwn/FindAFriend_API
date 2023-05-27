import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { RegisterOngUseCase } from './create-ong-use-case'
import { describe, expect, beforeEach, it } from 'vitest'
import { compare } from 'bcryptjs'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'

let ongsRepository: InMemoryOngsRepository
let sut: RegisterOngUseCase

describe('Register a new Ong', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new RegisterOngUseCase(ongsRepository)
  })

  it('Should be able to register a Ong', async () => {
    const { ong } = await sut.execute({
      name: 'test',
      email: 'test@example.com',
      password: '123456',
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const { ong } = await sut.execute({
      name: 'test',
      email: 'test@example.com',
      password: '123456',
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare('123456', ong.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'test',
      email,
      password: '123456',
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    await expect(() =>
      sut.execute({
        name: 'test',
        email,
        password: '123456',
        address: 'rua test 142',
        city: 'São Paulo',
        cep: '12345678-9',
        phone_number: '123456789',
      }),
    ).rejects.toBeInstanceOf(OngAlreadyExistsError)
  })
})
