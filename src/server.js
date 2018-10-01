const restify = require('restify')
const chalk = require('chalk')

const server = restify.createServer()

server.listen(process.env.PORT, (err) => {
  if (err) throw err
  console.log(chalk.green(`> API Server started at ${process.env.PORT}`))
})
