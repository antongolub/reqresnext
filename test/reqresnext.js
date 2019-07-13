import reqresnext from '../src/reqresnext'

describe('reqresnext', () => {
  it('generates proper result map', () => {
    const { req, res, next } = reqresnext({
      method: 'GET',
      url: 'http://example.com'
    })

    expect(req).toEqual(expect.any(Object))
    expect(res).toEqual(expect.any(Object))
    expect(next).toEqual(expect.any(Function))
  })

  describe('req-res cross links:', () => {
    it('are added if not specified in the opts', () => {
      const { req, res } = reqresnext({}, {})

      expect(req.res).toEqual(res)
      expect(res.req).toEqual(req)
    })

    it('are skipped otherwise', () => {
      const foo = {}
      const bar = {}
      const { req, res } = reqresnext({ res: foo }, { req: bar })

      expect(req.res).toEqual(foo)
      expect(res.req).toEqual(bar)
    })
  })

  describe('next', () => {
    it('creates empty fn if param is undefined', () => {
      const { next } = reqresnext()

      expect(next).toEqual(expect.any(Function))
      expect(next()).toBeUndefined()
    })

    it('passes back optional handler', () => {
      const handler = () => {}
      const { next } = reqresnext({}, {}, handler)

      expect(next).toBe(handler)
    })
  })
})
