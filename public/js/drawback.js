// *** client FrameWorks integration ***
if ('jQuery' in window){
  jQuery.noConflict();
  window.j = jQuery;
}
// ***

(function(){

  // *** DrawBack ***
  DrawBack = {

    _stack: [],

    _stack_: {},

    start: function () {
      console.debug ("this -> ", this);
    },

    _processStack: function(){
      this._stack.each(function(fn){
        fn($);
      }, this);
    },

    register: function(name, fn){
      console.debug('register');
      this._stack_[name] = {
        i: this._stack.length,
        fn: fn
      };
      this._stack.push(fn);

      console.debug ("this -> ", this);
    },

    draw: function (id, draw_id, url, options) {
      var draw = this._stack_[draw_id];
      if(draw) {
        // add draw properties
        draw.el = j(id);
        draw.url = url;

        // process fn
        draw.fn({}, draw.el);
      }
    }
  }

})();
  // *** END DrawBack ***

j(function(){
  DrawBack.start();
});