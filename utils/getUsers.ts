import {uuidValidateV4} from "../helpers";
import {appData} from "../data";
import {IAppData} from "../interfaces";
import {ServerResponse} from "http";

export function getUsers(res: ServerResponse, id: string) {
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
      res.statusCode = 400
      res.end('Not valid id')
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200
    res.end(JSON.stringify(appData))
  }
}