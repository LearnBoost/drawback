(function($){

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
        // add new properties
        draw = $.extend({
          el: $(id),
          url: url,
          options: $.extend({
            sync: false,
            donwload: true,
            forcerServer: false
          }, options)
        }, draw);


        if(url != undefined) {
          $.ajax({
            type: "GET",
            url: url,
            success: function(resp) {
              console.debug ("resp -> ", resp);
            }
          });
        }

        // process fn
        draw.fn({}, draw.el);
      }

    }
  }
  // *** END DrawBack ***

  DrawBack.start();

})(jQuery)