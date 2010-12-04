$(document).ready(function(){
  // add chart (rendered by client)
  DrawBack.draw('#chart', 'linealBallChart', '/getData');

  // add chart (rendered by server)
  DrawBack.draw('#chart-twin', 'linealBallChart', '/getData', {forceServer: true});
})