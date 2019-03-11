// INDEX.JS
const express = require('express')
const app = express()
const sgMail = require('@sendgrid/mail')
var nodemailer = require('nodemailer');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.get('/', (req, res, next) => {

  es.send('API');



})

app.all('/mail', (req, res, next) => {

  /*const msgclient = {
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
  });*/

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'joscri2698@gmail.com',
      pass: 'joscri2698'
    }
  });

  const mailOptions = {
    from: 'Área de Ventas Kmeo <ventas@kmeo.cl>', // sender address
    to: req.body.email, // list of receivers
    replyTo: 'ventas@kmeo.cl',
    subject: 'Área de Ventas Kmeo', // Subject line
    html: '<div  style="padding: 20px; background-color: #fcfcfc;" class="main-container"><img style="margin-bottom: 20px;" class="logo" width="50" src="https://marketing-image-production.s3.amazonaws.com/uploads/cb6ac8ccd770bad21f9b6855716a1b5adc0c30125d4d72dfc1b2fe8ed1953ac21079b0c984378c9d43539155fbc996550a49c8fd69cea43270ccbf68bb632f77.png" /><div style="background: #fff;padding: 20px;border: 1px solid rgba(0,0,0,0.1);" class="container"><h2 style="font-family: Open Sans, sans-serif; font-weight: 300;">Área de Ventas Kmeo</h2><h3  style="font-family: Open Sans, sans-serif; font-weight: 300;">Estimado cliente:</h3><p  style="font-family: Open Sans, sans-serif; font-weight: 300;">Tu ID de compra es: ' + req.body.id + '</p><p  style="font-family: Open Sans, sans-serif; font-weight: 300;">Junto con saludar le informamos que hemos recibido la notificación de su compra, verificaremos el pago y nos pondremos en contacto con usted para la coordinación de la entrega del producto, cualquier otra duda que tenga, nos puede contactar también en nuestro WhatsApp +56 9 4163 9399 .</p><p  style="font-family: Open Sans, sans-serif; font-weight: 300;">Muchas gracias por su confianza y que tenga excelente día!</p><div style="text-align: center; margin-top: 60px;"><a href="https://kmeo.cl" style="background-color: #f4b560;color: #fff;font-family: Open Sans, sans-serif;font-weight: 300;text-decoration: none;padding: 10px 20px;border-radius: 10px;">Visítanos</a></div></div></div>'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      res.send(err)
    else
      res.send(info)
  });

})

app.all('/notifyorder', (req, res, next) => {

  const msg = {
    to: 'ventas@kmeo.cl',
    from: 'josepuma@kmeo.cl',
    subject: 'Notificación de Pago',
    personalizations: [{
      to: [{
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
        total: req.body.total,
        productos: req.body.productos,
        despachorapido: req.body.despachorapido
      }
    }],
    template_id: "d-063ae6178f6346778c8a10704261f6de",

  };

  sgMail.send(msg, function(err, json) {
    if (err) {
      res.send("error");
    } else {
      res.send(json);
    }
  });

})

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
