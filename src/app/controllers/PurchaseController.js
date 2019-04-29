const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const Queue = require('../services/Queue')
const jobs = require('../jobs')

class PurchaseController {
  async index(req, res) {
    const purchases = await Purchase.find({ user: req.userId }).populate('ad')

    return res.json(purchases)
  }

  async store(req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({ ad, user: user._id, content })

    Queue.create(jobs.PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
