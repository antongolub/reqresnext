import reqresnext from '../../main/js/reqresnext'
import express from 'express'

describe('express', () => {
  it('reqresnext correctly 404s when no route handlers are available', (done) => {
    const { req, res } = reqresnext({
      method: 'GET',
      url: '/'
    })

    const app = express()

    res.on('finish', () => {
      expect(res.statusCode).toBe(404)
      done()
    })

    app(req, res)
  })

  it('route handler is called when available', (done) => {
    const { req, res } = reqresnext({
      method: 'GET',
      url: '/'
    }, {})

    const app = express()
    app.get('/', (_req, _res) => {
      return _res.sendStatus(200)
    })

    res.on('finish', () => {
      expect(res.statusCode).toBe(200)
      done()
    })

    app(req, res)
  })
})
