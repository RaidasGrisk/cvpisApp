(function(e){function t(t){for(var s,i,c=t[0],l=t[1],o=t[2],u=0,h=[];u<c.length;u++)i=c[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&h.push(n[i][0]),n[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);d&&d(t);while(h.length)h.shift()();return r.push.apply(r,o||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],s=!0,c=1;c<a.length;c++){var l=a[c];0!==n[l]&&(s=!1)}s&&(r.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},n={app:0},r=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var o=0;o<c.length;o++)t(c[o]);var d=l;r.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";a("85ec")},1:function(e,t){},4678:function(e,t,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=r(e);return a(t)}function r(e){if(!a.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}n.keys=function(){return Object.keys(s)},n.resolve=r,e.exports=n,n.id="4678"},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s,n,r=a("2b0e"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("v-app",[a("navbar"),a("v-main",[a("v-container",{attrs:{fluid:""}},[a("router-view")],1)],1),a("v-footer",{attrs:{app:""}})],1)],1)},c=[],l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-app-bar",{attrs:{app:"",dense:""}},[a("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!e.drawer}}}),a("v-toolbar-title",[e._v("CvpisApp")]),a("v-spacer"),a("signIn")],1),a("v-navigation-drawer",{attrs:{app:"",dense:""},scopedSlots:e._u([{key:"append",fn:function(){return[a("v-list",{attrs:{dense:""}},[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[e._v("Light/dark mode")]),a("v-switch",{on:{click:function(t){e.$vuetify.theme.dark=!e.$vuetify.theme.dark}}})],1)],1)],1)]},proxy:!0}]),model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",{staticClass:"title"},[e._v(" App ")])],1)],1),a("v-divider"),a("v-list",{attrs:{dense:""}},e._l(e.$router.options.routes,(function(t){return a("v-list-item",{key:t.name,attrs:{link:""},on:{click:function(a){e.$router.push({path:t.path}).catch((function(e){}))}}},[a("v-list-item-icon",[a("v-icon",[e._v(e._s(t.icon))])],1),a("v-list-item-content",[a("v-list-item-title",[e._v(e._s(t.name))])],1)],1)})),1)],1)],1)},o=[],d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[this.isSignIn?e._e():a("v-btn",{attrs:{Normal:"",disabled:!this.isInit},on:{click:e.handleClickSignIn}},[e._v("sign in")]),this.isSignIn?a("v-btn",{attrs:{Normal:"",disabled:!this.isInit},on:{click:e.handleClickSignOut}},[e._v("sign out")]):e._e()],1)},u=[],h=(a("96cf"),a("1da1")),p={name:"signIn",data:function(){return{isInit:!1,isSignIn:!1}},methods:{handleClickSignIn:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$gAuth.signIn();case 3:if(a=t.sent,a){t.next=6;break}return t.abrupt("return",null);case 6:e.isSignIn=e.$gAuth.isAuthorized,e.$router.push({path:"Subscriptions"}),t.next=14;break;case 10:return t.prev=10,t.t0=t["catch"](0),console.error(t.t0),t.abrupt("return",null);case 14:case"end":return t.stop()}}),t,null,[[0,10]])})))()},handleClickSignOut:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$gAuth.signOut();case 3:e.isSignIn=e.$gAuth.isAuthorized,console.log("isSignIn",e.$gAuth.isAuthorized),e.$router.push({path:"/"}),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}},created:function(){var e=this,t=setInterval((function(){e.isInit=e.$gAuth.isInit,e.isSignIn=e.$gAuth.isAuthorized,e.isInit&&clearInterval(t)}),1e3)}},f=p,v=a("2877"),b=Object(v["a"])(f,d,u,!1,null,"eddb37f8",null),m=b.exports,g={name:"navbar",components:{signIn:m},data:function(){return{drawer:!0}}},j=g,_=Object(v["a"])(j,l,o,!1,null,"d50ad128",null),y=_.exports,x={name:"App",components:{navbar:y}},k=x,w=(a("034f"),Object(v["a"])(k,i,c,!1,null,null,null)),I=w.exports,D=a("ce5b"),C=a.n(D),S=(a("bf40"),a("5363"),a("8c4f")),$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-row",[a("v-col",{attrs:{md:"4"}},[a("v-card",{attrs:{elevation:"0",outlined:""}},[a("v-card-text",[a("p",{staticClass:"display-1 text--primary"},[e._v(" Search ")]),a("div",{staticClass:"text--primary"},[e._v(" Search by filtering tenders by keywords of your choice. ")])])],1)],1),a("v-col",{attrs:{md:"4"}},[a("v-card",{attrs:{elevation:"0",outlined:""}},[a("v-card-text",[a("p",{staticClass:"display-1 text--primary"},[e._v(" Subscribe ")]),a("div",{staticClass:"text--primary"},[e._v(" Each day receive an email with new tenders of your choice. ")])])],1)],1),a("v-col",{attrs:{md:"4"}},[a("v-card",{attrs:{elevation:"0",outlined:""}},[a("v-card-text",[a("p",{staticClass:"display-1 text--primary"},[e._v(" Explore the DB via API ")]),a("div",{staticClass:"text--primary"},[e._v(" The DB used by the app is open. Explore official "),a("a",{attrs:{href:"https://docs.couchdb.org/en/stable/api/index.html",target:"_blank"}},[e._v("docs")]),e._v(", or start by trying out the following links: "),a("a",{attrs:{href:this.$pouchDb+"tenders/_all_docs",target:"_blank"}},[e._v("all tender doc ids")]),e._v(", "),a("a",{attrs:{href:this.$pouchDb+"tenders/2020-699991",target:"_blank"}},[e._v("tender (by doc Id)")]),e._v(", ")])])],1)],1)],1),a("br"),a("br"),a("br"),a("br"),a("v-row",[a("v-col",{attrs:{md:"4"}},[e.data1&&e.labels1?a("lineChart",{attrs:{data:e.data1,labels:e.labels1,text:"Tender #"}}):e._e()],1),a("v-col",{attrs:{md:"4"}},[e.data2&&e.labels2?a("lineChart",{attrs:{data:e.data2,labels:e.labels2,text:"Sutartys k €"}}):e._e()],1),a("v-col",{attrs:{md:"4"}},[e.data3&&e.labels3?a("lineChart",{attrs:{data:e.data3,labels:e.labels3,text:"Sutartys #"}}):e._e()],1)],1)],1)},O=[],A=(a("4160"),a("fb6a"),a("159b"),a("16b2")),z=a("1fca"),T={extends:z["a"],props:["labels","data","yAxisMax","text"],mounted:function(){var e=this;this.renderChart({labels:e.labels,datasets:[{label:e.text,pointRadius:3,pointBorderColor:"rgba(1, 116, 188, 0.50)",pointBackgroundColor:"rgba(1, 116, 188, 0.50)",data:e.data,backgroundColor:"transparent",borderColor:"rgba(1, 116, 188, 0.50)"}],gridLines:{display:!1,drawBorder:!1}},{legend:!1,responsive:!0,maintainAspectRatio:!1,title:{display:!0,text:e.text,fontSize:18},scales:{xAxes:[{gridLines:{display:!1},ticks:{autoSkip:!0,maxTicksLimit:10}}],yAxes:[{gridLines:{display:!1},ticks:{max:e.yAxisMax}}]}})}},P=T,E=Object(v["a"])(P,s,n,!1,null,null,null),R=E.exports,M={components:{lineChart:R},data:function(){return{labels1:!1,data1:!1,labels2:!1,data2:!1,labels3:!1,data3:!1}},mounted:function(){var e=this,t=new A["a"](this.$pouchDb+"tenders");t.query("doc_count_by_init_date",{group:!0,reduce:!0}).then((function(t){var a=[],s=[];t["rows"].forEach((function(e){a.push(e.key),s.push(e.value)})),e.labels1=a.slice(-30),e.data1=s.slice(-30)})).catch((function(e){console.log(e)}));var a=new A["a"](this.$pouchDb+"sutartys");a.query("doc_sum_by_init_date",{group:!0,reduce:!0}).then((function(t){var a=[],s=[];t["rows"].forEach((function(e){a.push(e.key),s.push(Math.round(e.value/1e3))})),e.labels2=a.slice(-30),e.data2=s.slice(-30)})).catch((function(e){console.log(e)}));var s=new A["a"](this.$pouchDb+"sutartys");s.query("doc_count_by_init_date",{group:!0,reduce:!0}).then((function(t){var a=[],s=[];t["rows"].forEach((function(e){a.push(e.key),s.push(e.value)})),e.labels3=a.slice(-30),e.data3=s.slice(-30)})).catch((function(e){console.log(e)}))}},L=M,B=Object(v["a"])(L,$,O,!1,null,"c142e468",null),F=B.exports,N=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("howToSearch",{attrs:{visible:e.showHowToSearch},on:{close:function(t){e.showHowToSearch=!1}}}),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"8",md:"10"}},[a("v-card",{attrs:{elevation:"0",outlined:""}},[a("v-card-text",[a("p",{staticClass:"display-1 text--primary"},[e._v(" Options ")]),a("v-text-field",{attrs:{label:"Keywords"},model:{value:e.searchParams.searchString,callback:function(t){e.$set(e.searchParams,"searchString",t)},expression:"searchParams.searchString"}},[a("v-btn",{attrs:{slot:"append",small:""},on:{click:function(t){t.stopPropagation(),e.showHowToSearch=!0}},slot:"append"},[e._v("Explanation")])],1),a("v-select",{attrs:{items:e.searchParams.tender_types,label:"",multiple:"",chips:"",hint:"","persistent-hint":""},model:{value:e.searchParams.tender_type,callback:function(t){e.$set(e.searchParams,"tender_type",t)},expression:"searchParams.tender_type"}}),a("v-select",{attrs:{items:e.searchParams.tender_classes,label:"",multiple:"",chips:"",hint:"","persistent-hint":""},model:{value:e.searchParams.tender_class,callback:function(t){e.$set(e.searchParams,"tender_class",t)},expression:"searchParams.tender_class"}})],1)],1)],1),a("v-col",{attrs:{md:"2"}},[a("v-card",{staticStyle:{position:"relative"},attrs:{elevation:"0",height:"100%",outlined:""}},[a("v-card-text",[a("p",{staticClass:"display-1 text--primary"},[e._v(" Stats ")]),a("p",[e._v(" "+e._s(e.lastDate)+" - "+e._s(e.firstDate)+" ")]),a("p",[e._v(" Tenders in total # "+e._s(e.filteredTenders.length)+" "),a("br"),e._v(" Tenders a day # ~"+e._s((e.filteredTenders.length/e.lastDateInt).toFixed(2))+" ")])])],1)],1)],1),a("br"),a("br"),a("v-data-table",{staticClass:"elevation-1",attrs:{dense:"",headers:e.headers,items:e.filteredTenders,"footer-props":{"items-per-page-options":[50,100]},"sort-by":"init_date","sort-desc":"true",loading:e.isDataLoaded},scopedSlots:e._u([{key:"item.name",fn:function(t){var s=t.item;return[a("a",{attrs:{target:"_blank",href:s.url}},[e._v(" "+e._s(s.name)+" ")])]}}])})],1)},U=[],H=(a("4de4"),a("7db0"),a("caad"),a("d81d"),a("b0c0"),a("4d63"),a("ac1f"),a("25f0"),a("2532"),a("466d"),a("5319"),a("99af"),a("a15b"),a("1276"),{getOldestDate:function(e){var t=e[0],a=e[0],s=new Date(e[0]),n=new Date(e[0]);return e.forEach((function(e){new Date(e)>s&&(t=e,s=new Date(e)),new Date(e)<n&&(a=e,n=new Date(e))})),[t,a]},getRegexFromSearchString:function(e){var t=e;t=t.replace(/\s/g,"");for(var a=t.match(/\(.*?\)/gi)||[],s=0;s<a.length;s++)a[s]=a[s].replace("(","").replace(")","").split(",");var n=t.replace(/\([^\)]*\)/g,"").match(/(\S+)/g)||",";n=n[0].split(","),n=n.filter((function(e){return e.length>0}));for(var r=0;r<n.length;r++)n[r]=[n[r]];var i=a.concat(n),c="";for(var l in i)i[l].length>1?c+=i[l].join(".*")+"|":c+=i[l].join()+"|";return c=c.substring(0,c.length-1),c}}),q={GetDBConstants:function(){return{tenderTypes:["Skelbimas apie sutarties skyrimą","Savanoriškas išankstinis skaidrumo skelbimas","Skelbimas apie pirkimą","Išankstinis informacinis pranešimas"],tenderClasses:["darbai","paslaugos","prekės"]}}},G=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[a("v-card",[a("v-card-text",{staticClass:"text-center"},[a("p",{staticClass:"display-1 text--primary"},[a("br"),e._v(" How does it work? ")])]),a("v-container",[a("v-row",[a("v-col",{attrs:{md:"6"}},[a("v-card",{staticClass:"mx-auto"},[a("v-card-text",[a("p",{staticClass:"display-1 text--primary"},[e._v(" OR: , ")]),a("p",[a("b",[e._v("Example:")]),e._v(" water, sanitation, information, system")]),a("div",{staticClass:"text--primary"},[a("p",[e._v("Your search will return records with either water OR sanitation OR information OR system")])])])],1)],1),a("v-col",{attrs:{md:"6"}},[a("v-card",{staticClass:"mx-auto"},[a("v-card-text",[a("p",{staticClass:"display-1 text--primary"},[e._v(" AND: () ")]),a("p",[a("b",[e._v("Example:")]),e._v(" (water, sanitation), information, system")]),a("div",{staticClass:"text--primary"},[a("p",[e._v("Your search will return records with either water AND sanitation OR information OR system")])])])],1)],1)],1)],1),a("div",{staticClass:"text-center"},[a("p",[e._v(" Filtering and searching is instant, just start typing! ")])]),a("br"),a("v-card-actions",{staticClass:"justify-center"},[a("v-btn",{attrs:{color:"primary"},on:{click:function(t){t.stopPropagation(),e.show=!1}}},[e._v("Close")])],1)],1)],1)},W=[],Y={props:["visible"],computed:{show:{get:function(){return this.visible},set:function(e){e||this.$emit("close")}}}},J=Y,K=Object(v["a"])(J,G,W,!1,null,null,null),Q=K.exports,V=q.GetDBConstants();A["a"].plugin(a("5d16").default);var X={name:"Search",components:{howToSearch:Q},data:function(){return{searchParams:{searchString:"",tender_type:V.tenderTypes,tender_types:V.tenderTypes,tender_class:V.tenderClasses,tender_classes:V.tenderClasses},data:[],isDataLoaded:!0,lastDateInt:null,lastDate:null,firstDate:null,showHowToSearch:!1}},computed:{headers:function(){return[{text:"Tender",value:"name"},{text:"Buyer",value:"buyer"},{text:"Init_date",value:"init_date",width:110},{text:"Deadline",value:"deadline",width:110}]},filteredTenders:function(){var e=this,t=H.getRegexFromSearchString(this.searchParams.searchString.toLowerCase());try{"".match(t)}catch(s){console.log("invalid removing chars"),t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}t=new RegExp(t);var a=this.data.map((function(a){return t.test(a.name.toLowerCase())&&e.searchParams.tender_types.includes(a.tender_type)&&e.searchParams.tender_class.includes(a.tender_class)}));return this.data.filter((function(e,t){return a[t]}))}},methods:{getData:function(e,t,a,s){var n=new A["a"](this.$pouchDb+e),r=this;n.createIndex({index:{fields:[t]}}),n.find({selector:a,fields:s,limit:999999}).then((function(e){r.data=e["docs"];var t=H.getOldestDate(r.data.map((function(e){return e.init_date}))),a=Math.abs(new Date(t[1])-new Date(t[0]));r.lastDateInt=Math.ceil(a/864e5),r.lastDate=t[1],r.firstDate=t[0],r.isDataLoaded=!1})).catch((function(e){console.log(e)}))}},mounted:function(){var e=new Date;e.setMonth(e.getMonth()-12),console.log(e),this.getData("tenders","init_date",{init_date:{$gt:e}},["name","buyer","init_date","deadline","tender_type","tender_class","url"])}},Z=X,ee=Object(v["a"])(Z,N,U,!1,null,"6c05e937",null),te=ee.exports,ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-card",{attrs:{elevation:"1",outlined:""}},[a("v-card-text",[a("p",{staticClass:"display-1 text--primary"},[e._v(" Login Status: "),a("br"),this.isSignIn?a("label",[e._v("Hello, "+e._s(this.$gAuth.GoogleAuth.currentUser.get().getId()))]):a("label",[e._v("Not signed in")]),a("br")]),a("div",{staticClass:"text--primary"})])],1),a("v-overlay",{attrs:{value:e.isSignIn&&e.loading}},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1),a("br"),this.userData&&this.isSignIn?a("label",[a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.userData},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("Subscriptions")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on,n=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",n,!1),s),[e._v(" New Item ")])]}}],null,!1,269893243),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-row",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Email"},model:{value:e.editedItem.email,callback:function(t){e.$set(e.editedItem,"email",t)},expression:"editedItem.email"}})],1),a("v-row",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"search string"},model:{value:e.editedItem.searchstring,callback:function(t){e.$set(e.editedItem,"searchstring",t)},expression:"editedItem.searchstring"}})],1),a("v-row",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-select",{attrs:{items:e.dbConstants.tenderClasses,label:"tender types",multiple:""},model:{value:e.editedItem.tender_classes,callback:function(t){e.$set(e.editedItem,"tender_classes",t)},expression:"editedItem.tender_classes"}})],1),a("v-row",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-select",{attrs:{items:e.dbConstants.tenderTypes,label:"tender types",multiple:""},model:{value:e.editedItem.tender_types,callback:function(t){e.$set(e.editedItem,"tender_types",t)},expression:"editedItem.tender_types"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v(" Save ")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Are you sure you want to delete this item?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),a("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var s=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(s)}}},[e._v(" mdi-pencil ")]),a("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(s)}}},[e._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){return[e._v(" You've no subscriptions, go ahead and add one ")]},proxy:!0}],null,!1,2449004817)})],1):e._e(),a("v-snackbar",{attrs:{timeout:2e3,bottom:"",right:"",color:"primary",outlined:""},scopedSlots:e._u([{key:"action",fn:function(t){var s=t.attrs;return[a("v-btn",e._b({attrs:{text:"",color:"primary"},on:{click:function(t){e.snackbar=!1}}},"v-btn",s,!1),[e._v(" Close ")])]}}]),model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v(" "+e._s(e.snackbartext)+" ")])],1)},se=[],ne=(a("c975"),a("a434"),a("bc3a")),re=a.n(ne),ie=q.GetDBConstants(),ce={name:"HelloWorld",data:function(){return{isSignIn:this.$gAuth.isAuthorized||!1,userData:[],userId:null,loading:!0,syncWithDbFlag:!1,snackbar:!1,snackbartext:"updating",dialog:!1,dialogDelete:!1,headers:[{text:"email",value:"email"},{text:"searchstring",value:"searchstring"},{text:"tender_classes",value:"tender_classes"},{text:"tender_types",value:"tender_types"},{text:"Actions",value:"actions",sortable:!1}],editedIndex:-1,editedItem:{email:"",searchstring:"",tender_classes:ie.tenderClasses,tender_types:ie.tenderTypes},defaultItem:{email:"",searchstring:"",tender_classes:ie.tenderClasses,tender_types:ie.tenderTypes},dbConstants:ie}},computed:{formTitle:function(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()},userData:{handler:function(e){this.syncWithDbFlag?(console.log("updating db",e),this.syncUserData()):(console.log("not updating the db"),this.syncWithDbFlag=!0)},deep:!0}},methods:{getUserData:function(){var e=this;e.loading=!0,re.a.get(this.$backend+"get_user_data",{params:{userId:this.$gAuth.GoogleAuth.currentUser.get().getId()}}).then((function(t){console.log(t.data),e.userData=t.data["data"],e.loading=!1}))},syncUserData:function(){var e=this;e.snackbar=!0;for(var t=0;t<e.userData.length;++t)"userid"in e.userData[t]||(console.log("adding user id"),e.userData[t]["userid"]=e.userId);re.a.post(this.$backend+"sync_user_data",{userData:e.userData,userid:e.userId}).then((function(t){console.log("backend resp",t.data),e.userData=t.data,e.syncWithDbFlag=!1,e.snackbartext="updated!"}))},editItem:function(e){this.editedIndex=this.userData.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem:function(e){this.editedIndex=this.userData.indexOf(e),this.editedItem=Object.assign({},e),this.dialogDelete=!0},deleteItemConfirm:function(){this.userData.splice(this.editedIndex,1),this.closeDelete()},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){this.editedIndex>-1?Object.assign(this.userData[this.editedIndex],this.editedItem):this.userData.push(this.editedItem),this.close()}},created:function(){var e=this,t=setInterval((function(){e.isInit=e.$gAuth.isInit,e.isSignIn=e.$gAuth.isAuthorized,e.isSignIn&&(console.log("stopped"),clearInterval(t),e.userId=e.$gAuth.GoogleAuth.currentUser.get().getId(),e.getUserData())}),1e3)}},le=ce,oe=Object(v["a"])(le,ae,se,!1,null,"b1e211a6",null),de=oe.exports;r["default"].use(S["a"]);var ue=new S["a"]({routes:[{path:"/",name:"Home",component:F,icon:"mdi-home-minus-outline"},{path:"/Search",name:"Search",component:te,icon:"mdi-file-search-outline"},{path:"/Subscriptions",name:"My profile",component:de,icon:"mdi-file-search-outline"}],linkActiveClass:"is-active"}),he=a("c9bf");r["default"].use(C.a),r["default"].use(he["a"],{clientId:"943529136358-66uu34u80q0a9t3p4b2sbb96dqba9h7k.apps.googleusercontent.com",scope:"email",prompt:"consent",fetch_basic_profile:!1}),r["default"].config.productionTip=!1,r["default"].prototype.$pouchDb="http://35.208.126.174:5984/",r["default"].prototype.$backend="http://35.208.126.174:23450/",new r["default"]({vuetify:new C.a({theme:{light:!0},icons:{iconfont:"mdi"}}),router:ue,render:function(e){return e(I)}}).$mount("#app")},"85ec":function(e,t,a){}});
//# sourceMappingURL=app.1ee36dea.js.map