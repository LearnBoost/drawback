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

    draw: function (el_id, draw_id, url, options) {
      var self = this
        ,  objDraw = this._stack_[draw_id]

      if(objDraw) {
        // add new properties
        objDraw = $.extend({
          id: draw_id,
          el: $(el_id),
          url: url,
          data: {},
          options: $.extend({
            sync: false,
            donwload: true,
            forceServer: false
          }, options)
        }, objDraw);

        // forceServer property
        // if set to true it ignores browser rendering and always does server side rendering.
        if(objDraw.options.forceServer) {

          // urlBuilder function
          // A function that constructs the url for server fallback.
          // It gets the drawing name and data url as parameters.
          // There's also a third argument called forceDownload, which is set to true for the download link construction.
          server_url = objDraw.options.urlBuilder(objDraw.id, objDraw.url, false);

          if(server_url) self.renderFallback(server_url);
        }

        if(url != undefined)
          this.requestData(objDraw);
      }
    },

    /**
     * requestData method
     * retrieve the data throug ajax request
     */
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

    /**
     * renderFallback method
     * make a ajax request to rendering in server side.
     */
    renderFallback: function (url, objDraw) {
      var self = this;
      console.debug ("this -> ", this);
//      $.ajax({
//        type: "GET",
//        url: objDraw.url,
//        success: function(resp) {
//          objDraw.data = resp;
//          self.process(objDraw);
//        }
//      });
    },

    process: function (objDraw) {
      // execute function
      objDraw.fn(objDraw.data, objDraw.el);
    }
  }
  // *** END DrawBack ***

  DrawBack.start();

})(jQuery)