import reqresnext, { Request, Response, reqresnext as rrn } from '../../main/js'

describe('index', () => {
  it('exposes api', () => {
    expect(reqresnext).toBe(rrn)
    expect(Request).toEqual(expect.any(Function))
    expect(Response).toEqual(expect.any(Function))
    expect(reqresnext).toEqual(expect.any(Function))
  })
})
