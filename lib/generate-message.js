const parts = require('../data/message.json')

module.exports = recipient => {
  const msg = {
    from: 'post.opplaring@t-fk.no',
    to: recipient,
    subject: 'Bekreftelse kan sendes på e-post fra MinElev-YFF',
    text: `${parts.join('\n')}`,
    replyTo: 'post.opplaring@t-fk.no'
  }
  return msg
}
