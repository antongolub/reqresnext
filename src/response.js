// @flow

import type {
  IAny,
  IApp,
  IData,
  IStatusCode,
  IHeadersMap,
  IRequest,
  IResponse,
  IRawOptions,
  IResponseOpts,
  ICookie,
  ICookiesMap,
  ICookieSetter,
  IHeaderSetter,
  IStatusSetter,
  IDescriptor
} from './interface'

import express from 'express'
import setprototypeof from 'setprototypeof'
import { assign, each } from './util'
import DEFAULT_APP from './app'

// $FlowFixMe
const { response } = express

export const DEFAULT_STATUS_CODE = 200
export const DEFAULT_HEADERS = {}
export const DEFAULT_COOKIES = {}
export const DEFAULT_REQ = {}

export default class Response implements IResponse {
  $key: string
  $value: IAny
  cookie: ICookieSetter
  header: IHeaderSetter
  headers: IHeadersMap
  status: IStatusSetter
  app: IApp
  req: IRequest | Object
  body: IDescriptor

  constructor (input: ?IRawOptions): IResponse {
    const opts = new ResOptions(input || {})
    setprototypeof(this, response)

    let body: IData
    // $FlowFixMe
    this.end = (chunk: IData, encoding: ?string) => { body = chunk; this.emit('finish') }
    Object.defineProperty(this, 'body', ({
      get () {
        return body
      },
      set (value: IData) {
        throw new Error('Use .send(), .write() or .json()')
      }
    }: Object))
    this.req = opts.req
    this.app = opts.app
    this.status(opts.statusCode)
    this.header(opts.headers)

    each(opts.cookies, ({name, value, options}: ICookie): void => {
      this.cookie(name, value, options)
    })

    // Passes additional props
    each(opts.raw, (v: IAny, k: string) => {
      if (!(k in this)) {
        this[k] = v
      }
    })

    return this
  }
}

export class ResOptions implements IResponseOpts {
  raw: IRawOptions
  statusCode: IStatusCode
  headers: IHeadersMap
  cookies: ICookiesMap
  app: IApp | Object
  req: IRequest | Object

  constructor (input: IRawOptions) {
    this.raw = input

    this.statusCode = ((input.statusCode || input.status || DEFAULT_STATUS_CODE) | 0)
    this.headers = assign({}, DEFAULT_HEADERS, input.headers || {})
    this.cookies = assign({}, DEFAULT_COOKIES, input.cookies || {})
    this.app = input.app || DEFAULT_APP
    this.req = input.req || DEFAULT_REQ
  }
}
