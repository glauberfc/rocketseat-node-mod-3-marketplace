const express = require('express')
const validate = require('express-validation')
const asyncHandler = require('express-async-handler')

const controllers = require('./app/controllers')
const validators = require('./app/validators')
const authMiddleware = require('./app/middlewares/auth')

const router = express.Router()

router.post(
  '/users',
  validate(validators.User),
  asyncHandler(controllers.UserController.store)
)
router.post(
  '/sessions',
  validate(validators.Session),
  asyncHandler(controllers.SessionController.store)
)

router.use(authMiddleware)

/**
 * Ads
 */
router.get('/ads', asyncHandler(controllers.AdController.index))
router.get('/ads/:id', asyncHandler(controllers.AdController.show))
router.post(
  '/ads',
  validate(validators.Ad),
  asyncHandler(controllers.AdController.store)
)
router.put(
  '/ads/:id',
  validate(validators.Ad),
  asyncHandler(controllers.AdController.update)
)
router.delete('/ads/:id', asyncHandler(controllers.AdController.destroy))

/**
 * Purchases
 */
router.get('/purchases', asyncHandler(controllers.PurchaseController.index))
router.post(
  '/purchases',
  validate(validators.Purchase),
  asyncHandler(controllers.PurchaseController.store)
)
router.put('/purchases/:id', asyncHandler(controllers.ApproveController.update))

module.exports = router
