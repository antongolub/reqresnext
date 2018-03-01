// @flow

export function assign<T> (target: T, ...args: any): T {
  Object.assign(target, ...args)

  return target
}

export function isObject(value: any): boolean {
  return typeof value === 'object'
}