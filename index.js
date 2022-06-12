const process = require('process')
const argv = require('yargs-parser')(process.argv.slice(2))

console.log(argv)

const {username} = argv

console.log(`Welcome to the File Manager, ${username}!`)

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}!`)
})

process.on('SIGINT', () => {
  console.log('\n')
  process.exit(0)
})

process.stdin.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
