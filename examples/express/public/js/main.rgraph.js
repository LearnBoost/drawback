$(document).ready(function(){
  DrawBack.draw('#rgraph-chart', 'leds', 'getData', {
    download: false,
    forceServer: true,
    urlBuilder: function (name, url, forceDownload) {
      return 'draw/' + name + '?url=/' + url;
    }
  });
})