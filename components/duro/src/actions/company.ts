import { action, input } from '@prismatic-io/spectral'
import { connectionInput } from '../inputs'
import { createDuroClient } from '../client'
import { gql } from 'graphql-request'

const listCompanyUsers = action({
  display: {
    label: 'List Company Users',
    description: 'Get account information from each user in your company library',
  },
  inputs: {
    connection: connectionInput
  },
  perform: async (context, params) => {
    const client = createDuroClient(params.connection)
    const query = gql`
      query UserById {
        userById {
          primaryCompany {
            id
            name
            users {
              email
              id
              firstName
              lastName
              created
              role
              title
              lastLogin
            }
          }
        }
      }
    `;
    const data = await client.request(query)
    return { data: (data as any).userById.primaryCompany }
  },
})

export default { listCompanyUsers }


