(function(e){function t(t){for(var r,c,o=t[0],s=t[1],u=t[2],d=0,b=[];d<o.length;d++)c=o[d],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&b.push(i[c][0]),i[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(b.length)b.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==i[s]&&(r=!1)}r&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},i={app:0},a=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var o=this["webpackJsonp"]=this["webpackJsonp"]||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"05a8":function(e,t,n){"use strict";n("52c3")},2523:function(e,t,n){"use strict";n("8d5f")},"39ac":function(e,t,n){"use strict";n("8b9a")},"52c3":function(e,t,n){},"5e66":function(e,t,n){},"8b78":function(e,t,n){},"8b9a":function(e,t,n){},"8d5f":function(e,t,n){},"9cdc":function(e,t,n){"use strict";n("c701")},"9fe4":function(e,t,n){"use strict";n("5e66")},c701:function(e,t,n){},c827:function(e,t,n){"use strict";n("8b78")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),i={class:"view"},a={class:"view__nav nav"},c=Object(r["f"])("Home"),o=Object(r["f"])("Gomoku"),s={class:"view__content"};function u(e,t,n,u,l,d){var b=Object(r["y"])("router-link"),f=Object(r["y"])("router-view");return Object(r["q"])(),Object(r["d"])("div",i,[Object(r["g"])("div",a,[Object(r["g"])("div",null,[Object(r["g"])(b,{to:"/"},{default:Object(r["D"])((function(){return[c]})),_:1})]),Object(r["g"])("div",null,[Object(r["g"])(b,{to:"/gomoku"},{default:Object(r["D"])((function(){return[o]})),_:1})])]),Object(r["g"])("div",s,[Object(r["g"])(f)])])}n("9cdc");const l={};l.render=u;var d=l,b=n("6c02"),f=Object(r["E"])("data-v-9ef05d8c");Object(r["u"])("data-v-9ef05d8c");var h={id:"game",class:"outer-container"},v={class:"board-container"},p={key:3,class:"game-board"};Object(r["r"])();var O=f((function(e,t,n,i,a,c){var o,s=Object(r["y"])("InformationBar"),u=Object(r["y"])("SelectOptions"),l=Object(r["y"])("BoardView");return Object(r["q"])(),Object(r["d"])("div",h,[e.shoudShowGameTopBar?(Object(r["q"])(),Object(r["d"])(s,{key:0,infos:e.playerScores,onClickHardReset:e.resetGame},null,8,["infos","onClickHardReset"])):Object(r["e"])("",!0),Object(r["g"])("div",v,["GAME_CHOICE"==e.phrase?(Object(r["q"])(),Object(r["d"])(u,{key:0,title:"Select Mode",options:e.modeOptions,onClickItem:e.chooseMode},null,8,["options","onClickItem"])):Object(r["e"])("",!0),"GAME_STARTER"==e.phrase?(Object(r["q"])(),Object(r["d"])(u,{key:1,title:"Choose X or O?",backButton:"display",options:e.symbolOptions,onClickItem:e.firstGame,onClickBack:e.toGameChoice},null,8,["options","onClickItem","onClickBack"])):Object(r["e"])("",!0),"GAME_SELECT_COM"==e.phrase?(Object(r["q"])(),Object(r["d"])(u,{key:2,title:"Choose Computer Agent",backButton:"display",options:e.computerAgentOptions,onClickItem:e.selectComputerAI,onClickBack:e.toGameChoice},null,8,["options","onClickItem","onClickBack"])):Object(r["e"])("",!0),e.shouldShowGameBoard?(Object(r["q"])(),Object(r["d"])("div",p,[Object(r["g"])(l,{board:null===(o=e.game)||void 0===o?void 0:o.board.cells,"game-end-message":e.gameEndMessage,onClickReset:e.reset,onClickCell:e.playerTurn},null,8,["board","game-end-message","onClickReset","onClickCell"])])):Object(r["e"])("",!0)])])})),m=(n("7db0"),n("caad"),n("b0c0"),n("d4ec")),y=n("bee2"),j=n("262e"),g=n("2caf"),k=n("9ab4"),_=n("ce1f"),w=Object(r["E"])("data-v-4fce2be1");Object(r["u"])("data-v-4fce2be1");var C={class:"board",ref:"boardElement"};Object(r["r"])();var E=w((function(e,t,n,i,a,c){return Object(r["q"])(),Object(r["d"])("div",C,[n.gameEndMessage?(Object(r["q"])(),Object(r["d"])("div",{key:0,class:"board__game-end-message",onClick:t[1]||(t[1]=function(t){return e.$emit("click-reset")})},[Object(r["g"])("p",null,Object(r["A"])(n.gameEndMessage),1)])):Object(r["e"])("",!0),(Object(r["q"])(!0),Object(r["d"])(r["a"],null,Object(r["x"])(n.board,(function(t,n){return Object(r["q"])(),Object(r["d"])(r["a"],null,[(Object(r["q"])(!0),Object(r["d"])(r["a"],null,Object(r["x"])(t,(function(t,i){return Object(r["q"])(),Object(r["d"])("div",{key:n+"_"+i,class:"board__cell",onClick:function(t){return e.$emit("click-cell",{r:n,c:i})}},Object(r["A"])(t.value),9,["onClick"])})),128))],64)})),256))],512)})),P={props:{board:{type:Array,required:!0},gameEndMessage:{type:String,default:""}},setup:function(e){var t=Object(r["w"])(null);return Object(r["o"])((function(){t.value.style.setProperty("--cell-number",e.board.length)})),{boardElement:t}}};n("05a8");P.render=E,P.__scopeId="data-v-4fce2be1";var S=P,A=Object(r["E"])("data-v-604b3f16");Object(r["u"])("data-v-604b3f16");var x={class:"select-options"},G={class:"select-options__header"},M={class:"select-options__list"},q=Object(r["g"])("i",{class:"fa fa-arrow-left"},null,-1),T=Object(r["f"])(" Back ");Object(r["r"])();var I=A((function(e,t,n,i,a,c){return Object(r["q"])(),Object(r["d"])("div",x,[Object(r["g"])("p",G,Object(r["A"])(n.title),1),Object(r["g"])("div",M,[(Object(r["q"])(!0),Object(r["d"])(r["a"],null,Object(r["x"])(n.options,(function(t,n){return Object(r["q"])(),Object(r["d"])("div",{key:n,class:"select-options__item",onClick:function(n){return e.$emit("click-item",t.value)}},Object(r["A"])(t.text),9,["onClick"])})),128))]),"none"!=n.backButton?(Object(r["q"])(),Object(r["d"])("div",{key:0,class:"select-options__back-button",onClick:t[1]||(t[1]=function(t){return e.$emit("click-back")})},[q,T])):Object(r["e"])("",!0)])})),B=["none","display"],R={props:{title:{type:String,required:!0},options:{type:Array,required:!0},backButton:{type:String,default:"none",validator:function(e){return B.includes(e)}}}};n("9fe4");R.render=I,R.__scopeId="data-v-604b3f16";var N=R,L=Object(r["E"])("data-v-4cd4da09");Object(r["u"])("data-v-4cd4da09");var Y={class:"information-bar"},z={class:"information-bar__infos infos"},H={key:0,class:"infos__item-text"},W={key:1,class:"infos__child"},X={class:"infos__child-label"},D={class:"infos__child-value"},$={class:"information-bar__control-section"};Object(r["r"])();var J=L((function(e,t,n,i,a,c){return Object(r["q"])(),Object(r["d"])("div",Y,[Object(r["g"])("div",z,[(Object(r["q"])(!0),Object(r["d"])(r["a"],null,Object(r["x"])(n.infos,(function(e,t){return Object(r["q"])(),Object(r["d"])("div",{key:t,class:"infos__item"},[e.text?(Object(r["q"])(),Object(r["d"])("div",H,Object(r["A"])(e.text),1)):Object(r["e"])("",!0),e.lists?(Object(r["q"])(),Object(r["d"])("div",W,[(Object(r["q"])(!0),Object(r["d"])(r["a"],null,Object(r["x"])(e.lists,(function(e,t){return Object(r["q"])(),Object(r["d"])("div",{key:t,class:"infos__child-item"},[Object(r["g"])("span",X,Object(r["A"])(e.text),1),Object(r["g"])("span",D,Object(r["A"])(e.value),1)])})),128))])):Object(r["e"])("",!0)])})),128))]),Object(r["g"])("div",$,[Object(r["g"])("div",{class:"button",onClick:t[1]||(t[1]=function(t){return e.$emit("click-hard-reset")})},"Reset All")])])})),V={props:{infos:{type:Array,required:!0}}};n("2523");V.render=J,V.__scopeId="data-v-4cd4da09";var F=V,U=["X","O"],K="",Q=14,Z=(n("13d5"),n("45fc"),n("0644")),ee=n.n(Z),te=function(){function e(t,n,r){Object(m["a"])(this,e),this.value="",this.x=t,this.y=n,r&&(this.value=r)}return Object(y["a"])(e,[{key:"setValue",value:function(e){this.value=e}},{key:"isSet",value:function(){return this.value!==K}}]),e}(),ne=[[[0,0],[1,0],[2,0],[3,0],[4,0]],[[0,0],[0,1],[0,2],[0,3],[0,4]],[[0,0],[1,1],[2,2],[3,3],[4,4]],[[0,0],[-1,-1],[-2,-2],[-3,-3],[-4,-4]],[[0,0],[-1,1],[-2,2],[-3,3],[-4,4]],[[0,0],[1,-1],[2,-2],[3,-3],[4,-4]]],re=function(){function e(t,n){Object(m["a"])(this,e),this.filledNum=0,this.length=t,n?this.cells=ee()(n):this.initialize()}return Object(y["a"])(e,[{key:"clone",value:function(){return new e(this.length,this.cells)}},{key:"initialize",value:function(){this.initilizeCells()}},{key:"initilizeCells",value:function(){this.cells=[];for(var e=0;e<this.length;e+=1){this.cells[e]=[];for(var t=0;t<this.length;t+=1)this.cells[e][t]=new te(e,t)}}},{key:"checkWin",value:function(){var e=this,t=null,n=this.cells.some((function(n,r){return n.some((function(n,i){return ne.some((function(n){var a=e.cells[r][i].value;if(a===K)return!1;var c=n.reduce((function(t,n){var c=r+n[0],o=i+n[1];return!(c>=e.length||c<0||o>=e.length||o<0)&&(t&&e.cells[c][o].value===a)}),!0);return c&&(t=a),c}))}))}));return n?t:null}},{key:"isMovesLeft",value:function(){return this.cells.some((function(e){return e.some((function(e){return e.value===K}))}))}},{key:"setGo",value:function(e,t,n){this.cells[e][t].setValue(n),this.filledNum+=1}},{key:"isSet",value:function(e,t){return this.cells[e][t].isSet()}}]),e}(),ie=(n("d3b7"),n("96cf"),n("1da1")),ae=n("ebb0"),ce=n.n(ae);function oe(){return new Worker(n.p+"js/worker.530c6c84.worker.js")}var se=new oe,ue=new ce.a(se),le=function(e){return ue.postMessage(JSON.parse(JSON.stringify({type:"message",data:e})))},de={send:le},be=function(){function e(t,n){Object(m["a"])(this,e),this.score=0,this.name=t,this.symbol=n}return Object(y["a"])(e,[{key:"setScore",value:function(e){this.score=e}},{key:"watch",value:function(e,t,n){return new Promise((function(e){e(!0)}))}},{key:"reset",value:function(){return new Promise((function(e){e(!0)}))}},{key:"hardReset",value:function(){return this.score=0,this.reset()}}]),e}(),fe=function(e){Object(j["a"])(n,e);var t=Object(g["a"])(n);function n(e,r,i){var a;return Object(m["a"])(this,n),a=t.call(this,e,r),a.mode=i,de.send({type:"init",color:r,mode:i}),a}return Object(y["a"])(n,[{key:"watch",value:function(e,t,n){return de.send({type:"watch",r:e,c:t,color:n})}},{key:"reset",value:function(){return de.send({type:"init",color:this.symbol,mode:this.mode})}},{key:"hardReset",value:function(){return this.score=0,this.reset()}},{key:"findBestMove",value:function(){var e=Object(ie["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==t.filledNum){e.next=2;break}return e.abrupt("return",{r:7,c:7});case 2:if(1!==t.filledNum){e.next=6;break}if(n=[{r:6,c:6},{r:6,c:7},{r:6,c:8},{r:7,c:6},{r:7,c:7},{r:7,c:8},{r:8,c:6},{r:8,c:7},{r:8,c:8}].find((function(e){var n=e.r,r=e.c;return!t.isSet(n,r)})),!n){e.next=6;break}return e.abrupt("return",n);case 6:return e.abrupt("return",de.send({type:"compute"}));case 7:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),n}(be),he=function(){function e(t,n,r){Object(m["a"])(this,e),this.turn="X",this.winner=null,this.playing=!1,this.player1=t,this.player2=n,this.board=new re(r||Q)}return Object(y["a"])(e,[{key:"initialize",value:function(){this.board.initialize(),this.winner=null}},{key:"randomPlayer",value:function(){var e=Math.floor(2*Math.random()+1);return 1===e?"X":"O"}},{key:"getPlayerBySymbol",value:function(e){return this.player1.symbol===e?this.player1:this.player2}},{key:"start",value:function(){var e=this;this.playing=!0,this.turn=this.randomPlayer(),setTimeout((function(){e.isComputerPlayer(e.currentPlayer())&&e.computerTurn()}),0)}},{key:"currentPlayer",value:function(){return this.getPlayerBySymbol(this.turn)}},{key:"isComputerPlayer",value:function(e){return e instanceof fe}},{key:"computerTurn",value:function(){var e=this,t=this.currentPlayer();this.isComputerPlayer(t)&&t.findBestMove(this.board).then((function(n){n&&(e.board.setGo(n.r,n.c,t.symbol),e.player1.watch(n.r,n.c,t.symbol),e.player2.watch(n.r,n.c,t.symbol),e.endTurn())}))}},{key:"playerTurn",value:function(e){var t=e.r,n=e.c;if(!this.board.isSet(t,n)&&this.playing&&!this.isComputerPlayer(this.currentPlayer())){var r=this.turn;this.board.setGo(t,n,r),this.player1.watch(t,n,r),this.player2.watch(t,n,r),this.endTurn()}}},{key:"endTurn",value:function(){var e=this;if(this.playing){var t=this.board.checkWin(),n=t?this.getPlayerBySymbol(t):null;if(n)return this.playing=!1,this.winner=n,void(this.winner.score+=1);this.board.isMovesLeft()?(this.turn=this.nextTurn(),setTimeout((function(){e.isComputerPlayer(e.currentPlayer())&&e.computerTurn()}),0)):this.playing=!1}}},{key:"nextTurn",value:function(){return"X"===this.turn?"O":"X"}}]),e}(),ve="",pe=[{text:"One Player",value:"ONE_PLAYER"},{text:"Two Player",value:"TWO_PLAYER"}],Oe=[{text:"X",value:"X"},{text:"O",value:"O"}],me=[{text:"Novice",value:"novice"},{text:"Medium",value:"medium"},{text:"Expert",value:"expert"}],ye=function(e){Object(j["a"])(n,e);var t=Object(g["a"])(n);function n(){var e;return Object(m["a"])(this,n),e=t.apply(this,arguments),e.phrase="GAME_CHOICE",e.mode="ONE_PLAYER",e.ai="novice",e.game=null,e}return Object(y["a"])(n,[{key:"initializeGame",value:function(){this.game&&(this.game.board.initialize(),this.game.player1.reset(),this.game.player2.reset(),this.game.winner=null)}},{key:"chooseMode",value:function(e){this.mode=e,this.toGameStarter(),"TWO_PLAYER"!==this.mode?this.toSelectComputer():this.toGameStarter()}},{key:"toGameStarter",value:function(){this.phrase="GAME_STARTER"}},{key:"toGameChoice",value:function(){this.phrase="GAME_CHOICE"}},{key:"toSelectComputer",value:function(){this.phrase="GAME_SELECT_COM"}},{key:"selectComputerAI",value:function(e){this.ai=e,this.toGameStarter()}},{key:"firstGame",value:function(e){var t=U.find((function(t){return t!==e}))||"X";this.game="TWO_PLAYER"===this.mode?new he(new be("Player 1",e),new be("Player 2",t)):new he(new be("Player 1",e),new fe("Computer",t,this.ai)),this.phrase="PLAYING",this.game.start()}},{key:"playerTurn",value:function(e){this.game&&this.game.playerTurn(e)}},{key:"resetGame",value:function(){this.game&&this.game.player1&&this.game.player2&&(this.game.player1.hardReset(),this.game.player2.hardReset(),this.game.board.initialize(),this.phrase="GAME_CHOICE")}},{key:"reset",value:function(){this.game&&(this.initializeGame(),this.game.start())}},{key:"playerScores",get:function(){var e,t,n,r,i,a,c,o;return[{text:this.turnStatus,lists:[]},{text:"",lists:[{text:(null===(e=this.game)||void 0===e||null===(t=e.player1)||void 0===t?void 0:t.name)||"",value:(null===(n=this.game)||void 0===n||null===(r=n.player1)||void 0===r?void 0:r.score)||0},{text:(null===(i=this.game)||void 0===i||null===(a=i.player2)||void 0===a?void 0:a.name)||"",value:(null===(c=this.game)||void 0===c||null===(o=c.player2)||void 0===o?void 0:o.score)||0}]}]}},{key:"shoudShowGameTopBar",get:function(){return["PLAYING","END"].includes(this.phrase)}},{key:"shouldShowGameBoard",get:function(){return["PLAYING","END"].includes(this.phrase)}},{key:"gameEndMessage",get:function(){var e,t;return"PLAYING"!==this.phrase||(null===(e=this.game)||void 0===e?void 0:e.playing)?ve:(null===(t=this.game)||void 0===t?void 0:t.winner)?"TWO_PLAYER"===this.mode?"".concat(this.game.winner.name," wins!! :D "):this.game.winner===this.game.player2?"Uh oh, you lost..":"You Won!!!":"It was a draw.."}},{key:"turnStatus",get:function(){var e;if("PLAYING"!==this.phrase)return this.gameEndMessage;var t=null===(e=this.game)||void 0===e?void 0:e.getPlayerBySymbol(this.game.turn);return"".concat(null===t||void 0===t?void 0:t.name,"'s turn")}},{key:"modeOptions",get:function(){return pe}},{key:"symbolOptions",get:function(){return Oe}},{key:"computerAgentOptions",get:function(){return me}}]),n}(_["b"]);ye=Object(k["a"])([Object(_["a"])({components:{BoardView:S,SelectOptions:N,InformationBar:F}})],ye);var je=ye;n("39ac");je.render=O,je.__scopeId="data-v-9ef05d8c";var ge=je,ke=Object(r["E"])("data-v-486b7a86");Object(r["u"])("data-v-486b7a86");var _e={class:"home"},we=Object(r["g"])("h1",null,"Welcome to LenGames",-1);Object(r["r"])();var Ce=ke((function(e,t,n,i,a,c){return Object(r["q"])(),Object(r["d"])("div",_e,[we])})),Ee={name:"Home"};n("c827");Ee.render=Ce,Ee.__scopeId="data-v-486b7a86";var Pe=Ee,Se=[{path:"/",name:"Home",component:Pe},{path:"/gomoku",name:"Gomoku",component:ge}],Ae=Object(b["a"])({history:Object(b["b"])("/"),routes:Se}),xe=Ae,Ge=n("9483");Object(Ge["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),Object(r["c"])(d).use(xe).mount("#app")}});
//# sourceMappingURL=app.8827b877.js.map