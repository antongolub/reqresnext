import reqresnext, { Request, Response } from '../src'

describe('index', () => {
  it('exposes api', () => {
    expect(Request).toEqual(expect.any(Function))
    expect(Response).toEqual(expect.any(Function))
    expect(reqresnext).toEqual(expect.any(Function))
  })
})
