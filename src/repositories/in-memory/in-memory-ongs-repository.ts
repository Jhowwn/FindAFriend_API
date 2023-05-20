import { Ong, Prisma } from '@prisma/client'
import { OngsRepository } from '../ogns-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOngsRepository implements OngsRepository {
  public items: Ong[] = []

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

// export class InMemoryUsersRepository implements UsersRepository {

//   async create(data: Prisma.UserCreateInput) {
//     const user = {
//       id: randomUUID(),
//       name: data.name,
//       email: data.email,
//       password_hash: data.password_hash,
//       created_at: new Date(),
//     }
//   }
// }
