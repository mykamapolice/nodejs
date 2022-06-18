import {appData} from "../index";
const { v4: uuidv4 } = require('uuid');


function addUser(request: any) {
  let reqBody: any = '';
  request.on('data', (chunk: Buffer) => {
    reqBody += chunk;
  }).on('end', () => {
    const parsedBody = JSON.parse(reqBody)
    parsedBody.id = uuidv4()
    appData.push(parsedBody)
  });
}

module.exports = addUser