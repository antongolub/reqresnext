// @flow

import type {
  IRequestOpts,
  IResponseOpts,
} from './interface'

import Res from './response'
import Req from './request'

export function gen(reqOpts: ?IRequestOpts, resOpts: ?IResponseOpts) {
  return {
    req: new Req(reqOpts),
    res: new Res(resOpts),
    next() {}
  };
}

export default gen;