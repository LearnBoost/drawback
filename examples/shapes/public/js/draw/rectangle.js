/**
 * simple shapes
 */
(function(){
  var module = module || {};

  module.exports = function(data, element){
    var canvasEl = document.createElement('canvas')
      ,  ctx = canvasEl.getContext('2d');

    // Draw shapes
    ctx.fillRect(25,25,100,100);
    ctx.clearRect(45,45,60,60);
    ctx.strokeRect(50,50,50,50);

    $(element).append(canvasEl);

  };

// executes (client side) or exports the module (server side)
if (typeof window != 'undefined' && 'DrawBack' in window)
  DrawBack.register('rectangle', module.exports);

})();