import Response from '../src/response'

describe('response', () => {
  describe('construtor', () => {
    it('inherits http.ServerResponse', () => {
      const res = new Response()

      expect(res.pipe).toEqual(expect.any(Function))
      expect(res.setHeader).toEqual(expect.any(Function))
      expect(res.getHeader).toEqual(expect.any(Function))
    })

    it('passes optional props', () => {
      const end = () => {}
      const res = new Response({foo: 'bar', end})

      expect(res.foo).toBe('bar')
      expect(res.end).not.toEqual(end)
    })
  })

  describe('proto', () => {
    it('send', () => {
      const res = new Response()
      res.send('foo')
      expect(res.body).toBe('foo')
    })

    it('json', () => {
      const res = new Response()
      const data = {foo: 'bar'}
      res.json(data)

      expect(res.body).toEqual(JSON.stringify(data))
    })

    it('body', () => {
      const res = new Response()
      res.send('foo')
      expect(res.body).toBe('foo')

      expect(() => {
        res.body = 'bar'
      }).toThrow('Use .send(), .write() or .json()')
    })

    it('cookies', () => {
      const foo = {name: 'foo', value: 'bar', options: {}}
      const res = new Response({cookies: [foo]})

      expect(res.get('Set-Cookie')).toBe('foo=bar; Path=/')
    })

    it('on', () => {
      let foo
      const res = new Response()
      res.on('finish', () => {
        foo = 'bar'
      })

      res.send('')

      expect(foo).toBe('bar')
    })

    it('write', () => {
      const res = new Response()
      res.write('foo')
      res.write(Buffer.from('bar'))
      expect(res.body).toBe('foobar')
    })
  })
})
