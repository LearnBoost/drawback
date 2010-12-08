// simple express example

// Expose modules in ./support for demo purposes
require.paths.unshift(__dirname + '/../../support');

/*** Module dependencies. ***/
var express = require('express')
  ,  drawback = require('../../lib/drawback')

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

  // load data, in thi case using auto-request
  drawback.loadData(3000, 'localhost', url, function(rawData){
    // *** Dummy functons ***
    document = {
      createElement: function(type){
        if ('canvas' == type) {
          return new Canvas;
        }
      }
    };

   var data = JSON.parse(rawData)

    // require the module to draw
    ,  moduleDraw = require(pub + '/js/draw/' + modname);

    setTimeout(function() {
      drawback.draw(moduleDraw, {dims: dims, data: data.data}, function(err, buf){
        if(err) return;
        var header = {};

        if(forceDownload) res.attachment(modname);
        else header = { 'Content-Type': 'image/png' }

        header['Content-Length'] = buf.length;
        res.send(buf, header);
      });
    }, 500);
  })

})

app.listen(3000);
console.log('Express app started on port 3000');