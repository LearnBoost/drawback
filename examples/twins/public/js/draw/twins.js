(function(){
  var module = module || {};


  module.exports = function(data, element){
    console.debug ("data -> ", data);
    console.debug ("element -> ", element);

    return module;
  };

  module.exports.flot = true;


  console.debug ("module -> ", module);

  // executes (client side) or exports the module (server side)
  if (typeof window != 'undefined' && 'DrawBack' in window)
    DrawBack.register('twins', module.exports);

})();