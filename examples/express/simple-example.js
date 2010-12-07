// Ejemplo de drawback Utilizando Express


// Expose modules in ./support for demo purposes
require.paths.unshift(__dirname + '/../../support');

/*** Module dependencies. ***/
var express = require('express')
  ,  drawback = require(__dirname + '/../../lib/drawback')
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
  res.render('partials/shapes', {});
});

// Respondemos al cliente con los datos (en formato JSON) que serán utilizados para implementar el gráfico
app.get('/getData', function(req, res){
  setTimeout(function() {
    var data = [];

    for (i = 0; i < 20; i++)
      data.push(Math.floor(Math.random()*(99 - 0 + 1) + 0))

    res.send({
      data: data
    });
  }, 1000);
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

     // finaly create chart
  ,  createChart = function (rawData) {
       var obj = JSON.parse(rawData)

        // require a module to draw
        ,  moduleDraw = require(pub + '/js/draw/' + modname);

        setTimeout(function() {
          drawback.draw(moduleDraw, {dims: dims, data: obj.data}, function(err, buf){
            if(err) return;
            var header = {};
            console.log (forceDownload);
            
            if(forceDownload) {
              header = {
                'Content-Type': 'application/force-download name="' + modname + '.png"',
                'Content-Disposition': 'inline; filename="' + modname + '.png"'
              }
            }
            else header = {
              'Content-Type': 'image/png'
            }

            header['Content-Length'] = buf.length;

            console.log (header);

            res.send(buf, header);
          });
        }, 500);
     }

  // create client to local-request
  var localReq = http.createClient(3000, 'localhost')
    ,  request = localReq.request('GET', url, {'host': 'localhost'});
  request.end();

  // get data
  request.on('response', function (response) {
    response.setEncoding('utf8');
    var body = '';
    response.on('data', function (chunk) {body+=chunk;});
    response.on('end', function () {createChart(body)});
  });

})

app.listen(3000);
console.log('Express app started on port 3000');