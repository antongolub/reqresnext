import Request from '../src/request'

describe('request', () => {
  describe('proto', () => {
    describe('url', () => {
      it('exposes path parts as getters', () => {
        const req = new Request({url: 'https://example.com'})

        expect(req.hostname).toBe('example.com')
        expect(req.protocol).toBe('https')
      })

      it('opts form has priority', () => {
        const req = new Request({host: 'foobar.com', protocol: 'http', url: 'https://example.com'})

        expect(req.path).toBe('/')
        expect(req.hostname).toBe('foobar.com')
        expect(req.host).toBe('foobar.com')
        expect(req.protocol).toBe('http')
      })
    })

    describe('headers', () => {
      it('exposes proper getters', () => {
        const req = new Request({headers: {foo: 'bar', baz: 'qux'}})

        expect(req.headers.foo).toBe('bar')
        expect(req.header('foo')).toBe('bar')
        expect(req.get('BAZ')).toBe('qux')
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

        expect(req.ip).toBe('192.168.1.10')
      })
    })

    describe('method', () => {
      it('is passed down', () => {
        const req = new Request({
          method: 'GET'
        })
        expect(req.method).toBe('GET')
      })
    })

    describe('events', () => {
      it('on', () => {
        let foo
        const req = new Request()
        req.on('data', () => {
          foo = 'bar'
        })
        req.emit('data')

        expect(foo).toBe('bar')
      })
    })
  })
})
