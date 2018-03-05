import chai from 'chai'
import reqresnext, { Request, Response } from '../src'

const { expect } = chai

describe('index', () => {
  it('exposes proper api', () => {
    expect(Request).to.be.a('function')
    expect(Response).to.be.a('function')
    expect(reqresnext).to.be.a('function')
  })
})
