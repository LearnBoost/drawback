// Ejemplo de drawback Utilizando Express


// Expose modules in ./support for demo purposes
require.paths.unshift(__dirname + '/../../support');

/*** Module dependencies. ***/
var express = require('express')
  ,  drawback = require(__dirname + '/../../lib/drawback');

// Path to our public directory
var pub = __dirname + '/public';

var app = express.createServer(
  express.compiler({src: pub, enable: ['sass']}),
  express.staticProvider(pub)
);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.get('/', function(req, res){
  res.render('partials/shapes', {});
});

// Respondemos al cliente con los datos (en formato JSON) que serán utilizados para implementar el gráfico
app.get('/getData', function(req, res){
  var data = [];

  for (i = 0; i < 20; i++)
    data.push(Math.floor(Math.random()*(99 - 0 + 1) + 0))

  res.send({
    data: data
  });
})

// rendering server side
app.get('/draw/rectangle', function(req, res){
  var w = Number(req.query.width)
    ,  h = Number(req.query.height)
    , dims = {
        width: w,
        height: h
      }

  drawback.draw(__dirname + '/public/js/draw/rectangle', dims, function(err, buf){
    res.send(buf, {
        'Content-Type': 'image/png'
      , 'Content-Length': buf.length
    });
  });
})

app.listen(3000);
console.log('Express app started on port 3000');