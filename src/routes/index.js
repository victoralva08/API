// the index.js groups all application's routes, avoiding the need for them to be listed in the server.js file and spoil its cleaness

const { Router } = require('express')

const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()
routes.use('/users', usersRouter) // this line provides the adress '/users' for directing for the page usersRouter. With that, it is no longer needed to specify '/users' as route in the users.routes.js file.
routes.use('/sessions', sessionsRouter)
routes.use('/notes', notesRouter)
routes.use('/tags', tagsRouter)

module.exports = routes // The route is exported to be used in other files.