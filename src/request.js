// @flow

import type {
  IRequest,
  IHandlersMap,
  IHeaderName,
  IRequestOpts,
  IHeaderMap,
  IHeaderValue
} from './interface'

import { assign } from './util';

export default class Req implements IRequest{
  __headers: IHandlersMap
  constructor(opts: ?IRequestOpts) {
    this.__headers = {};
    assign(this, opts);
  }
  get(name: IHeaderName): ?IHeaderValue {
    return this.__headers[name];
  }
  get headers(): IHeaderMap {
    return this.__headers
  }
  header() {}
  set() {}
  pipe() {}
}