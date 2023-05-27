import { OngsRepository } from '@/repositories/ogns-repository'
import { Ong } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'

interface OngUseCasesRequest {
  name: string
  email: string
  password: string
  address: string
  city: string
  cep: string
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
    cep,
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
      cep,
      phone_number,
    })

    return {
      ong,
    }
  }
}
