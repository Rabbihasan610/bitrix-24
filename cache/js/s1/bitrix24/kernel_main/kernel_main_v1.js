; /* /bitrix/js/main/session.min.js?16988537912394*/
; /* /bitrix/js/main/core/core_fx.min.js?16988537929768*/
; /* /bitrix/js/main/pageobject/pageobject.min.js?1698853788570*/
; /* /bitrix/js/main/date/main.date.min.js?169885378817992*/
; /* /bitrix/js/main/core/core_date.min.js?169885379226661*/
; /* /bitrix/js/main/core/core_tooltip.min.js?169885379211722*/
; /* /bitrix/js/main/core/core_timer.js?16988537926316*/
; /* /bitrix/js/main/core/core_window.min.js?169885379276326*/
; /* /bitrix/js/main/dd.min.js?169885378811114*/
; /* /bitrix/js/main/core/core_dd.js?16988537923613*/
; /* /bitrix/js/main/core/core_webrtc.js?169885379224229*/
; /* /bitrix/js/main/rating_like.js?1698853791244*/
; /* /bitrix/js/main/core/core_uf.min.js?169885379211603*/
; /* /bitrix/js/main/core/core_autosave.min.js?16988537927139*/

; /* Start:"a:4:{s:4:"full";s:45:"/bitrix/js/main/session.min.js?16988537912394";s:6:"source";s:26:"/bitrix/js/main/session.js";s:3:"min";s:30:"/bitrix/js/main/session.min.js";s:3:"map";s:30:"/bitrix/js/main/session.map.js";}"*/
function CBXSession(){var e=this;this.dateInput=new Date;this.dateCheck=new Date;this.dateHit=new Date;this.notifier=null;this.checkInterval=60;this.checkImmediately=false;this.Expand=function(t){this.key=t;BX.ready(function(){BX.bind(document,"keypress",e.OnUserInput);BX.bind(document.body,"mousemove",e.OnUserInput);BX.bind(document.body,"click",e.OnUserInput);setInterval(e.CheckSession,e.checkInterval*1e3)})};this.OnUserInput=function(){var t=new Date;e.dateInput.setTime(t.valueOf());if((t-e.dateHit)/1e3>e.checkInterval+5&&e.checkImmediately===false){e.checkImmediately=true;e.CheckSession()}};this.CheckSession=function(){var t=new Date;if((t-e.dateCheck)/1e3<e.checkInterval-1&&e.checkImmediately===false){return}e.dateCheck.setTime(t.valueOf());if(e.dateInput>e.dateHit){var i={method:"GET",headers:[{name:"X-Bitrix-Csrf-Token",value:BX.bitrix_sessid()}],dataType:"html",url:"/bitrix/tools/public_session.php?k="+e.key,data:"",onsuccess:function(t){e.CheckResult(t)},lsId:"sess_expand",lsTimeout:e.checkInterval-5};BX.ajax(i)}};this.CheckResult=function(t){var i=new Date;e.dateHit.setTime(i.valueOf());e.checkImmediately=false;if(t=="SESSION_EXPIRED"){if(BX.message("SessExpired")){if(!e.notifier){e.notifier=document.body.appendChild(BX.create("DIV",{props:{className:"bx-session-message"},style:{top:"0",backgroundColor:"#FFEB41",border:"1px solid #EDDA3C",width:"630px",fontFamily:"Arial,Helvetica,sans-serif",fontSize:"13px",fontWeight:"bold",textAlign:"center",color:"black",position:"absolute",zIndex:"10000",padding:"10px"},html:'<a class="bx-session-message-close" '+'style="display:block; width:12px; height:12px; background:url(/bitrix/js/main/core/images/close.gif) center no-repeat; float:right;" '+'href="javascript:bxSession.Close()"></a>'+BX.message("SessExpired")}));BX.ZIndexManager.register(e.notifier);BX.ZIndexManager.bringToFront(e.notifier);var s=BX.GetWindowScrollPos();var n=BX.GetWindowInnerSize();e.notifier.style.left=parseInt(s.scrollLeft+n.innerWidth/2-parseInt(e.notifier.clientWidth)/2)+"px";if(BX.browser.IsIE()){e.notifier.style.top=s.scrollTop+"px";BX.bind(window,"scroll",function(){var t=BX.GetWindowScrollPos();e.notifier.style.top=t.scrollTop+"px"})}else{e.notifier.style.position="fixed"}}e.notifier.style.display=""}}};this.Close=function(){this.notifier.style.display="none"}}var bxSession=new CBXSession;
/* End */
;
; /* Start:"a:4:{s:4:"full";s:50:"/bitrix/js/main/core/core_fx.min.js?16988537929768";s:6:"source";s:31:"/bitrix/js/main/core/core_fx.js";s:3:"min";s:35:"/bitrix/js/main/core/core_fx.min.js";s:3:"map";s:35:"/bitrix/js/main/core/core_fx.map.js";}"*/
(function(t){var i={time:1,step:.05,type:"linear",allowFloat:false};BX.fx=function(t){this.options=t;if(null!=this.options.time)this.options.originalTime=this.options.time;if(null!=this.options.step)this.options.originalStep=this.options.step;if(!this.__checkOptions())return false;this.__go=BX.delegate(this.go,this);this.PARAMS={}};BX.fx.prototype.__checkOptions=function(){if(typeof this.options.start!=typeof this.options.finish)return false;if(null==this.options.time)this.options.time=i.time;if(null==this.options.step)this.options.step=i.step;if(null==this.options.type)this.options.type=i.type;if(null==this.options.allowFloat)this.options.allowFloat=i.allowFloat;this.options.time*=1e3;this.options.step*=1e3;if(typeof this.options.start!="object"){this.options.start={_param:this.options.start};this.options.finish={_param:this.options.finish}}var e;for(e in this.options.start){if(null==this.options.finish[e]){this.options.start[e]=null;delete this.options.start[e]}}if(!BX.type.isFunction(this.options.type)){if(BX.type.isFunction(t[this.options.type]))this.options.type=t[this.options.type];else if(BX.type.isFunction(BX.fx.RULES[this.options.type]))this.options.type=BX.fx.RULES[this.options.type];else this.options.type=BX.fx.RULES[i.type]}return true};BX.fx.prototype.go=function(){var t=(new Date).valueOf();if(t<this.PARAMS.timeFinish){for(var i in this.PARAMS.current){this.PARAMS.current[i][0]=this.options.type.apply(this,[{start_value:this.PARAMS.start[i][0],finish_value:this.PARAMS.finish[i][0],current_value:this.PARAMS.current[i][0],current_time:t-this.PARAMS.timeStart,total_time:this.options.time}])}this._callback(this.options.callback);if(!this.paused)this.PARAMS.timer=setTimeout(this.__go,this.options.step)}else{this.stop()}};BX.fx.prototype._callback=function(t){var i={};t=t||this.options.callback;for(var e in this.PARAMS.current){i[e]=(this.options.allowFloat?this.PARAMS.current[e][0]:Math.round(this.PARAMS.current[e][0]))+this.PARAMS.current[e][1]}return t.apply(this,[null!=i["_param"]?i._param:i])};BX.fx.prototype.start=function(){var t,i,e;this.PARAMS.start={};this.PARAMS.current={};this.PARAMS.finish={};for(t in this.options.start){i=+this.options.start[t];e=(this.options.start[t]+"").substring((i+"").length);this.PARAMS.start[t]=[i,e];this.PARAMS.current[t]=[i,e];this.PARAMS.finish[t]=[+this.options.finish[t],e]}this._callback(this.options.callback_start);this._callback(this.options.callback);this.PARAMS.timeStart=(new Date).valueOf();this.PARAMS.timeFinish=this.PARAMS.timeStart+this.options.time;this.PARAMS.timer=setTimeout(BX.delegate(this.go,this),this.options.step);return this};BX.fx.prototype.pause=function(){if(this.paused){this.PARAMS.timer=setTimeout(this.__go,this.options.step);this.paused=false}else{clearTimeout(this.PARAMS.timer);this.paused=true}};BX.fx.prototype.stop=function(t){t=!!t;if(this.PARAMS.timer)clearTimeout(this.PARAMS.timer);if(null!=this.options.originalTime)this.options.time=this.options.originalTime;if(null!=this.options.originalStep)this.options.step=this.options.originalStep;this.PARAMS.current=this.PARAMS.finish;if(!t){this._callback(this.options.callback);this._callback(this.options.callback_complete)}};BX.fx.RULES={linear:function(t){return t.start_value+t.current_time/t.total_time*(t.finish_value-t.start_value)},decelerated:function(t){return t.start_value+Math.sqrt(t.current_time/t.total_time)*(t.finish_value-t.start_value)},accelerated:function(t){var i=t.current_time/t.total_time;return t.start_value+i*i*(t.finish_value-t.start_value)}};BX.fx.hide=function(t,i,e){t=BX(t);if(typeof i=="object"&&null==e){e=i;i=e.type}if(!e)e={};if(!BX.type.isNotEmptyString(i)){t.style.display="none";return}var s=BX.fx.EFFECTS[i](t,e,0);s.callback_complete=function(){if(e.hide!==false)t.style.display="none";if(e.callback_complete)e.callback_complete.apply(this,arguments)};return new BX.fx(s).start()};BX.fx.show=function(t,i,e){t=BX(t);if(typeof i=="object"&&null==e){e=i;i=e.type}if(!e)e={};if(!BX.type.isNotEmptyString(i)){t.style.display="block";return}var s=BX.fx.EFFECTS[i](t,e,1);s.callback_complete=function(){if(e.show!==false)t.style.display="block";if(e.callback_complete)e.callback_complete.apply(this,arguments)};return new BX.fx(s).start()};BX.fx.EFFECTS={scroll:function(t,e,s){if(!e.direction)e.direction="vertical";var n=e.direction=="horizontal"?"width":"height";var o=parseInt(BX.style(t,n));if(isNaN(o)){o=BX.pos(t)[n]}if(s==0)var a=o,r=e.min_height?parseInt(e.min_height):0;else var r=o,a=e.min_height?parseInt(e.min_height):0;return{start:a,finish:r,time:e.time||i.time,type:"linear",callback_start:function(){if(BX.style(t,"position")=="static")t.style.position="relative";t.style.overflow="hidden";t.style[n]=a+"px";t.style.display="block"},callback:function(i){t.style[n]=i+"px"}}},fade:function(t,e,s){var n={time:e.time||i.time,type:s==0?"decelerated":"linear",start:s==0?1:0,finish:s==0?0:1,allowFloat:true};if(BX.browser.IsIE()&&!BX.browser.IsIE9()){n.start*=100;n.finish*=100;n.allowFloat=false;n.callback_start=function(){t.style.display="block";t.style.filter+="progid:DXImageTransform.Microsoft.Alpha(opacity="+n.start+")"};n.callback=function(i){(t.filters["DXImageTransform.Microsoft.alpha"]||t.filters.alpha).opacity=i}}else{n.callback_start=function(){t.style.display="block"};n.callback=function(i){t.style.opacity=t.style.KhtmlOpacity=t.style.MozOpacity=i}}return n},fold:function(t,e,s){if(s!=0)return;var n=BX.pos(t);var o=n.height/(n.width+n.height);var a={time:e.time||i.time,callback_complete:e.callback_complete,hide:e.hide};e.type="scroll";e.direction="vertical";e.min_height=e.min_height||10;e.hide=false;e.time=o*a.time;e.callback_complete=function(){t.style.whiteSpace="nowrap";e.direction="horizontal";e.min_height=null;e.time=a.time-e.time;e.hide=a.hide;e.callback_complete=a.callback_complete;BX.fx.hide(t,e)};return BX.fx.EFFECTS.scroll(t,e,s)},scale:function(t,e,s){var n={width:parseInt(BX.style(t,"width")),height:parseInt(BX.style(t,"height"))};if(isNaN(n.width)||isNaN(n.height)){var o=BX.pos(t);n={width:o.width,height:o.height}}if(s==0)var a=n,r={width:0,height:0};else var r=n,a={width:0,height:0};return{start:a,finish:r,time:e.time||i.time,type:"linear",callback_start:function(){t.style.position="relative";t.style.overflow="hidden";t.style.display="block";t.style.height=a.height+"px";t.style.width=a.width+"px"},callback:function(i){t.style.height=i.height+"px";t.style.width=i.width+"px"}}}};var e={arStack:{},arRules:{},globalAnimationId:0};BX.fx.colorAnimate=function(t,i,s){if(t==null)return;animationId=t.getAttribute("data-animation-id");if(animationId==null){animationId=e.globalAnimationId;t.setAttribute("data-animation-id",e.globalAnimationId++)}var n=i.split(/\s*,\s*/);for(var o=0;o<n.length;o++){i=n[o];if(!e.arRules[i])continue;var a=0;if(!e.arStack[animationId]){e.arStack[animationId]={}}else if(e.arStack[animationId][i]){a=e.arStack[animationId][i].i;clearInterval(e.arStack[animationId][i].tId)}if(a==0&&s||a==e.arRules[i][3]&&!s)continue;e.arStack[animationId][i]={i:a,element:t,tId:setInterval('BX.fx.colorAnimate.run("'+animationId+'","'+i+'")',e.arRules[i][4]),back:Boolean(s)}}};BX.fx.colorAnimate.addRule=function(t,i,s,n,o,a,r){e.arRules[t]=[BX.util.hex2rgb(i),BX.util.hex2rgb(s),n.replace(/\-(.)/g,function(){return arguments[1].toUpperCase()}),o,a||1,r||false]};BX.fx.colorAnimate.run=function(t,i){element=e.arStack[t][i].element;e.arStack[t][i].i+=e.arStack[t][i].back?-1:1;var s=e.arStack[t][i].i/e.arRules[i][3];var n=1-s;var o=e.arRules[i][0];var a=e.arRules[i][1];element.style[e.arRules[i][2]]="rgb("+Math.floor(o["r"]*n+a["r"]*s)+","+Math.floor(o["g"]*n+a["g"]*s)+","+Math.floor(o["b"]*n+a["b"]*s)+")";if(e.arStack[t][i].i==e.arRules[i][3]||e.arStack[t][i].i==0){clearInterval(e.arStack[t][i].tId);if(e.arRules[i][5])BX.fx.colorAnimate(e.arStack[t][i].element,i,true)}};BX.easing=function(t){this.options=t;this.timer=null};BX.easing.prototype.animate=function(){if(!this.options||!this.options.start||!this.options.finish||typeof this.options.start!="object"||typeof this.options.finish!="object")return null;for(var t in this.options.start){if(typeof this.options.finish[t]=="undefined"){delete this.options.start[t]}}this.options.progress=function(t){var i={};for(var e in this.start)i[e]=Math.round(this.start[e]+(this.finish[e]-this.start[e])*t);if(this.step){this.step(i)}};this.animateProgress()};BX.easing.prototype.stop=function(t){if(this.timer){cancelAnimationFrame(this.timer);this.timer=null;if(t){this.options.complete&&this.options.complete()}}};BX.easing.prototype.animateProgress=function(){if(!t.requestAnimationFrame){this.options.progress(1);this.options.complete&&this.options.complete();return}var i=null;var e=this.options.transition||BX.easing.transitions.linear;var s=this.options.duration||1e3;var n=BX.proxy(function(t){if(i===null){i=t}var o=(t-i)/s;if(o>1){o=1}this.options.progress(e(o));if(o==1){this.stop(true)}else{this.timer=requestAnimationFrame(n)}},this);this.timer=requestAnimationFrame(n)};BX.easing.makeEaseInOut=function(t){return function(i){if(i<.5)return t(2*i)/2;else return(2-t(2*(1-i)))/2}};BX.easing.makeEaseOut=function(t){return function(i){return 1-t(1-i)}};BX.easing.transitions={linear:function(t){return t},quad:function(t){return Math.pow(t,2)},cubic:function(t){return Math.pow(t,3)},quart:function(t){return Math.pow(t,4)},quint:function(t){return Math.pow(t,5)},circ:function(t){return 1-Math.sin(Math.acos(t))},back:function(t){return Math.pow(t,2)*((1.5+1)*t-1.5)},elastic:function(t){return Math.pow(2,10*(t-1))*Math.cos(20*Math.PI*1.5/3*t)},bounce:function(t){for(var i=0,e=1;1;i+=e,e/=2){if(t>=(7-4*i)/11){return-Math.pow((11-6*i-11*t)/4,2)+Math.pow(e,2)}}}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:58:"/bitrix/js/main/pageobject/pageobject.min.js?1698853788570";s:6:"source";s:40:"/bitrix/js/main/pageobject/pageobject.js";s:3:"min";s:44:"/bitrix/js/main/pageobject/pageobject.min.js";s:3:"map";s:44:"/bitrix/js/main/pageobject/pageobject.map.js";}"*/
window.BX=BX||{};BX.PageObject={getRootWindow:function(){return BX.PageObject.getTopWindowOfCurrentHost(window)},isCrossOriginObject:function(t){try{void t.location.host}catch(t){return true}return false},getTopWindowOfCurrentHost:function(t){if(!BX.PageObject.isCrossOriginObject(t.parent)&&t.parent!==t&&t.parent.location.host===t.location.host){return BX.PageObject.getTopWindowOfCurrentHost(t.parent)}return t},getParentWindowOfCurrentHost:function(t){if(BX.PageObject.isCrossOriginObject(t.parent)){return t}return t.parent}};
/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/bitrix/js/main/date/main.date.min.js?169885378817992";s:6:"source";s:33:"/bitrix/js/main/date/main.date.js";s:3:"min";s:37:"/bitrix/js/main/date/main.date.min.js";s:3:"map";s:37:"/bitrix/js/main/date/main.date.map.js";}"*/
this.BX=this.BX||{};(function(e,t){"use strict";function _(e){if(!t.Type.isStringFilled(e)){return""}return e.replace("YYYY","Y").replace("MMMM","F").replace("MM","m").replace("M","M").replace("DD","d").replace("G","g").replace(/GG/i,"G").replace("H","h").replace(/HH/i,"H").replace("MI","i").replace("SS","s").replace("TT","A").replace("T","a")}const r=new t.Cache.MemoryCache;function s(e){return r.remember(`main.date.format.${e}`,(()=>{let r=t.Extension.getSettings("main.date").get(`formats.${e}`);if(t.Type.isStringFilled(r)&&(e==="FORMAT_DATE"||e==="FORMAT_DATETIME")){r=_(r)}return r}))}let n=function(){function e(){babelHelpers.classCallCheck(this,e)}babelHelpers.createClass(e,null,[{key:"isAmPmMode",value:function e(t){if(t===true){return this._getMessage("AMPM_MODE")}return this._getMessage("AMPM_MODE")!==false}},{key:"convertToUTC",value:function e(_){if(!t.Type.isDate(_)){return null}return new Date(Date.UTC(_.getFullYear(),_.getMonth(),_.getDate(),_.getHours(),_.getMinutes(),_.getSeconds(),_.getMilliseconds()))}},{key:"getNewDate",value:function e(t){return new Date(this.getBrowserTimestamp(t))}},{key:"getBrowserTimestamp",value:function e(t){t=parseInt(t,10);const _=new Date(t*1e3).getTimezoneOffset()*60;return(parseInt(t,10)+parseInt(this._getMessage("SERVER_TZ_OFFSET"))+_)*1e3}},{key:"getServerTimestamp",value:function e(t){t=parseInt(t,10);const _=new Date(t).getTimezoneOffset()*60;return Math.round(t/1e3-(parseInt(this._getMessage("SERVER_TZ_OFFSET"),10)+parseInt(_,10)))}},{key:"formatLastActivityDate",value:function e(t,_,r){const s=this.isAmPmMode(true);const n=s===this.AM_PM_MODE.LOWER?"g:i a":s===this.AM_PM_MODE.UPPER?"g:i A":"H:i";const a=[["tomorrow","#01#"+n],["now","#02#"],["todayFuture","#03#"+n],["yesterday","#04#"+n],["-",this.convertBitrixFormat(this._getMessage("FORMAT_DATETIME")).replace(/:s/g,"")],["s60","sago"],["i60","iago"],["H5","Hago"],["H24","#03#"+n],["d31","dago"],["m12>1","mago"],["m12>0","dago"],["","#05#"]];let D=this.format(a,t,_,r);let i=null;if((i=/^#(\d+)#(.*)/.exec(D))!=null){switch(i[1]){case"01":D=this._getMessage("FD_LAST_SEEN_TOMORROW").replace("#TIME#",i[2]);break;case"02":D=this._getMessage("FD_LAST_SEEN_NOW");break;case"03":D=this._getMessage("FD_LAST_SEEN_TODAY").replace("#TIME#",i[2]);break;case"04":D=this._getMessage("FD_LAST_SEEN_YESTERDAY").replace("#TIME#",i[2]);break;case"05":D=this._getMessage("FD_LAST_SEEN_MORE_YEAR");break;default:D=i[2];break}}return D}},{key:"_getMessage",value:function e(_){return t.Loc.getMessage(_)}},{key:"parse",value:function e(_,r,s,n){if(t.Type.isStringFilled(_)){if(!s){s=this._getMessage("FORMAT_DATE")}if(!n){n=this._getMessage("FORMAT_DATETIME")}let e="";for(let t=1;t<=12;t++){e=e+"|"+this._getMessage("MON_"+t)}const t=new RegExp("([0-9]+|[a-z]+"+e+")","ig");const a=_.match(t);let D=s.match(/(DD|MI|MMMM|MM|M|YYYY)/gi);const i=[];const o=[];const M={};if(!a){return null}if(a.length>D.length){D=n.match(/(DD|MI|MMMM|MM|M|YYYY|HH|H|SS|TT|T|GG|G)/gi)}for(let e=0,t=a.length;e<t;e++){if(a[e].trim()!==""){i[i.length]=a[e]}}for(let e=0,t=D.length;e<t;e++){if(D[e].trim()!==""){o[o.length]=D[e]}}let O=o.findIndex((e=>e==="MMMM"));if(O>0){i[O]=this.getMonthIndex(i[O]);o[O]="MM"}else{O=o.findIndex((e=>e==="M"));if(O>0){i[O]=this.getMonthIndex(i[O]);o[O]="MM"}}for(let e=0,t=o.length;e<t;e++){const t=o[e].toUpperCase();M[t]=t==="T"||t==="TT"?i[e]:parseInt(i[e],10)}if(M["DD"]>0&&M["MM"]>0&&M["YYYY"]>0){const e=new Date;if(r){e.setUTCDate(1);e.setUTCFullYear(M["YYYY"]);e.setUTCMonth(M["MM"]-1);e.setUTCDate(M["DD"]);e.setUTCHours(0,0,0,0)}else{e.setDate(1);e.setFullYear(M["YYYY"]);e.setMonth(M["MM"]-1);e.setDate(M["DD"]);e.setHours(0,0,0,0)}if((!isNaN(M["HH"])||!isNaN(M["GG"])||!isNaN(M["H"])||!isNaN(M["G"]))&&!isNaN(M["MI"])){if(!isNaN(M["H"])||!isNaN(M["G"])){const e=(M["T"]||M["TT"]||"am").toUpperCase()==="PM",t=parseInt(M["H"]||M["G"]||0,10);if(e){M["HH"]=t+(t===12?0:12)}else{M["HH"]=t<12?t:0}}else{M["HH"]=parseInt(M["HH"]||M["GG"]||0,10)}if(isNaN(M["SS"])){M["SS"]=0}if(r){e.setUTCHours(M["HH"],M["MI"],M["SS"])}else{e.setHours(M["HH"],M["MI"],M["SS"])}}return e}}return null}},{key:"getMonthIndex",value:function e(t){const _=t.toUpperCase();const r=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];const s=["january","february","march","april","may","june","july","august","september","october","november","december"];for(let e=1;e<=12;e++){if(_===this._getMessage("MON_"+e).toUpperCase()||_===this._getMessage("MONTH_"+e).toUpperCase()||_===r[e-1].toUpperCase()||_===s[e-1].toUpperCase()){return e}}return t}},{key:"format",value:function e(_,r,s,n){const a=t.Type.isDate(r)?new Date(r.getTime()):t.Type.isNumber(r)?new Date(r*1e3):new Date;const D=t.Type.isDate(s)?new Date(s.getTime()):t.Type.isNumber(s)?new Date(s*1e3):new Date;const i=!!n;const o=this;if(t.Type.isArray(_)){return l(_,a,D,i)}else{if(!t.Type.isStringFilled(_)){return""}}const M=(_.match(/{{([^{}]*)}}/g)||[]).map((e=>(e.match(/[^{}]+/)||[""])[0]));if(M.length>0){M.forEach(((e,t)=>{_=_.replace("{{"+e+"}}","{{"+t+"}}")}))}const O=/\\?(sago|iago|isago|Hago|dago|mago|Yago|sdiff|idiff|Hdiff|ddiff|mdiff|Ydiff|sshort|ishort|Hshort|dshort|mhort|Yshort|yesterday|today|tommorow|tomorrow|[a-z])/gi;const T={d:()=>u(a).toString().padStart(2,"0"),D:()=>this._getMessage("DOW_"+S(a)),j:()=>u(a),l:()=>this._getMessage("DAY_OF_WEEK_"+S(a)),N:()=>S(a)||7,S:()=>{if(u(a)%10==1&&u(a)!=11){return"st"}else if(u(a)%10==2&&u(a)!=12){return"nd"}else if(u(a)%10==3&&u(a)!=13){return"rd"}else{return"th"}},w:()=>S(a),z:()=>{const e=new Date(c(a),0,1);const t=new Date(c(a),F(a),u(a));return Math.ceil((t-e)/(24*3600*1e3))},W:()=>{const e=new Date(a.getTime());const t=(S(a)+6)%7;A(e,u(e)-t+3);const _=e.getTime();H(e,0,1);if(S(e)!=4){H(e,0,1+(4-S(e)+7)%7)}const r=1+Math.ceil((_-e)/(7*24*3600*1e3));return r.toString().padStart(2,"0")},F:()=>this._getMessage("MONTH_"+(F(a)+1)+"_S"),f:()=>this._getMessage("MONTH_"+(F(a)+1)),m:()=>(F(a)+1).toString().padStart(2,"0"),M:()=>this._getMessage("MON_"+(F(a)+1)),n:()=>F(a)+1,t:()=>{const e=i?new Date(Date.UTC(c(a),F(a)+1,0)):new Date(c(a),F(a)+1,0);return u(e)},L:()=>{const e=c(a);return e%4==0&&e%100!=0||e%400==0?1:0},o:()=>{const e=new Date(a.getTime());A(e,u(e)-(S(a)+6)%7+3);return c(e)},Y:()=>c(a),y:()=>c(a).toString().slice(2),a:()=>E(a)>11?"pm":"am",A:()=>E(a)>11?"PM":"AM",B:()=>{const e=(a.getUTCHours()+1)%24+a.getUTCMinutes()/60+a.getUTCSeconds()/3600;return Math.floor(e*1e3/24).toString().padStart(3,"0")},g:()=>E(a)%12||12,G:()=>E(a),h:()=>(E(a)%12||12).toString().padStart(2,"0"),H:()=>E(a).toString().padStart(2,"0"),i:()=>m(a).toString().padStart(2,"0"),s:()=>R(a).toString().padStart(2,"0"),u:()=>(h(a)*1e3).toString().padStart(6,"0"),e:()=>{if(i){return"UTC"}return""},I:()=>{if(i){return 0}const e=new Date(c(a),0,1);const t=Date.UTC(c(a),0,1);const _=new Date(c(a),6,0);const r=Date.UTC(c(a),6,0);return 0+(e-t!==_-r)},O:()=>{if(i){return"+0000"}const e=a.getTimezoneOffset();const t=Math.abs(e);return(e>0?"-":"+")+(Math.floor(t/60)*100+t%60).toString().padStart(4,"0")},P:function(){if(i){return"+00:00"}const e=this.O();return e.substr(0,3)+":"+e.substr(3)},Z:()=>{if(i){return 0}return-a.getTimezoneOffset()*60},c:()=>"Y-m-d\\TH:i:sP".replace(O,d),r:()=>"D, d M Y H:i:s O".replace(O,d),U:()=>Math.floor(a.getTime()/1e3),sago:()=>p(U((D-a)/1e3),{0:"FD_SECOND_AGO_0",1:"FD_SECOND_AGO_1","10_20":"FD_SECOND_AGO_10_20",MOD_1:"FD_SECOND_AGO_MOD_1",MOD_2_4:"FD_SECOND_AGO_MOD_2_4",MOD_OTHER:"FD_SECOND_AGO_MOD_OTHER"}),sdiff:()=>p(U((D-a)/1e3),{0:"FD_SECOND_DIFF_0",1:"FD_SECOND_DIFF_1","10_20":"FD_SECOND_DIFF_10_20",MOD_1:"FD_SECOND_DIFF_MOD_1",MOD_2_4:"FD_SECOND_DIFF_MOD_2_4",MOD_OTHER:"FD_SECOND_DIFF_MOD_OTHER"}),sshort:()=>this._getMessage("FD_SECOND_SHORT").replace(/#VALUE#/g,U((D-a)/1e3)),iago:()=>p(U((D-a)/60/1e3),{0:"FD_MINUTE_AGO_0",1:"FD_MINUTE_AGO_1","10_20":"FD_MINUTE_AGO_10_20",MOD_1:"FD_MINUTE_AGO_MOD_1",MOD_2_4:"FD_MINUTE_AGO_MOD_2_4",MOD_OTHER:"FD_MINUTE_AGO_MOD_OTHER"}),idiff:()=>p(U((D-a)/60/1e3),{0:"FD_MINUTE_DIFF_0",1:"FD_MINUTE_DIFF_1","10_20":"FD_MINUTE_DIFF_10_20",MOD_1:"FD_MINUTE_DIFF_MOD_1",MOD_2_4:"FD_MINUTE_DIFF_MOD_2_4",MOD_OTHER:"FD_MINUTE_DIFF_MOD_OTHER"}),isago:()=>{const e=U((D-a)/60/1e3);let t=p(e,{0:"FD_MINUTE_0",1:"FD_MINUTE_1","10_20":"FD_MINUTE_10_20",MOD_1:"FD_MINUTE_MOD_1",MOD_2_4:"FD_MINUTE_MOD_2_4",MOD_OTHER:"FD_MINUTE_MOD_OTHER"});t+=" ";const _=U((D-a)/1e3)-e*60;t+=p(_,{0:"FD_SECOND_AGO_0",1:"FD_SECOND_AGO_1","10_20":"FD_SECOND_AGO_10_20",MOD_1:"FD_SECOND_AGO_MOD_1",MOD_2_4:"FD_SECOND_AGO_MOD_2_4",MOD_OTHER:"FD_SECOND_AGO_MOD_OTHER"});return t},ishort:()=>this._getMessage("FD_MINUTE_SHORT").replace(/#VALUE#/g,U((D-a)/60/1e3)),Hago:()=>p(U((D-a)/60/60/1e3),{0:"FD_HOUR_AGO_0",1:"FD_HOUR_AGO_1","10_20":"FD_HOUR_AGO_10_20",MOD_1:"FD_HOUR_AGO_MOD_1",MOD_2_4:"FD_HOUR_AGO_MOD_2_4",MOD_OTHER:"FD_HOUR_AGO_MOD_OTHER"}),Hdiff:()=>p(U((D-a)/60/60/1e3),{0:"FD_HOUR_DIFF_0",1:"FD_HOUR_DIFF_1","10_20":"FD_HOUR_DIFF_10_20",MOD_1:"FD_HOUR_DIFF_MOD_1",MOD_2_4:"FD_HOUR_DIFF_MOD_2_4",MOD_OTHER:"FD_HOUR_DIFF_MOD_OTHER"}),Hshort:()=>this._getMessage("FD_HOUR_SHORT").replace(/#VALUE#/g,U((D-a)/60/60/1e3)),yesterday:()=>this._getMessage("FD_YESTERDAY"),today:()=>this._getMessage("FD_TODAY"),tommorow:()=>this._getMessage("FD_TOMORROW"),tomorrow:()=>this._getMessage("FD_TOMORROW"),dago:()=>p(U((D-a)/60/60/24/1e3),{0:"FD_DAY_AGO_0",1:"FD_DAY_AGO_1","10_20":"FD_DAY_AGO_10_20",MOD_1:"FD_DAY_AGO_MOD_1",MOD_2_4:"FD_DAY_AGO_MOD_2_4",MOD_OTHER:"FD_DAY_AGO_MOD_OTHER"}),ddiff:()=>p(U((D-a)/60/60/24/1e3),{0:"FD_DAY_DIFF_0",1:"FD_DAY_DIFF_1","10_20":"FD_DAY_DIFF_10_20",MOD_1:"FD_DAY_DIFF_MOD_1",MOD_2_4:"FD_DAY_DIFF_MOD_2_4",MOD_OTHER:"FD_DAY_DIFF_MOD_OTHER"}),dshort:()=>this._getMessage("FD_DAY_SHORT").replace(/#VALUE#/g,U((D-a)/60/60/24/1e3)),mago:()=>p(U((D-a)/60/60/24/31/1e3),{0:"FD_MONTH_AGO_0",1:"FD_MONTH_AGO_1","10_20":"FD_MONTH_AGO_10_20",MOD_1:"FD_MONTH_AGO_MOD_1",MOD_2_4:"FD_MONTH_AGO_MOD_2_4",MOD_OTHER:"FD_MONTH_AGO_MOD_OTHER"}),mdiff:()=>p(U((D-a)/60/60/24/31/1e3),{0:"FD_MONTH_DIFF_0",1:"FD_MONTH_DIFF_1","10_20":"FD_MONTH_DIFF_10_20",MOD_1:"FD_MONTH_DIFF_MOD_1",MOD_2_4:"FD_MONTH_DIFF_MOD_2_4",MOD_OTHER:"FD_MONTH_DIFF_MOD_OTHER"}),mshort:()=>this._getMessage("FD_MONTH_SHORT").replace(/#VALUE#/g,U((D-a)/60/60/24/31/1e3)),Yago:()=>p(U((D-a)/60/60/24/365/1e3),{0:"FD_YEARS_AGO_0",1:"FD_YEARS_AGO_1","10_20":"FD_YEARS_AGO_10_20",MOD_1:"FD_YEARS_AGO_MOD_1",MOD_2_4:"FD_YEARS_AGO_MOD_2_4",MOD_OTHER:"FD_YEARS_AGO_MOD_OTHER"}),Ydiff:()=>p(U((D-a)/60/60/24/365/1e3),{0:"FD_YEARS_DIFF_0",1:"FD_YEARS_DIFF_1","10_20":"FD_YEARS_DIFF_10_20",MOD_1:"FD_YEARS_DIFF_MOD_1",MOD_2_4:"FD_YEARS_DIFF_MOD_2_4",MOD_OTHER:"FD_YEARS_DIFF_MOD_OTHER"}),Yshort:()=>p(U((D-a)/60/60/24/365/1e3),{0:"FD_YEARS_SHORT_0",1:"FD_YEARS_SHORT_1","10_20":"FD_YEARS_SHORT_10_20",MOD_1:"FD_YEARS_SHORT_MOD_1",MOD_2_4:"FD_YEARS_SHORT_MOD_2_4",MOD_OTHER:"FD_YEARS_SHORT_MOD_OTHER"}),x:()=>{const e=this.isAmPmMode(true);const t=e===this.AM_PM_MODE.LOWER?"g:i a":e===this.AM_PM_MODE.UPPER?"g:i A":"H:i";return this.format([["tomorrow","tomorrow, "+t],["-",this.convertBitrixFormat(this._getMessage("FORMAT_DATETIME")).replace(/:s/g,"")],["s","sago"],["i","iago"],["today","today, "+t],["yesterday","yesterday, "+t],["",this.convertBitrixFormat(this._getMessage("FORMAT_DATETIME")).replace(/:s/g,"")]],a,D,i)},X:()=>{const e=this.isAmPmMode(true);const t=e===this.AM_PM_MODE.LOWER?"g:i a":e===this.AM_PM_MODE.UPPER?"g:i A":"H:i";const _=this.format([["tomorrow","tomorrow"],["-",this.convertBitrixFormat(this._getMessage("FORMAT_DATE"))],["today","today"],["yesterday","yesterday"],["",this.convertBitrixFormat(this._getMessage("FORMAT_DATE"))]],a,D,i);const r=this.format([["tomorrow",t],["today",t],["yesterday",t],["",""]],a,D,i);if(r.length>0){return this._getMessage("FD_DAY_AT_TIME").replace(/#DAY#/g,_).replace(/#TIME#/g,r)}else{return _}},Q:()=>{const e=U((D-a)/60/60/24/1e3);if(e==0){return this._getMessage("FD_DAY_DIFF_1").replace(/#VALUE#/g,1)}else{return this.format([["d","ddiff"],["m","mdiff"],["","Ydiff"]],a,D)}}};let g=false;if(_[0]&&_[0]=="^"){g=true;_=_.substr(1)}let f=_.replace(O,d);if(g){f=f.replace(/\s*00:00:00\s*/g,"").replace(/(\d\d:\d\d)(:00)/g,"$1").replace(/(\s*00:00\s*)(?!:)/g,"")}if(M.length>0){M.forEach((function(e,t){f=f.replace("{{"+t+"}}",e)}))}return f;function l(e,t,_,r){const s=U((_-t)/1e3);for(let n=0;n<e.length;n++){const a=e[n][0];const D=e[n][1];let i=null;if(a=="s"){if(s<60){return o.format(D,t,_,r)}}else if((i=/^s(\d+)\>?(\d+)?/.exec(a))!=null){if(i[1]&&i[2]){if(s<i[1]&&s>i[2]){return o.format(D,t,_,r)}}else if(s<i[1]){return o.format(D,t,_,r)}}else if(a=="i"){if(s<60*60){return o.format(D,t,_,r)}}else if((i=/^i(\d+)\>?(\d+)?/.exec(a))!=null){if(i[1]&&i[2]){if(s<i[1]*60&&s>i[2]*60){return o.format(D,t,_,r)}}else if(s<i[1]*60){return o.format(D,t,_,r)}}else if(a=="H"){if(s<24*60*60){return o.format(D,t,_,r)}}else if((i=/^H(\d+)\>?(\d+)?/.exec(a))!=null){if(i[1]&&i[2]){if(s<i[1]*60*60&&s>i[2]*60*60){return o.format(D,t,_,r)}}else if(s<i[1]*60*60){return o.format(D,t,_,r)}}else if(a=="d"){if(s<31*24*60*60){return o.format(D,t,_,r)}}else if((i=/^d(\d+)\>?(\d+)?/.exec(a))!=null){if(i[1]&&i[2]){if(s<i[1]*24*60*60&&s>i[2]*24*60*60){return o.format(D,t,_,r)}}else if(s<i[1]*24*60*60){return o.format(D,t,_,r)}}else if(a=="m"){if(s<365*24*60*60){return o.format(D,t,_,r)}}else if((i=/^m(\d+)\>?(\d+)?/.exec(a))!=null){if(i[1]&&i[2]){if(s<i[1]*31*24*60*60&&s>i[2]*31*24*60*60){return o.format(D,t,_,r)}}else if(s<i[1]*31*24*60*60){return o.format(D,t,_,r)}}else if(a=="now"){if(t.getTime()==_.getTime()){return o.format(D,t,_,r)}}else if(a=="today"){const e=c(_);const s=F(_);const n=u(_);const a=r?new Date(Date.UTC(e,s,n,0,0,0,0)):new Date(e,s,n,0,0,0,0);const i=r?new Date(Date.UTC(e,s,n+1,0,0,0,0)):new Date(e,s,n+1,0,0,0,0);if(t>=a&&t<i){return o.format(D,t,_,r)}}else if(a=="todayFuture"){const e=c(_);const s=F(_);const n=u(_);const a=_.getTime();const i=r?new Date(Date.UTC(e,s,n+1,0,0,0,0)):new Date(e,s,n+1,0,0,0,0);if(t>=a&&t<i){return o.format(D,t,_,r)}}else if(a=="yesterday"){const e=c(_);const s=F(_);const n=u(_);const a=r?new Date(Date.UTC(e,s,n-1,0,0,0,0)):new Date(e,s,n-1,0,0,0,0);const i=r?new Date(Date.UTC(e,s,n,0,0,0,0)):new Date(e,s,n,0,0,0,0);if(t>=a&&t<i){return o.format(D,t,_,r)}}else if(a=="tommorow"||a=="tomorrow"){const e=c(_);const s=F(_);const n=u(_);const a=r?new Date(Date.UTC(e,s,n+1,0,0,0,0)):new Date(e,s,n+1,0,0,0,0);const i=r?new Date(Date.UTC(e,s,n+2,0,0,0,0)):new Date(e,s,n+2,0,0,0,0);if(t>=a&&t<i){return o.format(D,t,_,r)}}else if(a=="-"){if(s<0){return o.format(D,t,_,r)}}}return e.length>0?o.format(e[e.length-1][1],t,_,r):""}function c(e){return i?e.getUTCFullYear():e.getFullYear()}function u(e){return i?e.getUTCDate():e.getDate()}function F(e){return i?e.getUTCMonth():e.getMonth()}function E(e){return i?e.getUTCHours():e.getHours()}function m(e){return i?e.getUTCMinutes():e.getMinutes()}function R(e){return i?e.getUTCSeconds():e.getSeconds()}function h(e){return i?e.getUTCMilliseconds():e.getMilliseconds()}function S(e){return i?e.getUTCDay():e.getDay()}function A(e,t){return i?e.setUTCDate(t):e.setDate(t)}function H(e,t,_){return i?e.setUTCMonth(t,_):e.setMonth(t,_)}function p(e,t){const _=e<100?Math.abs(e):Math.abs(e%100);const r=_%10;let s="";if(_==0){s=o._getMessage(t["0"])}else if(_==1){s=o._getMessage(t["1"])}else if(_>=10&&_<=20){s=o._getMessage(t["10_20"])}else if(r==1){s=o._getMessage(t["MOD_1"])}else if(2<=r&&r<=4){s=o._getMessage(t["MOD_2_4"])}else{s=o._getMessage(t["MOD_OTHER"])}return s.replace(/#VALUE#/g,e)}function d(e,t){if(T[e]){return T[e]()}else{return t}}function U(e){return e>=0?Math.floor(e):Math.ceil(e)}}}]);return e}();babelHelpers.defineProperty(n,"AM_PM_MODE",{UPPER:1,LOWER:2,NONE:false});babelHelpers.defineProperty(n,"convertBitrixFormat",_);babelHelpers.defineProperty(n,"getFormat",s);const a=new t.Cache.MemoryCache;const D={get SERVER_TO_UTC(){return a.remember("SERVER_TO_UTC",(()=>t.Text.toInteger(t.Loc.getMessage("SERVER_TZ_OFFSET"))))},get USER_TO_SERVER(){return a.remember("USER_TO_SERVER",(()=>t.Text.toInteger(t.Loc.getMessage("USER_TZ_OFFSET"))))},get BROWSER_TO_UTC(){return a.remember("BROWSER_TO_UTC",(()=>t.Text.toInteger((new Date).getTimezoneOffset()*60)))}};Object.freeze(D);function i(e,t,_){o(e,t);return _}function o(e,t){if(e!==t){throw new TypeError("Private static access of wrong provenance")}}let M=function(){function e(){babelHelpers.classCallCheck(this,e)}babelHelpers.createClass(e,null,[{key:"getTimestamp",value:function e(){return Math.round(Date.now()/1e3)}},{key:"getDate",value:function e(){return new Date(this.getTimestamp()*1e3)}},{key:"toUser",value:function e(_){return t.Text.toInteger(_)+D.USER_TO_SERVER}},{key:"toServer",value:function t(_){return i(this,e,O).call(this,_)+D.SERVER_TO_UTC}}]);return e}();function O(e){return t.Text.toInteger(e)-D.BROWSER_TO_UTC}let T=function(){function e(){babelHelpers.classCallCheck(this,e)}babelHelpers.createClass(e,null,[{key:"getTimestamp",value:function e(){return M.toUser(M.getTimestamp())}},{key:"getDate",value:function e(){return new Date(this.getTimestamp()*1e3)}},{key:"toBrowser",value:function e(_){return t.Text.toInteger(_)+D.BROWSER_TO_UTC-D.SERVER_TO_UTC-D.USER_TO_SERVER}},{key:"toServer",value:function e(_){return t.Text.toInteger(_)-D.USER_TO_SERVER}}]);return e}();let g=function(){function e(){babelHelpers.classCallCheck(this,e)}babelHelpers.createClass(e,null,[{key:"getTimestamp",value:function e(){return M.toServer(M.getTimestamp())}},{key:"getDate",value:function e(){return new Date(this.getTimestamp()*1e3)}},{key:"toUser",value:function e(_){return t.Text.toInteger(_)+D.USER_TO_SERVER}},{key:"toBrowser",value:function e(_){return t.Text.toInteger(_)+D.BROWSER_TO_UTC-D.SERVER_TO_UTC}}]);return e}();const f=n;const l=Object.freeze({Offset:D,BrowserTime:M,UserTime:T,ServerTime:g});e.DateTimeFormat=n;e.Date=f;e.Timezone=l})(this.BX.Main=this.BX.Main||{},BX);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/bitrix/js/main/core/core_date.min.js?169885379226661";s:6:"source";s:33:"/bitrix/js/main/core/core_date.js";s:3:"min";s:37:"/bitrix/js/main/core/core_date.min.js";s:3:"map";s:37:"/bitrix/js/main/core/core_date.map.js";}"*/
(function(){if(BX.date)return;BX.date=BX.Main.Date;var e=null;BX.calendar=function(e){return BX.calendar.get().Show(e)};BX.calendar.get=function(){if(!e)e=new BX.JCCalendar;return e};BX.calendar.InsertDaysBack=function(e,t){if(t!=""){var a=new Date;if(t>0){a.setTime(a.valueOf()-t*864e5)}e.value=BX.date.format(BX.date.convertBitrixFormat(BX.message("FORMAT_DATE")),a,null)}else{e.value=""}};BX.calendar.ValueToString=function(e,t,a){return BX.date.format(BX.date.convertBitrixFormat(BX.message(t?"FORMAT_DATETIME":"FORMAT_DATE")),e,null,!!a)};BX.calendar.ValueToStringFormat=function(e,t,a){return BX.date.format(BX.date.convertBitrixFormat(t),e,null,!!a)};BX.CalendarPeriod={Init:function(e,t,a){if((e.value!=""||t.value!="")&&a.value=="")a.value="interval";a.onchange()},ChangeDirectOpts:function(e,t){var a=BX.findChild(t,{className:"adm-select adm-calendar-direction"},true);if(e=="week"){a.options[0].text=BX.message("JSADM_CALEND_PREV_WEEK");a.options[1].text=BX.message("JSADM_CALEND_CURR_WEEK");a.options[2].text=BX.message("JSADM_CALEND_NEXT_WEEK")}else{a.options[0].text=BX.message("JSADM_CALEND_PREV");a.options[1].text=BX.message("JSADM_CALEND_CURR");a.options[2].text=BX.message("JSADM_CALEND_NEXT")}},SaveAndClearInput:function(e){if(!window.SavedPeriodValues)window.SavedPeriodValues={};window.SavedPeriodValues[e.id]=e.value;e.value=""},RestoreInput:function(e){if(!window.SavedPeriodValues||!window.SavedPeriodValues[e.id])return;e.value=window.SavedPeriodValues[e.id];delete window.SavedPeriodValues[e.id]},OnChangeP:function(e){var t=e.parentNode.parentNode;var a,i,s,n;a=i=s=n=false;var r=BX.findChild(t,{className:"adm-input-wrap adm-calendar-inp adm-calendar-first"});var o=BX.findChild(t,{className:"adm-input-wrap adm-calendar-second"});var l=BX.findChild(t,{className:"adm-select-wrap adm-calendar-direction"});var p=BX.findChild(t,{className:"adm-calendar-separate"});var h=BX.findChild(t,{className:"adm-input adm-calendar-from"},true);var c=BX.findChild(t,{className:"adm-input adm-calendar-to"},true);switch(e.value){case"day":case"week":case"month":case"quarter":case"year":s=true;BX.CalendarPeriod.OnChangeD(l.children[0]);break;case"before":i=true;break;case"after":a=true;break;case"exact":a=true;break;case"interval":a=i=n=true;BX.CalendarPeriod.RestoreInput(h);BX.CalendarPeriod.RestoreInput(c);break;case"":BX.CalendarPeriod.SaveAndClearInput(h);BX.CalendarPeriod.SaveAndClearInput(c);break;default:break}BX.CalendarPeriod.ChangeDirectOpts(e.value,t);r.style.display=a?"inline-block":"none";o.style.display=i?"inline-block":"none";l.style.display=s?"inline-block":"none";p.style.display=n?"inline-block":"none"},OnChangeD:function(e){var t=e.parentNode.parentNode;var a=BX.findChild(t,{className:"adm-input adm-calendar-from"},true);var i=BX.findChild(t,{className:"adm-input adm-calendar-to"},true);var s=BX.findChild(t,{className:"adm-select adm-calendar-period"},true);var n=0;switch(e.value){case"previous":n=-1;break;case"next":n=1;break;case"current":default:break}var r=false;var o=false;var l=new Date;var p=l.getFullYear();var h=l.getMonth();var c=l.getDate();var u=l.getDay();if(u==0)u=7;switch(s.value){case"day":r=new Date(p,h,c+n,0,0,0);o=new Date(p,h,c+n,23,59,59);break;case"week":r=new Date(p,h,c-u+1+n*7,0,0,0);o=new Date(p,h,c+(7-u)+n*7,23,59,59);break;case"month":r=new Date(p,h+n,1,0,0,0);o=new Date(p,h+1+n,0,23,59,59);break;case"quarter":var d=Math.floor(h/3)+n;r=new Date(p,3*d,1,0,0,0);o=new Date(p,3*(d+1),0,23,59,59);break;case"year":r=new Date(p+n,0,1,0,0,0);o=new Date(p+1+n,0,0,23,59,59);break;default:break}var m=window[a.name+"_bTime"]?BX.message("FORMAT_DATETIME"):BX.message("FORMAT_DATE");if(r){a.value=BX.formatDate(r,m);BX.addClass(a,"adm-calendar-inp-setted")}if(o){i.value=BX.formatDate(o,m);BX.addClass(i,"adm-calendar-inp-setted")}}};BX.JCCalendar=function(){this.params={};this.bAmPm=BX.isAmPmMode();this.popup=null;this.popup_month=null;this.popup_year=null;this.month_popup_classname="";this.year_popup_classname="";this.value=null;this._layers={};this._current_layer=null;this.DIV=null;this.PARTS={};this.weekStart=0;this.numRows=6;this._create=function(e){this.popup=new BX.PopupWindow("calendar_popup_"+Math.random(),e.node,{closeByEsc:true,autoHide:false,content:this._get_content(),bindOptions:{forceBindPosition:true}});BX.bind(this.popup.popupContainer,"click",function(e){e.stopPropagation()})};this._auto_hide_disable=function(){BX.unbind(document,"click",BX.proxy(this._auto_hide,this))};this._auto_hide_enable=function(){BX.bind(document,"click",BX.proxy(this._auto_hide,this))};this._auto_hide=function(e){this._auto_hide_disable();this.popup.close()};this._get_content=function(){var e=BX.delegate(function(e){e=e||window.event;this.SetDate(new Date(parseInt(BX.proxy_context.getAttribute("data-date"))),e.type==="dblclick"||this.params.bCompatibility&&!this.params.bTimeVisibility)},this);this.DIV=BX.create("DIV",{props:{className:"bx-calendar"},children:[BX.create("DIV",{props:{className:"bx-calendar-header"},children:[BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:"bx-calendar-left-arrow"},events:{click:BX.proxy(this._prev,this)}}),BX.create("SPAN",{props:{className:"bx-calendar-header-content"},children:[this.PARTS.MONTH=BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:"bx-calendar-top-month"},events:{click:BX.proxy(this._menu_month,this)}}),this.PARTS.YEAR=BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:"bx-calendar-top-year"},events:{click:BX.proxy(this._menu_year,this)}})]}),BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:"bx-calendar-right-arrow"},events:{click:BX.proxy(this._next,this)}})]}),this.PARTS.WEEK=BX.create("DIV",{props:{className:"bx-calendar-name-day-wrap"}}),this.PARTS.LAYERS=BX.create("DIV",{props:{className:"bx-calendar-cell-block"},events:{click:BX.delegateEvent({className:"bx-calendar-cell"},e),dblclick:BX.delegateEvent({className:"bx-calendar-cell"},e)}}),this.PARTS.TIME=BX.create("DIV",{props:{className:"bx-calendar-set-time-wrap"},events:{click:BX.delegateEvent({attr:"data-action"},BX.delegate(this._time_actions,this))},html:'<a href="javascript:void(0)" data-action="time_show" class="bx-calendar-set-time"><i></i>'+BX.message("CAL_TIME_SET")+'</a><div class="bx-calendar-form-block"><span class="bx-calendar-form-text">'+BX.message("CAL_TIME")+'</span><span class="bx-calendar-form"><input type="text" class="bx-calendar-form-input" maxwidth="2" onkeyup="BX.calendar.get()._check_time()" /><span class="bx-calendar-form-separator"></span><input type="text" class="bx-calendar-form-input" maxwidth="2" onkeyup="BX.calendar.get()._check_time()" />'+(this.bAmPm?'<span class="bx-calendar-AM-PM-block"><span class="bx-calendar-AM-PM-text" data-action="time_ampm"></span><span class="bx-calendar-form-arrow-r"><a href="javascript:void(0)" class="bx-calendar-form-arrow-top" data-action="time_ampm_up"><i></i></a><a href="javascript:void(0)" class="bx-calendar-form-arrow-bottom" data-action="time_ampm_down"><i></i></a></span></span>':"")+'</span><a href="javascript:void(0)" data-action="time_hide" class="bx-calendar-form-close"><i></i></a></div>'}),this.PARTS.BUTTONS=BX.create("DIV",{props:{className:"bx-calendar-button-block"},events:{click:BX.delegateEvent({attr:"data-action"},BX.delegate(this._button_actions,this))},html:'<a href="javascript:void(0)" class="bx-calendar-button bx-calendar-button-select" data-action="submit"><span class="bx-calendar-button-left"></span><span class="bx-calendar-button-text">'+BX.message("CAL_BUTTON")+'</span><span class="bx-calendar-button-right"></span></a><a href="javascript:void(0)" class="bx-calendar-button bx-calendar-button-cancel" data-action="cancel"><span class="bx-calendar-button-left"></span><span class="bx-calendar-button-text">'+BX.message("JS_CORE_WINDOW_CLOSE")+'</span><span class="bx-calendar-button-right"></span></a>'})]});this.PARTS.TIME_INPUT_H=BX.findChild(this.PARTS.TIME,{tag:"INPUT"},true);this.PARTS.TIME_INPUT_M=this.PARTS.TIME_INPUT_H.nextSibling.nextSibling;if(this.bAmPm)this.PARTS.TIME_AMPM=this.PARTS.TIME_INPUT_M.nextSibling.firstChild;var t=new BX.JCSpinner({input:this.PARTS.TIME_INPUT_H,callback_change:BX.proxy(this._check_time,this),bSaveValue:false}).Show();t.className="bx-calendar-form-arrow-l";this.PARTS.TIME_INPUT_H.parentNode.insertBefore(t,this.PARTS.TIME_INPUT_H);t=new BX.JCSpinner({input:this.PARTS.TIME_INPUT_M,callback_change:BX.proxy(this._check_time,this),bSaveValue:true}).Show();t.className="bx-calendar-form-arrow-r";if(!this.PARTS.TIME_INPUT_M.nextSibling)this.PARTS.TIME_INPUT_M.parentNode.appendChild(t);else this.PARTS.TIME_INPUT_M.parentNode.insertBefore(t,this.PARTS.TIME_INPUT_M.nextSibling);for(var a=0;a<7;a++){this.PARTS.WEEK.appendChild(BX.create("SPAN",{props:{className:"bx-calendar-name-day"},text:BX.message("DOW_"+(a+this.weekStart)%7)}))}return this.DIV};this._time_actions=function(){switch(BX.proxy_context.getAttribute("data-action")){case"time_show":BX.addClass(this.PARTS.TIME,"bx-calendar-set-time-opened");if(this.params.bCompatibility){BX.removeClass(this.PARTS.BUTTONS,"bx-calendar-buttons-disabled")}this.popup.adjustPosition();break;case"time_hide":BX.removeClass(this.PARTS.TIME,"bx-calendar-set-time-opened");if(this.params.bCompatibility){this._saveChoice("hide");BX.addClass(this.PARTS.BUTTONS,"bx-calendar-buttons-disabled")}this.popup.adjustPosition();break;case"time_ampm":this.PARTS.TIME_AMPM.innerHTML=this.PARTS.TIME_AMPM.innerHTML=="AM"?"PM":"AM";break;case"time_ampm_up":this._check_time({bSaveValue:false},null,12);return;break;case"time_ampm_down":this._check_time({bSaveValue:false},null,-12);return;break}this._check_time()};this._button_actions=function(){switch(BX.proxy_context.getAttribute("data-action")){case"submit":if(this.params.bCompatibility){this._saveChoice("show")}this.SaveValue();break;case"cancel":this.Close();break}};this._saveChoice=function(e){if(this.params.bCategoryTimeVisibilityOption){BX.userOptions.save(this.params.bCategoryTimeVisibilityOption,this.params.bNameTimeVisibilityOption,"visibility",e==="show"?"Y":"N")}this._bTimeVisibility=e==="show";this.params.bTimeVisibility=this._bTimeVisibility};this._check_time=function(e,t,a){var i=parseInt(this.PARTS.TIME_INPUT_H.value.substring(0,5),10)||0,s=parseInt(this.PARTS.TIME_INPUT_M.value.substring(0,5),10)||0,n=false;if(!!e&&!e.bSaveValue){this.value.setUTCHours(this.value.getUTCHours()+a)}else if(!isNaN(i)){if(this.bAmPm){if(i!=12&&this.PARTS.TIME_AMPM.innerHTML=="PM"){i+=12}}n=true;this.value.setUTCHours(i%24)}if(!isNaN(s)){n=true;this.value.setUTCMinutes(s%60)}if(n){this.SetValue(this.value)}};this._set_layer=function(){var e=parseInt(this.value.getUTCFullYear()+""+BX.util.str_pad_left(this.value.getUTCMonth()+"",2,"0"));if(!this._layers[e]){this._layers[e]=this._create_layer();this._layers[e].BXLAYERID=e}if(this._current_layer){var t=new Date(this.value.valueOf());t.setUTCHours(0);t.setUTCMinutes(0);var a=BX.findChild(this._layers[e],{tag:"A",className:"bx-calendar-active"},true),i=BX.findChild(this._layers[e],{tag:"A",attr:{"data-date":t.valueOf()+""}},true);if(a){BX.removeClass(a,"bx-calendar-active")}if(i){BX.addClass(i,"bx-calendar-active")}this._replace_layer(this._current_layer,this._layers[e])}else{this.PARTS.LAYERS.appendChild(this._layers[e])}this._current_layer=this._layers[e]};this._replace_layer=function(e,t){if(e!=t){if(!BX.browser.IsIE()||BX.browser.IsDoctype()){var a=e.BXLAYERID>t.BXLAYERID?1:-1;var i=0;var s=-a*e.offsetHeight;e.style.position="relative";e.style.top="0px";e.style.zIndex=5;t.style.position="absolute";t.style.top=s+"px";t.style.zIndex=6;this.PARTS.LAYERS.appendChild(t);var n=15;var r;(r=function(){s+=a*n;i+=a*n;if(a*s<0){e.style.top=i+"px";t.style.top=s+"px";setTimeout(r,10)}else{e.parentNode.removeChild(e);t.style.top="0px";t.style.position="static";t.style.zIndex=0}})()}else{this.PARTS.LAYERS.replaceChild(t,e)}}};this._create_layer=function(){var e=BX.create("DIV",{props:{className:"bx-calendar-layer"}});var t=new Date(this.value);t.setUTCHours(0);t.setUTCMinutes(0);t.setUTCDate(1);if(t.getUTCDay()!=this.weekStart){var a=t.getUTCDay()-this.weekStart;a+=a<0?7:0;t.setUTCDate(t.getUTCDate()-a)}var i=this.value.getUTCMonth(),s=this.value.getUTCDate(),n="";for(var r=0;r<this.numRows;r++){n+='<div class="bx-calendar-range'+(r==this.numRows-1?" bx-calendar-range-noline":"")+'">';for(var o=0;o<7;o++){a=t.getUTCDate();var l=t.getUTCDay();var p="bx-calendar-cell";if(i!=t.getUTCMonth())p+=" bx-calendar-date-hidden";else if(s==a)p+=" bx-calendar-active";if(l==0||l==6)p+=" bx-calendar-weekend";n+='<a href="javascript:void(0)" class="'+p+'" data-date="'+t.valueOf()+'">'+a+"</a>";t.setUTCDate(t.getUTCDate()+1)}n+="</div>"}e.innerHTML=n;return e};this._prev=function(){this.SetMonth(this.value.getUTCMonth()-1)};this._next=function(){this.SetMonth(this.value.getUTCMonth()+1)};this._menu_month_content=function(){var e="",t=this.value.getMonth(),a;for(a=0;a<12;a++){e+='<span class="bx-calendar-month'+(a==t?" bx-calendar-month-active":"")+'" data-bx-month="'+a+'">'+BX.message("MONTH_"+(a+1))+"</span>"}return'<div class="bx-calendar-month-popup"><div class="bx-calendar-month-title" data-bx-month="'+this.value.getUTCMonth()+'">'+BX.message("MONTH_"+(this.value.getUTCMonth()+1))+'</div><div class="bx-calendar-month-content">'+e+"</div></div>"};this._menu_month=function(){if(!this.popup_month){this.popup_month=new BX.PopupWindow("calendar_popup_month_"+Math.random(),this.PARTS.MONTH,{content:this._menu_month_content(),closeByEsc:true,autoHide:true,offsetTop:-29,offsetLeft:-1,className:this.month_popup_classname,events:{onPopupShow:BX.delegate(function(){if(this.popup_year){this.popup_year.close()}},this)}});BX.bind(this.popup_month.popupContainer,"click",BX.proxy(this.month_popup_click,this));this.popup_month.BXMONTH=this.value.getUTCMonth()}else if(this.popup_month.BXMONTH!=this.value.getUTCMonth()){this.popup_month.setContent(this._menu_month_content());this.popup_month.BXMONTH=this.value.getUTCMonth()}this.popup_month.show()};this.month_popup_click=function(e){var t=e.target||e.srcElement;if(t&&t.getAttribute&&t.getAttribute("data-bx-month")){this.SetMonth(parseInt(t.getAttribute("data-bx-month")));this.popup_month.close()}};this._menu_year_content=function(){var e='<div class="bx-calendar-year-popup"><div class="bx-calendar-year-title" data-bx-year="'+this.value.getUTCFullYear()+'">'+this.value.getUTCFullYear()+'</div><div class="bx-calendar-year-content" id="bx-calendar-year-content">';for(var t=-3;t<=3;t++){e+='<span class="bx-calendar-year-number'+(t==0?" bx-calendar-year-active":"")+'" data-bx-year="'+(this.value.getUTCFullYear()-t)+'">'+(this.value.getUTCFullYear()-t)+"</span>"}e+='</div><input data-bx-year-input="Y" type="text" class="bx-calendar-year-input" maxlength="4" /></div>';return e};this._menu_year=function(){if(!this.popup_year){this.popup_year=new BX.PopupWindow("calendar_popup_year_"+Math.random(),this.PARTS.YEAR,{content:this._menu_year_content(),closeByEsc:true,autoHide:true,offsetTop:-29,offsetLeft:-1,className:this.year_popup_classname,events:{onPopupShow:BX.delegate(function(){if(this.popup_month){this.popup_month.close()}},this)}});BX.bind(this.popup_year.popupContainer,"click",BX.proxy(this.year_popup_click,this));BX.bind(this.popup_year.popupContainer,"keyup",BX.proxy(this.year_popup_keyup,this));this.popup_year.BXYEAR=this.value.getUTCFullYear()}else if(this.popup_year.BXYEAR!=this.value.getUTCFullYear()){this.popup_year.setContent(this._menu_year_content());this.popup_year.BXYEAR=this.value.getUTCFullYear()}this.popup_year.show()};this.year_popup_click=function(e){var t=e.target||e.srcElement;if(t&&t.getAttribute&&t.getAttribute("data-bx-year")){this.SetYear(parseInt(t.getAttribute("data-bx-year")));this.popup_year.close()}};this.year_popup_keyup=function(e){var t=e.target||e.srcElement;if(t&&t.getAttribute&&t.getAttribute("data-bx-year-input")=="Y"){var a=parseInt(t.value);if(a>=1900&&a<=2100){this.SetYear(a);this.popup_year.close()}}};this._check_date=function(e){var t=e;if(BX.type.isString(e)){t=BX.parseDate(e,true)}if(!BX.type.isDate(t)||isNaN(t.valueOf())){t=BX.date.convertToUTC(new Date);if(this.params.bHideTime){t.setUTCHours(0);t.setUTCMinutes(0)}}t.setUTCMilliseconds(0);t.setUTCSeconds(0);t.BXCHECKED=true;return t}};BX.JCCalendar.prototype.Show=function(e){if(!BX.isReady){BX.ready(BX.delegate(function(){this.Show(e)},this));return}e.node=e.node||document.body;if(BX.type.isNotEmptyString(e.node)){var t=BX(e.node);if(!t){t=document.getElementsByName(e.node);if(t&&t.length>0){t=t[0]}}e.node=t}if(!e.node)return;if(!!e.field){if(BX.type.isString(e.field)){t=BX(e.field);if(!!t){e.field=t}else{if(e.form){if(BX.type.isString(e.form)){e.form=document.forms[e.form]}}if(BX.type.isDomNode(e.form)&&!!e.form[e.field]){e.field=e.form[e.field]}else{t=document.getElementsByName(e.field);if(t&&t.length>0){t=t[0];e.field=t}}}if(BX.type.isString(e.field)){e.field=BX(e.field)}}}var a=!this.popup||!this.popup.isShown()||this.params.node!=e.node;this.params=e;this.params.bCompatibility=typeof this.params.bCompatibility=="undefined"?false:this.params.bCompatibility;this.params.bTimeVisibility=typeof this.params.bTimeVisibility=="undefined"?!this.params.bCompatibility:this.params.bTimeVisibility;if(this.params.bCompatibility){this.params.bCategoryTimeVisibilityOption=this.params.bCategoryTimeVisibilityOption?this.params.bCategoryTimeVisibilityOption:"";this.params.bNameTimeVisibilityOption=this.params.bNameTimeVisibilityOption?this.params.bNameTimeVisibilityOption:"time_visibility";if(typeof this._bTimeVisibility!=="undefined"){this.params.bTimeVisibility=this._bTimeVisibility}}this.params.bTime=typeof this.params.bTime=="undefined"?true:!!this.params.bTime;this.params.bHideTime=typeof this.params.bHideTime=="undefined"?true:!!this.params.bHideTime;this.params.bUseSecond=typeof this.params.bUseSecond=="undefined"?true:!!this.params.bUseSecond;this.weekStart=parseInt(this.params.weekStart||this.params.weekStart||BX.message("WEEK_START"));if(isNaN(this.weekStart))this.weekStart=1;if(!this.popup){this._create(this.params)}else{this.popup.setBindElement(this.params.node)}var i=!!this.params.bHideTime;if(this.params.value){this.SetValue(this.params.value);i=this.value.getUTCHours()<=0&&this.value.getUTCMinutes()<=0}else if(this.params.field){this.SetValue(this.params.field.value);i=this.value.getUTCHours()<=0&&this.value.getUTCMinutes()<=0}else if(!!this.params.currentTime){this.SetValue(this.params.currentTime)}else{this.SetValue()}if(!!this.params.bTime){this.activateTimeStyle(i)}else{this.activateDateStyle(i)}if(a){this._auto_hide_disable();this.popup.show();setTimeout(BX.proxy(this._auto_hide_enable,this),0)}this.params.bSetFocus=typeof this.params.bSetFocus=="undefined"?true:!!this.params.bSetFocus;if(this.params.bSetFocus){e.node.blur()}else{BX.bind(e.node,"keyup",BX.defer(function(){this.SetValue(e.node.value);if(!!this.params.bTime){if(this.value.getUTCHours()<=0&&this.value.getUTCMinutes()<=0)BX.removeClass(this.PARTS.TIME,"bx-calendar-set-time-opened");else BX.addClass(this.PARTS.TIME,"bx-calendar-set-time-opened")}},this))}return this};BX.JCCalendar.prototype.activateDateStyle=function(e){BX.addClass(this.DIV,"bx-calendar-time-disabled");if(!!e)BX.removeClass(this.PARTS.TIME,"bx-calendar-set-time-opened");else BX.addClass(this.PARTS.TIME,"bx-calendar-set-time-opened")};BX.JCCalendar.prototype.activateTimeStyle=function(e){if(this.params.bCompatibility&&!this.params.bTimeVisibility){BX.addClass(this.PARTS.BUTTONS,"bx-calendar-buttons-disabled");BX.addClass(this.PARTS.TIME,"bx-calendar-set-time-wrap-simple");BX.removeClass(this.PARTS.TIME,"bx-calendar-set-time-opened")}else{BX.removeClass(this.DIV,"bx-calendar-time-disabled");if(!!e)BX.removeClass(this.PARTS.TIME,"bx-calendar-set-time-opened");else BX.addClass(this.PARTS.TIME,"bx-calendar-set-time-opened")}};BX.JCCalendar.prototype.SetDay=function(e){this.value.setUTCDate(e);return this.SetValue(this.value)};BX.JCCalendar.prototype.SetMonth=function(e){if(this.popup_month)this.popup_month.close();this.value.setUTCMonth(e);if(e<0)e+=12;else if(e>=12)e-=12;while(this.value.getUTCMonth()>e){this.value.setUTCDate(this.value.getUTCDate()-1)}return this.SetValue(this.value)};BX.JCCalendar.prototype.SetYear=function(e){if(this.popup_year)this.popup_year.close();this.value.setUTCFullYear(e);return this.SetValue(this.value)};BX.JCCalendar.prototype.SetDate=function(e,t){e=this._check_date(e);e.setUTCHours(this.value.getUTCHours());e.setUTCMinutes(this.value.getUTCMinutes());e.setUTCSeconds(this.value.getUTCSeconds());if(this.params.bTime&&!t){return this.SetValue(e)}else{this.SetValue(e);this.SaveValue()}};BX.JCCalendar.prototype.SetValue=function(e){this.value=e&&e.BXCHECKED?e:this._check_date(e);this.PARTS.MONTH.innerHTML=BX.message("MONTH_"+(this.value.getUTCMonth()+1));this.PARTS.YEAR.innerHTML=this.value.getUTCFullYear();if(!!this.params.bTime){var t=this.value.getUTCHours();if(this.bAmPm){if(t>=12){this.PARTS.TIME_AMPM.innerHTML="PM";if(t!=12)t-=12}else{this.PARTS.TIME_AMPM.innerHTML="AM";if(t==0)t=12}}this.PARTS.TIME_INPUT_H.value=BX.util.str_pad_left(t.toString(),2,"0");this.PARTS.TIME_INPUT_M.value=BX.util.str_pad_left(this.value.getUTCMinutes().toString(),2,"0")}this._set_layer();return this};BX.JCCalendar.prototype.SaveValue=function(){if(this.popup_month)this.popup_month.close();if(this.popup_year)this.popup_year.close();var e=true;if(!!this.params.callback){var t=this.params.callback.apply(this,[new Date(this.value.valueOf()+this.value.getTimezoneOffset()*6e4)]);if(t===false)e=false}if(e){var a=!!this.params.bTime&&BX.hasClass(this.PARTS.TIME,"bx-calendar-set-time-opened");if(this.params.field){var i=BX.message(a?"FORMAT_DATETIME":"FORMAT_DATE");if(a&&!this.params.bUseSecond){i=i.replace(":SS","")}this.params.field.value=BX.calendar.ValueToStringFormat(this.value,i,true);BX.fireEvent(this.params.field,"change")}this.popup.close();if(!!this.params.callback_after){this.params.callback_after.apply(this,[new Date(this.value.valueOf()+this.value.getTimezoneOffset()*6e4),a])}}return this};BX.JCCalendar.prototype.Close=function(){if(!!this.popup)this.popup.close();return this};BX.JCSpinner=function(e){e=e||{};this.params={input:e.input||null,delta:e.delta||1,timeout_start:e.timeout_start||1e3,timeout_cont:e.timeout_cont||150,callback_start:e.callback_start||null,callback_change:e.callback_change||null,callback_finish:e.callback_finish||null,bSaveValue:typeof e.bSaveValue=="undefined"?!!e.input:!!e.bSaveValue};this.mousedown=false;this.direction=1};BX.JCSpinner.prototype.Show=function(){this.node=BX.create("span",{events:{mousedown:BX.delegateEvent({attr:"data-dir"},BX.delegate(this.Start,this))},html:'<a href="javascript:void(0)" class="bx-calendar-form-arrow bx-calendar-form-arrow-top" data-dir="1"><i></i></a><a href="javascript:void(0)" class="bx-calendar-form-arrow bx-calendar-form-arrow-bottom" data-dir="-1"><i></i></a>'});return this.node};BX.JCSpinner.prototype.Start=function(){this.mousedown=true;this.direction=BX.proxy_context.getAttribute("data-dir")>0?1:-1;BX.bind(document,"mouseup",BX.proxy(this.MouseUp,this));this.ChangeValue(true)};BX.JCSpinner.prototype.ChangeValue=function(e){if(!this.mousedown)return;if(this.params.input){var t=parseInt(this.params.input.value,10)+this.params.delta*this.direction;if(this.params.bSaveValue)this.params.input.value=t;if(!!e&&this.params.callback_start)this.params.callback_start(this.params,t,this.direction);if(this.params.callback_change)this.params.callback_change(this.params,t,this.direction);setTimeout(BX.proxy(this.ChangeValue,this),!!e?this.params.timeout_start:this.params.timeout_cont)}};BX.JCSpinner.prototype.MouseUp=function(){this.mousedown=false;BX.unbind(document,"mouseup",BX.proxy(this.MouseUp,this));if(this.params.callback_finish)this.params.callback_finish(this.params,this.params.input.value)};window.jsCalendar={Show:function(e,t,a,i,s,n,r,o){return BX.calendar({node:e,field:t,form:r,bTime:!!s,currentTime:n,bHideTimebar:!!o})},ValueToString:BX.calendar.ValueToString};BX.CClockSelector=function(e){this.params=e;this.params.popup_buttons=this.params.popup_buttons||[new BX.PopupWindowButton({text:BX.message("CAL_BUTTON"),className:"popup-window-button-create",events:{click:BX.proxy(this.setValue,this)}})];this.isReady=false;this.WND=new BX.PopupWindow(this.params.popup_id||"clock_selector_popup",this.params.node,this.params.popup_config||{titleBar:BX.message("CAL_TIME"),offsetLeft:-45,offsetTop:-135,autoHide:true,closeIcon:true,closeByEsc:true});this.SHOW=false;BX.addCustomEvent(this.WND,"onPopupClose",BX.delegate(this.onPopupClose,this));this.obClocks={};this.CLOCK_ID=this.params.clock_id||"clock_selector"};BX.CClockSelector.prototype.Show=function(){if(!this.isReady){BX.addCustomEvent("onClockRegister",BX.proxy(this.onClockRegister,this));return BX.ajax.get("/bitrix/tools/clock_selector.php",{start_time:this.params.start_time,clock_id:this.CLOCK_ID,sessid:BX.bitrix_sessid()},BX.delegate(this.Ready,this))}this.WND.setButtons(this.params.popup_buttons);this.WND.show();this.SHOW=true;if(window["bxClock_"+this.obClocks[this.CLOCK_ID]]){setTimeout("window['bxClock_"+this.obClocks[this.CLOCK_ID]+"'].CalculateCoordinates()",40)}return true};BX.CClockSelector.prototype.onClockRegister=function(e){if(e[this.CLOCK_ID]){this.obClocks[this.CLOCK_ID]=e[this.CLOCK_ID];BX.removeCustomEvent("onClockRegister",BX.proxy(this.onClockRegister,this))}};BX.CClockSelector.prototype.Ready=function(e){this.content=this.CreateContent(e);this.WND.setContent(this.content);this.isReady=true;setTimeout(BX.proxy(this.Show,this),30)};BX.CClockSelector.prototype.CreateContent=function(e){return BX.create("DIV",{events:{click:BX.PreventDefault},html:'<div class="bx-tm-popup-clock">'+e+"</div>"})};BX.CClockSelector.prototype.setValue=function(e){if(this.params.callback){var t=BX.findChild(this.content,{tagName:"INPUT"},true);this.params.callback.apply(this.params.node,[t.value])}return BX.PreventDefault(e)};BX.CClockSelector.prototype.closeWnd=function(e){this.WND.close();return e||window.event?BX.PreventDefault(e):true};BX.CClockSelector.prototype.setNode=function(e){this.WND.setBindElement(e)};BX.CClockSelector.prototype.setTime=function(e){this.params.start_time=e;if(window["bxClock_"+this.obClocks[this.CLOCK_ID]]){window["bxClock_"+this.obClocks[this.CLOCK_ID]].SetTime(parseInt(e/3600),parseInt(e%3600/60))}};BX.CClockSelector.prototype.setCallback=function(e){this.params.callback=e};BX.CClockSelector.prototype.onPopupClose=function(){this.SHOW=false}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:56:"/bitrix/js/main/core/core_tooltip.min.js?169885379211722";s:6:"source";s:36:"/bitrix/js/main/core/core_tooltip.js";s:3:"min";s:40:"/bitrix/js/main/core/core_tooltip.min.js";s:3:"map";s:40:"/bitrix/js/main/core/core_tooltip.map.js";}"*/
(function(window){if(BX.tooltip)return;var arTooltipIndex={},bDisable=false;BX.tooltip=function(i,t,s,e,o,a){if(BX.message("TOOLTIP_ENABLED")!="Y"){return}if(BX.browser.IsAndroid()||BX.browser.IsIOS()){return}BX.ready(function(){var r=BX(t);if(null==r){return}var n=i;if(o&&BX.type.isNotEmptyString(s)){var l=0;for(var h=0,d=s.length;h<d;h++){l=31*l+s.charCodeAt(h)<<0}n=l+i}if(null==arTooltipIndex[n]){arTooltipIndex[n]=new BX.CTooltip(i,r,s,e,o,a)}else{arTooltipIndex[n].ANCHOR=r;arTooltipIndex[n].rootClassName=e;arTooltipIndex[n].LOADER=o&&BX.type.isNotEmptyString(s)?s:"/bitrix/tools/tooltip.php";arTooltipIndex[n].params=a;arTooltipIndex[n].Create()}})};BX.tooltip.disable=function(){bDisable=true};BX.tooltip.enable=function(){bDisable=false};BX.tooltip.hide=function(i){if(BX("user_info_"+i)){BX("user_info_"+i).style.display="none"}};BX.tooltip.openIM=function(i){if(top.BXIM){top.BXIM.openMessenger(i);BX.tooltip.hide(i)}else if(BX("MULSonetMessageChatTemplate")){window.open(BX("MULSonetMessageChatTemplate").replace("#user_id#",i).replace("#USER_ID#",i).replace("#ID#",i),"","location=yes,status=no,scrollbars=yes,resizable=yes,width=700,height=550,top="+Math.floor((screen.height-550)/2-14)+",left="+Math.floor((screen.width-700)/2-5));BX.tooltip.hide(i)}return false};BX.tooltip.openCallTo=function(i){if(top.BXIM){top.BXIM.callTo(i);BX.tooltip.hide(i)}return false};BX.tooltip.checkCallTo=function(i){if(!top.BXIM||!top.BXIM.checkCallSupport()){BX.remove(i)}};BX.tooltip.openVideoCall=function(i){if(BX("MULVideoCallTemplate")){window.open(BX("MULVideoCallTemplate").replace("#user_id#",i).replace("#USER_ID#",i).replace("#ID#",i),"","location=yes,status=no,scrollbars=yes,resizable=yes,width=1000,height=600,top="+Math.floor((screen.height-600)/2-14)+",left="+Math.floor((screen.width-1e3)/2-5));BX.tooltip.hide(i)}return false};BX.CTooltip=function(user_id,anchor,loader,rootClassName,bForceUseLoader,params){this.LOADER=bForceUseLoader&&BX.type.isNotEmptyString(loader)?loader:"/bitrix/tools/tooltip.php";this.USER_ID=user_id;this.ANCHOR=anchor;this.rootClassName="";this.params=typeof params!="undefined"?params:{};if(rootClassName!="undefined"&&rootClassName!=null&&rootClassName.length>0){this.rootClassName=rootClassName}var old=document.getElementById("user_info_"+this.USER_ID);if(null!=old){if(null!=old.parentNode)old.parentNode.removeChild(old);old=null}var _this=this;this.INFO=null;this.width=393;this.height=302;this.RealAnchor=null;this.CoordsLeft=0;this.CoordsTop=0;this.AnchorRight=0;this.AnchorBottom=0;this.DIV=null;this.ROOT_DIV=null;if(BX.browser.IsIE()){this.IFRAME=null}this.v_delta=0;this.classNameAnim=false;this.classNameFixed=false;this.left=0;this.top=0;this.tracking=false;this.active=false;this.showed=false;this.Create=function(){_this.ANCHOR.onmouseover=function(){if(!bDisable){_this.StartTrackMouse(this)}};_this.ANCHOR.onmouseout=function(){_this.StopTrackMouse(this)}};this.Create();this.TrackMouse=function(i){if(!_this.tracking)return;var t;if(i&&i.pageX)t={x:i.pageX,y:i.pageY};else t={x:i.clientX+document.body.scrollLeft,y:i.clientY+document.body.scrollTop};if(t.x<0)t.x=0;if(t.y<0)t.y=0;t.time=_this.tracking;if(!_this.active)_this.active=t;else{if(_this.active.x>=t.x-1&&_this.active.x<=t.x+1&&_this.active.y>=t.y-1&&_this.active.y<=t.y+1){if(_this.active.time+20<=t.time)_this.ShowTooltip()}else _this.active=t}};this.ShowTooltip=function(){var i=document.getElementById("user_info_"+_this.USER_ID);if(bDisable||i&&i.style.display=="block")return;var t=BX.browser.IsIE()&&!BX.browser.IsIE10();if(!BX.type.isPlainObject(this.params)){this.params={}}if(null==_this.DIV&&null==_this.ROOT_DIV){_this.ROOT_DIV=document.body.appendChild(document.createElement("DIV"));_this.ROOT_DIV.style.position="absolute";BX.ZIndexManager.register(_this.ROOT_DIV);_this.DIV=_this.ROOT_DIV.appendChild(document.createElement("DIV"));if(t)_this.DIV.className="bx-user-info-shadow-ie";else _this.DIV.className="bx-user-info-shadow";_this.DIV.style.width=_this.width+"px";_this.DIV.style.height=_this.height+"px"}var s=_this.CoordsLeft;var e=_this.CoordsTop+30;var o=BX.GetWindowScrollPos();var a=document.body;var r=false;var n=false;if(a.clientWidth+o.scrollLeft<s+_this.width){s=_this.AnchorRight-_this.width;r=true}if(e-o.scrollTop<0){e=_this.AnchorBottom-5;n=true;_this.v_delta=40}else _this.v_delta=0;_this.ROOT_DIV.style.left=parseInt(s)+"px";_this.ROOT_DIV.style.top=parseInt(e)+"px";BX.ZIndexManager.bringToFront(_this.ROOT_DIV);BX.bind(BX(_this.ROOT_DIV),"click",BX.eventCancelBubble);if(this.rootClassName!="undefined"&&this.rootClassName!=null&&this.rootClassName.length>0)_this.ROOT_DIV.className=this.rootClassName;if(""==_this.DIV.innerHTML){var l=_this.LOADER+(_this.LOADER.indexOf("?")>=0?"&":"?")+"MUL_MODE=INFO&USER_ID="+_this.USER_ID+"&site="+(BX.message("SITE_ID")||"")+(typeof _this.params!="undefined"&&typeof _this.params.entityType!="undefined"&&_this.params.entityType.length>0?"&entityType="+_this.params.entityType:"")+(typeof _this.params!="undefined"&&typeof _this.params.entityId!="undefined"&&parseInt(_this.params.entityId)>0?"&entityId="+parseInt(_this.params.entityId):"");BX.ajax.get(l,_this.InsertData);_this.DIV.id="user_info_"+_this.USER_ID;_this.DIV.innerHTML='<div class="bx-user-info-wrap">'+'<div class="bx-user-info-leftcolumn">'+'<div class="bx-user-photo" id="user-info-photo-'+_this.USER_ID+'"><div class="bx-user-info-data-loading">'+BX.message("JS_CORE_LOADING")+"</div></div>"+'<div class="bx-user-tb-control bx-user-tb-control-left" id="user-info-toolbar-'+_this.USER_ID+'"></div>'+"</div>"+'<div class="bx-user-info-data">'+'<div id="user-info-data-card-'+_this.USER_ID+'"></div>'+'<div class="bx-user-info-data-tools">'+'<div class="bx-user-tb-control bx-user-tb-control-right" id="user-info-toolbar2-'+_this.USER_ID+'"></div>'+'<div class="bx-user-info-data-clear"></div>'+"</div>"+"</div>"+'</div><div class="bx-user-info-bottomarea"></div>'}if(t){_this.DIV.className="bx-user-info-shadow-ie";_this.classNameAnim="bx-user-info-shadow-anim-ie";_this.classNameFixed="bx-user-info-shadow-ie"}else{_this.DIV.className="bx-user-info-shadow";_this.classNameAnim="bx-user-info-shadow-anim";_this.classNameFixed="bx-user-info-shadow"}_this.filterFixed="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/bitrix/components/bitrix/main.user.link/templates/.default/images/cloud-left-top.png', sizingMethod = 'crop' );";if(r&&n){if(BX.browser.IsIE6()){_this.DIV.className="bx-user-info-shadow-hv-ie6";_this.classNameAnim="bx-user-info-shadow-hv-anim-ie6";_this.classNameFixed="bx-user-info-shadow-hv-ie6"}else if(t){_this.DIV.className="bx-user-info-shadow-hv-ie";_this.classNameAnim="bx-user-info-shadow-hv-anim-ie";_this.classNameFixed="bx-user-info-shadow-hv-ie"}else{_this.DIV.className="bx-user-info-shadow-hv";_this.classNameAnim="bx-user-info-shadow-hv-anim";_this.classNameFixed="bx-user-info-shadow-hv"}_this.filterFixed="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/bitrix/components/bitrix/main.user.link/templates/.default/images/cloud-right-bottom.png', sizingMethod = 'crop' );"}else{if(r){if(t){_this.DIV.className="bx-user-info-shadow-h-ie";_this.classNameAnim="bx-user-info-shadow-h-anim-ie";_this.classNameFixed="bx-user-info-shadow-h-ie"}else{_this.DIV.className="bx-user-info-shadow-h";_this.classNameAnim="bx-user-info-shadow-h-anim";_this.classNameFixed="bx-user-info-shadow-h"}_this.filterFixed="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/bitrix/components/bitrix/main.user.link/templates/.default/images/cloud-right-top.png', sizingMethod = 'crop' );"}if(n){if(BX.browser.IsIE6()){_this.DIV.className="bx-user-info-shadow-v-ie6";_this.classNameAnim="bx-user-info-shadow-v-anim-ie6";_this.classNameFixed="bx-user-info-shadow-v-ie6"}else if(t){_this.DIV.className="bx-user-info-shadow-v-ie";_this.classNameAnim="bx-user-info-shadow-v-anim-ie";_this.classNameFixed="bx-user-info-shadow-v-ie"}else{_this.DIV.className="bx-user-info-shadow-v";_this.classNameAnim="bx-user-info-shadow-v-anim";_this.classNameFixed="bx-user-info-shadow-v"}_this.filterFixed="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/bitrix/components/bitrix/main.user.link/templates/.default/images/cloud-left-bottom.png', sizingMethod = 'crop' );"}}if(BX.browser.IsIE()&&null==_this.IFRAME){_this.IFRAME=document.body.appendChild(document.createElement("IFRAME"));_this.IFRAME.id=_this.DIV.id+"_frame";_this.IFRAME.style.position="absolute";_this.IFRAME.style.width=_this.width-60+"px";_this.IFRAME.style.height=_this.height-100+"px";_this.IFRAME.style.borderStyle="solid";_this.IFRAME.style.borderWidth="0px";_this.IFRAME.style.zIndex=550;_this.IFRAME.style.display="none"}if(BX.browser.IsIE()){_this.IFRAME.style.left=parseInt(s)+25+"px";_this.IFRAME.style.top=parseInt(e)+30+_this.v_delta+"px"}_this.DIV.style.display="none";_this.ShowOpacityEffect({func:_this.SetVisible,obj:_this.DIV,arParams:[]},0);document.getElementById("user_info_"+_this.USER_ID).onmouseover=function(){_this.StartTrackMouse(this)};document.getElementById("user_info_"+_this.USER_ID).onmouseout=function(){_this.StopTrackMouse(this)};BX.onCustomEvent("onTooltipShow",[this])};this.InsertData=function(data){if(null!=data&&data.length>0){eval("_this.INFO = "+data);var cardEl=document.getElementById("user-info-data-card-"+_this.USER_ID);cardEl.innerHTML=_this.INFO.RESULT.Card;var photoEl=document.getElementById("user-info-photo-"+_this.USER_ID);photoEl.innerHTML=_this.INFO.RESULT.Photo;var toolbarEl=document.getElementById("user-info-toolbar-"+_this.USER_ID);toolbarEl.innerHTML=_this.INFO.RESULT.Toolbar;var toolbar2El=document.getElementById("user-info-toolbar2-"+_this.USER_ID);toolbar2El.innerHTML=_this.INFO.RESULT.Toolbar2;if(BX.type.isArray(_this.INFO.RESULT.Scripts)){for(var i=0;i<_this.INFO.RESULT.Scripts.length;i++){eval(_this.INFO.RESULT.Scripts[i])}}BX.onCustomEvent("onTooltipInsertData",[_this])}}};BX.CTooltip.prototype.StartTrackMouse=function(i){var t=this;if(!this.tracking){var s=BX.pos(i);this.RealAnchor=i;this.CoordsLeft=s.left+0;this.CoordsTop=s.top-325;this.AnchorRight=s.right;this.AnchorBottom=s.bottom;this.tracking=1;BX.bind(document,"mousemove",t.TrackMouse);setTimeout(function(){t.tickTimer()},500)}};BX.CTooltip.prototype.StopTrackMouse=function(){var i=this;if(this.tracking){BX.unbind(document,"mousemove",i.TrackMouse);this.active=false;setTimeout(function(){i.HideTooltip()},500);this.tracking=false}};BX.CTooltip.prototype.tickTimer=function(){var i=this;if(this.tracking){this.tracking++;if(this.active){if(this.active.time+5<=this.tracking)this.ShowTooltip()}setTimeout(function(){i.tickTimer()},100)}};BX.CTooltip.prototype.HideTooltip=function(){if(!this.tracking)this.ShowOpacityEffect({func:this.SetInVisible,obj:this.DIV,arParams:[]},1)};BX.CTooltip.prototype.ShowOpacityEffect=function(i,t){var s=3;var e=1;var o=1/s;var a=0,r,n=this;if(BX.browser.IsIE()&&n.DIV)n.DIV.className=n.classNameAnim;var l=function(){a++;if(a>s){clearInterval(h);if(!i.arParams)i.arParams=[];if(i.func&&i.obj)i.func.apply(i.obj,i.arParams);return}r=t?1-a*o:a*o;if(n.DIV!=null){try{n.DIV.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+r*100+")";n.DIV.style.opacity=r;n.DIV.style.MozOpacity=r;n.DIV.style.KhtmlOpacity=r}catch(i){}finally{if(!t&&a==1)n.DIV.style.display="block";if(t&&a==s&&n.DIV)n.DIV.style.display="none";if(BX.browser.IsIE()&&a==1&&t&&n.IFRAME)n.IFRAME.style.display="none";if(BX.browser.IsIE()&&a==s&&n.DIV){if(!t)n.IFRAME.style.display="block";n.DIV.style.filter=n.filterFixed;n.DIV.className=n.classNameFixed;n.DIV.innerHTML=""+n.DIV.innerHTML}if(t){BX.onCustomEvent("onTooltipHide",[n])}}}};var h=setInterval(l,e)}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:49:"/bitrix/js/main/core/core_timer.js?16988537926316";s:6:"source";s:34:"/bitrix/js/main/core/core_timer.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(window){
if (window.BX.timer) return;

var timers = [],
	timeout = 200,
	obTimer = null,
	last_index = 0;

BX.timer = function(container, params)
{
	params = params || {};
	if (BX.type.isString(container) || BX.type.isElementNode(container))
		params.container = container;
	else if (typeof (container) == "object")
		params = container;

	if (!params.container)
		return false;

	var ob = new BX.CTimer(params);
	BX.timer.start(ob);

	if (null == obTimer)
	{
		obTimer = setInterval(_RunTimer, timeout);
		BX.garbage(BX.timer.clear);
	}

	return ob;
}

BX.timer.stop = function(timer)
{
	timers[timer.TIMER_INDEX] = null;
}

BX.timer.start = function(timer)
{
	timer.TIMER_INDEX = last_index;
	timers[last_index++] = timer;
}

BX.timer.clock = function(cont, dt)
{
	return BX.timer({container: cont, dt: dt});
}

BX.timer.clear = function()
{
	clearInterval(obTimer);
	timers = null;
}

BX.timer.registerFormat = function(format_name, format_handler)
{
	BX.CTimer.prototype.formatValueHandlers[format_name] = format_handler
}

BX.timer.getHandler = function(format_name)
{
	return BX.CTimer.prototype.formatValueHandlers[format_name];
}

BX.CTimer = function(params, index)
{
	this.container = params.container;
	this.from = params.from ? parseInt(params.from.valueOf()) : null;
	this.to = params.to ? parseInt(params.to.valueOf()) : null;
	this.index = index;

	this.dt = parseInt(params.dt);
	if (isNaN(this.dt))
		this.dt = 0;

	this.display = params.display || (BX.isAmPmMode() ? 'clock_am_pm' : 'clock'); // other variants - 'simple', 'worktime'

	this.accuracy = params.accuracy || 60; // default timing acccuracy is 1 minute

	// if (this.from)
		// this.from = new Date(parseInt(this.from.valueOf() / this.accuracy) * this.accuracy);
	// if (this.to)
		// this.to = new Date(parseInt(this.to.valueOf() / this.accuracy) * this.accuracy);

	this.callback = this.from ? this._callback_from : (this.to ? this._callback_to : this._callback);
	this.callback_finish = params.callback_finish;

	this.formatValue = this.formatValueHandlers.clock;

	this.bInited = false;
	BX.ready(BX.delegate(this.Init, this));
}

BX.CTimer.prototype.Init = function()
{
	if (this.bInited)
		return;

	this.container = BX(this.container);
	this.container_value_fld = this.container.tagName.toUpperCase() == 'INPUT' ? 'value' : 'innerHTML';
	if (this.container_value_fld == 'value' && (this.display == 'clock' || this.display == 'clock_am_pm'))
	{
		if (this.display == 'clock')
		{
			this.display = 'simple';
		}
		else if (this.display == 'clock_am_pm')
		{
			this.display = 'simple_am_pm';
		}
	}

	this.formatValue = this.formatValueHandlers[this.display] ? this.formatValueHandlers[this.display] : this.formatValueHandlers.clock;

	this.bInited = true;
}

BX.CTimer.prototype.setFrom = function(from)
{
	if (!this.from) return;
	this.from = from;
}

BX.CTimer.prototype.setTo = function(to)
{
	if (!this.to) return;
	this.to = to;
}

BX.CTimer.prototype._callback = function(date)
{
	if (this.dt !== 0)
		var date = new Date(date.valueOf() + this.dt);

	this.setValue(this.formatValue(date.getHours(), date.getMinutes(), date.getSeconds()));
}

BX.CTimer.prototype._callback_from = function(date)
{
	var diff = (date.valueOf() - this.from.valueOf() + this.dt)/1000;
	this.setValue(
		this.formatValue(
			parseInt(diff / 3600),
			parseInt((diff % 3600) / 60),
			parseInt(diff % 60)
		)
	);
}

BX.CTimer.prototype._callback_to = function(date)
{
	var diff = (this.to.valueOf() - date.valueOf())/1000;
	if (diff > 0)
	{
		this.setValue(
			this.formatValue(
				parseInt(diff / 3600),
				parseInt((diff % 3600) / 60),
				parseInt(diff % 60)
			)
		);
	}
	else
	{
		this.Finish();
	}
}

BX.CTimer.prototype.formatValueHandlers = {
	clock: function(h, m, s)
	{
		var d = '<span class="bx-timer-semicolon">:</span>';

		return BX.util.str_pad(h, 2, '0', 'left')
			+ d
			+ (this.accuracy >= 3600
				? '00'
				: BX.util.str_pad(m, 2, '0', 'left'))
			+ (this.accuracy >= 60
				? ''
				:
				(d + BX.util.str_pad(s, 2, '0', 'left'))
			);
	},
	clock_am_pm: function(h, m, s)
	{
		var mt = 'am';
		var d = '<span class="bx-timer-semicolon">:</span>';

		if (h > 12)
		{
			h = h - 12;
			mt = 'pm';
		}
		else if (h == 0)
		{
			h = 12;
			mt = 'am';
		}
		else if (h == 12)
		{
			mt = 'pm';
		}

		return h
			+ d
			+ (this.accuracy >= 3600
				? '00'
				: BX.util.str_pad(m, 2, '0', 'left'))
			+ (this.accuracy >= 60
				? ''
				:
				(d + BX.util.str_pad(s, 2, '0', 'left'))
			)
			+ ' ' + mt;
	},
	simple: function(h, m, s)
	{
		return BX.util.str_pad(h, 2, '0', 'left')
			+ ':'
			+ (this.accuracy >= 3600
				? '00'
				: BX.util.str_pad(m, 2, '0', 'left'))

			+ (this.accuracy >= 60
				? ''
				:
				(':' + BX.util.str_pad(s, 2, '0', 'left'))
			);
	},
	simple_am_pm: function(h, m, s)
	{
		var mt = 'am';

		if (h > 12)
		{
			h = h - 12;
			mt = 'pm';
		}
		else if (h == 0)
		{
			h = 12;
			mt = 'am';
		}
		else if (h == 12)
		{
			mt = 'pm';
		}
		return h
			+ ':'
			+ (this.accuracy >= 3600
				? '00'
				: BX.util.str_pad(m, 2, '0', 'left'))

			+ (this.accuracy >= 60
				? ''
				:
				(':' + BX.util.str_pad(s, 2, '0', 'left'))
			) + ' ' + mt;
	},
	worktime: function(h, m, s)
	{
		return h + BX.message('JS_CORE_H') + ' '
			+ (this.accuracy >= 3600
				? ''
				: m + BX.message('JS_CORE_M')
					+ (this.accuracy >= 60
						? ''
						: ' ' + s + BX.message('JS_CORE_S')
					)
				);
	},
	worktime_short: function(h, m, s)
	{
		return BX.util.rtrim((h > 0 ? h + BX.message('JS_CORE_H') + ' ' : '')
			+ (m > 0 && this.accuracy < 3600 ? m + BX.message('JS_CORE_M') + ' ' : '')
			+ (this.accuracy >= 60
				? ''
				: (s > 0 ? s + BX.message('JS_CORE_S') : '')
			));
	}
}

BX.CTimer.prototype.setValue = function(value)
{
	if (this.bInited)
	{
		if (value != this._last_value)
			this.container[this.container_value_fld] = value;

		this._last_value = value;
	}
}

BX.CTimer.prototype.Finish = function()
{
	BX.timer.stop(this);

	if (this.callback_finish)
		this.callback_finish.apply(this);

	BX.cleanNode(this.container.parentNode);
}

function _RunTimer()
{
	var current_moment = new Date();

	for (var i=0,len=last_index;i<len;i++)
	{
		if (timers[i] && timers[i].callback)
			timers[i].callback.apply(timers[i], [current_moment]);
	}

	current_moment = null;
}
})(window)

