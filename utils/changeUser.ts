import {IncomingMessage} from 'http';
import {appData} from "../data";

export function addUserById(request: IncomingMessage, index: number, id: string) {
  let reqBody: any = '';
  request.on('data', (chunk: Buffer) => {
    reqBody += chunk;
  }).on('end', () => {
    const parsedBody = JSON.parse(reqBody)
    parsedBody.id = id
    appData[index] = parsedBody
  });
}