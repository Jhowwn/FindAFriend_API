import { OngsRepository } from '@/repositories/ogns-repository'
import { Ong } from '@prisma/client'
import { InvalidCredentialsError } from './errors/Invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  ong: Ong
}

export class AuthenticateUseCase {
  constructor(private ongsRepository: OngsRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const ong = await this.ongsRepository.findByEmail(email)

    if (!ong) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, ong.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      ong,
    }
  }
}
