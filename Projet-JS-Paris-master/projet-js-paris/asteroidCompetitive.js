let canvas;
let ctx;
let canvasWidth = 1400; // on va les utiliser bcp pour les positionner au bon endroit
let canvasHeight = 1000;
let keys = []; // il permet de garder les touches un certain moment pour faire plusieur manip
let deuxJoueur= true;
let vaisseaux1
let vaisseaux2 
let bullets = [];
let bullets2 = [];
let pause=false;
let tempX =[];
let tempy = [];
//let bulletsoctogone=[]; pour le mode 1v1
let asteroids = [];
let score1 = 0;
let score2=0;
let livesj1= 3;
let livesj2= 3;

document.addEventListener('DOMContentLoaded',SetupCanvas); // setup fonction pour la page et run le code
setInterval(myTimer, 00);

function myTimer() {
  const d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx= canvas.getContext('2d');
    canvas.width= canvasWidth;
    canvas.height= canvasHeight;
    ctx.fillStyle='black';
    vaisseaux1=  new Vaisseaux();
    vaisseaux2= new Vaisseaux();
    for(let i = 0;i<8;i++){ // ici il aura 8 asteroids
        asteroids.push(new Asteroid());
    }
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.body.addEventListener("keydown",function(e){// ici ce fera les touche maintenu pour eviter de repeter
        keys[e.keyCode]=true;
    });
    document.body.addEventListener("keyup",function(e){
        keys[e.keyCode]=false;
        if (deuxJoueur===false){
            if(e.key==="2"){
                deuxJoueur = true;
            }
        }
       if (e.keyCode===32 && vaisseaux1.visible===true){
        bullets.push(new Bullet(vaisseaux1.angle,vaisseaux1.noseX,vaisseaux1.noseY,vaisseaux1.couleurV));
        // bullets.push(new Bullet(vaisseaux2.angle,vaisseaux2.noseX,vaisseaux2.noseY,vaisseaux2.couleurV));
       }
       if (deuxJoueur===true && e.keyCode ===96 &&vaisseaux2.visible===true){ // ici les balle du joueur 2 
        console.log("test")
        bullets2.push(new Bullet(vaisseaux2.angle,vaisseaux2.noseX,vaisseaux2.noseY,vaisseaux2.couleurV));
        
       }
       if (e.key==="1"){  
        pause=true;
       }
       if (e.key === "5"&& pause===true){
        pause = false;
       }
       
    // if (e.key==="r"&& deuxJoueur===true && livesj1<=0 && livesj2<=0){
    //     livesj1 =3;
    //     livesj2 =3;
    //     score = 0;
    //     vaisseaux1.x=canvasWidth/2;
    //     vaisseaux1.y=canvasHeight/2;
    //     vaisseaux1.visible=true;
    //     vaisseaux2.x=canvasWidth/2;
    //     vaisseaux2.y=canvasHeight/2;
    //     vaisseaux2.visible=true;
    // }else{
        if (e.key==="r"&& livesj1 <=0 || (livesj2 <=0&& deuxJoueur===true&& livesj1<=0&&e.key==="r")){
            livesj1 =3;
            livesj2 =3;
            score1 = 0;
            score2 = 0;
            vaisseaux1.x=canvasWidth/2;
            vaisseaux1.y=canvasHeight/2;
            vaisseaux1.visible=true;
            vaisseaux2.x=canvasWidth/2;
        vaisseaux2.y=canvasHeight/2;
        vaisseaux2.visible=true;
        }
    });
Render();
}
class Vaisseaux {
    constructor(){
        this.visible=true;
        this.x = canvasWidth/ 2;
        this.y = canvasHeight / 2; // ici on place le vaisseaux au milieu
        this.movmentAvant=false;
        this.speed = 0.1;
        this.velX=0;
        this.velY=0;
        this.rotateSpeed=0.001;
        this.radius=15;
        this.angle=0;
        this.couleurV='white';
        this.noseX= canvasWidth/2+15;
        this.noseY=canvasHeight/2;
    }
    Rotate(dir){
        this.angle += this.rotateSpeed*dir;
    }
    Update(){
        let radians = this.angle / Math.PI * 180; // on convertis un rayon en cercle
        if (pause===false){
        if (this.movmentAvant){// de la trigonometrie cos sin pour permettre de bouger le vaisseaux en fonction de son angle
            this.velX += Math.cos(radians)*this.speed;
            this.velY += Math.sin(radians)*this.speed;
        }
    }
        if (this.x < this.radius){// si le vaisseau va a l'opposer de l'ecran
            this.x = canvas.width;
        }
        if(this.x > canvas.width){
            this.x = this.radius;
        }
        if(this.y < this.radius){
            this.y = canvas.height;
        }
        if (this.y > canvas.height) {
            this.y = this.radius;
        }
        if (pause ===false){
        this.velX *= 0.99; // on va regler la vitesse pour qu'il descende
        this.velY *= 0.99;
        this.x -= this.velX;
        this.y -= this.velY;
        }
    }
    Draw(){
        ctx.strokeStyle = this.couleurV;
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 3); // ici on créé la forme du vaisseau
        let radians = this.angle / Math.PI * 180;
        this.noseX=this.x-this.radius*Math.cos(radians);//ici c'est pour stabiliser le tir au meme endroit le x ici est la position dans le canvas
        this.noseY=this.y-this.radius*Math.sin(radians);
        for (let i = 0; i < 3; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
    }

// let vaisseaux1 = new Vaisseaux();
// let vaisseaux2 = new Vaisseaux();
function commandVaiseaux1(){
    vaisseaux1.movmentAvant=(keys[90]);
    if(keys[68]){
        vaisseaux1.Rotate(1);
    }
    if(keys[81]){
        vaisseaux1.Rotate(-1);
    }
}
function commandVaiseaux2(){
    vaisseaux2.movmentAvant=(keys[38]);
    if(keys[37]){
        vaisseaux2.Rotate(1);
    }
    if(keys[39]){
        vaisseaux2.Rotate(-1);
    }
}
function playerOne(){
    vaisseaux1.Update();
    vaisseaux1.Draw();
}
function playerTwo(){
    vaisseaux2.Update();
    vaisseaux2.Draw();
}

class Bullet{
    constructor(angle,shipNosex,shipNosey,color){ // pour introduire plus de joueur
        this.visible=true;
        this.x = shipNosex;
        this.y = shipNosey;
        this.angle= angle;
        this.height=4;
        this.width =4;
        this.speed = 5;
        this.velX=0;
        this.velY=0;
        this.shipcolor= color;
    }
    Update(){
        var radians= this.angle / Math.PI*180;
        if(pause===false){
        this.x -= Math.cos(radians)*this.speed;
        this.y -= Math.sin(radians)* this.speed;
        }
    }
    Draw(){
        ctx.fillStyle = this.shipcolor;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
class Asteroid{
    constructor(x,y,radius,level,collisionRadius){
        this.visible=true;
        this.x= x || Math.floor(Math.random()* canvasWidth);
        this.y= y || Math.floor(Math.random()* canvasHeight);
        this.speed=1;
        this.radius=radius || 50;
        this.angle= Math.floor(Math.random()*359);
        this.couleurAst='white';
        this.collisionRadius = collisionRadius || 46;
        this.level = level || 1;
    }
    Update(){
        var radians = this.angle/Math.PI*180;
        if (pause ===false){
        this.x += Math.cos(radians)*this.speed;
        this.y += Math.sin(radians)*this.speed; // il donne la vitesse des asteroid pour qu'il avance on diag ou en ligne
        }
        if (this.x < this.radius){// si l'asteroid sort de l'ecran basiquement il s'agit du meme algo que le vaisseaux
            this.x = canvas.width;
        }
        if(this.x > canvas.width){
            this.x = this.radius;
        }
        if(this.y < this.radius){
            this.y = canvas.height;
        }
        if (this.y > canvas.height) {
            this.y = this.radius;
        }
    }
    Draw(){
        ctx.strokeStyle = this.couleurAst;
        ctx.beginPath();
        let vertAngle= ((Math.PI*2)/6);
        var radians = this.angle / Math.PI*180;
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();

    }
}
function Collisioncercle(p1x,p1y,r1,p2x,p2y,r2){ // traduit par position 1 vs position 2 et sont rayon
    let radiusSum;
    let xDiff;
    let yDiff;
    radiusSum = r1+r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;
    if (radiusSum > Math.sqrt((xDiff*xDiff)+(yDiff*yDiff))){
        return true;
    } else {
        return false;
    }

}
function DrawLifeVaisseaux1(){
    let startX = 1350;
    let startY = 10;
    ctx.fillText('P1',startX-100,20);
    let points = [[9,9],[-9,9]];
    ctx.strokeStyle= 'white';
    for (let i = 0; i < livesj1 ; i++){
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        for (let j = 0; j< points.length;j++){
            ctx.lineTo(startX+points[j][0],startY+points[j][1]);
        }
        ctx.closePath();
        ctx.stroke();
        startX-= 30;
    }
}
function DrawLifeVaisseaux2(){
    let startX = 1100;
    let startY = 10;
    ctx.fillText('P2',startX-100,20);
    let points = [[9,9],[-9,9]];
    ctx.strokeStyle= 'cyan';
    for (let i = 0; i < livesj2 ; i++){
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        for (let j = 0; j< points.length;j++){
            ctx.lineTo(startX+points[j][0],startY+points[j][1]);
        }
        ctx.closePath();
        ctx.stroke();
        startX-= 30;
    }
}
function Render(){
    if (asteroids.length< 10){
        console.log("Asteroid pop");
        setInterval(asteroids.push(new Asteroid()),500);
    }
    if (pause ===false){
   commandVaiseaux1();
   if(deuxJoueur){
   commandVaiseaux2();
   }
}
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    ctx.fillText('SCOREJ1: '+score1.toString(),20,35);
    if(deuxJoueur===true && livesj1<=0 ){
        vaisseaux1.visible=false;
    }
    if (deuxJoueur===true&& livesj2<=0){
        vaisseaux2.visible=false;
    }
    if (pause === true){
        ctx.font='50px Arial';
        ctx.fillText('PAUSE',canvasWidth/2-150,canvasHeight/2);
        ctx.fillText('Press \"5\" to continue ',canvasWidth/2-150,canvasHeight/2+50);
    }
    DrawLifeVaisseaux1();
    if(deuxJoueur){
    DrawLifeVaisseaux2();
    }
    if (asteroids.length !==0){
        for(let k =0; k < asteroids.length;k++){
            if(Collisioncercle(vaisseaux1.x,vaisseaux1.y,11,asteroids[k].x,asteroids[k].y,asteroids[k].collisionRadius)){
                vaisseaux1.x = canvasWidth/2;
                vaisseaux1.y = canvasHeight/2;
                vaisseaux1.velX=0;
                vaisseaux1.velY=0;
                livesj1 -=1;
            }
        }
    }
    if (asteroids.length !==0 && deuxJoueur){
        for(let k =0; k < asteroids.length;k++){
            if(Collisioncercle(vaisseaux2.x,vaisseaux2.y,11,asteroids[k].x,asteroids[k].y,asteroids[k].collisionRadius)){
                vaisseaux2.x = canvasWidth/2;
                vaisseaux2.y = canvasHeight/2;
                vaisseaux2.velX=0;
                vaisseaux2.velY=0;
                livesj2 -=1;
            }
        }
    }
    if (asteroids.length !==0 &&bullets.length!= 0){
        loop1:
        for(let l =0; l < asteroids.length;l++){
            for(let m =0;m< bullets.length;m++){
                if(Collisioncercle(bullets[m].x,bullets[m].y,3,asteroids[l].x,asteroids[l].y,asteroids[l].collisionRadius)){
                    if(asteroids[l].level ===1){
                    asteroids.push(new Asteroid(asteroids[l].x-5,
                        asteroids[l].y -5,25,2,22));
                        asteroids.push(new Asteroid(asteroids[l].x+5, // il va crée de version plus petite
                            asteroids[l].y -5,25,2,22));
                    } else if (asteroids[l].level ===1){
                        asteroids.push(new Asteroid(asteroids[l].x-5,
                            asteroids[l].y -5,15,2,12));
                            asteroids.push(new Asteroid(asteroids[l].x+5, // il va crée de version plus petite
                                asteroids[l].y -5,15,2,12));
                    }
                    asteroids.splice(l,1);
                    bullets.splice(m,1);
                    score1 +=20;
                    break loop1;
                }
            }
        }
    }
    if (asteroids.length !==0 &&bullets2.length!= 0){
        loop1:
        for(let l =0; l < asteroids.length;l++){
            for(let m =0;m< bullets2.length;m++){
                if(Collisioncercle(bullets2[m].x,bullets2[m].y,3,asteroids[l].x,asteroids[l].y,asteroids[l].collisionRadius)){
                    if(asteroids[l].level ===1){
                    asteroids.push(new Asteroid(asteroids[l].x-5,
                        asteroids[l].y -5,25,2,22));
                        asteroids.push(new Asteroid(asteroids[l].x+5, // il va crée de version plus petite
                            asteroids[l].y -5,25,2,22));
                    } else if (asteroids[l].level ===1){
                        asteroids.push(new Asteroid(asteroids[l].x-5,
                            asteroids[l].y -5,15,2,12));
                            asteroids.push(new Asteroid(asteroids[l].x+5, // il va crée de version plus petite
                                asteroids[l].y -5,15,2,12));
                    }
                    asteroids.splice(l,1);
                    bullets2.splice(m,1);
                    score2 +=20;
                    break loop1;
                }
            }
        }
    }
    if (vaisseaux1.visible===true){
    playerOne();
    }
    if(vaisseaux2.visible===true){
     if(deuxJoueur){
        vaisseaux2.couleurV='cyan';
   playerTwo();
     }
    }
     if(bullets.length !==0){
        for (let i = 0;i<bullets.length;i++){
            bullets[i].Update();
            bullets[i].Draw();
        }
     }
     if(bullets2.length !==0){
        for (let h = 0;h<bullets2.length;h++){
            bullets2[h].Update();
            bullets2[h].Draw();
        }
     }
     if(asteroids.length !==0){
        for (let j = 0;j<asteroids.length;j++){
            asteroids[j].Update();
            asteroids[j].Draw(j);
        }
     }
    ctx.font = '21px Arial';
    ctx.fillText("SCOREJ2 : " + score2.toString(), 20, 70);
    if (livesj1 <= 0&& livesj2<=0){
        if (score1 > score2){
 
        ctx.fillStyle='white';
        ctx.font='50px Arial';
        ctx.fillText('GG JOUEUR 1',canvasWidth/2-150,canvasHeight/2);
        ctx.fillText('Press /"R/" to reload ',canvasWidth/2-150,canvasHeight/2+50);
        }else{
            ctx.fillStyle='white';
        ctx.font='50px Arial';
        ctx.fillText('GG JOUEUR 2',canvasWidth/2-150,canvasHeight/2);
        ctx.fillText('Press \"R\" to reload ',canvasWidth/2-150,canvasHeight/2+50);
        }
        
     }

    requestAnimationFrame(Render);
}
