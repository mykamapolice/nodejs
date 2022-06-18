const {version, validate} = require('uuid')

export function uuidValidateV4(uuid: string) {
  return validate(uuid) && version(uuid) === 4;
}