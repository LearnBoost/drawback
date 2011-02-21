/**
 * flot plugin
 */

// dependences
require(__dirname + '/dummies/dummy.basic');
require(__dirname + '/dummies/dummy.jquery');
require(__dirname + '/flot/jquery.flot');

// module method
exports.flot = function (module, data){
  return function(){
    var canvas = module(data, data.dims ? data.dims : {width: 0, height: 0});
    return canvas;
  };
};


