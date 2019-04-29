/**
 * Ethereal

 */
// module.exports = {
//   host: 'smtp.ethereal.email',
//   port: 587,
//   auth: {
//     user: 'deven.kunze27@ethereal.email',
//     pass: 'nvTh8fwCVBqaN6T7wS'
//   }
// }

/**
 *
 * Mailtrap
 */
module.exports = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}
