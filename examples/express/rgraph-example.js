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
  res.render('partials/rgraph', {layout:'layout.rgraph.jade'});
});

// response ajax request
app.get('/getData', function(req, res){
  var rndComp = function () {
    return Math.floor(255/(Math.random()*4 + 1));
  }

  res.send({
    data: {
      txt: 'learnboost ' + (new Date().toString()).substring(16, 24),
      color: 'rgba('+rndComp()+','+rndComp()+','+rndComp()+',1)'
    }
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
      var data = JSON.parse(rawData);

      // require the module to draw
      var moduleDraw = require(pub + '/js/draw/' + modname);

      // draw
      drawback.draw(moduleDraw, {dims: dims, data: data.data}, function(err, buf){
        if(err) res.send(404);

        var header = {};

        if(forceDownload) res.attachment(modname);
        else header = {'Content-Type': 'image/png'}

        header['Content-Length'] = buf.length;
        res.send(buf, header);
      });
    });
  });

});

app.listen(3000);
console.log('Express app started on port 3000');
