// Canvas global Object
try {
  var Canvas = require('../../support/node-canvas/');
} catch (err) {
  try {
    var Canvas = require('canvas');
  } catch (err) {
    throw err;
  }
}

// Dummies

// *** window ***
window = {
  addEventListener: function () {return null;}
}

// *** document ***
document = {
  createElement: function(type){
    if ('canvas' == type) {
      canvas = new Canvas;
      return canvas;
    }
  },
  getElementById: function() {return null;}
};

// *** JSON ***
JSON.encode = JSON.stringify
JSON.decode = JSON.parse