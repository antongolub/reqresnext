// @flow

import { each } from 'lodash'
import setprototypeof from 'setprototypeof'
import type { IAny } from './interface'

export { setprototypeof }
export { each, assign, isObject, isString, isBuffer } from 'lodash'

export function appendAdditionalProps (target: Object, props: Object): void {
  each(props, (v: IAny, k: string) => {
    if (!(k in target)) {
      target[k] = v
    }
  })
}

export function concat (...strings: Array<?string>): string {
  return strings.join('')
}
