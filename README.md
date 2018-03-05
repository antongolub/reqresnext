# reqresnext
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![buildStatus](https://img.shields.io/travis/antongolub/reqresnext.svg?maxAge=60000&branch=master)](https://travis-ci.org/antongolub/reqresnext)
[![Coveralls](https://img.shields.io/coveralls/antongolub/reqresnext.svg?maxAge=60000)](https://coveralls.io/github/antongolub/reqresnext)
[![dependencyStatus](https://img.shields.io/david/antongolub/reqresnext.svg?maxAge=60000)](https://david-dm.org/antongolub/reqresnext)
[![devDependencyStatus](https://img.shields.io/david/dev/antongolub/reqresnext.svg?maxAge=60000)](https://david-dm.org/antongolub/reqresnext)

Tiny helper for express middleware testing

##### Motivation
There're several nice mocking tools for express.
The best of them (imho) is [node-mocks-http](https://github.com/howardabrams/node-mocks-http) by Howard Abrams.
This lib brings constructors, that accurately reproduces logic of express classes. That's pretty cool, but sometimes you need a bit more.

Reqresnext:
1. Just uses express proto directly.
2. Exposes the only additional property to verify outdoing data — `res.body`.

##### Usage
```javascript
    import reqresnext from 'reqresnext'
    
    it('middleware does something', () => {
      const {req, res, next} = reqresnext({...}, {...})
      mware(req, res, next)
 
      expect(res.statusCode).to.equal('...')
      expect(res.body).to.equal('...')
    })
```