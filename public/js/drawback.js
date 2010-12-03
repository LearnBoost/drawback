// *** client FrameWorks integration ***
if ('jQuery' in window){
  jQuery.noConflict();
  window.j = jQuery;
}

window.$ = document.id;
// ***


(function(){

  var $ = function(a, nocash){
    return typeof a === 'string' ? document.getElement(a, nocash) : document.id(a, nocash);
  };

  Drawback = new new Class({

    Implements: [Events],
    _stack: [],
    _stackNames: {},

    start: function(){
      if (!Browser.Engine.trident) this._processStack();
    },

    _processStack: function(){
      this._stack.each(function(fn){
        fn($);
      }, this);
    },

    register: function(name, fn){
      this._stackNames[name] = {
        _ind: this._stack.length,
        fn: fn
      };
      this._stack.push(fn);
    }

  });

})();

j(function(){
  Drawback.start();
});