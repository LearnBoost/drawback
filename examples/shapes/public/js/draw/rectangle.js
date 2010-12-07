/**
 * simple shapes
 */

(function(module){

  module.exports = function (data, element) {
    var canvas = document.createElement('canvas')
      ,  ctx = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 200;

    // Draw shapes
    ctx.fillStyle = '#48A';

    ctx.fillRect(25,25,100,100);
    ctx.clearRect(45,45,60,60);
    ctx.strokeRect(50,50,50,50);

    $(element).append(canvas);

    return canvas;
  };


  // executes (client side) or exports the module (server side)
  if (typeof window != 'undefined' && 'DrawBack' in window) 
    DrawBack.register('rectangle', module.exports);
  else {

    // *** Dummy functons ***    
    // document
    document = {
      createElement: function(type){
        if ('canvas' == type) {
          return new Canvas;
        }
      }
    };

    // jQuery
    $ = jQuery = function(el){
      if (global == this) return new jQuery(el);
      else this.append = function(){};
    };

  }

})(typeof module != 'undefined' ? module : {});