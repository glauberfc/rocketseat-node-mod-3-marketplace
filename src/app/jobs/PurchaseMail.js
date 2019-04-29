const Mail = require('../services/Mail')
const Sentry = require('@sentry/node')

class PurchaseMail {
  get key() {
    return 'PurchaseMail'
  }

  async handle(job, done) {
    const { ad, user, content } = job.data

    try {
      await Mail.sendMail({
        from: '"Marketplace" <marketplace@mail.com>',
        to: ad.author.email,
        subject: `Puchase request: "${ad.title}"`,

        template: 'purchase',
        context: { ad: ad, user, content }
      })

      return done()
    } catch (error) {
      Sentry.captureException(new Error(error))
      console.log(error)
    }
  }
}

module.exports = new PurchaseMail()
