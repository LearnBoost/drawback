$(document).ready(function(){

  // SIMPLE exmaple
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



    myRemoteChart = DrawBack.draw('#chart-twin', 'linealChart', 'getData', {
      sync: true,
      forceServer: true,
      urlBuilder: function (name, url, forceDownload) {
        return 'draw/' + name + '?url=/' + url;
      }
    });

    // refresh chart
    $('#simple').find('a.remote').click(function (ev) {
      ev.preventDefault();
      myRemoteChart.refresh();
    });
  }




  // FLOT exmaple
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