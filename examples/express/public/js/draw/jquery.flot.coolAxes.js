/*
 * coolAxes plugin
 */

(function ($) {
  var options = {
    coolAxes: {
      borderColor: 'rgba(0, 0, 0, 0.7)',
      borderWidth: 1,
      bevel: {
        width: 1,
        color: 'rgba(255, 255, 255, 1)'
      }
    }
  };

  function init(plot) {

    // add draw hook
    plot.hooks.draw.push(function (plot, ctx) {
      var options = plot.getOptions();

      if(!options.coolAxes.show) return null;

      var  plotWidth = plot.width()
      ,  plotHeight = plot.height()
      ,  plotOffset = plot.getPlotOffset()

      ,  _bevel = options.coolAxes.bevel
      ,  _ops = options.coolAxes
      ,  bw = _ops.borderWidth
      ,  oc = bw/2;

      ctx.save();
      ctx.translate(plotOffset.left - oc, plotOffset.top - oc);

      ctx.lineWidth = bw;
      ctx.strokeStyle = _ops.borderColor || options.grid.borderColor;

      var _axes = plot.getAxes()

      ctx.globalCompositeOperation = 'destination-over';


      // draw axes division
      function addDivisionAxis (axis, addDivision) {
        ctx.beginPath();

        for (var i = 0; i < axis.ticks.length; ++i) {
          var tick = axis.ticks[i];
          if (!tick.label || tick.v < axis.min || tick.v > axis.max)
            continue;
          var coors = addDivision(tick, axis, ctx);
          ctx.moveTo(coors.x1, coors.y1);
          ctx.lineTo(coors.x2, coors.y2);
        }
        ctx.stroke();
      }

      addDivisionAxis(_axes.xaxis, function (tick, axis) {
        var _x = Math.round(axis.p2c(tick.v))
        ,  _y = plotHeight + bw ;
        return {
          x1: _x,
          y1: _y,
          x2:_x,
          y2: _y+5
          };
      });

      addDivisionAxis(_axes.yaxis, function (tick, axis) {
        var _x = 0
        ,  _y =  Math.round(axis.p2c(tick.v));
        return {
          x1: _x,
          y1: _y,
          x2: _x - 5,
          y2: _y
        };
      });


      // draw axes
      ctx.beginPath();
      ctx.moveTo(-7, 2);
      ctx.lineTo(0, 2);

      ctx.moveTo(-9,0);
      ctx.lineTo(0, 0);
      ctx.lineTo(0,plotHeight + bw);
      ctx.lineTo( plotWidth + bw,plotHeight + bw);

      ctx.lineTo(plotWidth + bw,plotHeight + bw + 9);

      ctx.moveTo(plotWidth + bw - 2,plotHeight + bw + 7);
      ctx.lineTo(plotWidth + bw - 2,plotHeight + bw);
      ctx.stroke();

      // draw Bevel
      if(_bevel) {
        ctx.beginPath();
        ctx.lineWidth = _bevel.width;
        ctx.strokeStyle = _bevel.color;
        ctx.moveTo(1, 0);
        ctx.lineTo(1,plotHeight + bw  - 1);
        ctx.lineTo(1 + plotWidth + bw,plotHeight + bw - 1);
        ctx.stroke();
      }

      ctx.restore();
    });
  }

  $.plot.plugins.push({
    init: init,
    options: options,
    name: 'coolAxes',
    version: '1.0'
  });
})($);