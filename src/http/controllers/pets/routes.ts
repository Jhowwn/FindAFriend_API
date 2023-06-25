import { FastifyInstance } from 'fastify'
import { register } from './register'
import { searchPetByCity } from './searchByCity'
import { searchPetByCharacteristics } from './searchByCharacteristics'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/pets/by-city', searchPetByCity)
  app.get('/pets/by-characteristics', searchPetByCharacteristics)
}
