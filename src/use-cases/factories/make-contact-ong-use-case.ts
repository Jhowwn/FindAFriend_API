import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ong-repository'
import { ContactUseCase } from '../contact'

export function makeContactUseCase() {
  const ongsRepository = new PrismaOngsRepository()
  const contactUseCase = new ContactUseCase(ongsRepository)

  return contactUseCase
}
