require("dotenv/config")

require('express-async-errors') // importing the library for excepetions treatment
const AppError = require('./utils/AppError.js')
const migrationsRun = require('./database/sqlite/migrations')
const uploadConfig = require('./configs/upload.js')

const cors = require("cors")


const express = require('express'); // in this line, all the 'express' framework functionalities are being introduced into the express variable

const app = express() // the 'express' framework is then initialized. This framework helps managing the HTTP requisitions (like .get, .post, etc)
app.use(cors())
app.use(express.json()) // this line guarantees (thanks to express) that the API ackowledge that the requisition content delievered through requisition.body is on JSON format




// Below we're going to study rout params and query params through .get method.

/* app.get("/:id/:user", (request, response) => {  // the .get method is here implemented for reading the request. '/' is the adress (route).

    const { id, user } = request.params // Here we desestructure id and user properties from request.params object

    response.send(`
    Message id: ${id}.
    User: ${user}.`) // when the route "/" is called in port 3333, the response is immediately sent (due to the fact that the root adress was given as route). If the route is changed, the API must be restarted. The :id and :user are route params, and do not serve as adress.
}) 

app.get("/users", (request, response) => {

    const { page, limit } = request.query

    response.send(`
    Page: ${page}.
    Users limits: ${limit}.
    `)
}) */
/* Since the app is going to have a lot of routes, it is more inteligent to group then in a separated file. By pattern, we could import any route using: 

const { userRoutes } = require('./routes/users.routes) 

However, all routes can be grouped in the index.js file, and then all routes needed for the app can be gathered there.
*/

const PORT = process.env.API_PORT || 3333; // here it is defined the adress (port) which the API shall be waiting for a request and returning the response

app.listen(PORT, () => { 
    console.log(`Server is running on Port ${PORT}.`)
});

const routes = require('./routes') // By pattern, when the file's name inside a folder is not informed, the index file will be automaticaly loaded. In this case, index.js. In this line, we're importing the routes that were created in the index.js.

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)
migrationsRun()

app.use(( error, request, response, next ) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

/* to execute the application through the terminal, type the command node src/server.js. It is also possible to edit the package.json to always execute the application this way:

 "scripts": {
    "start": "node ./src/server.js" 
}

Now it is only needed to type: npm start
*/