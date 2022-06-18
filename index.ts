import { createServer, IncomingMessage, ServerResponse} from 'http';
const urll = require('url');
const addUser = require('./utils/addUser')
const addUserById = require('./utils/changeUser')
const {version, validate} = require('uuid')

const port = 8000;

const server = createServer()

function uuidValidateV4(uuid: string) {
  return validate(uuid) && version(uuid) === 4;
}

export let appData: any[] = []

server.on('request', async (req:IncomingMessage, res:ServerResponse) => {

  const {method, url} = req
  const {id} = urll.parse(req.url, true).query;

  switch(method){
    case 'GET':
      if(url === '/users'){
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200
        res.end(JSON.stringify(appData))
      } else {
        res.statusCode = 400
        res.end('Cant find page')
      }
      break;
    case 'POST':
      addUser(req)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(appData))
      break;
    case 'PUT':
      if(uuidValidateV4(id)) {
        const userIndex = appData.findIndex(user => user.id === id)
        const userId = appData.find(user => user.id === id).id
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
        const userIndex = appData.findIndex(user => user.id === id)
        console.log(userIndex)
        if(userIndex > -1) {
          console.log('here')
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
  }

  res.end()
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});