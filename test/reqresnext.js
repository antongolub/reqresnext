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
})
