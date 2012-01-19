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
exports.version = '0.1.7';

/*** Methods ***/
/**
 * draw method
 *
 * @param {String} module
 * @param {Object} data
 * @return {Function} callback
 */
exports.draw = function(module, data, fn){
  // plugins definitions
  var usePlugin = false
    , canvas
    
    // need to register the available plugins
    , pluginsSupported = [
        { name: 'flot', src: '../../plugins/plugin.flot' },                  // - flot Plugin
        { name: 'rgraph', src: '../../plugins/plugin.rgraph' }               // - rgraph Plugin
      ];

  // module use plugin ?
  for(var i=0; i < pluginsSupported.length; i++) {
    var plugin = pluginsSupported[i];

    if(plugin.name in module) {
      usePlugin = true;

      var pluginModule = require(plugin.src)
        , pluginMethod = pluginModule[plugin.name](module, data)

      // always the main method plugin must ve return a canvas object
      canvas = pluginMethod();

      break;
    }
  }

  if(!usePlugin) {
    // if not use plugin add dummy basic functions
    require('../../plugins/dummies/dummy.basic');
    canvas = module(data, data.dims ? data.dims : {width: 0, height: 0});
  }

  canvas.toBuffer(fn);
};


/**
 * drawback.use(require('path/to/plugin')())
 */
exports.use = function(url){
  require(url);
};
