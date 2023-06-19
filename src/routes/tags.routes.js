

const { Router } = require('express') 
const tagsRoutes = Router() 

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const TagsController = require('../controllers/TagsController') 
const tagsController = new TagsController() 

tagsRoutes.use(ensureAuthenticated)
tagsRoutes.get('/', tagsController.index)



module.exports = tagsRoutes 
