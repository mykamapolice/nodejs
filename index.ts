import { createServer, IncomingMessage, ServerResponse} from 'http';
import {addUser} from "./utils/addUser";
import { changeUser} from "./utils/changeUser";
import * as url from "url";
import 'dotenv/config';
import * as process from "process";
import {getUsers} from "./utils/getUsers";
import {deleteUser} from "./utils/deleteUser";
import {emitServerError} from "./utils/serverError";

const server = createServer()

server.on('request', async (req:IncomingMessage, res:ServerResponse) => {

  const {method} = req
  const address = req.url
  // @ts-ignore
  const id: string = url.parse(address, true).query.id;

  if(address?.split('/')[1].includes('users')) {
    switch(method){
      case 'GET':
        try {
          getUsers(res, id)
        }
        catch (e) {
          emitServerError(res)
        }
        break;
      case 'POST':
        try {
          addUser(req, res)
        }
        catch (e) {
          emitServerError(res)
        }
        break;
      case 'PUT':
        try {
          changeUser(req, res, id)
        }
        catch (e) {
          emitServerError(res)
        }
        break;
      case 'DELETE':
        try {
          deleteUser(res, id)
        }
        catch (e) {
          emitServerError(res)
        }
        break;
      default:
        res.statusCode = 404
        res.end('Method is not valid')
    }
  } else {
    res.statusCode = 400
    res.end('Cant find url')
  }
})

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});