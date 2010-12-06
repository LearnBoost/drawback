$(document).ready(function(){
  // add chart (rendered by client)
  DrawBack.draw('#chart', 'linealBallChart', '/getChartData');

  // add chart (rendered by server)
//  DrawBack.draw('#chart-twin', 'linealBallChart', '/getChartData', {
//    forceServer: true,
//    urlBuilder: function (name, url, forceDownload) {
//      return 'draw/' + name + '?url=' + url + '&forceDownload=' + (forceDownload ? forceDownload : false);
//    }
//  });
})