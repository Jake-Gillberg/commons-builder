// You can import your modules
// import index from '../src/index'

import nock from 'nock'
// Requiring our app implementation
import myProbotApp from '../src'
import { Probot } from 'probot'
// Requiring our fixtures
import payload from './fixtures/issues.opened.json'
const fs = require('fs')
const path = require('path')

nock.disableNetConnect()

describe('My Probot app', () => {
  let probot: any
  let mockCert: string

  beforeAll((done: Function) => {
    fs.readFile(path.join(__dirname, 'fixtures/mock-cert.pem'), (err: Error, cert: string) => {
      if (err) return done(err)
      mockCert = cert
      done()
    })
  })

  beforeEach(() => {
    probot = new Probot({ id: 123, cert: mockCert })
    // Load our app into probot
    probot.load(myProbotApp)
  })

  test('creates a comment when an issue is opened', async done => {
    const addComment = `
      mutation comment($id: ID!, $body: String!) {
        addComment(input: {subjectId: $id, body: $body}) {
          clientMutationId
        }
      }
    `

    // Test that a commented is posted
    nock('https://api.github.com')
      .post('/graphql', (body: any) => {
        expect(body.query.trim).toBe(addComment.trim)
        expect(body.variables).toMatchObject({ body: 'Hello World' })
        done()
        return true
      })
      .reply(200)

    // Recieve a webhook event
    await probot.receive({ name: 'issues', payload })
  })
})

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock
