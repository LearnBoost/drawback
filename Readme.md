Drawback
========

The Drawback framework provides a seamless way to render 2D drawings on 
the client side using HTML5 technologies with a server-side backend.

## Defining the drawings

Every drawing (eg: a chart) logic goes into a separate file that provides both
CommonJS and browser compliance as follows:

    (function(){
      var module = module || {};

      module.exports = function(data, element){
        // element is the element that the <canvas> will be injected to.
        // for example, if leveraging jQuery flot, that means it will be called as:

        $.plot(element, { ..., data: data });
      };

      module.exports.flot = true;

      if (typeof window != 'undefined' && 'Drawback' in window)
        Drawback.register('my_example', module.exports);

    })();

In this case, the file would be stored in `public/js/draw/my_example.js`.
Notice that the filename has to match the `register` first parameter.

Notice that we're also adding the `flot` option to module.exports. This is needed
for the server side rendering to load the appropriate module for rendering.

## Drawing (client side)

In order to effectively draw a chart, first it needs to be included in the \<head\>,
so that it's compiled along with the rest of the public JavaScript:

    script(src: '/js/draw/my_example.js')

Then, in the specific section JavaScript, once the DOM is loaded we can draw it
like this:

    jQuery(function($){
      Drawback.draw('#some_element', 'my_example', '/data/url', options);
    });

Notice that we're passing the selector as first parameter, the draw id as the second
 and options as the fourth.

### Drawback#draw

The `Drawback.draw` method is in charge of deciding the rendering method (server
or browser) and behaving accordingly.

#### Browser rendering
  
For browser rendering, the draw method simply looks up the registered functions 
(through `register` calls), and calls it passing the data retrieves from the
data url.

While the data is being retrieved, a class `loading` is added to the target element.

#### Server fallback

For server rendering, an url is constructed as follows:

    /draw/my_example?url={data url}

An `Image` element is created and the `src` attribute is set. A class `loading` is
added to the target element, and it's removed when the `onload` event fires for the
image, and the image is injected.

Server fallback is used whenever feature testing for `<canvas>` presence fails.

#### Options

The last parameter of the `draw` function call is an object of options.

- sync

  If set to true, when browser rendering is performed, the data is fetched through
  a synchronous ajax request. Defaults to false

- download

  Whether to include a download button along with the <canvas>. If set to true,
  it injects an element like this _before_ the target element.

      <a href="/draw/my_example?url={data url}&download=1">Download</a>

- forceServer

  If set to true it ignores browser rendering and always does server side rendering.

- urlBuilder

  A function that constructs the url for server fallback. It gets the drawing name
  and data url as parameters. There's also a third argument called `forceDownload`,
  which is set to true for the download link construction.
  
  It defaults to a function that returns the format specified above.

## Server side component

### Public API

The node.js module is a simple function call that receives the `module.exports` (ie:
the `require()` module) and returns a node-canvas rendered buffer.

    var drawback = require('drawback');

    drawback.draw(module, data, function(err, buffer){
      // 
    });

### Plugins support

Plugins are included like

    drawback.use(require('path/to/plugin')())

And plugin source follows the connect middleware style:

    module.export = function pluginName(){
      return function(){

      };
    };

The `flot` plugin is built-in, and it's exported, so it can be accessed like this:

    drawback.use(drawback.plugins.flot);

The purpose of the flot plugin is to include a dummy jQuery, include the flot source
modified/overriden for node-canvas compatibility.

## License 

(The MIT License)

Copyright (c) 2010 LearnBoost &lt;dev@learnboost.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
