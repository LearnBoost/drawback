/*!
* drawback
* MIT Licensed
*/

/**
 * Module dependencies.
 */
var http = require('http');

/**
 * Library version.
 */
exports.version = '0.1.0';


// definitions
exports.plugins = {
  flot: {
    files: [
      '../../plugins/dummy.jquery',
      '../../plugins/flot/jquery.flot'
    ]
  }
}

/*** Methods ***/
/**
 * draw method
 *
 * @param {String} module
 * @return {Object} data
 * @return {Function} callback
 */
exports.draw = function(module, data, fn){
  canvas = module(data, data.dims ? data.dims : {width: 0, height: 0});
  canvas.toBuffer(fn);
};


/**
 * loadData Method
 * simple method to make url requests
 * can be used for self-request
 */
exports.loadData = function(port, host, url, fn){
  // create client to request
  var localClient = http.createClient(port, host)
    ,  request = localClient.request('GET', url, {'host': host});
  request.end();

  // get data
  request.on('response', function (response) {
    response.setEncoding('utf8');
    var body = '';
    response.on('data', function (chunk) {
      body+=chunk;
    });
    response.on('end', function () {
      fn(body);
    });
  });
};


/**
 * drawback.use(require('path/to/plugin')())
 */
exports.use = function(plugin){
  switch(typeof plugin) {
    case 'object':
      for(var k in plugin.files)
        require(plugin.files[k]);
    break;

    case 'string':
      require(plugin);
    break;
  }
};
