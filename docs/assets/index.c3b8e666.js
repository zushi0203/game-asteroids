const e=document.getElementById("gameCanvas"),t=e.getContext("2d");class a{constructor(){this.scene={},this.currentScene=null,this.currentSceneName=null,this.startTime=null,this.countCurrentScenePerformed=null}init(){this.scene={},this.currentScene=null,this.startTime=null,this.countCurrentScenePerformed=null}add(e,t){this.scene[e]=t}use(e){this.scene.hasOwnProperty(e)&&(this.currentScene=this.scene[e],this.currentSceneName=e,this.startTime=Date.now(),this.countCurrentScenePerformed=-1)}get getCurrentSceneName(){return this.currentSceneName}update(){this.currentScene(),++this.countCurrentScenePerformed}}const r=()=>{t.fillStyle="black",t.fillRect(0,0,e.width,e.height)},s=t=>{t.x<0-t.r?t.x=e.width+t.r:t.x>e.width+t.r&&(t.x=0-t.r),t.y<0-t.r?t.y=e.height+t.r:t.y>e.height+t.r&&(t.y=0-t.r)},i=e=>{e&&(e.explodeTime=Math.ceil(9))};class n{constructor(e){this.param={},this.init(e),this.dead=!1}init(e){this.param={x:e.x+4/3*e.r*Math.cos(e.a),y:e.y-4/3*e.r*Math.sin(e.a),xv:500*Math.cos(e.a)/30,yv:-500*Math.sin(e.a)/30,r:0,dist:0,explodeTime:0}}drawLaser(e){this.param.explodeTime>0?(t.fillStyle="orangered",t.beginPath(),t.arc(this.param.x,this.param.y,.75*e.r,0,2*Math.PI,!1),t.fill(),t.fillStyle="salmon",t.beginPath(),t.arc(this.param.x,this.param.y,.5*e.r,0,2*Math.PI,!1),t.fill(),t.fillStyle="pink",t.beginPath(),t.arc(this.param.x,this.param.y,.25*e.r,0,2*Math.PI,!1),t.fill()):(t.fillStyle="salmon",t.beginPath(),t.arc(this.param.x,this.param.y,2,0,2*Math.PI,!1),t.fill())}updateLasersPosition(){console.log("Laser!");if(this.param.dist>.6*e.width)return void(this.dead=!0);this.param.explodeTime>0||(this.param.x+=this.param.xv,this.param.y+=this.param.yv),this.param.dist+=Math.sqrt(Math.pow(this.param.xv,2)+Math.pow(this.param.yv,2)),s(this.param)}isDead(){return this.dead}update(e){this.drawLaser(e),this.updateLasersPosition()}}let h={};const o=()=>h,l=()=>h.blinkNum>0,c=()=>h.explodeTime>0,m=()=>h.dead,p=()=>{let e={x:null,y:null};h.thrusting&&!h.dead?(e.x=h.thrust.x+=5*Math.cos(h.a)/30,e.y=h.thrust.y-=5*Math.sin(h.a)/30):(e.x=h.thrust.x-=.2*h.thrust.x/30,e.y=h.thrust.y-=.2*h.thrust.y/30),(e=>{h.thrust.x=e.x,h.thrust.y=e.y})(e)},d=()=>{l()&&(h.blinkTime--,0==h.blinkTime&&(h.blinkTime=Math.ceil(3),h.blinkNum--))},u=e=>{let t=2*Math.PI/30;e&&(t*=e),h.rotate=t},y=()=>{h.rotate=0},M=()=>({x:e.width/2,y:e.height/2,r:15,a:.5*Math.PI,targetPosition:{x:null,y:null},blinkNum:Math.ceil(30),blinkTime:Math.ceil(3),canShoot:!0,explodeTime:0,dead:!1,lives:3,lasers:[],rotate:0,thrusting:!1,thrust:{x:0,y:0}}),x=e=>{let t=M();t.lives=e,h=t},f=()=>{if(h.lives>0||(h.dead=!0),h.dead)return;const e=h.blinkNum%2==0;var a;c()||(p(),h.a+=h.rotate,h.x+=h.thrust.x,h.y+=h.thrust.y),c()?(a=h,t.fillStyle="darkred",t.beginPath(),t.arc(a.x,a.y,1.7*a.r,0,2*Math.PI,!1),t.fill(),t.fillStyle="red",t.beginPath(),t.arc(a.x,a.y,1.4*a.r,0,2*Math.PI,!1),t.fill(),t.fillStyle="orange",t.beginPath(),t.arc(a.x,a.y,1.1*a.r,0,2*Math.PI,!1),t.fill(),t.fillStyle="yellow",t.beginPath(),t.arc(a.x,a.y,.8*a.r,0,2*Math.PI,!1),t.fill(),t.fillStyle="white",t.beginPath(),t.arc(a.x,a.y,.5*a.r,0,2*Math.PI,!1),t.fill(),(e=>{if(e.explodeTime--,e.explodeTime>0)return;const t=e.lives-1;x(t)})(h)):e?(((e,a)=>{t.strokeStyle=e.thrusting?"yellow":"white",t.lineWidth=30/a,t.beginPath(),t.moveTo(e.x+4/3*e.r*Math.cos(e.a),e.y-4/3*e.r*Math.sin(e.a)),t.lineTo(e.x-e.r*(2/3*Math.cos(e.a)+Math.sin(e.a)),e.y+e.r*(2/3*Math.sin(e.a)-Math.cos(e.a))),t.lineTo(e.x-e.r*(2/3*Math.cos(e.a)-Math.sin(e.a)),e.y+e.r*(2/3*Math.sin(e.a)+Math.cos(e.a))),t.closePath(),t.stroke(),t.fillStyle="darkred",t.beginPath(),t.arc(e.x+4/3*e.r*Math.cos(e.a),e.y-4/3*e.r*Math.sin(e.a),.2*e.r,0,2*Math.PI,!1),t.fill()})(h,20),d()):d(),s(h),h.lasers.forEach(((e,t)=>{e.isDead()?h.lasers.splice(t,1):e.update(h)}))},g=e=>{if(Object.keys(h).length&&!m())switch(e.code){case"KeyX":i(h);break;case"Space":(()=>{if(h.canShoot&&h.lasers.length<10){const e=new n(h);h.lasers.push(e)}h.canShoot=!1,console.log("shoot",h.lasers)})(),h.canShoot=!1;break;case"ArrowLeft":u();break;case"ArrowUp":h.thrusting=!0;break;case"ArrowRight":u(-1)}},P=e=>{if(!m())switch(e.code){case"Space":h.canShoot=!0;break;case"ArrowLeft":y();break;case"ArrowUp":h.thrusting=!1;break;case"ArrowRight":y()}},v=e=>{if(m())return;console.log("playerHandle: click");const t={x:e.layerX,y:e.layerY};var a;a=t,h.targetPosition=a;const r=(s=h.x,i=h.y,n=h.targetPosition.x,o=h.targetPosition.y,Math.atan2(n-s,o-i)-.5*Math.PI);var s,i,n,o,l;l=r,h.a=l,console.log("playerHandleClick: player",h);const[c,p]=[h.targetPosition.x-h.x,h.targetPosition.y-h.y];(e=>{h.thrust.x+=e.x,h.thrust.y+=e.y})({x:c/30,y:p/30})};class w{constructor(e,t,a){this.param,this.level=e,this.initialize(t,a)}createParam(e,t,a){const r=1+.1*this.level,s={x:e,y:t,xv:50*Math.random()*r/30*(Math.random()<.5?1:-1),yv:50*Math.random()*r/30*(Math.random()<.5?1:-1),r:a,a:Math.random()*Math.PI*2,vert:Math.floor(11*Math.random()+5),offs:[]};return[...Array(s.vert)].map((e=>{s.offs.push(.2*Math.random()*2+1-.2)})),s}initialize(t,a){let r,s,i;if(!1===t)r=a.posX,s=a.posY,i=a.size;else{do{r=Math.floor(Math.random()*e.width),s=Math.floor(Math.random()*e.height)}while(n=t.x,h=t.y,o=r,l=s,Math.sqrt(Math.pow(o-n,2)+Math.pow(l-h,2))<200+t.r);i=Math.ceil(50)}var n,h,o,l;const c=this.createParam(r,s,i);this.param=c}draw(){var e;e=this.param,t.lineWidth=1.5,t.strokeStyle="red",t.beginPath(),t.moveTo(e.x+e.r*e.offs[0]*Math.cos(e.a),e.y+e.r*e.offs[0]*Math.sin(e.a)),[...Array(e.vert)].map(((a,r)=>{t.lineTo(e.x+e.r*e.offs[r]*Math.cos(e.a+r*Math.PI*2/e.vert),e.y+e.r*e.offs[r]*Math.sin(e.a+r*Math.PI*2/e.vert))})),t.closePath(),t.stroke()}updatePosition(){let e=this.param.x,t=this.param.y;e+=this.param.xv,t+=this.param.yv,this.param.x=e,this.param.y=t,s(this.param)}update(){this.draw(),this.updatePosition()}}const S=(e,t,a)=>{const r=((e,t)=>{const a=t.param.r==Math.ceil(50),r=t.param.r==Math.ceil(25);let s=[];return console.log(t),a?(console.log("isBigEnemy"),s.push(new w(e,!1,{posX:t.param.x,posY:t.param.y,size:Math.ceil(25)})),s.push(new w(e,!1,{posX:t.param.x,posY:t.param.y,size:Math.ceil(25)}))):r&&(console.log("small"),s.push(new w(e,!1,{posX:t.param.x,posY:t.param.y,size:Math.ceil(12.5)})),s.push(new w(e,!1,{posX:t.param.x,posY:t.param.y,size:Math.ceil(12.5)}))),s})(e,t[a]),s=[...t];s.splice(a,1);return s.concat(r)},b=e=>{if(r(),f(),e.enemies.forEach((e=>{e.update()})),l()||c())return;const t=o();e.enemies.forEach(((a,r)=>{var s,n,h,o;(s=t.x,n=t.y,h=a.param.x,o=a.param.y,Math.sqrt(Math.pow(h-s,2)+Math.pow(o-n,2))<t.r+a.param.r)&&(i(t),console.log("before: ",e.enemies),e.enemies=S(e.level,e.enemies,r),console.log("after: ",e.enemies))}))},k=e=>{h=M();const t=o();[...Array(3*e.level)].map((a=>{const r=new w(e.level,t);e.enemies.push(r)})),r()},T={initGame:(e,t)=>{k(e),t.use("game")},game:(e,t)=>{m()&&t.use("gameover"),b(e)},gameover:(e,t)=>{console.log("gameOver")},debugPlayer:(e,t)=>{r(),f()}};const I=new class{constructor(){this.state={level:1,enemies:[]},this.scene=new a,this.setupEventHandle(),this.setupScene(),this.init()}init(){this.state={level:1,enemies:[]},this.scene.use("initGame")}setupScene(){this.scene.init(),Object.keys(T).forEach((e=>{this.scene.add(e,(()=>{T[e](this.state,this.scene)}))}))}setupEventHandle(){document.addEventListener("keydown",(e=>{console.log("keydown"),"KeyR"==e.code&&this.init(),g(e)})),document.addEventListener("keyup",(e=>{P(e)})),e.addEventListener("click",(e=>{e.preventDefault(),v(e)})),e.oncontextmenu=e=>{e.preventDefault(),v(e)}}render(){this.scene.update()}};let E,A,L,C;const N=()=>{requestAnimationFrame(N),A=Date.now(),C=A-L,C>E&&(L=A-C%E,I.render())};E=1e3/30,L=Date.now(),N();
