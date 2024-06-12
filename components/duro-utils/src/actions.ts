import { action, input } from '@prismatic-io/spectral'
import jwt, { SignOptions, Secret } from 'jsonwebtoken'

const email = input({
  label: 'Email',
  type: 'string',
  required: true,
})

const serviceAccountEmail = input({
  label: 'Service Account Email',
  type: 'string',
  required: true,
})

const scopes = input({
  label: 'Scopes',
  comments: 'List URLs separated by a space',
  placeholder: 'https://www.googleapis.com/auth/drive',
  type: 'string',
  required: true,
})

const tokenURL = input({
  label: 'Token URL',
  placeholder: 'https://oauth2.googleapis.com/token',
  type: 'string',
  required: true,
})

const privateKeyID = input({
  label: 'Private Key ID',
  type: 'string',
  required: true,
})

const privateKey = input({
  label: 'Private Key',
  type: 'string',
  required: true,
})

export const jwtSign = action({
  display: {
    label: 'JWT: Encode',
    description: 'Encode and create a JSON Webtoken',
  },
  perform: async (context, params) => {
    const iat = Date.now() / 1000
    const exp = iat + 3600
    const payload: object = {
      iss: params.serviceAccountEmail,
      sub: params.email,
      scope: params.scopes,
      aud: params.tokenURL,
      iat: iat,
      exp: exp,
    }
    const header: object = {
      kid: params.privateKeyID,
    }
    const token = jwt.sign(payload, params.privateKey as Secret, { algorithm: 'RS256', header } as SignOptions)

    return {
      data: { token },
    }
  },
  inputs: {
    email,
    serviceAccountEmail,
    scopes,
    tokenURL,
    privateKeyID,
    privateKey,
  },
})

export default { jwtSign }
