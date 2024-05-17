import { action, input } from '@prismatic-io/spectral'
import { connectionInput } from '../inputs'
import { createDuroClient } from '../client'
import { gql } from 'graphql-request'

const getCurrentUser = action({
  display: {
    label: 'Get Current User',
    description: 'Get information about the currently authenticated user',
  },
  inputs: {
    connection: connectionInput
  },
  perform: async (context, params) => {
    const client = createDuroClient(params.connection)
    const query = gql`
      query UserById {
        userById {
          lastName
          email
          firstName
          id
          activeLibrary {
            company {
              id
              name
            }
          }
        }
      }

    `;
    const data = await client.request(query)
    return { data }
  },
})

export default { getCurrentUser }
