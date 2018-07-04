declare module 'reqresnext' {
  declare type IAny = any
  declare interface IApp {
    get(input: any): any
  }
  declare type ISocket = Object
  declare type INext = {
    (...args: any): any
  }
  declare type IData = any
  declare interface IDescriptor {
    [key: any]: any
  }
  declare type ICookie = {
    name: string;
    value: string;
    options: Object;
  }
  declare type ICookiesMap = {
    [key: string]: ICookie
  }
  declare type ICookieSetter = {
    (name: string, value: string, options: any): void
  }
  declare type IHeaderName = string
  declare type IHeaderValue = string
  declare type IHeadersMap = {
    [key: IHeaderName]: IHeaderValue
  }
  declare type IHeaderSetter = {
    (field: IHeadersMap | IHeaderName, value?: ?IHeaderValue): void
  }
  declare type IStatusCode = number
  declare type IStatusSetter = {
    (value: IStatusCode): void
  }
  declare type IParamsMap = {
    [key: string]: any
  }
  declare interface IRequest {
    [key: string]: any;
    res: Object;
  }
  declare interface IResponse {
    [key: string]: any;
    req: IRequest | Object;
    cookie: ICookieSetter;
  }
  declare type IConnection = {
    encrypted: ?boolean
  }
  declare type IQuery = {
    [key: string]: any
  }
  declare type UrlTypeBasic = {
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
  declare type IUrl = UrlTypeBasic & {
    href: string;
  }
  declare type IUrlOpt = UrlTypeBasic & {
    href?: string
  }
  declare type IRawOptions = IUrlOpt & {
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
  declare interface IRequestOpts {
    constructor(input: IRawOptions): IRequestOpts;
    raw: IRawOptions;
  }
  declare interface IResponseOpts {
    headers: IHeadersMap;
  }
  declare class Request {
    $key: string,
    $value: IAny,
    cookie: ICookieSetter,
    header: IHeaderSetter,
    app: IApp | Object,
    res: IResponse | Object,
    connection: IConnection,
    body: ?IData,
    query: ?IQuery,
    params: ?IParamsMap,
    headers: IHeadersMap,
    _flush: Function,
    _readableState: IAny,
    socket: ISocket,
    constructor (input: ?IRawOptions): IRequest
  }
  declare class Response {
    $key: string,
    $value: IAny,
    cookie: ICookieSetter,
    header: IHeaderSetter,
    headers: IHeadersMap,
    _headers: IAny,
    status: IStatusSetter,
    app: IApp,
    req: IRequest | Object,
    body: IDescriptor,
    emit: Function,
    write: Function,
    end: Function,
    constructor (input: ?IRawOptions): IResponse
  }
  declare module.exports: {
    (reqOpts: ?IRawOptions, resOpts: ?IRawOptions, next: ?Function): {
      req: IRequest,
      res: IResponse,
      next: Function
    },
    Request: typeof Request,
    Response: typeof Response
  }
}
