!function(n,t){function v(n,t,r){var e=n.children(),o=!1,u,s,f;for(n.empty(),u=0,s=e.length;s>u;u++){if(f=e.eq(u),n.append(f),r&&n.append(r),i(n,t)){f.remove();o=!0;break}r&&r.detach()}return o}function f(t,r,u,e,o){var s=!1,h="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",c="script, .dotdotdot-keep";return t.contents().detach().each(function(){var a=this,l=n(a);if("undefined"==typeof a)return!0;if(l.is(c))t.append(l);else{if(s)return!0;t.append(l);!o||l.is(e.after)||l.find(e.after).length||t[t.is(h)?"after":"append"](o);i(u,e)&&(s=3==a.nodeType?y(l,r,u,e,o):f(l,r,u,e,o),s||(l.detach(),s=!0));s||o&&o.detach()}}),r.addClass("is-truncated"),s}function y(t,f,o,h,c){var l=t[0],nt,k,d;if(!l)return!1;var y=s(l),tt=-1!==y.indexOf(" ")?" ":"　",p="letter"==h.wrap?"":tt,a=y.split(p),g=-1,w=-1,b=0,v=a.length-1;for(h.fallbackToLetter&&0==b&&0==v&&(p="",a=y.split(p),v=a.length-1);v>=b&&(0!=b||0!=v);){if(nt=Math.floor((b+v)/2),nt==w)break;w=nt;u(l,a.slice(0,w+1).join(p)+h.ellipsis);o.children().each(function(){n(this).toggle().toggle()});i(o,h)?(v=w,h.fallbackToLetter&&0==b&&0==v&&(p="",a=a[0].split(p),g=-1,w=-1,b=0,v=a.length-1)):(g=w,b=w)}return-1==g||1==a.length&&0==a[0].length?(k=t.parent(),t.detach(),d=c&&c.closest(k).length?c.length:0,k.contents().length>d?l=r(k.contents().eq(-1-d),f):(l=r(k,f,!0),d||k.detach()),l&&(y=e(s(l),h),u(l,y),d&&c&&n(l).parent().append(c))):(y=e(a.slice(0,g+1).join(p),h),u(l,y)),!0}function i(n,t){return n.innerHeight()>t.maxHeight}function e(t,i){for(;n.inArray(t.slice(-1),i.lastCharacter.remove)>-1;)t=t.slice(0,-1);return n.inArray(t.slice(-1),i.lastCharacter.noEllipsis)<0&&(t+=i.ellipsis),t}function o(n){return{width:n.innerWidth(),height:n.innerHeight()}}function u(n,t){n.innerText?n.innerText=t:n.nodeValue?n.nodeValue=t:n.textContent&&(n.textContent=t)}function s(n){return n.innerText?n.innerText:n.nodeValue?n.nodeValue:n.textContent?n.textContent:""}function h(n){do n=n.previousSibling;while(n&&1!==n.nodeType&&3!==n.nodeType);return n}function r(t,i,u){var f,e=t&&t[0];if(e){if(!u){if(3===e.nodeType)return e;if(n.trim(t.text()))return r(t.contents().last(),i)}for(f=h(e);!f;){if(t=t.parent(),t.is(i)||!t.length)return!1;f=h(t[0])}if(f)return r(n(f),i)}return!1}function p(t,i){return t?"string"==typeof t?(t=n(t,i),t.length?t:!1):t.jquery?t:!1:!1}function w(n){for(var t,r=n.innerHeight(),u=["paddingTop","paddingBottom"],i=0,f=u.length;f>i;i++)t=parseInt(n.css(u[i]),10),isNaN(t)&&(t=0),r-=t;return r}var c,l,a;n.fn.dotdotdot||(n.fn.dotdotdot=function(t){var r;if(0==this.length)return n.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){n(this).dotdotdot(t)});r=this;r.data("dotdotdot")&&r.trigger("destroy.dot");r.data("dotdotdot-style",r.attr("style")||"");r.css("word-wrap","break-word");"nowrap"===r.css("white-space")&&r.css("white-space","normal");r.bind_events=function(){return r.bind("update.dot",function(t,o){switch(r.removeClass("is-truncated"),t.preventDefault(),t.stopPropagation(),typeof u.height){case"number":u.maxHeight=u.height;break;case"function":u.maxHeight=u.height.call(r[0]);break;default:u.maxHeight=w(r)}u.maxHeight+=u.tolerance;"undefined"!=typeof o&&(("string"==typeof o||"nodeType"in o&&1===o.nodeType)&&(o=n("<div />").append(o).contents()),o instanceof n&&(h=o));s=r.wrapInner('<div class="dotdotdot" />').children();s.contents().detach().end().append(h.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var c=!1,l=!1;return e.afterElement&&(c=e.afterElement.clone(!0),c.show(),e.afterElement.detach()),i(s,u)&&(l="children"==u.wrap?v(s,u,c):f(s,r,s,u,c)),s.replaceWith(s.contents()),s=null,n.isFunction(u.callback)&&u.callback.call(r[0],l,h),e.isTruncated=l,l}).bind("isTruncated.dot",function(n,t){return n.preventDefault(),n.stopPropagation(),"function"==typeof t&&t.call(r[0],e.isTruncated),e.isTruncated}).bind("originalContent.dot",function(n,t){return n.preventDefault(),n.stopPropagation(),"function"==typeof t&&t.call(r[0],h),h}).bind("destroy.dot",function(n){n.preventDefault();n.stopPropagation();r.unwatch().unbind_events().contents().detach().end().append(h).attr("style",r.data("dotdotdot-style")||"").data("dotdotdot",!1)}),r};r.unbind_events=function(){return r.unbind(".dot"),r};r.watch=function(){if(r.unwatch(),"window"==u.watch){var t=n(window),i=t.width(),f=t.height();t.bind("resize.dot"+e.dotId,function(){i==t.width()&&f==t.height()&&u.windowResizeFix||(i=t.width(),f=t.height(),l&&clearInterval(l),l=setTimeout(function(){r.trigger("update.dot")},100))})}else a=o(r),l=setInterval(function(){if(r.is(":visible")){var n=o(r);(a.width!=n.width||a.height!=n.height)&&(r.trigger("update.dot"),a=n)}},500);return r};r.unwatch=function(){return n(window).unbind("resize.dot"+e.dotId),l&&clearInterval(l),r};var h=r.contents(),u=n.extend(!0,{},n.fn.dotdotdot.defaults,t),e={},a={},l=null,s=null;return u.lastCharacter.remove instanceof Array||(u.lastCharacter.remove=n.fn.dotdotdot.defaultArrays.lastCharacter.remove),u.lastCharacter.noEllipsis instanceof Array||(u.lastCharacter.noEllipsis=n.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),e.afterElement=p(u.after,r),e.isTruncated=!1,e.dotId=c++,r.data("dotdotdot",!0).bind_events().trigger("update.dot"),u.watch&&r.watch(),r},n.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},n.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},n.fn.dotdotdot.debug=function(){},c=1,l=n.fn.html,n.fn.html=function(i){return i!=t&&!n.isFunction(i)&&this.data("dotdotdot")?this.trigger("update",[i]):l.apply(this,arguments)},a=n.fn.text,n.fn.text=function(i){return i!=t&&!n.isFunction(i)&&this.data("dotdotdot")?(i=n("<div />").text(i).html(),this.trigger("update",[i])):a.apply(this,arguments)})}(jQuery)