$(document).ready(function(){

  DrawBack.draw('#rectangular', 'rectangle');

  DrawBack.draw('#rectangular-twin', 'rectangle', null, {
    sync: false,
    forceServer: true,
    urlBuilder: function (name, url, forceDownload) {
      return 'draw/' + name + '?url=' + url + '&forceDownload=' + (forceDownload ? forceDownload : false);
    }
  });

})