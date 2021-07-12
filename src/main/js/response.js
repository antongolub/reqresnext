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
import {
  assign,
  each,
  isString,
  isBuffer,
  concat,
  setprototypeof,
  appendAdditionalProps
} from './util'
import DEFAULT_APP from './app'

// $FlowFixMe
const { response } = express

type Record<T, V> = {
  [T]: V
}

export const DEFAULT_STATUS_CODE = 200
export const DEFAULT_HEADERS: Record<any, any> = {}
export const DEFAULT_COOKIES: Record<any, any> = {}
export const DEFAULT_REQ: Record<any, any> = {}

export default class Response implements IResponse {
  $key: string

  $value: IAny

  cookie: ICookieSetter

  header: IHeaderSetter

  headers: IHeadersMap

  _headers: IAny

  status: IStatusSetter

  app: IApp

  req: IRequest | Object

  body: IDescriptor

  emit: Function

  write: Function

  end: Function

  constructor (input: ?IRawOptions) {
    setprototypeof(this, response)
    const opts = new ResOptions(input || {})

    let body: IData
    Object.defineProperty(this, 'body', ({
      get () { return body },
      set (value: IData) { throw new Error('Use .send(), .write() or .json()') }
    }: Object))

    const write = this.write.bind(this)
    this.write = (chunk: IData, encoding?: ?string, callback?: ?Function): IResponse => {
      if (isBuffer(chunk)) {
        body = concat(body, chunk.toString(encoding))
      } else if (isString(chunk)) {
        body = concat(body, chunk)
      }
      if (chunk !== undefined) {
        write(chunk, encoding, callback)
      }
      return this
    }
    this.end = (chunk: IData, encoding?: ?string): IResponse => {
      if (chunk) {
        body = chunk
      }
      this.emit('finish')
      return this
    }
    this._headers = null
    this.req = opts.req
    this.app = opts.app
    this.status(opts.statusCode)
    this.header(opts.headers)

    each(opts.cookies, ({ name, value, options }: ICookie): void => this.cookie(name, value, options))

    // Passes additional props
    appendAdditionalProps(this, opts.raw)
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
