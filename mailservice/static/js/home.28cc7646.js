(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"002f":function(t,e,s){"use strict";s("0f63")},"0f63":function(t,e,s){},"5ebe":function(t,e,s){},"6a26":function(t,e,s){},"6cf5":function(t,e,s){"use strict";s("6a26")},"7a89":function(t,e,s){t.exports=s.p+"static/img/img.22f69c2c.jpeg"},bfe9:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("v-head"),s("v-sidebar"),s("div",{staticClass:"content-box",class:{"content-collapse":t.collapse}},[s("v-tags"),s("div",{staticClass:"content"},[s("transition",{attrs:{name:"move",mode:"out-in"}},[s("keep-alive",{attrs:{include:t.tagsList}},[s("router-view")],1)],1),s("el-backtop",{attrs:{target:".content"}})],1)],1)],1)},l=[],a=(s("7f7f"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("div",{staticClass:"collapse-btn",on:{click:t.collapseChage}},[t.collapse?s("i",{staticClass:"el-icon-s-unfold"}):s("i",{staticClass:"el-icon-s-fold"})]),s("div",{staticClass:"logo"},[t._v("邮件系统服务端")]),s("div",{staticClass:"header-right"},[s("div",{staticClass:"header-user-con"},[s("div",{staticClass:"btn-fullscreen",on:{click:t.handleFullScreen}},[s("el-tooltip",{attrs:{effect:"dark",content:t.fullscreen?"取消全屏":"全屏",placement:"bottom"}},[s("i",{staticClass:"el-icon-rank"})])],1),t._m(0),s("el-dropdown",{staticClass:"user-name",attrs:{trigger:"click"},on:{command:t.handleCommand},scopedSlots:t._u([{key:"dropdown",fn:function(){return[s("el-dropdown-menu",[s("el-dropdown-item",{attrs:{command:"changePassword"}},[t._v("修改密码")]),s("el-dropdown-item",{attrs:{divided:"",command:"loginout"}},[t._v("退出登录")])],1)]},proxy:!0}])},[s("span",{staticClass:"el-dropdown-link"},[t._v("\n                    "+t._s(t.nickname)+"\n                    "),s("i",{staticClass:"el-icon-caret-bottom"})])])],1)])])}),i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"user-avator"},[n("img",{attrs:{src:s("7a89")}})])}],o=s("2b0e"),c=new o["default"],r=c,u={data:function(){return{collapse:!1,fullscreen:!1,name:"Hi",message:2}},computed:{nickname:function(){var t=JSON.parse(localStorage.getItem("login_token")).nickname;return t||this.name}},methods:{handleCommand:function(t){"loginout"==t?(localStorage.removeItem("login_token"),this.$router.push("/login")):"changePassword"==t&&this.$router.push("/changePassword")},collapseChage:function(){this.collapse=!this.collapse,r.$emit("collapse",this.collapse)},handleFullScreen:function(){var t=document.documentElement;this.fullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen(),this.fullscreen=!this.fullscreen}},mounted:function(){document.body.clientWidth<1500&&this.collapseChage()}},d=u,m=(s("002f"),s("2877")),h=Object(m["a"])(d,a,i,!1,null,"16d2b8fa",null),f=h.exports,p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sidebar"},[s("el-menu",{staticClass:"sidebar-el-menu",attrs:{"default-active":t.onRoutes,collapse:t.collapse,"background-color":"#324157","text-color":"#bfcbd9","active-text-color":"#20a0ff","unique-opened":"",router:""}},[t._l(t.items,(function(e){return[e.subs?[s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])]),t._l(e.subs,(function(e){return[e.subs?s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[t._v(t._s(e.title))]),t._l(e.subs,(function(e,n){return s("el-menu-item",{key:n,attrs:{index:e.index}},[t._v(t._s(e.title))])}))],2):s("el-menu-item",{key:e.index,attrs:{index:e.index}},[t._v(t._s(e.title))])]}))],2)]:[s("el-menu-item",{key:e.index,attrs:{index:e.index}},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])])]]}))],2)],1)},g=[],v=(s("a481"),{data:function(){return{collapse:!1,items:[{icon:"el-icon-user",index:"userManagement",title:"用户管理"},{icon:"el-icon-s-platform",index:"ServerManagement",title:"服务器管理"},{icon:"el-icon-folder-delete",index:"filterAccountManagement",title:"过滤管理"},{icon:"el-icon-postcard",index:"logManagement",title:"日志管理"}]}},computed:{onRoutes:function(){return this.$route.path.replace("/","")}},created:function(){var t=this;r.$on("collapse",(function(e){t.collapse=e,r.$emit("collapse-content",e)}))}}),_=v,b=(s("6cf5"),Object(m["a"])(_,p,g,!1,null,"77e33df7",null)),C=b.exports,w=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.showTags?s("div",{staticClass:"tags"},[s("ul",t._l(t.tagsList,(function(e,n){return s("li",{key:n,staticClass:"tags-li",class:{active:t.isActive(e.path)}},[s("router-link",{staticClass:"tags-li-title",attrs:{to:e.path}},[t._v("\n                "+t._s(e.title)+"\n            ")]),s("span",{staticClass:"tags-li-icon",on:{click:function(e){return t.closeTags(n)}}},[s("i",{staticClass:"el-icon-close"})])],1)})),0),s("div",{staticClass:"tags-close-box"},[s("el-dropdown",{on:{command:t.handleTags}},[s("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("\n                标签选项"),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown",size:"small"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"other"}},[t._v("关闭其他")]),s("el-dropdown-item",{attrs:{command:"all"}},[t._v("关闭所有")])],1)],1)],1)]):t._e()},x=[],k={data:function(){return{tagsList:[]}},methods:{isActive:function(t){return t===this.$route.fullPath},closeTags:function(t){var e=this.tagsList.splice(t,1)[0],s=this.tagsList[t]?this.tagsList[t]:this.tagsList[t-1];s?e.path===this.$route.fullPath&&this.$router.push(s.path):this.$router.push("/")},closeAll:function(){this.tagsList=[],this.$router.push("/")},closeOther:function(){var t=this,e=this.tagsList.filter((function(e){return e.path===t.$route.fullPath}));this.tagsList=e},setTags:function(t){var e=this.tagsList.some((function(e){return e.path===t.fullPath}));e||(this.tagsList.length>=8&&this.tagsList.shift(),this.tagsList.push({title:t.meta.title,path:t.fullPath,name:t.matched[1].components.default.name})),r.$emit("tags",this.tagsList)},handleTags:function(t){"other"===t?this.closeOther():this.closeAll()}},computed:{showTags:function(){return this.tagsList.length>0}},watch:{$route:function(t,e){this.setTags(t)}},created:function(){var t=this;this.setTags(this.$route),r.$on("close_current_tags",(function(){for(var e=0,s=t.tagsList.length;e<s;e++){var n=t.tagsList[e];if(n.path===t.$route.fullPath){e<s-1?t.$router.push(t.tagsList[e+1].path):e>0?t.$router.push(t.tagsList[e-1].path):t.$router.push("/"),t.tagsList.splice(e,1);break}}}))}},$=k,L=(s("c5f3"),Object(m["a"])($,w,x,!1,null,null,null)),F=L.exports,S={data:function(){return{tagsList:[],collapse:!1}},components:{vHead:f,vSidebar:C,vTags:F},created:function(){var t=this;r.$on("collapse-content",(function(e){t.collapse=e})),r.$on("tags",(function(e){for(var s=[],n=0,l=e.length;n<l;n++)e[n].name&&s.push(e[n].name);t.tagsList=s}))}},y=S,T=Object(m["a"])(y,n,l,!1,null,null,null);e["default"]=T.exports},c5f3:function(t,e,s){"use strict";s("5ebe")}}]);
//# sourceMappingURL=home.28cc7646.js.map