/* End */
;
; /* Start:"a:4:{s:4:"full";s:55:"/bitrix/js/main/core/core_window.min.js?169885379276326";s:6:"source";s:35:"/bitrix/js/main/core/core_window.js";s:3:"min";s:39:"/bitrix/js/main/core/core_window.min.js";s:3:"map";s:39:"/bitrix/js/main/core/core_window.map.js";}"*/
(function(window){if(BX.WindowManager)return;BX.WindowManager={_stack:[],_runtime_resize:{},_delta:2,_delta_start:1e3,currently_loaded:null,settings_category:"BX.WindowManager.9.5",register:function(t){this.currently_loaded=null;t.WM_REG_INDEX=this._stack.length;this._stack.push(t);if(this._stack.length<2){BX.bind(document,"keyup",BX.proxy(this.__checkKeyPress,this))}},unregister:function(t){if(null==t.WM_REG_INDEX)return null;var e;if(this._stack.length>0){while((e=this.__pop_stack())!=t){if(!e){e=null;break}}if(this._stack.length<=0){this.enableKeyCheck()}return e}else{return null}},__pop_stack:function(t){if(this._stack.length>0){var e=this._stack.pop();e.WM_REG_INDEX=null;BX.onCustomEvent(e,"onWindowUnRegister",[t===true]);return e}else return null},clean:function(){while(this.__pop_stack(true)){}this._stack=null;this.disableKeyCheck()},Get:function(){if(this.currently_loaded)return this.currently_loaded;else if(this._stack.length>0)return this._stack[this._stack.length-1];else return null},setStartZIndex:function(t){this._delta_start=t},restoreStartZIndex:function(){this._delta_start=1e3},GetZIndex:function(){var t;return null!=(t=this._stack[this._stack.length-1])?parseInt(t.Get().style.zIndex)+this._delta:this._delta_start},__get_check_url:function(t){var e=t.indexOf("?");return e==-1?t:t.substring(0,e)},saveWindowSize:function(t,e){var i=this.__get_check_url(t);if(BX.userOptions){BX.userOptions.save(this.settings_category,"size_"+i,"width",e.width);BX.userOptions.save(this.settings_category,"size_"+i,"height",e.height)}this._runtime_resize[i]=e},saveWindowOptions:function(t,e){if(BX.userOptions){for(var i in e){if(e.hasOwnProperty(i)){BX.userOptions.save(this.settings_category,"options_"+t,i,e[i])}}}},getRuntimeWindowSize:function(t){return this._runtime_resize[this.__get_check_url(t)]},disableKeyCheck:function(){BX.unbind(document,"keyup",BX.proxy(this.__checkKeyPress,this))},enableKeyCheck:function(){BX.bind(document,"keyup",BX.proxy(this.__checkKeyPress,this))},__checkKeyPress:function(t){if(null==t)t=window.event;if(t.keyCode==27){var e=BX.WindowManager.Get();if(e&&!e.unclosable)e.Close()}}};BX.garbage(BX.WindowManager.clean,BX.WindowManager);BX.CWindowButton=function(t){if(t.btn){this.btn=t.btn;this.parentWindow=t.parentWindow;if(/save|apply/i.test(this.btn.name)){BX.bind(this.btn,"click",BX.delegate(this.disableUntilError,this))}}else{this.title=t.title;this.hint=t.hint;this.id=t.id;this.name=t.name;this.className=t.className;this.action=t.action;this.onclick=t.onclick;if(t.Button&&BX.type.isFunction(t.Button))this.Button=t.Button;this.btn=null}};BX.CWindowButton.prototype.disable=function(){if(this.btn)this.parentWindow.showWait(this.btn)};BX.CWindowButton.prototype.enable=function(){if(this.btn)this.parentWindow.closeWait(this.btn)};BX.CWindowButton.prototype.emulate=function(){if(this.btn&&this.btn.disabled)return;var t=this.action?BX.delegate(this.action,this):this.onclick?this.onclick:this.btn?this.btn.getAttribute("onclick"):"";if(t){setTimeout(t,50);if(this.btn&&/save|apply/i.test(this.btn.name)&&!this.action){this.disableUntilError()}}};BX.CWindowButton.prototype.Button=function(parentWindow){this.parentWindow=parentWindow;var btn={props:{type:"button",name:this.id?this.id:this.name,value:this.title?this.title:this.name,id:this.id}};if(this.hint)btn.props.title=this.hint;if(!!this.className)btn.props.className=this.className;if(this.action){btn.events={click:BX.delegate(this.action,this)}}else if(this.onclick){if(BX.browser.IsIE()){btn.events={click:BX.delegate((function(){eval(this.onclick)}),this)}}else{btn.attrs={onclick:this.onclick}}}this.btn=BX.create("INPUT",btn);return this.btn};BX.CWindowButton.prototype.disableUntilError=function(){this.disable();if(!this.__window_error_handler_set){BX.addCustomEvent(this.parentWindow,"onWindowError",BX.delegate(this.enable,this));this.__window_error_handler_set=true}};BX.CWindow=function(t,e){this.DIV=t||document.createElement("DIV");this.SETTINGS={resizable:false,min_height:0,min_width:0,top:0,left:0,draggable:false,drag_restrict:true,resize_restrict:true};this.ELEMENTS={draggable:[],resizer:[],close:[]};this.type=e=="float"?"float":"dialog";BX.adjust(this.DIV,{props:{className:"bx-core-window"},style:{zIndex:0,position:"absolute",display:"none",top:this.SETTINGS.top+"px",left:this.SETTINGS.left+"px",height:"100px",width:"100px"}});this.isOpen=false;BX.addCustomEvent(this,"onWindowRegister",BX.delegate(this.onRegister,this));BX.addCustomEvent(this,"onWindowUnRegister",BX.delegate(this.onUnRegister,this));this.MOUSEOVER=null;BX.bind(this.DIV,"mouseover",BX.delegate(this.__set_msover,this));BX.bind(this.DIV,"mouseout",BX.delegate(this.__unset_msover,this));BX.ready(BX.delegate((function(){document.body.appendChild(this.DIV);BX.ZIndexManager.register(this.DIV)}),this))};BX.CWindow.prototype.Get=function(){return this.DIV};BX.CWindow.prototype.visible=function(){return this.isOpen};BX.CWindow.prototype.Show=function(t){this.DIV.style.display="block";if(!t){BX.WindowManager.register(this);BX.onCustomEvent(this,"onWindowRegister")}BX.ZIndexManager.bringToFront(this.DIV)};BX.CWindow.prototype.Hide=function(){BX.WindowManager.unregister(this);this.DIV.style.display="none"};BX.CWindow.prototype.onRegister=function(){this.isOpen=true};BX.CWindow.prototype.onUnRegister=function(t){this.isOpen=false;if(t||this.PARAMS&&this.PARAMS.content_url){if(t){BX.onCustomEvent(this,"onWindowClose",[this,true])}if(this.DIV.parentNode)this.DIV.parentNode.removeChild(this.DIV)}else{this.DIV.style.display="none"}};BX.CWindow.prototype.CloseDialog=BX.CWindow.prototype.Close=function(t){BX.onCustomEvent(this,"onBeforeWindowClose",[this]);if(t!==true){if(this.denyClose)return false}BX.onCustomEvent(this,"onWindowClose",[this]);if(this.bExpanded){var e=BX.GetDocElement();BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));e.style.overflow=this.__expand_settings.overflow}BX.WindowManager.unregister(this);return true};BX.CWindow.prototype.SetResize=function(t){t.style.cursor="se-resize";BX.bind(t,"mousedown",BX.proxy(this.__startResize,this));this.ELEMENTS.resizer.push(t);this.SETTINGS.resizable=true};BX.CWindow.prototype.SetExpand=function(t,e){e=e||"click";BX.bind(t,e,BX.proxy(this.__expand,this))};BX.CWindow.prototype.__expand_onresize=function(){var t=BX.GetWindowInnerSize();this.DIV.style.width=t.innerWidth+"px";this.DIV.style.height=t.innerHeight+"px";BX.onCustomEvent(this,"onWindowResize")};BX.CWindow.prototype.__expand=function(){var t=BX.GetDocElement();if(!this.bExpanded){var e=BX.GetWindowScrollPos(),i=BX.GetWindowInnerSize();this.__expand_settings={resizable:this.SETTINGS.resizable,draggable:this.SETTINGS.draggable,width:this.DIV.style.width,height:this.DIV.style.height,left:this.DIV.style.left,top:this.DIV.style.top,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft,overflow:BX.style(t,"overflow")};this.SETTINGS.resizable=false;this.SETTINGS.draggable=false;window.scrollTo(0,0);t.style.overflow="hidden";this.DIV.style.top="0px";this.DIV.style.left="0px";this.DIV.style.width=i.innerWidth+"px";this.DIV.style.height=i.innerHeight+"px";this.bExpanded=true;BX.onCustomEvent(this,"onWindowExpand");BX.onCustomEvent(this,"onWindowResize");BX.bind(window,"resize",BX.proxy(this.__expand_onresize,this))}else{BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));this.SETTINGS.resizable=this.__expand_settings.resizable;this.SETTINGS.draggable=this.__expand_settings.draggable;t.style.overflow=this.__expand_settings.overflow;this.DIV.style.top=this.__expand_settings.top;this.DIV.style.left=this.__expand_settings.left;this.DIV.style.width=this.__expand_settings.width;this.DIV.style.height=this.__expand_settings.height;window.scrollTo(this.__expand_settings.scrollLeft,this.__expand_settings.scrollTop);this.bExpanded=false;BX.onCustomEvent(this,"onWindowNarrow");BX.onCustomEvent(this,"onWindowResize")}};BX.CWindow.prototype.Resize=function(t,e){var i=Math.max(t-this.pos.left+this.dx,this.SETTINGS.min_width);var s=Math.max(e-this.pos.top+this.dy,this.SETTINGS.min_height);if(this.SETTINGS.resize_restrict){var o=BX.GetWindowScrollSize();if(this.pos.left+i>o.scrollWidth-this.dw)i=o.scrollWidth-this.pos.left-this.dw}this.DIV.style.width=i+"px";this.DIV.style.height=s+"px";BX.onCustomEvent(this,"onWindowResize")};BX.CWindow.prototype.__startResize=function(t){if(!this.SETTINGS.resizable)return false;if(!t)t=window.event;this.wndSize=BX.GetWindowScrollPos();this.wndSize.innerWidth=BX.GetWindowInnerSize().innerWidth;this.pos=BX.pos(this.DIV);this.x=t.clientX+this.wndSize.scrollLeft;this.y=t.clientY+this.wndSize.scrollTop;this.dx=this.pos.left+this.pos.width-this.x;this.dy=this.pos.top+this.pos.height-this.y;this.dw=this.pos.width-parseInt(this.DIV.style.width);BX.bind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.bind(document,"mouseup",BX.proxy(this.__stopResize,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="se-resize";BX.onCustomEvent(this,"onWindowResizeStart");return true};BX.CWindow.prototype.__moveResize=function(t){if(!t)t=window.event;var e=BX.GetWindowScrollPos();var i=t.clientX+e.scrollLeft;var s=t.clientY+e.scrollTop;if(this.x==i&&this.y==s)return;this.Resize(i,s);this.x=i;this.y=s};BX.CWindow.prototype.__stopResize=function(){if(document.body.releaseCapture)document.body.releaseCapture();BX.unbind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.unbind(document,"mouseup",BX.proxy(this.__stopResize,this));document.onmousedown=null;var t=document.body;t.ondrag=t.onselectstart=null;t.style.MozUserSelect=this.DIV.style.MozUserSelect="";t.style.cursor="";BX.onCustomEvent(this,"onWindowResizeFinished")};BX.CWindow.prototype.SetClose=function(t){BX.bind(t,"click",BX.proxy(this.Close,this));this.ELEMENTS.close.push(t)};BX.CWindow.prototype.SetDraggable=function(t){BX.bind(t,"mousedown",BX.proxy(this.__startDrag,this));t.style.cursor="move";this.ELEMENTS.draggable.push(t);this.SETTINGS.draggable=true};BX.CWindow.prototype.Move=function(t,e){var i=1;var s=parseInt(this.DIV.style.left)+t;var o=parseInt(this.DIV.style.top)+e;if(this.SETTINGS.drag_restrict){if(s<0)s=0;var n=BX.GetWindowScrollSize();var r=this.DIV.offsetWidth;var h=this.DIV.offsetHeight;if(s>n.scrollWidth-r-i)s=n.scrollWidth-r-i;var a=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight,n.scrollHeight);if(o>a-h-i)o=a-h-i;if(o<0)o=0}this.DIV.style.left=s+"px";this.DIV.style.top=o+"px"};BX.CWindow.prototype.__startDrag=function(t){if(!this.SETTINGS.draggable)return false;if(!t)t=window.event;this.x=t.clientX+document.body.scrollLeft;this.y=t.clientY+document.body.scrollTop;this.__bWasDragged=false;BX.bind(document,"mousemove",BX.proxy(this.__moveDrag,this));BX.bind(document,"mouseup",BX.proxy(this.__stopDrag,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="move";return BX.PreventDefault(t)};BX.CWindow.prototype.__moveDrag=function(t){if(!t)t=window.event;var e=t.clientX+document.body.scrollLeft;var i=t.clientY+document.body.scrollTop;if(this.x==e&&this.y==i)return;this.Move(e-this.x,i-this.y);this.x=e;this.y=i;if(!this.__bWasDragged){BX.onCustomEvent(this,"onWindowDragStart");this.__bWasDragged=true;BX.bind(BX.proxy_context,"click",BX.PreventDefault)}BX.onCustomEvent(this,"onWindowDrag")};BX.CWindow.prototype.__stopDrag=function(t){if(document.body.releaseCapture)document.body.releaseCapture();BX.unbind(document,"mousemove",BX.proxy(this.__moveDrag,this));BX.unbind(document,"mouseup",BX.proxy(this.__stopDrag,this));document.onmousedown=null;var e=document.body;e.ondrag=e.onselectstart=null;e.style.MozUserSelect=this.DIV.style.MozUserSelect="";e.style.cursor="";if(this.__bWasDragged){BX.onCustomEvent(this,"onWindowDragFinished");var i=BX.proxy_context;setTimeout((function(){BX.unbind(i,"click",BX.PreventDefault)}),100);this.__bWasDragged=false}return BX.PreventDefault(t)};BX.CWindow.prototype.DenyClose=function(){this.denyClose=true};BX.CWindow.prototype.AllowClose=function(){this.denyClose=false};BX.CWindow.prototype.ShowError=function(t){BX.onCustomEvent(this,"onWindowError",[t]);if(this._wait)BX.closeWait(this._wait);window.alert(t)};BX.CWindow.prototype.__set_msover=function(){this.MOUSEOVER=true};BX.CWindow.prototype.__unset_msover=function(){this.MOUSEOVER=false};BX.CWindowDialog=function(){var t=arguments;t[1]="dialog";BX.CWindowDialog.superclass.constructor.apply(this,t);this.DIV.style.top="10px";this.OVERLAY=null};BX.extend(BX.CWindowDialog,BX.CWindow);BX.CWindowDialog.prototype.__resizeOverlay=function(){var t=BX.GetWindowScrollSize();this.OVERLAY.style.width=t.scrollWidth+"px"};BX.CWindowDialog.prototype.CreateOverlay=function(t){if(null==this.OVERLAY){var e=BX.GetWindowScrollSize();var i=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight,e.scrollHeight);this.OVERLAY=document.body.appendChild(BX.create("DIV",{style:{position:"absolute",top:"0px",left:"0px",zIndex:t||parseInt(this.DIV.style.zIndex)-2,width:e.scrollWidth+"px",height:i+"px"}}));var s=BX.ZIndexManager.getComponent(this.DIV);if(s){s.setOverlay(this.OVERLAY)}}return this.OVERLAY};BX.CWindowDialog.prototype.Show=function(){BX.CWindowDialog.superclass.Show.apply(this,arguments);this.CreateOverlay();this.OVERLAY.style.display="block";BX.unbind(window,"resize",BX.proxy(this.__resizeOverlay,this));BX.bind(window,"resize",BX.proxy(this.__resizeOverlay,this))};BX.CWindowDialog.prototype.onUnRegister=function(t){BX.CWindowDialog.superclass.onUnRegister.apply(this,arguments);if(this.clean){if(this.OVERLAY.parentNode)this.OVERLAY.parentNode.removeChild(this.OVERLAY)}else{this.OVERLAY.style.display="none"}BX.unbind(window,"resize",BX.proxy(this.__resizeOverlay,this))};BX.CDialog=function(t){BX.CDialog.superclass.constructor.apply(this);this._sender="core_window_cdialog";this.PARAMS=t||{};for(var e in this.defaultParams){if(typeof this.PARAMS[e]=="undefined")this.PARAMS[e]=this.defaultParams[e]}this.PARAMS.width=!isNaN(parseInt(this.PARAMS.width))?this.PARAMS.width:this.defaultParams["width"];this.PARAMS.height=!isNaN(parseInt(this.PARAMS.height))?this.PARAMS.height:this.defaultParams["height"];if(this.PARAMS.resize_id||this.PARAMS.content_url){var i=BX.WindowManager.getRuntimeWindowSize(this.PARAMS.resize_id||this.PARAMS.content_url);if(i){this.PARAMS.width=i.width;this.PARAMS.height=i.height}}BX.addClass(this.DIV,"bx-core-adm-dialog");this.DIV.id="bx-admin-prefix";this.PARTS={};this.DIV.style.height=null;this.DIV.style.width=null;this.PARTS.TITLEBAR=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head"}}));this.PARTS.TITLE_CONTAINER=this.PARTS.TITLEBAR.appendChild(BX.create("SPAN",{props:{className:"bx-core-adm-dialog-head-inner"},text:this.PARAMS.title}));this.PARTS.TITLEBAR_ICONS=this.PARTS.TITLEBAR.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head-icons"},children:this.PARAMS.resizable?[BX.create("SPAN",{props:{className:"bx-core-adm-icon-expand",title:BX.message("JS_CORE_WINDOW_EXPAND")}}),BX.create("SPAN",{props:{className:"bx-core-adm-icon-close",title:BX.message("JS_CORE_WINDOW_CLOSE")}})]:[BX.create("SPAN",{props:{className:"bx-core-adm-icon-close",title:BX.message("JS_CORE_WINDOW_CLOSE")}})]}));this.PARTS.CONTENT=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-content-wrap adm-workarea"}}));this.PARTS.CONTENT_DATA=this.PARTS.CONTENT.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-content"},style:{height:this.PARAMS.height+"px",width:this.PARAMS.width+"px"}}));this.PARTS.HEAD=this.PARTS.CONTENT_DATA.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head-block"+(this.PARAMS.icon?" "+this.PARAMS.icon:"")}}));this.SetHead(this.PARAMS.head);this.SetContent(this.PARAMS.content);this.SetTitle(this.PARAMS.title);this.SetClose(this.PARTS.TITLEBAR_ICONS.lastChild);if(this.PARAMS.resizable){this.SetExpand(this.PARTS.TITLEBAR_ICONS.firstChild);this.SetExpand(this.PARTS.TITLEBAR,"dblclick");BX.addCustomEvent(this,"onWindowExpand",BX.proxy(this.__onexpand,this));BX.addCustomEvent(this,"onWindowNarrow",BX.proxy(this.__onexpand,this))}this.PARTS.FOOT=this.PARTS.BUTTONS_CONTAINER=this.PARTS.CONTENT.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-buttons"},children:this.ShowButtons()}));if(this.PARAMS.draggable)this.SetDraggable(this.PARTS.TITLEBAR);if(this.PARAMS.resizable){this.PARTS.RESIZER=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-resizer"}}));this.SetResize(this.PARTS.RESIZER);this.SETTINGS.min_width=this.PARAMS.min_width;this.SETTINGS.min_height=this.PARAMS.min_height}this.auth_callback=BX.delegate((function(){this.PARAMS.content="";this.hideNotify();this.Show()}),this)};BX.extend(BX.CDialog,BX.CWindowDialog);BX.CDialog.prototype.defaultParams={width:700,height:400,min_width:500,min_height:300,resizable:true,draggable:true,title:"",icon:""};BX.CDialog.prototype.showWait=function(t){if(BX.type.isElementNode(t)&&(t.type=="button"||t.type=="submit")){BX.defer((function(){t.disabled=true}))();var e=BX.hasClass(t,"adm-btn-save")||BX.hasClass(t,"adm-btn-save"),i=BX.pos(t,true);t.bxwaiter=this.PARTS.FOOT.appendChild(BX.create("DIV",{props:{className:"adm-btn-load-img"+(e?"-green":"")},style:{top:parseInt((i.bottom+i.top)/2-10)+"px",left:parseInt((i.right+i.left)/2-10)+"px"}}));BX.addClass(t,"adm-btn-load");this.lastWaitElement=t;return t.bxwaiter}return null};BX.CDialog.prototype.closeWait=function(t){t=t||this.lastWaitElement;if(BX.type.isElementNode(t)){if(t.bxwaiter){if(t.bxwaiter.parentNode){t.bxwaiter.parentNode.removeChild(t.bxwaiter)}t.bxwaiter=null}t.disabled=false;BX.removeClass(t,"adm-btn-load");if(this.lastWaitElement==t)this.lastWaitElement=null}};BX.CDialog.prototype.Authorize=function(t){this.bSkipReplaceContent=true;this.ShowError(BX.message("JSADM_AUTH_REQ"));BX.onCustomEvent(this,"onWindowError",[]);BX.closeWait();new BX.CAuthDialog({content_url:this.PARAMS.content_url,auth_result:t,callback:BX.delegate((function(){if(this.auth_callback)this.auth_callback()}),this)}).Show()};BX.CDialog.prototype.ShowError=function(t){BX.onCustomEvent(this,"onWindowError",[t]);this.closeWait();if(this._wait)BX.closeWait(this._wait);this.Notify(t,true)};BX.CDialog.prototype.__expandGetSize=function(){var t=BX.GetDocElement();t.style.overflow="hidden";var e=BX.GetWindowInnerSize();t.scrollTop=0;this.DIV.style.top="-"+this.dxShadow+"px";this.DIV.style.left="-"+this.dxShadow+"px";return{width:e.innerWidth-parseInt(BX.style(this.PARTS.CONTENT,"padding-right"))-parseInt(BX.style(this.PARTS.CONTENT,"padding-left"))+this.dxShadow,height:e.innerHeight-this.PARTS.TITLEBAR.offsetHeight-this.PARTS.FOOT.offsetHeight-parseInt(BX.style(this.PARTS.CONTENT,"padding-top"))-parseInt(BX.style(this.PARTS.CONTENT,"padding-bottom"))+this.dxShadow}};BX.CDialog.prototype.__expand=function(){var t=BX.GetDocElement();this.dxShadow=2;if(!this.bExpanded){var e=BX.GetWindowScrollPos();this.__expand_settings={resizable:this.SETTINGS.resizable,draggable:this.SETTINGS.draggable,width:this.PARTS.CONTENT_DATA.style.width,height:this.PARTS.CONTENT_DATA.style.height,left:this.DIV.style.left,top:this.DIV.style.top,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft,overflow:BX.style(t,"overflow")};this.SETTINGS.resizable=false;this.SETTINGS.draggable=false;var i=this.__expandGetSize();this.PARTS.CONTENT_DATA.style.width=i.width+"px";this.PARTS.CONTENT_DATA.style.height=i.height+"px";window.scrollTo(0,0);t.style.overflow="hidden";this.bExpanded=true;BX.onCustomEvent(this,"onWindowExpand");BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{width:i.width,height:i.height}]);BX.bind(window,"resize",BX.proxy(this.__expand_onresize,this))}else{BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));this.SETTINGS.resizable=this.__expand_settings.resizable;this.SETTINGS.draggable=this.__expand_settings.draggable;t.style.overflow=this.__expand_settings.overflow;this.DIV.style.top=this.__expand_settings.top;this.DIV.style.left=this.__expand_settings.left;this.PARTS.CONTENT_DATA.style.width=this.__expand_settings.width;this.PARTS.CONTENT_DATA.style.height=this.__expand_settings.height;window.scrollTo(this.__expand_settings.scrollLeft,this.__expand_settings.scrollTop);this.bExpanded=false;BX.onCustomEvent(this,"onWindowNarrow");BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{width:parseInt(this.__expand_settings.width),height:parseInt(this.__expand_settings.height)}])}};BX.CDialog.prototype.__expand_onresize=function(){var t=this.__expandGetSize();this.PARTS.CONTENT_DATA.style.width=t.width+"px";this.PARTS.CONTENT_DATA.style.height=t.height+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[t])};BX.CDialog.prototype.__onexpand=function(){var t=this.PARTS.TITLEBAR_ICONS.firstChild;t.className=BX.toggle(t.className,["bx-core-adm-icon-expand","bx-core-adm-icon-narrow"]);t.title=BX.toggle(t.title,[BX.message("JS_CORE_WINDOW_EXPAND"),BX.message("JS_CORE_WINDOW_NARROW")]);if(this.PARTS.RESIZER){this.PARTS.RESIZER.style.display=this.bExpanded?"none":"block"}};BX.CDialog.prototype.__startResize=function(t){if(!this.SETTINGS.resizable)return false;if(!t)t=window.event;this.wndSize=BX.GetWindowScrollPos();this.wndSize.innerWidth=BX.GetWindowInnerSize().innerWidth;this.pos=BX.pos(this.PARTS.CONTENT_DATA);this.x=t.clientX+this.wndSize.scrollLeft;this.y=t.clientY+this.wndSize.scrollTop;this.dx=this.pos.left+this.pos.width-this.x;this.dy=this.pos.top+this.pos.height-this.y;this.dw=this.pos.width-parseInt(this.PARTS.CONTENT_DATA.style.width)+parseInt(BX.style(this.PARTS.CONTENT,"padding-right"));BX.bind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.bind(document,"mouseup",BX.proxy(this.__stopResize,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="se-resize";BX.onCustomEvent(this,"onWindowResizeStart");return true};BX.CDialog.prototype.Resize=function(t,e){var i=Math.max(t-this.pos.left+this.dx,this.SETTINGS.min_width);var s=Math.max(e-this.pos.top+this.dy,this.SETTINGS.min_height);if(this.SETTINGS.resize_restrict){var o=BX.GetWindowScrollSize();if(this.pos.left+i>o.scrollWidth-this.dw)i=o.scrollWidth-this.pos.left-this.dw}this.PARTS.CONTENT_DATA.style.width=i+"px";this.PARTS.CONTENT_DATA.style.height=s+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{height:s,width:i}])};BX.CDialog.prototype.SetSize=function(t){this.PARTS.CONTENT_DATA.style.width=t.width+"px";this.PARTS.CONTENT_DATA.style.height=t.height+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[t])};BX.CDialog.prototype.GetParameters=function(t){var e=this.GetForm();if(!e)return"";var i,s="";var o=e.elements.length;var n="";for(i=0;i<o;i++){if(s!="")n="&";var r=e.elements[i];if(r.disabled)continue;switch(r.type.toLowerCase()){case"text":case"textarea":case"password":case"hidden":if(null==t&&r.name.substr(r.name.length-4)=="_alt"&&e.elements[r.name.substr(0,r.name.length-4)])break;s+=n+r.name+"="+BX.util.urlencode(r.value);break;case"radio":if(r.checked)s+=n+r.name+"="+BX.util.urlencode(r.value);break;case"checkbox":s+=n+r.name+"="+BX.util.urlencode(r.checked?"Y":"N");break;case"select-one":var h="";if(null==t&&e.elements[r.name+"_alt"]&&r.selectedIndex==0)h=e.elements[r.name+"_alt"].value;else h=r.value;s+=n+r.name+"="+BX.util.urlencode(h);break;case"select-multiple":var a,l=false;var d=r.options.length;for(a=0;a<d;a++){if(r.options[a].selected){s+=n+r.name+"="+BX.util.urlencode(r.options[a].value);l=true}}if(!l)s+=n+r.name+"=";break;default:break}}return s};BX.CDialog.prototype.PostParameters=function(t){var e=this.PARAMS.content_url;if(null==t)t="";t+=(t==""?"":"&")+"bxsender="+this._sender;var i=e.indexOf("?");if(i==-1)e+="?"+t;else e=e.substring(0,i)+"?"+t+"&"+e.substring(i+1);BX.showWait();this.auth_callback=BX.delegate((function(){this.hideNotify();this.PostParameters(t)}),this);BX.ajax.Setup({skipAuthCheck:true},true);BX.ajax.post(e,this.GetParameters(),BX.delegate((function(t){BX.closeWait();if(!this.bSkipReplaceContent){this.ClearButtons();this.SetContent(t);this.Show(true)}this.bSkipReplaceContent=false}),this))};BX.CDialog.prototype.Submit=function(t,e){var i=this.GetForm();if(i){i.onsubmit=null;i.method="POST";if(!i.action||e){e=e||this.PARAMS.content_url;if(null!=t){var s=e.indexOf("?");if(s==-1)e+="?"+t;else e=e.substring(0,s)+"?"+t+"&"+e.substring(s+1)}i.action=e}if(!i._bxsender){i._bxsender=i.appendChild(BX.create("INPUT",{attrs:{type:"hidden",name:"bxsender",value:this._sender}}))}this._wait=BX.showWait();this.auth_callback=BX.delegate((function(){this.hideNotify();this.Submit(t)}),this);BX.ajax.submit(i,BX.delegate((function(){this.closeWait()}),this))}else{window.alert("no form registered!")}};BX.CDialog.prototype.GetForm=function(){if(null==this.__form){var t=this.PARTS.CONTENT_DATA.getElementsByTagName("FORM");this.__form=t[0]?t[0]:null}return this.__form};BX.CDialog.prototype.GetRealForm=function(){if(null==this.__rform){var t=this.PARTS.CONTENT_DATA.getElementsByTagName("FORM");this.__rform=t[1]?t[1]:t[0]?t[0]:null}return this.__rform};BX.CDialog.prototype._checkButton=function(t){var e=["btnSave","btnCancel","btnClose"];for(var i=0;i<e.length;i++){if(this[e[i]]&&t==this[e[i]])return e[i]}return false};BX.CDialog.prototype.ShowButtons=function(){var t=[];if(this.PARAMS.buttons){if(this.PARAMS.buttons.title)this.PARAMS.buttons=[this.PARAMS.buttons];for(var e=0,i=this.PARAMS.buttons.length;e<i;e++){if(BX.type.isNotEmptyString(this.PARAMS.buttons[e])){t.push(this.PARAMS.buttons[e])}else if(BX.type.isElementNode(this.PARAMS.buttons[e])){t.push(this.PARAMS.buttons[e])}else if(this.PARAMS.buttons[e]){if(!BX.is_subclass_of(this.PARAMS.buttons[e],BX.CWindowButton)){var s=this._checkButton(this.PARAMS.buttons[e]);this.PARAMS.buttons[e]=new BX.CWindowButton(this.PARAMS.buttons[e]);if(s)this[s]=this.PARAMS.buttons[e]}t.push(this.PARAMS.buttons[e].Button(this))}}}return t};BX.CDialog.prototype.setAutosave=function(){if(!this.bSetAutosaveDelay){this.bSetAutosaveDelay=true;setTimeout(BX.proxy(this.setAutosave,this),10)}};BX.CDialog.prototype.SetTitle=function(t){this.PARAMS.title=t;BX.cleanNode(this.PARTS.TITLE_CONTAINER).appendChild(document.createTextNode(this.PARAMS.title))};BX.CDialog.prototype.SetHead=function(t){this.PARAMS.head=BX.util.trim(t);this.PARTS.HEAD.innerHTML=this.PARAMS.head||"&nbsp;";this.PARTS.HEAD.style.display=this.PARAMS.head?"block":"none";this.adjustSize()};BX.CDialog.prototype.Notify=function(t,e,i){if(!this.PARTS.NOTIFY){this.PARTS.NOTIFY=this.DIV.insertBefore(BX.create("DIV",{props:{className:"adm-warning-block"},children:[BX.create("SPAN",{props:{className:"adm-warning-text"}}),BX.create("SPAN",{props:{className:"adm-warning-icon"}}),BX.create("SPAN",{props:{className:"adm-warning-close"},events:{click:BX.proxy(this.hideNotify,this)}})]}),this.DIV.firstChild)}if(e)BX.addClass(this.PARTS.NOTIFY,"adm-warning-block-red");else BX.removeClass(this.PARTS.NOTIFY,"adm-warning-block-red");if(i!==true){t=BX.util.htmlspecialchars(t)}this.PARTS.NOTIFY.firstChild.innerHTML=t||"&nbsp;";this.PARTS.NOTIFY.firstChild.style.width=this.PARAMS.width-50+"px";BX.removeClass(this.PARTS.NOTIFY,"adm-warning-animate")};BX.CDialog.prototype.hideNotify=function(){BX.addClass(this.PARTS.NOTIFY,"adm-warning-animate")};BX.CDialog.prototype.__adjustHeadToIcon=function(){if(!this.PARTS.HEAD.offsetHeight){setTimeout(BX.delegate(this.__adjustHeadToIcon,this),50)}else{if(this.icon_image&&this.icon_image.height&&this.icon_image.height>this.PARTS.HEAD.offsetHeight-5){this.PARTS.HEAD.style.height=this.icon_image.height+5+"px";this.adjustSize()}this.icon_image.onload=null;this.icon_image=null}};BX.CDialog.prototype.SetIcon=function(t){if(this.PARAMS.icon!=t){if(this.PARAMS.icon)BX.removeClass(this.PARTS.HEAD,this.PARAMS.icon);this.PARAMS.icon=t;if(this.PARAMS.icon){BX.addClass(this.PARTS.HEAD,this.PARAMS.icon);var e=BX.style(this.PARTS.HEAD,"background-image")||BX.style(this.PARTS.HEAD,"backgroundImage");if(BX.type.isNotEmptyString(e)&&e!="none"){var i=e.match(new RegExp("url\\s*\\(\\s*('|\"|)(.+?)(\\1)\\s*\\)"));if(i){e=i[2];if(BX.type.isNotEmptyString(e)){this.icon_image=new Image;this.icon_image.onload=BX.delegate(this.__adjustHeadToIcon,this);this.icon_image.src=e}}}}}this.adjustSize()};BX.CDialog.prototype.SetIconFile=function(t){this.icon_image=new Image;this.icon_image.onload=BX.delegate(this.__adjustHeadToIcon,this);this.icon_image.src=t;BX.adjust(this.PARTS.HEAD,{style:{backgroundImage:"url("+t+")",backgroundPosition:"right 9px"}});this.adjustSize()};BX.CDialog.prototype.SetButtons=function(t){if(BX.type.isString(t)){if(t.length>0){this.PARTS.BUTTONS_CONTAINER.innerHTML+=t;var e=this.PARTS.BUTTONS_CONTAINER.getElementsByTagName("INPUT");if(e.length>0){this.PARAMS.buttons=[];for(var i=0;i<e.length;i++){this.PARAMS.buttons.push(new BX.CWindowButton({btn:e[i],parentWindow:this}))}}}}else{this.PARAMS.buttons=t;BX.adjust(this.PARTS.BUTTONS_CONTAINER,{children:this.ShowButtons()})}this.adjustSize()};BX.CDialog.prototype.ClearButtons=function(){BX.cleanNode(this.PARTS.BUTTONS_CONTAINER);this.adjustSize()};BX.CDialog.prototype.SetContent=function(t){this.__form=null;if(BX.type.isElementNode(t)){if(t.parentNode)t.parentNode.removeChild(t)}else if(BX.type.isString(t)){t=BX.create("DIV",{html:t})}this.PARAMS.content=t;BX.cleanNode(this.PARTS.CONTENT_DATA);BX.adjust(this.PARTS.CONTENT_DATA,{children:[this.PARTS.HEAD,BX.create("DIV",{props:{className:"bx-core-adm-dialog-content-wrap-inner"},children:[this.PARAMS.content]})]});if(this.PARAMS.content_url&&this.GetForm()){this.__form.submitbtn=this.__form.appendChild(BX.create("INPUT",{props:{type:"submit"},style:{display:"none"}}));this.__form.onsubmit=BX.delegate(this.__submit,this)}};BX.CDialog.prototype.__submit=function(t){for(var e=0,i=this.PARAMS.buttons.length;e<i;e++){if(this.PARAMS.buttons[e]&&(this.PARAMS.buttons[e].name&&/save|apply/i.test(this.PARAMS.buttons[e].name)||this.PARAMS.buttons[e].btn&&this.PARAMS.buttons[e].btn.name&&/save|apply/i.test(this.PARAMS.buttons[e].btn.name))){this.PARAMS.buttons[e].emulate();break}}return BX.PreventDefault(t)};BX.CDialog.prototype.SwapContent=function(t){t=BX(t);BX.cleanNode(this.PARTS.CONTENT_DATA);t.parentNode.removeChild(t);this.PARTS.CONTENT_DATA.appendChild(t);t.style.display="block";this.SetContent(t.innerHTML)};BX.CDialog.prototype.adjustSize=function(){};BX.CDialog.prototype.__adjustSize=function(){};BX.CDialog.prototype.adjustSizeEx=function(){BX.defer(this.__adjustSizeEx,this)()};BX.CDialog.prototype.__adjustSizeEx=function(){var t=this.PARTS.CONTENT_DATA.firstChild,e=0,i,s;while(t){if(BX.type.isElementNode(t)){i=parseInt(BX.style(t,"margin-top"),10);if(isNaN(i))i=0;s=parseInt(BX.style(t,"margin-bottom"),10);if(isNaN(s))s=0;e+=t.offsetHeight+i+s}t=BX.nextSibling(t)}if(e)this.PARTS.CONTENT_DATA.style.height=e+"px"};BX.CDialog.prototype.__onResizeFinished=function(){BX.WindowManager.saveWindowSize(this.PARAMS.resize_id||this.PARAMS.content_url,{height:parseInt(this.PARTS.CONTENT_DATA.style.height),width:parseInt(this.PARTS.CONTENT_DATA.style.width)})};BX.CDialog.prototype.Show=function(t){if(!this.PARAMS.content&&this.PARAMS.content_url&&BX.ajax&&!t){var e=BX.showWait();BX.WindowManager.currently_loaded=this;this.CreateOverlay();this.OVERLAY.style.display="block";this.OVERLAY.className="bx-core-dialog-overlay";var i="",s="GET";if(this.PARAMS.content_post){i=this.PARAMS.content_post;s="POST"}var o=this.PARAMS.content_url+(this.PARAMS.content_url.indexOf("?")<0?"?":"&")+"bxsender="+this._sender;this.auth_callback=BX.delegate((function(){this.PARAMS.content="";this.hideNotify();this.Show()}),this);BX.ajax({method:s,dataType:"html",url:o,data:i,skipAuthCheck:true,onsuccess:BX.delegate((function(t){BX.closeWait(null,e);this.SetContent(t||"&nbsp;");this.Show()}),this)})}else{BX.WindowManager.currently_loaded=null;BX.CDialog.superclass.Show.apply(this,arguments);this.adjustPos();this.OVERLAY.className="bx-core-dialog-overlay";this.__adjustSize();BX.removeCustomEvent(this,"onWindowResize",BX.proxy(this.__adjustSize,this));BX.addCustomEvent(this,"onWindowResize",BX.proxy(this.__adjustSize,this));if(this.PARAMS.resizable&&(this.PARAMS.content_url||this.PARAMS.resize_id)){BX.removeCustomEvent(this,"onWindowResizeFinished",BX.proxy(this.__onResizeFinished,this));BX.addCustomEvent(this,"onWindowResizeFinished",BX.proxy(this.__onResizeFinished,this))}}};BX.CDialog.prototype.GetInnerPos=function(){return{width:parseInt(this.PARTS.CONTENT_DATA.style.width),height:parseInt(this.PARTS.CONTENT_DATA.style.height)}};BX.CDialog.prototype.adjustPos=function(){if(!this.bExpanded){var t=window;var e=BX.PageObject.getRootWindow();if(e.BX.SidePanel&&e.BX.SidePanel.Instance&&e.BX.SidePanel.Instance.getTopSlider()){t=e.BX.SidePanel.Instance.getTopSlider().getWindow()}var i=t.BX.GetWindowInnerSize();var s=t.BX.GetWindowScrollPos();var o={left:parseInt(s.scrollLeft+i.innerWidth/2-parseInt(this.DIV.offsetWidth)/2)+"px",top:Math.max(parseInt(s.scrollTop+i.innerHeight/2-parseInt(this.DIV.offsetHeight)/2),0)+"px"};BX.adjust(this.DIV,{style:o})}};BX.CDialog.prototype.GetContent=function(){return this.PARTS.CONTENT_DATA};BX.CDialog.prototype.btnSave=BX.CDialog.btnSave={title:BX.message("JS_CORE_WINDOW_SAVE"),id:"savebtn",name:"savebtn",className:BX.browser.IsIE()&&BX.browser.IsDoctype()&&!BX.browser.IsIE10()?"":"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.PostParameters()}};BX.CDialog.prototype.btnCancel=BX.CDialog.btnCancel={title:BX.message("JS_CORE_WINDOW_CANCEL"),id:"cancel",name:"cancel",action:function(){this.parentWindow.Close()}};BX.CDialog.prototype.btnClose=BX.CDialog.btnClose={title:BX.message("JS_CORE_WINDOW_CLOSE"),id:"close",name:"close",action:function(){this.parentWindow.Close()}};BX.CAdminDialog=function(t){BX.CAdminDialog.superclass.constructor.apply(this,arguments);this._sender="core_window_cadmindialog";BX.addClass(this.DIV,"bx-core-adm-admin-dialog");this.PARTS.CONTENT.insertBefore(this.PARTS.HEAD,this.PARTS.CONTENT.firstChild);this.PARTS.HEAD.className="bx-core-adm-dialog-tabs"};BX.extend(BX.CAdminDialog,BX.CDialog);BX.CAdminDialog.prototype.SetHead=function(){BX.CAdminDialog.superclass.SetHead.apply(this,arguments);if(this.PARTS.HEAD.firstChild&&BX.type.isElementNode(this.PARTS.HEAD.firstChild)){var t=this.PARTS.HEAD.firstChild,e=0,i=0,s=0;while(t){if(BX.type.isElementNode(t)){i=parseInt(BX.style(t,"margin-left"),10);if(isNaN(i))i=0;s=parseInt(BX.style(t,"margin-right"),10);if(isNaN(s))s=0;e+=t.offsetWidth+i+s}t=BX.nextSibling(t)}this.SETTINGS.min_width=Math.max(e,this.SETTINGS.min_width)-2;if(this.PARAMS.width<this.SETTINGS.min_width){BX.adjust(this.PARTS.CONTENT_DATA,{style:{width:this.SETTINGS.min_width+"px"}})}}};BX.CAdminDialog.prototype.SetContent=function(t){this.__form=null;if(BX.type.isElementNode(t)){if(t.parentNode)t.parentNode.removeChild(t)}this.PARAMS.content=t;BX.cleanNode(this.PARTS.CONTENT_DATA);BX.adjust(this.PARTS.CONTENT_DATA,{children:[this.PARAMS.content||"&nbsp;"]});if(this.PARAMS.content_url&&this.GetForm()){this.__form.appendChild(BX.create("INPUT",{props:{type:"submit"},style:{display:"none"}}));this.__form.onsubmit=BX.delegate(this.__submit,this)}};BX.CAdminDialog.prototype.__expandGetSize=function(){var t=BX.CAdminDialog.superclass.__expandGetSize.apply(this,arguments);t.width-=parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-right"))+parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-left"));t.height-=parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-top"))+parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-bottom"));t.height-=this.PARTS.HEAD.offsetHeight;return t};BX.CAdminDialog.prototype.Submit=function(){var t=this.GetForm();if(t&&!t["bxpublic"]&&!/bxpublic=/.test(t.action)){t.appendChild(BX.create("INPUT",{props:{type:"hidden",name:"bxpublic",value:"Y"}}))}return BX.CAdminDialog.superclass.Submit.apply(this,arguments)};BX.CAdminDialog.prototype.btnSave=BX.CAdminDialog.btnSave={title:BX.message("JS_CORE_WINDOW_SAVE"),id:"savebtn",name:"savebtn",className:"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.Submit()}};BX.CAdminDialog.btnCancel=BX.CAdminDialog.superclass.btnCancel;BX.CAdminDialog.btnClose=BX.CAdminDialog.superclass.btnClose;BX.CDebugDialog=function(t){BX.CDebugDialog.superclass.constructor.apply(this,arguments)};BX.extend(BX.CDebugDialog,BX.CDialog);BX.CDebugDialog.prototype.ShowDetails=function(t){var e=BX(t);if(e){if(this.div_detail_current)this.div_detail_current.style.display="none";e.style.display="block";this.div_detail_current=e}};BX.CDebugDialog.prototype.SetContent=function(t){if(!t)return;var e=t.split("#DIVIDER#");if(e.length>1){this.PARAMS.content=e[1];this.PARTS.CONTENT_DATA.style.overflow="hidden";BX.CDebugDialog.superclass.SetContent.apply(this,[e[1]]);this.PARTS.CONTENT_INNER=this.PARTS.CONTENT_DATA.firstChild.nextSibling;this.PARTS.CONTENT_TOP=this.PARTS.CONTENT_DATA.insertBefore(BX.create("DIV",{props:{className:"bx-debug-content-top"},html:e[0]}),this.PARTS.CONTENT_INNER);this.PARTS.CONTENT_INNER.style.overflow="auto"}else{BX.CDebugDialog.superclass.SetContent.apply(this,arguments)}};BX.CDebugDialog.prototype.__adjustSize=function(){BX.CDebugDialog.superclass.__adjustSize.apply(this,arguments);if(this.PARTS.CONTENT_TOP){var t=this.PARTS.CONTENT_DATA.offsetHeight-this.PARTS.HEAD.offsetHeight-this.PARTS.CONTENT_TOP.offsetHeight-38;if(t>0){this.PARTS.CONTENT_INNER.style.height=t+"px"}}};BX.CEditorDialog=function(t){BX.CEditorDialog.superclass.constructor.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT,"bx-core-adm-dialog-content-wrap");BX.removeClass(this.PARTS.CONTENT_DATA,"bx-core-adm-dialog-content");BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner");BX.removeClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-adm-dialog-buttons");BX.addClass(this.PARTS.CONTENT,"bx-core-editor-dialog-content-wrap");BX.addClass(this.PARTS.CONTENT_DATA,"bx-core-editor-dialog-content");BX.addClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-editor-dialog-buttons")};BX.extend(BX.CEditorDialog,BX.CDialog);BX.CEditorDialog.prototype.SetContent=function(){BX.CEditorDialog.superclass.SetContent.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner")};BX.CWizardDialog=function(t){BX.CWizardDialog.superclass.constructor.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT,"bx-core-adm-dialog-content-wrap");BX.removeClass(this.PARTS.CONTENT_DATA,"bx-core-adm-dialog-content");BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner");BX.removeClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-adm-dialog-buttons");BX.addClass(this.PARTS.CONTENT,"bx-core-wizard-dialog-content-wrap")};BX.extend(BX.CWizardDialog,BX.CDialog);BX.CAuthDialog=function(t){t.resizable=false;t.width=350;t.height=200;t.buttons=[this.btnSave];BX.CAuthDialog.superclass.constructor.apply(this,arguments);this._sender="core_window_cauthdialog";BX.addClass(this.DIV,"bx-core-auth-dialog");BX.AUTHAGENT=this};BX.extend(BX.CAuthDialog,BX.CDialog);BX.CAuthDialog.prototype.btnSave=BX.CAuthDialog.btnSave={title:BX.message("JS_CORE_WINDOW_AUTH"),id:"savebtn",name:"savebtn",className:"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.Submit("",this.parentWindow.PARAMS.content_url)}};BX.CAuthDialog.prototype.SetError=function(t){BX.closeWait();if(!!t)this.ShowError(t.MESSAGE||t)};BX.CAuthDialog.prototype.setAuthResult=function(t){BX.closeWait();if(t===false){this.Close();if(this.PARAMS.callback)this.PARAMS.callback()}else{this.SetError(t)}};BX.CWindowFloat=function(t){BX.CWindowFloat.superclass.constructor.apply(this,[t,"float"]);this.SETTINGS.resizable=false};BX.extend(BX.CWindowFloat,BX.CWindow);BX.CWindowFloat.prototype.adjustPos=function(){if(this.PARAMS.parent)this.adjustToNode();else if(this.PARAMS.x&&this.PARAMS.y)this.adjustToPos([this.PARAMS.x,this.PARAMS.y])};BX.CWindowFloat.prototype.adjustToPos=function(t){this.DIV.style.left=parseInt(t[0])+"px";this.DIV.style.top=parseInt(t[1])+"px"};BX.CWindowFloat.prototype.adjustToNodeGetPos=function(){return BX.pos(this.PARAMS.parent)};BX.CWindowFloat.prototype.adjustToNode=function(t){t=t||this.PARAMS.parent;this.PARAMS.parent=BX(t);if(this.PARAMS.parent){var e=this.adjustToNodeGetPos();this.DIV.style.top=e.top+"px";this.DIV.style.left=e.left+"px";this.PARAMS.parent.OPENER=this}};BX.CWindowFloat.prototype.Show=function(){this.adjustToPos([-1e3,-1e3]);BX.CWindowFloat.superclass.Show.apply(this,arguments);this.adjustPos()};BX.COpener=function(t){this.PARAMS=t||{};this.MENU=t.MENU||[];this.DIV=t.DIV;this.ATTACH=t.ATTACH||t.DIV;this.ATTACH_MODE=t.ATTACH_MODE||"bottom";this.ACTIVE_CLASS=t.ACTIVE_CLASS||"";this.PUBLIC_FRAME=t.PUBLIC_FRAME||0;this.LEVEL=t.LEVEL||0;this.CLOSE_ON_CLICK=typeof t.CLOSE_ON_CLICK!="undefined"?!!t.CLOSE_ON_CLICK:true;this.ADJUST_ON_CLICK=typeof t.ADJUST_ON_CLICK!="undefined"?!!t.ADJUST_ON_CLICK:true;this.TYPE=this.PARAMS.TYPE=="hover"?"hover":"click";this._openTimeout=null;if(this.PARAMS.TYPE=="hover"&&t.TIMEOUT!==0)this.TIMEOUT=t.TIMEOUT||1e3;else this.TIMEOUT=0;this.bMenuInit=false;if(!!this.PARAMS.MENU_URL){this.bMenuLoaded=false;this.bMenuLoading=false;this.MENU=[{TEXT:BX.message("JS_CORE_LOADING"),CLOSE_ON_CLICK:false}];if(this.PARAMS.MENU_PRELOAD){BX.defer(this.Load,this)()}}BX.ready(BX.defer(this.Init,this))};BX.COpener.prototype.Init=function(){this.DIV=BX(this.DIV);switch(this.TYPE){case"hover":BX.bind(this.DIV,"mouseover",BX.proxy(this.Open,this));BX.bind(this.DIV,"click",BX.proxy(this.Toggle,this));break;case"click":BX.bind(this.DIV,"click",BX.proxy(this.Toggle,this));break}};BX.COpener.prototype.Load=function(){if(this.PARAMS.MENU_URL&&!this.bMenuLoaded){if(!this.bMenuLoading){var t=this.PARAMS.MENU_URL;if(t.indexOf("sessid=")<=0)t+=(t.indexOf("?")>0?"&":"?")+"sessid="+BX.bitrix_sessid();this.bMenuLoading=true;BX.ajax.loadJSON(t,BX.proxy(this.SetMenu,this),BX.proxy(this.LoadFailed,this))}}};BX.COpener.prototype.SetMenu=function(t){this.bMenuLoaded=true;this.bMenuLoading=false;if(this.bMenuInit){this.MENU.setItems(t)}else{this.MENU=t}};BX.COpener.prototype.LoadFailed=function(t,e){this.bMenuLoading=false;this.SetMenu([{TEXT:BX.message("JS_CORE_NO_DATA"),CLOSE_ON_CLICK:true}]);BX.debug(arguments)};BX.COpener.prototype.checkAdminMenu=function(){if(document.documentElement.id=="bx-admin-prefix")return true;return!!BX.findParent(this.DIV,{property:{id:"bx-admin-prefix"}})};BX.COpener.prototype.Toggle=function(t){this.__clear_timeout();if(!this.bMenuInit||!this.MENU.visible()){var e=this.TIMEOUT;this.TIMEOUT=0;this.Open(t);this.TIMEOUT=e}else{this.MENU.Close()}return!!(t||window.event)&&BX.PreventDefault(t)};BX.COpener.prototype.GetMenu=function(){if(!this.bMenuInit){if(BX.type.isArray(this.MENU)){this.MENU=new BX.CMenu({ITEMS:this.MENU,ATTACH_MODE:this.ATTACH_MODE,SET_ID:this.checkAdminMenu()?"bx-admin-prefix":"",CLOSE_ON_CLICK:!!this.CLOSE_ON_CLICK,ADJUST_ON_CLICK:!!this.ADJUST_ON_CLICK,PUBLIC_FRAME:!!this.PUBLIC_FRAME,LEVEL:this.LEVEL,parent:BX(this.DIV),parent_attach:BX(this.ATTACH)});if(this.LEVEL>0){BX.bind(this.MENU.DIV,"mouseover",BX.proxy(this._on_menu_hover,this));BX.bind(this.MENU.DIV,"mouseout",BX.proxy(this._on_menu_hout,this))}}BX.addCustomEvent(this.MENU,"onMenuOpen",BX.proxy(this.handler_onopen,this));BX.addCustomEvent(this.MENU,"onMenuClose",BX.proxy(this.handler_onclose,this));BX.addCustomEvent("onMenuItemHover",BX.proxy(this.handler_onover,this));this.bMenuInit=true}return this.MENU};BX.COpener.prototype.Open=function(){this.GetMenu();this.bOpen=true;this.__clear_timeout();if(this.TIMEOUT>0){BX.bind(this.DIV,"mouseout",BX.proxy(this.__clear_timeout,this));this._openTimeout=setTimeout(BX.proxy(this.__open,this),this.TIMEOUT)}else{this.__open()}if(!!this.PARAMS.MENU_URL&&!this.bMenuLoaded){this._loadTimeout=setTimeout(BX.proxy(this.Load,this),parseInt(this.TIMEOUT/2))}return true};BX.COpener.prototype.__clear_timeout=function(){if(!!this._openTimeout)clearTimeout(this._openTimeout);if(!!this._loadTimeout)clearTimeout(this._loadTimeout);BX.unbind(this.DIV,"mouseout",BX.proxy(this.__clear_timeout,this))};BX.COpener.prototype._on_menu_hover=function(){this.bMenuHover=true;this.__clear_timeout();if(this.ACTIVE_CLASS)BX.addClass(this.DIV,this.ACTIVE_CLASS)};BX.COpener.prototype._on_menu_hout=function(){this.bMenuHover=false};BX.COpener.prototype.handler_onover=function(t,e){if(this.bMenuHover)return;if(e!=this&&t==this.LEVEL-1&&this.ACTIVE_CLASS){BX.removeClass(this.DIV,this.ACTIVE_CLASS)}if(this.bMenuInit&&t<=this.LEVEL-1&&this.MENU.visible()){if(e!=this){this.__clear_timeout();this._openTimeout=setTimeout(BX.proxy(this.Close,this),this.TIMEOUT)}}};BX.COpener.prototype.handler_onopen=function(){this.bOpen=true;if(this.ACTIVE_CLASS)BX.addClass(this.DIV,this.ACTIVE_CLASS);BX.defer((function(){BX.onCustomEvent(this,"onOpenerMenuOpen")}),this)()};BX.COpener.prototype.handler_onclose=function(){this.bOpen=false;BX.onCustomEvent(this,"onOpenerMenuClose");if(this.ACTIVE_CLASS)BX.removeClass(this.DIV,this.ACTIVE_CLASS)};BX.COpener.prototype.Close=function(){if(!this.bMenuInit)return;if(!!this._openTimeout)clearTimeout(this._openTimeout);this.bOpen=false;this.__close()};BX.COpener.prototype.__open=function(){this.__clear_timeout();if(this.bMenuInit&&this.bOpen&&!this.MENU.visible())this.MENU.Show()};BX.COpener.prototype.__close=function(){if(this.bMenuInit&&!this.bOpen&&this.MENU.visible())this.MENU.Hide()};BX.COpener.prototype.__close_immediately=function(){this.bOpen=false;this.__close()};BX.COpener.prototype.isMenuVisible=function(){return null!=this.MENU.visible&&this.MENU.visible()};BX.CMenu=function(t){BX.CMenu.superclass.constructor.apply(this);this.DIV.style.width="auto";this.DIV.style.height="auto";this.PARAMS=t||{};this.PARTS={};this.PARAMS.ATTACH_MODE=this.PARAMS.ATTACH_MODE||"bottom";this.PARAMS.CLOSE_ON_CLICK=typeof this.PARAMS.CLOSE_ON_CLICK=="undefined"?true:this.PARAMS.CLOSE_ON_CLICK;this.PARAMS.ADJUST_ON_CLICK=typeof this.PARAMS.ADJUST_ON_CLICK=="undefined"?true:this.PARAMS.ADJUST_ON_CLICK;this.PARAMS.PUBLIC_FRAME=typeof this.PARAMS.PUBLIC_FRAME=="undefined"?false:this.PARAMS.PUBLIC_FRAME;this.PARAMS.LEVEL=this.PARAMS.LEVEL||0;this.DIV.className="bx-core-popup-menu bx-core-popup-menu-"+this.PARAMS.ATTACH_MODE+" bx-core-popup-menu-level"+this.PARAMS.LEVEL+(typeof this.PARAMS.ADDITIONAL_CLASS!="undefined"?" "+this.PARAMS.ADDITIONAL_CLASS:"");if(!!this.PARAMS.SET_ID)this.DIV.id=this.PARAMS.SET_ID;if(this.PARAMS.LEVEL==0){this.ARROW=this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-core-popup-menu-angle"},style:{left:"15px"}}))}if(!!this.PARAMS.CLASS_NAME)this.DIV.className+=" "+this.PARAMS.CLASS_NAME;BX.bind(this.DIV,"click",BX.eventCancelBubble);this.ITEMS=[];this.setItems(this.PARAMS.ITEMS);BX.addCustomEvent("onMenuOpen",BX.proxy(this._onMenuOpen,this));BX.addCustomEvent("onMenuItemSelected",BX.proxy(this.Hide,this))};BX.extend(BX.CMenu,BX.CWindowFloat);BX.CMenu.broadcastCloseEvent=function(){BX.onCustomEvent("onMenuItemSelected")};BX.CMenu._toggleChecked=function(){BX.toggleClass(this,"bx-core-popup-menu-item-checked")};BX.CMenu._itemDblClick=function(){window.location.href=this.href};BX.CMenu.prototype.toggleArrow=function(t){if(!!this.ARROW){if(typeof t=="undefined"){t=this.ARROW.style.visibility=="hidden"}this.ARROW.style.visibility=!!t?"visible":"hidden"}};BX.CMenu.prototype.visible=function(){return this.DIV.style.display!=="none"};BX.CMenu.prototype._onMenuOpen=function(t,e){if(this.visible()){if(e==this.PARAMS.LEVEL&&t!=this){this.Hide()}}};BX.CMenu.prototype.onUnRegister=function(){if(!this.visible())return;this.Hide()};BX.CMenu.prototype.setItems=function(t){this.PARAMS.ITEMS=t;BX.cleanNode(this.DIV);if(!!this.ARROW)this.DIV.appendChild(this.ARROW);if(this.PARAMS.ITEMS){this.PARAMS.ITEMS=BX.util.array_values(this.PARAMS.ITEMS);var e=false;var i=0;for(var s=0,o=this.PARAMS.ITEMS.length;s<o;s++){if((s==0||s==o-1)&&this.PARAMS.ITEMS[s].SEPARATOR)continue;i++;if(!e)e=!!this.PARAMS.ITEMS[s].GLOBAL_ICON;this.addItem(this.PARAMS.ITEMS[s],s)}if(i===1)BX.addClass(this.DIV,"bx-core-popup-menu-single-item");else BX.removeClass(this.DIV,"bx-core-popup-menu-single-item");if(!e)BX.addClass(this.DIV,"bx-core-popup-menu-no-icons");else BX.removeClass(this.DIV,"bx-core-popup-menu-no-icons")}};BX.CMenu.prototype.addItem=function(t){this.ITEMS.push(t);if(t.SEPARATOR){t.NODE=BX.create("DIV",{props:{className:"bx-core-popup-menu-separator"}})}else{var e=!!t.MENU&&(BX.type.isArray(t.MENU)&&t.MENU.length>0||t.MENU instanceof BX.CMenu)||!!t.MENU_URL;if(t.DISABLED){t.CLOSE_ON_CLICK=false;t.LINK=null;t.ONCLICK=null;t.ACTION=null}var i={};if(!!t.LINK||BX.browser.IsIE()&&!BX.browser.IsDoctype()){i.href=t.LINK||"javascript:void(0)"}if(this.PARAMS.PUBLIC_FRAME){i.target="_top"}t.NODE=BX.create(!!t.LINK||BX.browser.IsIE()&&!BX.browser.IsDoctype()?"A":"SPAN",{props:{className:"bx-core-popup-menu-item"+(e?" bx-core-popup-menu-item-opener":"")+(!!t.DEFAULT?" bx-core-popup-menu-item-default":"")+(!!t.DISABLED?" bx-core-popup-menu-item-disabled":"")+(!!t.CHECKED?" bx-core-popup-menu-item-checked":""),title:!!BX.message["MENU_ENABLE_TOOLTIP"]||!!t.SHOW_TITLE?t.TITLE||"":"",BXMENULEVEL:this.PARAMS.LEVEL},attrs:i,events:{mouseover:function(){BX.onCustomEvent("onMenuItemHover",[this.BXMENULEVEL,this.OPENER])}},html:'<span class="bx-core-popup-menu-item-icon'+(t.GLOBAL_ICON?" "+t.GLOBAL_ICON:"")+'"></span><span class="bx-core-popup-menu-item-text">'+(t.HTML||(t.TEXT?BX.util.htmlspecialchars(t.TEXT):""))+"</span>"});if(e&&!t.DISABLED){t.NODE.OPENER=new BX.COpener({DIV:t.NODE,ACTIVE_CLASS:"bx-core-popup-menu-item-opened",TYPE:"hover",MENU:t.MENU,MENU_URL:t.MENU_URL,MENU_PRELOAD:!!t.MENU_PRELOAD,LEVEL:this.PARAMS.LEVEL+1,ATTACH_MODE:"right",TIMEOUT:500})}else if(this.PARAMS.CLOSE_ON_CLICK&&(typeof t.CLOSE_ON_CLICK=="undefined"||!!t.CLOSE_ON_CLICK)){BX.bind(t.NODE,"click",BX.CMenu.broadcastCloseEvent)}else if(this.PARAMS.ADJUST_ON_CLICK&&(typeof t.ADJUST_ON_CLICK=="undefined"||!!t.ADJUST_ON_CLICK)){BX.bind(t.NODE,"click",BX.defer(this.adjustPos,this))}if(e&&!!t.LINK){BX.bind(t.NODE,"dblclick",BX.CMenu._itemDblClick)}if(typeof t.CHECKED!="undefined"){BX.bind(t.NODE,"click",BX.CMenu._toggleChecked)}t.ONCLICK=t.ACTION||t.ONCLICK;if(!!t.ONCLICK){if(BX.type.isString(t.ONCLICK)){t.ONCLICK=new Function("event",t.ONCLICK)}BX.bind(t.NODE,"click",t.ONCLICK)}}this.DIV.appendChild(t.NODE)};BX.CMenu.prototype._documentClickBind=function(){this._documentClickUnBind();BX.bind(document,"click",BX.proxy(this._documentClick,this))};BX.CMenu.prototype._documentClickUnBind=function(){BX.unbind(document,"click",BX.proxy(this._documentClick,this))};BX.CMenu.prototype._documentClick=function(t){t=t||window.event;if(!!t&&!(BX.getEventButton(t)&BX.MSLEFT))return;this.Close()};BX.CMenu.prototype.Show=function(){BX.onCustomEvent(this,"onMenuOpen",[this,this.PARAMS.LEVEL]);BX.CMenu.superclass.Show.apply(this,[]);this.bCloseEventFired=false;BX.addCustomEvent(this.PARAMS.parent_attach,"onChangeNodePosition",BX.proxy(this.adjustToNode,this));BX.defer(this._documentClickBind,this)()};BX.CMenu.prototype.Close=BX.CMenu.prototype.Hide=function(){if(!this.visible())return;BX.removeCustomEvent(this.PARAMS.parent_attach,"onChangeNodePosition",BX.proxy(this.adjustToNode,this));this._documentClickUnBind();if(!this.bCloseEventFired){BX.onCustomEvent(this,"onMenuClose",[this,this.PARAMS.LEVEL]);this.bCloseEventFired=true}BX.CMenu.superclass.Hide.apply(this,arguments)};BX.CMenu.prototype.__adjustMenuToNode=function(){var t=BX.pos(this.PARAMS.parent_attach),e=!!BX.findParent(this.PARAMS.parent_attach,BX.is_fixed);if(e)this.DIV.style.position="fixed";else this.DIV.style.position="absolute";if(!t.top){this.DIV.style.top="-1000px";this.DIV.style.left="-1000px"}if(this.bTimeoutSet)return;var i=this.DIV.offsetWidth,s=this.DIV.offsetHeight;if(!i){setTimeout(BX.delegate((function(){this.bTimeoutSet=false;this.__adjustMenuToNode()}),this),100);this.bTimeoutSet=true;return}var o={},n=BX.GetWindowSize();switch(this.PARAMS.ATTACH_MODE){case"bottom":o.top=t.bottom+9;o.left=t.left;var r=0;if(!!this.ARROW){if(t.width>i)r=parseInt(i/2-7);else r=parseInt(Math.min(i,t.width)/2-7);if(r<7){o.left-=15;r+=15}}if(o.left>n.scrollWidth-i-10){var h=o.left;o.left=n.scrollWidth-i-10;if(!!this.ARROW)r+=h-o.left}if(e){o.left-=n.scrollLeft}if(!!this.ARROW)this.ARROW.style.left=r+"px";break;case"right":o.top=t.top-1;o.left=t.right;if(o.left>n.scrollWidth-i-10){o.left=t.left-i-1}break}if(e){o.top-=n.scrollTop}if(!!this.ARROW)this.ARROW.className="bx-core-popup-menu-angle";if(o.top+s>n.scrollTop+n.innerHeight||o.top+s>n.scrollHeight){var a=this.PARAMS.ATTACH_MODE=="bottom"?t.top-s-9:t.bottom-s+1;if(a>n.scrollTop||o.top+s>n.scrollHeight){if(o.top+s>n.scrollHeight){o.top=Math.max(0,n.scrollHeight-s);this.toggleArrow(false)}else{o.top=a;if(!!this.ARROW)this.ARROW.className="bx-core-popup-menu-angle-bottom"}}}if(o.top+o.left==0){this.Hide()}else{this.DIV.style.top=o.top+"px";this.DIV.style.left=o.left+"px"}};BX.CMenu.prototype.adjustToNode=function(t){this.PARAMS.parent_attach=BX(t)||this.PARAMS.parent_attach||this.PARAMS.parent;this.__adjustMenuToNode()};BX.CMenuOpener=function(t){BX.CMenuOpener.superclass.constructor.apply(this);this.PARAMS=t||{};this.setParent(this.PARAMS.parent);this.PARTS={};this.SETTINGS.drag_restrict=true;this.defaultAction=null;this.timeout=500;this.DIV.className="bx-component-opener";this.DIV.ondblclick=BX.PreventDefault;if(this.PARAMS.component_id){this.PARAMS.transform=!!this.PARAMS.transform}this.OPENERS=[];this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar"+(this.PARAMS.transform?" bx-context-toolbar-vertical-mode":"")}}));this.PARTS.INNER=this.DIV.firstChild.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-inner"},html:'<span class="bx-context-toolbar-drag-icon"></span><span class="bx-context-toolbar-vertical-line"></span><br>'}));this.EXTRA_BUTTONS={};var e=0;for(var i=0,s=this.PARAMS.menu.length;i<s;i++){var o=this.addItem(this.PARAMS.menu[i]);if(null!=o){e++;this.PARTS.INNER.appendChild(o);this.PARTS.INNER.appendChild(BX.create("BR"))}}var n=e>0;this.PARTS.ICONS=this.PARTS.INNER.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-icons"}}));if(this.PARAMS.component_id){this.PARAMS.pin=!!this.PARAMS.pin;if(n)this.PARTS.ICONS.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-separator"}}));this.PARTS.ICON_PIN=this.PARTS.ICONS.appendChild(BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:this.PARAMS.pin?"bx-context-toolbar-pin-fixed":"bx-context-toolbar-pin"},events:{click:BX.delegate(this.__pin_btn_clicked,this)}}))}if(this.EXTRA_BUTTONS["components2_props"]){var r=this.EXTRA_BUTTONS["components2_props"]||{URL:"javascript:void(0)"};if(null==this.defaultAction){this.defaultAction=r.ONCLICK;this.defaultActionTitle=r.TITLE||r.TEXT}r.URL="javascript:"+BX.util.urlencode(r.ONCLICK);this.ATTACH=this.PARTS.ICONS.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button bx-context-toolbar-button-settings"},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-inner"},children:[BX.create("A",{attrs:{href:r.URL},events:{mouseover:BX.proxy(this.__msover_text,this),mouseout:BX.proxy(this.__msout_text,this),mousedown:BX.proxy(this.__msdown_text,this)},html:'<span class="bx-context-toolbar-button-icon bx-context-toolbar-settings-icon"></span>'}),BX.create("A",{attrs:{href:"javascript: void(0)"},props:{className:"bx-context-toolbar-button-arrow"},events:{mouseover:BX.proxy(this.__msover_arrow,this),mouseout:BX.proxy(this.__msout_arrow,this),mousedown:BX.proxy(this.__msdown_arrow,this)},html:'<span class="bx-context-toolbar-button-arrow"></span>'})]})]}));this.OPENER=this.ATTACH.firstChild.lastChild;var h=this.attachMenu(this.EXTRA_BUTTONS["components2_submenu"]["MENU"]);BX.addCustomEvent(h,"onOpenerMenuOpen",BX.proxy(this.__menu_open,this));BX.addCustomEvent(h,"onOpenerMenuClose",BX.proxy(this.__menu_close,this))}if(e>1){this.PARTS.ICONS.appendChild(BX.create("span",{props:{className:"bx-context-toolbar-separator bx-context-toolbar-separator-switcher"}}));this.ICON_TRANSFORM=this.PARTS.ICONS.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},props:{className:"bx-context-toolbar-switcher"},events:{click:BX.delegate(this.__trf_btn_clicked,this)}}))}if(this.PARAMS.HINT){this.DIV.BXHINT=this.HINT=new BX.CHint({parent:this.DIV,hint:this.PARAMS.HINT.TEXT||"",title:this.PARAMS.HINT.TITLE||"",hide_timeout:this.timeout/2,preventHide:false})}BX.addCustomEvent(this,"onWindowDragFinished",BX.delegate(this.__onMoveFinished,this));BX.addCustomEvent("onDynamicModeChange",BX.delegate(this.__onDynamicModeChange,this));BX.addCustomEvent("onTopPanelCollapse",BX.delegate(this.__onPanelCollapse,this));BX.addCustomEvent("onMenuOpenerMoved",BX.delegate(this.checkPosition,this));BX.addCustomEvent("onMenuOpenerUnhide",BX.delegate(this.checkPosition,this));BX.Event.EventEmitter.incrementMaxListeners("onDynamicModeChange");BX.Event.EventEmitter.incrementMaxListeners("onTopPanelCollapse");BX.Event.EventEmitter.incrementMaxListeners("onMenuOpenerMoved");BX.Event.EventEmitter.incrementMaxListeners("onMenuOpenerUnhide");if(this.OPENERS){for(i=0,s=this.OPENERS.length;i<s;i++){BX.addCustomEvent(this.OPENERS[i],"onOpenerMenuOpen",BX.proxy(this.__hide_hint,this))}}};BX.extend(BX.CMenuOpener,BX.CWindowFloat);BX.CMenuOpener.prototype.setParent=function(t){t=BX(t);if(!t){return}if(t.OPENER&&t.OPENER!=this){t.OPENER.Close();t.OPENER.clearHoverHoutEvents()}if(this.PARAMS.parent&&this.PARAMS.parent!=t){this.clearHoverHoutEvents();this.PARAMS.parent.OPENER=null}this.PARAMS.parent=t;this.PARAMS.parent.OPENER=this};BX.CMenuOpener.prototype.setHoverHoutEvents=function(t,e){if(!this.__opener_events_set){BX.bind(this.Get(),"mouseover",t);BX.bind(this.Get(),"mouseout",e);this.__opener_events_set=true}};BX.CMenuOpener.prototype.clearHoverHoutEvents=function(){if(this.Get()){BX.unbindAll(this.Get());this.__opener_events_set=false}};BX.CMenuOpener.prototype.unclosable=true;BX.CMenuOpener.prototype.__check_intersection=function(t,e){return!(e.right<=t.left||e.left>=t.right||e.bottom<=t.top||e.top>=t.bottom)};BX.CMenuOpener.prototype.__msover_text=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-text-hover")};BX.CMenuOpener.prototype.__msout_text=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.ATTACH,"bx-context-toolbar-button-text-hover bx-context-toolbar-button-text-active")};BX.CMenuOpener.prototype.__msover_arrow=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-arrow-hover")};BX.CMenuOpener.prototype.__msout_arrow=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.ATTACH,"bx-context-toolbar-button-arrow-hover bx-context-toolbar-button-arrow-active")};BX.CMenuOpener.prototype.__msdown_text=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-text-active")};BX.CMenuOpener.prototype.__msdown_arrow=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-arrow-active")};BX.CMenuOpener.prototype.__menu_close=function(){this._menu_open=false;this.bx_active=false;BX.removeClass(this.ATTACH,"bx-context-toolbar-button-active bx-context-toolbar-button-text-active bx-context-toolbar-button-arrow-active");if(!this.bx_hover){BX.removeClass(this.ATTACH,"bx-context-toolbar-button-hover bx-context-toolbar-button-text-hover bx-context-toolbar-button-arrow-hover");this.bx_hover=false}};BX.CMenuOpener.prototype.__menu_open=function(){this._menu_open=true};BX.CMenuOpener.prototype.checkPosition=function(){if(this.isMenuVisible()||this.DIV.style.display=="none"||this==BX.proxy_context||BX.proxy_context.zIndex>this.zIndex)return;this.correctPosition(BX.proxy_context)};BX.CMenuOpener.prototype.correctPosition=function(t){var e=BX.pos(this.DIV),i=BX.pos(t.Get());if(this.__check_intersection(e,i)){var s=i.top-e.height;if(s<0)s=i.bottom;this.DIV.style.top=s+"px";BX.addCustomEvent(t,"onMenuOpenerHide",BX.proxy(this.restorePosition,this));BX.onCustomEvent(this,"onMenuOpenerMoved")}};BX.CMenuOpener.prototype.restorePosition=function(){if(!this.MOUSEOVER&&!this.isMenuVisible()){if(this.originalPos)this.DIV.style.top=this.originalPos.top+"px";BX.removeCustomEvent(BX.proxy_context,"onMenuOpenerHide",BX.proxy(this.restorePosition,this));if(this.restore_pos_timeout)clearTimeout(this.restore_pos_timeout)}else{this.restore_pos_timeout=setTimeout(BX.proxy(this.restorePosition,this),this.timeout)}};BX.CMenuOpener.prototype.Show=function(){BX.CMenuOpener.superclass.Show.apply(this,arguments);this.SetDraggable(this.PARTS.INNER.firstChild);this.DIV.style.width="auto";this.DIV.style.height="auto";if(!this.PARAMS.pin){this.DIV.style.left="-1000px";this.DIV.style.top="-1000px";this.Hide()}else{this.bPosAdjusted=true;this.bMoved=true;if(this.PARAMS.top)this.DIV.style.top=this.PARAMS.top+"px";if(this.PARAMS.left)this.DIV.style.left=this.PARAMS.left+"px";this.DIV.style.display=!BX.admin.dynamic_mode||BX.admin.dynamic_mode_show_borders?"block":"none";if(this.DIV.style.display=="block"){setTimeout(BX.delegate((function(){BX.onCustomEvent(this,"onMenuOpenerUnhide")}),this),50)}}};BX.CMenuOpener.prototype.executeDefaultAction=function(){if(this.defaultAction){if(BX.type.isFunction(this.defaultAction))this.defaultAction();else if(BX.type.isString(this.defaultAction))BX.evalGlobal(this.defaultAction)}};BX.CMenuOpener.prototype.__onDynamicModeChange=function(t){this.DIV.style.display=t?"block":"none"};BX.CMenuOpener.prototype.__onPanelCollapse=function(t,e){this.DIV.style.top=parseInt(this.DIV.style.top)+e+"px";if(this.PARAMS.pin){this.__savePosition()}};BX.CMenuOpener.prototype.__onMoveFinished=function(){BX.onCustomEvent(this,"onMenuOpenerMoved");this.bMoved=true;if(this.PARAMS.pin)this.__savePosition()};BX.CMenuOpener.prototype.__savePosition=function(){var t={};t.pin=this.PARAMS.pin;if(!this.PARAMS.pin){t.top=false;t.left=false;t.transform=false}else{t.transform=this.PARAMS.transform;if(this.bMoved){t.left=parseInt(this.DIV.style.left);t.top=parseInt(this.DIV.style.top)}}BX.WindowManager.saveWindowOptions(this.PARAMS.component_id,t)};BX.CMenuOpener.prototype.__pin_btn_clicked=function(){this.Pin()};BX.CMenuOpener.prototype.Pin=function(t){if(null==t)this.PARAMS.pin=!this.PARAMS.pin;else this.PARAMS.pin=!!t;this.PARTS.ICON_PIN.className=this.PARAMS.pin?"bx-context-toolbar-pin-fixed":"bx-context-toolbar-pin";this.__savePosition()};BX.CMenuOpener.prototype.__trf_btn_clicked=function(){this.Transform()};BX.CMenuOpener.prototype.Transform=function(t){var e={};if(null==t)this.PARAMS.transform=!this.PARAMS.transform;else this.PARAMS.transform=!!t;if(this.bMoved){e=BX.pos(this.DIV)}if(this.PARAMS.transform)BX.addClass(this.DIV.firstChild,"bx-context-toolbar-vertical-mode");else BX.removeClass(this.DIV.firstChild,"bx-context-toolbar-vertical-mode");if(!this.bMoved){this.adjustPos()}else{this.DIV.style.left=e.right-this.DIV.offsetWidth-(BX.browser.IsIE()&&!BX.browser.IsDoctype()?2:0)+"px"}this.__savePosition()};BX.CMenuOpener.prototype.adjustToNodeGetPos=function(){var t=BX.pos(this.PARAMS.parent);var e=BX.GetWindowScrollSize();var i=this.DIV.offsetWidth;t.left-=BX.admin.__border_dx;t.top-=BX.admin.__border_dx;if(true||!this.PARAMS.transform){t.top-=45}if(t.left>e.scrollWidth-i){t.left=e.scrollWidth-i}return t};BX.CMenuOpener.prototype.addItem=function(t){if(t.TYPE){this.EXTRA_BUTTONS[t.TYPE]=t;return null}else{var e=new BX.CMenuOpenerItem(t);if(null==this.defaultAction){if(e.item.ONCLICK){this.defaultAction=t.ONCLICK}else if(e.item.MENU){this.defaultAction=BX.delegate((function(){this.Open()}),e.item.OPENER)}this.defaultActionTitle=t.TITLE||t.TEXT;BX.addClass(e.Get(),"bx-content-toolbar-default")}if(e.item.OPENER)this.OPENERS[this.OPENERS.length]=e.item.OPENER;return e.Get()}};BX.CMenuOpener.prototype.attachMenu=function(t){var e=new BX.COpener({DIV:this.OPENER,ATTACH:this.ATTACH,MENU:t,TYPE:"click"});this.OPENERS[this.OPENERS.length]=e;return e};BX.CMenuOpener.prototype.__hide_hint=function(){if(this.HINT)this.HINT.__hide_immediately()};BX.CMenuOpener.prototype.isMenuVisible=function(){for(var t=0,e=this.OPENERS.length;t<e;t++){if(this.OPENERS[t].isMenuVisible())return true}return false};BX.CMenuOpener.prototype.Hide=function(){if(!this.PARAMS.pin){this.DIV.style.display="none";BX.onCustomEvent(this,"onMenuOpenerHide")}};BX.CMenuOpener.prototype.UnHide=function(){this.DIV.style.display="block";if(!this.bPosAdjusted&&!this.PARAMS.pin){this.adjustPos();this.bPosAdjusted=true}if(null==this.originalPos&&!this.bMoved){this.originalPos=BX.pos(this.DIV)}BX.onCustomEvent(this,"onMenuOpenerUnhide")};BX.CMenuOpenerItem=function(t){this.item=t;if(this.item.ACTION&&!this.item.ONCLICK){this.item.ONCLICK=this.item.ACTION}this.DIV=BX.create("SPAN");this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button-underlay"}}));this.WRAPPER=this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button-wrapper"},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button",title:t.TITLE},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-inner"}})]})]}));var e=BX.create("SPAN",{props:{className:"bx-context-toolbar-button-icon"+(this.item.ICON||this.item.ICONCLASS?" "+(this.item.ICON||this.item.ICONCLASS):"")},attrs:!(this.item.ICON||this.item.ICONCLASS)&&(this.item.SRC||this.item.IMAGE)?{style:"background: scroll transparent url("+(this.item.SRC||this.item.IMAGE)+") no-repeat center center !important;"}:{}}),i=BX.create("SPAN",{props:{className:"bx-context-toolbar-button-text"},text:this.item.TEXT});if(this.item.ACTION&&!this.item.ONCLICK){this.item.ONCLICK=this.item.ACTION}this.bHasMenu=!!this.item.MENU;this.bHasAction=!!this.item.ONCLICK;if(this.bHasAction){this.LINK=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},events:{mouseover:this.bHasMenu?BX.proxy(this.__msover_text,this):BX.proxy(this.__msover,this),mouseout:this.bHasMenu?BX.proxy(this.__msout_text,this):BX.proxy(this.__msout,this),mousedown:this.bHasMenu?BX.proxy(this.__msdown_text,this):BX.proxy(this.__msdown,this)},children:[e,i]}));if(this.bHasMenu){this.LINK_MENU=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{props:{className:"bx-context-toolbar-button-arrow"},attrs:{href:"javascript: void(0)"},events:{mouseover:BX.proxy(this.__msover_arrow,this),mouseout:BX.proxy(this.__msout_arrow,this),mousedown:BX.proxy(this.__msdown_arrow,this)},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-arrow"}})]}))}}else if(this.bHasMenu){this.item.ONCLICK=null;this.LINK=this.LINK_MENU=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},events:{mouseover:BX.proxy(this.__msover,this),mouseout:BX.proxy(this.__msout,this),mousedown:BX.proxy(this.__msdown,this)},children:[e,i]}));this.LINK.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-single-button-arrow"}}))}if(this.bHasMenu){this.item.SUBMENU=new BX.CMenu({ATTACH_MODE:"bottom",ITEMS:this.item["MENU"],parent:this.LINK_MENU,parent_attach:this.WRAPPER.firstChild});this.item.OPENER=new BX.COpener({DIV:this.LINK_MENU,TYPE:"click",MENU:this.item.SUBMENU});BX.addCustomEvent(this.item.OPENER,"onOpenerMenuOpen",BX.proxy(this.__menu_open,this));BX.addCustomEvent(this.item.OPENER,"onOpenerMenuClose",BX.proxy(this.__menu_close,this))}if(this.bHasAction){BX.bind(this.LINK,"click",BX.delegate(this.__click,this))}};BX.CMenuOpenerItem.prototype.Get=function(){return this.DIV};BX.CMenuOpenerItem.prototype.__msover=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover")};BX.CMenuOpenerItem.prototype.__msout=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover bx-context-toolbar-button-active")};BX.CMenuOpenerItem.prototype.__msover_text=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-hover")};BX.CMenuOpenerItem.prototype.__msout_text=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-hover bx-context-toolbar-button-text-active")};BX.CMenuOpenerItem.prototype.__msover_arrow=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-hover")};BX.CMenuOpenerItem.prototype.__msout_arrow=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-hover bx-context-toolbar-button-arrow-active")};BX.CMenuOpenerItem.prototype.__msdown=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-active")};BX.CMenuOpenerItem.prototype.__msdown_text=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-active")};BX.CMenuOpenerItem.prototype.__msdown_arrow=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-active")};BX.CMenuOpenerItem.prototype.__menu_close=function(){this._menu_open=false;this.bx_active=false;BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-active bx-context-toolbar-button-text-active bx-context-toolbar-button-arrow-active");if(!this.bx_hover){BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover bx-context-toolbar-button-text-hover bx-context-toolbar-button-arrow-hover");this.bx_hover=false}};BX.CMenuOpenerItem.prototype.__menu_open=function(){this._menu_open=true};BX.CMenuOpenerItem.prototype.__click=function(){BX.evalGlobal(this.item.ONCLICK)};BX.CPageOpener=function(t){BX.CPageOpener.superclass.constructor.apply(this,arguments);this.timeout=505;window.PAGE_EDIT_CONTROL=this};BX.extend(BX.CPageOpener,BX.CMenuOpener);BX.CPageOpener.prototype.checkPosition=function(){if(this==BX.proxy_context)return;this.correctPosition(BX.proxy_context)};BX.CPageOpener.prototype.correctPosition=function(t){if(this.bPosCorrected)return;var e;if(this.DIV.style.display=="none"){e=this.adjustToNodeGetPos();e.bottom=e.top+30;e.right=e.left+300}else{e=BX.pos(this.DIV)}var i=BX.pos(t.Get());if(this.__check_intersection(e,i)){this.DIV.style.display="none";var s=BX.proxy(this.restorePosition,this);BX.removeCustomEvent(t,"onMenuOpenerHide",s);BX.addCustomEvent(t,"onMenuOpenerHide",s);this.bPosCorrected=true}};BX.CPageOpener.prototype.restorePosition=function(){if(BX.proxy_context&&BX.proxy_context.Get().style.display=="none"){this.bPosCorrected=false;if(this.PARAMS.parent.bx_over||this.PARAMS.pin)this.UnHide();BX.removeCustomEvent("onMenuOpenerHide",BX.proxy(this.restorePosition,this))}};BX.CPageOpener.prototype.UnHide=function(){if(!this.bPosCorrected)BX.CPageOpener.superclass.UnHide.apply(this,arguments)};BX.CPageOpener.prototype.Remove=function(){BX.admin.removeComponentBorder(this.PARAMS.parent);BX.userOptions.save("global","settings","page_edit_control_enable","N");this.DIV.style.display="none"};BX.CHintSimple=function(){BX.CHintSimple.superclass.constructor.apply(this,arguments)};BX.extend(BX.CHintSimple,BX.CHint);BX.CHintSimple.prototype.Init=function(){this.DIV=document.body.appendChild(BX.create("DIV",{props:{className:"bx-tooltip-simple"},style:{display:"none"},children:[this.CONTENT=BX.create("DIV")]}));BX.ZIndexManager.register(this.DIV);if(this.HINT_TITLE)this.CONTENT.appendChild(BX.create("B",{text:this.HINT_TITLE}));if(this.HINT)this.CONTENT_TEXT=this.CONTENT.appendChild(BX.create("DIV")).appendChild(BX.create("SPAN",{html:this.HINT}));if(this.PARAMS.preventHide){BX.bind(this.DIV,"mouseout",BX.proxy(this.Hide,this));BX.bind(this.DIV,"mouseover",BX.proxy(this.Show,this))}this.bInited=true};BX.adminInformer={itemsShow:3,Init:function(t){if(t)BX.adminInformer.itemsShow=t;var e=BX("admin-informer");if(e){document.body.appendChild(e);BX.ZIndexManager.register(e)}BX.addCustomEvent("onTopPanelCollapse",BX.proxy(BX.adminInformer.Close,BX.adminInformer))},Toggle:function(t){var e=BX("admin-informer");if(!e)return false;var i=BX.pos(t);e.style.top=parseInt(i.top)+parseInt(i.height)+7+"px";e.style.left=i.left+"px";if(!BX.hasClass(e,"adm-informer-active"))BX.adminInformer.Show(e);else BX.adminInformer.Hide(e);return false},Close:function(){BX.adminInformer.Hide(BX("admin-informer"))},OnInnerClick:function(t){var e=t.target||t.srcElement;if(e.nodeName.toLowerCase()!="a"||BX.hasClass(e,"adm-informer-footer")){return BX.PreventDefault(t)}return true},ToggleExtra:function(){var t=BX("adm-informer-footer");if(BX.hasClass(t,"adm-informer-footer-collapsed"))this.ShowAll();else this.HideExtra();return false},ShowAll:function(){var t=BX("admin-informer");for(var e=0;e<t.children.length;e++)if(BX.hasClass(t.children[e],"adm-informer-item")&&t.children[e].style.display=="none"){t.children[e].style.display="block"}var i=BX("adm-informer-footer");if(i.textContent!==undefined)i.textContent=BX.message("JSADM_AI_HIDE_EXTRA");else i.innerText=BX.message("JSADM_AI_HIDE_EXTRA");BX.removeClass(i,"adm-informer-footer-collapsed");return false},HideExtra:function(){var t=BX("admin-informer");var e=0;for(var i=BX.adminInformer.itemsShow+1;i<t.children.length;i++){if(BX.hasClass(t.children[i],"adm-informer-item")&&t.children[i].style.display=="block"){t.children[i].style.display="none";e++}}var s=BX("adm-informer-footer");var o=BX.message("JSADM_AI_ALL_NOTIF")+" ("+(BX.adminInformer.itemsShow+parseInt(e))+")";if(s.textContent!==undefined)s.textContent=o;else s.innerText=o;BX.addClass(s,"adm-informer-footer-collapsed");return false},Show:function(t){var e=BX("adm-header-notif-block");if(e)BX.addClass(e,"adm-header-notif-block-active");BX.onCustomEvent(t,"onBeforeAdminInformerShow");setTimeout(BX.proxy((function(){BX.bind(document,"click",BX.proxy(BX.adminInformer.Close,BX.adminInformer))}),BX.adminInformer),0);BX.addClass(t,"adm-informer-active");BX.ZIndexManager.bringToFront(t);setTimeout((function(){BX.addClass(t,"adm-informer-animate")}),0)},Hide:function(t){var e=BX("adm-header-notif-block");if(e)BX.removeClass(e,"adm-header-notif-block-active");BX.unbind(document,"click",BX.proxy(BX.adminInformer.Close,BX.adminInformer));BX.removeClass(t,"adm-informer-animate");if(this.IsAnimationSupported())setTimeout((function(){BX.removeClass(t,"adm-informer-active")}),300);else BX.removeClass(t,"adm-informer-active");BX.onCustomEvent(t,"onAdminInformerHide")},IsAnimationSupported:function(){var t=document.body||document.documentElement;if(typeof t.style.transition=="string")return true;else if(typeof t.style.MozTransition=="string")return true;else if(typeof t.style.OTransition=="string")return true;else if(typeof t.style.WebkitTransition=="string")return true;else if(typeof t.style.msTransition=="string")return true;return false},SetItemHtml:function(t,e){var i=BX("adm-informer-item-html-"+t);if(!i)return false;i.innerHTML=e;return true},SetItemFooter:function(t,e){var i=BX("adm-informer-item-footer-"+t);if(!i)return false;i.innerHTML=e;if(e)i.style.display="block";else i.style.display="none";return true}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:41:"/bitrix/js/main/dd.min.js?169885378811114";s:6:"source";s:21:"/bitrix/js/main/dd.js";s:3:"min";s:25:"/bitrix/js/main/dd.min.js";s:3:"map";s:25:"/bitrix/js/main/dd.map.js";}"*/
(function(){if(window.jsDD)return;jsDD={arObjects:[],arDestinations:[],arDestinationsPriority:[],arContainers:[],arContainersPos:[],current_dest_index:false,current_node:null,wndSize:null,bStarted:false,bDisable:false,bDisableDestRefresh:false,bEscPressed:false,bScrollWindow:false,scrollViewTimer:null,scrollViewConfig:{checkerTimeout:30,scrollZone:25,scrollBy:25,scrollContainer:null,bScrollH:true,bScrollV:true,pos:null},setScrollWindow:function(s){jsDD.bScrollWindow=!!s;if(BX.type.isDomNode(s)){jsDD.scrollViewConfig.scrollContainer=s;jsDD.scrollViewConfig.pos=BX.pos(s);var e=BX.style(s,"overflow")||"visible",D=BX.style(s,"overflow-x")||"visible",r=BX.style(s,"overflow-y")||"visible";jsDD.scrollViewConfig.bScrollH=e!="visible"||D!="visible";jsDD.scrollViewConfig.bScrollV=e!="visible"||r!="visible"}},Reset:function(){jsDD.arObjects=[];jsDD.arDestinations=[];jsDD.arDestinationsPriority=[];jsDD.bStarted=false;jsDD.current_node=null;jsDD.current_dest_index=false;jsDD.bDisableDestRefresh=false;jsDD.bDisable=false;jsDD.x=null;jsDD.y=null;jsDD.start_x=null;jsDD.start_y=null;jsDD.wndSize=null;jsDD.bEscPressed=false;clearInterval(jsDD.scrollViewTimer);jsDD.bScrollWindow=false;jsDD.scrollViewTimer=null;jsDD.scrollViewConfig.scrollContainer=null},registerObject:function(s){BX.bind(s,"mousedown",jsDD.startDrag);BX.Event.bind(s,"touchstart",jsDD.startDrag,{passive:true});s.__bxddid=jsDD.arObjects.length;jsDD.arObjects[s.__bxddid]=s},unregisterObject:function(s){if(typeof s["__bxddid"]==="undefined"){return}delete jsDD.arObjects[s.__bxddid];delete s.__bxddid;BX.unbind(s,"mousedown",jsDD.startDrag);BX.unbind(s,"touchstart",jsDD.startDrag)},registerDest:function(s,e){if(!e)e=100;s.__bxddeid=jsDD.arDestinations.length;s.__bxddpriority=e;jsDD.arDestinations[s.__bxddeid]=s;if(!jsDD.arDestinationsPriority[e])jsDD.arDestinationsPriority[e]=[s.__bxddeid];else jsDD.arDestinationsPriority[e].push(s.__bxddeid);jsDD.refreshDestArea(s.__bxddeid)},unregisterDest:function(s){if(typeof s["__bxddeid"]==="undefined"){return}delete jsDD.arDestinations[s.__bxddeid];delete s.__bxddeid;delete s.__bxddpriority;jsDD.refreshDestArea()},disableDest:function(s){if(typeof s.__bxddeid!=="undefined"){s.__bxdddisabled=true}},enableDest:function(s){if(typeof s.__bxddeid!=="undefined"){s.__bxdddisabled=false}},registerContainer:function(s){jsDD.arContainers[jsDD.arContainers.length]=s},getContainersScrollPos:function(s,e){var D={left:0,top:0};for(var r=0,n=jsDD.arContainers.length;r<n;r++){if(jsDD.arContainers[r]&&s>=jsDD.arContainersPos[r]["left"]&&s<=jsDD.arContainersPos[r]["right"]&&e>=jsDD.arContainersPos[r]["top"]&&e<=jsDD.arContainersPos[r]["bottom"]){D.left=jsDD.arContainers[r].scrollLeft;D.top=jsDD.arContainers[r].scrollTop}}return D},setContainersPos:function(){for(var s=0,e=jsDD.arContainers.length;s<e;s++){if(jsDD.arContainers[s])jsDD.arContainersPos[s]=BX.pos(jsDD.arContainers[s])}},refreshDestArea:function(s){if(s&&typeof s=="object"&&typeof s.__bxddeid!="undefined"){s=s.__bxddeid}if(typeof s=="undefined"){for(var e=0,D=jsDD.arDestinations.length;e<D;e++){jsDD.refreshDestArea(e)}}else{if(null==jsDD.arDestinations[s])return;var r=BX.pos(jsDD.arDestinations[s]);jsDD.arDestinations[s].__bxpos=[r.left,r.top,r.right,r.bottom]}},_checkEsc:function(s){s=s||window.event;if(jsDD.bStarted&&s.keyCode==27){jsDD.stopCurrentDrag()}},stopCurrentDrag:function(){if(jsDD.bStarted){jsDD.bEscPressed=true;jsDD.stopDrag()}},_onscroll:function(){jsDD.wndSize=BX.GetWindowSize()},_checkScroll:function(){if(jsDD.bScrollWindow){var s={clientX:jsDD.x-jsDD.wndSize.scrollLeft,clientY:jsDD.y-jsDD.wndSize.scrollTop},e=false,D=jsDD.scrollViewConfig.scrollZone;if(s.clientY<D&&jsDD.wndSize.scrollTop>0){window.scrollBy(0,-jsDD.scrollViewConfig.scrollBy);e=true}if(s.clientY>jsDD.wndSize.innerHeight-D&&jsDD.wndSize.scrollTop<jsDD.wndSize.scrollHeight-jsDD.wndSize.innerHeight){window.scrollBy(0,jsDD.scrollViewConfig.scrollBy);e=true}if(s.clientX<D&&jsDD.wndSize.scrollLeft>0){window.scrollBy(-jsDD.scrollViewConfig.scrollBy,0);e=true}if(s.clientX>jsDD.wndSize.innerWidth-D&&jsDD.wndSize.scrollLeft<jsDD.wndSize.scrollWidth-jsDD.wndSize.innerWidth){window.scrollBy(jsDD.scrollViewConfig.scrollBy,0);e=true}if(jsDD.scrollViewConfig.scrollContainer){var r=jsDD.scrollViewConfig.scrollContainer;if(jsDD.scrollViewConfig.bScrollH){if(s.clientX+jsDD.wndSize.scrollLeft<jsDD.scrollViewConfig.pos.left+D&&r.scrollLeft>0){r.scrollLeft-=jsDD.scrollViewConfig.scrollBy;e=true}if(s.clientX+jsDD.wndSize.scrollLeft>jsDD.scrollViewConfig.pos.right-D&&r.scrollLeft<r.scrollWidth-r.offsetWidth){r.scrollLeft+=jsDD.scrollViewConfig.scrollBy;e=true}}if(jsDD.scrollViewConfig.bScrollV){if(s.clientY+jsDD.wndSize.scrollTop<jsDD.scrollViewConfig.pos.top+D&&r.scrollTop>0){r.scrollTop-=jsDD.scrollViewConfig.scrollBy;e=true}if(s.clientY+jsDD.wndSize.scrollTop>jsDD.scrollViewConfig.pos.bottom-D&&r.scrollTop<r.scrollHeight-r.offsetHeight){r.scrollTop+=jsDD.scrollViewConfig.scrollBy;e=true}}}if(e){jsDD._onscroll();jsDD.drag(s)}}},startDrag:function(s){if(jsDD.bDisable)return true;s=s||window.event;if(!(BX.getEventButton(s)&BX.MSLEFT))return true;jsDD.current_node=null;if(s.currentTarget){jsDD.current_node=s.currentTarget;if(null==jsDD.current_node||null==jsDD.current_node.__bxddid){jsDD.current_node=null;return}}else{jsDD.current_node=s.srcElement;if(null==jsDD.current_node)return;while(null==jsDD.current_node.__bxddid){jsDD.current_node=jsDD.current_node.parentNode;if(jsDD.current_node.tagName=="BODY")return}}jsDD.bStarted=false;jsDD.bPreStarted=true;jsDD.wndSize=BX.GetWindowSize();jsDD.start_x=s.clientX+jsDD.wndSize.scrollLeft;jsDD.start_y=s.clientY+jsDD.wndSize.scrollTop;BX.bind(document,"mouseup",jsDD.stopDrag);BX.bind(document,"touchend",jsDD.stopDrag);BX.bind(document,"mousemove",jsDD.drag);BX.bind(document,"touchmove",jsDD.drag);BX.bind(window,"scroll",jsDD._onscroll);if(document.body.setCapture)document.body.setCapture();if(!jsDD.bDisableDestRefresh)jsDD.refreshDestArea();jsDD.setContainersPos();if(s.type!=="touchstart"){jsDD.denySelection();return BX.PreventDefault(s)}else{return true}},start:function(){if(jsDD.bDisable)return true;document.body.style.cursor="move";if(jsDD.current_node.onbxdragstart)jsDD.current_node.onbxdragstart();for(var s=0,e=jsDD.arDestinations.length;s<e;s++){if(jsDD.arDestinations[s]&&jsDD.arDestinations[s].onbxdestdragstart)jsDD.arDestinations[s].onbxdestdragstart(jsDD.current_node)}jsDD.bStarted=true;jsDD.bPreStarted=false;if(jsDD.bScrollWindow){if(jsDD.scrollViewTimer)clearInterval(jsDD.scrollViewTimer);jsDD.scrollViewTimer=setInterval(jsDD._checkScroll,jsDD.scrollViewConfig.checkerTimeout)}BX.bind(document,"keypress",this._checkEsc)},drag:function(s){if(jsDD.bDisable)return true;s=s||window.event;jsDD.x=s.clientX+jsDD.wndSize.scrollLeft;jsDD.y=s.clientY+jsDD.wndSize.scrollTop;if(!jsDD.bStarted){var e=5;if(jsDD.x>=jsDD.start_x-e&&jsDD.x<=jsDD.start_x+e&&jsDD.y>=jsDD.start_y-e&&jsDD.y<=jsDD.start_y+e)return true;jsDD.start()}if(jsDD.current_node.onbxdrag){jsDD.current_node.onbxdrag(jsDD.x,jsDD.y,s)}var D=jsDD.getContainersScrollPos(jsDD.x,jsDD.y);var r=jsDD.searchDest(jsDD.x+D.left,jsDD.y+D.top);if(r!==jsDD.current_dest_index){if(jsDD.current_dest_index!==false){if(jsDD.current_node.onbxdraghout)jsDD.current_node.onbxdraghout(jsDD.arDestinations[jsDD.current_dest_index],jsDD.x,jsDD.y);if(jsDD.arDestinations[jsDD.current_dest_index].onbxdestdraghout)jsDD.arDestinations[jsDD.current_dest_index].onbxdestdraghout(jsDD.current_node,jsDD.x,jsDD.y)}if(r!==false){if(jsDD.current_node.onbxdraghover)jsDD.current_node.onbxdraghover(jsDD.arDestinations[r],jsDD.x,jsDD.y);if(jsDD.arDestinations[r].onbxdestdraghover)jsDD.arDestinations[r].onbxdestdraghover(jsDD.current_node,jsDD.x,jsDD.y)}}jsDD.current_dest_index=r},stopDrag:function(s){BX.unbind(document,"keypress",jsDD._checkEsc);s=s||window.event;jsDD.bPreStarted=false;if(jsDD.bStarted){if(!jsDD.bEscPressed){jsDD.x=s.clientX+jsDD.wndSize.scrollLeft;jsDD.y=s.clientY+jsDD.wndSize.scrollTop}if(null!=jsDD.current_node.onbxdragstop)jsDD.current_node.onbxdragstop(jsDD.x,jsDD.y,s);var e=jsDD.getContainersScrollPos(jsDD.x,jsDD.y);var D=jsDD.searchDest(jsDD.x+e.left,jsDD.y+e.top);if(false!==D){if(jsDD.bEscPressed){if(null!=jsDD.arDestinations[D].onbxdestdraghout){if(!jsDD.arDestinations[D].onbxdestdraghout(jsDD.current_node,jsDD.x,jsDD.y))D=false;else{if(null!=jsDD.current_node.onbxdragfinish)jsDD.current_node.onbxdragfinish(jsDD.arDestinations[D],jsDD.x,jsDD.y)}}}else{if(null!=jsDD.arDestinations[D].onbxdestdragfinish){if(!jsDD.arDestinations[D].onbxdestdragfinish(jsDD.current_node,jsDD.x,jsDD.y,s))D=false;else{if(null!=jsDD.current_node.onbxdragfinish)jsDD.current_node.onbxdragfinish(jsDD.arDestinations[D],jsDD.x,jsDD.y)}}}}if(false===D){if(null!=jsDD.current_node.onbxdragrelease)jsDD.current_node.onbxdragrelease(jsDD.x,jsDD.y)}else{for(var r=0,n=jsDD.arDestinations.length;r<n;r++){if(r!=D&&jsDD.arDestinations[r]&&null!=jsDD.arDestinations[r].onbxdestdragrelease)jsDD.arDestinations[r].onbxdestdragrelease(jsDD.current_node,jsDD.x,jsDD.y)}}for(var r=0,n=jsDD.arDestinations.length;r<n;r++){if(jsDD.arDestinations[r]&&null!=jsDD.arDestinations[r].onbxdestdragstop)jsDD.arDestinations[r].onbxdestdragstop(jsDD.current_node,jsDD.x,jsDD.y)}}if(document.body.releaseCapture)document.body.releaseCapture();BX.unbind(window,"scroll",jsDD._onscroll);BX.unbind(document,"mousemove",jsDD.drag);BX.unbind(document,"touchmove",jsDD.drag);BX.unbind(document,"keypress",jsDD._checkEsc);BX.unbind(document,"mouseup",jsDD.stopDrag);BX.unbind(document,"touchend",jsDD.stopDrag);jsDD.allowSelection();document.body.style.cursor="";jsDD.current_node=null;jsDD.current_dest_index=false;if(jsDD.bScrollWindow){if(jsDD.scrollViewTimer)clearInterval(jsDD.scrollViewTimer)}if(jsDD.bStarted&&!jsDD.bDisableDestRefresh)jsDD.refreshDestArea();jsDD.bStarted=false;jsDD.bEscPressed=false},searchDest:function(s,e){var D,r,n,t,o;for(D=0,r=jsDD.arDestinationsPriority.length;D<r;D++){if(jsDD.arDestinationsPriority[D]&&BX.type.isArray(jsDD.arDestinationsPriority[D])){for(n=0,t=jsDD.arDestinationsPriority[D].length;n<t;n++){o=jsDD.arDestinationsPriority[D][n];if(jsDD.arDestinations[o]&&!jsDD.arDestinations[o].__bxdddisabled){if(jsDD.arDestinations[o].__bxpos[0]<=s&&jsDD.arDestinations[o].__bxpos[2]>=s&&jsDD.arDestinations[o].__bxpos[1]<=e&&jsDD.arDestinations[o].__bxpos[3]>=e){return o}}}}}return false},allowSelection:function(){document.onmousedown=document.ontouchstart=null;var s=document.body;s.ondrag=null;s.onselectstart=null;s.style.MozUserSelect="";if(jsDD.current_node){jsDD.current_node.ondrag=null;jsDD.current_node.onselectstart=null;jsDD.current_node.style.MozUserSelect=""}},denySelection:function(){document.onmousedown=document.ontouchstart=BX.False;var s=document.body;s.ondrag=BX.False;s.onselectstart=BX.False;s.style.MozUserSelect="none";if(jsDD.current_node){jsDD.current_node.ondrag=BX.False;jsDD.current_node.onselectstart=BX.False;jsDD.current_node.style.MozUserSelect="none"}},Disable:function(){jsDD.bDisable=true},Enable:function(){jsDD.bDisable=false}}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:46:"/bitrix/js/main/core/core_dd.js?16988537923613";s:6:"source";s:31:"/bitrix/js/main/core/core_dd.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(window){
BX.DD = function(params)
{
	return new BX.DD.dragdrop(params);
}

BX.DD.allowSelection = function()
{
	document.onmousedown = null;
	var b = document.body;
	b.ondrag = null;
	b.onselectstart = null;
	b.style.MozUserSelect = '';
	
	// if (jsDD.current_node)
	// {
		// jsDD.current_node.ondrag = null;
		// jsDD.current_node.onselectstart = null;
		// jsDD.current_node.style.MozUserSelect = '';
	// }
}
	
BX.DD.denySelection = function()
{
	document.onmousedown = BX.False;
	var b = document.body;
	b.ondrag = BX.False;
	b.onselectstart = BX.False;
	b.style.MozUserSelect = 'none';
	// if (jsDD.current_node) 
	// {
		// jsDD.current_node.ondrag = jsUtils.False;
		// jsDD.current_node.onselectstart = jsUtils.False;
		// jsDD.current_node.style.MozUserSelect = 'none';
	// }
}

BX.DD.dragdrop = function(params)
{


}

/*
 * BX.DD.dropFiles - for html5 drag and drop files
 *
 * example:
 *
 * BX(function() {
 *	  var dropBoxNode = BX('WebDAV23');
 *    var dropbox = new BX.DD.dropFiles(dropBoxNode);
 *    if (dropbox && dropbox.supported())
 *    {
 *        BX.addCustomEvent(dropbox, 'dropFiles', function(files) { WDUploadDroppedFiles(files);});
 *        BX.addCustomEvent(dropbox, 'dragEnter', function() {BX.addClass( dropBoxNode, 'droptarget');});
 *        BX.addCustomEvent(dropbox, 'dragLeave', function() {BX.removeClass( dropBoxNode, 'droptarget');});
 *    }
 * });
 *
 * to save files use BX.ajax.FormData
 */
BX.DD.dropFiles = function(div)
{
	if (BX.type.isElementNode(div)
		&& this.supported())
	{
		div.setAttribute('dropzone', 'copy f:*/*');
		this.DIV = div;
		this._timer = null;
		this._initEvents();

		this._cancelLeave = function()
		{
			if (this._timer != null)
			{
				clearTimeout(this._timer);
				this._timer = null;
			}
		}
		this._prepareLeave = function()
		{
			this._cancelLeave();
			this._timer = setTimeout( BX.delegate(function() {
				BX.onCustomEvent(this, 'dragLeave')
			}, this), 100);
		}

		return this;
	}
	return false;
}

BX.DD.dropFiles.prototype._initEvents = function()
{
	BX.bind(this.DIV, 'dragover', BX.proxy(this._dragOver, this));
	BX.bind(this.DIV, 'dragenter', BX.proxy(this._dragEnter, this));
	BX.bind(this.DIV, 'dragleave', BX.proxy(this._dragLeave, this));
	BX.bind(this.DIV, 'dragexit', BX.proxy(this._dragExit, this));
	BX.bind(this.DIV, 'drop', BX.proxy(this._drop, this));
}

BX.DD.dropFiles.prototype._dragEnter = function(e)
{
	BX.PreventDefault(e);
	this._cancelLeave();
	BX.onCustomEvent(this, 'dragEnter', [e]);
	return true;
}

BX.DD.dropFiles.prototype._dragExit = function(e)
{
	BX.PreventDefault(e);
	this._prepareLeave();
	return false;
}


BX.DD.dropFiles.prototype._dragLeave = function(e)
{
	BX.PreventDefault(e);
	this._prepareLeave();
	return false;
}

BX.DD.dropFiles.prototype._dragOver = function(e)
{
	BX.PreventDefault(e);
	this._cancelLeave();
	return true;
}

BX.DD.dropFiles.prototype._drop = function(e)
{
	BX.PreventDefault(e);
	var dt = e.dataTransfer;
	var files = dt.files;
	BX.onCustomEvent(this, 'dropFiles', [files, e]);
	BX.onCustomEvent(this, 'dragLeave')
	return false;
}

BX.DD.dropFiles.prototype.isEventSupported = function(event)
{
	var div = BX.create('DIV');
	var eventName = 'on'+event;
	var result = (eventName in div);
	
	if (!result && div.setAttribute && div.removeAttribute)
	{
		div.setAttribute(eventName, '');
		result = (typeof div[eventName] === 'function');
	}

	div = null;
	return result;
}

BX.DD.dropFiles.prototype.supported = function()
{
	return ( (!!window.FileReader) && this.isEventSupported('dragstart') && this.isEventSupported('drop') );
}

})(window)


/* End */
;
; /* Start:"a:4:{s:4:"full";s:51:"/bitrix/js/main/core/core_webrtc.js?169885379224229";s:6:"source";s:35:"/bitrix/js/main/core/core_webrtc.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/**
 * Class for unification and work with WebRTC commands
 * @param params
 * @constructor
 */

;(function (window)
{
	if (window.BX.webrtc) return;

	var BX = window.BX;

	// this is constructor, you must inherit
	BX.webrtc = function ()
	{
		this.debug = false;
		this.audioMuted = false;
		this.videoMuted = false;
		this.enabled = false;
		this.detectedBrowser = 'none';
		this.pcConfig = {};
		this.oneway = false;
		this.lastUserMediaParams = {};
		this.pcConstraints = {};
		this.sdpConstraints = {'mandatory': { 'OfferToReceiveAudio':true, 'OfferToReceiveVideo':true }};
		this.defaultMicrophone = null;
		this.defaultCamera = null;
		this.defaultSpeaker = null;
		this.enableMicAutoParameters = true;
		this.useFallbackConstraints = false;

		this.configVideo = {
			aspectRatio: 1.7777777778
		};
		this.configVideoGroup = this.configVideo;
		this.configVideoMobile = this.configVideo;
		this.configVideoAfterError = { };

		this.callStreamSelf = null;
		this.callStreamMain = null;
		this.callStreamUsers = {};

		this.pc = {};
		this.pcStart = {};
		this.connected = {};

		this.iceCandidates = {};

		this.initiator = false;
		this.callUserId = 0;
		this.callChatId = 0;
		this.callToGroup = false;
		this.callGroupUsers = [];
		this.callInit = false;
		this.callInitUserId = 0;
		this.callActive = false;
		this.callVideo = false;
		this.callRequestUserMedia = {};
		this.needPeerConnection = true;

		this.createAnswerTimeout = {};
		this.initPeerConnectionTimeout = {};
		this.iceCandidateTimeout = {};
		this.pcConnectTimeout = {};

		this.init();
		this.setTurnServer();
	};

	// this function needed to execute, after constructor
	BX.inheritWebrtc = function(child)
	{
		child.prototype = Object.create(BX.webrtc.prototype);
		child.prototype.constructor = child;
		child.prototype.parent = BX.webrtc.prototype;
	};

	BX.webrtc.prototype.init = function()
	{
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
			this.enabled = true;
		else
			return;

		if (navigator.userAgent.substr(navigator.userAgent.indexOf('Firefox/')+8, 2) >= 27)
			this.detectedBrowser = 'firefox';
		else if (navigator.appVersion.substr(navigator.appVersion.indexOf('Chrome/')+7, 2) >= 29)
			this.detectedBrowser = 'chrome';
	};

	BX.webrtc.prototype.attachMediaStream = function(element, stream)
	{
		element.srcObject = stream;
		if(BX.type.isNotEmptyString(this.defaultSpeaker) && element.setSinkId)
		{
			this.log('Trying to set output device: ' + this.defaultSpeaker);
			element.setSinkId(this.defaultSpeaker);
		}
	};

	// this is public function, don't overwrite
	BX.webrtc.prototype.ready = function ()
	{
		return this.enabled;
	};

	// this is public function, don't overwrite
	BX.webrtc.prototype.setTurnServer = function (params)
	{
		if (!this.ready()) return false;

		params = params || {};

		this.turnServer = params.turnServer || 'turn.calls.bitrix24.com';
		this.turnServerFirefox = params.turnServerFirefox || '54.217.240.163';
		this.turnServerLogin = params.turnServerLogin || 'bitrix';
		this.turnServerPassword = params.turnServerPassword || 'bitrix';

		if (this.detectedBrowser == 'firefox')
		{
			this.pcConfig = { "iceServers": [ { url:"stun:"+this.turnServerFirefox}, { url:"turn:"+this.turnServerFirefox, credential:this.turnServerPassword, username: this.turnServerLogin} ] };
			this.pcConstraints = {"optional": [{"DtlsSrtpKeyAgreement": true}]};
		}
		else if (this.detectedBrowser == 'chrome')
		{
			this.pcConfig = { "iceServers": [ { url:"stun:"+this.turnServer}, { url:"turn:"+this.turnServerLogin+"@"+this.turnServer, username: this.turnServerLogin, credential:this.turnServerPassword} ] };
			this.pcConstraints = {"optional": [{"DtlsSrtpKeyAgreement": true}]};
		}

		return true;
	};

	// this is public function, don't overwrite
	BX.webrtc.prototype.toggleAudio = function(changeVariable)
	{
		if (!this.ready()) return false;

		changeVariable = typeof(changeVariable) != 'undefined'? changeVariable: true;
		if (changeVariable)
			this.audioMuted = this.audioMuted? false: true;

		if (this.callStreamSelf && this.callStreamSelf.getAudioTracks() && this.callStreamSelf.getAudioTracks().length>0)
		{
			for (var i = 0; i < this.callStreamSelf.getAudioTracks().length; i++)
			{
				this.callStreamSelf.getAudioTracks()[i].enabled = !this.audioMuted;
			}
		}

		return true;
	};

	// this is public function, don't overwrite
	BX.webrtc.prototype.toggleVideo = function(changeVariable)
	{
		if (!this.ready()) return false;

		changeVariable = typeof(changeVariable) != 'undefined'? changeVariable: true;
		if (changeVariable)
			this.videoMuted = this.videoMuted? false: true;

		if (this.callStreamSelf && this.callStreamSelf.getVideoTracks() && this.callStreamSelf.getVideoTracks().length>0)
		{
			for (var i = 0; i < this.callStreamSelf.getVideoTracks().length; i++)
			{
				this.callStreamSelf.getVideoTracks()[i].enabled = !this.videoMuted;
			}
		}

		return true;
	};

	// this is public function, don't overwrite
	BX.webrtc.prototype.signalingReady = function()
	{
		return (this.ready() && BX.PULL && BX.PULL.getPullServerStatus());
	};

	// this is public function, don't overwrite
	BX.webrtc.prototype.log = function()
	{
		var text = '';
		if (BX.desktop && BX.desktop.ready())
		{
			for (var i = 0; i < arguments.length; i++)
			{
				try
				{
					text = text+' | '+(typeof(arguments[i]) == 'object'? JSON.stringify(arguments[i]): arguments[i]);
				}
				catch (e)
				{
					text = text+' | (circular structure)';
				}

			}
			BX.desktop.log(BX.message('USER_ID')+'.video.log', text.substr(3));
		}
		if (this.debug)
		{
			if (console) console.log('WebRTC Log', arguments);
		}
	};

	/* UserMedia API */

	// this is public function, you can inherit
	BX.webrtc.prototype.startGetUserMedia = function(video, audio)
	{
		if (this.oneway && !this.initiator)
		{
			this.onUserMediaSuccess();
			return true;
		}

		this.lastUserMediaParams = {video: video, audio: audio};

		if (this.callRequestUserMedia[this.callVideo? 'video': 'audio'])
			return false;

		if(typeof(video) != 'undefined' && video !== true)
		{
			//nop
		}
		else
		{
			if(this.useFallbackConstraints)
				video = this.configVideoAfterError;
			else if(this.callToGroup)
				video = this.configVideoGroup;
			else
				video = this.configVideo;
		}

		if(video && this.defaultCamera)
		{
			video.deviceId = {ideal: this.defaultCamera};
		}

		audio = typeof(audio) != 'undefined' && audio !== true? audio: {};
		if(audio && this.defaultMicrophone)
		{
			audio.deviceId = {ideal: this.defaultMicrophone};
		}

		/* for unknown reason, these constraints do not work in chrome, when paired with video resolution constraints */
		if(false && this.enableMicAutoParameters === false)
		{
			audio.optional = [
				{echoCancellation:false},
				{googEchoCancellation:false},
				{googEchoCancellation2:false},
				{googDAEchoCancellation:false},
				{googAutoGainControl: false},
				{googAutoGainControl2: false},
				{mozAutoGainControl: false},
				{googNoiseSuppression: false},
				{googNoiseSuppression2: false},
				{googHighpassFilter: false},
				{googTypingNoiseDetection: false},
				{googAudioMirroring: false}
			];
		}

		var constraints = {
			"audio": audio,
			"video": video
		};

		this.log("Requested access to local media with constraints:  \"" + JSON.stringify(constraints) + "\"");

		try {
			this.callRequestUserMedia[this.callVideo? 'video': 'audio'] = true;
			navigator.mediaDevices.getUserMedia(constraints).then(BX.delegate(this.onUserMediaSuccess, this), BX.delegate(this.onUserMediaError, this));
		} catch (e) {
			this.debug = true;
			this.log("Method getUserMedia failed with exception: " + e.message);
		}

		return true;
	}

	// this is protected function, you must inherit
	BX.webrtc.prototype.onUserMediaSuccess = function(stream)
	{
		this.log('Media stream received');
		if(stream && stream.getTracks)
		{
			stream.getTracks().forEach(function(track)
			{
				this.log(BX.webrtc.mediaStreamTrackToString(track));
			}.bind(this));
		}

		if (!this.oneway || this.initiator)
		{
			this.callRequestUserMedia[this.callVideo? 'video': 'audio'] = false;
			if (this.callStreamSelf)
				return false;

			if (!this.callActive && stream)
			{
				BX.webrtc.stopMediaStream(stream);
				return false;
			}

			this.log("User has granted access to local media.");

			this.callStreamSelf = stream;
			this.toggleAudio(false);
		}

		if (!this.needPeerConnection)
			return true;

		if (this.initiator)
		{
			if (this.callToGroup)
			{
				for (var i = 0; i < this.callGroupUsers.length; i++)
				{
					var userId = this.callGroupUsers[i];
					if (userId != BX.message('USER_ID'))
					{
						clearTimeout(this.initPeerConnectionTimeout[userId]);
						this.initPeerConnection(userId);
					}
				}
			}
			else
			{
				clearTimeout(this.initPeerConnectionTimeout[this.callUserId]);
				this.initPeerConnection(this.callUserId);
			}
		}
		else
		{
			if (this.callToGroup)
			{
				for (var i = 0; i < this.callGroupUsers.length; i++)
				{
					var userId = this.callGroupUsers[i];
					if (userId != BX.message('USER_ID') && userId != this.callInitUserId && !this.callStreamUsers[userId])
					{
						clearTimeout(this.initPeerConnectionTimeout[userId]);
						this.initPeerConnection(userId, true);
					}
				}
			}
		}
		return true;
	}

	// this is protected function, you can inherit
	BX.webrtc.prototype.onUserMediaError = function(error)
	{
		this.debug = true;
		this.callRequestUserMedia[this.callVideo? 'video': 'audio'] = false;
		if (!this.callActive)
			return false;

		this.log("Failed to get access to local media. Error code was " + JSON.stringify(error));

		return true;
	}

	/* PeerConnection API */

	// this is public function, don't overwrite or inherit
	BX.webrtc.prototype.initPeerConnection = function(userId, initiator)
	{
		if (!this.callActive)
			return false;

		initiator = initiator === true;
		if (this.debug) console.log(userId, 'wait initPeerConnection')
		if (!this.pcStart[userId] && (!this.oneway && this.callStreamSelf || this.oneway && this.initiator && this.callStreamSelf || this.oneway && !this.initiator))
		{
			if (this.connected[userId])
			{
				this.log("Creating PeerConnection.", userId);
				this.createPeerConnection(userId);
				if (!this.pc[userId])
				{
					clearTimeout(this.initPeerConnectionTimeout[userId]);
					this.initPeerConnectionTimeout[userId] = setTimeout(BX.delegate(function(){
						this.initPeerConnection(userId, initiator);
					}, this), 2000);
					return false;
				}

				this.log("Adding local stream.", userId, this.pc[userId]);

				this.pcStart[userId] = true;

				if (this.initiator || initiator)
					this.sendOfferToPeer(userId);
			}
			else
			{
				clearTimeout(this.initPeerConnectionTimeout[userId]);
				this.initPeerConnectionTimeout[userId] = setTimeout(BX.delegate(function(){
					this.initPeerConnection(userId, initiator);
				}, this), 2000);
			}
		}
		else if (!this.connected[userId])
		{
			clearTimeout(this.initPeerConnectionTimeout[userId]);
			this.initPeerConnectionTimeout[userId] = setTimeout(BX.delegate(function(){
				this.initPeerConnection(userId, initiator);
			}, this), 2000);
		}

		return true;
	}

	// this protected function, you must inherit
	BX.webrtc.prototype.setLocalAndSend = function(userId, desc)
	{
		if (this.pc[userId] == null || !this.callActive)
			return false;

		this.log('set local description and send', userId, JSON.stringify(desc));
		this.pc[userId].setLocalDescription(desc, BX.delegate(function(a){this.log('setLocalDescription', a)}, this), BX.delegate(function(a){this.log('setLocalDescription', a)}, this));

		// need to send local description to "userId" peer

		return true;
	}

	// this is blank function, you must overwrite
	BX.webrtc.prototype.onRemoteStreamAdded = function(userId, event, setMainVideo)
	{
	}

	// this is blank function, you can overwrite
	BX.webrtc.prototype.onRemoteStreamRemoved = function(userId, event)
	{
	}

	// this is blank function, you must overwrite
	BX.webrtc.prototype.onIceCandidate = function (userId, candidates)
	{
		// need to send IceCandidate to "userId" peer
	}

	// this is blank function, you can overwrite
	BX.webrtc.prototype.onIceConnectionStateChange = function(userId, event)
	{
	}

	// this is blank function, you can overwrite
	BX.webrtc.prototype.onSignalingStateChange = function(userId, event)
	{
	}

	// this is blank function, you can overwrite
	BX.webrtc.prototype.peerConnectionError = function (userId, event)
	{
	}

	// this is public function, you must inherit
	BX.webrtc.prototype.peerConnectionReconnect = function (userId)
	{
		if (!this.pc[userId])
			return false;

		if ((this.pc[userId].iceConnectionState == 'connected' || this.pc[userId].iceConnectionState == 'completed') && this.pc[userId].signalingState == 'stable')
			return false;

		this.log('peerConnectionReconnect', this.pc[userId].iceConnectionState, this.pc[userId].signalingState)
		this.pc[userId].close();

		delete this.pc[userId];
		delete this.pcStart[userId];

		if (this.callStreamMain == this.callStreamUsers[userId])
			this.callStreamMain = null;
		this.callStreamUsers[userId] = null;

		clearTimeout(this.initPeerConnectionTimeout[userId]);

		// need to send reconnect command to "userId" peer in your class
		return true;
	}

	// this is public function, you can inherit
	BX.webrtc.prototype.deleteEvents = function()
	{
		this.initiator = false;
		this.callUserId = 0;
		this.callChatId = 0;
		this.callToGroup = false;
		this.callGroupUsers = [];
		this.callInit = false;
		this.callInitUserId = 0;
		this.callActive = false;
		this.callVideo = false;
		this.callRequestUserMedia = {};

		this.audioMuted = false;
		this.videoMuted = false;
		this.needPeerConnection = true;

		var i = 0;
		for (i in this.pc)
		{
			if(this.pc.hasOwnProperty(i))
			{
				this.pc[i].close();
				delete this.pc[i];
			}
		}

		this.pc = {};
		this.pcStart = {};
		this.connected = {};
		this.iceCandidates = {};

		for (i in this.iceCandidateTimeout)
		{
			if (this.iceCandidateTimeout.hasOwnProperty(i))
			{
				clearTimeout(this.iceCandidateTimeout[i]);
			}
		}
		this.iceCandidateTimeout = {};

		for (i in this.pcConnectTimeout)
		{
			if (this.pcConnectTimeout.hasOwnProperty(i))
			{
				clearTimeout(this.pcConnectTimeout[i]);
			}
		}
		this.pcConnectTimeout = {};

		for (i in this.createAnswerTimeout)
		{
			if (this.createAnswerTimeout.hasOwnProperty(i))
			{
				clearTimeout(this.createAnswerTimeout[i]);
			}
		}
		this.createAnswerTimeout = {};

		for (i in this.initPeerConnectionTimeout)
		{
			if (this.initPeerConnectionTimeout.hasOwnProperty(i))
			{
				clearTimeout(this.initPeerConnectionTimeout[i]);
			}
		}
		this.initPeerConnectionTimeout = {};

		if (this.callStreamSelf)
		{
			BX.webrtc.stopMediaStream(this.callStreamSelf);
			this.callStreamSelf = null;
		}
		if (this.callStreamMain)
		{
			BX.webrtc.stopMediaStream(this.callStreamMain);
			this.callStreamMain = null;
		}
		for (i in this.callStreamUsers)
		{
			if (this.callStreamUsers.hasOwnProperty(i))
			{
				if (this.callStreamUsers[i])
					BX.webrtc.stopMediaStream(this.callStreamUsers[i]);
				delete this.callStreamUsers[i];
			}
		}
	}

	/* Private function */

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.mergeConstraints = function (cons1, cons2)
	{
		if (!this.ready()) return false;

		var merged = cons1;
		for (var name in cons2.mandatory)
		{
			if (cons2.mandatory.hasOwnProperty(name))
			{
				merged.mandatory[name] = cons2.mandatory[name];
			}
		}
		merged.optional.concat(cons2.optional);
		return merged;
	};

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.sendOfferToPeer = function(userId)
	{
		if (!this.pc[userId])
			return false;

		var constraints = {"optional": [], "mandatory": {"MozDontOfferDataChannel": true}};

		if (this.detectedBrowser === "chrome")
		{
			for (var prop in constraints.mandatory)
			{
				if (constraints.mandatory.hasOwnProperty(prop))
				{
					if (prop.indexOf("Moz") != -1)
						delete constraints.mandatory[prop];
				}
			}
		}
		this.log('Constraints', constraints);
		constraints = this.mergeConstraints(constraints, this.sdpConstraints);

		this.log("Sending offer to peer, with constraints:", userId,  "\"" + JSON.stringify(constraints) + "\".");
		this.pc[userId].createOffer(BX.delegate(function(desc){this.setLocalAndSend(userId, desc)}, this), BX.delegate(function(a){this.log('createOffer failure', a)}, this), constraints);

		return true;
	}

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.createPeerConnection = function(userId)
	{
		try
		{
			this.pc[userId] = new RTCPeerConnection(this.pcConfig, this.pcConstraints);
			this.pc[userId].onicecandidate = BX.delegate(function(event) { this.onIceCandidateEvent(userId, event) }, this);
			this.pc[userId].onaddstream = BX.delegate(function(event) { this.onRemoteStreamAddedEvent(userId, event) }, this);
			this.pc[userId].onremovestream = BX.delegate(function(event) { this.onRemoteStreamRemovedEvent(userId, event)}, this);
			this.pc[userId].oniceconnectionstatechange = BX.delegate(function(event) { this.onIceConnectionStateChangeEvent(userId, event)}, this);
			this.pc[userId].onsignalingstatechange = BX.delegate(function(event) { this.onSignalingStateChangeEvent(userId, event)}, this);
			if (!this.oneway || this.initiator)
			{
				this.pc[userId].addStream(this.callStreamSelf);
			}

			this.log("Created RTCPeerConnnection for "+userId+" with:\n" +
			"  config: \"" + JSON.stringify(this.pcConfig) + "\";\n" +
			"  constraints: \"" + JSON.stringify(this.pcConstraints) + "\".");
		}
		catch (e)
		{
			if (this.callToGroup && this.callStreamUsers[userId])
				return false;

			this.log('PeerConnection: ', JSON.stringify(this.pcConfig), JSON.stringify(this.pcConstraints));
			this.log("Failed to create PeerConnection, exception: " + e.message);

			this.peerConnectionError(userId, e);
		}
		return true;
	}

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.signalingPeerData = function(userId, peerData)
	{
		var signal = JSON.parse(peerData);
		if (signal.type === 'offer')
		{
			if (!this.pcStart[userId])
				this.initPeerConnection(userId);

			this.createAnswer(userId, signal);
		}
		else if (signal.type === 'answer' && this.pcStart[userId])
		{
			if (this.pc[userId] == null)
				return false;

			this.pc[userId].setRemoteDescription(new RTCSessionDescription(signal), function(){}, function(){});
		}
		else if (signal.type === 'candidate' && this.pcStart[userId])
		{
			if (!this.pc[userId] || this.pc[userId] == null)
				return false;

			for (var i = 0; i < signal.candidates.length; i++)
			{
				var candidate = new RTCIceCandidate({sdpMLineIndex:signal.candidates[i].label, candidate:signal.candidates[i].candidate});
				try{
					this.pc[userId].addIceCandidate(candidate);
				}
				catch(e)
				{
					this.log('Error addIceCandidate', JSON.stringify(e));
					this.peerConnectionReconnect(userId);
					return false;
				}
			}
		}
		else
		{
			this.log('Signaling command "'+(signal && signal.type? signal.type: 'undefined')+'" from user "'+userId+'" skip');
		}

		return true;
	}

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.onRemoteStreamAddedEvent = function (userId, event)
	{
		if (!this.pc[userId]) return false;

		this.log('Remote stream added', userId, JSON.stringify(event));

		var setMainVideo = false;
		if (!this.callStreamMain)
		{
			this.callStreamMain = event.stream;
			setMainVideo = true;
		}
		this.callStreamUsers[userId] = event.stream;
		this.onRemoteStreamAdded(userId, event, setMainVideo)
	}

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.onRemoteStreamRemovedEvent = function(userId, event)
	{
		if (!this.pc[userId]) return false;

		this.callStreamUsers[userId] = null;
		this.onRemoteStreamRemoved(userId, event);
	}

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.onIceCandidateEvent = function (userId, event)
	{
		if (!this.pc[userId]) return false;

		if (!this.iceCandidates[userId])
			this.iceCandidates[userId] = [];

		if (event.candidate)
		{
			this.log("New ICE candidate: ", event.candidate);
			this.iceCandidates[userId].push({type: 'candidate', label: event.candidate.sdpMLineIndex, id: event.candidate.sdpMid, candidate: event.candidate.candidate});

			clearTimeout(this.iceCandidateTimeout[userId]);
			this.iceCandidateTimeout[userId] = setTimeout(BX.delegate(function(){
				if (this.iceCandidates[userId].length === 0)
					return false;

				this.onIceCandidate(userId, {'type': 'candidate', 'candidates': this.iceCandidates[userId]});
				this.iceCandidates[userId] = [];
			}, this), 250);
		}
		else
		{
			this.log("End of candidates of "+userId);
		}
	}

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.onIceConnectionStateChangeEvent = function(userId, event)
	{
		clearTimeout(this.pcConnectTimeout[userId]);
		if (!this.pc[userId] || this.pc[userId].iceConnectionState == "close")
			return false;

		this.log('iceConnectionStateChange', userId, this.pc[userId].iceConnectionState, this.pc[userId].signalingState);
		this.pcConnectTimeout[userId] = setTimeout(BX.delegate(function(){
			this.peerConnectionReconnect(userId);
		}, this), 15000);

		this.onIceConnectionStateChange(userId, event);

		return true;
	}

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.onSignalingStateChangeEvent = function(userId, event)
	{
		clearTimeout(this.pcConnectTimeout[userId]);
		if (!this.pc[userId] || this.pc[userId].signalingState == "close")
			return false;

		this.log('signalingStateChange', userId, this.pc[userId].iceConnectionState, this.pc[userId].signalingState);
		this.pcConnectTimeout[userId] = setTimeout(BX.delegate(function(){
			this.peerConnectionReconnect(userId);
		}, this), 15000);

		this.onSignalingStateChange(userId, event)
	}

	// this is private function, don't use or overwrite or inherit
	BX.webrtc.prototype.createAnswer = function(userId, signal)
	{
		if (!this.callActive)
			return false;

		if (!this.pcStart[userId])
		{
			clearTimeout(this.createAnswerTimeout[userId]);
			this.createAnswerTimeout[userId] = setTimeout(BX.delegate(function(){
				this.createAnswer(userId, signal);
			}, this), 2000);

			return false;
		}
		this.pc[userId].setRemoteDescription(new RTCSessionDescription(signal), BX.delegate(function()
		{
			if (!this.pc[userId]) return false;
			this.pc[userId].createAnswer(BX.delegate(function(desc){this.setLocalAndSend(userId, desc)}, this), BX.delegate(function(a){this.log('createAnswer failure', a)}, this), this.sdpConstraints);
		}, this), function(){});

		return true;
	}

	BX.webrtc.prototype.setDefaultCamera = function(defaultCamera)
	{
		this.defaultCamera = defaultCamera;
	};

	BX.webrtc.prototype.setDefaultMicrophone = function(defaultMicrophone)
	{
		this.defaultMicrophone = defaultMicrophone;
	};

	BX.webrtc.prototype.logDevices = function()
	{
		var self = this;
		if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
		{
			self.log('Enumerating media devices');
			navigator.mediaDevices.enumerateDevices().then(function(devices)
			{
				devices.forEach(function(device)
				{
					try
					{
						self.log(JSON.stringify(device));
					}
					catch (e)
					{
						self.log(device);
					}
				});
			})
		}
		else
		{
			self.log('Could not enumerate devices, api is not supported');
		}
	};

	BX.webrtc.mediaStreamTrackToString = function(track)
	{
		var result = '';
		for(key in track)
		{
			if(!BX.type.isFunction(track[key]))
			{
				result = result + ' ' + key + ': ' + track[key] + ';';
			}
		}
		return result;
	};

	BX.webrtc.stopMediaStream = function(mediaStream)
	{
		if(!(mediaStream instanceof MediaStream))
			return;

		if (typeof mediaStream.getTracks === 'undefined')
		{
			// Support for legacy browsers
			mediaStream.stop();
		}
		else
		{
			mediaStream.getTracks().forEach(function(track)
			{
				track.stop();
			});
		}
	};

})(window);

/* End */
;
; /* Start:"a:4:{s:4:"full";s:44:"/bitrix/js/main/rating_like.js?1698853791244";s:6:"source";s:30:"/bitrix/js/main/rating_like.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (BX.Type.isUndefined(window.frameCacheVars))
{
	BX.Event.ready(() => {
		BX.Runtime.loadExtension('main.rating');
	});
}
else
{
	BX.Event.EventEmitter.subscribe('onFrameDataReceived', () => {
		BX.Runtime.loadExtension('main.rating');
	});
}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:51:"/bitrix/js/main/core/core_uf.min.js?169885379211603";s:6:"source";s:31:"/bitrix/js/main/core/core_uf.js";s:3:"min";s:35:"/bitrix/js/main/core/core_uf.min.js";s:3:"map";s:35:"/bitrix/js/main/core/core_uf.map.js";}"*/
(function(){"use strict";BX.namespace("BX.Main.UF");if(typeof BX.Main.UF.Manager!=="undefined"){return}var e={};BX.Main.UF.Manager=function(){this.mode=this.mode||"";this.ajaxUrl="/bitrix/tools/uf.php"};BX.Main.UF.Manager.getEdit=function(e,t){return BX.Main.UF.EditManager.get(e,t)};BX.Main.UF.Manager.getView=function(e,t){return BX.Main.UF.ViewManager.get(e,t)};BX.Main.UF.Manager.prototype.get=function(e,t){if(!this.mode){this.displayError(["No mode set. Use BX.UF.EditManager or BX.UF.ViewManager"]);return}return this.query(this.mode,{FIELDS:e.FIELDS,FORM:e.FORM||"",CONTEXT:e.CONTEXT||"",MEDIA_TYPE:e.MEDIA_TYPE||""},t)};BX.Main.UF.Manager.prototype.add=function(e,t){if(!this.mode){this.displayError(["No mode set. Use BX.UF.EditManager or BX.UF.ViewManager"]);return}return this.query(this.mode,{action:"add",FIELDS:e.FIELDS,FORM:e.FORM||""},t)};BX.Main.UF.Manager.prototype.update=function(e,t){if(!this.mode){this.displayError(["No mode set. Use BX.UF.EditManager or BX.UF.ViewManager"]);return}return this.query(this.mode,{action:"update",FIELDS:e.FIELDS,FORM:e.FORM||""},t)};BX.Main.UF.Manager.prototype.delete=function(e,t){if(!this.mode){this.displayError(["No mode set. Use BX.UF.EditManager or BX.UF.ViewManager"]);return}return this.query(this.mode,{action:"delete",FIELDS:e.FIELDS,FORM:e.FORM||""},t)};BX.Main.UF.Manager.prototype.query=function(e,t,n){BX.ajax({dataType:"json",url:this.ajaxUrl,method:"POST",data:this.prepareQuery(e,t),onsuccess:this.queryCallback(n)})};BX.Main.UF.Manager.prototype.prepareQuery=function(e,t){var n=t||{};n.mode=e;n.lang=BX.message("LANGUAGE_ID")||"";n.tpl=BX.message("UF_SITE_TPL")||"";n.tpls=BX.message("UF_SITE_TPL_SIGN")||"";n.sessid=BX.bitrix_sessid();return n};BX.Main.UF.Manager.prototype.queryCallback=function(e){var t=BX.proxy(this.processResult,this);return function(n){t(n,e)}};BX.Main.UF.Manager.prototype.processResult=function(e,t){var n="";if(BX.type.isArray(e.ASSET)){n+=e.ASSET.join("\n")}if(!!e.ERROR){this.displayError(e.ERROR)}return BX.html(null,n).then((function(){if(!!t){t(e.FIELD)}}))};BX.Main.UF.Manager.prototype.displayError=function(e){for(var t in e){if(e.hasOwnProperty(t)){console.error(e[t])}}};BX.Main.UF.Manager.prototype.registerField=function(t,n,i){e[t]={FIELD:n,NODE:i}};BX.Main.UF.Manager.prototype.unRegisterField=function(t){if(!!e[t]){delete e[t]}};BX.Main.UF.ViewManager=function(){BX.Main.UF.ViewManager.superclass.constructor.apply(this,arguments);this.mode="main.view"};BX.extend(BX.Main.UF.ViewManager,BX.Main.UF.Manager);BX.Main.UF.EditManager=function(){BX.Main.UF.EditManager.superclass.constructor.apply(this,arguments);this.mode="main.edit"};BX.extend(BX.Main.UF.EditManager,BX.Main.UF.Manager);BX.Main.UF.EditManager.prototype.validate=function(t,n){if(t.length>0){var i=[];for(var a=0;a<t.length;a++){var r=BX.Main.UF.Factory.getValue(t[a]);if(r!==null){i.push({ENTITY_ID:e[t[a]].FIELD.ENTITY_ID,FIELD:e[t[a]].FIELD.FIELD,ENTITY_VALUE_ID:e[t[a]].FIELD.ENTITY_VALUE_ID,VALUE:r})}}return this.query(this.mode,{action:"validate",FIELDS:i},n)}else{this.queryCallback(n)({FIELD:[]})}};BX.Main.UF.BaseType=function(){};BX.Main.UF.BaseType.prototype.addRow=function(e,t){var n=t.parentNode.getElementsByTagName("span");if(n&&n.length>0&&n[0]){var i=n[0].parentNode;var a=this.getClone(n[n.length-1],e);if(i===t.parentNode){i.insertBefore(a,t)}else{i.appendChild(a)}}};BX.Main.UF.BaseType.prototype.addMobileRow=function(e,t){var n=t.parentNode.getElementsByTagName("span");if(n&&n.length&&n[0]){var i=n[0].parentNode;var a=this.getClone(n[n.length-1],e);var r=a.firstElementChild;var o=r.getAttribute("name");var s=/\[(\d)]/;var p=o.replace(s,(function(e,t){t=parseInt(t)+1;return"["+t+"]"}));var F=false;var l=false;var u=null;r.setAttribute("name",p);if(r.hasChildNodes()){r.childNodes.forEach((function(e,t,n){if(!l&&e.attributes!==undefined&&e.tagName==="INPUT"){e.setAttribute("name",p);l=e.getAttribute("id");F=l+"_1";u=e.getAttribute("data-user-field-type-name")}if(l&&e.attributes!==undefined&&e.id!==undefined){var i=e.getAttribute("id");if(i!==l){e.setAttribute("id",i.replace(l,F))}else{e.setAttribute("id",F)}}}))}if(i===t.parentNode){i.insertBefore(a,t)}else{i.appendChild(a)}if(F){BX.onCustomEvent("onAddMobileUfField",[F,u])}}};BX.Main.UF.BaseType.prototype.getClone=function(e,t){var n=e.cloneNode(true);var i=this.findInput(n,t);for(var a=0;a<i.length;a++){i[a].value=""}return n};BX.Main.UF.BaseType.prototype.findInput=function(e,t){return BX.findChildren(e,{tagName:/INPUT|TEXTAREA|SELECT/i,attribute:{name:t}},true)};BX.Main.UF.BaseType.prototype.isEmpty=function(t){var n=this.getNode(t),i=t+(e[t].FIELD.MULTIPLE==="Y"?"[]":"");if(!BX.isNodeInDom(n)){console.error("Node for field "+t+" is already removed from DOM")}var a=this.findInput(n,i);if(a.length<=0){console.error("Unable to find field "+t+" in the registered node")}else{for(var r=0;r<a.length;r++){if(a[r].value!==""){return false}}}return true};BX.Main.UF.BaseType.prototype.getValue=function(t){var n=this.getNode(t),i=t+(e[t].FIELD.MULTIPLE==="Y"?"[]":""),a=e[t].FIELD.MULTIPLE==="Y"?[]:"";if(!BX.isNodeInDom(n)){console.error("Node for field "+t+" is already removed from DOM")}var r=this.findInput(n,i);if(r.length<=0){var o=n.children.length?n.children[0]:false;if(!BX.util.in_array(e[t].FIELD.USER_TYPE_ID,["crm","employee"])&&(!o||o.getAttribute("data-has-input")!=="no")){console.error("Unable to find field "+t+" in the registered node")}}else{for(var s=0;s<r.length;s++){if(r[s].tagName==="INPUT"&&(r[s].type==="radio"||r[s].type==="checkbox")&&!r[s].checked){continue}if(e[t].FIELD.MULTIPLE==="Y"){a.push(r[s].value)}else{a=r[s].value;break}}}return a};BX.Main.UF.BaseType.prototype.focus=function(t){var n=this.getNode(t),i=t+(e[t].FIELD.MULTIPLE==="Y"?"[]":"");if(!BX.isNodeInDom(n)){console.error("Node for field "+t+" is already removed from DOM")}var a=this.findInput(n,i);if(a.length>0){BX.focus(a[0])}};BX.Main.UF.BaseType.prototype.getNode=function(t){return e[t].NODE};BX.Main.UF.TypeBoolean=function(){};BX.extend(BX.Main.UF.TypeBoolean,BX.Main.UF.BaseType);BX.Main.UF.TypeBoolean.USER_TYPE_ID="boolean";BX.Main.UF.TypeBoolean.prototype.isEmpty=function(e){return false};BX.Main.UF.TypeInteger=function(){};BX.extend(BX.Main.UF.TypeInteger,BX.Main.UF.BaseType);BX.Main.UF.TypeInteger.USER_TYPE_ID="integer";BX.Main.UF.TypeDouble=function(){};BX.extend(BX.Main.UF.TypeDouble,BX.Main.UF.BaseType);BX.Main.UF.TypeDouble.USER_TYPE_ID="double";BX.Main.UF.TypeSting=function(){};BX.extend(BX.Main.UF.TypeSting,BX.Main.UF.BaseType);BX.Main.UF.TypeSting.USER_TYPE_ID="string";BX.Main.UF.TypeUrl=function(){};BX.extend(BX.Main.UF.TypeUrl,BX.Main.UF.BaseType);BX.Main.UF.TypeUrl.USER_TYPE_ID="url";BX.Main.UF.TypeStingFormatted=function(){};BX.extend(BX.Main.UF.TypeStingFormatted,BX.Main.UF.TypeSting);BX.Main.UF.TypeStingFormatted.USER_TYPE_ID="string_formatted";BX.Main.UF.TypeEnumeration=function(){};BX.extend(BX.Main.UF.TypeEnumeration,BX.Main.UF.BaseType);BX.Main.UF.TypeEnumeration.USER_TYPE_ID="enumeration";BX.Main.UF.TypeEnumeration.prototype.findInput=function(e,t){var n=BX.Main.UF.TypeEnumeration.superclass.findInput.apply(this,arguments);if(n.length>0){for(var i=0;i<n.length;i++){if(n[i].tagName==="INPUT"&&n[i].type==="hidden"&&n.length>1){delete n[i];break}}}return BX.util.array_values(n)};BX.Main.UF.TypeEnumeration.prototype.focus=function(t){if(e[t]&&e[t].FIELD.SETTINGS.DISPLAY==="UI"&&BX.type.isElementNode(e[t].NODE)){BX.fireEvent(e[t].NODE,"focus")}else{BX.Main.UF.TypeEnumeration.superclass.focus.apply(this,arguments)}};BX.Main.UF.TypeDate=function(){};BX.extend(BX.Main.UF.TypeDate,BX.Main.UF.BaseType);BX.Main.UF.TypeDate.USER_TYPE_ID="date";BX.Main.UF.TypeDate.prototype.focus=function(t){var n=t+(e[t].FIELD.MULTIPLE==="Y"?"[]":"");var i=this.findInput(this.getNode(t),n);if(i.length>0){BX.fireEvent(i[0],"click")}BX.Main.UF.TypeDate.superclass.focus.apply(this,arguments)};BX.Main.UF.TypeDateTime=function(){};BX.extend(BX.Main.UF.TypeDateTime,BX.Main.UF.TypeDate);BX.Main.UF.TypeDateTime.USER_TYPE_ID="datetime";BX.Main.UF.TypeFile=function(){};BX.extend(BX.Main.UF.TypeFile,BX.Main.UF.BaseType);BX.Main.UF.TypeFile.USER_TYPE_ID="file";BX.Main.UF.TypeFile.prototype.findInput=function(e,t){var n=BX.Main.UF.TypeFile.superclass.findInput.apply(this,arguments);if(n.length<=0){n=BX.findChildren(e,{tagName:/INPUT/i,attribute:{type:"file",name:/^bxu_files/}},true)}return n};BX.Main.UF.TypeFile.prototype.getValue=function(t){var n=BX.Main.UF.TypeFile.superclass.getValue.apply(this,arguments),i=e[t].NODE,a=[],r;if(e[t].FIELD.MULTIPLE==="Y"){var o=t+"_del[]";if(BX.type.isArray(n)&&n.length>0){a=BX.Main.UF.TypeFile.superclass.findInput.apply(this,[i,o]);for(r=0;r<a.length;r++){var s=BX.util.array_search(a[r].value,n);if(s>=0){n[s]={old_id:a[r].value,del:"Y",tmp_name:""}}}}return BX.util.array_values(n)}if(n>0){var o=t+"_del";a=BX.Main.UF.TypeFile.superclass.findInput.apply(this,[i,o]);for(r=0;r<a.length;r++){if(n==a[r].value){n={old_id:n,del:"Y",tmp_name:""};break}}return n}return null};BX.Main.UF.Factory=function(){this.defaultTypeHandler=BX.Main.UF.BaseType;this.typeHandlerList={};this.objectCollection={}};BX.Main.UF.Factory.prototype.setTypeHandler=function(e,t){this.typeHandlerList[e]=t;if(typeof this.objectCollection[e]!=="undefined"){delete this.objectCollection[e]}};BX.Main.UF.Factory.prototype.get=function(e){if(typeof this.objectCollection[e]==="undefined"){this.objectCollection[e]=this.getObject(e)}return this.objectCollection[e]};BX.Main.UF.Factory.prototype.getObject=function(e){return new(this.typeHandlerList[e]||this.defaultTypeHandler)};BX.Main.UF.Factory.prototype.getFieldObject=function(t){if(typeof e[t]==="undefined"){console.error("Field "+t+"is not registered. Use BX.Main.UF.Factory.registerField to register");return null}return this.get(e[t]["FIELD"]["USER_TYPE_ID"])};BX.Main.UF.Factory.prototype.isEmpty=function(t){if(typeof e[t]==="undefined"){console.error("Field "+t+"is not registered. Use BX.Main.UF.Factory.registerField to register");return true}return this.get(e[t]["FIELD"]["USER_TYPE_ID"]).isEmpty(t)};BX.Main.UF.Factory.prototype.getValue=function(t){if(typeof e[t]==="undefined"){console.error("Field "+t+"is not registered. Use BX.Main.UF.Factory.registerField to register");return null}return this.get(e[t]["FIELD"]["USER_TYPE_ID"]).getValue(t)};BX.Main.UF.Factory.prototype.focus=function(t){if(typeof e[t]==="undefined"){console.error("Field "+t+"is not registered. Use BX.Main.UF.Factory.registerField to register")}return this.get(e[t]["FIELD"]["USER_TYPE_ID"]).focus(t)};BX.Main.UF.EditManager=new BX.Main.UF.EditManager;BX.Main.UF.ViewManager=new BX.Main.UF.ViewManager;BX.Main.UF.Factory=new BX.Main.UF.Factory;BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeBoolean.USER_TYPE_ID,BX.Main.UF.TypeBoolean);BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeInteger.USER_TYPE_ID,BX.Main.UF.TypeInteger);BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeDouble.USER_TYPE_ID,BX.Main.UF.TypeDouble);BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeSting.USER_TYPE_ID,BX.Main.UF.TypeSting);BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeStingFormatted.USER_TYPE_ID,BX.Main.UF.TypeStingFormatted);BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeEnumeration.USER_TYPE_ID,BX.Main.UF.TypeEnumeration);BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeFile.USER_TYPE_ID,BX.Main.UF.TypeFile);BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeDate.USER_TYPE_ID,BX.Main.UF.TypeDate);BX.Main.UF.Factory.setTypeHandler(BX.Main.UF.TypeDateTime.USER_TYPE_ID,BX.Main.UF.TypeDateTime)})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:56:"/bitrix/js/main/core/core_autosave.min.js?16988537927139";s:6:"source";s:37:"/bitrix/js/main/core/core_autosave.js";s:3:"min";s:41:"/bitrix/js/main/core/core_autosave.min.js";s:3:"map";s:41:"/bitrix/js/main/core/core_autosave.map.js";}"*/
(function(t){var e=BX.PageObject.getRootWindow();if(BX.CAutoSave&&e.BX.CAutoSave)return;BX.CAutoSave=function(t){this.FORM_NAME=t.form;this.FORM_MARKER=t.form_marker;this.FORM_ID=t.form_id;this.PERIOD=t.period||[4001,20990];this.RESTORE_DATA=null;this.TIMERS=[null,null];this.bInited=false;this.bRestoreInProgress=false;this.DISABLE_STANDARD_NOTIFY=t.DISABLE_STANDARD_NOTIFY;this.NOTIFY_CONTEXT=null;BX.ready(BX.defer(this.Prepare,this));BX.garbage(BX.delegate(this.Clear,this));if(BX.type.isNotEmptyString(this.FORM_MARKER)&&BX(this.FORM_MARKER)){var i=BX(this.FORM_MARKER);if(BX(i.form)&&BX.type.isNotEmptyString(i.form.name)){BX.addCustomEvent(e,"onExtAutoSaveReset_"+i.form.name,BX.proxy(this.Reset,this))}}};BX.CAutoSave.prototype.Prepare=function(){var t;if(this.FORM_NAME&&BX.type.isString(this.FORM_NAME))this.FORM=document.forms[this.FORM_NAME];else if(this.FORM_MARKER&&BX.type.isString(this.FORM_MARKER))this.FORM=(BX(this.FORM_MARKER)||{form:null}).form;if(!BX.type.isDomNode(this.FORM))return;this.FORM.BXAUTOSAVE=this;BX.bind(this.FORM,"submit",BX.proxy(this.ClearTimers,this));for(t=0;t<this.FORM.elements.length;t++){this.RegisterInput(this.FORM.elements[t])}setTimeout(BX.delegate(this._PrepareAfter,this),10)};BX.CAutoSave.prototype.RegisterInput=function(t){if(BX.type.isString(t)){setTimeout(BX.delegate(function(){this.RegisterInput(this.FORM[t]||BX(t))},this),10)}else if(BX.type.isDomNode(t)){if(t.type!="button"&&t.type!="submit"&&t.type!="reset"&&t.type!="image"&&t.type!="hidden"){BX.bind(t,"change",BX.proxy(this.Init,this));if(t.type=="text"||t.type=="textarea"){BX.bind(t,"keyup",BX.proxy(this.Init,this))}if(t.type=="checkbox"||t.type=="radio"){BX.bind(t,"click",BX.proxy(this.Init,this))}}}};BX.CAutoSave.prototype.UnRegisterInput=function(t){if(BX.type.isString(t))t=this.FORM[t]||BX(t);if(BX.type.isDomNode(t)){BX.unbind(t,"change",BX.proxy(this.Init,this));BX.unbind(t,"keyup",BX.proxy(this.Init,this));BX.unbind(t,"click",BX.proxy(this.Init,this))}};BX.CAutoSave.prototype._PrepareAfter=function(){BX.onCustomEvent(this.FORM,"onAutoSavePrepare",[this,BX.proxy(this.Init,this)]);if(this.RESTORE_DATA){var t=this.FORM.name||Math.random();BX.removeCustomEvent("onExtAutoSaveRestoreClick_"+t,BX.proxy(this.Restore,this));BX.addCustomEvent("onExtAutoSaveRestoreClick_"+t,BX.proxy(this.Restore,this));var e=this._NotifyContext();if(e){e.Notify(BX.message("AUTOSAVE")+' <a href="javascript:void(0)" onclick="BX.CAutoSave.Restore(\''+BX.util.urlencode(t)+"', this); return false;\">"+BX.message("AUTOSAVE_R")+"</a>",false,true)}BX.onCustomEvent(this.FORM,"onAutoSaveRestoreFound",[this,this.RESTORE_DATA])}};BX.CAutoSave.prototype.Init=function(){if(this.TIMERS[0]){clearTimeout(this.TIMERS[0]);this.TIMERS[0]=null}this.TIMERS[0]=setTimeout(BX.proxy(this.TimerHandler,this),this.PERIOD[0]);if(!this.TIMERS[1]){this.TIMERS[1]=setInterval(BX.proxy(this.Save,this),this.PERIOD[1])}BX.onCustomEvent(this.FORM,"onAutoSaveInit",[this]);return true};BX.CAutoSave.prototype.TimerHandler=function(){if(this.TIMERS[1]){clearInterval(this.TIMERS[1]);this.TIMERS[1]=null}this.Save()};BX.CAutoSave.prototype.Save=function(){if(this.FORM&&BX.isNodeInDom(this.FORM)){var t,e,s,o={autosave_id:this.FORM_ID,form_data:{}};for(t=0;t<this.FORM.elements.length;t++){s=this.FORM.elements[t];if(s.name&&s.name!="sessid"&&s.name!="lang"&&s.name!="autosave_id"){var n=s.name,a="",r=s.type.toLowerCase();switch(r){case"button":case"submit":case"reset":case"image":case"file":case"password":break;case"radio":case"checkbox":if(s.checked)a=s.value||"on";break;case"select-multiple":n=n.substring(0,n.length-2);a=[];for(e=0;e<s.options.length;e++){if(s.options[e].selected){a.push(s.options[e].value)}}break;default:a=s.value}if(n.indexOf("[]")>0){n=i(n);if(typeof o.form_data[n]=="undefined")o.form_data[n]=[a];else o.form_data[n].push(a)}else o.form_data[i(n)]=a}}BX.onCustomEvent(this.FORM,"onAutoSave",[this,o.form_data]);BX.ajax.post("/bitrix/tools/autosave.php?bxsender=core_autosave&sessid="+BX.bitrix_sessid(),o,BX.proxy(this._Save,this))}else{this.Clear()}};BX.CAutoSave.prototype.Reset=function(){if(this.FORM&&BX.isNodeInDom(this.FORM)){BX.ajax.post("/bitrix/tools/autosave.php?bxsender=core_autosave&action=reset&sessid="+BX.bitrix_sessid(),{autosave_id:this.FORM_ID},null)}};BX.CAutoSave.prototype._Save=function(t){BX.onCustomEvent(this.FORM,"onAutoSaveFinished",[this,t])};BX.CAutoSave.prototype.Restore=function(t,e){if(t){this.RESTORE_DATA=o(t)}else if(this.FORM&&this.RESTORE_DATA){BX.onCustomEvent(this.FORM,"onAutoSaveRestore",[this,this.RESTORE_DATA]);this.bRestoreInProgress=true;for(var i=0;i<this.FORM.elements.length;i++){var s=this.FORM.elements[i];if(s&&BX.type.isDomNode(s)&&s.name){var n=undefined,a=s.name;if(s.type=="select-multiple")a=s.name.substring(0,s.name.length-2);n=this.RESTORE_DATA[a];if(a.indexOf("[]")>0&&BX.type.isArray(n))n=this.RESTORE_DATA[a].shift();if(s.type!="checkbox"&&typeof n=="undefined")continue;var r=false;switch(s.type){case"radio":if(!s.checked&&!!(n==s.value)){r=true;BX.fireEvent(s,"click")}break;case"checkbox":if(s.checked!=!!(n==s.value)){r=true;BX.fireEvent(s,"click")}break;case"select-one":for(var h=0;h<s.options.length;h++){var u=s.options[h].selected;s.options[h].selected=!!(n==s.options[h].value);r|=s.options[h].selected!=u}break;case"select-multiple":n=this.RESTORE_DATA[s.name.substring(0,s.name.length-2)];for(h=0;h<s.options.length;h++){u=s.options[h].selected;s.options[h].selected=!!(BX.type.isArray(n)&&BX.util.in_array(s.options[h].value,n));r|=s.options[h].selected!=u}break;case"file":case"button":case"image":case"submit":case"reset":case"password":break;default:r=n!=s.value;s.value=n}if(r)BX.fireEvent(s,"change")}}var l=this._NotifyContext();if(l)l.hideNotify(e.parentNode.parentNode);this.bRestoreInProgress=false;BX.onCustomEvent(this.FORM,"onAutoSaveRestoreFinished",[this,this.RESTORE_DATA])}};BX.CAutoSave.prototype._NotifyContext=function(){var t=null;if(!this.DISABLE_STANDARD_NOTIFY){if(this.NOTIFY_CONTEXT)t=this.NOTIFY_CONTEXT;else if(BX.WindowManager&&BX.WindowManager.Get())t=BX.WindowManager.Get();else if(BX.adminPanel)t=BX.adminPanel;else if(BX.admin&&BX.admin.panel)t=BX.admin.panel;this.NOTIFY_CONTEXT=t}return t};BX.CAutoSave.prototype.ClearTimers=function(){if(this.TIMERS){clearTimeout(this.TIMERS[0]);clearInterval(this.TIMERS[1])}};BX.CAutoSave.prototype.Clear=function(){if(this.FORM){this.FORM.BXAUTOSAVE=null;for(var t=0;t<this.FORM.elements.length;t++){this.UnRegisterInput(this.FORM.elements[t])}}this.ClearTimers();BX.onCustomEvent(this.FORM,"onAutoSaveClear",[this]);this.FORM=null;this.TIMERS=null};BX.CAutoSave.Restore=function(t,e){BX.onCustomEvent("onExtAutoSaveRestoreClick_"+t,[null,e])};function i(t){var e;while(e=/[^a-zA-Z0-9_\-]/.exec(t)){t=t.replace(e[0],"X"+BX.util.str_pad_left(e[0].charCodeAt(0).toString(),6,"0")+"X")}return t}function s(t){var e;while(e=/X[\d]{6}X/.exec(t)){t=t.replace(e[0],String.fromCharCode(parseInt(e[0].replace(/(^X[0]*)|(X$)/g,""))))}return t}function o(t){var e={};for(var i in t){e[s(i)]=t[i]}return e}e.BX.CAutoSave=BX.CAutoSave})(window);
/* End */
;
//# sourceMappingURL=kernel_main.map.js