import {ServerResponse} from "http";
import {uuidValidateV4} from "../helpers";
import {appData} from "../data";
import {IAppData} from "../interfaces";

export function deleteUser(res: ServerResponse, id: string) {
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
}