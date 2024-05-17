import merge from 'lodash.merge';
import { action, input, util } from '@prismatic-io/spectral';
import { connectionInput } from '../inputs';
import { createDuroClient } from '../client';
import axios from 'axios';


const genericRequest = action({
  display: {
    label: 'Raw Request',
    description: 'Make a generic request to the Duro API',
  },
  inputs: {
    connection: connectionInput,
    query: input({
      label: 'Query or Mutation',
      type: 'code',
      required: true,
      language: 'graphql',
      default: `{
  components(libraryType: GENERAL) {
    connection(
      first: 10
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          name
          created
          lastModified
        }
      }
    }
  }
}`,
      clean: util.types.toString,
    }),
    variables: input({
      label: 'Variables',
      type: 'string',
      required: false,
      collection: 'keyvaluelist',
      clean: (val: any) => util.types.keyValPairListToObject(val),
    }),
    variablesObject: input({
      label: 'Variables Object',
      type: 'code',
      language: 'json',
      required: false,
      clean: (value) => (value ? util.types.toObject(value) : {}),
    }),
  },
  perform: async (context, params) => {
    const client = createDuroClient(params.connection);
    const data = await client.request(
      params.query,
      merge(params.variables, params.variablesObject)
    );
    return { data };
  },
});

export default { genericRequest };
