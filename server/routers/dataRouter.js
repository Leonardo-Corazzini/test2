const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController.js')


//ROUTE INDEX DATA localhost:3000/data
router.get('/', dataController.index)

//ROUTE SHOW DATA localhost:3000/data/:id
router.get('/:id', dataController.show)

// ROUTE POST DATA localhost:3000/data
router.post('/', dataController.store)


// ROUTE PATCH DATA localhost:3000/data/:id
router.patch('/:id', dataController.modify)

module.exports = router