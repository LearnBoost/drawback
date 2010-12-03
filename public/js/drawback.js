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

  // *** DrawBack ***
  DrawBack = new new Class({

    Implements: [Events],
    _stack: [],
    _stack_: {},

    start: function(){

    },

    _processStack: function(){
      this._stack.each(function(fn){
        fn($);
      }, this);
    },

    register: function(name, fn){
      this._stack_[name] = {
        i: this._stack.length,
        fn: fn
      };
      this._stack.push(fn);
    },

    draw: function (id, draw_id, url, options) {
      var draw = this._stack_[draw_id];
      if(draw) {
        // add draw properties
        draw.el = $(id);
        draw.url = url;

        // process fn
        draw.fn($);
      }
    }

  });

})();
  // *** END DrawBack ***

j(function(){
  DrawBack.start();
});