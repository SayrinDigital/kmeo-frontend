// INDEX.JS
const express = require('express')
const app = express()
const sgMail = require('@sendgrid/mail')

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', (req, res, next) => {
  res.send('API root')
})

app.all('/mail', (req, res, next) => {
  //sgMail.setApiKey('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')
sgMail.setApiKey('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')

const msgclient = {
    to: req.body.email,
    from: 'ventas@kmeo.cl',
    subject: 'Área de Ventas Kmeo',
    personalizations: [
 {
   to: {
     name: req.body.nombre,
     email: req.body.email
   },
   dynamic_template_data: {
     id: red.body.id
   }
 }
],
    template_id: 'd-6ba8b93ac3ca4dcdbb0c30a27679de88',

  };

  sgMail.send(msgclient, function(err, json) {
  if (err) { res.send("error"); }
  res.send(json);
});

})

app.all('/notifyorder', (req, res, next) => {
  //sgMail.setApiKey('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')
sgMail.setApiKey('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')

const msg = {
    to: 'ventas@kmeo.cl',
    from: 'josepuma@kmeo.cl',
    subject: 'Notificación de Pago',
    personalizations: [
 {
   to: {
     name: 'Ventas',
     email: 'ventas@kmeo.cl'
   },
   dynamic_template_data: {
     id: req.body.id,
     nombre: req.body.nombre,
     email: req.body.email,
     telefono: req.body.telefono,
     address: req.body.direccion,
     total : req.body.total,
     productos: req.body.productos,
     despachorapido: req.body.despachorapido
   }
 }
],
    template_id: "d-c427f97c2ab44c9c95a254b9cfdd5bf8",

  };

  sgMail.send(msg, function(err, json) {
  if (err) { res.send("error"); }
  res.send(json);
});

})

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
