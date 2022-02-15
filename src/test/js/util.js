import { convertKeysToLowerCase } from '../../main/js/util'

describe('util', () => {
  describe('convertKeysToLowerCase', () => {
    it('converts object keys to lower case keys', () => {
      const map = {
        prop: 'value',
        standard_Notation: 42,
        'BaZ-Header': 'qux'
      }

      const lowerCasedMap = convertKeysToLowerCase(map)

      expect(map.standard_Notation).toEqual(42, 'original map is not modified')

      expect(lowerCasedMap.prop).toEqual('value')
      expect(lowerCasedMap.standard_notation).toEqual(42)
      expect(lowerCasedMap['baz-header']).toEqual('qux')
    })
  })
})
