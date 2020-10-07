const { Router } = require('express')
const router = Router()
const {
  getTravels,
  createTravel,
  deleteTravel,
} = require('../controllers/travels.controllers')

router.route('/')
  .get(getTravels)
  .post(createTravel)

router.route('/:id')
  .delete(deleteTravel)

module.exports = router