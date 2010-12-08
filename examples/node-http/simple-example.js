var http = require('http')
  ,  fs = require('fs')

http.createServer(function (req, res) {
  var parseUrl = require('url').parse(req.url, true);

  if(parseUrl.href.search('/favicon.ico') === 0) {
    res.writeHead(404);
    res.end();
  }
  else {
    var htmlStr = '<html>\n'
                    + '<head>\n'
                    + '<title>drawback simple example</title>\n'
                    
                    + '<script src="drawback.js?hola"></script>'

                    + '<style>'
                    + 'body {padding: 50px 80px; font: 14px "Helvetica Nueue", "Lucida Grande", Arial, sans-serif;}'
                    + 'div#chart, div#chart-twin { width: 400px; height: 250px; margin: 10px; position: relative;}'
                    + '</style>'

                    + '</head>\n'
                    + '<body>\n'
                    + '<h2>node-http drawback example</h2>\n';

    console.log (parseUrl);

    // load js files
//    if(parseUrl.pathname.search(/.js$/)) {
    if(false) {
      res.writeHead(304, {'Content-Type': 'application/javascript'});
      res.write(fs.readFileSync('js/drawback.js'));
      res.end();
    }
    else {
      // routes
      switch(parseUrl.pathname) {
        case '/':
          htmlStr+= '<div id="chart"></div>\n'
                      + '<div id="chart-twin"></div>\n';
        break;

      }

      htmlStr+= '</body>\n';
      htmlStr+= '</html>\n';

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(htmlStr);
    }

  }

}).listen(3000);

console.log('Server running at http://localhost:3000/');