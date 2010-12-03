(function(){
  var module = module || {};

  module.exports = function(data, element){
    // element is the element that the <canvas> will be injected to.
    // for example, if leveraging jQuery flot, that means it will be called as:

    //$.plot(element, { ..., data: data });
  };

  module.exports.flot = true;

  if (typeof window != 'undefined' && 'Drawback' in window)
    Drawback.register('twins', module.exports);


})();