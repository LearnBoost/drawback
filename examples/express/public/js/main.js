$(document).ready(function(){

  // SIMPLE exmaple
  if($('#simple').length) {
    DrawBack.draw('#chart', 'linealChart', 'getData', {
      download: true
    });

    DrawBack.draw('#chart-twin', 'linealChart', 'getData', {
      sync: false,
      forceServer: true,
      urlBuilder: function (name, url, forceDownload) {
        return 'draw/' + name + '?url=/' + url + '&forceDownload=' + (forceDownload ? forceDownload : false);
      }
    });
  }

  // FLOT exmaple
  if($('#flot-example').length) {
    DrawBack.draw('#flot-chart', 'linealBallsChart', 'getChartData', {
      download: true
    });
//
//    DrawBack.draw('#chart-twin', 'linealBallsChart', 'getChartData', {
//      sync: false,
//      forceServer: true,
//      urlBuilder: function (name, url, forceDownload) {
//        return 'draw/' + name + '?url=/' + url + '&forceDownload=' + (forceDownload ? forceDownload : false);
//      }
//    });
  }

})