/**
 * RGraph plugin
 */

// dependences
require(__dirname + '/dummies/dummy.basic');

require(__dirname + '/RGraph/libraries/RGraph.common.core.js');
require(__dirname + '/RGraph/libraries/RGraph.common.context.js');
require(__dirname + '/RGraph/libraries/RGraph.common.zoom.js');
require(__dirname + '/RGraph/libraries/RGraph.led.js');

// module
module.exports = function flot(module, data){
  return function(){
    var canvas = module(data, data.dims ? data.dims : {width: 0, height: 0})
  };
};
