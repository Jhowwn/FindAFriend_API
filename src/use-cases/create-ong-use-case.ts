import { OngsRepository } from '@/repositories/ogns-repository'
import { Ong } from '@prisma/client'
import { hash } from 'bcryptjs'
// import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface OngUseCasesRequest {
  name: string
  email: string
  password: string
  address: string
  city: string
  state: string
  phone_number: string
}

interface OngUseCaseResponse {
  ong: Ong
}

export class RegisterOngUseCase {
  constructor(private ongsRepository: OngsRepository) { }

  async execute({
    name,
    email,
    password,
    address,
    city,
    state,
    phone_number,
  }: OngUseCasesRequest): Promise<OngUseCaseResponse> {
    const password_hash = await hash(password, 6)
    // const userWithSameEmail = await this.ongsRepository.findByEmail(email)

    // if (userWithSameEmail) {
    //   throw new UserAlreadyExistsError()
    // }

    const ong = await this.ongsRepository.create({
      name,
      email,
      password_hash,
      address,
      city,
      state,
      phone_number,
    })

    return {
      ong,
    }
  }
}
