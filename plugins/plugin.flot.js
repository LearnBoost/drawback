/**
 * flot plugin
 */

// dependences
require(__dirname + '/dummies/dummy.basic');
require(__dirname + '/dummies/dummy.jquery');
require(__dirname + '/flot/jquery.flot');

// module method
exports.flot = function (module, data){
  return function() {

    // add dimmension control
    // canvas object can be accept zero
    data.dims.width = data.dims.width || 100;
    data.dims.height = data.dims.height || 100;

    var canvas = module(data, data.dims ? data.dims : { width: 100, height: 100 });
    return canvas;
  };
};


