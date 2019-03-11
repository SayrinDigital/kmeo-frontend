// INDEX.JS
const express = require('express')
const app = express()
const sgMail = require('@sendgrid/mail')

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.get('/', (req, res, next) => {
  res.send('API root')
})

app.all('/mail', (req, res, next) => {

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
     id: req.body.id
   }
 }
],
    template_id: 'd-ca20d33683b940918cd4ba55bcf88882',

  };

  sgMail.send(msgclient, function(err, json) {
  if (err) { res.send("error"); }
  else{
    res.send(json);
  }
});

})

app.all('/notifyorder', (req, res, next) => {

const msg = {
    to: 'ventas@kmeo.cl',
    from: 'josepuma@kmeo.cl',
    subject: 'Notificación de Pago',
    personalizations: [
 {
   to: [
     {
       name: 'Ventas',
       email: 'ventas@kmeo.cl'
     },
     {
       name: 'Prueba',
       email: 'josepuma@sayrin.cl'
     }
   ],
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
    template_id: "d-063ae6178f6346778c8a10704261f6de",

  };

  sgMail.send(msg, function(err, json) {
  if (err) { res.send("error"); }
  else{
    res.send(json);
  }
});

})

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
