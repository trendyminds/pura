!function e(t,n,r){function i(o,a){if(!n[o]){if(!t[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(s)return s(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(e,n,i){function s(e,t){return("undefined"==typeof e?"undefined":r(e))===t}function o(){var e,t,n,r,i,o,a;for(var c in v)if(v.hasOwnProperty(c)){if(e=[],t=v[c],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=s(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)o=e[i],a=o.split("."),1===a.length?A[a[0]]=r:(!A[a[0]]||A[a[0]]instanceof Boolean||(A[a[0]]=new Boolean(A[a[0]])),A[a[0]][a[1]]=r),S.push((r?"":"no-")+a.join("-"))}}function a(e){var t=E.className,n=A._config.classPrefix||"";if(b&&(t=t.baseVal),A._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}A._config.enableClasses&&(t+=" "+n+e.join(" "+n),b?E.className.baseVal=t:E.className=t)}function c(e,t){if("object"==("undefined"==typeof e?"undefined":r(e)))for(var n in e)w(e,n)&&c(n,e[n]);else{e=e.toLowerCase();var i=e.split("."),s=A[i[0]];if(2==i.length&&(s=s[i[1]]),"undefined"!=typeof s)return A;t="function"==typeof t?t():t,1==i.length?A[i[0]]=t:(!A[i[0]]||A[i[0]]instanceof Boolean||(A[i[0]]=new Boolean(A[i[0]])),A[i[0]][i[1]]=t),a([(t&&0!=t?"":"no-")+i.join("-")]),A._trigger(e,t)}return A}function u(e,t){return!!~(""+e).indexOf(t)}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):b?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function f(){var e=n.body;return e||(e=l(b?"svg":"body"),e.fake=!0),e}function d(e,t,r,i){var s,o,a,c,u="modernizr",d=l("div"),p=f();if(parseInt(r,10))for(;r--;)a=l("div"),a.id=i?i[r]:u+(r+1),d.appendChild(a);return s=l("style"),s.type="text/css",s.id="s"+u,(p.fake?p:d).appendChild(s),p.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",c=E.style.overflow,E.style.overflow="hidden",E.appendChild(p)),o=t(d,e),p.fake?(p.parentNode.removeChild(p),E.style.overflow=c,E.offsetHeight):d.parentNode.removeChild(d),!!o}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(t,n){var r=t.length;if("CSS"in e&&"supports"in e.CSS){for(;r--;)if(e.CSS.supports(p(t[r]),n))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];r--;)s.push("("+p(t[r])+":"+n+")");return s=s.join(" or "),d("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return i}function h(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function g(e,t,n,r){function o(){c&&(delete C.style,delete C.modElem)}if(r=s(r,"undefined")?!1:r,!s(n,"undefined")){var a=m(e,n);if(!s(a,"undefined"))return a}for(var c,f,d,p,g,v=["modernizr","tspan"];!C.style;)c=!0,C.modElem=l(v.shift()),C.style=C.modElem.style;for(d=e.length,f=0;d>f;f++)if(p=e[f],g=C.style[p],u(p,"-")&&(p=h(p)),C.style[p]!==i){if(r||s(n,"undefined"))return o(),"pfx"==t?p:!0;try{C.style[p]=n}catch(y){}if(C.style[p]!=g)return o(),"pfx"==t?p:!0}return o(),!1}var v=[],y={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){v.push({name:e,fn:t,options:n})},addAsyncTest:function(e){v.push({name:null,fn:e})}},A=function(){};A.prototype=y,A=new A;var w,S=[],E=n.documentElement,b="svg"===E.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;w=s(e,"undefined")||s(e.call,"undefined")?function(e,t){return t in e&&s(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),y._l={},y.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),A.hasOwnProperty(e)&&setTimeout(function(){A._trigger(e,A[e])},0)},y._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},A._q.push(function(){y.addTest=c});b||!function(e,n){function i(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function s(){var e=T.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=T.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),T.elements=n+" "+e,f(t)}function a(e){var t=C[e[b]];return t||(t={},x++,e[b]=x,C[x]=t),t}function c(e,t,r){if(t||(t=n),y)return t.createElement(e);r||(r=a(t));var i;return i=r.cache[e]?r.cache[e].cloneNode():E.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!i.canHaveChildren||S.test(e)||i.tagUrn?i:r.frag.appendChild(i)}function u(e,t){if(e||(e=n),y)return e.createDocumentFragment();t=t||a(e);for(var r=t.frag.cloneNode(),i=0,o=s(),c=o.length;c>i;i++)r.createElement(o[i]);return r}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return T.shivMethods?c(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+s().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(T,t.frag)}function f(e){e||(e=n);var t=a(e);return!T.shivCSS||v||t.hasCSS||(t.hasCSS=!!i(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),y||l(e,t),e}function d(e){for(var t,n=e.getElementsByTagName("*"),r=n.length,i=RegExp("^(?:"+s().join("|")+")$","i"),o=[];r--;)t=n[r],i.test(t.nodeName)&&o.push(t.applyElement(p(t)));return o}function p(e){for(var t,n=e.attributes,r=n.length,i=e.ownerDocument.createElement(N+":"+e.nodeName);r--;)t=n[r],t.specified&&i.setAttribute(t.nodeName,t.nodeValue);return i.style.cssText=e.style.cssText,i}function m(e){for(var t,n=e.split("{"),r=n.length,i=RegExp("(^|[\\s,>+~])("+s().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),o="$1"+N+"\\:$2";r--;)t=n[r]=n[r].split("}"),t[t.length-1]=t[t.length-1].replace(i,o),n[r]=t.join("}");return n.join("{")}function h(e){for(var t=e.length;t--;)e[t].removeNode()}function g(e){function t(){clearTimeout(s._removeSheetTimer),n&&n.removeNode(!0),n=null}var n,r,s=a(e),o=e.namespaces,c=e.parentWindow;return!_||e.printShived?e:("undefined"==typeof o[N]&&o.add(N),c.attachEvent("onbeforeprint",function(){t();for(var s,o,a,c=e.styleSheets,u=[],l=c.length,f=Array(l);l--;)f[l]=c[l];for(;a=f.pop();)if(!a.disabled&&z.test(a.media)){try{s=a.imports,o=s.length}catch(p){o=0}for(l=0;o>l;l++)f.push(s[l]);try{u.push(a.cssText)}catch(p){}}u=m(u.reverse().join("")),r=d(e),n=i(e,u)}),c.attachEvent("onafterprint",function(){h(r),clearTimeout(s._removeSheetTimer),s._removeSheetTimer=setTimeout(t,500)}),e.printShived=!0,e)}var v,y,A="3.7.3",w=e.html5||{},S=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,E=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,b="_html5shiv",x=0,C={};!function(){try{var e=n.createElement("a");e.innerHTML="<xyz></xyz>",v="hidden"in e,y=1==e.childNodes.length||function(){n.createElement("a");var e=n.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(t){v=!0,y=!0}}();var T={elements:w.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:A,shivCSS:w.shivCSS!==!1,supportsUnknownElements:y,shivMethods:w.shivMethods!==!1,type:"default",shivDocument:f,createElement:c,createDocumentFragment:u,addElements:o};e.html5=T,f(n);var z=/^$|\b(?:all|print)\b/,N="html5shiv",_=!y&&function(){var t=n.documentElement;return!("undefined"==typeof n.namespaces||"undefined"==typeof n.parentWindow||"undefined"==typeof t.applyElement||"undefined"==typeof t.removeNode||"undefined"==typeof e.attachEvent)}();T.type+=" print",T.shivPrint=g,g(n),"object"==("undefined"==typeof t?"undefined":r(t))&&t.exports&&(t.exports=T)}("undefined"!=typeof e?e:this,n);var x={elem:l("modernizr")};A._q.push(function(){delete x.elem});var C={style:x.elem.style};A._q.unshift(function(){delete C.style});y.testProp=function(e,t,n){return g([e],i,t,n)};A.addTest("svg",!!n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),o(),a(S),delete y.addTest,delete y.addAsyncTest;for(var T=0;T<A._q.length;T++)A._q[T]();e.Modernizr=A}(window,document)},{}],2:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}e("../../_tmp/scripts/modernizr"),e("picturefill");var i=function s(){r(this,s)};new i},{"../../_tmp/scripts/modernizr":1,picturefill:3}],3:[function(e,t,n){!function(e){var t=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(t)&&t.match(/rv\:(\d+)/)&&RegExp.$1<41&&addEventListener("resize",function(){var t,n=document.createElement("source"),r=function(e){var t,r,i=e.parentNode;"PICTURE"===i.nodeName.toUpperCase()?(t=n.cloneNode(),i.insertBefore(t,i.firstElementChild),setTimeout(function(){i.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,r=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=r}))},i=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)r(t[e])},s=function(){clearTimeout(t),t=setTimeout(i,99)},o=e.matchMedia&&matchMedia("(orientation: landscape)"),a=function(){s(),o&&o.addListener&&o.addListener(s)};return n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?a():document.addEventListener("DOMContentLoaded",a),s}())}(window),function(e,n,r){"use strict";function i(e){return" "===e||"	"===e||"\n"===e||"\f"===e||"\r"===e}function s(t,n){var r=new e.Image;return r.onerror=function(){T[t]=!1,te()},r.onload=function(){T[t]=1===r.width,te()},r.src=n,"pending"}function o(){U=!1,q=e.devicePixelRatio,F={},B={},A.DPR=q||1,I.width=Math.max(e.innerWidth||0,C.clientWidth),I.height=Math.max(e.innerHeight||0,C.clientHeight),I.vw=I.width/100,I.vh=I.height/100,y=[I.height,I.width,q].join("-"),I.em=A.getEmValue(),I.rem=I.em}function a(e,t,n,r){var i,s,o,a;return"saveData"===z.algorithm?e>2.7?a=n+1:(s=t-n,i=Math.pow(e-.6,1.5),o=s*i,r&&(o+=.1*i),a=e+o):a=n>1?Math.sqrt(e*t):e,a>n}function c(e){var t,n=A.getSet(e),r=!1;"pending"!==n&&(r=y,n&&(t=A.setRes(n),A.applySetCandidate(t,e))),e[A.ns].evaled=r}function u(e,t){return e.res-t.res}function l(e,t,n){var r;return!n&&t&&(n=e[A.ns].sets,n=n&&n[n.length-1]),r=f(t,n),r&&(t=A.makeUrl(t),e[A.ns].curSrc=t,e[A.ns].curCan=r,r.res||ee(r,r.set.sizes)),r}function f(e,t){var n,r,i;if(e&&t)for(i=A.parseSet(t),e=A.makeUrl(e),n=0;n<i.length;n++)if(e===A.makeUrl(i[n].url)){r=i[n];break}return r}function d(e,t){var n,r,i,s,o=e.getElementsByTagName("source");for(n=0,r=o.length;r>n;n++)i=o[n],i[A.ns]=!0,s=i.getAttribute("srcset"),s&&t.push({srcset:s,media:i.getAttribute("media"),type:i.getAttribute("type"),sizes:i.getAttribute("sizes")})}function p(e,t){function n(t){var n,r=t.exec(e.substring(d));return r?(n=r[0],d+=n.length,n):void 0}function r(){var e,n,r,i,s,c,u,l,f,d=!1,m={};for(i=0;i<a.length;i++)s=a[i],c=s[s.length-1],u=s.substring(0,s.length-1),l=parseInt(u,10),f=parseFloat(u),J.test(u)&&"w"===c?((e||n)&&(d=!0),0===l?d=!0:e=l):K.test(u)&&"x"===c?((e||n||r)&&(d=!0),0>f?d=!0:n=f):J.test(u)&&"h"===c?((r||n)&&(d=!0),0===l?d=!0:r=l):d=!0;d||(m.url=o,e&&(m.w=e),n&&(m.d=n),r&&(m.h=r),r||n||e||(m.d=1),1===m.d&&(t.has1x=!0),m.set=t,p.push(m))}function s(){for(n(Q),c="",u="in descriptor";;){if(l=e.charAt(d),"in descriptor"===u)if(i(l))c&&(a.push(c),c="",u="after descriptor");else{if(","===l)return d+=1,c&&a.push(c),void r();if("("===l)c+=l,u="in parens";else{if(""===l)return c&&a.push(c),void r();c+=l}}else if("in parens"===u)if(")"===l)c+=l,u="in descriptor";else{if(""===l)return a.push(c),void r();c+=l}else if("after descriptor"===u)if(i(l));else{if(""===l)return void r();u="in descriptor",d-=1}d+=1}}for(var o,a,c,u,l,f=e.length,d=0,p=[];;){if(n(O),d>=f)return p;o=n(G),a=[],","===o.slice(-1)?(o=o.replace(V,""),r()):s()}}function m(e){function t(e){function t(){s&&(o.push(s),s="")}function n(){o[0]&&(a.push(o),o=[])}for(var r,s="",o=[],a=[],c=0,u=0,l=!1;;){if(r=e.charAt(u),""===r)return t(),n(),a;if(l){if("*"===r&&"/"===e[u+1]){l=!1,u+=2,t();continue}u+=1}else{if(i(r)){if(e.charAt(u-1)&&i(e.charAt(u-1))||!s){u+=1;continue}if(0===c){t(),u+=1;continue}r=" "}else if("("===r)c+=1;else if(")"===r)c-=1;else{if(","===r){t(),n(),u+=1;continue}if("/"===r&&"*"===e.charAt(u+1)){l=!0,u+=2;continue}}s+=r,u+=1}}}function n(e){return l.test(e)&&parseFloat(e)>=0?!0:f.test(e)?!0:"0"===e||"-0"===e||"+0"===e?!0:!1}var r,s,o,a,c,u,l=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,f=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(s=t(e),o=s.length,r=0;o>r;r++)if(a=s[r],c=a[a.length-1],n(c)){if(u=c,a.pop(),0===a.length)return u;if(a=a.join(" "),A.matchesMedia(a))return u}return"100vw"}n.createElement("picture");var h,g,v,y,A={},w=function(){},S=n.createElement("img"),E=S.getAttribute,b=S.setAttribute,x=S.removeAttribute,C=n.documentElement,T={},z={algorithm:""},N="data-pfsrc",_=N+"set",M=navigator.userAgent,L=/rident/.test(M)||/ecko/.test(M)&&M.match(/rv\:(\d+)/)&&RegExp.$1>35,R="currentSrc",D=/\s+\+?\d+(e\d+)?w/,$=/(\([^)]+\))?\s*(.+)/,k=e.picturefillCFG,P="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",j="font-size:100%!important;",U=!0,F={},B={},q=e.devicePixelRatio,I={px:1,"in":96},W=n.createElement("a"),H=!1,Q=/^[ \t\n\r\u000c]+/,O=/^[, \t\n\r\u000c]+/,G=/^[^ \t\n\r\u000c]+/,V=/[,]+$/,J=/^\d+$/,K=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,X=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},Z=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}},Y=function(){var e=/^([\d\.]+)(em|vw|px)$/,t=function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n},n=Z(function(e){return"return "+t((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(t,r){var i;if(!(t in F))if(F[t]=!1,r&&(i=t.match(e)))F[t]=i[1]*I[i[2]];else try{F[t]=new Function("e",n(t))(I)}catch(s){}return F[t]}}(),ee=function(e,t){return e.w?(e.cWidth=A.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},te=function(e){var t,r,i,s=e||{};if(s.elements&&1===s.elements.nodeType&&("IMG"===s.elements.nodeName.toUpperCase()?s.elements=[s.elements]:(s.context=s.elements,s.elements=null)),t=s.elements||A.qsa(s.context||n,s.reevaluate||s.reselect?A.sel:A.selShort),i=t.length){for(A.setupRun(s),H=!0,r=0;i>r;r++)A.fillImg(t[r],s);A.teardownRun(s)}};h=e.console&&console.warn?function(e){console.warn(e)}:w,R in S||(R="src"),T["image/jpeg"]=!0,T["image/gif"]=!0,T["image/png"]=!0,T["image/svg+xml"]=n.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1"),A.ns=("pf"+(new Date).getTime()).substr(0,9),A.supSrcset="srcset"in S,A.supSizes="sizes"in S,A.supPicture=!!e.HTMLPictureElement,A.supSrcset&&A.supPicture&&!A.supSizes&&!function(e){S.srcset="data:,a",e.src="data:,a",A.supSrcset=S.complete===e.complete,A.supPicture=A.supSrcset&&A.supPicture}(n.createElement("img")),A.selShort="picture>img,img[srcset]",A.sel=A.selShort,A.cfg=z,A.supSrcset&&(A.sel+=",img["+_+"]"),A.DPR=q||1,A.u=I,A.types=T,v=A.supSrcset&&!A.supSizes,A.setSize=w,A.makeUrl=Z(function(e){return W.href=e,W.href}),A.qsa=function(e,t){return e.querySelectorAll(t)},A.matchesMedia=function(){return e.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?A.matchesMedia=function(e){return!e||matchMedia(e).matches}:A.matchesMedia=A.mMQ,A.matchesMedia.apply(this,arguments)},A.mMQ=function(e){return e?Y(e):!0},A.calcLength=function(e){var t=Y(e,!0)||!1;return 0>t&&(t=!1),t},A.supportsType=function(e){return e?T[e]:!0},A.parseSize=Z(function(e){var t=(e||"").match($);return{media:t&&t[1],length:t&&t[2]}}),A.parseSet=function(e){return e.cands||(e.cands=p(e.srcset,e)),e.cands},A.getEmValue=function(){var e;if(!g&&(e=n.body)){var t=n.createElement("div"),r=C.style.cssText,i=e.style.cssText;t.style.cssText=P,C.style.cssText=j,e.style.cssText=j,e.appendChild(t),g=t.offsetWidth,e.removeChild(t),g=parseFloat(g,10),C.style.cssText=r,e.style.cssText=i}return g||16},A.calcListLength=function(e){if(!(e in B)||z.uT){var t=A.calcLength(m(e));B[e]=t?t:I.width}return B[e]},A.setRes=function(e){var t;if(e){t=A.parseSet(e);for(var n=0,r=t.length;r>n;n++)ee(t[n],e.sizes)}return t},A.setRes.res=ee,A.applySetCandidate=function(e,t){if(e.length){var n,r,i,s,o,c,f,d,p,m=t[A.ns],h=A.DPR;if(c=m.curSrc||t[R],f=m.curCan||l(t,c,e[0].set),f&&f.set===e[0].set&&(p=L&&!t.complete&&f.res-.1>h,p||(f.cached=!0,f.res>=h&&(o=f))),!o)for(e.sort(u),s=e.length,o=e[s-1],r=0;s>r;r++)if(n=e[r],n.res>=h){i=r-1,o=e[i]&&(p||c!==A.makeUrl(n.url))&&a(e[i].res,n.res,h,e[i].cached)?e[i]:n;break}o&&(d=A.makeUrl(o.url),m.curSrc=d,m.curCan=o,d!==c&&A.setSrc(t,o),A.setSize(t))}},A.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},A.getSet=function(e){var t,n,r,i=!1,s=e[A.ns].sets;for(t=0;t<s.length&&!i;t++)if(n=s[t],n.srcset&&A.matchesMedia(n.media)&&(r=A.supportsType(n.type))){"pending"===r&&(n=r),i=n;break}return i},A.parseSets=function(e,t,n){var i,s,o,a,c=t&&"PICTURE"===t.nodeName.toUpperCase(),u=e[A.ns];(u.src===r||n.src)&&(u.src=E.call(e,"src"),u.src?b.call(e,N,u.src):x.call(e,N)),(u.srcset===r||n.srcset||!A.supSrcset||e.srcset)&&(i=E.call(e,"srcset"),u.srcset=i,a=!0),u.sets=[],c&&(u.pic=!0,d(t,u.sets)),u.srcset?(s={srcset:u.srcset,sizes:E.call(e,"sizes")},u.sets.push(s),o=(v||u.src)&&D.test(u.srcset||""),o||!u.src||f(u.src,s)||s.has1x||(s.srcset+=", "+u.src,s.cands.push({url:u.src,d:1,set:s}))):u.src&&u.sets.push({srcset:u.src,sizes:null}),u.curCan=null,u.curSrc=r,u.supported=!(c||s&&!A.supSrcset||o),a&&A.supSrcset&&!u.supported&&(i?(b.call(e,_,i),e.srcset=""):x.call(e,_)),u.supported&&!u.srcset&&(!u.src&&e.src||e.src!==A.makeUrl(u.src))&&(null===u.src?e.removeAttribute("src"):e.src=u.src),u.parsed=!0},A.fillImg=function(e,t){var n,r=t.reselect||t.reevaluate;e[A.ns]||(e[A.ns]={}),n=e[A.ns],(r||n.evaled!==y)&&((!n.parsed||t.reevaluate)&&A.parseSets(e,e.parentNode,t),n.supported?n.evaled=y:c(e))},A.setupRun=function(){(!H||U||q!==e.devicePixelRatio)&&o()},A.supPicture?(te=w,A.fillImg=w):!function(){var t,r=e.attachEvent?/d$|^c/:/d$|^c|^i/,i=function(){var e=n.readyState||"";s=setTimeout(i,"loading"===e?200:999),n.body&&(A.fillImgs(),t=t||r.test(e),t&&clearTimeout(s))},s=setTimeout(i,n.body?9:99),o=function(e,t){var n,r,i=function(){var s=new Date-r;t>s?n=setTimeout(i,t-s):(n=null,e())};return function(){r=new Date,n||(n=setTimeout(i,t))}},a=C.clientHeight,c=function(){U=Math.max(e.innerWidth||0,C.clientWidth)!==I.width||C.clientHeight!==a,a=C.clientHeight,U&&A.fillImgs()};X(e,"resize",o(c,99)),X(n,"readystatechange",i)}(),A.picturefill=te,A.fillImgs=te,A.teardownRun=w,te._=A,e.picturefillCFG={pf:A,push:function(e){var t=e.shift();"function"==typeof A[t]?A[t].apply(A,e):(z[t]=e[0],H&&A.fillImgs({reselect:!0}))}};for(;k&&k.length;)e.picturefillCFG.push(k.shift());e.picturefill=te,"object"==typeof t&&"object"==typeof t.exports?t.exports=te:"function"==typeof define&&define.amd&&define("picturefill",function(){return te}),A.supPicture||(T["image/webp"]=s("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document)},{}]},{},[2]);