import {IAppData} from "./interfaces";

const {version, validate} = require('uuid')

const arrayOfProperties = ['age', 'name', 'hobbies']

export function uuidValidateV4(uuid: string) {
  return validate(uuid) && version(uuid) === 4;
}

export function validateObject(parsedBody : IAppData) {
  return arrayOfProperties.every(el => {
    return Object.keys(parsedBody).includes(el)
  })
}