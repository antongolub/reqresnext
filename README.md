# reqresnext

[![Build Status](https://travis-ci.com/antongolub/reqresnext.svg?branch=master)](https://travis-ci.com/antongolub/reqresnext)
[![npm (tag)](https://img.shields.io/npm/v/reqresnext/latest.svg)](https://www.npmjs.com/package/reqresnext)
[![Maintainability](https://api.codeclimate.com/v1/badges/b6f37eeb4ba506b87f6c/maintainability)](https://codeclimate.com/github/antongolub/reqresnext/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b6f37eeb4ba506b87f6c/test_coverage)](https://codeclimate.com/github/antongolub/reqresnext/test_coverage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Tiny helper for [expressjs](https://expressjs.com/) middlewares testing.

##### Motivation
There're several nice mocking tools for express/connect.
The best of them (imho) is [node-mocks-http](https://github.com/howardabrams/node-mocks-http) by Howard Abrams.
This lib brings constructors, that accurately reproduces logic of express classes. That's pretty cool, but sometimes you need a bit more.

Reqresnext:
1. Just uses `express` proto directly. So you get not _just similar_, but _exactly the same_ behaviour as in production.
2. Exposes the only additional property to verify outgoing data — `res.body`.

## Install
```bash
npm add reqresnext -D
yarn add reqresnext -D
```

## Usage
```javascript
    import reqresnext from 'reqresnext'
 
    it('middleware does something', () => {
      const {req, res, next} = reqresnext(<ReqOptions>, <ResOptions>)
      mware(req, res, next)
 
      expect(res.statusCode).toEqual('...')
      expect(res.body).toEqual('...')
    })
```
#### Request & Response
Also you may construct `req/res` instances directly:
```javascript
    import {Response, Request} from 'reqresnext'

    const foo = {name: 'foo', value: 'bar', options: {}}
    const res = new Response({cookies: [foo]})
    
    expect(res.get('Set-Cookie')).toEqual('foo=bar; Path=/')
```
Supported options are described in [interface](./src/interface.js). The main ones:
```javascript
// cookies
    const foo = {name: 'foo', value: 'bar', options: {}}
    const res = new Response({cookies: [foo]})

// headers
    const req = new Request({headers: {foo: 'bar', baz: 'qux'}})

// url
    const req = new Request({url: 'https://example.com'})
```

Any additional props that does not intersect with proto are injected as is.
```javascript
    const res = new Response({foo: 'bar', baz: 1, ...})
    res.foo // 'bar'
```

#### `next()` handler 
`Next` handler may be wrapped with `spy` anytime: before or after `reqresnext`. If function is specified, the factory just passes it back.
```javascript
    const handler = chai.spy(() => {})
    const {next} = reqresnext({}, {}, handler)
    
    next === handler // true  
```
