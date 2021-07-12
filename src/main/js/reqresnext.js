// @flow

import type {
  IRawOptions, IRequest, IResponse
} from './interface'

import { isUndefined } from 'lodash'
import Response from './response'
import Request from './request'

export default function gen (reqOpts: ?IRawOptions, resOpts: ?IRawOptions, next: ?Function): {req: IRequest, res: IResponse, next: Function} {
  const req = new Request(reqOpts)
  const res = new Response(resOpts)

  if (reqOpts && resOpts && isUndefined(reqOpts.res) && isUndefined(resOpts.req)) {
    req.res = res
    res.req = req
  }

  return {
    req,
    res,
    next: next || (() => {})
  }
}
