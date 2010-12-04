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
  res.render('partials/chart', {});
});

// response ajax request
app.get('/getChartData', function(req, res){
  var points = [
    [ 1264993200000, 52 ],
    [ 1280804400000, 90 ],
    [ 1285470000000, 57 ],
    [ 1286679600000, 18 ],
    [ 1288062000000, 7 ],
    [ 1291431600000, 39 ],
    [ 1292455600000, 80 ],
    [ 1294455600000, 58 ]
  ]
  ,  period = {
    start:1264993200000,
    end:1294455600000
  }

  res.send({
    points: points,
    period: period
  });

})

// rendering server side
app.get('/draw/linealBallChart', function(req, res){
  var dataUrl = end = req.query.url
    ,  forceDownload = req.query.forceDownload
})

app.listen(3000);
console.log('Express app started on port 3000');
