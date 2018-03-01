// @flow

import type {
  IStatus,
  IResponse,
  IResponseOpts,
  IHandler,
  IHandlersMap,
  IEvent,
  IData,
  IHeaderName,
  IHeaderValue,
  IHeaderMap
} from './interface'

import { assign, isObject } from './util'

export const FINISH = 'finish'

export default class Res implements IResponse {
  body: IData
  statusCode: IStatus
  constructor (opts: ?IResponseOpts) {
    this.body = ''
    this.__handlers = {}
    assign(this, opts)
  }

  get headers (): IHeaderMap {
    return this.__headers
  }

  write (data: IData) {
    this.body += data
    return this
  }

  send(value: IData) {
    this.body = '' + (isObject(value) ? JSON.stringify(value) : value);
    this.__trigger(FINISH);
    return this;
  }
  end() {
    this.__trigger(FINISH);
    return this;
  }

  header(field: IHeaderName | IHeaderMap, value: ?IHeaderValue): IResponse {
    if (isObject(value)) {
      assign(this.__headers, value);
    }
    return this;
  }
  json(value: IData) {
    this.send(JSON.stringify(value));
    return this;
  }
  status(status: IStatus) {
    this.statusCode = status;
    return this;
  }
  on(event: IEvent, handler: IHandler) {
    this.__handlers[event] = this.__handlers[event] || [];
    this.__handlers[event]
      .push(handler);

    return this;
  }
  pipe() {}
  __headers: IHandlersMap
  __handlers: IHandlersMap
  __trigger(event: IEvent) {
    const stack = this.__handlers[event]

    if (stack) {
      stack.forEach(handler => handler())
    }
    /*this.__handlers[event].forEach()
    each(this.__handlers[event], handler => handler());
    */
  }
}