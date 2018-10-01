const restify = require('restify')
const chalk = require('chalk')
const helmet = require('helmet')
const morgan = require('morgan')

const server = restify.createServer()

server.use(helmet.noCache())
server.use(helmet.ieNoOpen())
server.use(helmet.noSniff())
server.use(helmet.xssFilter())
server.use(helmet.frameguard({
  action: 'deny'
}))

// Restify plugins
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.gzipResponse())
server.use(restify.plugins.queryParser({ mapParams: false }))

server.use(morgan(`- >\
  ${chalk.blue(':date[web]')}\
  ${chalk.yellow(':method')}\
  ${chalk.white.bgRed(':url')}\
  ${chalk.cyan(':remote-addr')}\
  ${chalk.green(':response-time[3]')}\
  ${chalk.magenta(':status')}\
`))

server.listen(process.env.PORT, (err) => {
  if (err) throw err
  console.log(chalk.green(`> API Server started at ${process.env.PORT}`))
})
