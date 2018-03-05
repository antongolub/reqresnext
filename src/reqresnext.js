// @flow

import type {
  IRawOptions
} from './interface'

import Response from './response'
import Request from './request'

export default function gen (reqOpts: ?IRawOptions, resOpts: ?IRawOptions) {
  return {
    req: new Request(reqOpts),
    res: new Response(resOpts),
    next () {}
  }
}
