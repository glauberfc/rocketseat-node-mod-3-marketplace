const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const path = require('path')

const configMail = require('../../config/mail.js')

const transporter = nodemailer.createTransport(configMail)

transporter.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({
      partialsDir: []
    }),
    viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
    extName: '.hbs'
  })
)

module.exports = transporter
