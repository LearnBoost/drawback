$(document).ready(function(){

  // *** SIMPLE example ***

  // canvas rendering (client side)
  if($('#simple').length) {
    var myLocalChart = DrawBack.draw('#chart', 'linealChart', 'getData', {
      download: true,
      urlBuilder: function (name, url, forceDownload) {
        return 'draw/' + name + '?url=/' + url;
      }
    });

    // refresh chart
    $('#simple').find('a.local').click(function (ev) {
      ev.preventDefault();
      myLocalChart.refresh();
    });
    
    // canvasReady event
    $(myLocalChart).bind('canvasReady', function(ev, data, renserv){
      $(this.el).append('<div class="msn">rendering ' + (renserv ? 'server' : 'client') + '</div>');
      $(this.el).find('.msn').fadeOut(800, function(){
//        $(this).remove();
      })
    });


    // node-canvas rendering (server side)
    myRemoteChart = DrawBack.draw('#chart-twin', 'linealChart', 'getData', {
      sync: true,
      forceServer: true,
      urlBuilder: function (name, url, forceDownload) {
        return 'draw/' + name + '?url=/' + url;
      }
    });

    // refresh remote chart
    $('#simple').find('a.remote').click(function (ev) {
      ev.preventDefault();
      myRemoteChart.refresh();
    });
    
    
    // canvasReady event
    $(myRemoteChart).bind('canvasReady', function(ev, data, renserv){
      $(this.el).append('<div class="msn">rendering ' + (renserv ? 'server' : 'client') + '</div>');
      $(this.el).find('.msn').fadeOut(800, function(){
        $(this).remove();
      })
    });
  }




  // FLOT example
  if($('#flot-example').length) {
    DrawBack.draw('#flot-chart', 'linealBallsChart', 'getChartData', {
      download: true,
      urlBuilder: function (name, url, forceDownload) {
        return 'draw/' + name + '?url=/' + url;
      }
    });

    DrawBack.draw('#flot-chart-twin', 'linealBallsChart', 'getChartData', {
      sync: true,
      forceServer: true,
      urlBuilder: function (name, url, forceDownload) {
        return 'draw/' + name + '?url=/' + url;
      }
    });
  }

})
