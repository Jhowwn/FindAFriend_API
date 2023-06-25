import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndTakeOngId } from '@/utils/tests/createAndTakeOngId'
import { createAndAuthenticateOng } from '@/utils/tests/createAndAuthenticateOng'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOng(app)
    const { ongId } = await createAndTakeOngId(app)

    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'cão',
        description: 'Cachorro',
        age: '8',
        characteristics: 'Preto e branco',
        energy: '4',
        gender: 'Macho',
        independence: '2',
        size: 'Grande',
        type: 'Cachorro',
        ongId,
        city: 'São Paulo',
        requeriedNeed: ['teste', 'teste'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
