import { action, input, util } from '@prismatic-io/spectral'
import { connectionInput } from '../inputs'
import { createDuroClient } from '../client'
import { gql } from 'graphql-request'

const listChangeOrders = action({
  display: {
    label: 'List Change Orders',
    description: 'Get a list of change orders',
  },
  inputs: {
    connection: connectionInput,
    orderBy: input({
      label: 'Order By',
      type: 'string',
      required: false,
      clean: util.types.toString,
      model: [
        {
          label: 'ID: Ascending',
          value: '[{"con": "asc"}]',
        },
        {
          label: 'ID: Descending',
          value: '[{"con": "desc"}]',
        },
        {
          label: 'Last Modified: Ascending',
          value: '[{"lastModified": "asc"}]',
        },
        {
          label: 'Last Modified: Descending',
          value: '[{"lastModified": "desc"}]',
        },
        {
          label: 'Name: Ascending',
          value: '[{"name": "asc"}]',
        },
        {
          label: 'Name: Descending',
          value: '[{"name": "desc"}]',
        },
      ],
    }),
    first: input({
      label: 'First N Items',
      type: 'string',
      required: false,
      default: 5,
      clean: util.types.toInt,
    }),
  },
  perform: async (context, params) => {
    const client = createDuroClient(params.connection)
    const query = gql`
      query ChangeOrders($first: Int, $orderBy: [ChangeOrdersOrderByInput]) {
        changeOrders(orderBy: $orderBy) {
          connection(first: $first) {
            edges {
              node {
                con {
                  id
                  displayValue
                }
                id
                name
                type
                description
                documentLinks {
                  document {
                    id
                    size
                    src
                    name
                    url
                    status
                    created
                  }
                }
                status
                resolution
                erpOptions {
                  effectivity {
                    endDate
                    startDate
                  }
                  itemType {
                    value
                  }
                }
                created
                creator {
                  email
                  id
                  firstName
                  lastName
                }
                approvalType
                lastModified
              }
            }
          }
        }
      }
    `;
    let variables = {
      first: Math.min(params.first || 100),
      orderBy: params.orderBy ? JSON.parse(params.orderBy) : [],
    }

    const data = await client.request(query, variables)

    return { data }
  },
})


const createChangeOrder = action({
  display: {
    label: 'Create Change Orders',
    description: 'Create a Draft Change Order',
  },
  inputs: {
    connection: connectionInput,
    title: input({
      label: 'Title',
      type: 'string',
      required: true,
      clean: util.types.toString,
    }),
    description: input({
      label: 'Description',
      type: 'string',
      required: false,
      clean: util.types.toString,
    }),
    coType: input({
      label: 'Type',
      type: 'string',
      required: true,
      clean: util.types.toString,
      default: 'ECO',
      model: [
        {
          label: 'ECO',
          value: 'ECO',
        },
        {
          label: 'MCO',
          value: 'MCO',
        },
        {
          label: 'DCO',
          value: 'DCO',
        },
      ]
    }),
  },
  perform: async (context, params) => {
    const client = createDuroClient(params.connection);
    const query = gql`
      mutation CreateChangeOrder($input: CreateChangeOrderInput) {
        createChangeOrder(input: $input) {
          id
          con {
            displayValue
          }
          description
          name
          status
          type
          created
          creator {
            email
            id
            firstName
            lastName
          }
        }
      }
    `;
    let variables = {
      input: {
        name: params.title,
        description: params.description,
        type: params.coType,
      }
    }
    const data = await client.request(query, variables)
    return { data }
  },
})

export default { listChangeOrders, createChangeOrder }
