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
//exports.plugins.flot = ''

/*** Methods ***/

/**
 * draw method
 *
 * @param {String} module
 * @return {Object} data
 * @return {Function} callback
 */
exports.draw = function(module, data, fn){

  // flot jquery plugin ?
  if(module.flot) {
    require('../../plugins/dummy.jquery');
    require('../../plugins/flot/jquery.flot');
  }

  canvas = module(data, data.dims ? data.dims : {width: 200, height: 200})
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

exports.use = function(fn){
  require(url)();
};
