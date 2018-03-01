// @flow

export interface IRequest {
  __headers: IHandlersMap
}
export interface IResponse {
  __headers: IHandlersMap;
  __handlers: IHandlersMap;
  body: IData;
  header(field: IHeaderName | IHeaderMap, value: ?IHeaderValue): IResponse;
}
export type INext = Function

export type IStatus = number
export type IRequestOpts = {}
export type IResponseOpts = {}

export type IHandler = {
  (): any;
}
export type IHandlerStack = Array<IHandler>
export type IHandlersMap = Object

export type IHeaderValue = string
export type IHeaderName = string
export interface IHeaderMap {
  [key: IHeaderName]: IHeaderValue;
}

export type IEvent = string
export type IData = any
