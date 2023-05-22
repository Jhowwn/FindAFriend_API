import { Ong, Prisma } from '@prisma/client'
import { OngsRepository } from '../ogns-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOngsRepository implements OngsRepository {
  public items: Ong[] = []

  async findByEmail(email: string) {
    const ong = this.items.find((item) => item.email === email)

    if (!ong) {
      return null
    }

    return ong
  }

  async create(data: Prisma.OngCreateInput) {
    const ong = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      phone_number: data.phone_number,
      city: data.city,
      state: data.state,
    }

    this.items.push(ong)

    return ong
  }
}
