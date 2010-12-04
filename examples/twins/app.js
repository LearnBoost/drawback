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
app.get('/getData', function(req, res){
  var points = [
    [ 1264993200000, 52 ],
    [ 1280804400000, 67 ],
    [ 1285470000000, 57 ],
    [ 1285642800000, 51 ],
    [ 1285902000000, 53 ],
    [ 1286161200000, 58 ],
    [ 1286247600000, 54 ],
    [ 1286679600000, 18 ],
    [ 1286679600000, 34 ],
    [ 1288062000000, 7 ],
    [ 1289703600000, 48 ],
    [ 1289876400000, 55 ],
    [ 1291431600000, 39 ],
    [ 1291431600000, 49 ],
    [ 1294455600000, 56 ],
    [ 1294455600000, 64 ],
    [ 1294455600000, 58 ]
  ];

  res.send({
    points: points
  });
});

app.listen(3000);
console.log('Express app started on port 3000');
