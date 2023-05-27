import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to refresh token', async () => {
    await request(app.server).post('/ongs').send({
      name: 'test',
      email: 'test@example.com',
      password: '123456',
      address: 'rua test 142',
      city: 'São Paulo',
      cep: '12345678-9',
      phone_number: '123456789',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'test@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken'),
    ])
  })
})
