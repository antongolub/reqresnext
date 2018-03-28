// @flow

import type {
  IAny,
  IResponse,
  IRequest,
  IRawOptions,
  IApp,
  IConnection,
  IData,
  IQuery,
  IParamsMap,
  IHeadersMap,
  IHeaderSetter,
  IUrl,
  ICookieSetter,
  ISocket
} from './interface'

import express from 'express'
import url from 'url'
import {
  assign,
  setprototypeof,
  appendAdditionalProps
} from './util'
import DEFAULT_APP from './app'

// $FlowFixMe
const { request, response } = express

export default class Req implements IRequest {
  $key: string
  $value: IAny
  cookie: ICookieSetter
  header: IHeaderSetter
  app: IApp | Object
  res: IResponse | Object
  connection: IConnection
  body: ?IData
  query: ?IQuery
  params: ?IParamsMap
  headers: IHeadersMap
  _flush: Function
  _readableState: IAny
  socket: ISocket

  constructor (input: ?IRawOptions): IRequest {
    const opts = new ReqOptions(input || {})
    setprototypeof(this, request)

    this._flush = () => {}
    this._readableState = {}
    this.socket = opts.socket
    this.app = opts.app
    this.res = opts.res
    this.headers = opts.headers
    this.body = opts.body
    this.params = opts.params
    this.connection = opts.connection

    // Passes additional props
    appendAdditionalProps(this, opts.raw)

    return this
  }
}

export class ReqOptions {
  raw: IRawOptions
  headers: IHeadersMap
  app: IApp | Object
  res: IResponse | Object
  connection: IConnection
  body: ?IData
  query: ?IQuery
  params: ?IParamsMap
  socket: ISocket

  constructor (input: IRawOptions) {
    this.res = input.res || {}
    this.app = input.app || DEFAULT_APP

    const headers = {}
    const urlStr: string = input.url || 'localhost'
    const urlOpts = input.host
      ? input
      : { host: urlStr }
    const urlData: IUrl = url.parse(url.format(urlOpts))
    const connection = assign(
      { encrypted: urlData.protocol === 'https:' },
      input.connection || {}
    )
    const context = {
      set (k: string, v: string): void { headers[k] = v }
    }
    response.header.call(context, input.headers)
    const host: string = headers.host || urlData.host
    headers.host = host

    this.headers = headers
    this.query = urlData.query
    this.body = input.body
    this.params = input.params || {}
    this.connection = connection
    this.raw = input
    this.socket = input.socket || {}

    return this
  }
}
