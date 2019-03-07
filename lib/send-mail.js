const axios = require('axios')
const generateToken = require('./generate-token')
const logger = require('./logger')

module.exports = async mail => {
  axios.defaults.headers.common['Authorization'] = generateToken(process.env.MAIL_SERVICE_SECRET)
  try {
    const { data } = await axios.post(process.env.MAIL_SERVICE_URL, mail)
    return data
  } catch (error) {
    logger('error', [mail, error])
  }
}
