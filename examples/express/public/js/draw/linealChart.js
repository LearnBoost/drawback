/**
 * linealChart
 */

(function(module){

  module.exports = function (data, element) {
    var canvas = document.createElement('canvas')
      ,  ctx = canvas.getContext('2d');

    canvas.width = 2000;
    canvas.height = 2000;

    // sclae
    var scale = { x: 20, y: 2 }
      ,  _data = data.data;


    // Draw lineal Chart
    ctx.save();
    ctx.translate(10 + 0.5, 10 + 0.5);

    // draw matrix
    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(100, 100, 0, 0.1)';

    for(var l=0; l < _data.length; l++) {
      ctx.moveTo(l*scale.x, 0);
      ctx.lineTo(l*scale.x, 100*scale.y);
    }

    for(var m=0; m < 11; m++) {
      ctx.moveTo(0, m*10*scale.y);
      ctx.lineTo((_data.length - 1)*scale.x, m*10*scale.y);
    }
    ctx.stroke();

    // draw lines
    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.strokeStyle = '#A26';
    for(var j=0; j < _data.length; j++) {
      if(!j) ctx.moveTo(j*scale.x, _data[j]*scale.y);
      else ctx.lineTo(j*scale.x, _data[j]*scale.y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = '#603';
    // draw points
    for(var k=0; k < _data.length; k++)
      ctx.arc(k*scale.x, _data[k]*scale.y, 3, 0, Math.PI*2)
    ctx.fill();

    ctx.restore();

    $(element).append(canvas);

    return canvas;
  };


  // executes (client side) or exports the module (server side)
  if (typeof window != 'undefined' && 'DrawBack' in window) 
    DrawBack.register('linealChart', module.exports);
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