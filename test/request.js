import chai from 'chai'
import Request from '../src/request'

const {expect} = chai

describe('request', () => {
  describe('proto', () => {
    describe('url', () => {
      it('exposes path parts as getters', () => {
        const req = new Request({url: 'https://example.com'})

        expect(req.hostname).to.equal('example.com')
        expect(req.protocol).to.equal('https')
      })

      it('opts form has priority', () => {
        const req = new Request({host: 'foobar.com', protocol: 'http', url: 'https://example.com'})

        expect(req.path).to.equal('/')
        expect(req.hostname).to.equal('foobar.com')
        expect(req.host).to.equal('foobar.com')
        expect(req.protocol).to.equal('http')
      })
    })

    describe('headers', () => {
      it('exposes proper getters', () => {
        const req = new Request({headers: {foo: 'bar', baz: 'qux'}})

        expect(req.headers.foo).to.equal('bar')
        expect(req.header('foo')).to.equal('bar')
        expect(req.get('BAZ')).to.equal('qux')
      })
    })
  })
})
