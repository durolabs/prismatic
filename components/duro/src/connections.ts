import { connection, input } from '@prismatic-io/spectral'


const duroEnvironment = input({
  label: 'Duro Environment',
  placeholder: 'Duro Environment',
  type: 'string',
  required: true,
  model: [
    {
      label: 'Main',
      value: 'https://mfg.duro.app/graphql',
    },
    {
      label: 'ITAR',
      value: 'https://app.govduro.us/graphql',
    },
  ],
})

const apiKey = connection({
  key: 'apiKey',
  label: 'Duro API Key',
  inputs: {
    username: {
      label: 'Duro API Key',
      placeholder: 'xxxyyyzzz',
      type: 'string',
      required: true,
    },
    duroEnvironment,
  },
})

export default [apiKey]
