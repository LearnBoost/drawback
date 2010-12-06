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
  var serverRender = end = req.query.serverRender
  
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
  ,  data = {
      points: points,
      period: period
    }

  if(!serverRender) {
    res.send(data);
  }
  else {
    var module = __dirname + '/public/js/draw/chart'
      ,  height = Number(req.query.height)
      ,  width = Number(req.query.width)

    data.el = {
      width: width,
      height: height
    }

    drawback.draw(module, data, function(err, buf){
      if (err) return next(err);

      res.send(buf, {
          'Content-Type': 'image/png'
        , 'Content-Length': buf.length
      });
    });
  }

})

// rendering server side
app.get('/draw/linealBallChart', function(req, res){
  var dataUrl = req.query.url
    ,  forceDownload = req.query.forceDownload
    ,  dims = req.query.dims || {}

    res.redirect(dataUrl+'?serverRender=true&forceDownload=' + forceDownload + (dims.x ? '&width=' + dims.x : '') + (dims.y ? '&height=' + dims.y : ''));
})

app.listen(3000);
console.log('Express app started on port 3000');
