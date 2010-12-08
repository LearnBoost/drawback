/*!
* drawback
* MIT Licensed
*/

/**
 * Module dependencies.
 */

// node-canvas
try {
  Canvas = require('../../support/node-canvas');
} catch (err) {
  try {
    Canvas = require('canvas');
  } catch (err) {
    if (~err.message.indexOf('Cannot find module')) {
      console.log('\n\x1b[31mHEY! you need to compile support/node-canvas\n');
      console.log('  $ cd support/node-canvas');
      console.log('  $ node-waf configure build');
      console.log('\x1b[0m');
    } else {
      throw err;
    }
  }
}

var http = require('http');


/**
 * Library version.
 */
exports.version = '0.1.0';


/*** Methods ***/

/**
 * draw method
 *
 * @param {String} module
 * @return {Object} data
 * @return {Function} callback
 */
exports.draw = function(module, data, fn){
  


  var canvas = module(data, null);
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