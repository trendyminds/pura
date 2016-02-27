(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyModule = require('./modules/MyModule');
var SVGInjector = require('./modules/SVGInjector');

var App = function App() {
  _classCallCheck(this, App);

  if (Modernizr.svg) {
    new SVGInjector();
  }

  new MyModule();
};

App;

new App();

},{"./modules/MyModule":2,"./modules/SVGInjector":3}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyModule = function MyModule() {
  _classCallCheck(this, MyModule);
};

MyModule;

module.exports = MyModule;

},{}],3:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var injector = require('svg-injector');

var SVGInjector = function SVGInjector() {
  _classCallCheck(this, SVGInjector);

  // Grab the elements that should be swapped with the embedded SVG
  var docSVGs = document.querySelectorAll('[data-svg]');

  // Set the background-image to none so we no longer use the sprite image
  Array.from(docSVGs).forEach(function (el) {
    el.parentNode.style.backgroundImage = 'none';
  });

  // Inject the SVGs inline
  injector(docSVGs);
};

SVGInjector;

module.exports = SVGInjector;

},{"svg-injector":4}],4:[function(require,module,exports){
/**
 * SVGInjector v1.1.3 - Fast, caching, dynamic inline SVG DOM injection library
 * https://github.com/iconic/SVGInjector
 *
 * Copyright (c) 2014-2015 Waybury <hello@waybury.com>
 * @license MIT
 */

(function (window, document) {

  'use strict';

  // Environment
  var isLocal = window.location.protocol === 'file:';
  var hasSvgSupport = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');

  function uniqueClasses(list) {
    list = list.split(' ');

    var hash = {};
    var i = list.length;
    var out = [];

    while (i--) {
      if (!hash.hasOwnProperty(list[i])) {
        hash[list[i]] = 1;
        out.unshift(list[i]);
      }
    }

    return out.join(' ');
  }

  /**
   * cache (or polyfill for <= IE8) Array.forEach()
   * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
   */
  var forEach = Array.prototype.forEach || function (fn, scope) {
    if (this === void 0 || this === null || typeof fn !== 'function') {
      throw new TypeError();
    }

    /* jshint bitwise: false */
    var i, len = this.length >>> 0;
    /* jshint bitwise: true */

    for (i = 0; i < len; ++i) {
      if (i in this) {
        fn.call(scope, this[i], i, this);
      }
    }
  };

  // SVG Cache
  var svgCache = {};

  var injectCount = 0;
  var injectedElements = [];

  // Request Queue
  var requestQueue = [];

  // Script running status
  var ranScripts = {};

  var cloneSvg = function (sourceSvg) {
    return sourceSvg.cloneNode(true);
  };

  var queueRequest = function (url, callback) {
    requestQueue[url] = requestQueue[url] || [];
    requestQueue[url].push(callback);
  };

  var processRequestQueue = function (url) {
    for (var i = 0, len = requestQueue[url].length; i < len; i++) {
      // Make these calls async so we avoid blocking the page/renderer
      /* jshint loopfunc: true */
      (function (index) {
        setTimeout(function () {
          requestQueue[url][index](cloneSvg(svgCache[url]));
        }, 0);
      })(i);
      /* jshint loopfunc: false */
    }
  };

  var loadSvg = function (url, callback) {
    if (svgCache[url] !== undefined) {
      if (svgCache[url] instanceof SVGSVGElement) {
        // We already have it in cache, so use it
        callback(cloneSvg(svgCache[url]));
      }
      else {
        // We don't have it in cache yet, but we are loading it, so queue this request
        queueRequest(url, callback);
      }
    }
    else {

      if (!window.XMLHttpRequest) {
        callback('Browser does not support XMLHttpRequest');
        return false;
      }

      // Seed the cache to indicate we are loading this URL already
      svgCache[url] = {};
      queueRequest(url, callback);

      var httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = function () {
        // readyState 4 = complete
        if (httpRequest.readyState === 4) {

          // Handle status
          if (httpRequest.status === 404 || httpRequest.responseXML === null) {
            callback('Unable to load SVG file: ' + url);

            if (isLocal) callback('Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver.');

            callback();
            return false;
          }

          // 200 success from server, or 0 when using file:// protocol locally
          if (httpRequest.status === 200 || (isLocal && httpRequest.status === 0)) {

            /* globals Document */
            if (httpRequest.responseXML instanceof Document) {
              // Cache it
              svgCache[url] = httpRequest.responseXML.documentElement;
            }
            /* globals -Document */

            // IE9 doesn't create a responseXML Document object from loaded SVG,
            // and throws a "DOM Exception: HIERARCHY_REQUEST_ERR (3)" error when injected.
            //
            // So, we'll just create our own manually via the DOMParser using
            // the the raw XML responseText.
            //
            // :NOTE: IE8 and older doesn't have DOMParser, but they can't do SVG either, so...
            else if (DOMParser && (DOMParser instanceof Function)) {
              var xmlDoc;
              try {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(httpRequest.responseText, 'text/xml');
              }
              catch (e) {
                xmlDoc = undefined;
              }

              if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length) {
                callback('Unable to parse SVG file: ' + url);
                return false;
              }
              else {
                // Cache it
                svgCache[url] = xmlDoc.documentElement;
              }
            }

            // We've loaded a new asset, so process any requests waiting for it
            processRequestQueue(url);
          }
          else {
            callback('There was a problem injecting the SVG: ' + httpRequest.status + ' ' + httpRequest.statusText);
            return false;
          }
        }
      };

      httpRequest.open('GET', url);

      // Treat and parse the response as XML, even if the
      // server sends us a different mimetype
      if (httpRequest.overrideMimeType) httpRequest.overrideMimeType('text/xml');

      httpRequest.send();
    }
  };

  // Inject a single element
  var injectElement = function (el, evalScripts, pngFallback, callback) {

    // Grab the src or data-src attribute
    var imgUrl = el.getAttribute('data-src') || el.getAttribute('src');

    // We can only inject SVG
    if (!(/\.svg/i).test(imgUrl)) {
      callback('Attempted to inject a file with a non-svg extension: ' + imgUrl);
      return;
    }

    // If we don't have SVG support try to fall back to a png,
    // either defined per-element via data-fallback or data-png,
    // or globally via the pngFallback directory setting
    if (!hasSvgSupport) {
      var perElementFallback = el.getAttribute('data-fallback') || el.getAttribute('data-png');

      // Per-element specific PNG fallback defined, so use that
      if (perElementFallback) {
        el.setAttribute('src', perElementFallback);
        callback(null);
      }
      // Global PNG fallback directoriy defined, use the same-named PNG
      else if (pngFallback) {
        el.setAttribute('src', pngFallback + '/' + imgUrl.split('/').pop().replace('.svg', '.png'));
        callback(null);
      }
      // um...
      else {
        callback('This browser does not support SVG and no PNG fallback was defined.');
      }

      return;
    }

    // Make sure we aren't already in the process of injecting this element to
    // avoid a race condition if multiple injections for the same element are run.
    // :NOTE: Using indexOf() only _after_ we check for SVG support and bail,
    // so no need for IE8 indexOf() polyfill
    if (injectedElements.indexOf(el) !== -1) {
      return;
    }

    // Remember the request to inject this element, in case other injection
    // calls are also trying to replace this element before we finish
    injectedElements.push(el);

    // Try to avoid loading the orginal image src if possible.
    el.setAttribute('src', '');

    // Load it up
    loadSvg(imgUrl, function (svg) {

      if (typeof svg === 'undefined' || typeof svg === 'string') {
        callback(svg);
        return false;
      }

      var imgId = el.getAttribute('id');
      if (imgId) {
        svg.setAttribute('id', imgId);
      }

      var imgTitle = el.getAttribute('title');
      if (imgTitle) {
        svg.setAttribute('title', imgTitle);
      }

      // Concat the SVG classes + 'injected-svg' + the img classes
      var classMerge = [].concat(svg.getAttribute('class') || [], 'injected-svg', el.getAttribute('class') || []).join(' ');
      svg.setAttribute('class', uniqueClasses(classMerge));

      var imgStyle = el.getAttribute('style');
      if (imgStyle) {
        svg.setAttribute('style', imgStyle);
      }

      // Copy all the data elements to the svg
      var imgData = [].filter.call(el.attributes, function (at) {
        return (/^data-\w[\w\-]*$/).test(at.name);
      });
      forEach.call(imgData, function (dataAttr) {
        if (dataAttr.name && dataAttr.value) {
          svg.setAttribute(dataAttr.name, dataAttr.value);
        }
      });

      // Make sure any internally referenced clipPath ids and their
      // clip-path references are unique.
      //
      // This addresses the issue of having multiple instances of the
      // same SVG on a page and only the first clipPath id is referenced.
      //
      // Browsers often shortcut the SVG Spec and don't use clipPaths
      // contained in parent elements that are hidden, so if you hide the first
      // SVG instance on the page, then all other instances lose their clipping.
      // Reference: https://bugzilla.mozilla.org/show_bug.cgi?id=376027

      // Handle all defs elements that have iri capable attributes as defined by w3c: http://www.w3.org/TR/SVG/linking.html#processingIRI
      // Mapping IRI addressable elements to the properties that can reference them:
      var iriElementsAndProperties = {
        'clipPath': ['clip-path'],
        'color-profile': ['color-profile'],
        'cursor': ['cursor'],
        'filter': ['filter'],
        'linearGradient': ['fill', 'stroke'],
        'marker': ['marker', 'marker-start', 'marker-mid', 'marker-end'],
        'mask': ['mask'],
        'pattern': ['fill', 'stroke'],
        'radialGradient': ['fill', 'stroke']
      };

      var element, elementDefs, properties, currentId, newId;
      Object.keys(iriElementsAndProperties).forEach(function (key) {
        element = key;
        properties = iriElementsAndProperties[key];

        elementDefs = svg.querySelectorAll('defs ' + element + '[id]');
        for (var i = 0, elementsLen = elementDefs.length; i < elementsLen; i++) {
          currentId = elementDefs[i].id;
          newId = currentId + '-' + injectCount;

          // All of the properties that can reference this element type
          var referencingElements;
          forEach.call(properties, function (property) {
            // :NOTE: using a substring match attr selector here to deal with IE "adding extra quotes in url() attrs"
            referencingElements = svg.querySelectorAll('[' + property + '*="' + currentId + '"]');
            for (var j = 0, referencingElementLen = referencingElements.length; j < referencingElementLen; j++) {
              referencingElements[j].setAttribute(property, 'url(#' + newId + ')');
            }
          });

          elementDefs[i].id = newId;
        }
      });

      // Remove any unwanted/invalid namespaces that might have been added by SVG editing tools
      svg.removeAttribute('xmlns:a');

      // Post page load injected SVGs don't automatically have their script
      // elements run, so we'll need to make that happen, if requested

      // Find then prune the scripts
      var scripts = svg.querySelectorAll('script');
      var scriptsToEval = [];
      var script, scriptType;

      for (var k = 0, scriptsLen = scripts.length; k < scriptsLen; k++) {
        scriptType = scripts[k].getAttribute('type');

        // Only process javascript types.
        // SVG defaults to 'application/ecmascript' for unset types
        if (!scriptType || scriptType === 'application/ecmascript' || scriptType === 'application/javascript') {

          // innerText for IE, textContent for other browsers
          script = scripts[k].innerText || scripts[k].textContent;

          // Stash
          scriptsToEval.push(script);

          // Tidy up and remove the script element since we don't need it anymore
          svg.removeChild(scripts[k]);
        }
      }

      // Run/Eval the scripts if needed
      if (scriptsToEval.length > 0 && (evalScripts === 'always' || (evalScripts === 'once' && !ranScripts[imgUrl]))) {
        for (var l = 0, scriptsToEvalLen = scriptsToEval.length; l < scriptsToEvalLen; l++) {

          // :NOTE: Yup, this is a form of eval, but it is being used to eval code
          // the caller has explictely asked to be loaded, and the code is in a caller
          // defined SVG file... not raw user input.
          //
          // Also, the code is evaluated in a closure and not in the global scope.
          // If you need to put something in global scope, use 'window'
          new Function(scriptsToEval[l])(window); // jshint ignore:line
        }

        // Remember we already ran scripts for this svg
        ranScripts[imgUrl] = true;
      }

      // :WORKAROUND:
      // IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
      // This trick will trigger IE to read and use any existing SVG <style> tags.
      //
      // Reference: https://github.com/iconic/SVGInjector/issues/23
      var styleTags = svg.querySelectorAll('style');
      forEach.call(styleTags, function (styleTag) {
        styleTag.textContent += '';
      });

      // Replace the image with the svg
      el.parentNode.replaceChild(svg, el);

      // Now that we no longer need it, drop references
      // to the original element so it can be GC'd
      delete injectedElements[injectedElements.indexOf(el)];
      el = null;

      // Increment the injected count
      injectCount++;

      callback(svg);
    });
  };

  /**
   * SVGInjector
   *
   * Replace the given elements with their full inline SVG DOM elements.
   *
   * :NOTE: We are using get/setAttribute with SVG because the SVG DOM spec differs from HTML DOM and
   * can return other unexpected object types when trying to directly access svg properties.
   * ex: "className" returns a SVGAnimatedString with the class value found in the "baseVal" property,
   * instead of simple string like with HTML Elements.
   *
   * @param {mixes} Array of or single DOM element
   * @param {object} options
   * @param {function} callback
   * @return {object} Instance of SVGInjector
   */
  var SVGInjector = function (elements, options, done) {

    // Options & defaults
    options = options || {};

    // Should we run the scripts blocks found in the SVG
    // 'always' - Run them every time
    // 'once' - Only run scripts once for each SVG
    // [false|'never'] - Ignore scripts
    var evalScripts = options.evalScripts || 'always';

    // Location of fallback pngs, if desired
    var pngFallback = options.pngFallback || false;

    // Callback to run during each SVG injection, returning the SVG injected
    var eachCallback = options.each;

    // Do the injection...
    if (elements.length !== undefined) {
      var elementsLoaded = 0;
      forEach.call(elements, function (element) {
        injectElement(element, evalScripts, pngFallback, function (svg) {
          if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
          if (done && elements.length === ++elementsLoaded) done(elementsLoaded);
        });
      });
    }
    else {
      if (elements) {
        injectElement(elements, evalScripts, pngFallback, function (svg) {
          if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
          if (done) done(1);
          elements = null;
        });
      }
      else {
        if (done) done(0);
      }
    }
  };

  /* global module, exports: true, define */
  // Node.js or CommonJS
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = exports = SVGInjector;
  }
  // AMD support
  else if (typeof define === 'function' && define.amd) {
    define(function () {
      return SVGInjector;
    });
  }
  // Otherwise, attach to window as global
  else if (typeof window === 'object') {
    window.SVGInjector = SVGInjector;
  }
  /* global -module, -exports, -define */

}(window, document));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXNzZXRzL3NjcmlwdHMvQXBwLmpzIiwiYXBwL2Fzc2V0cy9zY3JpcHRzL21vZHVsZXMvTXlNb2R1bGUuanMiLCJhcHAvYXNzZXRzL3NjcmlwdHMvbW9kdWxlcy9TVkdJbmplY3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9zdmctaW5qZWN0b3Ivc3ZnLWluamVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBLElBQU0sV0FBVyxRQUFRLG9CQUFSLENBQVg7QUFDTixJQUFNLGNBQWMsUUFBUSx1QkFBUixDQUFkOztJQUVBLE1BRUosU0FGSSxHQUVKLEdBQWU7d0JBRlgsS0FFVzs7QUFDYixNQUFJLFVBQVUsR0FBVixFQUFlO0FBQ2pCLFFBQUksV0FBSixHQURpQjtHQUFuQjs7QUFJQSxNQUFJLFFBQUosR0FMYTtDQUFmOztBQVVGOztBQUVBLElBQUksR0FBSjs7Ozs7OztJQ2pCTSxXQUVKLFNBRkksUUFFSixHQUFlO3dCQUZYLFVBRVc7Q0FBZjs7QUFLRjs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsUUFBakI7Ozs7Ozs7QUNUQSxJQUFNLFdBQVcsUUFBUSxjQUFSLENBQVg7O0lBRUEsY0FFSixTQUZJLFdBRUosR0FBZTt3QkFGWCxhQUVXOzs7QUFFYixNQUFJLFVBQVUsU0FBUyxnQkFBVCxDQUEwQixZQUExQixDQUFWOzs7QUFGUyxPQUtiLENBQU0sSUFBTixDQUFXLE9BQVgsRUFBb0IsT0FBcEIsQ0FBNEIsVUFBVSxFQUFWLEVBQWM7QUFDeEMsT0FBRyxVQUFILENBQWMsS0FBZCxDQUFvQixlQUFwQixHQUFzQyxNQUF0QyxDQUR3QztHQUFkLENBQTVCOzs7QUFMYSxVQVViLENBQVMsT0FBVCxFQVZhO0NBQWY7O0FBZUY7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLFdBQWpCOzs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IE15TW9kdWxlID0gcmVxdWlyZSgnLi9tb2R1bGVzL015TW9kdWxlJyk7XG5jb25zdCBTVkdJbmplY3RvciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9TVkdJbmplY3RvcicpO1xuXG5jbGFzcyBBcHAge1xuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBpZiAoTW9kZXJuaXpyLnN2Zykge1xuICAgICAgbmV3IFNWR0luamVjdG9yKCk7XG4gICAgfVxuXG4gICAgbmV3IE15TW9kdWxlKCk7XG4gIH1cblxufVxuXG5BcHA7XG5cbm5ldyBBcHA7XG4iLCJjbGFzcyBNeU1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICB9XG5cbn1cblxuTXlNb2R1bGU7XG5cbm1vZHVsZS5leHBvcnRzID0gTXlNb2R1bGU7XG4iLCJjb25zdCBpbmplY3RvciA9IHJlcXVpcmUoJ3N2Zy1pbmplY3RvcicpO1xuXG5jbGFzcyBTVkdJbmplY3RvciB7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIC8vIEdyYWIgdGhlIGVsZW1lbnRzIHRoYXQgc2hvdWxkIGJlIHN3YXBwZWQgd2l0aCB0aGUgZW1iZWRkZWQgU1ZHXG4gICAgbGV0IGRvY1NWR3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zdmddJyk7XG5cbiAgICAvLyBTZXQgdGhlIGJhY2tncm91bmQtaW1hZ2UgdG8gbm9uZSBzbyB3ZSBubyBsb25nZXIgdXNlIHRoZSBzcHJpdGUgaW1hZ2VcbiAgICBBcnJheS5mcm9tKGRvY1NWR3MpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBlbC5wYXJlbnROb2RlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICdub25lJztcbiAgICB9KTtcblxuICAgIC8vIEluamVjdCB0aGUgU1ZHcyBpbmxpbmVcbiAgICBpbmplY3Rvcihkb2NTVkdzKTtcbiAgfVxuXG59XG5cblNWR0luamVjdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNWR0luamVjdG9yO1xuIiwiLyoqXG4gKiBTVkdJbmplY3RvciB2MS4xLjMgLSBGYXN0LCBjYWNoaW5nLCBkeW5hbWljIGlubGluZSBTVkcgRE9NIGluamVjdGlvbiBsaWJyYXJ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20vaWNvbmljL1NWR0luamVjdG9yXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgV2F5YnVyeSA8aGVsbG9Ad2F5YnVyeS5jb20+XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG4oZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gRW52aXJvbm1lbnRcbiAgdmFyIGlzTG9jYWwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdmaWxlOic7XG4gIHZhciBoYXNTdmdTdXBwb3J0ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSgnaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNCYXNpY1N0cnVjdHVyZScsICcxLjEnKTtcblxuICBmdW5jdGlvbiB1bmlxdWVDbGFzc2VzKGxpc3QpIHtcbiAgICBsaXN0ID0gbGlzdC5zcGxpdCgnICcpO1xuXG4gICAgdmFyIGhhc2ggPSB7fTtcbiAgICB2YXIgaSA9IGxpc3QubGVuZ3RoO1xuICAgIHZhciBvdXQgPSBbXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmICghaGFzaC5oYXNPd25Qcm9wZXJ0eShsaXN0W2ldKSkge1xuICAgICAgICBoYXNoW2xpc3RbaV1dID0gMTtcbiAgICAgICAgb3V0LnVuc2hpZnQobGlzdFtpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dC5qb2luKCcgJyk7XG4gIH1cblxuICAvKipcbiAgICogY2FjaGUgKG9yIHBvbHlmaWxsIGZvciA8PSBJRTgpIEFycmF5LmZvckVhY2goKVxuICAgKiBzb3VyY2U6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2hcbiAgICovXG4gIHZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2ggfHwgZnVuY3Rpb24gKGZuLCBzY29wZSkge1xuICAgIGlmICh0aGlzID09PSB2b2lkIDAgfHwgdGhpcyA9PT0gbnVsbCB8fCB0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICB9XG5cbiAgICAvKiBqc2hpbnQgYml0d2lzZTogZmFsc2UgKi9cbiAgICB2YXIgaSwgbGVuID0gdGhpcy5sZW5ndGggPj4+IDA7XG4gICAgLyoganNoaW50IGJpdHdpc2U6IHRydWUgKi9cblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgaWYgKGkgaW4gdGhpcykge1xuICAgICAgICBmbi5jYWxsKHNjb3BlLCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU1ZHIENhY2hlXG4gIHZhciBzdmdDYWNoZSA9IHt9O1xuXG4gIHZhciBpbmplY3RDb3VudCA9IDA7XG4gIHZhciBpbmplY3RlZEVsZW1lbnRzID0gW107XG5cbiAgLy8gUmVxdWVzdCBRdWV1ZVxuICB2YXIgcmVxdWVzdFF1ZXVlID0gW107XG5cbiAgLy8gU2NyaXB0IHJ1bm5pbmcgc3RhdHVzXG4gIHZhciByYW5TY3JpcHRzID0ge307XG5cbiAgdmFyIGNsb25lU3ZnID0gZnVuY3Rpb24gKHNvdXJjZVN2Zykge1xuICAgIHJldHVybiBzb3VyY2VTdmcuY2xvbmVOb2RlKHRydWUpO1xuICB9O1xuXG4gIHZhciBxdWV1ZVJlcXVlc3QgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuICAgIHJlcXVlc3RRdWV1ZVt1cmxdID0gcmVxdWVzdFF1ZXVlW3VybF0gfHwgW107XG4gICAgcmVxdWVzdFF1ZXVlW3VybF0ucHVzaChjYWxsYmFjayk7XG4gIH07XG5cbiAgdmFyIHByb2Nlc3NSZXF1ZXN0UXVldWUgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJlcXVlc3RRdWV1ZVt1cmxdLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAvLyBNYWtlIHRoZXNlIGNhbGxzIGFzeW5jIHNvIHdlIGF2b2lkIGJsb2NraW5nIHRoZSBwYWdlL3JlbmRlcmVyXG4gICAgICAvKiBqc2hpbnQgbG9vcGZ1bmM6IHRydWUgKi9cbiAgICAgIChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVxdWVzdFF1ZXVlW3VybF1baW5kZXhdKGNsb25lU3ZnKHN2Z0NhY2hlW3VybF0pKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9KShpKTtcbiAgICAgIC8qIGpzaGludCBsb29wZnVuYzogZmFsc2UgKi9cbiAgICB9XG4gIH07XG5cbiAgdmFyIGxvYWRTdmcgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuICAgIGlmIChzdmdDYWNoZVt1cmxdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChzdmdDYWNoZVt1cmxdIGluc3RhbmNlb2YgU1ZHU1ZHRWxlbWVudCkge1xuICAgICAgICAvLyBXZSBhbHJlYWR5IGhhdmUgaXQgaW4gY2FjaGUsIHNvIHVzZSBpdFxuICAgICAgICBjYWxsYmFjayhjbG9uZVN2ZyhzdmdDYWNoZVt1cmxdKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSBpdCBpbiBjYWNoZSB5ZXQsIGJ1dCB3ZSBhcmUgbG9hZGluZyBpdCwgc28gcXVldWUgdGhpcyByZXF1ZXN0XG4gICAgICAgIHF1ZXVlUmVxdWVzdCh1cmwsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICAgIGlmICghd2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICAgIGNhbGxiYWNrKCdCcm93c2VyIGRvZXMgbm90IHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWVkIHRoZSBjYWNoZSB0byBpbmRpY2F0ZSB3ZSBhcmUgbG9hZGluZyB0aGlzIFVSTCBhbHJlYWR5XG4gICAgICBzdmdDYWNoZVt1cmxdID0ge307XG4gICAgICBxdWV1ZVJlcXVlc3QodXJsLCBjYWxsYmFjayk7XG5cbiAgICAgIHZhciBodHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHJlYWR5U3RhdGUgNCA9IGNvbXBsZXRlXG4gICAgICAgIGlmIChodHRwUmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG5cbiAgICAgICAgICAvLyBIYW5kbGUgc3RhdHVzXG4gICAgICAgICAgaWYgKGh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gNDA0IHx8IGh0dHBSZXF1ZXN0LnJlc3BvbnNlWE1MID09PSBudWxsKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygnVW5hYmxlIHRvIGxvYWQgU1ZHIGZpbGU6ICcgKyB1cmwpO1xuXG4gICAgICAgICAgICBpZiAoaXNMb2NhbCkgY2FsbGJhY2soJ05vdGU6IFNWRyBpbmplY3Rpb24gYWpheCBjYWxscyBkbyBub3Qgd29yayBsb2NhbGx5IHdpdGhvdXQgYWRqdXN0aW5nIHNlY3VyaXR5IHNldHRpbmcgaW4geW91ciBicm93c2VyLiBPciBjb25zaWRlciB1c2luZyBhIGxvY2FsIHdlYnNlcnZlci4nKTtcblxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyAyMDAgc3VjY2VzcyBmcm9tIHNlcnZlciwgb3IgMCB3aGVuIHVzaW5nIGZpbGU6Ly8gcHJvdG9jb2wgbG9jYWxseVxuICAgICAgICAgIGlmIChodHRwUmVxdWVzdC5zdGF0dXMgPT09IDIwMCB8fCAoaXNMb2NhbCAmJiBodHRwUmVxdWVzdC5zdGF0dXMgPT09IDApKSB7XG5cbiAgICAgICAgICAgIC8qIGdsb2JhbHMgRG9jdW1lbnQgKi9cbiAgICAgICAgICAgIGlmIChodHRwUmVxdWVzdC5yZXNwb25zZVhNTCBpbnN0YW5jZW9mIERvY3VtZW50KSB7XG4gICAgICAgICAgICAgIC8vIENhY2hlIGl0XG4gICAgICAgICAgICAgIHN2Z0NhY2hlW3VybF0gPSBodHRwUmVxdWVzdC5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBnbG9iYWxzIC1Eb2N1bWVudCAqL1xuXG4gICAgICAgICAgICAvLyBJRTkgZG9lc24ndCBjcmVhdGUgYSByZXNwb25zZVhNTCBEb2N1bWVudCBvYmplY3QgZnJvbSBsb2FkZWQgU1ZHLFxuICAgICAgICAgICAgLy8gYW5kIHRocm93cyBhIFwiRE9NIEV4Y2VwdGlvbjogSElFUkFSQ0hZX1JFUVVFU1RfRVJSICgzKVwiIGVycm9yIHdoZW4gaW5qZWN0ZWQuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gU28sIHdlJ2xsIGp1c3QgY3JlYXRlIG91ciBvd24gbWFudWFsbHkgdmlhIHRoZSBET01QYXJzZXIgdXNpbmdcbiAgICAgICAgICAgIC8vIHRoZSB0aGUgcmF3IFhNTCByZXNwb25zZVRleHQuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gOk5PVEU6IElFOCBhbmQgb2xkZXIgZG9lc24ndCBoYXZlIERPTVBhcnNlciwgYnV0IHRoZXkgY2FuJ3QgZG8gU1ZHIGVpdGhlciwgc28uLi5cbiAgICAgICAgICAgIGVsc2UgaWYgKERPTVBhcnNlciAmJiAoRE9NUGFyc2VyIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgICAgICAgIHZhciB4bWxEb2M7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICAgICAgICB4bWxEb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dCwgJ3RleHQveG1sJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB4bWxEb2MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoIXhtbERvYyB8fCB4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhcnNlcmVycm9yJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soJ1VuYWJsZSB0byBwYXJzZSBTVkcgZmlsZTogJyArIHVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENhY2hlIGl0XG4gICAgICAgICAgICAgICAgc3ZnQ2FjaGVbdXJsXSA9IHhtbERvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UndmUgbG9hZGVkIGEgbmV3IGFzc2V0LCBzbyBwcm9jZXNzIGFueSByZXF1ZXN0cyB3YWl0aW5nIGZvciBpdFxuICAgICAgICAgICAgcHJvY2Vzc1JlcXVlc3RRdWV1ZSh1cmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCdUaGVyZSB3YXMgYSBwcm9ibGVtIGluamVjdGluZyB0aGUgU1ZHOiAnICsgaHR0cFJlcXVlc3Quc3RhdHVzICsgJyAnICsgaHR0cFJlcXVlc3Quc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBodHRwUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXG4gICAgICAvLyBUcmVhdCBhbmQgcGFyc2UgdGhlIHJlc3BvbnNlIGFzIFhNTCwgZXZlbiBpZiB0aGVcbiAgICAgIC8vIHNlcnZlciBzZW5kcyB1cyBhIGRpZmZlcmVudCBtaW1ldHlwZVxuICAgICAgaWYgKGh0dHBSZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUpIGh0dHBSZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoJ3RleHQveG1sJyk7XG5cbiAgICAgIGh0dHBSZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSW5qZWN0IGEgc2luZ2xlIGVsZW1lbnRcbiAgdmFyIGluamVjdEVsZW1lbnQgPSBmdW5jdGlvbiAoZWwsIGV2YWxTY3JpcHRzLCBwbmdGYWxsYmFjaywgY2FsbGJhY2spIHtcblxuICAgIC8vIEdyYWIgdGhlIHNyYyBvciBkYXRhLXNyYyBhdHRyaWJ1dGVcbiAgICB2YXIgaW1nVXJsID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpIHx8IGVsLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cbiAgICAvLyBXZSBjYW4gb25seSBpbmplY3QgU1ZHXG4gICAgaWYgKCEoL1xcLnN2Zy9pKS50ZXN0KGltZ1VybCkpIHtcbiAgICAgIGNhbGxiYWNrKCdBdHRlbXB0ZWQgdG8gaW5qZWN0IGEgZmlsZSB3aXRoIGEgbm9uLXN2ZyBleHRlbnNpb246ICcgKyBpbWdVcmwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgU1ZHIHN1cHBvcnQgdHJ5IHRvIGZhbGwgYmFjayB0byBhIHBuZyxcbiAgICAvLyBlaXRoZXIgZGVmaW5lZCBwZXItZWxlbWVudCB2aWEgZGF0YS1mYWxsYmFjayBvciBkYXRhLXBuZyxcbiAgICAvLyBvciBnbG9iYWxseSB2aWEgdGhlIHBuZ0ZhbGxiYWNrIGRpcmVjdG9yeSBzZXR0aW5nXG4gICAgaWYgKCFoYXNTdmdTdXBwb3J0KSB7XG4gICAgICB2YXIgcGVyRWxlbWVudEZhbGxiYWNrID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZhbGxiYWNrJykgfHwgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBuZycpO1xuXG4gICAgICAvLyBQZXItZWxlbWVudCBzcGVjaWZpYyBQTkcgZmFsbGJhY2sgZGVmaW5lZCwgc28gdXNlIHRoYXRcbiAgICAgIGlmIChwZXJFbGVtZW50RmFsbGJhY2spIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdzcmMnLCBwZXJFbGVtZW50RmFsbGJhY2spO1xuICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIEdsb2JhbCBQTkcgZmFsbGJhY2sgZGlyZWN0b3JpeSBkZWZpbmVkLCB1c2UgdGhlIHNhbWUtbmFtZWQgUE5HXG4gICAgICBlbHNlIGlmIChwbmdGYWxsYmFjaykge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHBuZ0ZhbGxiYWNrICsgJy8nICsgaW1nVXJsLnNwbGl0KCcvJykucG9wKCkucmVwbGFjZSgnLnN2ZycsICcucG5nJykpO1xuICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIHVtLi4uXG4gICAgICBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soJ1RoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRyBhbmQgbm8gUE5HIGZhbGxiYWNrIHdhcyBkZWZpbmVkLicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHdlIGFyZW4ndCBhbHJlYWR5IGluIHRoZSBwcm9jZXNzIG9mIGluamVjdGluZyB0aGlzIGVsZW1lbnQgdG9cbiAgICAvLyBhdm9pZCBhIHJhY2UgY29uZGl0aW9uIGlmIG11bHRpcGxlIGluamVjdGlvbnMgZm9yIHRoZSBzYW1lIGVsZW1lbnQgYXJlIHJ1bi5cbiAgICAvLyA6Tk9URTogVXNpbmcgaW5kZXhPZigpIG9ubHkgX2FmdGVyXyB3ZSBjaGVjayBmb3IgU1ZHIHN1cHBvcnQgYW5kIGJhaWwsXG4gICAgLy8gc28gbm8gbmVlZCBmb3IgSUU4IGluZGV4T2YoKSBwb2x5ZmlsbFxuICAgIGlmIChpbmplY3RlZEVsZW1lbnRzLmluZGV4T2YoZWwpICE9PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlbWVtYmVyIHRoZSByZXF1ZXN0IHRvIGluamVjdCB0aGlzIGVsZW1lbnQsIGluIGNhc2Ugb3RoZXIgaW5qZWN0aW9uXG4gICAgLy8gY2FsbHMgYXJlIGFsc28gdHJ5aW5nIHRvIHJlcGxhY2UgdGhpcyBlbGVtZW50IGJlZm9yZSB3ZSBmaW5pc2hcbiAgICBpbmplY3RlZEVsZW1lbnRzLnB1c2goZWwpO1xuXG4gICAgLy8gVHJ5IHRvIGF2b2lkIGxvYWRpbmcgdGhlIG9yZ2luYWwgaW1hZ2Ugc3JjIGlmIHBvc3NpYmxlLlxuICAgIGVsLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpO1xuXG4gICAgLy8gTG9hZCBpdCB1cFxuICAgIGxvYWRTdmcoaW1nVXJsLCBmdW5jdGlvbiAoc3ZnKSB7XG5cbiAgICAgIGlmICh0eXBlb2Ygc3ZnID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygc3ZnID09PSAnc3RyaW5nJykge1xuICAgICAgICBjYWxsYmFjayhzdmcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbWdJZCA9IGVsLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgIGlmIChpbWdJZCkge1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdpZCcsIGltZ0lkKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGltZ1RpdGxlID0gZWwuZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgaWYgKGltZ1RpdGxlKSB7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgaW1nVGl0bGUpO1xuICAgICAgfVxuXG4gICAgICAvLyBDb25jYXQgdGhlIFNWRyBjbGFzc2VzICsgJ2luamVjdGVkLXN2ZycgKyB0aGUgaW1nIGNsYXNzZXNcbiAgICAgIHZhciBjbGFzc01lcmdlID0gW10uY29uY2F0KHN2Zy5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgW10sICdpbmplY3RlZC1zdmcnLCBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgdW5pcXVlQ2xhc3NlcyhjbGFzc01lcmdlKSk7XG5cbiAgICAgIHZhciBpbWdTdHlsZSA9IGVsLmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIGlmIChpbWdTdHlsZSkge1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsIGltZ1N0eWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29weSBhbGwgdGhlIGRhdGEgZWxlbWVudHMgdG8gdGhlIHN2Z1xuICAgICAgdmFyIGltZ0RhdGEgPSBbXS5maWx0ZXIuY2FsbChlbC5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXQpIHtcbiAgICAgICAgcmV0dXJuICgvXmRhdGEtXFx3W1xcd1xcLV0qJC8pLnRlc3QoYXQubmFtZSk7XG4gICAgICB9KTtcbiAgICAgIGZvckVhY2guY2FsbChpbWdEYXRhLCBmdW5jdGlvbiAoZGF0YUF0dHIpIHtcbiAgICAgICAgaWYgKGRhdGFBdHRyLm5hbWUgJiYgZGF0YUF0dHIudmFsdWUpIHtcbiAgICAgICAgICBzdmcuc2V0QXR0cmlidXRlKGRhdGFBdHRyLm5hbWUsIGRhdGFBdHRyLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSBhbnkgaW50ZXJuYWxseSByZWZlcmVuY2VkIGNsaXBQYXRoIGlkcyBhbmQgdGhlaXJcbiAgICAgIC8vIGNsaXAtcGF0aCByZWZlcmVuY2VzIGFyZSB1bmlxdWUuXG4gICAgICAvL1xuICAgICAgLy8gVGhpcyBhZGRyZXNzZXMgdGhlIGlzc3VlIG9mIGhhdmluZyBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgdGhlXG4gICAgICAvLyBzYW1lIFNWRyBvbiBhIHBhZ2UgYW5kIG9ubHkgdGhlIGZpcnN0IGNsaXBQYXRoIGlkIGlzIHJlZmVyZW5jZWQuXG4gICAgICAvL1xuICAgICAgLy8gQnJvd3NlcnMgb2Z0ZW4gc2hvcnRjdXQgdGhlIFNWRyBTcGVjIGFuZCBkb24ndCB1c2UgY2xpcFBhdGhzXG4gICAgICAvLyBjb250YWluZWQgaW4gcGFyZW50IGVsZW1lbnRzIHRoYXQgYXJlIGhpZGRlbiwgc28gaWYgeW91IGhpZGUgdGhlIGZpcnN0XG4gICAgICAvLyBTVkcgaW5zdGFuY2Ugb24gdGhlIHBhZ2UsIHRoZW4gYWxsIG90aGVyIGluc3RhbmNlcyBsb3NlIHRoZWlyIGNsaXBwaW5nLlxuICAgICAgLy8gUmVmZXJlbmNlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0zNzYwMjdcblxuICAgICAgLy8gSGFuZGxlIGFsbCBkZWZzIGVsZW1lbnRzIHRoYXQgaGF2ZSBpcmkgY2FwYWJsZSBhdHRyaWJ1dGVzIGFzIGRlZmluZWQgYnkgdzNjOiBodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcvbGlua2luZy5odG1sI3Byb2Nlc3NpbmdJUklcbiAgICAgIC8vIE1hcHBpbmcgSVJJIGFkZHJlc3NhYmxlIGVsZW1lbnRzIHRvIHRoZSBwcm9wZXJ0aWVzIHRoYXQgY2FuIHJlZmVyZW5jZSB0aGVtOlxuICAgICAgdmFyIGlyaUVsZW1lbnRzQW5kUHJvcGVydGllcyA9IHtcbiAgICAgICAgJ2NsaXBQYXRoJzogWydjbGlwLXBhdGgnXSxcbiAgICAgICAgJ2NvbG9yLXByb2ZpbGUnOiBbJ2NvbG9yLXByb2ZpbGUnXSxcbiAgICAgICAgJ2N1cnNvcic6IFsnY3Vyc29yJ10sXG4gICAgICAgICdmaWx0ZXInOiBbJ2ZpbHRlciddLFxuICAgICAgICAnbGluZWFyR3JhZGllbnQnOiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgICAgICdtYXJrZXInOiBbJ21hcmtlcicsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItZW5kJ10sXG4gICAgICAgICdtYXNrJzogWydtYXNrJ10sXG4gICAgICAgICdwYXR0ZXJuJzogWydmaWxsJywgJ3N0cm9rZSddLFxuICAgICAgICAncmFkaWFsR3JhZGllbnQnOiBbJ2ZpbGwnLCAnc3Ryb2tlJ11cbiAgICAgIH07XG5cbiAgICAgIHZhciBlbGVtZW50LCBlbGVtZW50RGVmcywgcHJvcGVydGllcywgY3VycmVudElkLCBuZXdJZDtcbiAgICAgIE9iamVjdC5rZXlzKGlyaUVsZW1lbnRzQW5kUHJvcGVydGllcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGVsZW1lbnQgPSBrZXk7XG4gICAgICAgIHByb3BlcnRpZXMgPSBpcmlFbGVtZW50c0FuZFByb3BlcnRpZXNba2V5XTtcblxuICAgICAgICBlbGVtZW50RGVmcyA9IHN2Zy5xdWVyeVNlbGVjdG9yQWxsKCdkZWZzICcgKyBlbGVtZW50ICsgJ1tpZF0nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGVsZW1lbnRzTGVuID0gZWxlbWVudERlZnMubGVuZ3RoOyBpIDwgZWxlbWVudHNMZW47IGkrKykge1xuICAgICAgICAgIGN1cnJlbnRJZCA9IGVsZW1lbnREZWZzW2ldLmlkO1xuICAgICAgICAgIG5ld0lkID0gY3VycmVudElkICsgJy0nICsgaW5qZWN0Q291bnQ7XG5cbiAgICAgICAgICAvLyBBbGwgb2YgdGhlIHByb3BlcnRpZXMgdGhhdCBjYW4gcmVmZXJlbmNlIHRoaXMgZWxlbWVudCB0eXBlXG4gICAgICAgICAgdmFyIHJlZmVyZW5jaW5nRWxlbWVudHM7XG4gICAgICAgICAgZm9yRWFjaC5jYWxsKHByb3BlcnRpZXMsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgLy8gOk5PVEU6IHVzaW5nIGEgc3Vic3RyaW5nIG1hdGNoIGF0dHIgc2VsZWN0b3IgaGVyZSB0byBkZWFsIHdpdGggSUUgXCJhZGRpbmcgZXh0cmEgcXVvdGVzIGluIHVybCgpIGF0dHJzXCJcbiAgICAgICAgICAgIHJlZmVyZW5jaW5nRWxlbWVudHMgPSBzdmcucXVlcnlTZWxlY3RvckFsbCgnWycgKyBwcm9wZXJ0eSArICcqPVwiJyArIGN1cnJlbnRJZCArICdcIl0nKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCByZWZlcmVuY2luZ0VsZW1lbnRMZW4gPSByZWZlcmVuY2luZ0VsZW1lbnRzLmxlbmd0aDsgaiA8IHJlZmVyZW5jaW5nRWxlbWVudExlbjsgaisrKSB7XG4gICAgICAgICAgICAgIHJlZmVyZW5jaW5nRWxlbWVudHNbal0uc2V0QXR0cmlidXRlKHByb3BlcnR5LCAndXJsKCMnICsgbmV3SWQgKyAnKScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudERlZnNbaV0uaWQgPSBuZXdJZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlbW92ZSBhbnkgdW53YW50ZWQvaW52YWxpZCBuYW1lc3BhY2VzIHRoYXQgbWlnaHQgaGF2ZSBiZWVuIGFkZGVkIGJ5IFNWRyBlZGl0aW5nIHRvb2xzXG4gICAgICBzdmcucmVtb3ZlQXR0cmlidXRlKCd4bWxuczphJyk7XG5cbiAgICAgIC8vIFBvc3QgcGFnZSBsb2FkIGluamVjdGVkIFNWR3MgZG9uJ3QgYXV0b21hdGljYWxseSBoYXZlIHRoZWlyIHNjcmlwdFxuICAgICAgLy8gZWxlbWVudHMgcnVuLCBzbyB3ZSdsbCBuZWVkIHRvIG1ha2UgdGhhdCBoYXBwZW4sIGlmIHJlcXVlc3RlZFxuXG4gICAgICAvLyBGaW5kIHRoZW4gcHJ1bmUgdGhlIHNjcmlwdHNcbiAgICAgIHZhciBzY3JpcHRzID0gc3ZnLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpO1xuICAgICAgdmFyIHNjcmlwdHNUb0V2YWwgPSBbXTtcbiAgICAgIHZhciBzY3JpcHQsIHNjcmlwdFR5cGU7XG5cbiAgICAgIGZvciAodmFyIGsgPSAwLCBzY3JpcHRzTGVuID0gc2NyaXB0cy5sZW5ndGg7IGsgPCBzY3JpcHRzTGVuOyBrKyspIHtcbiAgICAgICAgc2NyaXB0VHlwZSA9IHNjcmlwdHNba10uZ2V0QXR0cmlidXRlKCd0eXBlJyk7XG5cbiAgICAgICAgLy8gT25seSBwcm9jZXNzIGphdmFzY3JpcHQgdHlwZXMuXG4gICAgICAgIC8vIFNWRyBkZWZhdWx0cyB0byAnYXBwbGljYXRpb24vZWNtYXNjcmlwdCcgZm9yIHVuc2V0IHR5cGVzXG4gICAgICAgIGlmICghc2NyaXB0VHlwZSB8fCBzY3JpcHRUeXBlID09PSAnYXBwbGljYXRpb24vZWNtYXNjcmlwdCcgfHwgc2NyaXB0VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnKSB7XG5cbiAgICAgICAgICAvLyBpbm5lclRleHQgZm9yIElFLCB0ZXh0Q29udGVudCBmb3Igb3RoZXIgYnJvd3NlcnNcbiAgICAgICAgICBzY3JpcHQgPSBzY3JpcHRzW2tdLmlubmVyVGV4dCB8fCBzY3JpcHRzW2tdLnRleHRDb250ZW50O1xuXG4gICAgICAgICAgLy8gU3Rhc2hcbiAgICAgICAgICBzY3JpcHRzVG9FdmFsLnB1c2goc2NyaXB0KTtcblxuICAgICAgICAgIC8vIFRpZHkgdXAgYW5kIHJlbW92ZSB0aGUgc2NyaXB0IGVsZW1lbnQgc2luY2Ugd2UgZG9uJ3QgbmVlZCBpdCBhbnltb3JlXG4gICAgICAgICAgc3ZnLnJlbW92ZUNoaWxkKHNjcmlwdHNba10pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1bi9FdmFsIHRoZSBzY3JpcHRzIGlmIG5lZWRlZFxuICAgICAgaWYgKHNjcmlwdHNUb0V2YWwubGVuZ3RoID4gMCAmJiAoZXZhbFNjcmlwdHMgPT09ICdhbHdheXMnIHx8IChldmFsU2NyaXB0cyA9PT0gJ29uY2UnICYmICFyYW5TY3JpcHRzW2ltZ1VybF0pKSkge1xuICAgICAgICBmb3IgKHZhciBsID0gMCwgc2NyaXB0c1RvRXZhbExlbiA9IHNjcmlwdHNUb0V2YWwubGVuZ3RoOyBsIDwgc2NyaXB0c1RvRXZhbExlbjsgbCsrKSB7XG5cbiAgICAgICAgICAvLyA6Tk9URTogWXVwLCB0aGlzIGlzIGEgZm9ybSBvZiBldmFsLCBidXQgaXQgaXMgYmVpbmcgdXNlZCB0byBldmFsIGNvZGVcbiAgICAgICAgICAvLyB0aGUgY2FsbGVyIGhhcyBleHBsaWN0ZWx5IGFza2VkIHRvIGJlIGxvYWRlZCwgYW5kIHRoZSBjb2RlIGlzIGluIGEgY2FsbGVyXG4gICAgICAgICAgLy8gZGVmaW5lZCBTVkcgZmlsZS4uLiBub3QgcmF3IHVzZXIgaW5wdXQuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBBbHNvLCB0aGUgY29kZSBpcyBldmFsdWF0ZWQgaW4gYSBjbG9zdXJlIGFuZCBub3QgaW4gdGhlIGdsb2JhbCBzY29wZS5cbiAgICAgICAgICAvLyBJZiB5b3UgbmVlZCB0byBwdXQgc29tZXRoaW5nIGluIGdsb2JhbCBzY29wZSwgdXNlICd3aW5kb3cnXG4gICAgICAgICAgbmV3IEZ1bmN0aW9uKHNjcmlwdHNUb0V2YWxbbF0pKHdpbmRvdyk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtZW1iZXIgd2UgYWxyZWFkeSByYW4gc2NyaXB0cyBmb3IgdGhpcyBzdmdcbiAgICAgICAgcmFuU2NyaXB0c1tpbWdVcmxdID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gOldPUktBUk9VTkQ6XG4gICAgICAvLyBJRSBkb2Vzbid0IGV2YWx1YXRlIDxzdHlsZT4gdGFncyBpbiBTVkdzIHRoYXQgYXJlIGR5bmFtaWNhbGx5IGFkZGVkIHRvIHRoZSBwYWdlLlxuICAgICAgLy8gVGhpcyB0cmljayB3aWxsIHRyaWdnZXIgSUUgdG8gcmVhZCBhbmQgdXNlIGFueSBleGlzdGluZyBTVkcgPHN0eWxlPiB0YWdzLlxuICAgICAgLy9cbiAgICAgIC8vIFJlZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tL2ljb25pYy9TVkdJbmplY3Rvci9pc3N1ZXMvMjNcbiAgICAgIHZhciBzdHlsZVRhZ3MgPSBzdmcucXVlcnlTZWxlY3RvckFsbCgnc3R5bGUnKTtcbiAgICAgIGZvckVhY2guY2FsbChzdHlsZVRhZ3MsIGZ1bmN0aW9uIChzdHlsZVRhZykge1xuICAgICAgICBzdHlsZVRhZy50ZXh0Q29udGVudCArPSAnJztcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZXBsYWNlIHRoZSBpbWFnZSB3aXRoIHRoZSBzdmdcbiAgICAgIGVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHN2ZywgZWwpO1xuXG4gICAgICAvLyBOb3cgdGhhdCB3ZSBubyBsb25nZXIgbmVlZCBpdCwgZHJvcCByZWZlcmVuY2VzXG4gICAgICAvLyB0byB0aGUgb3JpZ2luYWwgZWxlbWVudCBzbyBpdCBjYW4gYmUgR0MnZFxuICAgICAgZGVsZXRlIGluamVjdGVkRWxlbWVudHNbaW5qZWN0ZWRFbGVtZW50cy5pbmRleE9mKGVsKV07XG4gICAgICBlbCA9IG51bGw7XG5cbiAgICAgIC8vIEluY3JlbWVudCB0aGUgaW5qZWN0ZWQgY291bnRcbiAgICAgIGluamVjdENvdW50Kys7XG5cbiAgICAgIGNhbGxiYWNrKHN2Zyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNWR0luamVjdG9yXG4gICAqXG4gICAqIFJlcGxhY2UgdGhlIGdpdmVuIGVsZW1lbnRzIHdpdGggdGhlaXIgZnVsbCBpbmxpbmUgU1ZHIERPTSBlbGVtZW50cy5cbiAgICpcbiAgICogOk5PVEU6IFdlIGFyZSB1c2luZyBnZXQvc2V0QXR0cmlidXRlIHdpdGggU1ZHIGJlY2F1c2UgdGhlIFNWRyBET00gc3BlYyBkaWZmZXJzIGZyb20gSFRNTCBET00gYW5kXG4gICAqIGNhbiByZXR1cm4gb3RoZXIgdW5leHBlY3RlZCBvYmplY3QgdHlwZXMgd2hlbiB0cnlpbmcgdG8gZGlyZWN0bHkgYWNjZXNzIHN2ZyBwcm9wZXJ0aWVzLlxuICAgKiBleDogXCJjbGFzc05hbWVcIiByZXR1cm5zIGEgU1ZHQW5pbWF0ZWRTdHJpbmcgd2l0aCB0aGUgY2xhc3MgdmFsdWUgZm91bmQgaW4gdGhlIFwiYmFzZVZhbFwiIHByb3BlcnR5LFxuICAgKiBpbnN0ZWFkIG9mIHNpbXBsZSBzdHJpbmcgbGlrZSB3aXRoIEhUTUwgRWxlbWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7bWl4ZXN9IEFycmF5IG9mIG9yIHNpbmdsZSBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJuIHtvYmplY3R9IEluc3RhbmNlIG9mIFNWR0luamVjdG9yXG4gICAqL1xuICB2YXIgU1ZHSW5qZWN0b3IgPSBmdW5jdGlvbiAoZWxlbWVudHMsIG9wdGlvbnMsIGRvbmUpIHtcblxuICAgIC8vIE9wdGlvbnMgJiBkZWZhdWx0c1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gU2hvdWxkIHdlIHJ1biB0aGUgc2NyaXB0cyBibG9ja3MgZm91bmQgaW4gdGhlIFNWR1xuICAgIC8vICdhbHdheXMnIC0gUnVuIHRoZW0gZXZlcnkgdGltZVxuICAgIC8vICdvbmNlJyAtIE9ubHkgcnVuIHNjcmlwdHMgb25jZSBmb3IgZWFjaCBTVkdcbiAgICAvLyBbZmFsc2V8J25ldmVyJ10gLSBJZ25vcmUgc2NyaXB0c1xuICAgIHZhciBldmFsU2NyaXB0cyA9IG9wdGlvbnMuZXZhbFNjcmlwdHMgfHwgJ2Fsd2F5cyc7XG5cbiAgICAvLyBMb2NhdGlvbiBvZiBmYWxsYmFjayBwbmdzLCBpZiBkZXNpcmVkXG4gICAgdmFyIHBuZ0ZhbGxiYWNrID0gb3B0aW9ucy5wbmdGYWxsYmFjayB8fCBmYWxzZTtcblxuICAgIC8vIENhbGxiYWNrIHRvIHJ1biBkdXJpbmcgZWFjaCBTVkcgaW5qZWN0aW9uLCByZXR1cm5pbmcgdGhlIFNWRyBpbmplY3RlZFxuICAgIHZhciBlYWNoQ2FsbGJhY2sgPSBvcHRpb25zLmVhY2g7XG5cbiAgICAvLyBEbyB0aGUgaW5qZWN0aW9uLi4uXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgZWxlbWVudHNMb2FkZWQgPSAwO1xuICAgICAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBpbmplY3RFbGVtZW50KGVsZW1lbnQsIGV2YWxTY3JpcHRzLCBwbmdGYWxsYmFjaywgZnVuY3Rpb24gKHN2Zykge1xuICAgICAgICAgIGlmIChlYWNoQ2FsbGJhY2sgJiYgdHlwZW9mIGVhY2hDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgZWFjaENhbGxiYWNrKHN2Zyk7XG4gICAgICAgICAgaWYgKGRvbmUgJiYgZWxlbWVudHMubGVuZ3RoID09PSArK2VsZW1lbnRzTG9hZGVkKSBkb25lKGVsZW1lbnRzTG9hZGVkKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoZWxlbWVudHMpIHtcbiAgICAgICAgaW5qZWN0RWxlbWVudChlbGVtZW50cywgZXZhbFNjcmlwdHMsIHBuZ0ZhbGxiYWNrLCBmdW5jdGlvbiAoc3ZnKSB7XG4gICAgICAgICAgaWYgKGVhY2hDYWxsYmFjayAmJiB0eXBlb2YgZWFjaENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBlYWNoQ2FsbGJhY2soc3ZnKTtcbiAgICAgICAgICBpZiAoZG9uZSkgZG9uZSgxKTtcbiAgICAgICAgICBlbGVtZW50cyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChkb25lKSBkb25lKDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKiBnbG9iYWwgbW9kdWxlLCBleHBvcnRzOiB0cnVlLCBkZWZpbmUgKi9cbiAgLy8gTm9kZS5qcyBvciBDb21tb25KU1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IFNWR0luamVjdG9yO1xuICB9XG4gIC8vIEFNRCBzdXBwb3J0XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gU1ZHSW5qZWN0b3I7XG4gICAgfSk7XG4gIH1cbiAgLy8gT3RoZXJ3aXNlLCBhdHRhY2ggdG8gd2luZG93IGFzIGdsb2JhbFxuICBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgIHdpbmRvdy5TVkdJbmplY3RvciA9IFNWR0luamVjdG9yO1xuICB9XG4gIC8qIGdsb2JhbCAtbW9kdWxlLCAtZXhwb3J0cywgLWRlZmluZSAqL1xuXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcbiJdfQ==
