const Ad = require('../models/Ad')

class AdController {
  async index(req, res) {
    const filters = {
      purchasedBy: null
    }

    /* eslint-disable */
    const { price_min, price_max, title } = req.query

    if (price_min || price_max) {
      filters.price = {}

      if (price_min) {
        filters.price.$gte = price_min
      }

      if (price_max) {
        filters.price.$lte = price_max
      }
    }

    /* eslint-enable */
    if (title) {
      filters.title = new RegExp(title, 'i')
    }

    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 200,
      sort: '-createdAt',
      populate: ['author']
    })

    return res.json(ads)
  }

  async show(req, res) {
    const ad = await Ad.findOne({ id: req.params.id, purchasedBy: undefined })

    return res.json(ad)
  }

  async store(req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  async update(req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(ad)
  }

  async destroy(req, res) {
    await Ad.findByIdAndDelete(req.params.id)

    return res.json()
  }
}

module.exports = new AdController()
