/*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */
(function(n,t,i){typeof define=="function"&&define.amd?define(["jquery"],function(r){return i(r,n,t),r.mobile}):i(n.jQuery,n,t)})(this,document,function(n,t,i){(function(n,t,r){function f(n){return n=n||location.href,"#"+n.replace(/^[^#]*#?(.*)$/,"$1")}var u="hashchange",e=i,o,h=n.event.special,c=e.documentMode,s="on"+u in t&&(c===r||c>7);n.fn[u]=function(n){return n?this.bind(u,n):this.trigger(u)};n.fn[u].delay=50;h[u]=n.extend(h[u],{setup:function(){if(s)return!1;n(o.start)},teardown:function(){if(s)return!1;n(o.stop)}});o=function(){function c(){var r=f(),i=v(h);r!==h?(a(h=r,i),n(t).trigger(u)):i!==h&&(location.href=location.href.replace(/#.*/,"")+i);o=setTimeout(c,n.fn[u].delay)}var i={},o,h=f(),l=function(n){return n},a=l,v=l;return i.start=function(){o||c()},i.stop=function(){o&&clearTimeout(o);o=r},t.attachEvent&&!t.addEventListener&&!s&&function(){var t,r;i.start=function(){t||(r=n.fn[u].src,r=r&&r+f(),t=n('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||a(f());c()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow,e.onpropertychange=function(){try{event.propertyName==="title"&&(t.document.title=e.title)}catch(n){}})};i.stop=l;v=function(){return f(t.location.href)};a=function(i,r){var f=t.document,o=n.fn[u].domain;i!==r&&(f.title=e.title,f.open(),o&&f.write('<script>document.domain="'+o+'"<\/script>'),f.close(),t.location.hash=i)}}(),i}()})(n,this),function(n){n.mobile={}}(n),function(n){n.extend(n.mobile,{version:"1.4.5",subPageUrlKey:"ui-page",hideUrlBar:!0,keepNative:":jqmData(role='none'), :jqmData(role='nojs')",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,minScrollBack:0,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"a",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,buttonMarkup:{hoverDelay:200},dynamicBaseEnabled:!0,pageContainer:n(),allowCrossDomainPages:!1,dialogHashKey:"&ui-state=dialog"})}(n,this),function(n,t,i){var r={},u=n.find,f=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,e=/:jqmData\(([^)]*)\)/g;n.extend(n.mobile,{ns:"",getAttribute:function(t,i){var r;t=t.jquery?t[0]:t;t&&t.getAttribute&&(r=t.getAttribute("data-"+n.mobile.ns+i));try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:f.test(r)?JSON.parse(r):r}catch(u){}return r},nsNormalizeDict:r,nsNormalize:function(t){return r[t]||(r[t]=n.camelCase(n.mobile.ns+t))},closestPageData:function(n){return n.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")}});n.fn.jqmData=function(t,r){var u;return typeof t!="undefined"&&(t&&(t=n.mobile.nsNormalize(t)),u=arguments.length<2||r===i?this.data(t):this.data(t,r)),u};n.jqmData=function(t,i,r){var u;return typeof i!="undefined"&&(u=n.data(t,i?n.mobile.nsNormalize(i):i,r)),u};n.fn.jqmRemoveData=function(t){return this.removeData(n.mobile.nsNormalize(t))};n.jqmRemoveData=function(t,i){return n.removeData(t,n.mobile.nsNormalize(i))};n.find=function(t,i,r,f){return t.indexOf(":jqmData")>-1&&(t=t.replace(e,"[data-"+(n.mobile.ns||"")+"$1]")),u.call(this,t,i,r,f)};n.extend(n.find,u)}(n,this),function(n,t){function r(t,i){var r,f,e,o=t.nodeName.toLowerCase();return"area"===o?(r=t.parentNode,f=r.name,!t.href||!f||r.nodeName.toLowerCase()!=="map"?!1:(e=n("img[usemap=#"+f+"]")[0],!!e&&u(e))):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&u(t)}function u(t){return n.expr.filters.visible(t)&&!n(t).parents().addBack().filter(function(){return n.css(this,"visibility")==="hidden"}).length}var f=0,e=/^ui-id-\d+$/;n.ui=n.ui||{};n.extend(n.ui,{version:"c0ab71056b936627e8a7821f03c044aec6280a40",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}});n.fn.extend({focus:function(t){return function(i,r){return typeof i=="number"?this.each(function(){var t=this;setTimeout(function(){n(t).focus();r&&r.call(t)},i)}):t.apply(this,arguments)}}(n.fn.focus),scrollParent:function(){var t;return t=n.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(n.css(this,"position"))&&/(auto|scroll)/.test(n.css(this,"overflow")+n.css(this,"overflow-y")+n.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(n.css(this,"overflow")+n.css(this,"overflow-y")+n.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?n(this[0].ownerDocument||i):t},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++f)})},removeUniqueId:function(){return this.each(function(){e.test(this.id)&&n(this).removeAttr("id")})}});n.extend(n.expr[":"],{data:n.expr.createPseudo?n.expr.createPseudo(function(t){return function(i){return!!n.data(i,t)}}):function(t,i,r){return!!n.data(t,r[3])},focusable:function(t){return r(t,!isNaN(n.attr(t,"tabindex")))},tabbable:function(t){var i=n.attr(t,"tabindex"),u=isNaN(i);return(u||i>=0)&&r(t,!u)}});n("<a>").outerWidth(1).jquery||n.each(["Width","Height"],function(i,r){function u(t,i,r,u){return n.each(o,function(){i-=parseFloat(n.css(t,"padding"+this))||0;r&&(i-=parseFloat(n.css(t,"border"+this+"Width"))||0);u&&(i-=parseFloat(n.css(t,"margin"+this))||0)}),i}var o=r==="Width"?["Left","Right"]:["Top","Bottom"],f=r.toLowerCase(),e={innerWidth:n.fn.innerWidth,innerHeight:n.fn.innerHeight,outerWidth:n.fn.outerWidth,outerHeight:n.fn.outerHeight};n.fn["inner"+r]=function(i){return i===t?e["inner"+r].call(this):this.each(function(){n(this).css(f,u(this,i)+"px")})};n.fn["outer"+r]=function(t,i){return typeof t!="number"?e["outer"+r].call(this,t):this.each(function(){n(this).css(f,u(this,t,!0,i)+"px")})}});n.fn.addBack||(n.fn.addBack=function(n){return this.add(n==null?this.prevObject:this.prevObject.filter(n))});n("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(n.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,n.camelCase(i)):t.call(this)}}(n.fn.removeData));n.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());n.support.selectstart="onselectstart"in i.createElement("div");n.fn.extend({disableSelection:function(){return this.bind((n.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(n){n.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(r){if(r!==t)return this.css("zIndex",r);if(this.length)for(var u=n(this[0]),f,e;u.length&&u[0]!==i;){if(f=u.css("position"),(f==="absolute"||f==="relative"||f==="fixed")&&(e=parseInt(u.css("zIndex"),10),!isNaN(e)&&e!==0))return e;u=u.parent()}return 0}});n.ui.plugin={add:function(t,i,r){var u,f=n.ui[t].prototype;for(u in r)f.plugins[u]=f.plugins[u]||[],f.plugins[u].push([i,r[u]])},call:function(n,t,i,r){var u,f=n.plugins[t];if(f&&(r||n.element[0].parentNode&&n.element[0].parentNode.nodeType!==11))for(u=0;u<f.length;u++)n.options[f[u][0]]&&f[u][1].apply(n.element,i)}}}(n),function(n,t){var r=function(t,i){var u=t.parent(),r=[],f=function(){var t=n(this),i=n.mobile.toolbar&&t.data("mobile-toolbar")?t.toolbar("option"):{position:t.attr("data-"+n.mobile.ns+"position"),updatePagePadding:t.attr("data-"+n.mobile.ns+"update-page-padding")!==!1};return i.position!=="fixed"||i.updatePagePadding!==!0},e=u.children(":jqmData(role='header')").filter(f),s=t.children(":jqmData(role='header')"),o=u.children(":jqmData(role='footer')").filter(f),h=t.children(":jqmData(role='footer')");return s.length===0&&e.length>0&&(r=r.concat(e.toArray())),h.length===0&&o.length>0&&(r=r.concat(o.toArray())),n.each(r,function(t,r){i-=n(r).outerHeight()}),Math.max(0,i)};n.extend(n.mobile,{window:n(t),document:n(i),keyCode:n.ui.keyCode,behaviors:{},silentScroll:function(i){n.type(i)!=="number"&&(i=n.mobile.defaultHomeScroll);n.event.special.scrollstart.enabled=!1;setTimeout(function(){t.scrollTo(0,i);n.mobile.document.trigger("silentscroll",{x:0,y:i})},20);setTimeout(function(){n.event.special.scrollstart.enabled=!0},150)},getClosestBaseUrl:function(t){var i=n(t).closest(".ui-page").jqmData("url"),r=n.mobile.path.documentBase.hrefNoHash;return n.mobile.dynamicBaseEnabled&&i&&n.mobile.path.isPath(i)||(i=r),n.mobile.path.makeUrlAbsolute(i,r)},removeActiveLinkClass:function(t){!n.mobile.activeClickedLink||n.mobile.activeClickedLink.closest("."+n.mobile.activePageClass).length&&!t||n.mobile.activeClickedLink.removeClass(n.mobile.activeBtnClass);n.mobile.activeClickedLink=null},getInheritedTheme:function(n,t){for(var i=n[0],u="",r,f;i;){if(r=i.className||"",r&&(f=/ui-(bar|body|overlay)-([a-z])\b/.exec(r))&&(u=f[2]))break;i=i.parentNode}return u||t||"a"},enhanceable:function(n){return this.haveParents(n,"enhance")},hijackable:function(n){return this.haveParents(n,"ajax")},haveParents:function(t,i){if(!n.mobile.ignoreContentEnabled)return t;for(var h=t.length,f=n(),r,o,e,s,u=0;u<h;u++){for(o=t.eq(u),e=!1,r=t[u];r;){if(s=r.getAttribute?r.getAttribute("data-"+n.mobile.ns+i):"",s==="false"){e=!0;break}r=r.parentNode}e||(f=f.add(o))}return f},getScreenHeight:function(){return t.innerHeight||n.mobile.window.height()},resetActivePageHeight:function(t){var i=n("."+n.mobile.activePageClass),u=i.height(),f=i.outerHeight(!0);t=r(i,typeof t=="number"?t:n.mobile.getScreenHeight());i.css("min-height","");i.height()<t&&i.css("min-height",t-(f-u))},loading:function(){var t=this.loading._widget||n(n.mobile.loader.prototype.defaultHtml).loader(),i=t.loader.apply(t,arguments);return this.loading._widget=t,i}});n.addDependents=function(t,i){var r=n(t),u=r.jqmData("dependents")||n();r.jqmData("dependents",n(u).add(i))};n.fn.extend({removeWithDependents:function(){n.removeWithDependents(this)},enhanceWithin:function(){var t,i={},r=n.mobile.page.prototype.keepNativeSelector(),u=this;n.mobile.nojs&&n.mobile.nojs(this);n.mobile.links&&n.mobile.links(this);n.mobile.degradeInputsWithin&&n.mobile.degradeInputsWithin(this);n.fn.buttonMarkup&&this.find(n.fn.buttonMarkup.initSelector).not(r).jqmEnhanceable().buttonMarkup();n.fn.fieldcontain&&this.find(":jqmData(role='fieldcontain')").not(r).jqmEnhanceable().fieldcontain();n.each(n.mobile.widgets,function(t,f){if(f.initSelector){var e=n.mobile.enhanceable(u.find(f.initSelector));e.length>0&&(e=e.not(r));e.length>0&&(i[f.prototype.widgetName]=e)}});for(t in i)i[t][t]();return this},addDependents:function(t){n.addDependents(this,t)},getEncodedText:function(){return n("<a>").text(this.text()).html()},jqmEnhanceable:function(){return n.mobile.enhanceable(this)},jqmHijackable:function(){return n.mobile.hijackable(this)}});n.removeWithDependents=function(t){var i=n(t);(i.jqmData("dependents")||n()).remove();i.remove()};n.addDependents=function(t,i){var r=n(t),u=r.jqmData("dependents")||n();r.jqmData("dependents",n(u).add(i))};n.find.matches=function(t,i){return n.find(t,null,null,i)};n.find.matchesSelector=function(t,i){return n.find(i,null,null,[t]).length>0}}(n,this),function(n){t.matchMedia=t.matchMedia||function(n){var u,i=n.documentElement,f=i.firstElementChild||i.firstChild,r=n.createElement("body"),t=n.createElement("div");return t.id="mq-test-1",t.style.cssText="position:absolute;top:-100em",r.style.background="none",r.appendChild(t),function(n){return t.innerHTML='&shy;<style media="'+n+'"> #mq-test-1 { width: 42px; }<\/style>',i.insertBefore(r,f),u=t.offsetWidth===42,i.removeChild(r),{matches:u,media:n}}}(i);n.mobile.media=function(n){return t.matchMedia(n).matches}}(n),function(n){var t={touch:"ontouchend"in i};n.mobile.support=n.mobile.support||{};n.extend(n.support,t);n.extend(n.mobile.support,t)}(n),function(n){n.extend(n.support,{orientation:"orientation"in t&&"onorientationchange"in t})}(n),function(n,r){function f(n){var t=n.charAt(0).toUpperCase()+n.substr(1),i=(n+" "+o.join(t+" ")+t).split(" "),u;for(u in i)if(p[i[u]]!==r)return!0}function h(){var r=t,f=!!r.document.createElementNS&&!!r.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&(!r.opera||navigator.userAgent.indexOf("Chrome")!==-1),u=function(t){t&&f||n("html").addClass("ui-nosvg")},i=new r.Image;i.onerror=function(){u(!1)};i.onload=function(){u(i.width===1&&i.height===1)};i.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}function c(){var h="transform-3d",f=n.mobile.media("(-"+o.join("-"+h+"),(-")+"-"+h+"),("+h+")"),e,c,s;if(f)return!!f;e=i.createElement("div");c={MozTransform:"-moz-transform",transform:"transform"};u.append(e);for(s in c)e.style[s]!==r&&(e.style[s]="translate3d( 100px, 1px, 1px )",f=t.getComputedStyle(e).getPropertyValue(c[s]));return!!f&&f!=="none"}function l(){var r=location.protocol+"//"+location.host+location.pathname+"ui-dir/",t=n("head base"),i=null,f="",e,o;return t.length?f=t.attr("href"):t=i=n("<base>",{href:r}).appendTo("head"),e=n("<a href='testurl' />").prependTo(u),o=e[0].href,t[0].href=f||location.pathname,i&&i.remove(),o.indexOf(r)===0}function a(){var n=i.createElement("x"),r=i.documentElement,u=t.getComputedStyle,f;return"pointerEvents"in n.style?(n.style.pointerEvents="auto",n.style.pointerEvents="x",r.appendChild(n),f=u&&u(n,"").pointerEvents==="auto",r.removeChild(n),!!f):!1}function v(){var n=i.createElement("div");return typeof n.getBoundingClientRect!="undefined"}function y(){var f=t,n=navigator.userAgent,r=navigator.platform,e=n.match(/AppleWebKit\/([0-9]+)/),i=!!e&&e[1],o=n.match(/Fennec\/([0-9]+)/),s=!!o&&o[1],u=n.match(/Opera Mobi\/([0-9]+)/),h=!!u&&u[1];return(r.indexOf("iPhone")>-1||r.indexOf("iPad")>-1||r.indexOf("iPod")>-1)&&i&&i<534||f.operamini&&{}.toString.call(f.operamini)==="[object OperaMini]"||u&&h<7458||n.indexOf("Android")>-1&&i&&i<533||s&&s<6||"palmGetResource"in t&&i&&i<534||n.indexOf("MeeGo")>-1&&n.indexOf("NokiaBrowser/8.5.0")>-1?!1:!0}var u=n("<body>").prependTo("html"),p=u[0].style,o=["Webkit","Moz","O"],w="palmGetResource"in t,s=t.operamini&&{}.toString.call(t.operamini)==="[object OperaMini]",b=t.blackberry&&!f("-webkit-transform"),e;n.extend(n.mobile,{browser:{}});n.mobile.browser.oldIE=function(){var n=3,t=i.createElement("div"),r=t.all||[];do t.innerHTML="<!--[if gt IE "+ ++n+"]><br><![endif]-->";while(r[0]);return n>4?n:!n}();n.extend(n.support,{pushState:"pushState"in history&&"replaceState"in history&&!(t.navigator.userAgent.indexOf("Firefox")>=0&&t.top!==t)&&t.navigator.userAgent.search(/CriOS/)===-1,mediaquery:n.mobile.media("only all"),cssPseudoElement:!!f("content"),touchOverflow:!!f("overflowScrolling"),cssTransform3d:c(),boxShadow:!!f("boxShadow")&&!b,fixedPosition:y(),scrollTop:("pageXOffset"in t||"scrollTop"in i.documentElement||"scrollTop"in u[0])&&!w&&!s,dynamicBaseTag:l(),cssPointerEvents:a(),boundingRect:v(),inlineSVG:h});u.remove();e=function(){var n=t.navigator.userAgent;return n.indexOf("Nokia")>-1&&(n.indexOf("Symbian/3")>-1||n.indexOf("Series60/5")>-1)&&n.indexOf("AppleWebKit")>-1&&n.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}();n.mobile.gradeA=function(){return(n.support.mediaquery&&n.support.cssPseudoElement||n.mobile.browser.oldIE&&n.mobile.browser.oldIE>=8)&&(n.support.boundingRect||n.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/)!==null)};n.mobile.ajaxBlacklist=t.blackberry&&!t.WebKitPoint||s||e;e&&n(function(){n("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")});n.support.boxShadow||n("html").addClass("ui-noboxshadow")}(n),function(n,t){var r=n.mobile.window,i,u=function(){};n.event.special.beforenavigate={setup:function(){r.on("navigate",u)},teardown:function(){r.off("navigate",u)}};n.event.special.navigate=i={bound:!1,pushStateEnabled:!0,originalEventName:t,isPushStateEnabled:function(){return n.support.pushState&&n.mobile.pushStateEnabled===!0&&this.isHashChangeEnabled()},isHashChangeEnabled:function(){return n.mobile.hashListeningEnabled===!0},popstate:function(t){var u=new n.Event("navigate"),i=new n.Event("beforenavigate"),f=t.originalEvent.state||{};(i.originalEvent=t,r.trigger(i),i.isDefaultPrevented())||(t.historyState&&n.extend(f,t.historyState),u.originalEvent=t,setTimeout(function(){r.trigger(u,{state:f})},0))},hashchange:function(t){var u=new n.Event("navigate"),i=new n.Event("beforenavigate");(i.originalEvent=t,r.trigger(i),i.isDefaultPrevented())||(u.originalEvent=t,r.trigger(u,{state:t.hashchangeState||{}}))},setup:function(){i.bound||(i.bound=!0,i.isPushStateEnabled()?(i.originalEventName="popstate",r.bind("popstate.navigate",i.popstate)):i.isHashChangeEnabled()&&(i.originalEventName="hashchange",r.bind("hashchange.navigate",i.hashchange)))}}}(n),function(n){n.event.special.throttledresize={setup:function(){n(this).bind("resize",t)},teardown:function(){n(this).unbind("resize",t)}};var f=250,t=function(){r=(new Date).getTime();u=r-e;u>=f?(e=r,n(this).trigger("throttledresize")):(i&&clearTimeout(i),i=setTimeout(t,f-u))},e=0,i,r,u}(n),function(n,t){function a(){var n=f();n!==e&&(e=n,r.trigger(u))}var r=n(t),u="orientationchange",f,e,o,s,h={0:!0,180:!0},c,l,v;n.support.orientation&&(c=t.innerWidth||r.width(),l=t.innerHeight||r.height(),v=50,o=c>l&&c-l>v,s=h[t.orientation],(o&&s||!o&&!s)&&(h={"-90":!0,90:!0}));n.event.special.orientationchange=n.extend({},n.event.special.orientationchange,{setup:function(){if(n.support.orientation&&!n.event.special.orientationchange.disabled)return!1;e=f();r.bind("throttledresize",a)},teardown:function(){if(n.support.orientation&&!n.event.special.orientationchange.disabled)return!1;r.unbind("throttledresize",a)},add:function(n){var t=n.handler;n.handler=function(n){return n.orientation=f(),t.apply(this,arguments)}}});n.event.special.orientationchange.orientation=f=function(){var u=!0,r=i.documentElement;return u=n.support.orientation?h[t.orientation]:r&&r.clientWidth/r.clientHeight<1.1,u?"portrait":"landscape"};n.fn[u]=function(n){return n?this.bind(u,n):this.trigger(u)};n.attrFn&&(n.attrFn[u]=!0)}(n,this),function(n,t,i,r){function h(n){while(n&&typeof n.originalEvent!="undefined")n=n.originalEvent;return n}function vt(t,i){var u=t.type,e,o,l,f,s,a,v,c,y;if(t=n.Event(t),t.type=i,e=t.originalEvent,o=n.event.props,u.search(/^(mouse|click)/)>-1&&(o=gt),e)for(v=o.length,f;v;)f=o[--v],t[f]=e[f];if(u.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1),u.search(/^touch/)!==-1&&(l=h(e),u=l.touches,s=l.changedTouches,a=u&&u.length?u[0]:s&&s.length?s[0]:r,a))for(c=0,y=ct.length;c<y;c++)f=ct[c],t[f]=a[f];return t}function v(t){for(var i={},r,u;t;){r=n.data(t,o);for(u in r)r[u]&&(i[u]=i.hasVirtualBinding=!0);t=t.parentNode}return i}function yt(t,i){for(var r;t;){if(r=n.data(t,o),r&&(!i||r[i]))return t;t=t.parentNode}return null}function pt(){l=!1}function tt(){l=!0}function wt(){s=0;y.length=0;d=!1;tt()}function bt(){pt()}function w(){it();c=setTimeout(function(){c=0;wt()},n.vmouse.resetTimerDuration)}function it(){c&&(clearTimeout(c),c=0)}function f(t,i,r){var u;return(r&&r[t]||!r&&yt(i.target,t))&&(u=vt(i,t),n(i.target).trigger(u)),u}function rt(t){var r=n.data(t.target,b),i;d||s&&s===r||(i=f("v"+t.type,t),i&&(i.isDefaultPrevented()&&t.preventDefault(),i.isPropagationStopped()&&t.stopPropagation(),i.isImmediatePropagationStopped()&&t.stopImmediatePropagation()))}function ut(t){var o=h(t).touches,r,i,u;o&&o.length===1&&(r=t.target,i=v(r),i.hasVirtualBinding&&(s=ni++,n.data(r,b,s),it(),bt(),e=!1,u=h(t).touches[0],lt=u.pageX,at=u.pageY,f("vmouseover",t,i),f("vmousedown",t,i)))}function ft(n){l||(e||f("vmousecancel",n,v(n.target)),e=!0,w())}function et(t){if(!l){var i=h(t).touches[0],o=e,r=n.vmouse.moveDistanceThreshold,u=v(t.target);e=e||Math.abs(i.pageX-lt)>r||Math.abs(i.pageY-at)>r;e&&!o&&f("vmousecancel",t,u);f("vmousemove",t,u);w()}}function ot(n){if(!l){tt();var t=v(n.target),i,r;f("vmouseup",n,t);e||(i=f("vclick",n,t),i&&i.isDefaultPrevented()&&(r=h(n).changedTouches[0],y.push({touchID:s,x:r.clientX,y:r.clientY}),d=!0));f("vmouseout",n,t);e=!1;w()}}function st(t){var i=n.data(t,o),r;if(i)for(r in i)if(i[r])return!0;return!1}function ht(){}function kt(t){var i=t.substr(1);return{setup:function(){st(this)||n.data(this,o,{});var r=n.data(this,o);r[t]=!0;u[t]=(u[t]||0)+1;u[t]===1&&p.bind(i,rt);n(this).bind(i,ht);g&&(u.touchstart=(u.touchstart||0)+1,u.touchstart===1&&p.bind("touchstart",ut).bind("touchend",ot).bind("touchmove",et).bind("scroll",ft))},teardown:function(){--u[t];u[t]||p.unbind(i,rt);g&&(--u.touchstart,u.touchstart||p.unbind("touchstart",ut).unbind("touchmove",et).unbind("touchend",ot).unbind("scroll",ft));var r=n(this),f=n.data(this,o);f&&(f[t]=!1);r.unbind(i,ht);st(this)||r.removeData(o)}}}var o="virtualMouseBindings",b="virtualTouchID",k="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),ct="clientX clientY pageX pageY screenX screenY".split(" "),dt=n.event.mouseHooks?n.event.mouseHooks.props:[],gt=n.event.props.concat(dt),u={},c=0,lt=0,at=0,e=!1,y=[],d=!1,l=!1,g="addEventListener"in i,p=n(i),ni=1,s=0,nt,a;for(n.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500},a=0;a<k.length;a++)n.event.special[k[a]]=kt(k[a]);g&&i.addEventListener("click",function(t){var f=y.length,e=t.target,o,s,i,r,u,h;if(f)for(o=t.clientX,s=t.clientY,nt=n.vmouse.clickDistanceThreshold,i=e;i;){for(r=0;r<f;r++)if(u=y[r],h=0,i===e&&Math.abs(u.x-o)<nt&&Math.abs(u.y-s)<nt||n.data(i,b)===u.touchID){t.preventDefault();t.stopPropagation();return}i=i.parentNode}},!0)}(n,t,i),function(n,t,r){function f(t,i,u,f){var e=u.type;u.type=i;f?n.event.trigger(u,r,t):n.event.dispatch.call(t,u);u.type=e}var u=n(i),e=n.mobile.support.touch,s="touchmove scroll",h=e?"touchstart":"mousedown",c=e?"touchend":"mouseup",o=e?"touchmove":"mousemove";n.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,i){n.fn[i]=function(n){return n?this.bind(i,n):this.trigger(i)};n.attrFn&&(n.attrFn[i]=!0)});n.event.special.scrollstart={enabled:!0,setup:function(){function i(n,i){t=i;f(r,t?"scrollstart":"scrollstop",n)}var r=this,e=n(r),t,u;e.bind(s,function(r){n.event.special.scrollstart.enabled&&(t||i(r,!0),clearTimeout(u),u=setTimeout(function(){i(r,!1)},50))})},teardown:function(){n(this).unbind(s)}};n.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var i=this,r=n(i),t=!1;r.bind("vmousedown",function(e){function o(){clearTimeout(l)}function s(){o();r.unbind("vclick",h).unbind("vmouseup",o);u.unbind("vmousecancel",s)}function h(n){s();!t&&c===n.target?f(i,"tap",n):t&&n.preventDefault()}if(t=!1,e.which&&e.which!==1)return!1;var c=e.target,l;r.bind("vmouseup",o).bind("vclick",h);u.bind("vmousecancel",s);l=setTimeout(function(){n.event.special.tap.emitTapOnTaphold||(t=!0);f(i,"taphold",n.Event("taphold",{target:c}))},n.event.special.tap.tapholdThreshold)})},teardown:function(){n(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup");u.unbind("vmousecancel")}};n.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(n){var u=t.pageXOffset,f=t.pageYOffset,i=n.clientX,r=n.clientY;return n.pageY===0&&Math.floor(r)>Math.floor(n.pageY)||n.pageX===0&&Math.floor(i)>Math.floor(n.pageX)?(i-=u,r-=f):(r<n.pageY-f||i<n.pageX-u)&&(i=n.pageX-u,r=n.pageY-f),{x:i,y:r}},start:function(t){var r=t.originalEvent.touches?t.originalEvent.touches[0]:t,i=n.event.special.swipe.getLocation(r);return{time:(new Date).getTime(),coords:[i.x,i.y],origin:n(t.target)}},stop:function(t){var r=t.originalEvent.touches?t.originalEvent.touches[0]:t,i=n.event.special.swipe.getLocation(r);return{time:(new Date).getTime(),coords:[i.x,i.y]}},handleSwipe:function(t,i,r,u){if(i.time-t.time<n.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-i.coords[0])>n.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-i.coords[1])<n.event.special.swipe.verticalDistanceThreshold){var e=t.coords[0]>i.coords[0]?"swipeleft":"swiperight";return f(r,"swipe",n.Event("swipe",{target:u,swipestart:t,swipestop:i}),!0),f(r,e,n.Event(e,{target:u,swipestart:t,swipestop:i}),!0),!0}return!1},eventInProgress:!1,setup:function(){var i,r=this,f=n(r),t={};i=n.data(this,"mobile-events");i||(i={length:0},n.data(this,"mobile-events",i));i.length++;i.swipe=t;t.start=function(i){if(!n.event.special.swipe.eventInProgress){n.event.special.swipe.eventInProgress=!0;var e,s=n.event.special.swipe.start(i),h=i.target,f=!1;t.move=function(t){s&&!t.isDefaultPrevented()&&(e=n.event.special.swipe.stop(t),f||(f=n.event.special.swipe.handleSwipe(s,e,r,h),f&&(n.event.special.swipe.eventInProgress=!1)),Math.abs(s.coords[0]-e.coords[0])>n.event.special.swipe.scrollSupressionThreshold&&t.preventDefault())};t.stop=function(){f=!0;n.event.special.swipe.eventInProgress=!1;u.off(o,t.move);t.move=null};u.on(o,t.move).one(c,t.stop)}};f.on(h,t.start)},teardown:function(){var i,t;i=n.data(this,"mobile-events");i&&(t=i.swipe,delete i.swipe,i.length--,i.length===0&&n.removeData(this,"mobile-events"));t&&(t.start&&n(this).off(h,t.start),t.move&&u.off(o,t.move),t.stop&&u.off(c,t.stop))}};n.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,i){n.event.special[t]={setup:function(){n(this).bind(i,n.noop)},teardown:function(){n(this).unbind(i)}}})}(n,this)})