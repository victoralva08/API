// Now we're going to study .post method:

const { Router } = require('express') // Here, we're importing 'express' library
const usersRoutes = Router() // then we are executing it

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const uploadConfig = require("../configs/upload")
const multer = require("multer")
const upload = multer(uploadConfig.MULTER)

function myMiddleware(request, response, next){
    console.log('You passed the Middle')
    console.log(request.body) // this allows the content of the request introduced in the body to be shown (in this case, the object). We're going to use this to verify if the user is the admin:

    if(request.body.isAdmin){
        next() // the next function calls the path which the middleware must send the request after
    }

    return response.json({ message: 'user unauthorized!'})
}





const UsersController = require('../controllers/UsersController') // here, we're importing the UserConstroller class from its file
const usersController = new UsersController() // then, we're creating a new instance for alocating the class in memory (separating a slot for it)

const UserAvatarController = require('../controllers/UserAvatarController')
const userAvatarController = new UserAvatarController()


/* usersRoutes.post('/', (request, response) => { // Since the adress to usersRoutes was informed in the index.js ('/users'), the root adress '/' can be used here with no problem.

  
}) 

how the app controllers are now setted in a different file, we can rewrite this command: */

usersRoutes.post('/', usersController.create)  /* the method create, which exists inside of the imported class, is then called for the same function (request, response) as above. This is helpful in order to modularize the project, with each file containing its functionalities in the overall application. Note that  the Middleware (if used) comes prior to the function usersController.create() is called. That's because it will interpect the requisition, execute its function and then continue to execute usersController. However, in order to guarantee that the middleware will be applied to EVERY route, we can execute it before:

usersRoutes.use(myMiddleware)
usersRoutes.post('/', usersController.create)

The middleware won't be used now, so we'll keep it off by now. This was just an example.
*/

usersRoutes.put('/', ensureAuthenticated, usersController.update)


usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"),  userAvatarController.update)

module.exports = usersRoutes // this line exports this file to be used at any other file in the server. When the 'express' was imported in the line 3, it is because the 'express' also have a module.exports line that allows it.
