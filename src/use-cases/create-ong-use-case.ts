import { OngsRepository } from '@/repositories/ogns-repository'
import { Ong } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'
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
    const ongWithSameEmail = await this.ongsRepository.findByEmail(email)

    if (ongWithSameEmail) {
      throw new OngAlreadyExistsError()
    }

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
