import { createServer, IncomingMessage, ServerResponse} from 'http';
import {uuidValidateV4} from "./helpers"
import {IAppData} from "./interfaces";
import {addUser} from "./utils/addUser";
import {addUserById} from "./utils/changeUser";
import * as url from "url";
import 'dotenv/config';
import * as process from "process";
import {appData} from "./data";

const server = createServer()

server.on('request', async (req:IncomingMessage, res:ServerResponse) => {

  const {method} = req
  const address = req.url
  // @ts-ignore
  const id: string = url.parse(address, true).query.id;

  if(address && !!address.includes('/users')) {
    switch(method){
      case 'GET':
          if(id) {
            if(uuidValidateV4(id)) {
              const userIndex = appData.findIndex((user: IAppData) => user.id === id)
              if(userIndex > -1) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200
                res.end(JSON.stringify(appData[userIndex]))
              } else {
                res.statusCode = 404
                res.end("User doesn't exist")
              }
            } else {
              res.statusCode = 404
              res.end('Not valid id')
            }
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200
            res.end(JSON.stringify(appData))
          }
        break;
      case 'POST':
        const result = addUser(req)
        console.log(result)
        // if(!result)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(appData))
        break;
      case 'PUT':
        if(uuidValidateV4(id)) {
          const userIndex = appData.findIndex((user: IAppData) => user.id === id)
          const userId = appData.find((user: IAppData) => user.id === id)?.id!
          if(userIndex > -1) {
            addUserById(req, userIndex, userId)
            res.statusCode = 200
            res.end("User has been updated")
          } else {
            res.statusCode = 404
            res.end("User doesn't exist")
          }
        } else {
          res.statusCode = 404
          res.end('Not valid id')
        }
        break;
      case 'DELETE':
        if(uuidValidateV4(id)) {
          const userIndex = appData.findIndex((user: IAppData) => user.id === id)
          if(userIndex > -1) {
            appData.splice(userIndex, 1)
            res.statusCode = 204
            res.end("User has been deleted")
          } else {
            res.statusCode = 404
            res.end("User doesn't exist")
          }
        } else {
          res.statusCode = 404
          res.end('Not valid id')
        }
        break;
      default:
        res.statusCode = 404
        res.end('Can not find url')
    }
  } else {
    res.statusCode = 400
    res.end('Cant find page')
  }
})

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});