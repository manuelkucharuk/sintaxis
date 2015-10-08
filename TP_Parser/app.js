var http = require('http');
var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

//Cargamos las rutas de nuestra aplicacion
var routes = require('./routes/index');

//  Inicializamos la aplicacion
var app = express();

// Configuramos las rutas cargadas previamente
app.use('/', routes);

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


// Error handlers

//  En caso de que ocurra un error del tipo 404 - Not Found manejamos el error
app.use(function(req, res, next) {
  var err = new Error('Recurso no encontrado');
  err.status = 404;
  next(err);
});

//  En caso de que ocurra un error, configuramos la respuesta
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

//  Creamos el servidor http
app.set('port',3000);

//  Inicializamos el servidor en el puerto 3000
var server=app.listen(app.get('port'), function() {
  console.log('Escuchando el puerto ' + server.address().port);
});