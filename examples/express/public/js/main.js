$(document).ready(function(){

  /**
   * Renderizamos un gráfico lineal
   * Previamente hemos registrado un dibujar con id 'linealChart'
   */
  DrawBack.draw('#chart', 'linealChart', 'getData');

  DrawBack.draw('#chart-twin', 'linealChart', 'getData', {
    sync: false,
    forceServer: true,
    urlBuilder: function (name, url, forceDownload) {
      return 'draw/' + name + '?url=' + url + '&forceDownload=' + (forceDownload ? forceDownload : false);
    }
  });

})