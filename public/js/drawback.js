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
        draw.el = j(id);
        draw.url = url;
        draw.options = j.extend({
          sync: false,
          donwload: true,
          forcerServer: false
        }, options)

        // process fn
        draw.fn({}, draw.el);

        console.debug ("draw -> ", draw);
      }
    }
  }

})();
  // *** END DrawBack ***

j(function(){
  DrawBack.start();
});