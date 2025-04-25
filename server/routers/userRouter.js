const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


//ROUTE SHOW USER localhost:3000/user/:key
router.post('/login', userController.login)
//ROUTE POST USER localhost:3000/user/
router.post('/', userController.store)


module.exports = router
