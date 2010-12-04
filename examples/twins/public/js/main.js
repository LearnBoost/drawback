$(document).ready(function(){
  // add chart (rendered by client)
  DrawBack.draw('#chart', 'twins', '/getData');

  // add chart (rendered by server)
  DrawBack.draw('#chart', 'twins', '/getData', {forceServer: true});
})