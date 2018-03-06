import chai from 'chai'
import Response from '../src/response'

const {expect} = chai

describe('response', () => {
  describe('construtor', () => {
    it('inherits http.ServerResponse', () => {
      const res = new Response()

      expect(res.pipe).to.be.a('function')
      expect(res.setHeader).to.be.a('function')
      expect(res.getHeader).to.be.a('function')
    })

    it('passes optional props', () => {
      const end = () => {}
      const res = new Response({foo: 'bar', end})

      expect(res.foo).to.equal('bar')
      expect(res.end).not.to.equal(end)
    })
  })

  describe('proto', () => {
    it('send', () => {
      const res = new Response()
      res.send('foo')
      expect(res.body).to.equal('foo')
    })

    it('json', () => {
      const res = new Response()
      const data = {foo: 'bar'}
      res.json(data)

      expect(res.body).to.equal(JSON.stringify(data))
    })

    it('body', () => {
      const res = new Response()
      res.send('foo')
      expect(res.body).to.equal('foo')

      expect(() => {
        res.body = 'bar'
      }).to.throw('Use .send(), .write() or .json()')
    })

    it('cookies', () => {
      const foo = {name: 'foo', value: 'bar', options: {}}
      const res = new Response({cookies: [foo]})

      expect(res.get('Set-Cookie')).to.equal('foo=bar; Path=/')
    })

    it('on', () => {
      let foo
      const res = new Response()
      res.on('finish', () => {
        foo = 'bar'
      })

      res.send('')

      expect(foo).to.equal('bar')
    })
  })
})
