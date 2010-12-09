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
