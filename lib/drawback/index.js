/*!
* drawback
* MIT Licensed
*/

/**
 * Module dependencies.
 */

/**
 * Library version.
 */
exports.version = '0.0.1';

/*** Methods ***/
/**
 * draw method
 *
 * @param {String} module
 * @return {Object} data
 * @return {Function} callback
 */
exports.draw = function(module, data, fn){
  var pluginsSupported = [
    { name: 'jqueryDummy', url: '../../plugins/dummy.jquery' },
    { name: 'flot', url: '../../plugins/flot/jquery.flot' }
  ];

  // module use plugins ?
  pluginsSupported.forEach(function(pluggin) {
    if(pluggin.name in module)
      require(pluggin.url)
  });

  canvas = module(data, data.dims ? data.dims : {width: 0, height: 0});
  canvas.toBuffer(fn);
};


/**
 * drawback.use(require('path/to/plugin')())
 */
exports.use = function(url){
  require(url);
};
