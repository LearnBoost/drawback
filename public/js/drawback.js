(function($){

  // *** DrawBack ***
  DrawBack = {

    // all functions registered into the _stack array
    _stack: [],

    // all functions registered like object collections.
    // the function name es the object key
    _stack_: {},

    start: function () {
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
          data: {},
          options: $.extend({
            sync: false,
            donwload: true,
            forcerServer: false
          }, options)
        }, draw);

        if(url != undefined)
          this.requestData(draw);
      }
    },

    requestData: function (objDraw) {
      var self = this;
      $.ajax({
        type: "GET",
        url: objDraw.url,
        success: function(resp) {
          objDraw.data = resp;
          self.process(objDraw);
        }
      });
    },

    process: function (objDraw) {
      // execute function
      objDraw.fn(objDraw.data, objDraw.el);
    }
  }
  // *** END DrawBack ***

  DrawBack.start();

})(jQuery)