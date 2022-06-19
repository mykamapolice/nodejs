import {ServerResponse} from "http";

export function emitServerError(res:ServerResponse) {
  res.statusCode = 500
  res.end('Server error')
}