import {IncomingMessage, ServerResponse} from 'http';
import {appData} from "../data";
import { uuidValidateV4, validateObject} from "../helpers";
import {IAppData} from "../interfaces";

export function addUserById(request: IncomingMessage, response: ServerResponse, index: number, id: string) {
  let reqBody: any = '';

  request.on('data', (chunk: Buffer) => {
    reqBody += chunk;

  }).on('end', () => {
    const parsedBody = JSON.parse(reqBody)

    const isObjectContainProp = validateObject(parsedBody)

    if(isObjectContainProp) {

      parsedBody.id = id
      appData[index] = parsedBody

      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(parsedBody))
    } else {
      response.statusCode = 400
      response.end('Not valid user object')
    }
  });
}

export function changeUser(req: IncomingMessage, res: ServerResponse, id: string) {
  if(uuidValidateV4(id)) {

    const userIndex = appData.findIndex((user: IAppData) => user.id === id)
    const userId = appData.find((user: IAppData) => user.id === id)?.id!

    if(userIndex > -1) {
      addUserById(req, res, userIndex, userId)
    } else {
      res.statusCode = 404
      res.end("User doesn't exist")
    }
  } else {
    res.statusCode = 404
    res.end('Not valid id')
  }
}
