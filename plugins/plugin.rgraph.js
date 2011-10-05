/**
 * RGraph plugin
 */

// dependences
require(__dirname + '/dummies/dummy.basic');

require(__dirname + '/RGraph/libraries/RGraph.common.core.js');
require(__dirname + '/RGraph/libraries/RGraph.common.context.js');
require(__dirname + '/RGraph/libraries/RGraph.common.zoom.js');
require(__dirname + '/RGraph/libraries/RGraph.led.js');

// module method
exports.rgraph = function (module, data){
  return function(){

    // add dimmension control
    // canvas object can be accept zero
    data.dims.width = data.dims.width || 100;
    data.dims.height = data.dims.height || 100;

    var canvas = module(data, data.dims ? data.dims : { width: 100, height: 100 });
    return canvas;
  };
};

