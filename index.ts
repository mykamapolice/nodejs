import { createServer, IncomingMessage, ServerResponse} from 'http';
const urll = require('url');
const addUser = require('./utils/addUser')

const port = 8000;

const server = createServer()

export const appData: any[] = []

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
      break;
    case 'DELETE':
      break;
  }

  res.end()
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});