(function(e){function n(n){for(var r,i,u=n[0],a=n[1],c=n[2],l=0,p=[];l<u.length;l++)i=u[l],o[i]&&p.push(o[i][0]),o[i]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);f&&f(n);while(p.length)p.shift()();return s.push.apply(s,c||[]),t()}function t(){for(var e,n=0;n<s.length;n++){for(var t=s[n],r=!0,u=1;u<t.length;u++){var a=t[u];0!==o[a]&&(r=!1)}r&&(s.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={app:0},s=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/jsvcn/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=n,u=u.slice();for(var c=0;c<u.length;c++)n(u[c]);var f=a;s.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var r=t("64a9"),o=t.n(r);o.a},1:function(e,n){},2:function(e,n){},3:function(e,n){},4:function(e,n){},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("Verifier")],1)},s=[],i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h1",[e._v("Jsvcn Demo")]),t("h3",[e._v("Select a file")]),t("input",{attrs:{type:"file",id:"file",name:"file"},on:{change:e.onFileChange}}),t("h3",[e._v("Results:")]),t("p",[e._v("Status: "+e._s(e.asset.status))]),0!==e.progress?t("p",[e._v("Progress "+e._s(e.progress))]):e._e(),t("p",[e._v("\n    Raw response:\n    "),t("br"),t("textarea",{attrs:{rows:"10"}},[e._v(e._s(e.asset))])])])},u=[],a=t("e49c"),c={props:{msg:String},data:function(){return{asset:{},progress:0}},methods:{onFileChange:function(e){var n=this,t=e.target.files[0],r=new a["a"];r.verify(t,this.onProgressChange).then(function(e){n.asset=e})},onProgressChange:function(e){this.progress=e},resetState:function(){this.asset={},this.progress=0}}},f=c,l=t("2877"),p=Object(l["a"])(f,i,u,!1,null,null,null),v=p.exports,d={name:"app",components:{Verifier:v}},h=d,g=(t("034f"),Object(l["a"])(h,o,s,!1,null,null,null)),b=g.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(b)}}).$mount("#app")},"64a9":function(e,n,t){}});
//# sourceMappingURL=app.86a6cf3a.js.map