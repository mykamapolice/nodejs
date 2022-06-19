import {appData} from "../data";
const { v4: uuidv4 } = require('uuid');
import { IncomingMessage, ServerResponse} from 'http';
import {validateObject} from "../helpers";

export function addUser(request: IncomingMessage, response: ServerResponse) {
  let reqBody: any = '';

  request.on('data', (chunk: Buffer) => {
    reqBody += chunk;
  }).on('end', () => {

    const parsedBody = JSON.parse(reqBody)

    const isObjectContainProp = validateObject(parsedBody)

    if(isObjectContainProp) {
      parsedBody.id = uuidv4()
      appData.push(parsedBody)

      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(parsedBody))
    } else {
      response.statusCode = 400
      response.end('Not valid user object')
    }
  });
}