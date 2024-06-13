import { action, input, util } from '@prismatic-io/spectral'
import { connectionInput } from '../inputs'
import { createDuroClient } from '../client'
import { gql } from 'graphql-request'

const getComponentById = action({
  display: {
    label: 'Get Component by ID',
    description: 'Get a specific component by a unique identifier',
  },
  inputs: {
    connection: connectionInput,
    id: input({
      label: 'ID',
      type: 'string',
      required: true,
      clean: util.types.toString,
    }),
  },
  perform: async (context, params) => {
    const client = createDuroClient(params.connection)
    const query = gql`
query ComponentsByIds($ids: [ID]) {
  componentsByIds(ids: $ids) {
    id
    cpn {
      displayValue
    }
    created
    category
    archived
    customSpecs {
      key
      specId
      value
    }
    description
    documentLinks {
      document {
        src
        name
        mime
        id
        archived
        url
      }
      specs {
        status
        type
        revision
        lastModified
      }
    }
    eid
    family
    images {
      mime
      creator {
        email
      }
      name
      src
    }
    legacyCpn
    lastModified
    manufacturers {
      name
      description
      mpn {
        key
        src
      }
    }
    name
    primarySource {
      dpn
      distributor
      manufacturer
      minQuantity
      mpn
      unitPrice
    }
    specs {
      key
      value
    }
    status
    revisionValue
    workflowState
    vendorId
    creator {
      id
      email
      firstName
      lastName
    }
    revisionHistory {
      id
      cpn {
        displayValue
      }
      revisionValue
    }
    children {
      component {
        id
      }
    }
    modified
    imageIds
  }
}
    `;
    const variables = {
      ids: [params.id],
    }

    const data  = await client.request(query, variables)

    return { data }
  },
})

export default { getComponentById }
