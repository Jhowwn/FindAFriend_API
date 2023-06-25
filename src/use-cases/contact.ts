import { OngsRepository } from '@/repositories/ogns-repository'
import { InvalidCredentialsError } from './errors/Invalid-credentials-error'

interface ContactUseCaseRequest {
  ongId: string
}

interface ContactUseCaseResponse {
  whatsapp: string
}

export class ContactUseCase {
  constructor(private ongsRepository: OngsRepository) { }

  async execute({
    ongId,
  }: ContactUseCaseRequest): Promise<ContactUseCaseResponse> {
    const ong = await this.ongsRepository.findById(ongId)

    if (!ong) {
      throw new InvalidCredentialsError()
    }

    if (!ong.phone_number) {
      throw new Error('Not a valid phone number')
    }

    const whatsapp = ong.phone_number

    return {
      whatsapp,
    }
  }
}
