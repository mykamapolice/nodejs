import {appData} from "../index";
const { v4: uuidv4 } = require('uuid');
import {IncomingMessage} from 'http';

function addUserByIndex(request: IncomingMessage, index: number, id: string) {
  let reqBody: any = '';
  request.on('data', (chunk: Buffer) => {
    reqBody += chunk;
  }).on('end', () => {
    const parsedBody = JSON.parse(reqBody)
    parsedBody.id = id
    appData[index] = parsedBody
  });
}

module.exports = addUserByIndex