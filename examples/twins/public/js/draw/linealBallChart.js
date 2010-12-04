/**
 * linealBallChart
 */

(function(){
  var module = module || {};

  module.exports = function(data, element){

    if(!data.points) return null;

    var options = {
      //      coolAxes: {
      //        show: true,
      //        type: 'tobiReloaded',
      //        borderWidth: 1
      //      },

      colors: ['#bbc4da', '#3f5086', '#fc4242'],

      xaxis: {
        mode: 'time',
        timeformat: '%b',
        ticks: 4,
        min: data.period.start,
        max: data.period.end
      },

      yaxis: {
        ticks: [[0, ''], [25, '25%'], [50, '50%'], [75, '75%'], [100, '100%']],
        min: 0,
        max: 110
      },

      grid: {
        show: true,
        borderWidth: 0,
        borderColor: '#474747',
        tickColor: 'transparent',
        labelMargin: 15,

        markings: [
        {
          color: 'rgba(191, 221, 255, 0.2)',
          yaxis: {
            from: 75
          }
        },

        {
          color: 'rgba(191, 210, 255, 0.3)',
          yaxis: {
            to: 75,
            from: 50
          }
        },

        {
          color: 'rgba(191, 210, 255, 0.4)',
          yaxis: {
            to: 50,
            from: 25
          }
        },

        {
          color: 'rgba(191, 210, 255, 0.55)',
          yaxis: {
            to: 25,
            from: 0
          }
        }
        ]
      }
    };

    if(data.points.length) {
      options = $.extend(options, {
        coolLabel: {
          show: true,
          type: 'tobiRevolution',
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.9)',
          bgColor: 'rgba(255, 255, 0, 0.9)',
          position: {
            x: 400,
            y: 250
          }
        }
      })
    }

    options = $.extend(options, data.opts);


  $.plot($(element),
    [
    {
      data: [[data.period.start, data.avg], [data.period.end - ((data.period.end-data.period.start)/11), data.avg]],
      lines: {
        show: true,
        fill: false,
        lineWidth: 1
      },
      coolLabel: {
        text: 'hey',
        position: {
          x: data.period.end,
          y: data.avg
        }
      },
      shadowSize: 0
    },
    {
      data: data.points,
      lines: {
        show: true,
        fill: false,
        lineWidth: 2
      },
      shadowSize: 0
    },
    {
      data: data.points,
      points: {
        show: true,
        radius: 10,
        fill: true,
        lineWidth: 5,
        fillColor: '#f683f2'
      },
      shadowSize: 4
    }
    ],
    options
    );
  //  }

    return module;
};

module.exports.flot = true;


// executes (client side) or exports the module (server side)
if (typeof window != 'undefined' && 'DrawBack' in window)
  DrawBack.register('linealBallChart', module.exports);

})();