// @flow

import { URL } from 'url'

export type IAny = any
export interface IApp {
  get(input: any): any
}

/**
 */
export type ISocket = Object

/**
 * Next callback
 */
export type INext = {
  (...args: any): any
}
export type IData = any
export interface IDescriptor {
  [key: any]: any
}

/**
 * Cookie declaration
 */
export type ICookie = {
  name: string;
  value: string;
  options: Object;
}

/**
 * Cookie map
 */
export type ICookiesMap = {
  [key: string]: ICookie
}

/**
 */
export type ICookieSetter = {
  (name: string, value: string, options: any): void
}

/**
 */
export type IHeaderName = string

/**
 */
export type IHeaderValue = string

/**
 * Headers map
 */
export type IHeadersMap = {
  [key: IHeaderName]: IHeaderValue
}

/**
 */
export type IHeaderSetter = {
  (field: IHeadersMap | IHeaderName, value?: ?IHeaderValue): void
}

/**
 */
export type IStatusCode = number

/**
 */
export type IStatusSetter = {
  (value: IStatusCode): void
}

/**
 */
export type IParamsMap = {
  [key: string]: any
}

/**
 * Request interface
 */
export interface IRequest {
  [key: string]: any;
  res: Object;
}

/**
 * Response interface
 */
export interface IResponse {
  [key: string]: any;
  req: IRequest | Object;
  cookie: ICookieSetter;
}

/**
 */
export type IConnection = {
  encrypted: ?boolean
}

/**
 * Query map
 */
export type IQuery = {
  [key: string]: any
}

/**
 * URL object
 */
type UrlTypeBasic = {
  protocol?: string;
  host?: string;
  hostname?: string;
  query?: IQuery;
  hash?: string;
  port?: string;
  pathname?: string;
  search?: string;
  slashes?: boolean;
  auth?: any
}
export type IUrl = URL
/*
{
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  query?: IQuery;
}
*/

export type IUrlOpt = UrlTypeBasic & {
  href?: string
}

/**
 * Raw options
 */
export type IRawOptions = IUrlOpt & {
  app?: ?IApp;
  res?: ?Object;
  req?: ?Object;
  body?: ?IData;
  url?: string;
  connection?: ?IConnection;
  host?: ?string;
  statusCode? :?number;
  status? :?number;
  params? :?IParamsMap;
  headers? :?IHeadersMap;
  cookies?: ?ICookiesMap;
  socket?: ?ISocket;
}

/**
 */
export interface IRequestOpts {
  constructor(input: IRawOptions): IRequestOpts;
  raw: IRawOptions;
}

/**
 */
export interface IResponseOpts {
  headers: IHeadersMap;
}
