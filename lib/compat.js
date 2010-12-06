/**
 * Module dependencies.
 */

var Canvas = require('../support/node-canvas/');

// JSON

JSON.encode = JSON.stringify
JSON.decode = JSON.parse

window = {};

// jQuery
$ = jQuery = function(el){
  if (global == this) {
    return new jQuery(el);
  } else if (el instanceof jQuery) {
    return el;
  } else {
    this.width = function(){return el.width};
    this.height = function(){return el.height;};
    this.html = function(){};
    this.remove = function(){};
    this.append = function(){};
    this.find = function(){return this;};
    this.appendTo = function(el){return this;};
    this.css = function(){return this;};
    this.get = function(){return el;};

    this.children = function(str){return $(el);}
  }
};

jQuery.isArray = Array.isArray;
//jQuery.inArray = Array.inArray;

jQuery.inArray = function() {return 0};


jQuery.isFunction = function(obj){
  return 'function' == typeof obj;
};

// *** each ***
jQuery.each = function( object, callback, args ) {
  var name, i = 0,
  length = object.length,
  isObj = length === undefined || jQuery.isFunction(object);

  if ( args ) {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.apply( object[ name ], args ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.apply( object[ i++ ], args ) === false ) {
          break;
        }
      }
    }

  // A special, fast, case for the most common use of each
  } else {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
          break;
        }
      }
    } else {
      for ( var value = object[0];
        i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
    }
  }

  return object;
}
// end each

// *** grep ***
jQuery.grep = function( elems, callback, inv ) {
  var ret = [], retVal;
  inv = !!inv;

  // Go through the array, only saving the items
  // that pass the validator function
  for ( var i = 0, length = elems.length; i < length; i++ ) {
    retVal = !!callback( elems[ i ], i );
    if ( inv !== retVal ) {
      ret.push( elems[ i ] );
    }
  }

  return ret;
}
// end grep


jQuery.isPlainObject = function(obj) {
  return '[object Object]' == Object.prototype.toString.call(obj);
};

jQuery.trim = function(str){
  return str.trim();
};


jQuery.browser = {};

document = {
  createElement: function(type){
    if ('canvas' == type) {
      return new Canvas;
    }
  }
};

jQuery.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy, copyIsArray;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && 'function' == typeof target ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && '[object Object]' == Object.prototype.toString.call(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


$merge = jQuery.extend

