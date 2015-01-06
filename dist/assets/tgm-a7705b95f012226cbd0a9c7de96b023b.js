define("tgm/adapters/application",["ember-data","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.FirebaseAdapter.extend({firebase:window._FBRef})}),define("tgm/app",["ember","ember/resolver","ember/load-initializers","tgm/config/environment","exports"],function(e,t,s,n,a){"use strict";var o=e["default"],r=t["default"],i=s["default"],l=n["default"];o.MODEL_FACTORY_INJECTIONS=!0;var u=o.Application.extend({modulePrefix:l.modulePrefix,podModulePrefix:l.podModulePrefix,Resolver:r});i(u,l.modulePrefix),a["default"]=u}),define("tgm/collections/indexed",["fireplace","exports"],function(e,t){"use strict";var s=e.IndexedCollection;t["default"]=s}),define("tgm/collections/object",["fireplace","exports"],function(e,t){"use strict";var s=e.ObjectCollection;t["default"]=s}),define("tgm/components/move-form",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Component.extend({actions:{submit:function(){this.sendAction("submit",{text:this.get("text").replace(/\.?\s?tgm\.?\s*$/i,"")+"."})}}})}),define("tgm/components/move-item",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Component.extend({})}),define("tgm/controllers/application",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Controller.extend({showSubmitMoveButton:function(){return"moves.new"!==this.get("currentPath")}.property("currentPath")})}),define("tgm/controllers/jumbo",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Controller.extend({needs:["application"],show:function(){return"index"===this.get("controllers.application.currentPath")}.property("controllers.application.currentPath")})}),define("tgm/controllers/move",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.ObjectController.extend({needs:["session"],session:s.computed.alias("controllers.session.model"),vote:function(){return this.get("votes").findBy("id",this.get("session.id"))}.property("votes.@each.id","session.votes.@each.id"),upvotes:function(){return this.get("votes").filterBy("flag","up").get("length")}.property("votes.@each.flag"),downvotes:function(){return this.get("votes").filterBy("flag","down").get("length")}.property("votes.@each.flag"),upvoteAction:function(){return this.get("vote")?this.get("vote.down")?"toggle":"unvote":"upvote"}.property("vote.flag"),downvoteAction:function(){return this.get("vote")?this.get("vote.up")?"toggle":this.get("vote.down")?"unvote":void 0:"downvote"}.property("vote.flag"),actions:{upvote:function(){this.get("controllers.session").send("vote",this.get("model"),"up")},downvote:function(){this.get("controllers.session").send("vote",this.get("model"),"down")},toggle:function(){this.get("controllers.session").send("toggleVote",this.get("model"),this.get("vote"))},unvote:function(){this.get("controllers.session").send("unvote",this.get("model"),this.get("vote"))}}})}),define("tgm/controllers/moves",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.ArrayController.extend({})}),define("tgm/controllers/navigation",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.ArrayController.extend({needs:["application"],model:[{title:"Latest",location:"latest",active:null},{title:"Popular",location:"popular",active:null}],title:"Total Grandma Move",showLogo:function(){return"index"!==this.get("controllers.application.currentPath")}.property("controllers.application.currentPath")})}),define("tgm/controllers/session",["ember","tgm/mixins/firebase","exports"],function(e,t,s){"use strict";var n=e["default"],a=t["default"];s["default"]=n.ObjectController.extend(a,{exists:function(){return!!this.getAuth()}.property(),signedIn:function(){return!!this.get("token")}.property("token"),actions:{vote:function(e,t){var s=this.store.createRecord("vote",{flag:t,content:e}),n=this.get("model"),a=this.store.createRecord("vote",{flag:t,content:n});e.get("votes").addObject(a),e.save(),this.get("votes").addObject(s),this.get("model").save()},toggleVote:function(e,t){var s=this.get("votes").findBy("id",e.get("id")),n="up"===s.get("flag")?"down":"up";t.set("flag",n),t.save(),s.set("flag",n),s.save()},unvote:function(e,t){var s=this.get("votes").findBy("id",e.get("id"));t["delete"](),s["delete"]()},login:function(){var e=this.getAuth(),t=this.store.find("user",e.uid);this.set("model",t)},signUp:function(){var e=this;this.newAuth().then(function(t){var s=e.store.createRecord("user",{id:t.uid,token:t.token,expires_at:t.expires});return s.save()}).then(function(t){e.set("model",t)})}}})}),define("tgm/data-adapters/main",["fireplace/system/debug-adapter","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("tgm/initializers/export-application-global",["ember","tgm/config/environment","exports"],function(e,t,s){"use strict";function n(e,t){var s=a.String.classify(o.modulePrefix);o.exportApplicationGlobal&&(window[s]=t)}var a=e["default"],o=t["default"];s.initialize=n,s["default"]={name:"export-application-global",initialize:n}}),define("tgm/initializers/session",["exports"],function(e){"use strict";function t(e){var t=e.lookup("controller:session");t.send(t.get("exists")?"login":"signUp")}e.initialize=t,e["default"]={name:"session",after:"store",initialize:t}}),define("tgm/initializers/store",["exports"],function(e){"use strict";e["default"]={name:"fireplace:inject-store",initialize:function(e,t){t.inject("controller","store","store:main"),t.inject("route","store","store:main"),t.inject("data-adapter","store","store:main"),t.inject("collection","store","store:main"),t.inject("component","store","store:main")}}}),define("tgm/mixins/firebase",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Mixin.create({newAuth:function(){var e=this.store.get("firebaseRoot");return new s.RSVP.Promise(function(t,s){e.authAnonymously(function(e,n){e?s(e):t(n)})})},getAuth:function(){return this.store.get("firebaseRoot").getAuth()}})}),define("tgm/models/move",["fireplace","exports"],function(e,t){"use strict";var s=e.Model,n=e.attr,a=e.hasMany;t["default"]=s.extend({text:n("string"),votes:a("user",{embedded:!1,as:"vote"}),created_at:n("timestamp",{"default":function(){return new Date}})})}),define("tgm/models/user",["fireplace","exports"],function(e,t){"use strict";var s=e.Model,n=e.attr,a=e.hasMany;t["default"]=s.extend({token:n("string"),votes:a("move",{embedded:!1,as:"vote"}),created_at:n("timestamp",{"default":function(){return new Date}}),expires_at:n("timestamp")})}),define("tgm/models/vote",["ember","fireplace","exports"],function(e,t,s){"use strict";var n=e["default"],a=t.MetaModel;s["default"]=a.extend({flag:n.computed.alias("meta"),up:n.computed.equal("flag","up"),down:n.computed.equal("flag","down")})}),define("tgm/router",["ember","tgm/config/environment","exports"],function(e,t,s){"use strict";var n=e["default"],a=t["default"],o=n.Router.extend({location:a.locationType});o.map(function(){this.route("index",{path:"/"}),this.route("latest"),this.route("popular"),this.resource("moves",function(){this.route("new")}),this.resource("move",{path:"move/:move_id"})}),s["default"]=o}),define("tgm/routes/index",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({model:function(){return this.store.fetch("move")},setupController:function(e,t){this._super(e,t),e.set("sortProperties",["created_at"]),e.set("sortAscending",!1)}})}),define("tgm/routes/latest",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({controllerName:"moves.index",templateName:"moves.index",model:function(){return this.store.fetch("move")},setupController:function(e,t){this._super(e,t),e.set("sortProperties",["created_at"]),e.set("sortAscending",!1)}})}),define("tgm/routes/move",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({model:function(e){return this.store.fetch("move",e.move_id)}})}),define("tgm/routes/moves",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({model:function(){return this.store.fetch("move")}})}),define("tgm/routes/moves/index",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({model:function(){return this.store.fetch("move")}})}),define("tgm/routes/moves/new",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({actions:{createMove:function(e){var t=this,s=this.store.createRecord("move",{text:e.text});s.save().then(function(){t.transitionTo("latest")})}}})}),define("tgm/routes/popular",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({controllerName:"moves.index",templateName:"moves.index",model:function(){return this.store.fetch("move")},setupController:function(e,t){this._super(e,t),e.set("sortProperties",["upvotes"])}})}),define("tgm/store",["fireplace","exports"],function(e,t){"use strict";var s=e.Store;t["default"]=s.extend({firebaseRoot:new window.Firebase("https://totalgrandmamove.firebaseio.com")})}),define("tgm/stores/main",["fireplace","exports"],function(e,t){"use strict";var s=e.Store;t["default"]=s}),define("tgm/templates/application",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function r(e,t){var s,a,o,r="";return t.buffer.push('\n    <div class="col-md-4">\n      '),a=n["link-to"]||e&&e["link-to"],o={hash:{"class":"btn btn-warning btn-lg btn-block"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},inverse:p.noop,fn:p.program(2,i,t),contexts:[e],types:["STRING"],data:t},s=a?a.call(e,"moves.new",o):h.call(e,"link-to","moves.new",o),(s||0===s)&&t.buffer.push(s),t.buffer.push("\n    </div>\n    "),r}function i(e,t){t.buffer.push('\n      <span class="glyphicon glyphicon-plus"></span> Submit TGM\n      ')}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var l,u,f,c="",p=this,h=n.helperMissing,d=this.escapeExpression;return o.buffer.push(d((u=n.render||t&&t.render,f={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o},u?u.call(t,"navigation",f):h.call(t,"render","navigation",f)))),o.buffer.push("\n"),o.buffer.push(d((u=n.render||t&&t.render,f={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o},u?u.call(t,"jumbo",f):h.call(t,"render","jumbo",f)))),o.buffer.push('\n\n<div class="container">\n  <div class="row">\n    <div '),o.buffer.push(d(n["bind-attr"].call(t,{hash:{"class":"showSubmitMoveButton:col-md-8:col-md-12"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:o}))),o.buffer.push(">\n      "),l=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("\n    </div>\n\n    "),l=n["if"].call(t,"showSubmitMoveButton",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,r,o),contexts:[t],types:["ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push('\n\n  </div>\n\n  <hr>\n\n  <footer>\n    <p>&#169; 2015 <a href="https://github.com/mileszim">Miles Zimmerman</a></p>\n  </footer>\n</div>\n'),c})}),define("tgm/templates/components/move-form",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var r,i,l="",u=this.escapeExpression,f=n.helperMissing;return o.buffer.push('<div class="row">\n  <form '),o.buffer.push(u(n.action.call(t,"submit",{hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:t},contexts:[t],types:["STRING"],data:o}))),o.buffer.push('>\n    <div class="col-md-8">\n      <div class="form-group">\n        '),o.buffer.push(u((r=n.textarea||t&&t.textarea,i={hash:{value:"text",rows:"2","class":"form-control"},hashTypes:{value:"ID",rows:"STRING","class":"STRING"},hashContexts:{value:t,rows:t,"class":t},contexts:[],types:[],data:o},r?r.call(t,i):f.call(t,"textarea",i)))),o.buffer.push("\n      </div>\n    </div>\n    <div class=\"col-md-2\">\n      <button type='submit' class='btn btn-lg btn-block btn-primary'>TGM.</button>\n    </div>\n  </form>\n</div>\n"),l})}),define("tgm/templates/components/move-item",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var r,i="";return o.buffer.push('<div class="row">\n  <div class="col-sm-12">\n    \n    <div class="panel panel-default">\n      <div class="panel-body">\n        <a href=\'#\'>\n          <span class="label label-default"><span class="glyphicon glyphicon-time"></span> '),r=n._triageMustache.call(t,"move.timestamp",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(r||0===r)&&o.buffer.push(r),o.buffer.push("</span>\n        </a>\n    \n        <br><br>\n    \n        <blockquote>\n          <p>"),r=n._triageMustache.call(t,"move.text",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(r||0===r)&&o.buffer.push(r),o.buffer.push(' TGM.</p>\n        </blockquote>\n    \n        <ul class="nav nav-pills navbar-warning">\n\n        </ul>\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n<br><br>'),i})}),define("tgm/templates/index",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var r,i,l,u="",f=n.helperMissing,c=this.escapeExpression;return r=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(r||0===r)&&o.buffer.push(r),o.buffer.push("\n\n<h2>Latest TGM</h2>\n<hr>\n\n"),o.buffer.push(c((i=n.render||t&&t.render,l={hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","ID"],data:o},i?i.call(t,"move","firstObject",l):f.call(t,"render","move","firstObject",l)))),u})}),define("tgm/templates/jumbo",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function r(e,t){var s,a,o,r="";return t.buffer.push('\n<div class="jumbotron">\n  <div class="container">\n    <div class="row">\n      <div class="col-sm-3">\n        <img src="/assets/img/grandmother-080b005f592e5696e20847f1fdb8b658.png" class="img-responsive"/>\n      </div>\n      <div class="col-sm-9">\n        <h1>My gosh, look at how big you\'ve gotten!</h1>\n        <p></p>\n        <p>'),a=n["link-to"]||e&&e["link-to"],o={hash:{"class":"btn btn-primary btn-lg",role:"button"},hashTypes:{"class":"STRING",role:"STRING"},hashContexts:{"class":e,role:e},inverse:u.noop,fn:u.program(2,i,t),contexts:[e],types:["STRING"],data:t},s=a?a.call(e,"popular",o):f.call(e,"link-to","popular",o),(s||0===s)&&t.buffer.push(s),t.buffer.push("</p>\n      </div>\n    </div>\n\n  </div>\n</div>\n"),r}function i(e,t){t.buffer.push("#TGM")}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var l,u=this,f=n.helperMissing;l=n["if"].call(t,"show",{hash:{},hashTypes:{},hashContexts:{},inverse:u.noop,fn:u.program(1,r,o),contexts:[t],types:["ID"],data:o}),o.buffer.push(l||0===l?l:"")})}),define("tgm/templates/move",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function r(e,t){var s,a="";return t.buffer.push('\n          <span class="label label-default"><span class="glyphicon glyphicon-time"></span> '),s=n._triageMustache.call(e,"created_at",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(s||0===s)&&t.buffer.push(s),t.buffer.push("</span>\n        "),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var i,l,u,f="",c=this,p=n.helperMissing,h=this.escapeExpression;return o.buffer.push('<div class="row">\n  <div class="col-sm-12">\n    \n    <div class="panel panel-default">\n      <div class="panel-body">\n        '),l=n["link-to"]||t&&t["link-to"],u={hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,r,o),contexts:[t,t],types:["STRING","ID"],data:o},i=l?l.call(t,"move","id",u):p.call(t,"link-to","move","id",u),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n    \n        <br><br>\n    \n        <blockquote>\n          <p>"),i=n._triageMustache.call(t,"text",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push(' TGM.</p>\n        </blockquote>\n    \n        <ul class="nav nav-pills navbar-warning">\n          <li '),o.buffer.push(h(n["bind-attr"].call(t,{hash:{"class":"vote.down:active"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:o}))),o.buffer.push(">\n            <a class='text-danger' href='#' "),o.buffer.push(h(n.action.call(t,"downvoteAction",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}))),o.buffer.push('>\n              <span class="glyphicon glyphicon-thumbs-down"></span> \n              That\'s nice, dear.\n              <span class="badge alert-danger">'),i=n._triageMustache.call(t,"downvotes",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("</span>\n            </a>\n          </li>\n          <li "),o.buffer.push(h(n["bind-attr"].call(t,{hash:{"class":"vote.up:active"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:o}))),o.buffer.push(">\n            <a move='123' href='#' "),o.buffer.push(h(n.action.call(t,"upvoteAction",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}))),o.buffer.push('>\n              <span class="glyphicon glyphicon-thumbs-up"></span>\n              Well now, isn\'t that just wonderful!\n              <span class="badge">'),i=n._triageMustache.call(t,"upvotes",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("</span>\n            </a>\n          </li>\n        </ul>\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n<br/><br/>"),f})}),define("tgm/templates/moves",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var r;r=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),o.buffer.push(r||0===r?r:"")})}),define("tgm/templates/moves/index",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function r(e,t){var s,a,o="";return t.buffer.push("\n      "),t.buffer.push(f((s=n.render||e&&e.render,a={hash:{},hashTypes:{},hashContexts:{},contexts:[e,e],types:["STRING","ID"],data:t},s?s.call(e,"move","",a):u.call(e,"render","move","",a)))),t.buffer.push("\n    "),o}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var i,l="",u=n.helperMissing,f=this.escapeExpression,c=this;return o.buffer.push('<div class="row">\n  <div class="col-sm-12">\n    '),i=n.each.call(t,{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,r,o),contexts:[],types:[],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n  </div>\n</div>"),l})}),define("tgm/templates/moves/new",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var r,i,l="",u=n.helperMissing,f=this.escapeExpression;return o.buffer.push('<div class="row">\n  <div class="col-sm-12">\n    <h1>It\'s so nice to hear from you, dear!</h1>\n  </div>\n</div>\n\n'),o.buffer.push(f((r=n["move-form"]||t&&t["move-form"],i={hash:{submit:"createMove"},hashTypes:{submit:"STRING"},hashContexts:{submit:t},contexts:[],types:[],data:o},r?r.call(t,i):u.call(t,"move-form",i)))),o.buffer.push("\n"),l})}),define("tgm/templates/navigation",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function r(e,t){t.buffer.push("<img src='/assets/img/grandmother-080b005f592e5696e20847f1fdb8b658.png' class='img-responsive pull-left' width='34' style='height:42px;margin-top:9px;margin-right:10px;'>")}function i(e,t){var s,a,o,r="";return t.buffer.push("\n        "),a=n["link-to"]||e&&e["link-to"],o={hash:{tagName:"li",href:!1},hashTypes:{tagName:"STRING",href:"BOOLEAN"},hashContexts:{tagName:e,href:e},inverse:m.noop,fn:m.program(4,l,t),contexts:[e],types:["ID"],data:t},s=a?a.call(e,"location",o):h.call(e,"link-to","location",o),(s||0===s)&&t.buffer.push(s),t.buffer.push("\n      "),r}function l(e,t){var s,a,o="";return t.buffer.push("\n          "),t.buffer.push(d((s=n["link-to"]||e&&e["link-to"],a={hash:{},hashTypes:{},hashContexts:{},contexts:[e,e],types:["ID","ID"],data:t},s?s.call(e,"title","location",a):h.call(e,"link-to","title","location",a)))),t.buffer.push("\n        "),o}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var u,f,c,p="",h=n.helperMissing,d=this.escapeExpression,m=this;return o.buffer.push('<div class="container">\n  <div class="navbar-header">\n    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n      <span class="sr-only">Toggle navigation</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n    \n    '),u=n["if"].call(t,"showLogo",{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(1,r,o),contexts:[t],types:["ID"],data:o}),(u||0===u)&&o.buffer.push(u),o.buffer.push("\n    \n    "),o.buffer.push(d((f=n["link-to"]||t&&t["link-to"],c={hash:{"class":"navbar-brand"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[t,t],types:["ID","STRING"],data:o},f?f.call(t,"title","application",c):h.call(t,"link-to","title","application",c)))),o.buffer.push('\n  </div>\n  <div class="collapse navbar-collapse">\n    <ul class="nav navbar-nav">\n      '),u=n.each.call(t,{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(3,i,o),contexts:[],types:[],data:o}),(u||0===u)&&o.buffer.push(u),o.buffer.push("\n    </ul>\n\n  </div>\n</div>"),p})}),define("tgm/transforms/boolean",["fireplace/transforms/boolean","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("tgm/transforms/date",["fireplace/transforms/date","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("tgm/transforms/hash",["fireplace/transforms/hash","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("tgm/transforms/number",["fireplace/transforms/number","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("tgm/transforms/string",["fireplace/transforms/string","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("tgm/transforms/timestamp",["fireplace/transforms/timestamp","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("tgm/views/jumbo",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.View.extend({templateName:"jumbo"})}),define("tgm/views/navigation",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.View.extend({tagName:"div",classNames:["navbar","navbar-inverse","navbar-fixed-top"],templateName:"navigation"})}),define("tgm/config/environment",["ember"],function(e){var t="tgm";try{var s=t+"/config/environment",n=e["default"].$('meta[name="'+s+'"]').attr("content"),a=JSON.parse(unescape(n));return{"default":a}}catch(o){throw new Error('Could not read config from meta tag with name "'+s+'".')}}),runningTests?require("tgm/tests/test-helper"):require("tgm/app")["default"].create({});