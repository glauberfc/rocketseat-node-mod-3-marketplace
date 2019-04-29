const User = require('../models/User')

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      res.status(400).json({ error: 'User not found' })
    }

    if (await !user.compareHash(password)) {
      res.status(400).json({ error: 'Invalid password' })
    }

    res.json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
