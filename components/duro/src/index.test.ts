import dotenv from 'dotenv'
dotenv.config()

import {
  createConnection,
  createHarness,
} from '@prismatic-io/spectral/dist/testing'
import myComponent from '.'
import connections from './connections'

const harness = createHarness(myComponent)

const myConnection = createConnection(connections[0], {
  duroEnvironment: process.env.DURO_ENVIRONMENT_URL,
  username: process.env.DURO_API_KEY,
})

describe('Get component by ID action', () => {
  const TEST_ID = '637c53c4aa0ae5000a56673a'
  test('Ensure get component by ID action returns with correct data', async () => {
    const result = await harness.action('getComponentById', {
      connection: myConnection,
      id: TEST_ID,
    }) as any

    expect(result?.data).toHaveProperty('componentsByIds')
    expect(Array.isArray(result?.data.componentsByIds)).toBe(true)
    expect(result?.data.componentsByIds.length).toBe(1)
    expect(result?.data.componentsByIds[0]).toHaveProperty('id', TEST_ID)

  })
})
