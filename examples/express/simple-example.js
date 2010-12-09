// simple express example

// Expose modules in ./support for demo purposes
require.paths.unshift(__dirname + '/../../support');

/*** Module dependencies. ***/
var express = require('express')
  ,  drawback = require('../../lib/drawback')
  ,  http = require('http');

// Path to our public directory
var pub = __dirname + '/public';

var app = express.createServer(
  express.compiler({
    src: pub,
    enable: ['sass']
    }),
  express.staticProvider(pub)
  );

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.get('/', function(req, res){
  res.render('partials/simple', {});
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
app.get('/draw/:module_name', function(req, res){
  // retrieve url parameters
  var modname = req.param('module_name')
    ,  url = req.query.url
    ,  forceDownload = req.query.forceDownload == 'true' ? true : false
    ,  dims = {
         width: Number(req.query.width),
         height: Number(req.query.height)
       }

      // create client to request
    var client = http.createClient(3000, 'localhost')
      ,  request = client.request('GET', url, {'host': 'localhost'});
    request.end();

    // get data
    request.on('response', function (response) {
      response.setEncoding('utf8');
      var rawData = '';
      response.on('data', function (chunk) {
        rawData+=chunk;
      });
      response.on('end', function () {
        var data = JSON.parse(rawData)
        // *** Dummy functons ***
        // node-canvas
        try {
          var Canvas = require('../../support/node-canvas/');
        } catch (err) {
          try {
            var Canvas = require('canvas');
          } catch (err) {
            throw err;
          }
        }

        document = {
          createElement: function(type){
            if ('canvas' == type) {
              return new Canvas;
            }
          }
        };

        // require the module to draw
        var moduleDraw = require(pub + '/js/draw/' + modname);

        drawback.draw(moduleDraw, {dims: dims, data: data.data}, function(err, buf){
          if(err) return;
          var header = {};

          if(forceDownload) res.attachment(modname);
          else header = {'Content-Type': 'image/png'}

          header['Content-Length'] = buf.length;
          res.send(buf, header);
        });
      })
    })

})

app.listen(3000);
console.log('Express app started on port 3000');