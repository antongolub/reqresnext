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

    describe('ip', () => {
      it('resolves value from headers', () => {
        const req = new Request({
          headers: {
            'x-forwarded-for': '192.168.1.10'
          },
          method: 'GET'
        })

        expect(req.ip).to.equal('192.168.1.10')
      })
    })

    describe('method', () => {
      const req = new Request({
        method: 'GET'
      })

      expect(req.method).to.equal('GET')
    })
  })
})
