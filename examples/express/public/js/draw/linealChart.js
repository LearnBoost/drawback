/**
 * linealChart
 * @module
 */

(function(module){

  module.exports = function (data, element) {
    var canvas = document.createElement('canvas')
    ,  ctx = canvas.getContext('2d');

    // dims to chart
    canvas.width = data.dims ? data.dims.width : 200;
    canvas.height = data.dims ? data.dims.height : 200;

    // chart x/y scale
    var scale = {
      x: 20,
      y: 2
    }
    ,  _data = data.data;

    // Draw lineal Chart
    ctx.save();
    ctx.translate(10 + 0.5, 10 + 0.5);

    // draw matrix
    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(100,100,100,0.1)';

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

    // draw points
    ctx.beginPath();
    ctx.fillStyle = '#603';
    for(var k=0; k < _data.length; k++) {
      ctx.moveTo(k*scale.x, _data[j]*scale.k);
      ctx.arc(k*scale.x, _data[k]*scale.y, 3, 0, Math.PI*2)
    }
    ctx.fill();

    ctx.restore();

    return canvas;
  };



  // executes (client side) or exports the module (server side)
  if (typeof window != 'undefined' && 'DrawBack' in window) 
    DrawBack.register('linealChart', module.exports);

})(typeof module != 'undefined' ? module : {});