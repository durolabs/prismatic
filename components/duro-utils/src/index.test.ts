import { jwtSign } from './actions'
import {
  invoke,
} from '@prismatic-io/spectral/dist/testing'

describe('test jwtSign', () => {
  test('verify the return value of my action', async () => {
    // random generated mock key -- must look like this.
    const privateKeyID = 'f15ec68f103a6726d8dd94d3951bff6e83c36bd2'
    const privateKey = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGr+o8NxnwQsHc
JdQ/CNDTPvloMlnpYGBG2p5wC9LefssT0bfXb31Zz9n6rP0L5dNE12H3Gii8c4yv
DpcJoXdopiwAX7b00VEotlXrXP2MhRFlnDgy1Kf7ArdB471PxWpHJocbrp9MvE/9
tTU0KbGL2lpF8Qogx9aH3c6NPWR1bJ6Hurb0V5hJ/uVoyoyPUTcxQGcCgBlSjj6F
jQ+aDGb8BlEc8LlFu4jKjLiRUPrkHNoaRodZ2IJgm8g4yz7yj/dJc6rozOzdysxu
xgXZiHStWV9A6AfM4Eg4h7Tdk0WSIIdT8p71EKW+qWRGLvzgld2L65M7TXxyZA2v
7A4+p3djAgMBAAECggEADYXCuJ88O4C8cCuxV5DvO+r/T1SN9gPb/NAh4TJZnOo4
QnyouUrnPYn98sFI5g4ASqEpRu4Xpt8EzJOyB+YrZr3yJLX4kVtlqkWupCD+4kxB
ANwyOJNsoCxxJVTgrGGdROmd+Tsk45ropTXRQMZnRRA/yjhut6IIodQ6aJzf2qkp
GuQvOlkJawAT/jf3mXNIz8OUQbDeL/iB2cyZHI1IhZJM3IPnt4xy4TnrAPTrvKZm
6z2qrTezNJBFpSOlJX2zzkIg1xQG0nrL4G7yaOnZPkia4+2IqQ2EYhADkYWZI0uS
YpQNHGHqJLeV9QMpASpECZ7LTUfp4zvqGF8xOB0nwQKBgQDviIQ499P/0lgSljWf
lM/yIdyfutdE/++b2DXP/Y/LqVrqeXqGqgxsWyNxCbPukQC4L+P3j25xGwjcJKYN
d3ijPlhIEiMMr2zCN2+WIOI6uCd49DyL0uv5xs3tWM0oSGsjHASm0FKyM4hJyI0V
8r7y3x94ccjeWVQkyI/D43YR0QKBgQDUWI8CfW26/lOo+hIxVW9ky9N9JVecyT9f
KgspI4AmQlKNnp6c110+IfPWkvtXTkfkM//TazvInm1CgHoY0/rmuL0siyEZo0oL
3g3jUhseDoadVSmr2u2uXLg9S3NiIeHg8Dsf53SMeTzpjoixlHYsXPjRqbiMpzQy
w8tQV5Eu8wKBgAoYTMpB15Nuf/u4jOX+1Yy01KF+tFfaGXUN9aagXxEMQCKln/5Q
6FkgtiurZwPk5Izep9LlHphxtTvh54WlxVXL6NiQux1rvz+oKnG/TQmAfVlhobOa
3gsWz9Ly7SKHesxt/9wv52xPM604YInOQzHlKWRgF0EXrq4mLbjpuy4hAoGAN7/A
XBD+HBflcvmkiRs7EaWJstN4+wrC/oMVRwmw/VpwPgok7lyEeGmFkRIptrQwn7Mf
OSxwF62wVcNRSu9sceKSl/03BXofWJpF3yaRRATgRrIzLJFf0WU6Ya1Lb7ohiWLI
wwmLSc4Stebb8HNfyynlkXYTo6nKRIGvATrcPQ0CgYEAjda/3m6tm6j1sCbTpfK+
B+7as8Ci0xHz3f8KsvvBHKd4oQWRSxqEDS0JR3JiHXQfTOKP4iH9PYSCpnxDgGfM
kS8U8Sy5uWuS0izGBR07njOsqw1/G6hKmhepOVtYmgVTWL790yNWdChsdgfP2If7
P79uo/6yTjkEMgrsR8USYFk=
-----END PRIVATE KEY-----
`;

    const response  = await invoke(jwtSign, {
      email: 'dustin.and.vishnu@durolabs.co',
      serviceAccountEmail: 'some.google.service@durolabs.co',
      scopes: 'https://www.googleapis.com/auth/drive',
      tokenURL: 'https://oauth2.googleapis.com/token',
      privateKeyID,
      privateKey,
    })
    expect(response.result.data.token).toHaveLength(730)
  })
})
