import reqresnext from '../src/reqresnext'

describe('reqresnext', () => {
  it('generates proper map', () => {
    const {req, res, next} = reqresnext({
      method: 'GET',
      url: '/http://example.com'
    })

    expect(req).toEqual(expect.any(Object))
    expect(res).toEqual(expect.any(Object))
    expect(next).toEqual(expect.any(Function))
  })

  describe('req-res cross links:', () => {
    it('are added if not specified in the opts', () => {
      const {req, res} = reqresnext({}, {})

      expect(req.res).toEqual(res)
      expect(res.req).toEqual(req)
    })

    it('are skipped otherwise', () => {
      const foo = {}
      const bar = {}
      const {req, res} = reqresnext({res: foo}, {req: bar})

      expect(req.res).toEqual(foo)
      expect(res.req).toEqual(bar)
    })
  })
})
