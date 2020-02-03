declare module 'reqresnext' {
  type IAny = any
  interface IApp {
    get(input: any): any
  }
  type ISocket = Object
  type INext = {
    (...args: any): any
  }
  type IData = any
  interface IDescriptor {
    [key: string]: any
  }
  type ICookie = {
    name: string;
    value: string;
    options: Object;
  }
  type ICookiesMap = {
    [key: string]: ICookie
  }
  type ICookieSetter = {
    (name: string, value: string, options: any): void
  }
  type IHeaderName = string
  type IHeaderValue = string
  type IHeadersMap = {
    [key: string]: IHeaderValue
  }
  export type IHeaders = {
    [key: string]: string | string[]
  }
  type IHeaderSetter = {
    (field: IHeadersMap | IHeaderName, value?: IHeaderValue): void
  }
  type IStatusCode = number
  type IStatusSetter = {
    (value: IStatusCode): void
  }
  type IParamsMap = {
    [key: string]: any
  }
  interface IRequest {
    [key: string]: any;
    res: Object;
  }
  interface IResponse {
    [key: string]: any;
    req: IRequest | Object;
    cookie: ICookieSetter;
    writeHead (code: number, headers: IHeaders): IAny,
    end (data?: string, encoding?: string, cb?: Function): IResponse
  }
  type IConnection = {
    encrypted?: boolean
  }
  type IQuery = {
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
  type IUrl = UrlTypeBasic & {
    href: string;
  }
  type IUrlOpt = UrlTypeBasic & {
    href?: string
  }
  type IRawOptions = IUrlOpt & {
    app?: IApp;
    res?: Object;
    req?: Object;
    body?: IData;
    url?: string;
    connection?: IConnection;
    host?: string;
    statusCode?: number;
    status?: number;
    params?: IParamsMap;
    headers?: IHeadersMap;
    cookies?: ICookiesMap;
    socket?: ISocket;
  }
  interface IRequestOpts {
    constructor(input: IRawOptions): IRequestOpts;
    raw: IRawOptions;
  }
  interface IResponseOpts {
    headers: IHeadersMap;
  }
  class Request implements IRequest {
    [key: string]: any
    cookie: ICookieSetter
    header: IHeaderSetter
    app: IApp | Object
    res: IResponse | Object
    connection: IConnection
    body?: IData
    query?: IQuery
    params?: IParamsMap
    headers: IHeadersMap
    _flush: Function
    _readableState: IAny
    socket: ISocket
    constructor (input?: IRawOptions)
  }
  export class Response implements IResponse{
    [key: string]: any
    cookie: ICookieSetter
    header: IHeaderSetter
    headers: IHeadersMap
    writeHead (code: number, headers: IHeaders): IAny
    _headers: IAny
    status: IStatusSetter
    app: IApp
    req: IRequest | Object
    body: IDescriptor
    emit: Function
    write: Function
    end: (data?: string, encoding?: string, cb?: Function) => IResponse
    constructor (input?: IRawOptions)
  }
  export const reqresnext: {
    (reqOpts?: IRawOptions, resOpts?: IRawOptions, next?: Function): {
      req: IRequest,
      res: IResponse,
      next: Function
    },
    Request: typeof Request,
    Response: typeof Response
  }

  //@ts-ignore
  export = reqresnext
}
