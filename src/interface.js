// @flow

export type IAny = any
export interface IApp {
  get(input: any): any
}
export type INext = {
  (...args: any): any
}
export type IData = any
export interface IDescriptor {
  [key: any]: any
}

export type ICookie = {
  name: string;
  value: string;
  options: Object;
}
export type ICookiesMap = {
  [key: string]: ICookie
}
export type ICookieSetter = {
  (name: string, value: string, options: any): void
}
export type IHeaderName = string
export type IHeaderValue = string
export type IHeadersMap = {
  [key: IHeaderName]: IHeaderValue
}
export type IHeaderSetter = {
  (field: IHeadersMap | IHeaderName, value?: ?IHeaderValue): void
}
export type IStatusCode = number
export type IStatusSetter = {
  (value: IStatusCode): void
}
export type IParamsMap = {
  [key: string]: any
}
export interface IRequest {
  [key: string]: any;
  res: Object;
}
export interface IResponse {
  [key: string]: any;
  req: IRequest | Object;
  cookie: ICookieSetter;
}
export type IConnection = {
  encrypted: ?boolean
}
export type IQuery = {
  [key: string]: any
}
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
export type IUrl = UrlTypeBasic & {
  href: string;
}

export type IUrlOpt = UrlTypeBasic & {
  href?: string
}

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
}

export interface IRequestOpts {
  constructor(input: IRawOptions): IRequestOpts;
  raw: IRawOptions;
}
export interface IResponseOpts {
  headers: IHeadersMap;
}
