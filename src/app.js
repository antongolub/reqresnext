// @flow

const APP_GET_MAP: {[key: string]: Function} = {
  'trust proxy fn': () => true
}
export default {
  get (key: string): ?Function {
    return APP_GET_MAP[key]
  }
}
