import { OngsRepository } from '@/repositories/ogns-repository'
import { Ong } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOngProfileUseCaseRequest {
  ongId: string
}

interface GetOngProfileUseCaseResponse {
  ong: Ong
}

export class GetOngProfileUseCase {
  constructor(private ongsRepository: OngsRepository) { }

  async execute({
    ongId,
  }: GetOngProfileUseCaseRequest): Promise<GetOngProfileUseCaseResponse> {
    const ong = await this.ongsRepository.findById(ongId)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    return {
      ong,
    }
  }
}
