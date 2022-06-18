import {appData} from "../data";

const { v4: uuidv4 } = require('uuid');
import {IncomingMessage} from 'http';


export function addUser(request: IncomingMessage) {
  let reqBody: any = '';
  request.on('data', (chunk: Buffer) => {
    reqBody += chunk;
  }).on('end', () => {
    const parsedBody = JSON.parse(reqBody)
    parsedBody.id = uuidv4()
    appData.push(parsedBody)
  });
}