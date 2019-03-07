(async () => {
  require('dotenv').config()
  const generateMessage = require('./lib/generate-message')
  const logger = require('./lib/logger')
  const sendMail = require('./lib/send-mail')
  let recipients = require('./data/recipients.json')
  let errored = []

  const next = async () => {
    if (recipients.length > 0) {
      logger('info', ['index', 'recipients', recipients.length, 'left'])
      const recipient = recipients.pop()
      logger('info', ['index', 'got mail', recipient])
      const message = generateMessage(recipient)
      try {
        await sendMail(message)
        logger('info', ['index', 'mail sent', recipient])
      } catch (error) {
        logger('error', ['index', recipient, error])
        errored.push(recipient)
      }
      await next()
    } else {
      logger('info', ['index', 'finished'])
      if (errored.length > 0) {
        logger('error', ['index', 'errored', errored.join(', ')])
      }
    }
  }

  await next()
})()
