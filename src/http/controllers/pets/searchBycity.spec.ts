import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOng } from '@/utils/tests/createAndAuthenticateOng'
import { createAndTakePet } from '@/utils/tests/createAndTakePet'

describe('Search by city (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search a pet by city', async () => {
    const { token } = await createAndAuthenticateOng(app)
    await createAndTakePet(app)

    const response = await request(app.server)
      .get('/pets/by-city')
      .query({
        city: 'São Paulo',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
