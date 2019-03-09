// INDEX.JS
const express = require('express')
const app = express()
const sgMail = require('@sendgrid/mail')


app.get('/', (req, res, next) => {
  res.send('API root')
})

app.all('/mail', (req, res, next) => {
  //sgMail.setApiKey('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')
  sgMail.setApiKey('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')
  const msg = {
  to: 'josepuma@sayrin.cl',
  from: 'ventas@kmeo.cl',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

  sgMail.send(msg, function(err, json) {
  if (err) { res.send("error"); }
  res.send(json);
});


  //res.send("mierda")
})
// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
