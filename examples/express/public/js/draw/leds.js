/**
 * leds
 * @module
 */

(function(module){

  module.exports = function (data, element) {
    var  _d = data.data
      ,  led = new RGraph.LED(element, _d.txt)
      ,  objCanvas = led.canvas

    // dims to chart
    objCanvas.width = data.dims ? data.dims.width : 200;
    objCanvas.height = data.dims ? data.dims.height : 200;

    led.Set('chart.light', _d.color);
    led.Draw();

    return objCanvas;
  };



// executes (client side) or exports the module (server side)
if (typeof window != 'undefined' && 'DrawBack' in window) 
  DrawBack.register('leds', module.exports);

})(typeof module != 'undefined' ? module : {});