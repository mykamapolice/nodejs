import {appData} from "../data";
const { v4: uuidv4 } = require('uuid');
import {IncomingMessage} from 'http';

const arrayOfProperties = ['age', 'name', 'hobbies']

export function addUser(request: IncomingMessage) {
  let reqBody: any = '';
  request.on('data', (chunk: Buffer) => {
    reqBody += chunk;
  }).on('end', () => {
    const parsedBody = JSON.parse(reqBody)
    // const isObjectContainProp = Object.keys(parsedBody).some(el => {
    //   return arrayOfProperties.some((prop) => prop === el)
    // })
    parsedBody.id = uuidv4()
    appData.push(parsedBody)
  });
}