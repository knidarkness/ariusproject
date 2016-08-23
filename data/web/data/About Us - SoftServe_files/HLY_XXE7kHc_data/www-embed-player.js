(function(){var g,aa=aa||{},l=this;function p(a){return void 0!==a}
function q(a,b,c){a=a.split(".");c=c||l;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&p(b)?c[d]=b:c[d]?c=c[d]:c=c[d]={}}
function r(a,b){for(var c=a.split("."),d=b||l,e;e=c.shift();)if(null!=d[e])d=d[e];else return null;return d}
function t(){}
function u(){throw Error("unimplemented abstract method");}
function ba(a){a.getInstance=function(){return a.U?a.U:a.U=new a}}
function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function v(a){return"array"==ca(a)}
function da(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function w(a){return"string"==typeof a}
function ea(a){return"number"==typeof a}
function fa(a){return"function"==ca(a)}
function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function ia(a){return a[ja]||(a[ja]=++ka)}
var ja="closure_uid_"+(1E9*Math.random()>>>0),ka=0;function la(a,b,c){return a.call.apply(a.bind,arguments)}
function ma(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function x(a,b,c){x=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?la:ma;return x.apply(null,arguments)}
function na(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}
var y=Date.now||function(){return+new Date};
function z(a,b){function c(){}
c.prototype=b.prototype;a.B=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Re=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}}
;function oa(a){if(Error.captureStackTrace)Error.captureStackTrace(this,oa);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
z(oa,Error);oa.prototype.name="CustomError";var pa;var qa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function ra(a){return decodeURIComponent(a.replace(/\+/g," "))}
var sa=/&/g,ta=/</g,ua=/>/g,va=/"/g,wa=/'/g,xa=/\x00/g,ya=/[\x00&<>"']/;function za(a){var b={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},c;c=l.document.createElement("div");return a.replace(Aa,function(a,e){var f=b[a];if(f)return f;if("#"==e.charAt(0)){var h=Number("0"+e.substr(1));isNaN(h)||(f=String.fromCharCode(h))}f||(c.innerHTML=a+" ",f=c.firstChild.nodeValue.slice(0,-1));return b[a]=f})}
function Ba(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if("#"==c.charAt(0)){var d=Number("0"+c.substr(1));if(!isNaN(d))return String.fromCharCode(d)}return a}})}
var Aa=/&([^;\s<&]+);?/g,Ca={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"<"},Da={"'":"\\'"};
function Ea(a,b){for(var c=0,d=qa(String(a)).split("."),e=qa(String(b)).split("."),f=Math.max(d.length,e.length),h=0;0==c&&h<f;h++){var k=d[h]||"",m=e[h]||"";do{k=/(\d*)(\D*)(.*)/.exec(k)||["","","",""];m=/(\d*)(\D*)(.*)/.exec(m)||["","","",""];if(0==k[0].length&&0==m[0].length)break;c=Fa(0==k[1].length?0:parseInt(k[1],10),0==m[1].length?0:parseInt(m[1],10))||Fa(0==k[2].length,0==m[2].length)||Fa(k[2],m[2]);k=k[3];m=m[3]}while(0==c)}return c}
function Fa(a,b){return a<b?-1:a>b?1:0}
function Ga(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var Ha=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;
if(w(a))return w(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},A=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=w(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ia=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=w(a)?a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];
b.call(c,m,k,a)&&(e[f++]=m)}return e},Ja=Array.prototype.map?function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=w(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));
return e},Ka=Array.prototype.some?function(a,b,c){return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=w(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;
return!1},La=Array.prototype.every?function(a,b,c){return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=w(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;
return!0};
function Ma(a,b,c){b=Na(a,b,c);return 0>b?null:w(a)?a.charAt(b):a[b]}
function Na(a,b,c){for(var d=a.length,e=w(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}
function B(a,b){return 0<=Ha(a,b)}
function Oa(a,b){B(a,b)||a.push(b)}
function Pa(a,b){var c=Ha(a,b),d;(d=0<=c)&&Array.prototype.splice.call(a,c,1);return d}
function Qa(a,b){var c=Na(a,b,void 0);0<=c&&Array.prototype.splice.call(a,c,1)}
function Ra(a){return Array.prototype.concat.apply(Array.prototype,arguments)}
function Sa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Ta(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(da(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var h=0;h<f;h++)a[e+h]=d[h]}else a.push(d)}}
function Ua(a,b,c,d){return Array.prototype.splice.apply(a,Va(arguments,1))}
function Va(a,b,c){return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)}
function Wa(a,b){return a>b?1:a<b?-1:0}
;function Xa(a,b,c){for(var d in a)b.call(c,a[d],d,a)}
function Ya(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d}
function Za(a){var b=0,c;for(c in a)b++;return b}
function $a(a,b){return ab(a,b)}
function bb(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}
function cb(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}
function ab(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function db(a){var b=eb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function fb(a){for(var b in a)return!1;return!0}
function gb(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function hb(a){var b={},c;for(c in a)b[c]=a[c];return b}
function ib(a){var b=ca(a);if("object"==b||"array"==b){if(fa(a.clone))return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=ib(a[c]);return b}return a}
var jb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function kb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<jb.length;f++)c=jb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var lb;a:{var mb=l.navigator;if(mb){var nb=mb.userAgent;if(nb){lb=nb;break a}}lb=""}function C(a){return-1!=lb.indexOf(a)}
;function ob(){return(C("Chrome")||C("CriOS"))&&!C("Edge")}
;function pb(){this.b="";this.f=qb}
pb.prototype.Ob=!0;pb.prototype.Jb=function(){return this.b};
function rb(a){if(a instanceof pb&&a.constructor===pb&&a.f===qb)return a.b;ca(a);return"type_error:SafeUrl"}
var sb=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;function tb(a){if(a instanceof pb)return a;a=a.Ob?a.Jb():String(a);sb.test(a)||(a="about:invalid#zClosurez");return ub(a)}
var qb={};function ub(a){var b=new pb;b.b=a;return b}
ub("about:blank");function vb(){this.b="";this.f=wb}
vb.prototype.Ob=!0;vb.prototype.Jb=function(){return this.b};
var wb={};function xb(){this.b="";this.f=yb}
xb.prototype.Ob=!0;xb.prototype.Jb=function(){return this.b};
function zb(a){if(a instanceof xb&&a.constructor===xb&&a.f===yb)return a.b;ca(a);return"type_error:SafeHtml"}
var yb={};function Ab(a){var b=new xb;b.b=a;return b}
Ab("<!DOCTYPE html>");Ab("");Ab("<br>");function Bb(a,b){var c;c=b instanceof pb?b:tb(b);a.href=rb(c)}
function Cb(a,b){a.rel="stylesheet";var c;b instanceof vb&&b.constructor===vb&&b.f===wb?c=b.b:(ca(b),c="type_error:TrustedResourceUrl");a.href=c}
;function Db(a,b,c){a&&(a.dataset?a.dataset[Eb(b)]=c:a.setAttribute("data-"+b,c))}
function D(a,b){return a?a.dataset?a.dataset[Eb(b)]:a.getAttribute("data-"+b):null}
function Fb(a,b){a&&(a.dataset?delete a.dataset[Eb(b)]:a.removeAttribute("data-"+b))}
var Gb={};function Eb(a){return Gb[a]||(Gb[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))}
;function Hb(a){l.setTimeout(function(){throw a;},0)}
var Ib;
function Jb(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!C("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=x(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);
b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});
if("undefined"!==typeof a&&!C("Trident")&&!C("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.dc;c.dc=null;a()}};
return function(a){d.next={dc:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};
document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}}
;function Kb(a,b,c){this.i=c;this.g=a;this.j=b;this.f=0;this.b=null}
Kb.prototype.get=function(){var a;0<this.f?(this.f--,a=this.b,this.b=a.next,a.next=null):a=this.g();return a};
function Lb(a,b){a.j(b);a.f<a.i&&(a.f++,b.next=a.b,a.b=b)}
;function Mb(){this.f=this.b=null}
var Ob=new Kb(function(){return new Nb},function(a){a.reset()},100);
Mb.prototype.remove=function(){var a=null;this.b&&(a=this.b,this.b=this.b.next,this.b||(this.f=null),a.next=null);return a};
function Nb(){this.next=this.scope=this.b=null}
Nb.prototype.set=function(a,b){this.b=a;this.scope=b;this.next=null};
Nb.prototype.reset=function(){this.next=this.scope=this.b=null};function Pb(a,b){Qb||Rb();Sb||(Qb(),Sb=!0);var c=Tb,d=Ob.get();d.set(a,b);c.f?c.f.next=d:c.b=d;c.f=d}
var Qb;function Rb(){if(l.Promise&&l.Promise.resolve){var a=l.Promise.resolve(void 0);Qb=function(){a.then(Ub)}}else Qb=function(){var a=Ub;
!fa(l.setImmediate)||l.Window&&l.Window.prototype&&!C("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(Ib||(Ib=Jb()),Ib(a)):l.setImmediate(a)}}
var Sb=!1,Tb=new Mb;function Ub(){for(var a;a=Tb.remove();){try{a.b.call(a.scope)}catch(b){Hb(b)}Lb(Ob,a)}Sb=!1}
;function E(){this.Ia=this.Ia;this.R=this.R}
E.prototype.Ia=!1;E.prototype.C=function(){return this.Ia};
E.prototype.dispose=function(){this.Ia||(this.Ia=!0,this.w())};
function Vb(a,b){a.Ia?p(void 0)?b.call(void 0):b():(a.R||(a.R=[]),a.R.push(p(void 0)?x(b,void 0):b))}
E.prototype.w=function(){if(this.R)for(;this.R.length;)this.R.shift()()};
function F(a){a&&"function"==typeof a.dispose&&a.dispose()}
function Wb(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];da(d)?Wb.apply(null,d):F(d)}}
;function G(a){E.call(this);this.i=1;this.f=[];this.g=0;this.b=[];this.fa={};this.j=!!a}
z(G,E);g=G.prototype;g.subscribe=function(a,b,c){var d=this.fa[a];d||(d=this.fa[a]=[]);var e=this.i;this.b[e]=a;this.b[e+1]=b;this.b[e+2]=c;this.i=e+3;d.push(e);return e};
g.unsubscribe=function(a,b,c){if(a=this.fa[a]){var d=this.b;if(a=Ma(a,function(a){return d[a+1]==b&&d[a+2]==c}))return this.ka(a)}return!1};
g.ka=function(a){var b=this.b[a];if(b){var c=this.fa[b];0!=this.g?(this.f.push(a),this.b[a+1]=t):(c&&Pa(c,a),delete this.b[a],delete this.b[a+1],delete this.b[a+2])}return!!b};
g.u=function(a,b){var c=this.fa[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.j)for(e=0;e<c.length;e++){var h=c[e];Xb(this.b[h+1],this.b[h+2],d)}else{this.g++;try{for(e=0,f=c.length;e<f;e++)h=c[e],this.b[h+1].apply(this.b[h+2],d)}finally{if(this.g--,0<this.f.length&&0==this.g)for(;c=this.f.pop();)this.ka(c)}}return 0!=e}return!1};
function Xb(a,b,c){Pb(function(){a.apply(b,c)})}
g.clear=function(a){if(a){var b=this.fa[a];b&&(A(b,this.ka,this),delete this.fa[a])}else this.b.length=0,this.fa={}};
g.S=function(a){if(a){var b=this.fa[a];return b?b.length:0}a=0;for(b in this.fa)a+=this.S(b);return a};
g.w=function(){G.B.w.call(this);this.clear();this.f.length=0};var Yb=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};q("yt.config_",Yb,void 0);q("yt.tokens_",window.yt&&window.yt.tokens_||{},void 0);var Zb=window.yt&&window.yt.msgs_||r("window.ytcfg.msgs")||{};q("yt.msgs_",Zb,void 0);function $b(a){ac(Yb,arguments)}
function H(a,b){return a in Yb?Yb[a]:b}
function I(a,b){fa(a)&&(a=bc(a));return window.setTimeout(a,b)}
function J(a){window.clearTimeout(a)}
function bc(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){throw cc(b),b;}}:a}
function cc(a,b){var c=r("yt.logging.errors.log");c?c(a,b,void 0,void 0,void 0):(c=H("ERRORS",[]),c.push([a,b,void 0,void 0,void 0]),$b("ERRORS",c))}
function ac(a,b){if(1<b.length){var c=b[0];a[c]=b[1]}else{var d=b[0];for(c in d)a[c]=d[c]}}
var dc=window.performance&&window.performance.timing&&window.performance.now?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()},ec="Microsoft Internet Explorer"==navigator.appName;var fc=r("yt.pubsub.instance_")||new G;G.prototype.subscribe=G.prototype.subscribe;G.prototype.unsubscribeByKey=G.prototype.ka;G.prototype.publish=G.prototype.u;G.prototype.clear=G.prototype.clear;q("yt.pubsub.instance_",fc,void 0);var gc=r("yt.pubsub.subscribedKeys_")||{};q("yt.pubsub.subscribedKeys_",gc,void 0);var hc=r("yt.pubsub.topicToKeys_")||{};q("yt.pubsub.topicToKeys_",hc,void 0);var ic=r("yt.pubsub.isSynchronous_")||{};q("yt.pubsub.isSynchronous_",ic,void 0);
var jc=r("yt.pubsub.skipSubId_")||null;q("yt.pubsub.skipSubId_",jc,void 0);function kc(a,b,c){var d=lc();if(d){var e=d.subscribe(a,function(){if(!jc||jc!=e){var d=arguments,h;h=function(){gc[e]&&b.apply(c||window,d)};
try{ic[a]?h():I(h,0)}catch(k){cc(k)}}},c);
gc[e]=!0;hc[a]||(hc[a]=[]);hc[a].push(e);return e}return 0}
function mc(a){var b=lc();b&&("number"==typeof a?a=[a]:"string"==typeof a&&(a=[parseInt(a,10)]),A(a,function(a){b.unsubscribeByKey(a);delete gc[a]}))}
function K(a,b){var c=lc();return c?c.publish.apply(c,arguments):!1}
function nc(a,b){ic[a]=!0;var c=lc();c&&c.publish.apply(c,arguments);ic[a]=!1}
function oc(a){hc[a]&&(a=hc[a],A(a,function(a){gc[a]&&delete gc[a]}),a.length=0)}
function pc(a){var b=lc();if(b)if(b.clear(a),a)oc(a);else for(var c in hc)oc(c)}
function lc(){return r("yt.pubsub.instance_")}
;function qc(a,b){if(window.spf){var c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(rc,""),c=c.replace(sc,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else tc(a,b)}
function tc(a,b){var c=uc(a),d=document.getElementById(c),e=d&&D(d,"loaded"),f=d&&!e;if(e){b&&b();return}if(b){var e=kc(c,b),h=""+ia(b);vc[h]=e}if(f)return;d=wc(a,c,function(){D(d,"loaded")||(Db(d,"loaded","true"),K(c),I(na(pc,c),0))})}
function wc(a,b,c){var d=document.createElement("script");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
d.onreadystatechange=function(){switch(d.readyState){case "loaded":case "complete":d.onload()}};
d.src=a;a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(d,a.firstChild);return d}
function xc(a,b){if(a&&b){var c=""+ia(b);(c=vc[c])&&mc(c)}}
function uc(a){var b=document.createElement("a");Bb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+Ga(a)}
var rc=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,sc=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/,vc={};var yc=null;function zc(){var a=H("BG_I",null),b=H("BG_IU",null),c=H("BG_P",void 0);b?qc(b,function(){yc=new botguard.bg(c)}):a&&(eval(a),yc=new botguard.bg(c))}
function Ac(){return null!=yc}
function Bc(){return yc?yc.invoke():null}
;var Cc="StopIteration"in l?l.StopIteration:{message:"StopIteration",stack:""};function Dc(){}
Dc.prototype.next=function(){throw Cc;};
Dc.prototype.ma=function(){return this};
function Ec(a){if(a instanceof Dc)return a;if("function"==typeof a.ma)return a.ma(!1);if(da(a)){var b=0,c=new Dc;c.next=function(){for(;;){if(b>=a.length)throw Cc;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function Fc(a,b,c){if(da(a))try{A(a,b,c)}catch(d){if(d!==Cc)throw d;}else{a=Ec(a);try{for(;;)b.call(c,a.next(),void 0,a)}catch(d){if(d!==Cc)throw d;}}}
function Gc(a){if(da(a))return Sa(a);a=Ec(a);var b=[];Fc(a,function(a){b.push(a)});
return b}
;function Hc(a,b){this.f={};this.b=[];this.xa=this.g=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof Hc?(c=a.na(),d=a.T()):(c=cb(a),d=bb(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}
g=Hc.prototype;g.S=function(){return this.g};
g.T=function(){Ic(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.f[this.b[b]]);return a};
g.na=function(){Ic(this);return this.b.concat()};
g.Ya=function(a){for(var b=0;b<this.b.length;b++){var c=this.b[b];if(Jc(this.f,c)&&this.f[c]==a)return!0}return!1};
g.equals=function(a,b){if(this===a)return!0;if(this.g!=a.S())return!1;var c=b||Kc;Ic(this);for(var d,e=0;d=this.b[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function Kc(a,b){return a===b}
g.isEmpty=function(){return 0==this.g};
g.clear=function(){this.f={};this.xa=this.g=this.b.length=0};
g.remove=function(a){return Jc(this.f,a)?(delete this.f[a],this.g--,this.xa++,this.b.length>2*this.g&&Ic(this),!0):!1};
function Ic(a){if(a.g!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Jc(a.f,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.g!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Jc(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
g.get=function(a,b){return Jc(this.f,a)?this.f[a]:b};
g.set=function(a,b){Jc(this.f,a)||(this.g++,this.b.push(a),this.xa++);this.f[a]=b};
g.forEach=function(a,b){for(var c=this.na(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
g.clone=function(){return new Hc(this)};
g.ma=function(a){Ic(this);var b=0,c=this.xa,d=this,e=new Dc;e.next=function(){if(c!=d.xa)throw Error("The map has changed since the iterator was created");if(b>=d.b.length)throw Cc;var e=d.b[b++];return a?e:d.f[e]};
return e};
function Jc(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
;function Lc(a){return a.S&&"function"==typeof a.S?a.S():da(a)||w(a)?a.length:Za(a)}
function Mc(a){if(a.T&&"function"==typeof a.T)return a.T();if(w(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return bb(a)}
function Nc(a){if(a.na&&"function"==typeof a.na)return a.na();if(!a.T||"function"!=typeof a.T){if(da(a)||w(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return cb(a)}}
function Oc(a,b,c){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,c);else if(da(a)||w(a))A(a,b,c);else for(var d=Nc(a),e=Mc(a),f=e.length,h=0;h<f;h++)b.call(c,e[h],d&&d[h],a)}
function Pc(a,b){if("function"==typeof a.every)return a.every(b,void 0);if(da(a)||w(a))return La(a,b,void 0);for(var c=Nc(a),d=Mc(a),e=d.length,f=0;f<e;f++)if(!b.call(void 0,d[f],c&&c[f],a))return!1;return!0}
;function Rc(a){this.b=new Hc;a&&Sc(this,a)}
function Tc(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+ia(a):b.substr(0,1)+a}
g=Rc.prototype;g.S=function(){return this.b.S()};
function Sc(a,b){for(var c=Mc(b),d=c.length,e=0;e<d;e++){var f=c[e];a.b.set(Tc(f),f)}}
g.remove=function(a){return this.b.remove(Tc(a))};
g.clear=function(){this.b.clear()};
g.isEmpty=function(){return this.b.isEmpty()};
g.contains=function(a){a=Tc(a);return Jc(this.b.f,a)};
g.T=function(){return this.b.T()};
g.clone=function(){return new Rc(this)};
g.equals=function(a){return this.S()==Lc(a)&&Uc(this,a)};
function Uc(a,b){var c=Lc(b);if(a.S()>c)return!1;!(b instanceof Rc)&&5<c&&(b=new Rc(b));return Pc(a,function(a){var c=b;return c.contains&&"function"==typeof c.contains?c.contains(a):c.Ya&&"function"==typeof c.Ya?c.Ya(a):da(c)||w(c)?B(c,a):ab(c,a)})}
g.ma=function(){return this.b.ma(!1)};function Vc(){return C("iPhone")&&!C("iPod")&&!C("iPad")}
;function Wc(a){Wc[" "](a);return a}
Wc[" "]=t;function Xc(a,b){var c=Yc;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)}
;var Zc=C("Opera"),L=C("Trident")||C("MSIE"),$c=C("Edge"),ad=C("Gecko")&&!(-1!=lb.toLowerCase().indexOf("webkit")&&!C("Edge"))&&!(C("Trident")||C("MSIE"))&&!C("Edge"),bd=-1!=lb.toLowerCase().indexOf("webkit")&&!C("Edge"),cd=C("Windows");function dd(){var a=l.document;return a?a.documentMode:void 0}
var ed;a:{var fd="",gd=function(){var a=lb;if(ad)return/rv\:([^\);]+)(\)|;)/.exec(a);if($c)return/Edge\/([\d\.]+)/.exec(a);if(L)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(bd)return/WebKit\/(\S+)/.exec(a);if(Zc)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
gd&&(fd=gd?gd[1]:"");if(L){var hd=dd();if(null!=hd&&hd>parseFloat(fd)){ed=String(hd);break a}}ed=fd}var id=ed,Yc={};function jd(a){return Xc(a,function(){return 0<=Ea(id,a)})}
function kd(a){return Number(ld)>=a}
var md=l.document,ld=md&&L?dd()||("CSS1Compat"==md.compatMode?parseInt(id,10):5):void 0;function nd(a){return/^\s*$/.test(a)?!1:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,""))}
function od(a){a=String(a);if(nd(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}
function pd(a){return eval("("+a+")")}
function M(a){return qd(new rd(void 0),a)}
function rd(a){this.b=a}
function qd(a,b){var c=[];sd(a,b,c);return c.join("")}
function sd(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(v(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],sd(a,a.b?a.b.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),td(d,c),c.push(":"),sd(a,a.b?a.b.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":td(b,
c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var ud={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},vd=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;function td(a,b){b.push('"',a.replace(vd,function(a){var b=ud[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),ud[a]=b);return b}),'"')}
;function wd(a){return H("EXPERIMENT_FLAGS",{})[a]}
;var xd=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function yd(a){return a?decodeURI(a):a}
function zd(a,b){return b.match(xd)[a]||null}
function Ad(a,b){if(a)for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("="),f,h=null;0<=e?(f=c[d].substring(0,e),h=c[d].substring(e+1)):f=c[d];b(f,h?ra(h):"")}}
function Bd(a){if(a[1]){var b=a[0],c=b.indexOf("#");0<=c&&(a.push(b.substr(c)),a[0]=b=b.substr(0,c));c=b.indexOf("?");0>c?a[1]="?":c==b.length-1&&(a[1]=void 0)}return a.join("")}
function Cd(a,b,c){if(v(b))for(var d=0;d<b.length;d++)Cd(a,String(b[d]),c);else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}
function Dd(a,b,c){for(c=c||0;c<b.length;c+=2)Cd(b[c],b[c+1],a);return a}
function Ed(a,b){for(var c in b)Cd(c,b[c],a);return a}
function Fd(a){a=Ed([],a);a[0]="";return a.join("")}
function Gd(a,b){return Bd(2==arguments.length?Dd([a],arguments[1],0):Dd([a],arguments,1))}
function Hd(a,b){return Bd(Ed([a],b))}
;function Id(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length){var f=ra(e[0]||""),e=ra(e[1]||"");f in b?v(b[f])?Ta(b[f],e):b[f]=[b[f],e]:b[f]=e}}return b}
function Jd(a,b){var c=a.split("#",2);a=c[0];var c=1<c.length?"#"+c[1]:"",d=a.split("?",2);a=d[0];var d=Id(d[1]||""),e;for(e in b)d[e]=b[e];return Hd(a,d)+c}
;var Kd=null;"undefined"!=typeof XMLHttpRequest?Kd=function(){return new XMLHttpRequest}:"undefined"!=typeof ActiveXObject&&(Kd=function(){return new ActiveXObject("Microsoft.XMLHTTP")});
function Ld(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function Md(a,b,c,d,e,f,h){function k(){4==(m&&"readyState"in m?m.readyState:0)&&b&&bc(b)(m)}
var m=Kd&&Kd();if(!("open"in m))return null;"onloadend"in m?m.addEventListener("loadend",k,!1):m.onreadystatechange=k;c=(c||"GET").toUpperCase();d=d||"";m.open(c,a,!0);f&&(m.responseType=f);h&&(m.withCredentials=!0);f="POST"==c;if(e=Nd(a,e))for(var n in e)m.setRequestHeader(n,e[n]),"content-type"==n.toLowerCase()&&(f=!1);f&&m.setRequestHeader("Content-Type","application/x-www-form-urlencoded");m.send(d);return m}
function Nd(a,b){b=b||{};var c;c||(c=window.location.href);var d=zd(1,a),e=yd(zd(3,a));d&&e?(d=c,c=a.match(xd),d=d.match(xd),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?yd(zd(3,c))==e&&(Number(zd(4,c))||null)==(Number(zd(4,a))||null):!0;for(var f in Od){if((e=d=H(Od[f]))&&!(e=c)){var e=f,h=H("CORS_HEADER_WHITELIST")||{},k=yd(zd(3,a));e=k?(h=h[k])?B(h,e):!1:!0}e&&(b[f]=d)}return b}
function Pd(a,b){var c=H("XSRF_FIELD_NAME",void 0),d;b.headers&&(d=b.headers["Content-Type"]);return!b.Te&&(!yd(zd(3,a))||b.withCredentials||yd(zd(3,a))==document.location.hostname)&&"POST"==b.method&&(!d||"application/x-www-form-urlencoded"==d)&&!(b.V&&b.V[c])}
function Qd(a,b){var c=b.format||"JSON";b.Ue&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var d=H("XSRF_FIELD_NAME",void 0),e=H("XSRF_TOKEN",void 0),f=b.Ub;f&&(f[d]&&delete f[d],a=Jd(a,f||{}));var h=b.postBody||"",f=b.V;Pd(a,b)&&(f||(f={}),f[d]=e);f&&w(h)&&(d=Id(h),kb(d,f),h=b.ce&&"JSON"==b.ce?JSON.stringify(d):Fd(d));var k=!1,m,n=Md(a,function(a){if(!k){k=!0;m&&J(m);var d=Ld(a),e=null;if(d||400<=a.status&&500>a.status)e=
Rd(c,a,b.Se);if(d)a:if(wd("ajax_204_success")&&204==a.status)d=!0;else{switch(c){case "XML":d=0==parseInt(e&&e.return_code,10);break a;case "RAW":d=!0;break a}d=!!e}var e=e||{},f=b.context||l;d?b.aa&&b.aa.call(f,a,e):b.onError&&b.onError.call(f,a,e);b.Rb&&b.Rb.call(f,a,e)}},b.method,h,b.headers,b.responseType,b.withCredentials);
b.Ga&&0<b.timeout&&(m=I(function(){k||(k=!0,n.abort(),J(m),b.Ga.call(b.context||l,n))},b.timeout));
return n}
function Rd(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=pd(a));break;case "XML":if(b=(b=b.responseXML)?Sd(b):null)d={},A(b.getElementsByTagName("*"),function(a){d[a.tagName]=Td(a)})}c&&Ud(d);
return d}
function Ud(a){if(ha(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d;d=Ab(a[b]);a[c]=d}else Ud(a[b])}}
function Sd(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function Td(a){var b="";A(a.childNodes,function(a){b+=a.nodeValue});
return b}
var Od={"X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"};var Vd={},Wd=0;function Xd(a,b){isNaN(b)&&(b=void 0);var c=r("yt.scheduler.instance.addJob");return c?c(a,1,b):void 0===b?(a(),NaN):I(a,b||0)}
;var Yd=[],Zd=!1;function $d(){function a(){Zd=!0;"google_ad_status"in window?$b("DCLKSTAT",1):$b("DCLKSTAT",2)}
qc("//static.doubleclick.net/instream/ad_status.js",a);Yd.push(Xd(function(){Zd||"google_ad_status"in window||(xc("//static.doubleclick.net/instream/ad_status.js",a),$b("DCLKSTAT",3))},5E3))}
function ae(){return parseInt(H("DCLKSTAT",0),10)}
;function be(a,b){this.width=a;this.height=b}
g=be.prototype;g.clone=function(){return new be(this.width,this.height)};
g.bd=function(){return this.width*this.height};
g.aspectRatio=function(){return this.width/this.height};
g.isEmpty=function(){return!this.bd()};
g.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
g.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
g.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function ce(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=null;if(a=a||window.event){this.event=a;for(var b in a)b in de||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:"mouseout"==
this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey}}
ce.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
ce.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
ce.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};
var de={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};function ee(a){if(a.classList)return a.classList;a=a.className;return w(a)&&a.match(/\S+/g)||[]}
function fe(a,b){return a.classList?a.classList.contains(b):B(ee(a),b)}
function ge(a,b){a.classList?a.classList.add(b):fe(a,b)||(a.className+=0<a.className.length?" "+b:b)}
function he(a,b){a.classList?a.classList.remove(b):fe(a,b)&&(a.className=Ia(ee(a),function(a){return a!=b}).join(" "))}
function ie(a,b,c){c?ge(a,b):he(a,b)}
;var je=y().toString();function ke(a,b){this.H=p(a)?a:0;this.J=p(b)?b:0}
ke.prototype.clone=function(){return new ke(this.H,this.J)};
ke.prototype.ceil=function(){this.H=Math.ceil(this.H);this.J=Math.ceil(this.J);return this};
ke.prototype.floor=function(){this.H=Math.floor(this.H);this.J=Math.floor(this.J);return this};
ke.prototype.round=function(){this.H=Math.round(this.H);this.J=Math.round(this.J);return this};!ad&&!L||L&&kd(9)||ad&&jd("1.9.1");var le=L&&!jd("9");function me(a){ne();var b=new vb;b.b=a;return b}
var ne=t;function oe(a){return a?new pe(qe(a)):pa||(pa=new pe)}
function re(a){var b=document;return w(a)?b.getElementById(a):a}
function se(a){var b=document;return b.querySelectorAll&&b.querySelector?b.querySelectorAll("."+a):te(a)}
function te(a){var b,c,d,e;b=document;if(b.querySelectorAll&&b.querySelector&&a)return b.querySelectorAll(""+(a?"."+a:""));if(a&&b.getElementsByClassName){var f=b.getElementsByClassName(a);return f}f=b.getElementsByTagName("*");if(a){e={};for(c=d=0;b=f[c];c++){var h=b.className;"function"==typeof h.split&&B(h.split(/\s+/),a)&&(e[d++]=b)}e.length=d;return e}return f}
function ue(a){var b=a.scrollingElement?a.scrollingElement:!bd&&ve(a)?a.documentElement:a.body||a.documentElement;a=a.parentWindow||a.defaultView;return L&&jd("10")&&a.pageYOffset!=b.scrollTop?new ke(b.scrollLeft,b.scrollTop):new ke(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop)}
function ve(a){return"CSS1Compat"==a.compatMode}
function we(a){for(var b;b=a.firstChild;)a.removeChild(b)}
function xe(a){if(!a)return null;if(a.firstChild)return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:null}
function ye(a){if(!a)return null;if(!a.previousSibling)return a.parentNode;for(a=a.previousSibling;a&&a.lastChild;)a=a.lastChild;return a}
function qe(a){return 9==a.nodeType?a:a.ownerDocument||a.document}
function ze(a,b){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else we(a),a.appendChild(qe(a).createTextNode(String(b)))}
var Ae={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},Be={IMG:" ",BR:"\n"};function Ce(a){if(le&&null!==a&&"innerText"in a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];De(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");le||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a}
function De(a,b,c){if(!(a.nodeName in Ae))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in Be)b.push(Be[a.nodeName]);else for(a=a.firstChild;a;)De(a,b,c),a=a.nextSibling}
function Ee(a){var b=Fe.Sc;return b?Ge(a,function(a){return!b||w(a.className)&&B(a.className.split(/\s+/),b)},!0,void 0):null}
function Ge(a,b,c,d){c||(a=a.parentNode);for(c=0;a&&(null==d||c<=d);){if(b(a))return a;a=a.parentNode;c++}return null}
function pe(a){this.b=a||l.document||document}
g=pe.prototype;g.getElementsByTagName=function(a,b){return(b||this.b).getElementsByTagName(a)};
g.createElement=function(a){return this.b.createElement(String(a))};
g.appendChild=function(a,b){a.appendChild(b)};
g.isElement=function(a){return ha(a)&&1==a.nodeType};
g.contains=function(a,b){if(!a||!b)return!1;if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||!!(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};var He=r("yt.dom.getNextId_");if(!He){He=function(){return++Ie};
q("yt.dom.getNextId_",He,void 0);var Ie=0}function Je(){var a=document,b;Ka(["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"],function(c){b=a[c];return!!b});
return b}
;var eb=r("yt.events.listeners_")||{};q("yt.events.listeners_",eb,void 0);var Ke=r("yt.events.counter_")||{count:0};q("yt.events.counter_",Ke,void 0);function Le(a,b,c,d){a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return db(function(e){return e[0]==a&&e[1]==b&&e[2]==c&&e[4]==!!d})}
function N(a,b,c,d){if(!a||!a.addEventListener&&!a.attachEvent)return"";d=!!d;var e=Le(a,b,c,d);if(e)return e;var e=++Ke.count+"",f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document),h;h=f?function(d){d=new ce(d);if(!Ge(d.relatedTarget,function(b){return b==a},!0))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new ce(b);
b.currentTarget=a;return c.call(a,b)};
h=bc(h);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),a.addEventListener(b,h,d)):a.attachEvent("on"+b,h);eb[e]=[a,b,c,h,d];return e}
function Me(a){a&&("string"==typeof a&&(a=[a]),A(a,function(a){if(a in eb){var c=eb[a],d=c[0],e=c[1],f=c[3],c=c[4];d.removeEventListener?d.removeEventListener(e,f,c):d.detachEvent&&d.detachEvent("on"+e,f);delete eb[a]}}))}
;function Ne(){if(null==r("_lact",window)){var a=parseInt(H("LACT"),10),a=isFinite(a)?y()-Math.max(a,0):-1;q("_lact",a,window);-1==a&&Oe();N(document,"keydown",Oe);N(document,"keyup",Oe);N(document,"mousedown",Oe);N(document,"mouseup",Oe);kc("page-mouse",Oe);kc("page-scroll",Oe);kc("page-resize",Oe)}}
function Oe(){null==r("_lact",window)&&(Ne(),r("_lact",window));var a=y();q("_lact",a,window);K("USER_ACTIVE")}
function Pe(){var a=r("_lact",window);return null==a?-1:Math.max(y()-a,0)}
;function Qe(){}
Qe.prototype.set=u;Qe.prototype.get=u;Qe.prototype.remove=u;function Re(){}
z(Re,Qe);Re.prototype.S=function(){var a=0;Fc(this.ma(!0),function(){a++});
return a};
Re.prototype.ma=u;Re.prototype.clear=function(){var a=Gc(this.ma(!0)),b=this;A(a,function(a){b.remove(a)})};function Se(a){this.b=a}
z(Se,Re);g=Se.prototype;g.isAvailable=function(){if(!this.b)return!1;try{return this.b.setItem("__sak","1"),this.b.removeItem("__sak"),!0}catch(a){return!1}};
g.set=function(a,b){try{this.b.setItem(a,b)}catch(c){if(0==this.b.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
g.get=function(a){a=this.b.getItem(a);if(!w(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
g.remove=function(a){this.b.removeItem(a)};
g.S=function(){return this.b.length};
g.ma=function(a){var b=0,c=this.b,d=new Dc;d.next=function(){if(b>=c.length)throw Cc;var d=c.key(b++);if(a)return d;d=c.getItem(d);if(!w(d))throw"Storage mechanism: Invalid value was encountered";return d};
return d};
g.clear=function(){this.b.clear()};
g.key=function(a){return this.b.key(a)};function Te(){var a=null;try{a=window.localStorage||null}catch(b){}this.b=a}
z(Te,Se);function Ue(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.b=a}
z(Ue,Se);function Ve(a){this.b=a}
Ve.prototype.set=function(a,b){p(b)?this.b.set(a,M(b)):this.b.remove(a)};
Ve.prototype.get=function(a){var b;try{b=this.b.get(a)}catch(c){return}if(null!==b)try{return od(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Ve.prototype.remove=function(a){this.b.remove(a)};function We(a){this.b=a}
z(We,Ve);function Xe(a){this.data=a}
function Ye(a){return!p(a)||a instanceof Xe?a:new Xe(a)}
We.prototype.set=function(a,b){We.B.set.call(this,a,Ye(b))};
We.prototype.f=function(a){a=We.B.get.call(this,a);if(!p(a)||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
We.prototype.get=function(a){if(a=this.f(a)){if(a=a.data,!p(a))throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Ze(a){this.b=a}
z(Ze,We);function $e(a){var b=a.creation;a=a.expiration;return!!a&&a<y()||!!b&&b>y()}
Ze.prototype.set=function(a,b,c){if(b=Ye(b)){if(c){if(c<y()){Ze.prototype.remove.call(this,a);return}b.expiration=c}b.creation=y()}Ze.B.set.call(this,a,b)};
Ze.prototype.f=function(a,b){var c=Ze.B.f.call(this,a);if(c)if(!b&&$e(c))Ze.prototype.remove.call(this,a);else return c};function af(a){this.b=a}
z(af,Ze);function bf(a,b){var c=[];Fc(b,function(a){var b;try{b=af.prototype.f.call(this,a,!0)}catch(f){if("Storage: Invalid value was encountered"==f)return;throw f;}p(b)?$e(b)&&c.push(a):c.push(a)},a);
return c}
function cf(a,b){var c=bf(a,b);A(c,function(a){af.prototype.remove.call(this,a)},a)}
function df(){var a=ef;cf(a,a.b.ma(!0))}
;function O(a,b,c){var d=c&&0<c?c:0;c=d?y()+1E3*d:0;if((d=d?ef:ff)&&window.JSON){w(b)||(b=JSON.stringify(b,void 0));try{d.set(a,b,c)}catch(e){d.remove(a)}}}
function P(a){if(!ff&&!ef||!window.JSON)return null;var b;try{b=ff.get(a)}catch(c){}if(!w(b))try{b=ef.get(a)}catch(c){}if(!w(b))return null;try{b=JSON.parse(b,void 0)}catch(c){}return b}
function gf(a){ff&&ff.remove(a);ef&&ef.remove(a)}
var ef,hf=new Te;ef=hf.isAvailable()?new af(hf):null;var ff,jf=new Ue;ff=jf.isAvailable()?new af(jf):null;var kf=C("Firefox"),lf=Vc()||C("iPod"),mf=C("iPad"),nf=C("Android")&&!(ob()||C("Firefox")||C("Opera")||C("Silk")),of=ob(),pf=C("Safari")&&!(ob()||C("Coast")||C("Opera")||C("Edge")||C("Silk")||C("Android"))&&!(Vc()||C("iPad")||C("iPod"));function qf(){}
;var rf={log_event:"events",log_interaction:"interactions"},sf={},tf={},uf=0,vf=r("yt.logging.transport.logsQueue_")||{};q("yt.logging.transport.logsQueue_",vf,void 0);
function wf(){J(uf);if(!fb(vf)){for(var a in vf){var b=sf[a];if(!b){b=tf[a];if(!b)continue;b=new b;sf[a]=b}var c=b.b,c={client:{hl:c.ud,gl:c.td,clientName:c.sd,clientVersion:c.innertubeContextClientVersion}};H("DELEGATED_SESSION_ID")&&(c.user={onBehalfOfUser:H("DELEGATED_SESSION_ID")});c={context:c};c.requestTimeMs=Math.round(dc());c[rf[a]]=vf[a];xf(b,a,c);delete vf[a]}fb(vf)||yf()}}
function yf(){J(uf);uf=I(wf,H("LOGGING_BATCH_TIMEOUT",1E4))}
;var zf={};function Af(a){this.b=a||{cookie:""}}
var Bf=/\s*;\s*/;g=Af.prototype;g.isEnabled=function(){return navigator.cookieEnabled};
g.set=function(a,b,c,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');p(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";c=0>c?"":0==c?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(y()+1E3*c)).toUTCString();this.b.cookie=a+"="+b+e+d+c+f};
g.get=function(a,b){for(var c=a+"=",d=(this.b.cookie||"").split(Bf),e=0,f;f=d[e];e++){if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
g.remove=function(a,b,c){var d=p(this.get(a));this.set(a,"",0,b,c);return d};
g.na=function(){return Cf(this).keys};
g.T=function(){return Cf(this).values};
g.isEmpty=function(){return!this.b.cookie};
g.S=function(){return this.b.cookie?(this.b.cookie||"").split(Bf).length:0};
g.Ya=function(a){for(var b=Cf(this).values,c=0;c<b.length;c++)if(b[c]==a)return!0;return!1};
g.clear=function(){for(var a=Cf(this).keys,b=a.length-1;0<=b;b--)this.remove(a[b])};
function Cf(a){a=(a.b.cookie||"").split(Bf);for(var b=[],c=[],d,e,f=0;e=a[f];f++)d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));return{keys:b,values:c}}
var Df=new Af("undefined"==typeof document?null:document);Df.f=3950;function Ef(a,b,c){Df.set(""+a,b,c,"/","youtube.com")}
;function Ff(a,b,c){var d=H("EVENT_ID");d&&(b||(b={}),b.ei||(b.ei=d));if(b){var d=H("VALID_SESSION_TEMPDATA_DOMAINS",[]),e=yd(zd(3,window.location.href));e&&d.push(e);e=yd(zd(3,a));if(B(d,e)||!e&&0==a.lastIndexOf("/",0)){var f=a.match(xd),d=f[5],e=f[6],f=f[7],h="";d&&(h+=d);e&&(h+="?"+e);f&&(h+="#"+f);d=h;e=d.indexOf("#");if(d=0>e?d:d.substr(0,e))wd("enable_more_related_ve_logging")&&(b.itct||b.ved)&&((e=b.csn)||(e=H("client-screen-nonce",void 0))||(e=H("EVENT_ID",void 0)),b.csn=e),d="ST-"+Ga(d).toString(36),
e=b?Fd(b):"",Ef(d,e,5),b&&(b=b.itct||b.ved,d=r("yt.logging.screenreporter.storeParentElement"),b&&d&&d(new qf))}}if(c)return!1;(window.ytspf||{}).enabled?spf.navigate(a):(c=window.location,a=Hd(a,{})+"",a=a instanceof pb?a:tb(a),c.href=rb(a));return!0}
;function Gf(a){a=a||{};this.url=a.url||"";this.urlV9As2=a.url_v9as2||"";this.args=a.args||hb(Hf);this.assets=a.assets||{};this.attrs=a.attrs||hb(If);this.params=a.params||hb(Jf);this.minVersion=a.min_version||"8.0.0";this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
var Hf={enablejsapi:1},If={},Jf={allowscriptaccess:"always",allowfullscreen:"true",bgcolor:"#000000"};function Kf(a){a instanceof Gf||(a=new Gf(a));return a}
Gf.prototype.clone=function(){var a=new Gf,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==ca(c)?a[b]=hb(c):a[b]=c}return a};function Lf(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}
g=Lf.prototype;g.getHeight=function(){return this.bottom-this.top};
g.clone=function(){return new Lf(this.top,this.right,this.bottom,this.left)};
g.contains=function(a){return this&&a?a instanceof Lf?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.H>=this.left&&a.H<=this.right&&a.J>=this.top&&a.J<=this.bottom:!1};
g.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};
g.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
g.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};function Mf(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}
g=Mf.prototype;g.clone=function(){return new Mf(this.left,this.top,this.width,this.height)};
g.contains=function(a){return a instanceof ke?a.H>=this.left&&a.H<=this.left+this.width&&a.J>=this.top&&a.J<=this.top+this.height:this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height};
g.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
g.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
g.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function Nf(a,b){var c=qe(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""}
function Of(a,b){return Nf(a,b)||(a.currentStyle?a.currentStyle[b]:null)||a.style&&a.style[b]}
function Pf(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}L&&a.ownerDocument.body&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b}
function Qf(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a}
function Rf(a){var b=Sf;if("none"!=Of(a,"display"))return b(a);var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a}
function Sf(a){var b=a.offsetWidth,c=a.offsetHeight,d=bd&&!b&&!c;return p(b)&&!d||!a.getBoundingClientRect?new be(b,c):(a=Pf(a),new be(a.right-a.left,a.bottom-a.top))}
function Tf(a,b){if(/^\d+px?$/.test(b))return parseInt(b,10);var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b;var e=a.style.pixelLeft;a.style.left=c;a.runtimeStyle.left=d;return e}
function Uf(a,b){var c=a.currentStyle?a.currentStyle[b]:null;return c?Tf(a,c):0}
var Vf={thin:2,medium:4,thick:6};function Wf(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:null))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:null;return c in Vf?Vf[c]:Tf(a,c)}
;function Xf(){this.g=this.f=this.b=0;this.i="";var a=r("window.navigator.plugins"),b=r("window.navigator.mimeTypes"),a=a&&a["Shockwave Flash"],b=b&&b["application/x-shockwave-flash"],b=a&&b&&b.enabledPlugin&&a.description||"";if(a=b){var c=a.indexOf("Shockwave Flash");0<=c&&(a=a.substr(c+15));for(var c=a.split(" "),d="",a="",e=0,f=c.length;e<f;e++)if(d)if(a)break;else a=c[e];else d=c[e];d=d.split(".");c=parseInt(d[0],10)||0;d=parseInt(d[1],10)||0;e=0;if("r"==a.charAt(0)||"d"==a.charAt(0))e=parseInt(a.substr(1),
10)||0;a=[c,d,e]}else a=[0,0,0];this.i=b;b=a;this.b=b[0];this.f=b[1];this.g=b[2];if(0>=this.b){var h,k,m,n;if(ec)try{h=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(ga){h=null}else m=document.body,n=document.createElement("object"),n.setAttribute("type","application/x-shockwave-flash"),h=m.appendChild(n);if(h&&"GetVariable"in h)try{k=h.GetVariable("$version")}catch(ga){k=""}m&&n&&m.removeChild(n);(h=k||"")?(h=h.split(" ")[1].split(","),h=[parseInt(h[0],10)||0,parseInt(h[1],10)||0,parseInt(h[2],
10)||0]):h=[0,0,0];this.b=h[0];this.f=h[1];this.g=h[2]}}
ba(Xf);function Yf(a,b,c,d){b="string"==typeof b?b.split("."):[b,c,d];b[0]=parseInt(b[0],10)||0;b[1]=parseInt(b[1],10)||0;b[2]=parseInt(b[2],10)||0;return a.b>b[0]||a.b==b[0]&&a.f>b[1]||a.b==b[0]&&a.f==b[1]&&a.g>=b[2]}
;function Zf(a){if(window.spf){var b=a.match($f);spf.style.load(a,b?b[1]:"",void 0)}else ag(a)}
function ag(a){var b=bg(a),c=document.getElementById(b),d=c&&D(c,"loaded");d||c&&!d||(c=cg(a,b,function(){D(c,"loaded")||(Db(c,"loaded","true"),K(b),I(na(pc,b),0))}))}
function cg(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=me(a);Cb(d,a);(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function bg(a){var b=document.createElement("a");Bb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+Ga(a)}
var $f=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;var dg;var eg=lb,eg=eg.toLowerCase();if(-1!=eg.indexOf("android")){var fg=eg.match(/android\D*(\d\.\d)[^\;|\)]*[\;\)]/);if(fg)dg=Number(fg[1]);else{var gg={cupcake:1.5,donut:1.6,eclair:2,froyo:2.2,gingerbread:2.3,honeycomb:3,"ice cream sandwich":4,jellybean:4.1},hg=eg.match("("+cb(gg).join("|")+")");dg=hg?gg[hg[0]]:0}}else dg=void 0;var ig=['video/mp4; codecs="avc1.42001E, mp4a.40.2"','video/webm; codecs="vp8.0, vorbis"'],jg=['audio/mp4; codecs="mp4a.40.2"'];function kg(a){E.call(this);this.b=[];this.f=a||this}
z(kg,E);function lg(a,b,c,d){d=bc(x(d,a.f));b.addEventListener(c,d);a.b.push({target:b,name:c,Db:d})}
kg.prototype.zb=function(a){for(var b=0;b<this.b.length;b++)if(this.b[b]==a){this.b.splice(b,1);a.target.removeEventListener(a.name,a.Db);break}};
function mg(a){for(;a.b.length;){var b=a.b.pop();b.target.removeEventListener(b.name,b.Db)}}
kg.prototype.w=function(){mg(this);kg.B.w.call(this)};function ng(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0}
;function og(a,b){this.b=0;this.l=void 0;this.i=this.f=this.g=null;this.j=this.o=!1;if(a!=t)try{var c=this;a.call(b,function(a){pg(c,2,a)},function(a){pg(c,3,a)})}catch(d){pg(this,3,d)}}
function qg(){this.next=this.context=this.f=this.g=this.b=null;this.i=!1}
qg.prototype.reset=function(){this.context=this.f=this.g=this.b=null;this.i=!1};
var rg=new Kb(function(){return new qg},function(a){a.reset()},100);
function sg(a,b,c){var d=rg.get();d.g=a;d.f=b;d.context=c;return d}
function tg(a){if(a instanceof og)return a;var b=new og(t);pg(b,2,a);return b}
function ug(a){return new og(function(b,c){c(a)})}
og.prototype.then=function(a,b,c){return vg(this,fa(a)?a:null,fa(b)?b:null,c)};
ng(og);og.prototype.cancel=function(a){0==this.b&&Pb(function(){var b=new wg(a);xg(this,b)},this)};
function xg(a,b){if(0==a.b)if(a.g){var c=a.g;if(c.f){for(var d=0,e=null,f=null,h=c.f;h&&(h.i||(d++,h.b==a&&(e=h),!(e&&1<d)));h=h.next)e||(f=h);e&&(0==c.b&&1==d?xg(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):yg(c),zg(c,e,3,b)))}a.g=null}else pg(a,3,b)}
function Ag(a,b){a.f||2!=a.b&&3!=a.b||Bg(a);a.i?a.i.next=b:a.f=b;a.i=b}
function vg(a,b,c,d){var e=sg(null,null,null);e.b=new og(function(a,h){e.g=b?function(c){try{var e=b.call(d,c);a(e)}catch(n){h(n)}}:a;
e.f=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof wg?h(b):a(e)}catch(n){h(n)}}:h});
e.b.g=a;Ag(a,e);return e.b}
og.prototype.R=function(a){this.b=0;pg(this,2,a)};
og.prototype.F=function(a){this.b=0;pg(this,3,a)};
function pg(a,b,c){if(0==a.b){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.b=1;var d;a:{var e=c,f=a.R,h=a.F;if(e instanceof og)Ag(e,sg(f||t,h||null,a)),d=!0;else{var k;if(e)try{k=!!e.$goog_Thenable}catch(n){k=!1}else k=!1;if(k)e.then(f,h,a),d=!0;else{if(ha(e))try{var m=e.then;if(fa(m)){Cg(e,m,f,h,a);d=!0;break a}}catch(n){h.call(a,n);d=!0;break a}d=!1}}}d||(a.l=c,a.b=b,a.g=null,Bg(a),3!=b||c instanceof wg||Dg(a,c))}}
function Cg(a,b,c,d,e){function f(a){k||(k=!0,d.call(e,a))}
function h(a){k||(k=!0,c.call(e,a))}
var k=!1;try{b.call(a,h,f)}catch(m){f(m)}}
function Bg(a){a.o||(a.o=!0,Pb(a.A,a))}
function yg(a){var b=null;a.f&&(b=a.f,a.f=b.next,b.next=null);a.f||(a.i=null);return b}
og.prototype.A=function(){for(var a;a=yg(this);)zg(this,a,this.b,this.l);this.o=!1};
function zg(a,b,c,d){if(3==c&&b.f&&!b.i)for(;a&&a.j;a=a.g)a.j=!1;if(b.b)b.b.g=null,Eg(b,c,d);else try{b.i?b.g.call(b.context):Eg(b,c,d)}catch(e){Fg.call(null,e)}Lb(rg,b)}
function Eg(a,b,c){2==b?a.g.call(a.context,c):a.f&&a.f.call(a.context,c)}
function Dg(a,b){a.j=!0;Pb(function(){a.j&&Fg.call(null,b)})}
var Fg=Hb;function wg(a){oa.call(this,a)}
z(wg,oa);wg.prototype.name="cancel";function Gg(){this.b={apiaryHost:H("APIARY_HOST",void 0),$c:H("APIARY_HOST_FIRSTPARTY",void 0),gapiHintOverride:H("GAPI_HINT_OVERRIDE"),gapiHintParams:H("GAPI_HINT_PARAMS",void 0),innertubeApiKey:H("INNERTUBE_API_KEY",void 0),innertubeApiVersion:H("INNERTUBE_API_VERSION",void 0),sd:H("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:H("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),ud:H("INNERTUBE_CONTEXT_HL",void 0),td:H("INNERTUBE_CONTEXT_GL",void 0),We:H("XHR_APIARY_HOST",void 0)};
Hg||(Hg=Ig(this.b))}
var Hg=null;function Ig(a){return(new og(function(b){qc(H("GAPI_LOADER_URL",void 0),function(){try{r("yt.gapi.load")("client",{gapiHintOverride:a.gapiHintOverride,_c:{jsl:{h:a.gapiHintParams}},callback:b})}catch(c){cc(c)}})})).then(function(){})}
Gg.prototype.f=function(){var a=r("gapi.config.update");a("googleapis.config/auth/useFirstPartyAuth",!0);var b=this.b.apiaryHost;/^[\s\xa0]*$/.test(null==b?"":String(b))||a("googleapis.config/root",(-1==b.indexOf("://")?"//":"")+b);b=this.b.$c;/^[\s\xa0]*$/.test(null==b?"":String(b))||a("googleapis.config/root-1p",(-1==b.indexOf("://")?"//":"")+b);a("googleapis.config/sessionIndex",H("SESSION_INDEX"));r("gapi.client.setApiKey")(this.b.innertubeApiKey)};
function xf(a,b,c){var d={},e,f=!1;0<d.timeout&&(e=I(function(){f||(f=!0,d.Ga&&d.Ga())},d.timeout));
Jg(a,b,c,function(a){if(!f)if(f=!0,e&&J(e),a)d.aa&&d.aa(a);else if(d.onError)d.onError()})}
function Jg(a,b,c,d){var e={path:"/youtubei/"+a.b.innertubeApiVersion+"/"+b,headers:{"X-Goog-Visitor-Id":H("VISITOR_DATA")},method:"POST",body:M(c)},f=x(a.f,a);Hg.then(function(){f();r("gapi.client.request")(e).execute(d||t)})}
;function Kg(a,b,c){var d={};d.eventTimeMs=Math.round(c||dc());d[a]=b;vf.log_event=vf.log_event||[];a=vf.log_event;a.push(d);tf.log_event=Gg;20<=a.length?wf():yf()}
;function Lg(a,b){this.f=this.A=this.i="";this.l=null;this.j=this.b="";this.o=!1;var c;a instanceof Lg?(this.o=p(b)?b:a.o,Mg(this,a.i),this.A=a.A,Ng(this,a.f),Og(this,a.l),this.b=a.b,Pg(this,a.g.clone()),this.j=a.j):a&&(c=String(a).match(xd))?(this.o=!!b,Mg(this,c[1]||"",!0),this.A=Qg(c[2]||""),Ng(this,c[3]||"",!0),Og(this,c[4]),this.b=Qg(c[5]||"",!0),Pg(this,c[6]||"",!0),this.j=Qg(c[7]||"")):(this.o=!!b,this.g=new Rg(null,0,this.o))}
Lg.prototype.toString=function(){var a=[],b=this.i;b&&a.push(Sg(b,Tg,!0),":");var c=this.f;if(c||"file"==b)a.push("//"),(b=this.A)&&a.push(Sg(b,Tg,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.l,null!=c&&a.push(":",String(c));if(c=this.b)this.f&&"/"!=c.charAt(0)&&a.push("/"),a.push(Sg(c,"/"==c.charAt(0)?Ug:Vg,!0));(c=this.g.toString())&&a.push("?",c);(c=this.j)&&a.push("#",Sg(c,Wg));return a.join("")};
Lg.prototype.resolve=function(a){var b=this.clone(),c=!!a.i;c?Mg(b,a.i):c=!!a.A;c?b.A=a.A:c=!!a.f;c?Ng(b,a.f):c=null!=a.l;var d=a.b;if(c)Og(b,a.l);else if(c=!!a.b){if("/"!=d.charAt(0))if(this.f&&!this.b)d="/"+d;else{var e=b.b.lastIndexOf("/");-1!=e&&(d=b.b.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(-1!=e.indexOf("./")||-1!=e.indexOf("/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],h=0;h<e.length;){var k=e[h++];"."==k?d&&h==e.length&&f.push(""):".."==k?((1<f.length||1==f.length&&
""!=f[0])&&f.pop(),d&&h==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?b.b=d:c=""!==a.g.toString();c?Pg(b,Qg(a.g.toString())):c=!!a.j;c&&(b.j=a.j);return b};
Lg.prototype.clone=function(){return new Lg(this)};
function Mg(a,b,c){a.i=c?Qg(b,!0):b;a.i&&(a.i=a.i.replace(/:$/,""))}
function Ng(a,b,c){a.f=c?Qg(b,!0):b}
function Og(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.l=b}else a.l=null}
function Pg(a,b,c){b instanceof Rg?(a.g=b,Xg(a.g,a.o)):(c||(b=Sg(b,Yg)),a.g=new Rg(b,0,a.o))}
function Q(a,b,c){a.g.set(b,c)}
function Zg(a,b,c){v(c)||(c=[String(c)]);$g(a.g,b,c)}
function ah(a){Q(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^y()).toString(36));return a}
function bh(a){return a instanceof Lg?a.clone():new Lg(a,void 0)}
function ch(a,b,c,d){var e=new Lg(null,void 0);a&&Mg(e,a);b&&Ng(e,b);c&&Og(e,c);d&&(e.b=d);return e}
function Qg(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}
function Sg(a,b,c){return w(a)?(a=encodeURI(a).replace(b,dh),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}
function dh(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}
var Tg=/[#\/\?@]/g,Vg=/[\#\?:]/g,Ug=/[\#\?]/g,Yg=/[\#\?@]/g,Wg=/#/g;function Rg(a,b,c){this.f=this.b=null;this.g=a||null;this.i=!!c}
function eh(a){a.b||(a.b=new Hc,a.f=0,a.g&&Ad(a.g,function(b,c){fh(a,ra(b),c)}))}
g=Rg.prototype;g.S=function(){eh(this);return this.f};
function fh(a,b,c){eh(a);a.g=null;b=gh(a,b);var d=a.b.get(b);d||a.b.set(b,d=[]);d.push(c);a.f=a.f+1}
g.remove=function(a){eh(this);a=gh(this,a);return Jc(this.b.f,a)?(this.g=null,this.f=this.f-this.b.get(a).length,this.b.remove(a)):!1};
g.clear=function(){this.b=this.g=null;this.f=0};
g.isEmpty=function(){eh(this);return 0==this.f};
function hh(a,b){eh(a);b=gh(a,b);return Jc(a.b.f,b)}
g.Ya=function(a){var b=this.T();return B(b,a)};
g.na=function(){eh(this);for(var a=this.b.T(),b=this.b.na(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
g.T=function(a){eh(this);var b=[];if(w(a))hh(this,a)&&(b=Ra(b,this.b.get(gh(this,a))));else{a=this.b.T();for(var c=0;c<a.length;c++)b=Ra(b,a[c])}return b};
g.set=function(a,b){eh(this);this.g=null;a=gh(this,a);hh(this,a)&&(this.f=this.f-this.b.get(a).length);this.b.set(a,[b]);this.f=this.f+1;return this};
g.get=function(a,b){var c=a?this.T(a):[];return 0<c.length?String(c[0]):b};
function $g(a,b,c){a.remove(b);0<c.length&&(a.g=null,a.b.set(gh(a,b),Sa(c)),a.f=a.f+c.length)}
g.toString=function(){if(this.g)return this.g;if(!this.b)return"";for(var a=[],b=this.b.na(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.T(d),f=0;f<d.length;f++){var h=e;""!==d[f]&&(h+="="+encodeURIComponent(String(d[f])));a.push(h)}return this.g=a.join("&")};
g.clone=function(){var a=new Rg;a.g=this.g;this.b&&(a.b=this.b.clone(),a.f=this.f);return a};
function gh(a,b){var c=String(b);a.i&&(c=c.toLowerCase());return c}
function Xg(a,b){b&&!a.i&&(eh(a),a.g=null,a.b.forEach(function(a,b){var e=b.toLowerCase();b!=e&&(this.remove(b),$g(this,e,a))},a));
a.i=b}
g.extend=function(a){for(var b=0;b<arguments.length;b++)Oc(arguments[b],function(a,b){fh(this,b,a)},this)};var ih="corp.google.com googleplex.com youtube.com youtube-nocookie.com youtubeeducation.com borg.google.com prod.google.com sandbox.google.com books.googleusercontent.com docs.google.com drive.google.com mail.google.com photos.google.com plus.google.com lh2.google.com picasaweb.google.com play.google.com googlevideo.com talkgadget.google.com survey.g.doubleclick.net youtube.googleapis.com vevo.com".split(" "),jh="";
function kh(a){return a&&a==jh?!0:(new RegExp("^(https?:)?//([a-z0-9-]{1,63}\\.)*("+ih.join("|").replace(/\./g,".")+")(:[0-9]+)?([/?#]|$)","i")).test(a)?(jh=a,!0):!1}
;var lh={},mh=0;function nh(a){var b=new Image,c=""+mh++;lh[c]=b;b.onload=b.onerror=function(){delete lh[c]};
b.src=a}
;function R(a,b){this.version=a;this.args=b}
function oh(a){if(!a.xa){var b={};a.call(b);a.xa=b.version}return a.xa}
function ph(a,b){function c(){a.apply(this,b.args)}
if(!b.args||!b.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");var d;try{d=oh(a)}catch(e){}if(!d||b.version!=d)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");c.prototype=a.prototype;try{return new c}catch(e){throw e.message="yt.pubsub2.Data.deserialize(): "+e.message,e;}}
function S(a,b){this.topic=a;this.b=b}
S.prototype.toString=function(){return this.topic};var qh=r("yt.pubsub2.instance_")||new G;G.prototype.subscribe=G.prototype.subscribe;G.prototype.unsubscribeByKey=G.prototype.ka;G.prototype.publish=G.prototype.u;G.prototype.clear=G.prototype.clear;q("yt.pubsub2.instance_",qh,void 0);var rh=r("yt.pubsub2.subscribedKeys_")||{};q("yt.pubsub2.subscribedKeys_",rh,void 0);var sh=r("yt.pubsub2.topicToKeys_")||{};q("yt.pubsub2.topicToKeys_",sh,void 0);var th=r("yt.pubsub2.isAsync_")||{};q("yt.pubsub2.isAsync_",th,void 0);
q("yt.pubsub2.skipSubKey_",null,void 0);function T(a,b){var c=uh();c&&c.publish.call(c,a.toString(),a,b)}
function vh(a,b,c){var d=uh();if(!d)return 0;var e=d.subscribe(a.toString(),function(d,h){if(!window.yt.pubsub2.skipSubKey_||window.yt.pubsub2.skipSubKey_!=e){var k=function(){if(rh[e])try{if(h&&a instanceof S&&a!=d)try{h=ph(a.b,h)}catch(k){throw k.message="yt.pubsub2 cross-binary conversion error for "+a.toString()+": "+k.message,k;}b.call(c||window,h)}catch(k){cc(k)}};
th[a.toString()]?r("yt.scheduler.instance")?Xd(k,void 0):I(k,0):k()}});
rh[e]=!0;sh[a.toString()]||(sh[a.toString()]=[]);sh[a.toString()].push(e);return e}
function wh(a){var b=uh();b&&(ea(a)&&(a=[a]),A(a,function(a){b.unsubscribeByKey(a);delete rh[a]}))}
function uh(){return r("yt.pubsub2.instance_")}
;var xh=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};function yh(a){R.call(this,1,arguments)}
z(yh,R);var zh=new S("timing-sent",yh);var Ah={vc:!0},Bh=/^mark_/i,Ch={ad_at:"adType",cpn:"clientPlaybackNonce",csn:"clientScreenNonce",yt_lt:"loadType",yt_ad:"isMonetized",yt_ad_pr:"prerollAllowed",yt_red:"isRedSubscriber",yt_vis:"isVisible"},Dh=["isMonetized","prerollAllowed","isRedSubscriber","isVisible"],Eh=x(xh.clearResourceTimings||xh.webkitClearResourceTimings||xh.mozClearResourceTimings||xh.msClearResourceTimings||xh.oClearResourceTimings||t,xh);
function Fh(a){if("_"!=a[0]){var b=a;xh.mark&&(Bh.test(b)||(b="mark_"+b),xh.mark(b))}var b=Gh(),c=dc();b[a]&&(b["_"+a]=b["_"+a]||[b[a]],b["_"+a].push(c));b[a]=c;Hh()["tick_"+a]=void 0;wd("csi_on_gel")?(b=Ih(),"_start"==a?Kg("latencyActionBaselined",{clientActionNonce:b},void 0):Kg("latencyActionTicked",{tickName:a,clientActionNonce:b},void 0),a=!0):a=!1;a||(a=!!r("yt.timing.pingSent_")&&!!wd("navigation_only_csi_reset"));if(!a&&(b=H("TIMING_ACTION",void 0),a=Gh(),r("yt.timing.ready_")&&b&&a._start&&
Jh())){b=!0;c=H("TIMING_WAIT",[]);if(c.length)for(var d=0,e=c.length;d<e;++d)if(!(c[d]in a)){b=!1;break}b&&Kh()}}
function Lh(){var a=Mh().info.yt_lt="hot_bg";Hh().info_yt_lt=a;if(wd("csi_on_gel"))if("yt_lt"in Ch){var b={},c=Ch.yt_lt;B(Dh,c)&&(a=!!a);b[c]=a;a=Ih();b.clientActionNonce=a;Kg("latencyActionInfo",b)}else cc(Error("Unknown label yt_lt logged with GEL CSI."))}
function Jh(){var a=Gh();if(a.aft)return a.aft;for(var b=H("TIMING_AFT_KEYS",["ol"]),c=b.length,d=0;d<c;d++){var e=a[b[d]];if(e)return e}return NaN}
function Kh(){var a=Gh(),b=Mh().info,c=a._start,d;for(d in a)if(0==d.lastIndexOf("_",0)&&v(a[d])){var e=d.slice(1);if(e in Ah){var f=Ja(a[d],function(a){return Math.round(a-c)});
b["all_"+e]=f.join()}delete a[d]}e=!!b.ap;if(f=r("yt.timing.reportbuilder_")){if(f=f(a,b,void 0))Nh(f,e),Oh(),Eh(),Ph(!1,void 0)}else{var h=H("CSI_SERVICE_NAME","youtube"),f={v:2,s:h,action:H("TIMING_ACTION",void 0)},k=b.srt;delete b.srt;void 0===a.srt&&(k||0===k||(k=xh.timing||{},k=Math.max(0,k.responseStart-k.navigationStart),isNaN(k)&&b.pt&&(k=b.pt)),k||0===k)&&(b.srt=Math.round(k));if(b.h5jse){var m=window.location.protocol+r("ytplayer.config.assets.js");(m=xh.getEntriesByName?xh.getEntriesByName(m)[0]:
null)?b.h5jse=Math.round(b.h5jse-m.responseEnd):delete b.h5jse}a.aft=Jh();Qh()&&"youtube"==h&&(Lh(),h=a.vc,m=a.pbs,delete a.aft,b.aft=Math.round(m-h));for(var n in b)"_"!=n.charAt(0)&&(f[n]=b[n]);a.ps=dc();b={};n=[];for(d in a)"_"!=d.charAt(0)&&(h=Math.round(a[d]-c),b[d]=h,n.push(d+"."+h));f.rt=n.join(",");(a=r("ytdebug.logTiming"))&&a(f,b);wd("navigation_only_csi_reset")||(Oh(),Eh(),Ph(!1,void 0));Nh(f,e,void 0);T(zh,new yh(b.aft+(k||0)))}}
function Nh(a,b,c){if(wd("debug_csi_data")){var d=r("yt.timing.csiData");d||(d=[],q("yt.timing.csiData",d,void 0));d.push({page:location.href,time:new Date,args:a})}var d="",e;for(e in a)d+="&"+e+"="+a[e];a="/csi_204?"+d.substring(1);if(window.navigator&&window.navigator.sendBeacon&&b)try{window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")||a&&nh(a)}catch(f){a&&nh(a)}else a&&nh(a);Ph(!0,c)}
function Ih(){var a=Mh().nonce;if(!a){var b;a:{if(window.crypto&&window.crypto.getRandomValues)try{var c=Array(16),d=new Uint8Array(16);window.crypto.getRandomValues(d);for(a=0;a<c.length;a++)c[a]=d[a];b=c;break a}catch(e){}b=Array(16);for(c=0;16>c;c++){d=y();for(a=0;a<d%23;a++)b[c]=Math.random();b[c]=Math.floor(256*Math.random())}if(je)for(c=1,d=0;d<je.length;d++)b[c%16]=b[c%16]^b[(c-1)%16]/4^je.charCodeAt(d),c++}c=[];for(d=0;d<b.length;d++)c.push("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".charAt(b[d]&
63));a=c.join("");Mh().nonce=a}return a}
function Gh(){return Mh().tick}
function Hh(){var a=Mh();"gel"in a||(a.gel={});return a.gel}
function Mh(){return r("ytcsi.data_")||Oh()}
function Oh(){var a={tick:{},info:{}};q("ytcsi.data_",a,void 0);return a}
function Ph(a,b){q("yt.timing."+(b||"")+"pingSent_",a,void 0)}
function Qh(){var a=Gh(),b=a.pbr,c=a.vc,a=a.pbs;return b&&c&&a&&b<c&&c<a&&1==Mh().info.yt_pvis}
;var Rh={"api.invalidparam":2,auth:150,"drm.auth":150,heartbeat:150,"html5.unsupportedads":5,"fmt.noneavailable":5,"fmt.decode":5,"fmt.unplayable":5,"html5.missingapi":5,"html5.unsupportedlive":5,"drm.unavailable":5};function Sh(a,b){E.call(this);this.o=this.j=a;this.Y=b;this.A=!1;this.f={};this.Ja=this.X=null;this.ca=new G;Vb(this,na(F,this.ca));this.i={};this.F=this.Ka=this.g=this.Wa=this.b=null;this.la=!1;this.G=this.l=this.M=this.O=null;this.La={};this.Yc=["onReady"];this.oa=new kg(this);Vb(this,na(F,this.oa));this.Cb=null;this.$b=NaN;this.sa={};Th(this);this.pa("onDetailedError",x(this.Id,this));this.pa("onTabOrderChange",x(this.cd,this));this.pa("onTabAnnounce",x(this.ac,this));this.pa("WATCH_LATER_VIDEO_ADDED",
x(this.Jd,this));this.pa("WATCH_LATER_VIDEO_REMOVED",x(this.Kd,this));kf||(this.pa("onMouseWheelCapture",x(this.Fd,this)),this.pa("onMouseWheelRelease",x(this.Gd,this)));this.pa("onAdAnnounce",x(this.ac,this));this.I=new kg(this);Vb(this,na(F,this.I));this.Va=!1;this.Ua=null}
z(Sh,E);var Uh=["drm.unavailable","fmt.noneavailable","html5.missingapi","html5.unsupportedads","html5.unsupportedlive"];g=Sh.prototype;g.Wb=function(a,b){this.C()||(Vh(this,a),Wh(this,b),this.A&&Xh(this))};
function Vh(a,b){a.Wa=b;a.b=b.clone();a.g=a.b.attrs.id||a.g;"video-player"==a.g&&(a.g=a.Y,a.b.attrs.id=a.Y);a.o.id==a.g&&(a.g+="-player",a.b.attrs.id=a.g);a.b.args.enablejsapi="1";a.b.args.playerapiid=a.Y;a.Ka||(a.Ka=Yh(a,a.b.args.jsapicallback||"onYouTubePlayerReady"));a.b.args.jsapicallback=null;var c=a.b.attrs.width;c&&(a.o.style.width=Qf(Number(c)||c,!0));if(c=a.b.attrs.height)a.o.style.height=Qf(Number(c)||c,!0)}
g.kd=function(){return this.Wa};
function Xh(a){a.b.loaded||(a.b.loaded=!0,"0"!=a.b.args.autoplay?a.f.loadVideoByPlayerVars(a.b.args):a.f.cueVideoByPlayerVars(a.b.args))}
function Zh(a){if(!p(a.b.disable.flash)){var b=a.b.disable,c;c=Yf(Xf.getInstance(),a.b.minVersion);b.flash=!c}return!a.b.disable.flash}
function $h(a,b){if((!b||(5!=(Rh[b.errorCode]||5)?0:-1!=Uh.indexOf(b.errorCode)))&&Zh(a)){var c=ai(a);c&&c.stopVideo&&c.stopVideo();var d=a.b;c&&c.getUpdatedConfigurationData&&(c=c.getUpdatedConfigurationData(),d=Kf(c));d.args.autoplay=1;d.args.html5_unavailable="1";Vh(a,d);Wh(a,"flash")}}
function Wh(a,b){if(!a.C()){if(!b){var c;if(!(c=!a.b.html5&&Zh(a))){if(!p(a.b.disable.html5)){var d;c=!0;void 0!=a.b.args.deviceHasDisplay&&(c=a.b.args.deviceHasDisplay);if(2.2==dg)d=!0;else{a:{var e=c;c=r("yt.player.utils.videoElement_");c||(c=document.createElement("video"),q("yt.player.utils.videoElement_",c,void 0));try{if(c.canPlayType)for(var e=e?ig:jg,f=0;f<e.length;f++)if(c.canPlayType(e[f])){d=null;break a}d="fmt.noneavailable"}catch(h){d="html5.missingapi"}}d=!d}d&&(d=bi(a)||a.b.assets.js);
a.b.disable.html5=!d;d||(a.b.args.html5_unavailable="1")}c=!!a.b.disable.html5}b=c?Zh(a)?"flash":"unsupported":"html5"}("flash"==b?a.se:a.te).call(a)}}
function bi(a){var b=!0,c=ai(a);c&&a.b&&(a=a.b,b=D(c,"version")==a.assets.js);return b&&!!r("yt.player.Application.create")}
g.te=function(){if(!this.la){var a=bi(this);a&&"html5"==ci(this)?(this.F="html5",this.A||this.Pa()):(di(this),this.F="html5",a&&this.M?(this.j.appendChild(this.M),this.Pa()):(this.b.loaded=!0,this.O=x(function(){var a=this.j,c=this.b.clone();r("yt.player.Application.create")(a,c);this.Pa()},this),this.la=!0,a?this.O():(qc(this.b.assets.js,this.O),Zf(this.b.assets.css))))}};
g.se=function(){var a=this.b.clone();if(!this.l){var b=ai(this);b&&(this.l=document.createElement("span"),this.l.tabIndex=0,lg(this.oa,this.l,"focus",this.nc),this.G=document.createElement("span"),this.G.tabIndex=0,lg(this.oa,this.G,"focus",this.nc),b.parentNode&&b.parentNode.insertBefore(this.l,b),b.parentNode&&b.parentNode.insertBefore(this.G,b.nextSibling))}a.attrs.width=a.attrs.width||"100%";a.attrs.height=a.attrs.height||"100%";if("flash"==ci(this))this.F="flash",this.A||this.Pa();else{di(this);
this.F="flash";this.b.loaded=!0;var b=Xf.getInstance(),c=(-1<b.i.indexOf("Gnash")&&-1==b.i.indexOf("AVM2")||9==b.b&&1==b.f||9==b.b&&0==b.f&&1==b.g?0:9<=b.b)||-1<navigator.userAgent.indexOf("Sony/COM2")&&!Yf(b,9,1,58)?a.url:a.urlV9As2;window!=window.top&&document.referrer&&(a.args.framer=document.referrer.substring(0,128));b=this.j;if(c){var b=w(b)?re(b):b,d=hb(a.attrs);d.tabindex=0;var e=hb(a.params);e.flashvars=Fd(a.args);if(ec){d.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";e.movie=c;var a=
document.createElement("object"),f;for(f in d)a.setAttribute(f,d[f]);for(f in e)d=document.createElement("param"),d.setAttribute("name",f),d.setAttribute("value",e[f]),a.appendChild(d)}else{d.type="application/x-shockwave-flash";d.src=c;a=document.createElement("embed");a.setAttribute("name",d.id);for(f in d)a.setAttribute(f,d[f]);for(f in e)a.setAttribute(f,e[f])}f=document.createElement("div");f.appendChild(a);b.innerHTML=f.innerHTML}this.Pa()}};
g.nc=function(){ai(this).focus()};
function ai(a){var b=re(a.g);!b&&a.o&&a.o.querySelector&&(b=a.o.querySelector("#"+a.g));return b}
g.Pa=function(){if(!this.C()){var a=ai(this),b=!1;try{a&&a.getApiInterface&&a.getApiInterface()&&(b=!0)}catch(f){}if(b)if(this.la=!1,a.isNotServable&&a.isNotServable(this.b.args.video_id))$h(this);else{Th(this);this.A=!0;a=ai(this);a.addEventListener&&(this.X=ei(this,a,"addEventListener"));a.removeEventListener&&(this.Ja=ei(this,a,"removeEventListener"));for(var b=a.getApiInterface(),b=b.concat(a.getInternalApiInterface()),c=0;c<b.length;c++){var d=b[c];this.f[d]||(this.f[d]=ei(this,a,d))}for(var e in this.i)this.X(e,
this.i[e]);Xh(this);this.Ka&&this.Ka(this.f);this.ca.u("onReady",this.f)}else this.$b=I(x(this.Pa,this),50)}};
function ei(a,b,c){var d=b[c];return function(){try{return a.Cb=null,d.apply(b,arguments)}catch(e){"Bad NPObject as private data!"!=e.message&&"sendAbandonmentPing"!=c&&(e.message+=" ("+c+")",a.Cb=e,cc(e,"WARNING"))}}}
function Th(a){a.A=!1;if(a.Ja)for(var b in a.i)a.Ja(b,a.i[b]);for(var c in a.sa)J(parseInt(c,10));a.sa={};a.X=null;a.Ja=null;for(var d in a.f)a.f[d]=null;a.f.addEventListener=x(a.pa,a);a.f.removeEventListener=x(a.fe,a);a.f.destroy=x(a.dispose,a);a.f.getLastError=x(a.ld,a);a.f.getPlayerType=x(a.md,a);a.f.getCurrentVideoConfig=x(a.kd,a);a.f.loadNewVideoConfig=x(a.Wb,a);a.f.isReady=x(a.Ee,a)}
g.Ee=function(){return this.A};
g.pa=function(a,b){if(!this.C()){var c=Yh(this,b);if(c){if(!B(this.Yc,a)&&!this.i[a]){var d=fi(this,a);this.X&&this.X(a,d)}this.ca.subscribe(a,c);"onReady"==a&&this.A&&I(na(c,this.f),0)}}};
g.fe=function(a,b){if(!this.C()){var c=Yh(this,b);c&&this.ca.unsubscribe(a,c)}};
function Yh(a,b){var c=b;if("string"==typeof b){if(a.La[b])return a.La[b];c=function(){var a=r(b);a&&a.apply(l,arguments)};
a.La[b]=c}return c?c:null}
function fi(a,b){var c="ytPlayer"+b+a.Y;a.i[b]=c;l[c]=function(c){var e=I(function(){if(!a.C()){a.ca.u(b,c);var f=a.sa,h=String(e);h in f&&delete f[h]}},0);
gb(a.sa,String(e))};
return c}
g.cd=function(a){a=a?ye:xe;for(var b=a(document.activeElement);b&&(1!=b.nodeType||b==this.l||b==this.G||(b.focus(),b!=document.activeElement));)b=a(b)};
g.ac=function(a){K("a11y-announce",a)};
g.Id=function(a){$h(this,a)};
g.Jd=function(a){K("WATCH_LATER_VIDEO_ADDED",a)};
g.Kd=function(a){K("WATCH_LATER_VIDEO_REMOVED",a)};
g.Fd=function(){this.Va||(of?(this.Ua=ue(document),lg(this.I,window,"scroll",this.$d),lg(this.I,this.j,"touchmove",this.Ud)):(lg(this.I,this.j,"mousewheel",this.qc),lg(this.I,this.j,"wheel",this.qc)),this.Va=!0)};
g.Gd=function(){mg(this.I);this.Va=!1};
g.qc=function(a){a=a||window.event;a.returnValue=!1;a.preventDefault&&a.preventDefault()};
g.$d=function(){window.scrollTo(this.Ua.H,this.Ua.J)};
g.Ud=function(a){a.preventDefault()};
g.md=function(){return this.F||ci(this)};
g.ld=function(){return this.Cb};
function ci(a){return(a=ai(a))?"div"==a.tagName.toLowerCase()?"html5":"flash":null}
function di(a){Fh("dcp");a.cancel();Th(a);a.F=null;a.b&&(a.b.loaded=!1);var b=ai(a);"html5"==ci(a)?a.M=b:b&&b.destroy&&b.destroy();we(a.j);mg(a.oa);a.l=null;a.G=null}
g.cancel=function(){this.O&&xc(this.b.assets.js,this.O);J(this.$b);this.la=!1};
g.w=function(){di(this);if(this.M&&this.b)try{this.M.destroy()}catch(b){cc(b)}this.La=null;for(var a in this.i)l[this.i[a]]=null;this.Wa=this.b=this.f=null;delete this.j;delete this.o;Sh.B.w.call(this)};var gi={},hi="player_uid_"+(1E9*Math.random()>>>0);function ii(a,b){a=w(a)?re(a):a;b=Kf(b);var c=hi+"_"+ia(a),d=gi[c];if(d)return d.Wb(b),d.f;d=new Sh(a,c);gi[c]=d;K("player-added",d.f);Vb(d,na(ji,d));I(function(){d.Wb(b)},0);
return d.f}
function ji(a){gi[a.Y]=null}
function ki(a){a=re(a);if(!a)return null;var b=hi+"_"+ia(a),c=gi[b];c||(c=new Sh(a,b),gi[b]=c);return c.f}
;var li=r("yt.abuse.botguardInitialized")||Ac;q("yt.abuse.botguardInitialized",li,void 0);var mi=r("yt.abuse.invokeBotguard")||Bc;q("yt.abuse.invokeBotguard",mi,void 0);var ni=r("yt.abuse.dclkstatus.checkDclkStatus")||ae;q("yt.abuse.dclkstatus.checkDclkStatus",ni,void 0);var oi=r("yt.player.exports.navigate")||Ff;q("yt.player.exports.navigate",oi,void 0);var pi=r("yt.player.embed")||ii;q("yt.player.embed",pi,void 0);var qi=r("yt.player.getPlayerByElement")||ki;q("yt.player.getPlayerByElement",qi,void 0);
var ri=r("yt.util.activity.init")||Ne;q("yt.util.activity.init",ri,void 0);var si=r("yt.util.activity.getTimeSinceActive")||Pe;q("yt.util.activity.getTimeSinceActive",si,void 0);var ti=r("yt.util.activity.setTimestamp")||Oe;q("yt.util.activity.setTimestamp",ti,void 0);function ui(a){R.call(this,1,arguments);this.b=a}
z(ui,R);function vi(a){R.call(this,1,arguments);this.b=a}
z(vi,R);function wi(a,b,c,d){R.call(this,2,arguments);this.g=a;this.b=null===b?null:!!b;this.receivePostUpdates=null===c?null:!!c;this.f=null===d?null:!!d}
z(wi,R);function xi(a,b,c,d,e){R.call(this,2,arguments);this.f=a;this.b=b;this.i=c||null;this.g=d||null;this.source=e||null}
z(xi,R);function yi(a,b,c){R.call(this,1,arguments);this.b=a;this.subscriptionId=b}
z(yi,R);function zi(a,b,c,d,e,f,h){R.call(this,1,arguments);this.f=a;this.subscriptionId=b;this.b=c;this.j=d||null;this.i=e||null;this.g=f||null;this.source=h||null}
z(zi,R);
var Ai=new S("subscription-batch-subscribe",ui),Bi=new S("subscription-batch-unsubscribe",ui),Ci=new S("subscription-pref-email",wi),Di=new S("subscription-subscribe",xi),Ei=new S("subscription-subscribe-loading",vi),Fi=new S("subscription-subscribe-loaded",vi),Gi=new S("subscription-subscribe-success",yi),Hi=new S("subscription-subscribe-external",xi),Ii=new S("subscription-unsubscribe",zi),Ji=new S("subscription-unsubscirbe-loading",vi),Ki=new S("subscription-unsubscribe-loaded",vi),Li=new S("subscription-unsubscribe-success",
vi),Mi=new S("subscription-external-unsubscribe",zi),Ni=new S("subscription-enable-ypc",vi),Oi=new S("subscription-disable-ypc",vi);function Pi(a,b){var c=document.location.protocol+"//"+document.domain+"/post_login";b&&(c=Gd(c,"mode",b));c=Gd("/signin?context=popup","next",c);c=Gd(c,"feature","sub_button");if(c=window.open(c,"loginPopup","width=375,height=440,resizable=yes,scrollbars=yes",!0)){var d=kc("LOGGED_IN",function(b){mc(H("LOGGED_IN_PUBSUB_KEY",void 0));$b("LOGGED_IN",!0);a(b)});
$b("LOGGED_IN_PUBSUB_KEY",d);c.moveTo((screen.width-375)/2,(screen.height-440)/2)}}
q("yt.pubsub.publish",K,void 0);function Qi(){var a=H("PLAYER_CONFIG");return a&&a.args&&void 0!==a.args.authuser?!0:!(!H("SESSION_INDEX")&&!H("LOGGED_IN"))}
;function Ri(){var a=Je();return a?a:null}
;function Si(a,b){(a=re(a))&&a.style&&(a.style.display=b?"":"none",ie(a,"hid",!b))}
function Ti(a){A(arguments,function(a){!da(a)||a instanceof Element?Si(a,!0):A(a,function(a){Ti(a)})})}
function Ui(a){A(arguments,function(a){!da(a)||a instanceof Element?Si(a,!1):A(a,function(a){Ui(a)})})}
;var Vi={},Wi="ontouchstart"in document;function Xi(a,b,c){var d;switch(a){case "mouseover":case "mouseout":d=3;break;case "mouseenter":case "mouseleave":d=9}return Ge(c,function(a){return fe(a,b)},!0,d)}
function Yi(a){var b="mouseover"==a.type&&"mouseenter"in Vi||"mouseout"==a.type&&"mouseleave"in Vi,c=a.type in Vi||b;if("HTML"!=a.target.tagName&&c){if(b){var b="mouseover"==a.type?"mouseenter":"mouseleave",c=Vi[b],d;for(d in c.fa){var e=Xi(b,d,a.target);e&&!Ge(a.relatedTarget,function(a){return a==e},!0)&&c.u(d,e,b,a)}}if(b=Vi[a.type])for(d in b.fa)(e=Xi(a.type,d,a.target))&&b.u(d,e,a.type,a)}}
N(document,"blur",Yi,!0);N(document,"change",Yi,!0);N(document,"click",Yi);N(document,"focus",Yi,!0);N(document,"mouseover",Yi);N(document,"mouseout",Yi);N(document,"mousedown",Yi);N(document,"keydown",Yi);N(document,"keyup",Yi);N(document,"keypress",Yi);N(document,"cut",Yi);N(document,"paste",Yi);Wi&&(N(document,"touchstart",Yi),N(document,"touchend",Yi),N(document,"touchcancel",Yi));function Zi(a){this.j=a;this.g={};this.ub=[];this.i=[]}
function U(a,b){return"yt-uix"+(a.j?"-"+a.j:"")+(b?"-"+b:"")}
Zi.prototype.register=u;Zi.prototype.unregister=function(){mc(this.ub);this.ub.length=0;wh(this.i);this.i.length=0};
Zi.prototype.init=t;Zi.prototype.dispose=t;function $i(a,b,c){a.i.push(vh(b,c,a))}
function aj(a,b,c){var d=U(a,void 0),e=x(c,a);b in Vi||(Vi[b]=new G);Vi[b].subscribe(d,e);a.g[c]=e}
function bj(a,b,c){if(b in Vi){var d=Vi[b];d.unsubscribe(U(a,void 0),a.g[c]);0>=d.S()&&(d.dispose(),delete Vi[b])}delete a.g[c]}
function cj(a,b){Db(a,"tooltip-text",b)}
;function dj(){Zi.call(this,"tooltip");this.b=0;this.f={}}
z(dj,Zi);ba(dj);g=dj.prototype;g.register=function(){aj(this,"mouseover",this.rb);aj(this,"mouseout",this.Fa);aj(this,"focus",this.hc);aj(this,"blur",this.cc);aj(this,"click",this.Fa);aj(this,"touchstart",this.Hc);aj(this,"touchend",this.yb);aj(this,"touchcancel",this.yb)};
g.unregister=function(){bj(this,"mouseover",this.rb);bj(this,"mouseout",this.Fa);bj(this,"focus",this.hc);bj(this,"blur",this.cc);bj(this,"click",this.Fa);bj(this,"touchstart",this.Hc);bj(this,"touchend",this.yb);bj(this,"touchcancel",this.yb);this.dispose();dj.B.unregister.call(this)};
g.dispose=function(){for(var a in this.f)this.Fa(this.f[a]);this.f={}};
g.rb=function(a){if(!(this.b&&1E3>y()-this.b)){var b=parseInt(D(a,"tooltip-hide-timer"),10);b&&(Fb(a,"tooltip-hide-timer"),J(b));var b=x(function(){ej(this,a);Fb(a,"tooltip-show-timer")},this),c=parseInt(D(a,"tooltip-show-delay"),10)||0,b=I(b,c);
Db(a,"tooltip-show-timer",b.toString());a.title&&(cj(a,fj(a)),a.title="");b=ia(a).toString();this.f[b]=a}};
g.Fa=function(a){var b=parseInt(D(a,"tooltip-show-timer"),10);b&&(J(b),Fb(a,"tooltip-show-timer"));b=x(function(){if(a){var b=re(gj(this,a));b&&(hj(b),b&&b.parentNode&&b.parentNode.removeChild(b),Fb(a,"content-id"));(b=re(gj(this,a,"arialabel")))&&b.parentNode&&b.parentNode.removeChild(b)}Fb(a,"tooltip-hide-timer")},this);
b=I(b,50);Db(a,"tooltip-hide-timer",b.toString());if(b=D(a,"tooltip-text"))a.title=b;b=ia(a).toString();delete this.f[b]};
g.hc=function(a){this.b=0;this.rb(a)};
g.cc=function(a){this.b=0;this.Fa(a)};
g.Hc=function(a,b,c){c.changedTouches&&(this.b=0,a=Xi(b,U(this),c.changedTouches[0].target),this.rb(a))};
g.yb=function(a,b,c){c.changedTouches&&(this.b=y(),a=Xi(b,U(this),c.changedTouches[0].target),this.Fa(a))};
function ij(a,b){cj(a,b);var c=D(a,"content-id");(c=re(c))&&ze(c,b)}
function fj(a){return D(a,"tooltip-text")||a.title}
function ej(a,b){if(b){var c=fj(b);if(c){var d=re(gj(a,b));if(!d){d=document.createElement("div");d.id=gj(a,b);d.className=U(a,"tip");var e=document.createElement("div");e.className=U(a,"tip-body");var f=document.createElement("div");f.className=U(a,"tip-arrow");var h=document.createElement("div");h.setAttribute("aria-hidden","true");h.className=U(a,"tip-content");var k=jj(a,b),m=gj(a,b,"content");h.id=m;Db(b,"content-id",m);e.appendChild(h);k&&d.appendChild(k);d.appendChild(e);d.appendChild(f);var n=
Ce(b),m=gj(a,b,"arialabel"),f=document.createElement("div");ge(f,U(a,"arialabel"));f.id=m;n=b.hasAttribute("aria-label")?b.getAttribute("aria-label"):"rtl"==document.body.getAttribute("dir")?c+" "+n:n+" "+c;ze(f,n);b.setAttribute("aria-labelledby",m);m=Ri()||document.body;m.appendChild(f);m.appendChild(d);ij(b,c);(c=parseInt(D(b,"tooltip-max-width"),10))&&e.offsetWidth>c&&(e.style.width=c+"px",ge(h,U(a,"normal-wrap")));h=fe(b,U(a,"reverse"));kj(a,b,d,e,k,h)||kj(a,b,d,e,k,!h);var ga=U(a,"tip-visible");
I(function(){ge(d,ga)},0)}}}}
function kj(a,b,c,d,e,f){ie(c,U(a,"tip-reverse"),f);var h=0;f&&(h=1);a=Rf(b);f=new ke((a.width-10)/2,f?a.height:0);var k=qe(b),m=new ke(0,0),n;n=k?qe(k):document;n=!L||kd(9)||ve(oe(n).b)?n.documentElement:n.body;b!=n&&(n=Pf(b),k=ue(oe(k).b),m.H=n.left+k.H,m.J=n.top+k.J);f=new ke(m.H+f.H,m.J+f.J);f=f.clone();m=(h&8&&"rtl"==Of(c,"direction")?h^4:h)&-9;h=Rf(c);k=h.clone();n=f.clone();k=k.clone();0!=m&&(m&4?n.H-=k.width+0:m&2&&(n.H-=k.width/2),m&1&&(n.J-=k.height+0));f=new Mf(0,0,0,0);f.left=n.H;f.top=
n.J;f.width=k.width;f.height=k.height;k=new ke(f.left,f.top);k instanceof ke?(m=k.H,k=k.J):(m=k,k=void 0);c.style.left=Qf(m,!1);c.style.top=Qf(k,!1);k=new be(f.width,f.height);if(!(h==k||h&&k&&h.width==k.width&&h.height==k.height))if(h=k,m=ve(oe(qe(c)).b),!L||jd("10")||m&&jd("8"))f=c.style,ad?f.MozBoxSizing="border-box":bd?f.WebkitBoxSizing="border-box":f.boxSizing="border-box",f.width=Math.max(h.width,0)+"px",f.height=Math.max(h.height,0)+"px";else if(f=c.style,m){if(L){m=Uf(c,"paddingLeft");k=Uf(c,
"paddingRight");n=Uf(c,"paddingTop");var ga=Uf(c,"paddingBottom"),m=new Lf(n,k,ga,m)}else m=Nf(c,"paddingLeft"),k=Nf(c,"paddingRight"),n=Nf(c,"paddingTop"),ga=Nf(c,"paddingBottom"),m=new Lf(parseFloat(n),parseFloat(k),parseFloat(ga),parseFloat(m));if(L&&!kd(9)){k=Wf(c,"borderLeft");n=Wf(c,"borderRight");var ga=Wf(c,"borderTop"),Qc=Wf(c,"borderBottom"),k=new Lf(ga,n,Qc,k)}else k=Nf(c,"borderLeftWidth"),n=Nf(c,"borderRightWidth"),ga=Nf(c,"borderTopWidth"),Qc=Nf(c,"borderBottomWidth"),k=new Lf(parseFloat(ga),
parseFloat(n),parseFloat(Qc),parseFloat(k));f.pixelWidth=h.width-k.left-m.left-m.right-k.right;f.pixelHeight=h.height-k.top-m.top-m.bottom-k.bottom}else f.pixelWidth=h.width,f.pixelHeight=h.height;h=window.document;h=ve(h)?h.documentElement:h.body;f=new be(h.clientWidth,h.clientHeight);1==c.nodeType?(c=Pf(c),k=new ke(c.left,c.top)):(c=c.changedTouches?c.changedTouches[0]:c,k=new ke(c.clientX,c.clientY));c=Rf(d);n=Math.floor(c.width/2);h=!!(f.height<k.J+a.height);a=!!(k.J<a.height);m=!!(k.H<n);f=!!(f.width<
k.H+n);k=(c.width+3)/-2- -5;b=D(b,"force-tooltip-direction");if("left"==b||m)k=-5;else if("right"==b||f)k=20-c.width-3;b=Math.floor(k)+"px";d.style.left=b;e&&(e.style.left=b,e.style.height=c.height+"px",e.style.width=c.width+"px");return!(h||a)}
function gj(a,b,c){a=U(a);var d=b.__yt_uid_key;d||(d=He(),b.__yt_uid_key=d);b=a+d;c&&(b+="-"+c);return b}
function jj(a,b){var c=null;cd&&fe(b,U(a,"masked"))&&((c=re("yt-uix-tooltip-shared-mask"))?(c.parentNode.removeChild(c),Ti(c)):(c=document.createElement("iframe"),c.src='javascript:""',c.id="yt-uix-tooltip-shared-mask",c.className=U(a,"tip-mask")));return c}
function hj(a){var b=re("yt-uix-tooltip-shared-mask"),c=b&&Ge(b,function(b){return b==a},!1,2);
b&&c&&(b.parentNode.removeChild(b),Ui(b),document.body.appendChild(b))}
;function lj(){Zi.call(this,"subscription-button")}
z(lj,Zi);ba(lj);lj.prototype.register=function(){aj(this,"click",this.Fb);$i(this,Ei,this.pc);$i(this,Fi,this.oc);$i(this,Gi,this.Sd);$i(this,Ji,this.pc);$i(this,Ki,this.oc);$i(this,Li,this.Yd);$i(this,Ni,this.Ed);$i(this,Oi,this.Dd)};
lj.prototype.unregister=function(){bj(this,"click",this.Fb);lj.B.unregister.call(this)};
var Fe={Xb:"hover-enabled",Qc:"yt-uix-button-subscribe",Rc:"yt-uix-button-subscribed",Ge:"ypc-enabled",Sc:"yt-uix-button-subscription-container",Tc:"yt-subscription-button-disabled-mask-container"},mj={He:"channel-external-id",Uc:"subscriber-count-show-when-subscribed",Vc:"subscriber-count-tooltip",Wc:"subscriber-count-title",Je:"href",Yb:"is-subscribed",Le:"parent-url",Ne:"clicktracking",Xc:"style-type",Zb:"subscription-id",Qe:"target",Zc:"ypc-enabled"};g=lj.prototype;
g.Fb=function(a){var b=D(a,"href"),c=Qi();if(b)a=D(a,"target")||"_self",window.open(b,a);else if(c){var b=D(a,"channel-external-id"),c=D(a,"clicktracking"),d;if(D(a,"ypc-enabled")){d=D(a,"ypc-item-type");var e=D(a,"ypc-item-id");d={itemType:d,itemId:e,subscriptionElement:a}}else d=null;e=D(a,"parent-url");if(D(a,"is-subscribed")){var f=D(a,"subscription-id");T(Ii,new zi(b,f,d,a,c,e))}else T(Di,new xi(b,d,c,e))}else nj(this,a)};
g.pc=function(a){this.Ma(a.b,this.Ec,!0)};
g.oc=function(a){this.Ma(a.b,this.Ec,!1)};
g.Sd=function(a){this.Ma(a.b,this.Fc,!0,a.subscriptionId)};
g.Yd=function(a){this.Ma(a.b,this.Fc,!1)};
g.Ed=function(a){this.Ma(a.b,this.fd)};
g.Dd=function(a){this.Ma(a.b,this.ed)};
g.Fc=function(a,b,c){b?(Db(a,mj.Yb,"true"),c&&Db(a,mj.Zb,c)):(Fb(a,mj.Yb),Fb(a,mj.Zb));oj(a)};
g.Ec=function(a,b){var c;c=Ee(a);ie(c,Fe.Tc,b);a.setAttribute("aria-busy",b?"true":"false");a.disabled=b};
function oj(a){var b=D(a,mj.Xc),c=!!D(a,"is-subscribed"),b="-"+b,d=Fe.Rc+b;ie(a,Fe.Qc+b,!c);ie(a,d,c);D(a,mj.Vc)&&!D(a,mj.Uc)&&(b=U(dj.getInstance()),ie(a,b,!c),a.title=c?"":D(a,mj.Wc));c?I(function(){ge(a,Fe.Xb)},1E3):he(a,Fe.Xb)}
g.fd=function(a){var b=!!D(a,"ypc-item-type"),c=!!D(a,"ypc-item-id");!D(a,"ypc-enabled")&&b&&c&&(ge(a,"ypc-enabled"),Db(a,mj.Zc,"true"))};
g.ed=function(a){D(a,"ypc-enabled")&&(he(a,"ypc-enabled"),Fb(a,"ypc-enabled"))};
function pj(a,b){var c=se(U(a));return Ia(c,function(a){return b==D(a,"channel-external-id")},a)}
g.ad=function(a,b,c){var d=Va(arguments,2);A(a,function(a){b.apply(this,Ra(a,d))},this)};
g.Ma=function(a,b,c){var d=pj(this,a);this.ad.apply(this,Ra([d],Va(arguments,1)))};
function nj(a,b){var c=x(function(a){a.discoverable_subscriptions&&$b("SUBSCRIBE_EMBED_DISCOVERABLE_SUBSCRIPTIONS",a.discoverable_subscriptions);this.Fb(b)},a);
Pi(c,"subscribe")}
;var qj=window.yt&&window.yt.uix&&window.yt.uix.widgets_||{};q("yt.uix.widgets_",qj,void 0);function rj(a){return(0==a.search("cue")||0==a.search("load"))&&"loadModule"!=a}
function sj(a,b,c){w(a)&&(a={mediaContentUrl:a,startSeconds:b,suggestedQuality:c});b=/\/([ve]|embed)\/([^#?]+)/.exec(a.mediaContentUrl);a.videoId=b&&b[2]?b[2]:null;return tj(a)}
function tj(a,b,c){if(ha(a)){b="endSeconds startSeconds mediaContentUrl suggestedQuality videoId two_stage_token".split(" ");c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}return{videoId:a,startSeconds:b,suggestedQuality:c}}
function uj(a,b,c,d){if(ha(a)&&!v(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}c={index:b,startSeconds:c,suggestedQuality:d};w(a)&&16==a.length?c.list="PL"+a:c.playlist=a;return c}
function vj(a){var b=a.video_id||a.videoId;if(w(b)){var c=P("yt-player-two-stage-token")||{},d=P("yt-player-two-stage-token")||{};p(void 0)?d[b]=void 0:delete d[b];O("yt-player-two-stage-token",d,300);(b=c[b])&&(a.two_stage_token=b)}}
;function wj(){var a=window.navigator.userAgent.match(/Chrome\/([0-9]+)/);return a?50<=parseInt(a[1],10):!1}
function xj(a){return document.currentScript&&(-1!=document.currentScript.src.indexOf("?"+a)||-1!=document.currentScript.src.indexOf("&"+a))}
var yj=xj("loadGamesSDK")?"/cast_game_sender.js":"/cast_sender.js",zj=xj("loadCastFramework");function Aj(){return"function"==typeof window.__onGCastApiAvailable?window.__onGCastApiAvailable:null}
var Bj=["boadgeojelhgndaghljhdicfkmllpafd","dliochdbjfkdbacpmhlcpmleaejidimm","enhhojjnijigcajfphajepfemndkmdlo","fmfcbgogabcbclcofgocippekhfcmgfj"],Cj=["pkedcjkdefgpdelpbcmbmeomcjbeemfm","fjhoaacokmgbjemoflkofnenfaiekifl"],Dj=wj()?Cj.concat(Bj):Bj.concat(Cj);function Ej(a,b){var c=new XMLHttpRequest;c.onreadystatechange=function(){4==c.readyState&&200==c.status&&b(!0)};
c.onerror=function(){b(!1)};
try{c.open("GET",a,!0),c.send()}catch(d){b(!1)}}
function Fj(a){if(a>=Dj.length)Gj();else{var b=Dj[a],c="chrome-extension://"+b+yj;0<=Bj.indexOf(b)?Ej(c,function(d){d?(window.chrome.cast=window.chrome.cast||{},window.chrome.cast.extensionId=b,Hj(c,Gj)):Fj(a+1)}):Hj(c,function(){Fj(a+1)})}}
function Hj(a,b,c){var d=document.createElement("script");d.onerror=b;c&&(d.onload=c);d.src=a;(document.head||document.documentElement).appendChild(d)}
function Gj(){var a=Aj();a&&a(!1,"No cast extension found")}
function Ij(){if(zj){var a=2,b=Aj(),c=function(){a--;0==a&&b&&b(!0)};
window.__onGCastApiAvailable=c;Hj("//www.gstatic.com/cast/sdk/libs/sender/0.1/cast_framework.js",Gj,c)}}
function Jj(){if(0<=window.navigator.userAgent.indexOf("CriOS")){var a=window.__gCrWeb&&window.__gCrWeb.message&&window.__gCrWeb.message.invokeOnHost;if(a){Ij();a({command:"cast.sender.init"});return}}window.chrome?(Ij(),a=window.navigator.userAgent,0<=a.indexOf("Android")&&0<=a.indexOf("Chrome/")&&window.navigator.presentation?(a=wj()?"50":"",Hj("//www.gstatic.com/eureka/clank"+a+yj,Gj)):Fj(0)):Gj()}
;var Kj=y(),Lj=null,Mj=Array(50),Nj=-1,Oj=!1;function Pj(){var a=Qj;Rj();Lj.push(a);Sj(Lj)}
function Tj(a,b){Rj();var c=Lj,d=Uj(a,String(b));0==c.length?Vj(d):(Sj(c),A(c,function(a){a(d)}))}
function Rj(){Lj||(Lj=r("yt.mdx.remote.debug.handlers_")||[],q("yt.mdx.remote.debug.handlers_",Lj,void 0))}
function Vj(a){var b=(Nj+1)%50;Nj=b;Mj[b]=a;Oj||(Oj=49==b)}
function Sj(a){var b=Mj;if(b[0]){var c=Nj,d=Oj?c:-1;do{var d=(d+1)%50,e=b[d];A(a,function(a){a(e)})}while(d!=c);
Mj=Array(50);Nj=-1;Oj=!1}}
function Uj(a,b){var c=(y()-Kj)/1E3;c.toFixed&&(c=c.toFixed(3));var d=[];d.push("[",c+"s","] ");d.push("[","yt.mdx.remote","] ");d.push(a+": "+b,"\n");return d.join("")}
;function Wj(a){a=a||{};this.name=a.name||"";this.id=a.id||a.screenId||"";this.token=a.token||a.loungeToken||"";this.uuid=a.uuid||a.dialId||""}
function Xj(a,b){return!!b&&(a.id==b||a.uuid==b)}
function Yj(a){return{name:a.name,screenId:a.id,loungeToken:a.token,dialId:a.uuid}}
function Zj(a){return new Wj(a)}
function ak(a){return v(a)?Ja(a,Zj):[]}
function bk(a){return a?'{name:"'+a.name+'",id:'+a.id.substr(0,6)+"..,token:"+(a.token?".."+a.token.slice(-6):"-")+",uuid:"+(a.uuid?".."+a.uuid.slice(-6):"-")+"}":"null"}
function ck(a){return v(a)?"["+Ja(a,bk).join(",")+"]":"null"}
;var dk={Fe:"atp",Pe:"ska",Me:"que",Ke:"mus",Oe:"sus"};function ek(a){this.i=this.g="";this.b="/api/lounge";this.f=!0;a=a||document.location.href;var b=Number(zd(4,a))||null||"";b&&(this.i=":"+b);this.g=yd(zd(3,a))||"";a=lb;0<=a.search("MSIE")&&(a=a.match(/MSIE ([\d.]+)/)[1],0>Ea(a,"10.0")&&(this.f=!1))}
function fk(a,b,c,d){var e=a.b;if(p(d)?d:a.f)e="https://"+a.g+a.i+a.b;return Hd(e+b,c||{})}
function gk(a,b,c,d,e){a={format:"JSON",method:"POST",context:a,timeout:5E3,withCredentials:!1,aa:na(a.o,d,!0),onError:na(a.j,e),Ga:na(a.l,e)};c&&(a.V=c,a.headers={"Content-Type":"application/x-www-form-urlencoded"});return Qd(b,a)}
ek.prototype.o=function(a,b,c,d){b?a(d):a({text:c.responseText})};
ek.prototype.j=function(a,b){a(Error("Request error: "+b.status))};
ek.prototype.l=function(a){a(Error("request timed out"))};function hk(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})}
function ik(a,b){return Ma(a,function(a){return a.key==b})}
function jk(a){return Ja(a,function(a){return{key:a.id,name:a.name}})}
function kk(a,b){return Ma(a,function(a){return a||b?!a!=!b?!1:a.id==b.id:!0})}
function lk(a,b){return Ma(a,function(a){return Xj(a,b)})}
;function V(){E.call(this);this.o=new G;Vb(this,na(F,this.o))}
z(V,E);V.prototype.subscribe=function(a,b,c){return this.C()?0:this.o.subscribe(a,b,c)};
V.prototype.unsubscribe=function(a,b,c){return this.C()?!1:this.o.unsubscribe(a,b,c)};
V.prototype.ka=function(a){return this.C()?!1:this.o.ka(a)};
V.prototype.u=function(a,b){return this.C()?!1:this.o.u.apply(this.o,arguments)};function mk(a){V.call(this);this.l=a;this.screens=[]}
z(mk,V);g=mk.prototype;g.Z=function(){return this.screens};
g.contains=function(a){return!!kk(this.screens,a)};
g.get=function(a){return a?lk(this.screens,a):null};
g.start=u;g.jb=u;g.remove=u;g.hb=u;function nk(a,b){var c=a.get(b.uuid)||a.get(b.id);if(c){var d=c.name;c.id=b.id||c.id;c.name=b.name;c.token=b.token;c.uuid=b.uuid||c.uuid;return c.name!=d}a.screens.push(b);return!0}
function ok(a,b){var c=a.screens.length!=b.length;a.screens=Ia(a.screens,function(a){return!!kk(b,a)});
for(var d=0,e=b.length;d<e;d++)c=nk(a,b[d])||c;return c}
function pk(a,b){var c=a.screens.length;a.screens=Ia(a.screens,function(a){return!(a||b?!a!=!b?0:a.id==b.id:1)});
return a.screens.length<c}
g.info=function(a){Tj(this.l,a)};function qk(a,b,c,d){V.call(this);this.A=a;this.l=b;this.i=c;this.j=d;this.g=0;this.b=null;this.f=NaN}
z(qk,V);var rk=[2E3,2E3,1E3,1E3,1E3,2E3,2E3,5E3,5E3,1E4];g=qk.prototype;g.start=function(){!this.b&&isNaN(this.f)&&this.Ac()};
g.stop=function(){this.b&&(this.b.abort(),this.b=null);isNaN(this.f)||(J(this.f),this.f=NaN)};
g.w=function(){this.stop();qk.B.w.call(this)};
g.Ac=function(){this.f=NaN;this.b=Qd(fk(this.A,"/pairing/get_screen"),{method:"POST",V:{pairing_code:this.l},timeout:5E3,aa:x(this.we,this),onError:x(this.ve,this),Ga:x(this.xe,this)})};
g.we=function(a,b){this.b=null;var c=b.screen||{};c.dialId=this.i;c.name=this.j;this.u("pairingComplete",new Wj(c))};
g.ve=function(a){this.b=null;a.status&&404==a.status?this.g>=rk.length?this.u("pairingFailed",Error("DIAL polling timed out")):(a=rk[this.g],this.f=I(x(this.Ac,this),a),this.g++):this.u("pairingFailed",Error("Server error "+a.status))};
g.xe=function(){this.b=null;this.u("pairingFailed",Error("Server not responding"))};function sk(a){this.app=this.name=this.id="";this.type="REMOTE_CONTROL";this.avatar=this.username="";this.capabilities=new Rc;this.experiments=new Rc;this.theme="u";if(a){this.id=a.id||a.name;this.name=a.name;this.app=a.app;this.type=a.type||"REMOTE_CONTROL";this.username=a.user||"";this.avatar=a.userAvatarUri||"";this.theme=a.theme||"u";var b=a.capabilities||"";this.capabilities.clear();Sc(this.capabilities,Ia(b.split(","),na($a,dk)));a=a.experiments||"";this.experiments.clear();Sc(this.experiments,
a.split(","))}}
sk.prototype.equals=function(a){return a?this.id==a.id:!1};var tk;function uk(){var a=vk(),b=wk();B(a,b);if(xk()){var c=a,d;d=0;for(var e=c.length,f;d<e;){var h=d+e>>1,k;k=Wa(b,c[h]);0<k?d=h+1:(e=h,f=!k)}d=f?d:~d;0>d&&Ua(c,-(d+1),0,b)}a=yk(a);if(0==a.length)try{Df.remove("remote_sid","/","youtube.com")}catch(m){}else try{Ef("remote_sid",a.join(","),-1)}catch(m){}}
function vk(){var a=P("yt-remote-connected-devices")||[];a.sort(Wa);return a}
function yk(a){if(0==a.length)return[];var b=a[0].indexOf("#"),c=-1==b?a[0]:a[0].substring(0,b);return Ja(a,function(a,b){return 0==b?a:a.substring(c.length)})}
function zk(a){O("yt-remote-connected-devices",a,86400)}
function wk(){if(Ak)return Ak;var a=P("yt-remote-device-id");a||(a=hk(),O("yt-remote-device-id",a,31536E3));for(var b=vk(),c=1,d=a;B(b,d);)c++,d=a+"#"+c;return Ak=d}
function Bk(){return P("yt-remote-session-browser-channel")}
function xk(){return P("yt-remote-session-screen-id")}
function Ck(a){5<a.length&&(a=a.slice(a.length-5));var b=Ja(Dk(),function(a){return a.loungeToken}),c=Ja(a,function(a){return a.loungeToken});
La(c,function(a){return!B(b,a)})&&Ek();
O("yt-remote-local-screens",a,31536E3)}
function Dk(){return P("yt-remote-local-screens")||[]}
function Ek(){O("yt-remote-lounge-token-expiration",!0,86400)}
function Fk(a,b){O("yt-remote-session-browser-channel",a);O("yt-remote-session-screen-id",b);var c=vk(),d=wk();B(c,d)||c.push(d);zk(c);uk()}
function Gk(a){a||(gf("yt-remote-session-screen-id"),gf("yt-remote-session-video-id"));uk();a=vk();Pa(a,wk());zk(a)}
function Hk(){if(!tk){var a;a=new Te;(a=a.isAvailable()?a:null)&&(tk=new Ve(a))}return tk?!!tk.get("yt-remote-use-staging-server"):!1}
var Ak="";function Ik(a){mk.call(this,"LocalScreenService");this.f=a;this.b=NaN;Jk(this);this.info("Initializing with "+ck(this.screens))}
z(Ik,mk);g=Ik.prototype;g.start=function(){Jk(this)&&this.u("screenChange");!P("yt-remote-lounge-token-expiration")&&Kk(this);J(this.b);this.b=I(x(this.start,this),1E4)};
g.jb=function(a,b){Jk(this);nk(this,a);Lk(this,!1);this.u("screenChange");b(a);a.token||Kk(this)};
g.remove=function(a,b){var c=Jk(this);pk(this,a)&&(Lk(this,!1),c=!0);b(a);c&&this.u("screenChange")};
g.hb=function(a,b,c,d){var e=Jk(this),f=this.get(a.id);f?(f.name!=b&&(f.name=b,Lk(this,!1),e=!0),c(a)):d(Error("no such local screen."));e&&this.u("screenChange")};
g.w=function(){J(this.b);Ik.B.w.call(this)};
function Kk(a){if(a.screens.length){var b=Ja(a.screens,function(a){return a.id}),c=fk(a.f,"/pairing/get_lounge_token_batch");
gk(a.f,c,{screen_ids:b.join(",")},x(a.pd,a),x(a.od,a))}}
g.pd=function(a){Jk(this);var b=this.screens.length;a=a&&a.screens||[];for(var c=0,d=a.length;c<d;++c){var e=a[c],f=this.get(e.screenId);f&&(f.token=e.loungeToken,--b)}Lk(this,!b);b&&Tj(this.l,"Missed "+b+" lounge tokens.")};
g.od=function(a){Tj(this.l,"Requesting lounge tokens failed: "+a)};
function Jk(a){var b=ak(Dk()),b=Ia(b,function(a){return!a.uuid});
return ok(a,b)}
function Lk(a,b){Ck(Ja(a.screens,Yj));b&&Ek()}
;function Mk(a,b){V.call(this);this.l=b;for(var c=P("yt-remote-online-screen-ids")||"",c=c?c.split(","):[],d={},e=this.l(),f=0,h=e.length;f<h;++f){var k=e[f].id;d[k]=B(c,k)}this.b=d;this.j=a;this.g=this.i=NaN;this.f=null;Nk("Initialized with "+M(this.b))}
z(Mk,V);g=Mk.prototype;g.start=function(){var a=parseInt(P("yt-remote-fast-check-period")||"0",10);(this.i=y()-144E5<a?0:a)?Ok(this):(this.i=y()+3E5,O("yt-remote-fast-check-period",this.i),this.Sb())};
g.isEmpty=function(){return fb(this.b)};
g.update=function(){Nk("Updating availability on schedule.");var a=this.l(),b=Ya(this.b,function(b,d){return b&&!!lk(a,d)},this);
Pk(this,b)};
function Qk(a,b,c){var d=fk(a.j,"/pairing/get_screen_availability");gk(a.j,d,{lounge_token:b.token},x(function(a){a=a.screens||[];for(var d=0,h=a.length;d<h;++d)if(a[d].loungeToken==b.token){c("online"==a[d].status);return}c(!1)},a),x(function(){c(!1)},a))}
g.w=function(){J(this.g);this.g=NaN;this.f&&(this.f.abort(),this.f=null);Mk.B.w.call(this)};
function Pk(a,b){var c;a:if(Za(b)!=Za(a.b))c=!1;else{c=cb(b);for(var d=0,e=c.length;d<e;++d)if(!a.b[c[d]]){c=!1;break a}c=!0}c||(Nk("Updated online screens: "+M(a.b)),a.b=b,a.u("screenChange"));Rk(a)}
function Ok(a){isNaN(a.g)||J(a.g);a.g=I(x(a.Sb,a),0<a.i&&a.i<y()?2E4:1E4)}
g.Sb=function(){J(this.g);this.g=NaN;this.f&&this.f.abort();var a=Sk(this);if(Za(a)){var b=fk(this.j,"/pairing/get_screen_availability");this.f=gk(this.j,b,{lounge_token:cb(a).join(",")},x(this.Qd,this,a),x(this.Pd,this))}else Pk(this,{}),Ok(this)};
g.Qd=function(a,b){this.f=null;var c;a:{c=cb(Sk(this));var d=cb(a);if(da(c)&&da(d)&&c.length==d.length){for(var e=c.length,f=0;f<e;f++)if(c[f]!==d[f]){c=!1;break a}c=!0}else c=!1}if(c){c=b.screens||[];d={};e=0;for(f=c.length;e<f;++e)d[a[c[e].loungeToken]]="online"==c[e].status;Pk(this,d);Ok(this)}else this.L("Changing Screen set during request."),this.Sb()};
g.Pd=function(a){this.L("Screen availability failed: "+a);this.f=null;Ok(this)};
function Nk(a){Tj("OnlineScreenService",a)}
g.L=function(a){Tj("OnlineScreenService",a)};
function Sk(a){var b={};A(a.l(),function(a){a.token?b[a.token]=a.id:this.L("Requesting availability of screen w/o lounge token.")});
return b}
function Rk(a){a=cb(Ya(a.b,function(a){return a}));
a.sort(Wa);a.length?O("yt-remote-online-screen-ids",a.join(","),60):gf("yt-remote-online-screen-ids")}
;function W(a){mk.call(this,"ScreenService");this.j=a;this.b=this.f=null;this.g=[];this.i={};Tk(this)}
z(W,mk);g=W.prototype;g.start=function(){this.f.start();this.b.start();this.screens.length&&(this.u("screenChange"),this.b.isEmpty()||this.u("onlineScreenChange"))};
g.jb=function(a,b,c){this.f.jb(a,b,c)};
g.remove=function(a,b,c){this.f.remove(a,b,c);this.b.update()};
g.hb=function(a,b,c,d){this.f.contains(a)?this.f.hb(a,b,c,d):(a="Updating name of unknown screen: "+a.name,Tj(this.l,a),d(Error(a)))};
g.Z=function(a){return a?this.screens:Ra(this.screens,Ia(this.g,function(a){return!this.contains(a)},this))};
g.Jc=function(){return Ia(this.Z(!0),function(a){return!!this.b.b[a.id]},this)};
function Uk(a,b,c,d,e,f){a.info("getAutomaticScreenByIds "+c+" / "+b);c||(c=a.i[b]);var h=a.Z();if(h=(c?lk(h,c):null)||lk(h,b)){h.uuid=b;var k=Vk(a,h);Qk(a.b,k,function(a){e(a?k:null)})}else c?Wk(a,c,x(function(a){var f=Vk(this,new Wj({name:d,
screenId:c,loungeToken:a,dialId:b||""}));Qk(this.b,f,function(a){e(a?f:null)})},a),f):e(null)}
g.Kc=function(a,b,c,d,e){this.info("getDialScreenByPairingCode "+a+" / "+b);var f=new qk(this.j,a,b,c);f.subscribe("pairingComplete",x(function(a){F(f);d(Vk(this,a))},this));
f.subscribe("pairingFailed",function(a){F(f);e(a)});
f.start();return x(f.stop,f)};
function Xk(a,b){for(var c=0,d=a.screens.length;c<d;++c)if(a.screens[c].name==b)return a.screens[c];return null}
g.ze=function(a,b,c,d){Qd(fk(this.j,"/pairing/get_screen"),{method:"POST",V:{pairing_code:a},timeout:5E3,aa:x(function(a,d){var h=new Wj(d.screen||{});if(!h.name||Xk(this,h.name)){var k;a:{k=h.name;for(var m=2,n=b(k,m);Xk(this,n);){m++;if(20<m)break a;n=b(k,m)}k=n}h.name=k}c(Vk(this,h))},this),
onError:x(function(a){d(Error("pairing request failed: "+a.status))},this),
Ga:x(function(){d(Error("pairing request timed out."))},this)})};
g.w=function(){F(this.f);F(this.b);W.B.w.call(this)};
function Wk(a,b,c,d){a.info("requestLoungeToken_ for "+b);var e={V:{screen_ids:b},method:"POST",context:a,aa:function(a,e){var k=e&&e.screens||[];k[0]&&k[0].screenId==b?c(k[0].loungeToken):d(Error("Missing lounge token in token response"))},
onError:function(){d(Error("Request screen lounge token failed"))}};
Qd(fk(a.j,"/pairing/get_lounge_token_batch"),e)}
function Yk(a){a.screens=a.f.Z();var b=a.i,c={},d;for(d in b)c[b[d]]=d;b=0;for(d=a.screens.length;b<d;++b){var e=a.screens[b];e.uuid=c[e.id]||""}a.info("Updated manual screens: "+ck(a.screens))}
g.qd=function(){Yk(this);this.u("screenChange");this.b.update()};
function Tk(a){Zk(a);a.f=new Ik(a.j);a.f.subscribe("screenChange",x(a.qd,a));Yk(a);a.g=ak(P("yt-remote-automatic-screen-cache")||[]);Zk(a);a.info("Initializing automatic screens: "+ck(a.g));a.b=new Mk(a.j,x(a.Z,a,!0));a.b.subscribe("screenChange",x(function(){this.u("onlineScreenChange")},a))}
function Vk(a,b){var c=a.get(b.id);c?(c.uuid=b.uuid,b=c):((c=lk(a.g,b.uuid))?(c.id=b.id,c.token=b.token,b=c):a.g.push(b),O("yt-remote-automatic-screen-cache",Ja(a.g,Yj)));Zk(a);a.i[b.uuid]=b.id;O("yt-remote-device-id-map",a.i,31536E3);return b}
function Zk(a){a.i=P("yt-remote-device-id-map")||{}}
W.prototype.dispose=W.prototype.dispose;function $k(a,b,c){V.call(this);this.O=c;this.G=a;this.b=b;this.g=null}
z($k,V);g=$k.prototype;g.tb=function(a){this.g=a;this.u("sessionScreen",this.g)};
g.$=function(a){this.C()||(a&&al(this,""+a),this.g=null,this.u("sessionScreen",null))};
g.info=function(a){Tj(this.O,a)};
function al(a,b){Tj(a.O,b)}
g.Ea=u;g.xb=u;g.Mc=function(){return null};
g.stop=u;g.Tb=function(a){var b=this.b;a?(b.displayStatus=new chrome.cast.ReceiverDisplayStatus(a,[]),b.displayStatus.showStop=!0):b.displayStatus=null;chrome.cast.setReceiverDisplayStatus(b,x(function(){this.info("Updated receiver status for "+b.friendlyName+": "+a)},this),x(function(){al(this,"Failed to update receiver status for: "+b.friendlyName)},this))};
g.w=function(){this.Tb("");$k.B.w.call(this)};function bl(a,b){$k.call(this,a,b,"CastSession");this.f=null;this.i=0;this.l=x(this.Ae,this);this.j=x(this.ae,this);this.i=I(x(function(){cl(this,null)},this),12E4)}
z(bl,$k);g=bl.prototype;g.xb=function(a){if(this.f){if(this.f==a)return;al(this,"Overriding cast sesison with new session object");this.f.removeUpdateListener(this.l);this.f.removeMessageListener("urn:x-cast:com.google.youtube.mdx",this.j)}this.f=a;this.f.addUpdateListener(this.l);this.f.addMessageListener("urn:x-cast:com.google.youtube.mdx",this.j);dl(this)};
g.Ea=function(a){this.info("launchWithParams no-op for Cast: "+M(a))};
g.stop=function(){this.f?this.f.stop(x(function(){this.$()},this),x(function(){this.$(Error("Failed to stop receiver app."))},this)):this.$(Error("Stopping cast device witout session."))};
g.Tb=t;g.w=function(){this.info("disposeInternal");J(this.i);this.i=0;this.f&&(this.f.removeUpdateListener(this.l),this.f.removeMessageListener("urn:x-cast:com.google.youtube.mdx",this.j));this.f=null;bl.B.w.call(this)};
function dl(a){a.info("sendYoutubeMessage_: getMdxSessionStatus "+M(void 0));var b={type:"getMdxSessionStatus"};a.f?a.f.sendMessage("urn:x-cast:com.google.youtube.mdx",b,t,x(function(){al(this,"Failed to send message: getMdxSessionStatus.")},a)):al(a,"Sending yt message without session: "+M(b))}
g.ae=function(a,b){if(!this.C())if(b){var c=pd(b);if(c){var d=""+c.type,c=c.data||{};this.info("onYoutubeMessage_: "+d+" "+M(c));switch(d){case "mdxSessionStatus":cl(this,c.screenId);break;default:al(this,"Unknown youtube message: "+d)}}else al(this,"Unable to parse message.")}else al(this,"No data in message.")};
function cl(a,b){J(a.i);if(b){if(a.info("onConnectedScreenId_: Received screenId: "+b),!a.g||a.g.id!=b){var c=x(a.tb,a),d=x(a.$,a);a.jc(b,c,d,5)}}else a.$(Error("Waiting for session status timed out."))}
g.jc=function(a,b,c,d){Uk(this.G,this.b.label,a,this.b.friendlyName,x(function(e){e?b(e):0<=d?(al(this,"Screen "+a+" appears to be offline. "+d+" retries left."),I(x(this.jc,this,a,b,c,d-1),300)):c(Error("Unable to fetch screen."))},this),c)};
g.Mc=function(){return this.f};
g.Ae=function(a){this.C()||a||(al(this,"Cast session died."),this.$())};function el(a,b){$k.call(this,a,b,"DialSession");this.i=this.F=null;this.I="";this.j=null;this.A=t;this.l=NaN;this.M=x(this.De,this);this.f=t}
z(el,$k);g=el.prototype;g.xb=function(a){this.i=a;this.i.addUpdateListener(this.M)};
g.Ea=function(a){this.j=a;this.A()};
g.stop=function(){this.f();this.f=t;J(this.l);this.i?this.i.stop(x(this.$,this,null),x(this.$,this,"Failed to stop DIAL device.")):this.$()};
g.w=function(){this.f();this.f=t;J(this.l);this.i&&this.i.removeUpdateListener(this.M);this.i=null;el.B.w.call(this)};
function fl(a){a.f=a.G.Kc(a.I,a.b.label,a.b.friendlyName,x(function(a){this.f=t;this.tb(a)},a),x(function(a){this.f=t;
this.$(a)},a))}
g.De=function(a){this.C()||a||(al(this,"DIAL session died."),this.f(),this.f=t,this.$())};
function gl(a){var b={};b.pairingCode=a.I;if(a.j){var c=a.j.currentTime||0;b.v=a.j.videoId;b.t=c}Hk()&&(b.env_useStageMdx=1);return Fd(b)}
g.Pb=function(a){this.I=hk();if(this.j){var b=new chrome.cast.DialLaunchResponse(!0,gl(this));a(b);fl(this)}else this.A=x(function(){J(this.l);this.A=t;this.l=NaN;var b=new chrome.cast.DialLaunchResponse(!0,gl(this));a(b);fl(this)},this),this.l=I(x(function(){this.A()},this),100)};
g.rd=function(a,b){Uk(this.G,this.F.receiver.label,a,this.b.friendlyName,x(function(a){a&&a.token?(this.tb(a),b(new chrome.cast.DialLaunchResponse(!1))):this.Pb(b)},this),x(function(a){al(this,"Failed to get DIAL screen: "+a);
this.Pb(b)},this))};function hl(a,b){$k.call(this,a,b,"ManualSession");this.f=I(x(this.Ea,this,null),150)}
z(hl,$k);hl.prototype.stop=function(){this.$()};
hl.prototype.xb=t;hl.prototype.Ea=function(){J(this.f);this.f=NaN;var a=lk(this.G.Z(),this.b.label);a?this.tb(a):this.$(Error("No such screen"))};
hl.prototype.w=function(){J(this.f);this.f=NaN;hl.B.w.call(this)};function X(a){V.call(this);this.f=a;this.b=null;this.j=!1;this.g=[];this.i=x(this.Nd,this)}
z(X,V);g=X.prototype;
g.init=function(a,b){chrome.cast.timeout.requestSession=3E4;var c=new chrome.cast.SessionRequest("233637DE");c.dialRequest=new chrome.cast.DialRequest("YouTube");var d=chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED,e=a?chrome.cast.DefaultActionPolicy.CAST_THIS_TAB:chrome.cast.DefaultActionPolicy.CREATE_SESSION,c=new chrome.cast.ApiConfig(c,x(this.uc,this),x(this.Od,this),d,e);c.customDialLaunchCallback=x(this.Cd,this);chrome.cast.initialize(c,x(function(){this.C()||(chrome.cast.addReceiverActionListener(this.i),Pj(),
this.f.subscribe("onlineScreenChange",x(this.Lc,this)),this.g=il(this),chrome.cast.setCustomReceivers(this.g,t,x(function(a){this.L("Failed to set initial custom receivers: "+M(a))},this)),this.u("yt-remote-cast2-availability-change",jl(this)),b(!0))},this),x(function(a){this.L("Failed to initialize API: "+M(a));
b(!1)},this))};
g.oe=function(a,b){kl("Setting connected screen ID: "+a+" -> "+b);if(this.b){var c=this.b.g;if(!a||c&&c.id!=a)kl("Unsetting old screen status: "+this.b.b.friendlyName),F(this.b),this.b=null}if(a&&b){if(!this.b){c=lk(this.f.Z(),a);if(!c){kl("setConnectedScreenStatus: Unknown screen.");return}var d=ll(this,c);d||(kl("setConnectedScreenStatus: Connected receiver not custom..."),d=new chrome.cast.Receiver(c.uuid?c.uuid:c.id,c.name),d.receiverType=chrome.cast.ReceiverType.CUSTOM,this.g.push(d),chrome.cast.setCustomReceivers(this.g,
t,x(function(a){this.L("Failed to set initial custom receivers: "+M(a))},this)));
kl("setConnectedScreenStatus: new active receiver: "+d.friendlyName);ml(this,new hl(this.f,d),!0)}this.b.Tb(b)}else kl("setConnectedScreenStatus: no screen.")};
function ll(a,b){return b?Ma(a.g,function(a){return Xj(b,a.label)},a):null}
g.pe=function(a){this.C()?this.L("Setting connection data on disposed cast v2"):this.b?this.b.Ea(a):this.L("Setting connection data without a session")};
g.Ce=function(){this.C()?this.L("Stopping session on disposed cast v2"):this.b?(this.b.stop(),F(this.b),this.b=null):kl("Stopping non-existing session")};
g.requestSession=function(){chrome.cast.requestSession(x(this.uc,this),x(this.Rd,this))};
g.w=function(){this.f.unsubscribe("onlineScreenChange",x(this.Lc,this));window.chrome&&chrome.cast&&chrome.cast.removeReceiverActionListener(this.i);var a=Qj,b=r("yt.mdx.remote.debug.handlers_");Pa(b||[],a);F(this.b);X.B.w.call(this)};
function kl(a){Tj("Controller",a)}
g.L=function(a){Tj("Controller",a)};
function Qj(a){window.chrome&&chrome.cast&&chrome.cast.logMessage&&chrome.cast.logMessage(a)}
function jl(a){return a.j||!!a.g.length||!!a.b}
function ml(a,b,c){F(a.b);(a.b=b)?(c?a.u("yt-remote-cast2-receiver-resumed",b.b):a.u("yt-remote-cast2-receiver-selected",b.b),b.subscribe("sessionScreen",x(a.wc,a,b)),b.g?a.u("yt-remote-cast2-session-change",b.g):c&&a.b.Ea(null)):a.u("yt-remote-cast2-session-change",null)}
g.wc=function(a,b){this.b==a&&(b||ml(this,null),this.u("yt-remote-cast2-session-change",b))};
g.Nd=function(a,b){if(!this.C())if(a)switch(kl("onReceiverAction_ "+a.label+" / "+a.friendlyName+"-- "+b),b){case chrome.cast.ReceiverAction.CAST:if(this.b)if(this.b.b.label!=a.label)kl("onReceiverAction_: Stopping active receiver: "+this.b.b.friendlyName),this.b.stop();else{kl("onReceiverAction_: Casting to active receiver.");this.b.g&&this.u("yt-remote-cast2-session-change",this.b.g);break}switch(a.receiverType){case chrome.cast.ReceiverType.CUSTOM:ml(this,new hl(this.f,a));break;case chrome.cast.ReceiverType.DIAL:ml(this,
new el(this.f,a));break;case chrome.cast.ReceiverType.CAST:ml(this,new bl(this.f,a));break;default:this.L("Unknown receiver type: "+a.receiverType)}break;case chrome.cast.ReceiverAction.STOP:this.b&&this.b.b.label==a.label?this.b.stop():this.L("Stopping receiver w/o session: "+a.friendlyName)}else this.L("onReceiverAction_ called without receiver.")};
g.Cd=function(a){if(this.C())return Promise.reject(Error("disposed"));var b=a.receiver;b.receiverType!=chrome.cast.ReceiverType.DIAL&&(this.L("Not DIAL receiver: "+b.friendlyName),b.receiverType=chrome.cast.ReceiverType.DIAL);var c=this.b?this.b.b:null;if(!c||c.label!=b.label)return this.L("Receiving DIAL launch request for non-clicked DIAL receiver: "+b.friendlyName),Promise.reject(Error("illegal DIAL launch"));if(c&&c.label==b.label&&c.receiverType!=chrome.cast.ReceiverType.DIAL){if(this.b.g)return kl("Reselecting dial screen."),
this.u("yt-remote-cast2-session-change",this.b.g),Promise.resolve(new chrome.cast.DialLaunchResponse(!1));this.L('Changing CAST intent from "'+c.receiverType+'" to "dial" for '+b.friendlyName);ml(this,new el(this.f,b))}b=this.b;b.F=a;return b.F.appState==chrome.cast.DialAppState.RUNNING?new Promise(x(b.rd,b,(b.F.extraData||{}).screenId||null)):new Promise(x(b.Pb,b))};
g.uc=function(a){if(!this.C()){kl("New cast session ID: "+a.sessionId);var b=a.receiver;if(b.receiverType!=chrome.cast.ReceiverType.CUSTOM){if(!this.b)if(b.receiverType==chrome.cast.ReceiverType.CAST)kl("Got resumed cast session before resumed mdx connection."),ml(this,new bl(this.f,b),!0);else{this.L("Got non-cast session without previous mdx receiver event, or mdx resume.");return}var c=this.b.b,d=lk(this.f.Z(),c.label);d&&Xj(d,b.label)&&c.receiverType!=chrome.cast.ReceiverType.CAST&&b.receiverType==
chrome.cast.ReceiverType.CAST&&(kl("onSessionEstablished_: manual to cast session change "+b.friendlyName),F(this.b),this.b=new bl(this.f,b),this.b.subscribe("sessionScreen",x(this.wc,this,this.b)),this.b.Ea(null));this.b.xb(a)}}};
g.Be=function(){return this.b?this.b.Mc():null};
g.Rd=function(a){this.C()||(this.L("Failed to estabilish a session: "+M(a)),a.code!=chrome.cast.ErrorCode.CANCEL&&ml(this,null))};
g.Od=function(a){kl("Receiver availability updated: "+a);if(!this.C()){var b=jl(this);this.j=a==chrome.cast.ReceiverAvailability.AVAILABLE;jl(this)!=b&&this.u("yt-remote-cast2-availability-change",jl(this))}};
function il(a){var b=a.f.Jc(),c=a.b&&a.b.b;a=Ja(b,function(a){c&&Xj(a,c.label)&&(c=null);var b=a.uuid?a.uuid:a.id,f=ll(this,a);f?(f.label=b,f.friendlyName=a.name):(f=new chrome.cast.Receiver(b,a.name),f.receiverType=chrome.cast.ReceiverType.CUSTOM);return f},a);
c&&(c.receiverType!=chrome.cast.ReceiverType.CUSTOM&&(c=new chrome.cast.Receiver(c.label,c.friendlyName),c.receiverType=chrome.cast.ReceiverType.CUSTOM),a.push(c));return a}
g.Lc=function(){if(!this.C()){var a=jl(this);this.g=il(this);kl("Updating custom receivers: "+M(this.g));chrome.cast.setCustomReceivers(this.g,t,x(function(){this.L("Failed to set custom receivers.")},this));
var b=jl(this);b!=a&&this.u("yt-remote-cast2-availability-change",b)}};
X.prototype.setLaunchParams=X.prototype.pe;X.prototype.setConnectedScreenStatus=X.prototype.oe;X.prototype.stopSession=X.prototype.Ce;X.prototype.getCastSession=X.prototype.Be;X.prototype.requestSession=X.prototype.requestSession;X.prototype.init=X.prototype.init;X.prototype.dispose=X.prototype.dispose;function nl(a,b,c){ol()?ql(a)&&(rl(!0),window.chrome&&chrome.cast&&chrome.cast.isAvailable?sl(b):(window.__onGCastApiAvailable=function(a,c){a?sl(b):(tl("Failed to load cast API: "+c),ul(!1),rl(!1),gf("yt-remote-cast-available"),gf("yt-remote-cast-receiver"),vl(),b(!1))},c?qc("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"):Jj())):pl("Cannot initialize because not running Chrome")}
function vl(){pl("dispose");var a=wl();a&&a.dispose();xl=null;q("yt.mdx.remote.cloudview.instance_",null,void 0);yl(!1);mc(zl);zl.length=0}
function Al(){return!!P("yt-remote-cast-installed")}
function Bl(){var a=P("yt-remote-cast-receiver");a?(a=a.friendlyName,a=-1!=a.indexOf("&")?"document"in l?za(a):Ba(a):a):a=null;return a}
function Cl(){pl("clearCurrentReciever");gf("yt-remote-cast-receiver")}
function Dl(){Al()?wl()?El()?(pl("Requesting cast selector."),xl.requestSession()):(pl("Wait for cast API to be ready to request the session."),zl.push(kc("yt-remote-cast2-api-ready",Dl))):tl("requestCastSelector: Cast is not initialized."):tl("requestCastSelector: Cast API is not installed!")}
function Fl(a){El()?wl().setLaunchParams(a):tl("setLaunchParams called before ready.")}
function Gl(a,b){El()?wl().setConnectedScreenStatus(a,b):tl("setConnectedScreenStatus called before ready.")}
var xl=null;function ol(){var a;a=0<=lb.search(/\ (CrMo|Chrome|CriOS)\//);return of||a}
function ql(a){var b=!1;if(!xl){var c=r("yt.mdx.remote.cloudview.instance_");c||(c=new X(a),c.subscribe("yt-remote-cast2-availability-change",function(a){O("yt-remote-cast-available",a);K("yt-remote-cast2-availability-change",a)}),c.subscribe("yt-remote-cast2-receiver-selected",function(a){pl("onReceiverSelected: "+a.friendlyName);
O("yt-remote-cast-receiver",a);K("yt-remote-cast2-receiver-selected",a)}),c.subscribe("yt-remote-cast2-receiver-resumed",function(a){pl("onReceiverResumed: "+a.friendlyName);
O("yt-remote-cast-receiver",a)}),c.subscribe("yt-remote-cast2-session-change",function(a){pl("onSessionChange: "+bk(a));
a||gf("yt-remote-cast-receiver");K("yt-remote-cast2-session-change",a)}),q("yt.mdx.remote.cloudview.instance_",c,void 0),b=!0);
xl=c}pl("cloudview.createSingleton_: "+b);return b}
function wl(){xl||(xl=r("yt.mdx.remote.cloudview.instance_"));return xl}
function sl(a){ul(!0);rl(!1);xl.init(!0,function(b){b?(yl(!0),K("yt-remote-cast2-api-ready")):(tl("Failed to initialize cast API."),ul(!1),gf("yt-remote-cast-available"),gf("yt-remote-cast-receiver"),vl());a(b)})}
function pl(a){Tj("cloudview",a)}
function tl(a){Tj("cloudview",a)}
function ul(a){pl("setCastInstalled_ "+a);O("yt-remote-cast-installed",a)}
function El(){return!!r("yt.mdx.remote.cloudview.apiReady_")}
function yl(a){pl("setApiReady_ "+a);q("yt.mdx.remote.cloudview.apiReady_",a,void 0)}
function rl(a){q("yt.mdx.remote.cloudview.initializing_",a,void 0)}
var zl=[];function Hl(a,b){this.action=a;this.params=b||null}
;function Il(){this.b=y()}
new Il;Il.prototype.set=function(a){this.b=a};
Il.prototype.reset=function(){this.set(y())};
Il.prototype.get=function(){return this.b};function Jl(a,b){this.type=a;this.b=this.target=b;this.defaultPrevented=this.f=!1;this.Cc=!0}
Jl.prototype.stopPropagation=function(){this.f=!0};
Jl.prototype.preventDefault=function(){this.defaultPrevented=!0;this.Cc=!1};var Kl=!L||kd(9),Ll=L&&!jd("9");!bd||jd("528");ad&&jd("1.9b")||L&&jd("8")||Zc&&jd("9.5")||bd&&jd("528");ad&&!jd("8")||L&&jd("9");function Ml(a,b){Jl.call(this,a?a.type:"");this.relatedTarget=this.b=this.target=null;this.charCode=this.keyCode=this.button=this.clientY=this.clientX=0;this.shiftKey=this.altKey=this.ctrlKey=!1;this.g=this.state=null;a&&this.init(a,b)}
z(Ml,Jl);
Ml.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.b=b;var e=a.relatedTarget;if(e){if(ad){var f;a:{try{Wc(e.nodeName);f=!0;break a}catch(h){}f=!1}f||(e=null)}}else"mouseover"==c?e=a.fromElement:"mouseout"==c&&(e=a.toElement);this.relatedTarget=e;null===d?(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=
void 0!==d.clientY?d.clientY:d.pageY);this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.state=a.state;this.g=a;a.defaultPrevented&&this.preventDefault()};
Ml.prototype.stopPropagation=function(){Ml.B.stopPropagation.call(this);this.g.stopPropagation?this.g.stopPropagation():this.g.cancelBubble=!0};
Ml.prototype.preventDefault=function(){Ml.B.preventDefault.call(this);var a=this.g;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ll)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Nl="closure_listenable_"+(1E6*Math.random()|0),Ol=0;function Pl(a,b,c,d,e){this.listener=a;this.b=null;this.src=b;this.type=c;this.lb=!!d;this.pb=e;this.key=++Ol;this.Qa=this.kb=!1}
function Ql(a){a.Qa=!0;a.listener=null;a.b=null;a.src=null;a.pb=null}
;function Rl(a){this.src=a;this.b={};this.f=0}
function Sl(a,b,c,d,e){var f=b.toString();b=a.b[f];b||(b=a.b[f]=[],a.f++);var h=Tl(b,c,d,e);-1<h?(a=b[h],a.kb=!1):(a=new Pl(c,a.src,f,!!d,e),a.kb=!1,b.push(a));return a}
Rl.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.b))return!1;var e=this.b[a];b=Tl(e,b,c,d);return-1<b?(Ql(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.b[a],this.f--),!0):!1};
function Ul(a,b){var c=b.type;c in a.b&&Pa(a.b[c],b)&&(Ql(b),0==a.b[c].length&&(delete a.b[c],a.f--))}
function Vl(a,b,c,d,e){a=a.b[b.toString()];b=-1;a&&(b=Tl(a,c,d,e));return-1<b?a[b]:null}
function Tl(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Qa&&f.listener==b&&f.lb==!!c&&f.pb==d)return e}return-1}
;var Wl="closure_lm_"+(1E6*Math.random()|0),Xl={},Yl=0;
function Zl(a,b,c,d,e){if(v(b)){for(var f=0;f<b.length;f++)Zl(a,b[f],c,d,e);return null}c=$l(c);if(a&&a[Nl])a=a.qb(b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,h=am(a);h||(a[Wl]=h=new Rl(a));c=Sl(h,b,c,d,e);if(!c.b){d=bm();c.b=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,f);else if(a.attachEvent)a.attachEvent(cm(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");Yl++}a=c}return a}
function bm(){var a=dm,b=Kl?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);
if(!c)return c};
return b}
function em(a,b,c,d,e){if(v(b))for(var f=0;f<b.length;f++)em(a,b[f],c,d,e);else c=$l(c),a&&a[Nl]?a.zb(b,c,d,e):a&&(a=am(a))&&(b=Vl(a,b,c,!!d,e))&&fm(b)}
function fm(a){if(!ea(a)&&a&&!a.Qa){var b=a.src;if(b&&b[Nl])Ul(b.g,a);else{var c=a.type,d=a.b;b.removeEventListener?b.removeEventListener(c,d,a.lb):b.detachEvent&&b.detachEvent(cm(c),d);Yl--;(c=am(b))?(Ul(c,a),0==c.f&&(c.src=null,b[Wl]=null)):Ql(a)}}}
function cm(a){return a in Xl?Xl[a]:Xl[a]="on"+a}
function gm(a,b,c,d){var e=!0;if(a=am(a))if(b=a.b[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.lb==c&&!f.Qa&&(f=hm(f,d),e=e&&!1!==f)}return e}
function hm(a,b){var c=a.listener,d=a.pb||a.src;a.kb&&fm(a);return c.call(d,b)}
function dm(a,b){if(a.Qa)return!0;if(!Kl){var c=b||r("window.event"),d=new Ml(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(m){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.b;f;f=f.parentNode)c.push(f);for(var f=a.type,h=c.length-1;!d.f&&0<=h;h--){d.b=c[h];var k=gm(c[h],f,!0,d),e=e&&k}for(h=0;!d.f&&h<c.length;h++)d.b=c[h],k=gm(c[h],f,!1,d),e=e&&k}return e}return hm(a,new Ml(b,this))}
function am(a){a=a[Wl];return a instanceof Rl?a:null}
var im="__closure_events_fn_"+(1E9*Math.random()>>>0);function $l(a){if(fa(a))return a;a[im]||(a[im]=function(b){return a.handleEvent(b)});
return a[im]}
;function jm(){E.call(this);this.g=new Rl(this);this.sa=this;this.Y=null}
z(jm,E);jm.prototype[Nl]=!0;g=jm.prototype;g.addEventListener=function(a,b,c,d){Zl(this,a,b,c,d)};
g.removeEventListener=function(a,b,c,d){em(this,a,b,c,d)};
function km(a,b){var c,d=a.Y;if(d){c=[];for(var e=1;d;d=d.Y)c.push(d),++e}var d=a.sa,e=b,f=e.type||e;if(w(e))e=new Jl(e,d);else if(e instanceof Jl)e.target=e.target||d;else{var h=e,e=new Jl(f,d);kb(e,h)}var h=!0,k;if(c)for(var m=c.length-1;!e.f&&0<=m;m--)k=e.b=c[m],h=lm(k,f,!0,e)&&h;e.f||(k=e.b=d,h=lm(k,f,!0,e)&&h,e.f||(h=lm(k,f,!1,e)&&h));if(c)for(m=0;!e.f&&m<c.length;m++)k=e.b=c[m],h=lm(k,f,!1,e)&&h}
g.w=function(){jm.B.w.call(this);if(this.g){var a=this.g,b=0,c;for(c in a.b){for(var d=a.b[c],e=0;e<d.length;e++)++b,Ql(d[e]);delete a.b[c];a.f--}}this.Y=null};
g.qb=function(a,b,c,d){return Sl(this.g,String(a),b,c,d)};
g.zb=function(a,b,c,d){return this.g.remove(String(a),b,c,d)};
function lm(a,b,c,d){b=a.g.b[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var h=b[f];if(h&&!h.Qa&&h.lb==c){var k=h.listener,m=h.pb||h.src;h.kb&&Ul(a.g,h);e=!1!==k.call(m,d)&&e}}return e&&0!=d.Cc}
;function mm(a,b){this.f=new rd(a);this.b=b?pd:od}
mm.prototype.stringify=function(a){return qd(this.f,a)};
mm.prototype.parse=function(a){return this.b(a)};function nm(a,b){jm.call(this);this.b=a||1;this.f=b||l;this.i=x(this.re,this);this.j=y()}
z(nm,jm);g=nm.prototype;g.enabled=!1;g.da=null;function om(a,b){a.b=b;a.da&&a.enabled?(a.stop(),a.start()):a.da&&a.stop()}
g.re=function(){if(this.enabled){var a=y()-this.j;0<a&&a<.8*this.b?this.da=this.f.setTimeout(this.i,this.b-a):(this.da&&(this.f.clearTimeout(this.da),this.da=null),km(this,"tick"),this.enabled&&(this.da=this.f.setTimeout(this.i,this.b),this.j=y()))}};
g.start=function(){this.enabled=!0;this.da||(this.da=this.f.setTimeout(this.i,this.b),this.j=y())};
g.stop=function(){this.enabled=!1;this.da&&(this.f.clearTimeout(this.da),this.da=null)};
g.w=function(){nm.B.w.call(this);this.stop();delete this.f};
function pm(a,b,c){if(fa(a))c&&(a=x(a,c));else if(a&&"function"==typeof a.handleEvent)a=x(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)}
;function qm(a,b,c){E.call(this);this.i=null!=c?x(a,c):a;this.g=b;this.f=x(this.Td,this);this.b=[]}
z(qm,E);g=qm.prototype;g.Ra=!1;g.eb=0;g.Ba=null;g.hd=function(a){this.b=arguments;this.Ba||this.eb?this.Ra=!0:rm(this)};
g.stop=function(){this.Ba&&(l.clearTimeout(this.Ba),this.Ba=null,this.Ra=!1,this.b=[])};
g.pause=function(){this.eb++};
g.resume=function(){this.eb--;this.eb||!this.Ra||this.Ba||(this.Ra=!1,rm(this))};
g.w=function(){qm.B.w.call(this);this.stop()};
g.Td=function(){this.Ba=null;this.Ra&&!this.eb&&(this.Ra=!1,rm(this))};
function rm(a){a.Ba=pm(a.f,a.g);a.i.apply(null,a.b)}
;function sm(a){E.call(this);this.f=a;this.b={}}
z(sm,E);var tm=[];sm.prototype.qb=function(a,b,c,d){v(b)||(b&&(tm[0]=b.toString()),b=tm);for(var e=0;e<b.length;e++){var f=Zl(a,b[e],c||this.handleEvent,d||!1,this.f||this);if(!f)break;this.b[f.key]=f}return this};
sm.prototype.zb=function(a,b,c,d,e){if(v(b))for(var f=0;f<b.length;f++)this.zb(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.f||this,c=$l(c),d=!!d,b=a&&a[Nl]?Vl(a.g,String(b),c,d,e):a?(a=am(a))?Vl(a,b,c,d,e):null:null,b&&(fm(b),delete this.b[b.key]);return this};
function um(a){Xa(a.b,function(a,c){this.b.hasOwnProperty(c)&&fm(a)},a);
a.b={}}
sm.prototype.w=function(){sm.B.w.call(this);um(this)};
sm.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};function vm(){}
vm.prototype.f=null;vm.prototype.b=u;function wm(a){return a.f||(a.f=a.i())}
vm.prototype.i=u;var xm;function ym(){}
z(ym,vm);ym.prototype.b=function(){var a=zm(this);return a?new ActiveXObject(a):new XMLHttpRequest};
ym.prototype.i=function(){var a={};zm(this)&&(a[0]=!0,a[1]=!0);return a};
function zm(a){if(!a.g&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.g=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.g}
xm=new ym;function Am(a,b,c,d,e){this.b=a;this.g=c;this.A=d;this.l=e||1;this.j=45E3;this.i=new sm(this);this.f=new nm;om(this.f,250)}
g=Am.prototype;g.Ca=null;g.ia=!1;g.Ta=null;g.Vb=null;g.fb=null;g.Sa=null;g.ta=null;g.wa=null;g.Ha=null;g.N=null;g.ib=0;g.ja=null;g.Bb=null;g.Da=null;g.bb=-1;g.Dc=!0;g.ya=!1;g.Nb=0;g.vb=null;var Bm={},Cm={};g=Am.prototype;g.setTimeout=function(a){this.j=a};
function Dm(a,b,c){a.Sa=1;a.ta=ah(b.clone());a.Ha=c;a.o=!0;Em(a,null)}
function Fm(a,b,c,d,e){a.Sa=1;a.ta=ah(b.clone());a.Ha=null;a.o=c;e&&(a.Dc=!1);Em(a,d)}
function Em(a,b){a.fb=y();Gm(a);a.wa=a.ta.clone();Zg(a.wa,"t",a.l);a.ib=0;a.N=a.b.Gb(a.b.gb()?b:null);0<a.Nb&&(a.vb=new qm(x(a.Ic,a,a.N),a.Nb));a.i.qb(a.N,"readystatechange",a.de);var c=a.Ca?hb(a.Ca):{};a.Ha?(a.Bb="POST",c["Content-Type"]="application/x-www-form-urlencoded",a.N.send(a.wa,a.Bb,a.Ha,c)):(a.Bb="GET",a.Dc&&!bd&&(c.Connection="close"),a.N.send(a.wa,a.Bb,null,c));a.b.ha(1)}
g.de=function(a){a=a.target;var b=this.vb;b&&3==Hm(a)?b.hd():this.Ic(a)};
g.Ic=function(a){try{if(a==this.N)a:{var b=Hm(this.N),c=this.N.j,d=this.N.getStatus();if(L&&!kd(10)||bd&&!jd("420+")){if(4>b)break a}else if(3>b||3==b&&!Zc&&!Im(this.N))break a;this.ya||4!=b||7==c||(8==c||0>=d?this.b.ha(3):this.b.ha(2));Jm(this);var e=this.N.getStatus();this.bb=e;var f=Im(this.N);(this.ia=200==e)?(4==b&&Km(this),this.o?(Lm(this,b,f),Zc&&this.ia&&3==b&&(this.i.qb(this.f,"tick",this.be),this.f.start())):Mm(this,f),this.ia&&!this.ya&&(4==b?this.b.sb(this):(this.ia=!1,Gm(this)))):(this.Da=
400==e&&0<f.indexOf("Unknown SID")?3:0,Y(),Km(this),Nm(this))}}catch(h){}finally{}};
function Lm(a,b,c){for(var d=!0;!a.ya&&a.ib<c.length;){var e=Om(a,c);if(e==Cm){4==b&&(a.Da=4,Y(),d=!1);break}else if(e==Bm){a.Da=4;Y();d=!1;break}else Mm(a,e)}4==b&&0==c.length&&(a.Da=1,Y(),d=!1);a.ia=a.ia&&d;d||(Km(a),Nm(a))}
g.be=function(){var a=Hm(this.N),b=Im(this.N);this.ib<b.length&&(Jm(this),Lm(this,a,b),this.ia&&4!=a&&Gm(this))};
function Om(a,b){var c=a.ib,d=b.indexOf("\n",c);if(-1==d)return Cm;c=Number(b.substring(c,d));if(isNaN(c))return Bm;d+=1;if(d+c>b.length)return Cm;var e=b.substr(d,c);a.ib=d+c;return e}
function Pm(a,b){a.fb=y();Gm(a);var c=b?window.location.hostname:"";a.wa=a.ta.clone();Q(a.wa,"DOMAIN",c);Q(a.wa,"t",a.l);try{a.ja=new ActiveXObject("htmlfile")}catch(n){Km(a);a.Da=7;Y();Nm(a);return}var d="<html><body>";if(b){for(var e="",f=0;f<c.length;f++){var h=c.charAt(f);if("<"==h)e+="\\x3c";else if(">"==h)e+="\\x3e";else{if(h in Da)h=Da[h];else if(h in Ca)h=Da[h]=Ca[h];else{var k,m=h.charCodeAt(0);if(31<m&&127>m)k=h;else{if(256>m){if(k="\\x",16>m||256<m)k+="0"}else k="\\u",4096>m&&(k+="0");
k+=m.toString(16).toUpperCase()}h=Da[h]=k}e+=h}}d+='<script>document.domain="'+e+'"\x3c/script>'}c=Ab(d+"</body></html>");a.ja.open();a.ja.write(zb(c));a.ja.close();a.ja.parentWindow.m=x(a.Xd,a);a.ja.parentWindow.d=x(a.zc,a,!0);a.ja.parentWindow.rpcClose=x(a.zc,a,!1);c=a.ja.createElement("DIV");a.ja.parentWindow.document.body.appendChild(c);d=tb(a.wa.toString());d=rb(d);ya.test(d)&&(-1!=d.indexOf("&")&&(d=d.replace(sa,"&amp;")),-1!=d.indexOf("<")&&(d=d.replace(ta,"&lt;")),-1!=d.indexOf(">")&&(d=d.replace(ua,
"&gt;")),-1!=d.indexOf('"')&&(d=d.replace(va,"&quot;")),-1!=d.indexOf("'")&&(d=d.replace(wa,"&#39;")),-1!=d.indexOf("\x00")&&(d=d.replace(xa,"&#0;")));d=Ab('<iframe src="'+d+'"></iframe>');c.innerHTML=zb(d);a.b.ha(1)}
g.Xd=function(a){Qm(x(this.Wd,this,a),0)};
g.Wd=function(a){this.ya||(Jm(this),Mm(this,a),Gm(this))};
g.zc=function(a){Qm(x(this.Vd,this,a),0)};
g.Vd=function(a){this.ya||(Km(this),this.ia=a,this.b.sb(this),this.b.ha(4))};
g.cancel=function(){this.ya=!0;Km(this)};
function Gm(a){a.Vb=y()+a.j;Rm(a,a.j)}
function Rm(a,b){if(null!=a.Ta)throw Error("WatchDog timer not null");a.Ta=Qm(x(a.Zd,a),b)}
function Jm(a){a.Ta&&(l.clearTimeout(a.Ta),a.Ta=null)}
g.Zd=function(){this.Ta=null;var a=y();0<=a-this.Vb?(2!=this.Sa&&this.b.ha(3),Km(this),this.Da=2,Y(),Nm(this)):Rm(this,this.Vb-a)};
function Nm(a){a.b.lc()||a.ya||a.b.sb(a)}
function Km(a){Jm(a);F(a.vb);a.vb=null;a.f.stop();um(a.i);if(a.N){var b=a.N;a.N=null;Sm(b);b.dispose()}a.ja&&(a.ja=null)}
function Mm(a,b){try{a.b.tc(a,b),a.b.ha(4)}catch(c){}}
;function Tm(a,b,c,d,e){if(0==d)c(!1);else{var f=e||0;d--;Um(a,b,function(e){e?c(!0):l.setTimeout(function(){Tm(a,b,c,d,f)},f)})}}
function Um(a,b,c){var d=new Image;d.onload=function(){try{Vm(d),c(!0)}catch(a){}};
d.onerror=function(){try{Vm(d),c(!1)}catch(a){}};
d.onabort=function(){try{Vm(d),c(!1)}catch(a){}};
d.ontimeout=function(){try{Vm(d),c(!1)}catch(a){}};
l.setTimeout(function(){if(d.ontimeout)d.ontimeout()},b);
d.src=a}
function Vm(a){a.onload=null;a.onerror=null;a.onabort=null;a.ontimeout=null}
;function Wm(a){this.b=a;this.f=new mm(null,!0)}
g=Wm.prototype;g.Lb=null;g.ba=null;g.wb=!1;g.Gc=null;g.mb=null;g.Qb=null;g.Mb=null;g.ea=null;g.ra=-1;g.ab=null;g.Xa=null;g.connect=function(a){this.Mb=a;a=Xm(this.b,null,this.Mb);Y();this.Gc=y();var b=this.b.A;null!=b?(this.ab=b[0],(this.Xa=b[1])?(this.ea=1,Ym(this)):(this.ea=2,Zm(this))):(Zg(a,"MODE","init"),this.ba=new Am(this,0,void 0,void 0,void 0),this.ba.Ca=this.Lb,Fm(this.ba,a,!1,null,!0),this.ea=0)};
function Ym(a){var b=Xm(a.b,a.Xa,"/mail/images/cleardot.gif");ah(b);Tm(b.toString(),5E3,x(a.dd,a),3,2E3);a.ha(1)}
g.dd=function(a){if(a)this.ea=2,Zm(this);else{Y();var b=this.b;b.ga=b.ua.ra;$m(b,9)}a&&this.ha(2)};
function Zm(a){var b=a.b.R;if(null!=b)Y(),b?(Y(),an(a.b,a,!1)):(Y(),an(a.b,a,!0));else if(a.ba=new Am(a,0,void 0,void 0,void 0),a.ba.Ca=a.Lb,b=a.b,b=Xm(b,b.gb()?a.ab:null,a.Mb),Y(),!L||kd(10))Zg(b,"TYPE","xmlhttp"),Fm(a.ba,b,!1,a.ab,!1);else{Zg(b,"TYPE","html");var c=a.ba;a=!!a.ab;c.Sa=3;c.ta=ah(b.clone());Pm(c,a)}}
g.Gb=function(a){return this.b.Gb(a)};
g.lc=function(){return!1};
g.tc=function(a,b){this.ra=a.bb;if(0==this.ea)if(b){try{var c=this.f.parse(b)}catch(d){c=this.b;c.ga=this.ra;$m(c,2);return}this.ab=c[0];this.Xa=c[1]}else c=this.b,c.ga=this.ra,$m(c,2);else if(2==this.ea)if(this.wb)Y(),this.Qb=y();else if("11111"==b){if(Y(),this.wb=!0,this.mb=y(),c=this.mb-this.Gc,!L||kd(10)||500>c)this.ra=200,this.ba.cancel(),Y(),an(this.b,this,!0)}else Y(),this.mb=this.Qb=y(),this.wb=!1};
g.sb=function(){this.ra=this.ba.bb;if(this.ba.ia)0==this.ea?this.Xa?(this.ea=1,Ym(this)):(this.ea=2,Zm(this)):2==this.ea&&((!L||kd(10)?!this.wb:200>this.Qb-this.mb)?(Y(),an(this.b,this,!1)):(Y(),an(this.b,this,!0)));else{0==this.ea?Y():2==this.ea&&Y();var a=this.b;a.ga=this.ra;$m(a,2)}};
g.gb=function(){return this.b.gb()};
g.isActive=function(){return this.b.isActive()};
g.ha=function(a){this.b.ha(a)};function bn(a){jm.call(this);this.headers=new Hc;this.I=a||null;this.f=!1;this.G=this.b=null;this.X="";this.j=0;this.o="";this.i=this.O=this.l=this.M=!1;this.F=0;this.A=null;this.oa="";this.ca=this.la=!1}
z(bn,jm);var cn=/^https?$/i,dn=["POST","PUT"];g=bn.prototype;
g.send=function(a,b,c,d){if(this.b)throw Error("[goog.net.XhrIo] Object is active with another request="+this.X+"; newUri="+a);b=b?b.toUpperCase():"GET";this.X=a;this.o="";this.j=0;this.M=!1;this.f=!0;this.b=this.I?this.I.b():xm.b();this.G=this.I?wm(this.I):wm(xm);this.b.onreadystatechange=x(this.sc,this);try{this.getStatus(),this.O=!0,this.b.open(b,String(a),!0),this.O=!1}catch(f){this.getStatus();en(this,f);return}a=c||"";var e=this.headers.clone();d&&Oc(d,function(a,b){e.set(b,a)});
d=Ma(e.na(),fn);c=l.FormData&&a instanceof l.FormData;!B(dn,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.b.setRequestHeader(b,a)},this);
this.oa&&(this.b.responseType=this.oa);"withCredentials"in this.b&&this.b.withCredentials!==this.la&&(this.b.withCredentials=this.la);try{gn(this),0<this.F&&(this.ca=hn(this.b),this.getStatus(),this.ca?(this.b.timeout=this.F,this.b.ontimeout=x(this.kc,this)):this.A=pm(this.kc,this.F,this)),this.getStatus(),this.l=!0,this.b.send(a),this.l=!1}catch(f){this.getStatus(),en(this,f)}};
function hn(a){return L&&jd(9)&&ea(a.timeout)&&p(a.ontimeout)}
function fn(a){return"content-type"==a.toLowerCase()}
g.kc=function(){"undefined"!=typeof aa&&this.b&&(this.o="Timed out after "+this.F+"ms, aborting",this.j=8,this.getStatus(),km(this,"timeout"),Sm(this,8))};
function en(a,b){a.f=!1;a.b&&(a.i=!0,a.b.abort(),a.i=!1);a.o=b;a.j=5;jn(a);kn(a)}
function jn(a){a.M||(a.M=!0,km(a,"complete"),km(a,"error"))}
function Sm(a,b){a.b&&a.f&&(a.getStatus(),a.f=!1,a.i=!0,a.b.abort(),a.i=!1,a.j=b||7,km(a,"complete"),km(a,"abort"),kn(a))}
g.w=function(){this.b&&(this.f&&(this.f=!1,this.i=!0,this.b.abort(),this.i=!1),kn(this,!0));bn.B.w.call(this)};
g.sc=function(){this.C()||(this.O||this.l||this.i?ln(this):this.Ld())};
g.Ld=function(){ln(this)};
function ln(a){if(a.f&&"undefined"!=typeof aa)if(a.G[1]&&4==Hm(a)&&2==a.getStatus())a.getStatus();else if(a.l&&4==Hm(a))pm(a.sc,0,a);else if(km(a,"readystatechange"),4==Hm(a)){a.getStatus();a.f=!1;try{var b=a.getStatus(),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=zd(1,String(a.X));if(!f&&l.self&&l.self.location)var h=l.self.location.protocol,f=h.substr(0,h.length-1);e=!cn.test(f?f.toLowerCase():"")}d=
e}if(d)km(a,"complete"),km(a,"success");else{a.j=6;var k;try{k=2<Hm(a)?a.b.statusText:""}catch(m){k=""}a.o=k+" ["+a.getStatus()+"]";jn(a)}}finally{kn(a)}}}
function kn(a,b){if(a.b){gn(a);var c=a.b,d=a.G[0]?t:null;a.b=null;a.G=null;b||km(a,"ready");try{c.onreadystatechange=d}catch(e){}}}
function gn(a){a.b&&a.ca&&(a.b.ontimeout=null);ea(a.A)&&(l.clearTimeout(a.A),a.A=null)}
g.isActive=function(){return!!this.b};
function Hm(a){return a.b?a.b.readyState:0}
g.getStatus=function(){try{return 2<Hm(this)?this.b.status:-1}catch(a){return-1}};
function Im(a){try{return a.b?a.b.responseText:""}catch(b){return""}}
;function mn(a,b,c){this.l=a||null;this.b=1;this.f=[];this.i=[];this.j=new mm(null,!0);this.A=b||null;this.R=null!=c?c:null}
function nn(a,b){this.f=a;this.b=b;this.context=null}
g=mn.prototype;g.Za=null;g.W=null;g.K=null;g.Kb=null;g.nb=null;g.bc=null;g.ob=null;g.cb=0;g.wd=0;g.P=null;g.va=null;g.qa=null;g.Aa=null;g.ua=null;g.Ab=null;g.Oa=-1;g.mc=-1;g.ga=-1;g.$a=0;g.Na=0;g.za=8;var on=new jm;function pn(a){Jl.call(this,"statevent",a)}
z(pn,Jl);function qn(a,b){Jl.call(this,"timingevent",a);this.size=b}
z(qn,Jl);function rn(a){Jl.call(this,"serverreachability",a)}
z(rn,Jl);g=mn.prototype;g.connect=function(a,b,c,d,e){Y();this.Kb=b;this.Za=c||{};d&&p(e)&&(this.Za.OSID=d,this.Za.OAID=e);this.ua=new Wm(this);this.ua.Lb=null;this.ua.f=this.j;this.ua.connect(a)};
function sn(a){tn(a);if(3==a.b){var b=a.cb++,c=a.nb.clone();Q(c,"SID",a.g);Q(c,"RID",b);Q(c,"TYPE","terminate");un(a,c);b=new Am(a,0,a.g,b,void 0);b.Sa=2;b.ta=ah(c.clone());(new Image).src=b.ta;b.fb=y();Gm(b)}vn(a)}
function tn(a){if(a.ua){var b=a.ua;b.ba&&(b.ba.cancel(),b.ba=null);b.ra=-1;a.ua=null}a.K&&(a.K.cancel(),a.K=null);a.qa&&(l.clearTimeout(a.qa),a.qa=null);wn(a);a.W&&(a.W.cancel(),a.W=null);a.va&&(l.clearTimeout(a.va),a.va=null)}
function xn(a,b){if(0==a.b)throw Error("Invalid operation: sending map when state is closed");a.f.push(new nn(a.wd++,b));2!=a.b&&3!=a.b||yn(a)}
g.lc=function(){return 0==this.b};
function yn(a){a.W||a.va||(a.va=Qm(x(a.yc,a),0),a.$a=0)}
g.yc=function(a){this.va=null;zn(this,a)};
function zn(a,b){if(1==a.b){if(!b){a.cb=Math.floor(1E5*Math.random());var c=a.cb++,d=new Am(a,0,"",c,void 0);d.Ca=null;var e=An(a),f=a.nb.clone();Q(f,"RID",c);a.l&&Q(f,"CVER",a.l);un(a,f);Dm(d,f,e);a.W=d;a.b=2}}else 3==a.b&&(b?Bn(a,b):0!=a.f.length&&(a.W||Bn(a)))}
function Bn(a,b){var c,d;b?6<a.za?(a.f=a.i.concat(a.f),a.i.length=0,c=a.cb-1,d=An(a)):(c=b.A,d=b.Ha):(c=a.cb++,d=An(a));var e=a.nb.clone();Q(e,"SID",a.g);Q(e,"RID",c);Q(e,"AID",a.Oa);un(a,e);c=new Am(a,0,a.g,c,a.$a+1);c.Ca=null;c.setTimeout(Math.round(1E4)+Math.round(1E4*Math.random()));a.W=c;Dm(c,e,d)}
function un(a,b){if(a.P){var c=a.P.ic(a);c&&Xa(c,function(a,c){Q(b,c,a)})}}
function An(a){var b=Math.min(a.f.length,1E3),c=["count="+b],d;6<a.za&&0<b?(d=a.f[0].f,c.push("ofs="+d)):d=0;for(var e=0;e<b;e++){var f=a.f[e].f,h=a.f[e].b,f=6>=a.za?e:f-d;try{Oc(h,function(a,b){c.push("req"+f+"_"+b+"="+encodeURIComponent(a))})}catch(k){c.push("req"+f+"_type="+encodeURIComponent("_badmap"))}}a.i=a.i.concat(a.f.splice(0,b));
return c.join("&")}
function Cn(a){a.K||a.qa||(a.o=1,a.qa=Qm(x(a.xc,a),0),a.Na=0)}
function Dn(a){if(a.K||a.qa||3<=a.Na)return!1;a.o++;a.qa=Qm(x(a.xc,a),En(a,a.Na));a.Na++;return!0}
g.xc=function(){this.qa=null;this.K=new Am(this,0,this.g,"rpc",this.o);this.K.Ca=null;this.K.Nb=0;var a=this.bc.clone();Q(a,"RID","rpc");Q(a,"SID",this.g);Q(a,"CI",this.Ab?"0":"1");Q(a,"AID",this.Oa);un(this,a);if(!L||kd(10))Q(a,"TYPE","xmlhttp"),Fm(this.K,a,!0,this.ob,!1);else{Q(a,"TYPE","html");var b=this.K,c=!!this.ob;b.Sa=3;b.ta=ah(a.clone());Pm(b,c)}};
function an(a,b,c){a.Ab=c;a.ga=b.ra;a.gd(1,0);a.nb=Xm(a,null,a.Kb);yn(a)}
g.tc=function(a,b){if(0!=this.b&&(this.K==a||this.W==a))if(this.ga=a.bb,this.W==a&&3==this.b)if(7<this.za){var c;try{c=this.j.parse(b)}catch(f){c=null}if(v(c)&&3==c.length)if(0==c[0])a:{if(!this.qa){if(this.K)if(this.K.fb+3E3<this.W.fb)wn(this),this.K.cancel(),this.K=null;else break a;Dn(this);Y()}}else this.mc=c[1],0<this.mc-this.Oa&&37500>c[2]&&this.Ab&&0==this.Na&&!this.Aa&&(this.Aa=Qm(x(this.xd,this),6E3));else $m(this,11)}else b!=zf.Ie.b&&$m(this,11);else if(this.K==a&&wn(this),!/^[\s\xa0]*$/.test(b)){c=
this.j.parse(b);v(c);for(var d=0;d<c.length;d++){var e=c[d];this.Oa=e[0];e=e[1];2==this.b?"c"==e[0]?(this.g=e[1],this.ob=e[2],e=e[3],null!=e?this.za=e:this.za=6,this.b=3,this.P&&this.P.gc(this),this.bc=Xm(this,this.gb()?this.ob:null,this.Kb),Cn(this)):"stop"==e[0]&&$m(this,7):3==this.b&&("stop"==e[0]?$m(this,7):"noop"!=e[0]&&this.P&&this.P.fc(this,e),this.Na=0)}}};
g.xd=function(){null!=this.Aa&&(this.Aa=null,this.K.cancel(),this.K=null,Dn(this),Y())};
function wn(a){null!=a.Aa&&(l.clearTimeout(a.Aa),a.Aa=null)}
g.sb=function(a){var b;if(this.K==a)wn(this),this.K=null,b=2;else if(this.W==a)this.W=null,b=1;else return;this.ga=a.bb;if(0!=this.b)if(a.ia)1==b?(y(),km(on,new qn(on,a.Ha?a.Ha.length:0)),yn(this),this.i.length=0):Cn(this);else{var c=a.Da,d;if(!(d=3==c||7==c||0==c&&0<this.ga)){if(d=1==b)this.W||this.va||1==this.b||2<=this.$a?d=!1:(this.va=Qm(x(this.yc,this,a),En(this,this.$a)),this.$a++,d=!0);d=!(d||2==b&&Dn(this))}if(d)switch(c){case 1:$m(this,5);break;case 4:$m(this,10);break;case 3:$m(this,6);
break;case 7:$m(this,12);break;default:$m(this,2)}}};
function En(a,b){var c=5E3+Math.floor(1E4*Math.random());a.isActive()||(c*=2);return c*b}
g.gd=function(a){if(!B(arguments,this.b))throw Error("Unexpected channel state: "+this.b);};
function $m(a,b){if(2==b||9==b){var c=null;a.P&&(c=null);var d=x(a.qe,a);c||(c=new Lg("//www.google.com/images/cleardot.gif"),ah(c));Um(c.toString(),1E4,d)}else Y();Fn(a,b)}
g.qe=function(a){a?Y():(Y(),Fn(this,8))};
function Fn(a,b){a.b=0;a.P&&a.P.ec(a,b);vn(a);tn(a)}
function vn(a){a.b=0;a.ga=-1;if(a.P)if(0==a.i.length&&0==a.f.length)a.P.Eb(a);else{var b=Sa(a.i),c=Sa(a.f);a.i.length=0;a.f.length=0;a.P.Eb(a,b,c)}}
function Xm(a,b,c){var d=bh(c);if(""!=d.f)b&&Ng(d,b+"."+d.f),Og(d,d.l);else var e=window.location,d=ch(e.protocol,b?b+"."+e.hostname:e.hostname,e.port,c);a.Za&&Xa(a.Za,function(a,b){Q(d,b,a)});
Q(d,"VER",a.za);un(a,d);return d}
g.Gb=function(a){if(a)throw Error("Can't create secondary domain capable XhrIo object.");a=new bn;a.la=!1;return a};
g.isActive=function(){return!!this.P&&this.P.isActive(this)};
function Qm(a,b){if(!fa(a))throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},b)}
g.ha=function(){km(on,new rn(on))};
function Y(){km(on,new pn(on))}
g.gb=function(){return!(!L||kd(10))};
function Gn(){}
g=Gn.prototype;g.gc=function(){};
g.fc=function(){};
g.ec=function(){};
g.Eb=function(){};
g.ic=function(){return{}};
g.isActive=function(){return!0};function Hn(a,b){nm.call(this);this.o=0;if(fa(a))b&&(a=x(a,b));else if(a&&fa(a.handleEvent))a=x(a.handleEvent,a);else throw Error("Invalid listener argument");this.A=a;Zl(this,"tick",x(this.l,this));In(this)}
z(Hn,nm);Hn.prototype.l=function(){if(500<this.b){var a=this.b;24E4>2*a&&(a*=2);om(this,a)}this.A()};
Hn.prototype.start=function(){Hn.B.start.call(this);this.o=y()+this.b};
Hn.prototype.stop=function(){this.o=0;Hn.B.stop.call(this)};
function In(a){a.stop();om(a,5E3+2E4*Math.random())}
;function Jn(a,b){this.G=a;this.o=b;this.g=new G;this.f=new Hn(this.ue,this);this.b=null;this.F=!1;this.j=null;this.R="";this.A=this.i=0;this.l=[]}
z(Jn,Gn);g=Jn.prototype;g.subscribe=function(a,b,c){return this.g.subscribe(a,b,c)};
g.unsubscribe=function(a,b,c){return this.g.unsubscribe(a,b,c)};
g.ka=function(a){return this.g.ka(a)};
g.u=function(a,b){return this.g.u.apply(this.g,arguments)};
g.dispose=function(){this.F||(this.F=!0,this.g.clear(),Kn(this),F(this.g))};
g.C=function(){return this.F};
function Ln(a){return{firstTestResults:[""],secondTestResults:!a.b.Ab,sessionId:a.b.g,arrayId:a.b.Oa}}
g.connect=function(a,b,c){if(!this.b||2!=this.b.b){this.R="";this.f.stop();this.j=a||null;this.i=b||0;a=this.G+"/test";b=this.G+"/bind";var d=new mn("1",c?c.firstTestResults:null,c?c.secondTestResults:null),e=this.b;e&&(e.P=null);d.P=this;this.b=d;e?this.b.connect(a,b,this.o,e.g,e.Oa):c?this.b.connect(a,b,this.o,c.sessionId,c.arrayId):this.b.connect(a,b,this.o)}};
function Kn(a,b){a.A=b||0;a.f.stop();a.b&&(3==a.b.b&&zn(a.b),sn(a.b));a.A=0}
g.sendMessage=function(a,b){var c={_sc:a};b&&kb(c,b);this.f.enabled||2==(this.b?this.b.b:0)?this.l.push(c):Mn(this)&&xn(this.b,c)};
g.gc=function(){In(this.f);this.j=null;this.i=0;if(this.l.length){var a=this.l;this.l=[];for(var b=0,c=a.length;b<c;++b)xn(this.b,a[b])}this.u("handlerOpened")};
g.ec=function(a,b){var c=2==b&&401==this.b.ga;if(4!=b&&!c){if(6==b||410==this.b.ga)c=this.f,c.stop(),om(c,500);this.f.start()}this.u("handlerError",b)};
g.Eb=function(a,b,c){if(!this.f.enabled)this.u("handlerClosed");else if(c)for(a=0,b=c.length;a<b;++a){var d=c[a].b;d&&this.l.push(d)}};
g.ic=function(){var a={v:2};this.R&&(a.gsessionid=this.R);0!=this.i&&(a.ui=""+this.i);0!=this.A&&(a.ui=""+this.A);this.j&&kb(a,this.j);return a};
g.fc=function(a,b){"S"==b[0]?this.R=b[1]:"gracefulReconnect"==b[0]?(In(this.f),this.f.start(),sn(this.b)):this.u("handlerMessage",new Hl(b[0],b[1]))};
function Mn(a){return!!a.b&&3==a.b.b}
function Nn(a,b){(a.o.loungeIdToken=b)||a.f.stop()}
g.ue=function(){this.f.stop();var a=this.b,b=0;a.K&&b++;a.W&&b++;0!=b?this.f.start():this.connect(this.j,this.i)};function On(a){this.index=-1;this.videoId=this.listId="";this.volume=this.b=-1;this.j=!1;this.audioTrackId=null;this.i=this.f=0;this.g=null;this.reset(a)}
function Pn(a){a.audioTrackId=null;a.g=null;a.b=-1;a.f=0;a.i=y()}
On.prototype.reset=function(a){this.listId="";this.index=-1;this.videoId="";Pn(this);this.volume=-1;this.j=!1;a&&(this.index=a.index,this.listId=a.listId,this.videoId=a.videoId,this.b=a.playerState,this.volume=a.volume,this.j=a.muted,this.audioTrackId=a.audioTrackId,this.g=a.trackData,this.f=a.playerTime,this.i=a.playerTimeAt)};
function Qn(a){switch(a.b){case 1:return(y()-a.i)/1E3+a.f;case -1E3:return 0}return a.f}
function Rn(a){var b={};b.index=a.index;b.listId=a.listId;b.videoId=a.videoId;b.playerState=a.b;b.volume=a.volume;b.muted=a.j;b.audioTrackId=a.audioTrackId;b.trackData=ib(a.g);b.playerTime=a.f;b.playerTimeAt=a.i;return b}
On.prototype.clone=function(){return new On(Rn(this))};function Z(a,b,c){V.call(this);this.i=NaN;this.X=!1;this.I=this.G=this.M=this.O=NaN;this.Y=[];this.A=this.F=this.g=this.D=this.b=null;this.Va=a;this.Y.push(N(window,"beforeunload",x(this.nd,this)));this.f=[];this.D=new On;this.la=b.id;this.b=Sn(this,c);this.b.subscribe("handlerOpened",this.Bd,this);this.b.subscribe("handlerClosed",this.yd,this);this.b.subscribe("handlerError",this.zd,this);this.b.subscribe("handlerMessage",this.Ad,this);Nn(this.b,b.token);this.subscribe("remoteQueueChange",function(){var a=
this.D.videoId;xk()&&O("yt-remote-session-video-id",a)},this)}
z(Z,V);g=Z.prototype;g.connect=function(a,b){if(b){var c=b.listId,d=b.videoId,e=b.index,f=b.currentTime||0;5>=f&&(f=0);var h={videoId:d,currentTime:f};c&&(h.listId=c);p(e)&&(h.currentIndex=e);c&&(this.D.listId=c);this.D.videoId=d;this.D.index=e||0;this.D.state=3;c=this.D;c.f=f;c.i=y();this.A="UNSUPPORTED";Tn("Connecting with setPlaylist and params: "+M(h));this.b.connect({method:"setPlaylist",params:M(h)},a,Bk())}else Tn("Connecting without params"),this.b.connect({},a,Bk());Un(this)};
g.dispose=function(){this.C()||(this.u("beforeDispose"),Vn(this,3));Z.B.dispose.call(this)};
g.w=function(){Wn(this);Xn(this);Yn(this);J(this.G);this.G=NaN;J(this.I);this.I=NaN;this.g=null;Me(this.Y);this.Y.length=0;this.b.dispose();Z.B.w.call(this);this.A=this.F=this.f=this.D=this.b=null};
function Tn(a){Tj("conn",a)}
g.nd=function(){this.j(2)};
function Sn(a,b){return new Jn(fk(a.Va,"/bc",void 0,!1),b)}
function Vn(a,b){a.u("proxyStateChange",b)}
function Un(a){a.i=I(x(function(){Tn("Connecting timeout");this.j(1)},a),2E4)}
function Wn(a){J(a.i);a.i=NaN}
function Yn(a){J(a.O);a.O=NaN}
function Zn(a){Xn(a);a.M=I(x(function(){$n(this,"getNowPlaying")},a),2E4)}
function Xn(a){J(a.M);a.M=NaN}
g.Bd=function(){Tn("Channel opened");this.X&&(this.X=!1,Yn(this),this.O=I(x(function(){Tn("Timing out waiting for a screen.");this.j(1)},this),15E3));
Fk(Ln(this.b),this.la)};
g.yd=function(){Tn("Channel closed");isNaN(this.i)?Gk(!0):Gk();this.dispose()};
g.zd=function(a){Gk();isNaN(this.l())?(Tn("Channel error: "+a+" without reconnection"),this.dispose()):(this.X=!0,Tn("Channel error: "+a+" with reconnection in "+this.l()+" ms"),Vn(this,2))};
function ao(a,b){b&&(Wn(a),Yn(a));b==(Mn(a.b)&&isNaN(a.i))?b&&(Vn(a,1),$n(a,"getSubtitlesTrack")):b?(a.ca()&&a.D.reset(),Vn(a,1),$n(a,"getNowPlaying"),bo(a)):a.j(1)}
function co(a,b){var c=b.params.videoId;delete b.params.videoId;c==a.D.videoId&&(fb(b.params)?a.D.g=null:a.D.g=b.params,a.u("remotePlayerChange"))}
function eo(a,b){var c=b.params.videoId||b.params.video_id,d=parseInt(b.params.currentIndex,10);a.D.listId=b.params.listId||a.D.listId;var e=a.D,f=e.videoId;e.videoId=c;e.index=d;c!=f&&Pn(e);a.u("remoteQueueChange")}
function fo(a,b){b.params=b.params||{};eo(a,b);go(a,b)}
function go(a,b){var c=parseInt(b.params.currentTime||b.params.current_time,10),d=a.D;d.f=isNaN(c)?0:c;d.i=y();c=parseInt(b.params.state,10);c=isNaN(c)?-1:c;-1==c&&-1E3==a.D.b&&(c=-1E3);a.D.b=c;1==a.D.b?Zn(a):Xn(a);a.u("remotePlayerChange")}
function ho(a,b){var c="true"==b.params.muted;a.D.volume=parseInt(b.params.volume,10);a.D.j=c;a.u("remotePlayerChange")}
g.Ad=function(a){a.params?Tn("Received: action="+a.action+", params="+M(a.params)):Tn("Received: action="+a.action+" {}");switch(a.action){case "loungeStatus":a=od(a.params.devices);this.f=Ja(a,function(a){return new sk(a)});
a=!!Ma(this.f,function(a){return"LOUNGE_SCREEN"==a.type});
ao(this,a);break;case "loungeScreenConnected":ao(this,!0);break;case "loungeScreenDisconnected":Qa(this.f,function(a){return"LOUNGE_SCREEN"==a.type});
ao(this,!1);break;case "remoteConnected":var b=new sk(od(a.params.device));Ma(this.f,function(a){return a.equals(b)})||Oa(this.f,b);
break;case "remoteDisconnected":b=new sk(od(a.params.device));Qa(this.f,function(a){return a.equals(b)});
break;case "gracefulDisconnect":break;case "playlistModified":eo(this,a);break;case "nowPlaying":fo(this,a);break;case "onStateChange":go(this,a);break;case "onVolumeChanged":ho(this,a);break;case "onSubtitlesTrackChanged":co(this,a);break;case "nowAutoplaying":this.F=a.params.videoId;break;case "autoplayDismissed":break;case "autoplayUpNext":this.F=a.params.videoId;break;case "onAutoplayModeChanged":this.A=a.params.autoplayMode;break;default:Tn("Unrecognized action: "+a.action)}};
g.ge=function(){if(this.g){var a=this.g;this.g=null;this.D.videoId!=a&&$n(this,"getNowPlaying")}};
Z.prototype.subscribe=Z.prototype.subscribe;Z.prototype.unsubscribeByKey=Z.prototype.ka;Z.prototype.Ka=function(){var a=3;this.C()||(a=0,isNaN(this.l())?Mn(this.b)&&isNaN(this.i)&&(a=1):a=2);return a};
Z.prototype.getProxyState=Z.prototype.Ka;Z.prototype.j=function(a){Tn("Disconnecting with "+a);Wn(this);this.u("beforeDisconnect",a);1==a&&Gk();Kn(this.b,a);this.dispose()};
Z.prototype.disconnect=Z.prototype.j;Z.prototype.Ja=function(){var a=this.D;if(this.g){var b=a=this.D.clone(),c=this.g,d=a.index,e=b.videoId;b.videoId=c;b.index=d;c!=e&&Pn(b)}return Rn(a)};
Z.prototype.getPlayerContextData=Z.prototype.Ja;Z.prototype.Ua=function(a){var b=new On(a);b.videoId&&b.videoId!=this.D.videoId&&(this.g=b.videoId,J(this.G),this.G=I(x(this.ge,this),5E3));var c=[];this.D.listId==b.listId&&this.D.videoId==b.videoId&&this.D.index==b.index||c.push("remoteQueueChange");this.D.b==b.b&&this.D.volume==b.volume&&this.D.j==b.j&&Qn(this.D)==Qn(b)&&M(this.D.g)==M(b.g)||c.push("remotePlayerChange");this.D.reset(a);A(c,function(a){this.u(a)},this)};
Z.prototype.setPlayerContextData=Z.prototype.Ua;Z.prototype.ca=function(){var a=this.b.o.id,b=Ma(this.f,function(b){return"REMOTE_CONTROL"==b.type&&b.id!=a});
return b?b.id:""};
Z.prototype.getOtherConnectedRemoteId=Z.prototype.ca;Z.prototype.l=function(){var a=this.b;return a.f.enabled?a.f.o-y():NaN};
Z.prototype.getReconnectTimeout=Z.prototype.l;Z.prototype.oa=function(){return this.A||"UNSUPPORTED"};
Z.prototype.getAutoplayMode=Z.prototype.oa;Z.prototype.sa=function(){return this.F||""};
Z.prototype.getAutoplayVideoId=Z.prototype.sa;Z.prototype.Wa=function(){if(!isNaN(this.l())){var a=this.b.f;a.enabled&&(a.stop(),a.start(),a.l())}};
Z.prototype.reconnect=Z.prototype.Wa;function bo(a){J(a.I);a.I=I(x(a.j,a,1),864E5)}
function $n(a,b,c){c?Tn("Sending: action="+b+", params="+M(c)):Tn("Sending: action="+b);a.b.sendMessage(b,c)}
Z.prototype.La=function(a,b){$n(this,a,b);bo(this)};
Z.prototype.sendMessage=Z.prototype.La;function io(a){mk.call(this,"ScreenServiceProxy");this.U=a;this.b=[];this.b.push(this.U.$_s("screenChange",x(this.ye,this)));this.b.push(this.U.$_s("onlineScreenChange",x(this.Hd,this)))}
z(io,mk);g=io.prototype;g.Z=function(a){return this.U.$_gs(a)};
g.contains=function(a){return!!this.U.$_c(a)};
g.get=function(a){return this.U.$_g(a)};
g.start=function(){this.U.$_st()};
g.jb=function(a,b,c){this.U.$_a(a,b,c)};
g.remove=function(a,b,c){this.U.$_r(a,b,c)};
g.hb=function(a,b,c,d){this.U.$_un(a,b,c,d)};
g.w=function(){for(var a=0,b=this.b.length;a<b;++a)this.U.$_ubk(this.b[a]);this.b.length=0;this.U=null;io.B.w.call(this)};
g.ye=function(){this.u("screenChange")};
g.Hd=function(){this.u("onlineScreenChange")};
W.prototype.$_st=W.prototype.start;W.prototype.$_gspc=W.prototype.ze;W.prototype.$_gsppc=W.prototype.Kc;W.prototype.$_c=W.prototype.contains;W.prototype.$_g=W.prototype.get;W.prototype.$_a=W.prototype.jb;W.prototype.$_un=W.prototype.hb;W.prototype.$_r=W.prototype.remove;W.prototype.$_gs=W.prototype.Z;W.prototype.$_gos=W.prototype.Jc;W.prototype.$_s=W.prototype.subscribe;W.prototype.$_ubk=W.prototype.ka;function jo(){var a={device:"Desktop",app:"youtube-desktop"};ef&&df();uk();ko||(ko=new ek,Hk()&&(ko.b="/api/loungedev"));lo||(lo=r("yt.mdx.remote.deferredProxies_")||[],q("yt.mdx.remote.deferredProxies_",lo,void 0));mo();var b=no();if(!b){var c=new W(ko);q("yt.mdx.remote.screenService_",c,void 0);b=no();nl(c,function(a){a?oo()&&Gl(oo(),"YouTube TV"):c.subscribe("onlineScreenChange",function(){K("yt-remote-receiver-availability-change")})},!(!a||!a.loadCastApiSetupScript))}if(a&&!r("yt.mdx.remote.initialized_")){q("yt.mdx.remote.initialized_",
!0,void 0);
po("Initializing: "+M(a));qo.push(kc("yt-remote-cast2-availability-change",function(){K("yt-remote-receiver-availability-change")}));
qo.push(kc("yt-remote-cast2-receiver-selected",function(){ro(null);K("yt-remote-auto-connect","cast-selector-receiver")}));
qo.push(kc("yt-remote-cast2-session-change",so));qo.push(kc("yt-remote-connection-change",function(a){a?Gl(oo(),"YouTube TV"):to()||(Gl(null,null),Cl())}));
var d=uo();a.isAuto&&(d.id+="#dial");d.name=a.device;d.app=a.app;po(" -- with channel params: "+M(d));vo(d);b.start();oo()||wo()}}
function xo(){mc(qo);qo.length=0;F(yo);yo=null;lo&&(A(lo,function(a){a(null)}),lo.length=0,lo=null,q("yt.mdx.remote.deferredProxies_",null,void 0));
ko=null}
function zo(){if(Al()){var a=[];if(P("yt-remote-cast-available")||r("yt.mdx.remote.cloudview.castButtonShown_")||Ao())a.push({key:"cast-selector-receiver",name:Bo()}),q("yt.mdx.remote.cloudview.castButtonShown_",!0,void 0);return a}return r("yt.mdx.remote.cloudview.initializing_")?[]:Co()}
function Co(){var a;a=no().U.$_gos();var b=Do();b&&Ao()&&(kk(a,b)||a.push(b));return jk(a)}
function Eo(){if(Al()){var a=Bl();return a?{key:"cast-selector-receiver",name:a}:null}return Fo()}
function Fo(){var a=Co(),b=Do();b||(b=to());return Ma(a,function(a){return b&&Xj(b,a.key)?!0:!1})}
function Bo(){if(Al())return Bl();var a=Do();return a?a.name:null}
function Do(){var a=oo();if(!a)return null;var b=no().Z();return lk(b,a)}
function so(a){po("remote.onCastSessionChange_: "+bk(a));if(a){var b=Do();b&&b.id==a.id?Gl(b.id,"YouTube TV"):(b&&Go(),Ho(a,1))}else Go()}
function Io(a,b){po("Connecting to: "+M(a));if("cast-selector-receiver"==a.key)ro(b||null),Fl(b||null);else{Go();ro(b||null);var c=no().Z();(c=lk(c,a.key))?Ho(c,1):I(function(){Jo(null)},0)}}
function Go(){El()?wl().stopSession():tl("stopSession called before API ready.");var a=Ao();a?a.disconnect(1):(nc("yt-remote-before-disconnect",1),nc("yt-remote-connection-change",!1));Jo(null)}
function po(a){Tj("remote",a)}
function no(){if(!yo){var a=r("yt.mdx.remote.screenService_");yo=a?new io(a):null}return yo}
function oo(){return r("yt.mdx.remote.currentScreenId_")}
function Ko(a){q("yt.mdx.remote.currentScreenId_",a,void 0)}
function ro(a){q("yt.mdx.remote.connectData_",a,void 0)}
function Ao(){return r("yt.mdx.remote.connection_")}
function Jo(a){var b=Ao();ro(null);a?Ao():Ko("");q("yt.mdx.remote.connection_",a,void 0);lo&&(A(lo,function(b){b(a)}),lo.length=0);
b&&!a?nc("yt-remote-connection-change",!1):!b&&a&&K("yt-remote-connection-change",!0)}
function to(){var a=xk();if(!a)return null;var b=no().Z();return lk(b,a)}
function Ho(a,b){oo();Ko(a.id);var c=new Z(ko,a,uo());c.connect(b,r("yt.mdx.remote.connectData_"));c.subscribe("beforeDisconnect",function(a){nc("yt-remote-before-disconnect",a)});
c.subscribe("beforeDispose",function(){Ao()&&(Ao(),Jo(null))});
Jo(c)}
function wo(){var a=to();a?(po("Resume connection to: "+bk(a)),Ho(a,0)):(Gk(),Cl(),po("Skipping connecting because no session screen found."))}
var ko=null,lo=null,yo=null;function mo(){var a=uo();if(fb(a)){var a=wk(),b=P("yt-remote-session-name")||"",c=P("yt-remote-session-app")||"",a={device:"REMOTE_CONTROL",id:a,name:b,app:c,"mdx-version":3};q("yt.mdx.remote.channelParams_",a,void 0)}}
function uo(){return r("yt.mdx.remote.channelParams_")||{}}
function vo(a){a?(O("yt-remote-session-app",a.app),O("yt-remote-session-name",a.name)):(gf("yt-remote-session-app"),gf("yt-remote-session-name"));q("yt.mdx.remote.channelParams_",a,void 0)}
var qo=[];var Lo=null,Mo=[];function No(){Oo();if(Eo()){var a=Lo;"html5"!=a.getPlayerType()&&a.loadNewVideoConfig(a.getCurrentVideoConfig(),"html5")}}
function Po(a){"cast-selector-receiver"==a?Dl():Qo(a)}
function Qo(a){var b=zo();if(a=ik(b,a)){var c=Lo;Io(a,{listId:c.getVideoData().list,videoId:c.getVideoData().video_id,currentTime:c.getCurrentTime()});"html5"!=c.getPlayerType()?c.loadNewVideoConfig(c.getCurrentVideoConfig(),"html5"):c.updateRemoteReceivers&&c.updateRemoteReceivers(b,a)}}
function Oo(){var a=Lo;a&&a.updateRemoteReceivers&&a.updateRemoteReceivers(zo(),Eo())}
;var Ro=null,So=[];function To(a){return{externalChannelId:a.externalChannelId,vd:!!a.isChannelPaid,source:a.source,subscriptionId:a.subscriptionId}}
function Uo(a){Vo(To(a))}
function Vo(a){Qi()?(T(Di,new xi(a.externalChannelId,a.vd?{itemType:"U",itemId:a.externalChannelId}:null)),(a="/gen_204?"+Fd({event:"subscribe",source:a.source}))&&nh(a)):Wo(a)}
function Wo(a){Pi(function(b){b.subscription_ajax&&Vo(a)},null)}
function Xo(a){a=To(a);T(Ii,new zi(a.externalChannelId,a.subscriptionId,null));(a="/gen_204?"+Fd({event:"unsubscribe",source:a.source}))&&nh(a)}
function Yo(a){Ro&&Ro.channelSubscribed(a.b,a.subscriptionId)}
function Zo(a){Ro&&Ro.channelUnsubscribed(a.b)}
;function $o(a){E.call(this);this.f=a;this.f.subscribe("command",this.Bc,this);this.g={};this.i=!1}
z($o,E);g=$o.prototype;g.start=function(){this.i||this.C()||(this.i=!0,ap(this.f,"RECEIVING"))};
g.Nc=u;g.addEventListener=u;g.removeEventListener=u;g.Bc=function(a,b){if(this.i&&!this.C()){var c=b||{};switch(a){case "addEventListener":if(w(c.event)&&(c=c.event,!(c in this.g))){var d=x(this.ie,this,c);this.g[c]=d;this.addEventListener(c,d)}break;case "removeEventListener":w(c.event)&&bp(this,c.event);break;default:this.Nc(a,b)}}};
g.ie=function(a,b){this.i&&!this.C()&&ap(this.f,a,this.Hb(a,b))};
g.Hb=function(a,b){if(null!=b)return{value:b}};
function bp(a,b){b in a.g&&(a.removeEventListener(b,a.g[b]),delete a.g[b])}
g.w=function(){this.f.unsubscribe("command",this.Bc,this);this.f=null;for(var a in this.g)bp(this,a);$o.B.w.call(this)};function cp(a,b){$o.call(this,b);this.b=a;this.start()}
z(cp,$o);g=cp.prototype;g.addEventListener=function(a,b){this.b.addEventListener(a,b)};
g.removeEventListener=function(a,b){this.b.removeEventListener(a,b)};
g.Nc=function(a,b){if(this.b.isReady()&&this.b[a]){var c=dp(a,b||{}),c=this.b[a].apply(this.b,c);(c=ep(a,c))&&this.i&&!this.C()&&ap(this.f,a,c)}};
function dp(a,b){switch(a){case "loadVideoById":return b=tj(b),vj(b),[b];case "cueVideoById":return b=tj(b),vj(b),[b];case "loadVideoByPlayerVars":return vj(b),[b];case "cueVideoByPlayerVars":return vj(b),[b];case "loadPlaylist":return b=uj(b),vj(b),[b];case "cuePlaylist":return b=uj(b),vj(b),[b];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];
case "setLoop":return[b.loopPlaylists];case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey]}return[]}
function ep(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
g.Hb=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return cp.B.Hb.call(this,a,b)};
g.w=function(){cp.B.w.call(this);delete this.b};function fp(a,b,c,d){E.call(this);this.b=b||null;this.A="*";this.i=c||null;this.f=null;this.channel=d||null;this.G=!!a;this.F=x(this.I,this);window.addEventListener("message",this.F)}
z(fp,E);fp.prototype.I=function(a){if(!("*"!=this.i&&a.origin!=this.i||this.b&&a.source!=this.b)&&w(a.data)){var b;try{b=od(a.data)}catch(c){return}null!=b&&(this.G&&(this.f&&this.f!=b.id||this.channel&&this.channel!=b.channel)?window.console&&window.console.warn("Session ID or channel missmatch"):b&&this.l(a,b))}};
fp.prototype.l=u;fp.prototype.sendMessage=function(a){if(this.b){this.f&&(a.id=this.f);this.channel&&(a.channel=this.channel);try{var b=M(a);this.b.postMessage(b,this.A)}catch(c){cc(c,"WARNING")}}};
fp.prototype.w=function(){window.removeEventListener("message",this.F);fp.B.w.call(this)};function gp(a,b,c){fp.call(this,a,b,c||H("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname,"widget");this.o=this.g=this.j=null}
z(gp,fp);gp.prototype.l=function(a,b){switch(b.event){case "listening":"null"!=a.origin?this.i=this.A=a.origin:cc(Error("MessageEvent origin is null"),"WARNING");this.b=a.source;this.f=b.id;this.g&&(this.g(),this.g=null);break;case "command":this.j&&(this.o&&!B(this.o,b.func)||this.j(b.func,b.args))}};function hp(){var a=this.f=new gp(!!H("WIDGET_ID_ENFORCE")),b=x(this.ee,this);a.j=b;a.o=null;this.f.channel="widget";if(a=H("WIDGET_ID"))this.f.M=a;this.i=[];this.o=!1;this.j={}}
g=hp.prototype;g.ee=function(a,b){if("addEventListener"==a&&b){var c=b[0];this.j[c]||"onReady"==c||(this.addEventListener(c,ip(this,c)),this.j[c]=!0)}else this.Oc(a,b)};
g.Oc=function(){};
function ip(a,b){return x(function(a){this.sendMessage(b,a)},a)}
g.addEventListener=function(){};
g.jd=function(){this.o=!0;this.sendMessage("initialDelivery",this.Ib());this.sendMessage("onReady");A(this.i,this.Pc,this);this.i=[]};
g.Ib=function(){return null};
function jp(a,b){a.sendMessage("infoDelivery",b)}
g.Pc=function(a){this.o?this.f.sendMessage(a):this.i.push(a)};
g.sendMessage=function(a,b){this.Pc({event:a,info:void 0==b?null:b})};
g.dispose=function(){this.f=null};function kp(a){hp.call(this);this.b=a;this.g=[];this.addEventListener("onReady",x(this.Md,this));this.addEventListener("onVideoProgress",x(this.me,this));this.addEventListener("onVolumeChange",x(this.ne,this));this.addEventListener("onApiChange",x(this.he,this));this.addEventListener("onPlaybackQualityChange",x(this.je,this));this.addEventListener("onPlaybackRateChange",x(this.ke,this));this.addEventListener("onStateChange",x(this.le,this))}
z(kp,hp);g=kp.prototype;g.Oc=function(a,b){if(this.b[a]){b=b||[];if(0<b.length&&rj(a)){var c;c=b;if(ha(c[0])&&!v(c[0]))c=c[0];else{var d={};switch(a){case "loadVideoById":case "cueVideoById":d=tj.apply(window,c);break;case "loadVideoByUrl":case "cueVideoByUrl":d=sj.apply(window,c);break;case "loadPlaylist":case "cuePlaylist":d=uj.apply(window,c)}c=d}vj(c);b.length=1;b[0]=c}this.b[a].apply(this.b,b);rj(a)&&jp(this,this.Ib())}};
g.Md=function(){var a=x(this.jd,this);this.f.g=a};
g.addEventListener=function(a,b){this.g.push({eventType:a,listener:b});this.b.addEventListener(a,b)};
g.Ib=function(){if(!this.b)return null;var a=this.b.getApiInterface();Pa(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c],f=e;if(0==f.search("get")||0==f.search("is")){var f=e,h=0;0==f.search("get")?h=3:0==f.search("is")&&(h=2);f=f.charAt(h).toLowerCase()+f.substr(h+1);try{var k=this.b[e]();b[f]=k}catch(m){}}}b.videoData=this.b.getVideoData();b.currentTimeLastUpdated_=y()/1E3;return b};
g.le=function(a){a={playerState:a,currentTime:this.b.getCurrentTime(),duration:this.b.getDuration(),videoData:this.b.getVideoData(),videoStartBytes:0,videoBytesTotal:this.b.getVideoBytesTotal(),videoLoadedFraction:this.b.getVideoLoadedFraction(),playbackQuality:this.b.getPlaybackQuality(),availableQualityLevels:this.b.getAvailableQualityLevels(),videoUrl:this.b.getVideoUrl(),playlist:this.b.getPlaylist(),playlistIndex:this.b.getPlaylistIndex(),currentTimeLastUpdated_:y()/1E3,playbackRate:this.b.getPlaybackRate()};
this.b.getProgressState&&(a.progressState=this.b.getProgressState());this.b.getStoryboardFormat&&(a.storyboardFormat=this.b.getStoryboardFormat());jp(this,a)};
g.je=function(a){jp(this,{playbackQuality:a})};
g.ke=function(a){jp(this,{playbackRate:a})};
g.he=function(){for(var a=this.b.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.b.getOptions(e);b[e]={options:f};for(var h=0,k=f.length;h<k;h++){var m=f[h],n=this.b.getOption(e,m);b[e][m]=n}}this.sendMessage("apiInfoDelivery",b)};
g.ne=function(){jp(this,{muted:this.b.isMuted(),volume:this.b.getVolume()})};
g.me=function(a){a={currentTime:a,videoBytesLoaded:this.b.getVideoBytesLoaded(),videoLoadedFraction:this.b.getVideoLoadedFraction(),currentTimeLastUpdated_:y()/1E3,playbackRate:this.b.getPlaybackRate()};this.b.getProgressState&&(a.progressState=this.b.getProgressState());jp(this,a)};
g.dispose=function(){kp.B.dispose.call(this);for(var a=0;a<this.g.length;a++){var b=this.g[a];this.b.removeEventListener(b.eventType,b.listener)}this.g=[]};function lp(a,b,c){V.call(this);this.b=a;this.f=b;this.g=c}
z(lp,V);function ap(a,b,c){if(!a.C()){var d=a.b;d.C()||a.f!=d.b||(a={id:a.g,command:b},c&&(a.data=c),d.b.postMessage(M(a),d.g))}}
lp.prototype.w=function(){this.f=this.b=null;lp.B.w.call(this)};function mp(a,b,c){E.call(this);this.b=a;this.g=c;this.i=N(window,"message",x(this.j,this));this.f=new lp(this,a,b);Vb(this,na(F,this.f))}
z(mp,E);mp.prototype.j=function(a){var b;if(b=!this.C())if(b=a.origin==this.g)a:{b=this.b;do{var c;b:{c=a.source;do{if(c==b){c=!0;break b}if(c==c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(a=a.data,w(a))){try{a=od(a)}catch(d){return}a.command&&(b=this.f,b.C()||b.u("command",a.command,a.data))}};
mp.prototype.w=function(){Me(this.i);this.b=null;mp.B.w.call(this)};var np=!1;function op(a){if(a=a.match(/[\d]+/g))a.length=3}
(function(){if(navigator.plugins&&navigator.plugins.length){var a=navigator.plugins["Shockwave Flash"];if(a&&(np=!0,a.description)){op(a.description);return}if(navigator.plugins["Shockwave Flash 2.0"]){np=!0;return}}if(navigator.mimeTypes&&navigator.mimeTypes.length&&(a=navigator.mimeTypes["application/x-shockwave-flash"],np=!(!a||!a.enabledPlugin))){op(a.enabledPlugin.description);return}try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");np=!0;op(b.GetVariable("$version"));return}catch(c){}try{b=
new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");np=!0;return}catch(c){}try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),np=!0,op(b.GetVariable("$version"))}catch(c){}})();function pp(a){return(a=a.exec(lb))?a[1]:""}
(function(){if(kf)return pp(/Firefox\/([0-9.]+)/);if(L||$c||Zc)return id;if(of)return pp(/Chrome\/([0-9.]+)/);if(pf&&!(Vc()||C("iPad")||C("iPod")))return pp(/Version\/([0-9.]+)/);if(lf||mf){var a=/Version\/(\S+).*Mobile\/(\S+)/.exec(lb);if(a)return a[1]+"."+a[2]}else if(nf)return(a=pp(/Android\s+([0-9.]+)/))?a:pp(/Version\/([0-9.]+)/);return""})();function qp(){var a=rp;return new og(function(b,c){a.aa=function(a){Ld(a)?b(a):c(a)};
a.onError=c;a.Ga=c;Qd("//googleads.g.doubleclick.net/pagead/id",a)})}
;function sp(a,b){this.f=a;this.b=b}
sp.prototype.then=function(a,b,c){try{if(p(this.f))return a?tg(a.call(c,this.f)):tg(this.f);if(p(this.b)){if(!b)return ug(this.b);var d=b.call(c,this.b);return!p(d)&&this.b instanceof wg?ug(this.b):tg(d)}throw Error("Invalid Result_ state");}catch(e){return ug(e)}};
ng(sp);var rp={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},tp=null;function up(a){a=a.responseText;if(0!=a.lastIndexOf(")]}'",0))return vp(""),tp=new sp(""),"";a=JSON.parse(a.substr(4)).id;vp(a);tp=new sp(a);wp(18E5,2);return a}
function xp(a){var b=Error("Unable to load /pagead/id");vp("");tp=new sp(void 0,b);0<a&&wp(12E4,a-1);throw b;}
function wp(a,b){I(function(){var a=x(xp,l,b),a=qp().then(up,a);vg(a,null,t,void 0)},a)}
function vp(a){q("yt.www.ads.biscotti.lastId_",a,void 0)}
;function yp(){}
;function zp(){var a;if(a=Df.get("PREF",void 0)){a=unescape(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(Ap[d]=c.toString())}}}
ba(zp);var Ap=r("yt.prefs.UserPrefs.prefs_")||{};q("yt.prefs.UserPrefs.prefs_",Ap,void 0);function Bp(a){if(/^f([1-9][0-9]*)$/.test(a))throw"ExpectedRegexMatch: "+a;}
function Cp(a){if(!/^\w+$/.test(a))throw"ExpectedRegexMismatch: "+a;}
function Dp(a){a=void 0!==Ap[a]?Ap[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
zp.prototype.get=function(a,b){Cp(a);Bp(a);var c=void 0!==Ap[a]?Ap[a].toString():null;return null!=c?c:b?b:""};
zp.prototype.set=function(a,b){Cp(a);Bp(a);if(null==b)throw"ExpectedNotNull";Ap[a]=b.toString()};
zp.prototype.remove=function(a){Cp(a);Bp(a);delete Ap[a]};
zp.prototype.clear=function(){Ap={}};function Ep(a){for(var b=0;b<a.length;b++){var c=a[b];"send_follow_on_ping_action"==c.name&&c.data&&c.data.follow_on_url&&(c=c.data.follow_on_url)&&nh(c)}}
;function Fp(a){R.call(this,1,arguments);this.Db=a}
z(Fp,R);function Gp(a,b){R.call(this,2,arguments);this.f=a;this.b=b}
z(Gp,R);function Hp(a,b,c,d){R.call(this,1,arguments);this.b=b;this.f=c||null;this.itemId=d||null}
z(Hp,R);function Ip(a,b){R.call(this,1,arguments);this.f=a;this.b=b||null}
z(Ip,R);function Jp(a){R.call(this,1,arguments)}
z(Jp,R);var Kp=new S("ypc-core-load",Fp),Lp=new S("ypc-guide-sync-success",Gp),Mp=new S("ypc-purchase-success",Hp),Np=new S("ypc-subscription-cancel",Jp),Op=new S("ypc-subscription-cancel-success",Ip),Pp=new S("ypc-init-subscription",Jp);var Qp=!1,Rp=[],Sp=[];function Tp(a){a.b?Qp?T(Hi,a):T(Kp,new Fp(function(){T(Pp,new Jp(a.b))})):Up(a.f,a.i,a.g,a.source)}
function Vp(a){a.b?Qp?T(Mi,a):T(Kp,new Fp(function(){T(Np,new Jp(a.b))})):Wp(a.f,a.subscriptionId,a.i,a.g,a.source)}
function Xp(a){Yp(Sa(a.b))}
function Zp(a){$p(Sa(a.b))}
function aq(a){bq(a.g,a,null)}
function cq(a,b,c,d){bq(a,b,c,d)}
function dq(a){var b=a.itemId,c=a.b.subscriptionId;b&&c&&T(Gi,new yi(b,c,a.b.channelInfo))}
function eq(a){var b=a.b;Xa(a.f,function(a,d){T(Gi,new yi(d,a,b[d]))})}
function fq(a){T(Li,new vi(a.f.itemId));a.b&&a.b.length&&(gq(a.b,Li),gq(a.b,Ni))}
function Up(a,b,c,d){var e=new vi(a);T(Ei,e);var f={};f.c=a;c&&(f.eurl=c);d&&(f.source=d);c={};(d=H("PLAYBACK_ID"))&&(c.plid=d);(d=H("EVENT_ID"))&&(c.ei=d);b&&hq(b,c);Qd("/subscription_ajax?action_create_subscription_to_channel=1",{method:"POST",Ub:f,V:c,aa:function(b,c){var d=c.response;T(Gi,new yi(a,d.id,d.channel_info));d.show_feed_privacy_dialog&&K("SHOW-FEED-PRIVACY-SUBSCRIBE-DIALOG",a);d.actions&&Ep(d.actions)},
Rb:function(){T(Fi,e)}})}
function Wp(a,b,c,d,e){var f=new vi(a);T(Ji,f);var h={};d&&(h.eurl=d);e&&(h.source=e);d={};d.c=a;d.s=b;(a=H("PLAYBACK_ID"))&&(d.plid=a);(a=H("EVENT_ID"))&&(d.ei=a);c&&hq(c,d);Qd("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",Ub:h,V:d,aa:function(a,b){var c=b.response;T(Li,f);c.actions&&Ep(c.actions)},
Rb:function(){T(Ki,f)}})}
function bq(a,b,c,d){if(null!==b&&(null!==b.b||null!==b.receivePostUpdates||null!==b.f)){var e={};a&&(e.channel_id=a);null!==b.b&&(e.receive_all_updates=b.b);null!==b.receivePostUpdates&&(e.receive_post_updates=b.receivePostUpdates);null!==b.f&&(e.receive_no_updates=b.f);Qd("/subscription_ajax?action_update_subscription_preferences=1",{method:"POST",V:e,onError:function(){c&&c()},
aa:function(){d&&d()}})}}
function Yp(a){if(a.length){var b=Ua(a,0,40);T("subscription-batch-subscribe-loading");gq(b,Ei);var c={};c.a=b.join(",");var d=function(){T("subscription-batch-subscribe-loaded");gq(b,Fi)};
Qd("/subscription_ajax?action_create_subscription_to_all=1",{method:"POST",V:c,aa:function(c,f){d();var h=f.response,k=h.id;if(v(k)&&k.length==b.length){var m=h.channel_info_map;A(k,function(a,c){var d=b[c];T(Gi,new yi(d,a,m[d]))});
a.length?Yp(a):T("subscription-batch-subscribe-finished")}},
onError:function(){d();T("subscription-batch-subscribe-failure")}})}}
function $p(a){if(a.length){var b=Ua(a,0,40);T("subscription-batch-unsubscribe-loading");gq(b,Ji);var c={};c.c=b.join(",");var d=function(){T("subscription-batch-unsubscribe-loaded");gq(b,Ki)};
Qd("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",V:c,aa:function(){d();gq(b,Li);a.length&&$p(a)},
onError:function(){d()}})}}
function gq(a,b){A(a,function(a){T(b,new vi(a))})}
function hq(a,b){var c=Id(a),d;for(d in c)b[d]=c[d]}
;var iq=null,jq=null,kq=null,lq=!1;q("yt.setConfig",$b,void 0);q("yt.setMsg",function(a){ac(Zb,arguments)},void 0);
q("yt.logging.errors.log",function(a,b,c,d,e){c={name:c||H("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),version:d||H("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0)};e=window&&window.yterr||e||!1;if(a&&e&&!(5<=Wd)){e=a.stacktrace;d=a.columnNumber;var f=r("window.location.href");if(w(a))a={message:a,name:"Unknown error",lineNumber:"Not available",fileName:f,stack:"Not available"};else{var h,k,m=!1;try{h=a.lineNumber||a.Ve||"Not available"}catch(Qc){h="Not available",m=!0}try{k=a.fileName||a.filename||a.sourceURL||
l.$googDebugFname||f}catch(Qc){k="Not available",m=!0}a=!m&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:{message:a.message||"Not available",name:a.name||"UnknownError",lineNumber:h,fileName:k,stack:a.stack||"Not available"}}e=e||a.stack;h=a.lineNumber.toString();isNaN(h)||isNaN(d)||(h=h+":"+d);if(!(Vd[a.message]||0<=e.indexOf("/YouTubeCenter.js")||0<=e.indexOf("/mytube.js"))){b={Ub:{a:"logerror",t:"jserror",type:a.name,msg:a.message.substr(0,1E3),line:h,level:b||"ERROR"},V:{url:H("PAGE_NAME",
window.location.href),file:a.fileName},method:"POST"};e&&(b.V.stack=e);for(var n in c)b.V["client."+n]=c[n];if(n=H("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(var ga in n)b.V[ga]=n[ga];Qd("/error_204",b);Vd[a.message]=!0;Wd++}}},void 0);
q("writeEmbed",function(){var a=H("PLAYER_CONFIG",void 0);if("1"!=a.privembed)try{var b;try{var c=r("yt.www.ads.biscotti.getId_"),d;if(c)d=c();else{if(!tp){var e=x(xp,l,2);tp=qp().then(up,e)}d=tp}b=d}catch(f){b=ug(f)}vg(b,null,yp,void 0)}catch(f){cc(f)}"gvn-experiment"==a.args.ps&&(document.body.style.backgroundColor="transparent");d=document.referrer;b=H("POST_MESSAGE_ORIGIN");c=!1;wd("legacy_cast2")&&w(d)&&w(b)&&-1<d.indexOf(b)&&kh(b)&&kh(d)&&(c=!0);window!=window.top&&d&&d!=document.URL&&(a.args.loaderUrl=
d);H("LIGHTWEIGHT_AUTOPLAY")&&(a.args.autoplay="1");a.args.autoplay&&vj(a.args);iq=ii("player",a);d=H("POST_MESSAGE_ID","player");H("ENABLE_JS_API")?kq=new kp(iq):H("ENABLE_POST_API")&&w(d)&&w(b)&&(jq=new mp(window.parent,d,b),kq=new cp(iq,jq.f));wd("legacy_cast2")&&((lq=c&&!H("ENABLE_CAST_API"))?a.args.disableCast="1":(a=iq,jo(),Lo=a,Lo.addEventListener("onReady",No),Lo.addEventListener("onRemoteReceiverSelected",Po),Mo.push(kc("yt-remote-receiver-availability-change",Oo)),Mo.push(kc("yt-remote-auto-connect",
Qo))));H("BG_P")&&(H("BG_I")||H("BG_IU"))&&zc();$d();Ro=iq;Ro.addEventListener("SUBSCRIBE",Uo);Ro.addEventListener("UNSUBSCRIBE",Xo);So.push(vh(Gi,Yo),vh(Li,Zo))},void 0);
q("yt.www.watch.ads.restrictioncookie.spr",function(a){(a+="mac_204?action_fcts=1")&&nh(a);return!0},void 0);
var mq=bc(function(){Fh("ol");Qp=!0;Sp.push(vh(Di,Tp),vh(Ii,Vp));Qp||(Sp.push(vh(Hi,Tp),vh(Mi,Vp),vh(Ai,Xp),vh(Bi,Zp),vh(Ci,aq)),Rp.push(kc("subscription-prefs",cq)),Sp.push(vh(Mp,dq),vh(Op,fq),vh(Lp,eq)));zp.getInstance();var a=1<window.devicePixelRatio;if(!!((Dp("f"+(Math.floor(119/31)+1))||0)&67108864)!=a){var b="f"+(Math.floor(119/31)+1),c=Dp(b)||0,c=a?c|67108864:c&-67108865;0==c?delete Ap[b]:(a=c.toString(16),Ap[b]=a.toString());var b=[],d;for(d in Ap)b.push(d+"="+escape(Ap[d]));Ef("PREF",b.join("&"),
63072E3)}}),nq=bc(function(){var a=iq;
a&&a.sendAbandonmentPing&&a.sendAbandonmentPing();H("PL_ATT")&&(yc=null);for(var a=0,b=Yd.length;a<b;a++){var c=Yd[a];if(!isNaN(c)){var d=r("yt.scheduler.instance.cancelJob");d?d(c):J(c)}}Yd.length=0;a=uc("//static.doubleclick.net/instream/ad_status.js");if(b=document.getElementById(a))pc(a),b.parentNode.removeChild(b);Zd=!1;$b("DCLKSTAT",0);mc(Rp);Rp.length=0;wh(Sp);Sp.length=0;Qp=!1;Ro&&(Ro.removeEventListener("SUBSCRIBE",Vo),Ro.removeEventListener("UNSUBSCRIBE",Xo));Ro=null;wh(So);So.length=0;
wd("legacy_cast2")&&!lq&&(mc(Mo),Mo.length=0,Lo&&(Lo.removeEventListener("onRemoteReceiverSelected",Po),Lo.removeEventListener("onReady",No),Lo=null),xo());Wb(kq,jq);iq&&iq.destroy()});
window.addEventListener?(window.addEventListener("load",mq),window.addEventListener("unload",nq)):window.attachEvent&&(window.attachEvent("onload",mq),window.attachEvent("onunload",nq));var oq=lj.getInstance(),pq=U(oq);pq in qj||(oq.register(),oq.ub.push(kc("yt-uix-init-"+pq,oq.init,oq)),oq.ub.push(kc("yt-uix-dispose-"+pq,oq.dispose,oq)),qj[pq]=oq);})();
