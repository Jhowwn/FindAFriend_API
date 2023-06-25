import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { ContactUseCase } from './contact'

let ongsRepository: InMemoryOngsRepository
let sut: ContactUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new ContactUseCase(ongsRepository)
  })

  it('Should be able to authenticate', async () => {
    const creteOng = await ongsRepository.create({
      name: 'test',
      email: 'test@example.com',
      password_hash: await hash('123456', 6),
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    const { whatsapp } = await sut.execute({
      ongId: creteOng.id,
    })

    expect(whatsapp).toEqual('123456789')
  })
})
