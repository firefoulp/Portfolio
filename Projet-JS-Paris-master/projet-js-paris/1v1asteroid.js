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
let score1 = 0;
let score2=0;
let bonusLargeur=[];
let playerBulletradius1=3;
let playerBulletradius2=3;
let playerBulletHeight1=4;
let playerBulletwidth1 = 4;
let playerBulletHeight2=4;
let playerBulletwidth2 = 4;
document.addEventListener('DOMContentLoaded',SetupCanvas); // setup fonction pour la page et run le code
setInterval(myTimer, 0);

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
     bonusLargeur.push(new BonusLargeur());
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.body.addEventListener("keydown",function(e){// ici ce fera les touche maintenu pour eviter de repeter
        keys[e.keyCode]=true;
    });
    document.body.addEventListener("keyup",function(e){
        keys[e.keyCode]=false;
       if (e.keyCode===32){
        bullets.push(new Bullet(vaisseaux1.angle,vaisseaux1.noseX,vaisseaux1.noseY,vaisseaux1.couleurV,playerBulletradius1,playerBulletHeight1,playerBulletwidth1));
        // bullets.push(new Bullet(vaisseaux2.angle,vaisseaux2.noseX,vaisseaux2.noseY,vaisseaux2.couleurV));
       }
       if (deuxJoueur===true && e.keyCode ===96){
        bullets2.push(new Bullet(vaisseaux2.angle,vaisseaux2.noseX,vaisseaux2.noseY,vaisseaux2.couleurV,playerBulletradius2,playerBulletHeight2,playerBulletwidth2));
       }
       if (e.key==="r"&& score1 >=200 || (score2 >=200 && e.key==="r")){
        score1 = 0;
        score2 = 0;
        vaisseaux1.x=Math.random()*canvasWidth;
        vaisseaux1.y=Math.random()*canvasHeight;
        vaisseaux1.visible=true;
        vaisseaux2.x=Math.random()*canvasWidth;
    vaisseaux2.y=Math.random()*canvasHeight;
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
        this.speed = 0.05;
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
        if (this.movmentAvant){// de la trigonometrie cos sin pour permettre de bouger le vaisseaux en fonction de son angle
            this.velX += Math.cos(radians)*this.speed;
            this.velY += Math.sin(radians)*this.speed;
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
        this.velX *= 0.99; // on va regler la vitesse pour qu'il descende
        this.velY *= 0.99;
        this.x -= this.velX;
        this.y -= this.velY;
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
class BonusLargeur{
    constructor(){
        this.visible=true;
        this.x=Math.random()* canvasWidth;
        this.y=Math.random()* canvasHeight;
        this.speed=1;
        this.radius= 25;
        this.angle= Math.floor(Math.random()*359);
        this.couleurAst='orange';
        this.collisionRadius = 25;
        this.level =  1;
    }
    Draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.couleurAst;
        let vertAngle= ((Math.PI*2)/6);
        var radians = this.angle / Math.PI*180;
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}
class Bullet{
    constructor(angle,shipNosex,shipNosey,color,radius,height,width){
        this.visible=true;
        this.x = shipNosex;
        this.y = shipNosey;
        this.angle= angle;
        this.height=height ||4;
        this.width =width|| 4;
        this.speed = 5;
        this.velX=0;
        this.velY=0;
        this.shipcolor= color;
        this.radius = radius;
    }
    Update(){
        var radians= this.angle / Math.PI*180;
        this.x -= Math.cos(radians)*this.speed;
        this.y -= Math.sin(radians)* this.speed;
   

    }
    Draw(){
        ctx.fillStyle = this.shipcolor;
        ctx.fillRect(this.x,this.y,this.width,this.height);
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
function SpawnerBon(){
    bonusLargeur.push(new BonusLargeur);
}
function Render(){
    if (bonusLargeur.length < 1){
        console.log("Bonus pop")
        setTimeout(SpawnerBon(),500000)
    }
   commandVaiseaux1();
   if(deuxJoueur){
   commandVaiseaux2();
   }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for(let m =0;m< bullets.length;m++){
     if(Collisioncercle(bullets[m].x,bullets[m].y,bullets[m].radius,vaisseaux2.x,vaisseaux2.y,11)){
                    vaisseaux2.x=Math.random()*canvasWidth;
                    vaisseaux2.y=Math.random()*canvasHeight;
                    bullets.splice(m,1)
                    score1 +=20;
            }
        }
        for(let m =0;m< bullets2.length;m++){
            if(Collisioncercle(bullets2[m].x,bullets2[m].y,bullets2[m].radius,vaisseaux1.x,vaisseaux1.y,11)){
                           vaisseaux1.x=Math.random()*canvasWidth;
                           vaisseaux1.y=Math.random()*canvasHeight;
                           bullets2.splice(m,1)
                           score2 +=20;
                   }
               }
               for(let m =0;m< bonusLargeur.length;m++){
                if(Collisioncercle(bonusLargeur[m].x,bonusLargeur[m].y,bonusLargeur[m].radius,vaisseaux1.x,vaisseaux1.y,11)){
                    if (playerBulletHeight1 <= 40){
                               playerBulletHeight1*=1.5;
                               playerBulletwidth1*=1.5;
                               playerBulletradius1= (playerBulletHeight1/2)*Math.sqrt(2);
                }
                               bonusLargeur.splice(m,1);
                               console.log("taille de la balle qui touche :=",playerBulletradius1,"taille de la balle en carré: ",playerBulletHeight1);
                               
                       }
                   }
                   for(let h =0;h< bonusLargeur.length;h++){
                    if(Collisioncercle(bonusLargeur[h].x,bonusLargeur[h].y,bonusLargeur[h].radius,vaisseaux2.x,vaisseaux2.y,11)){
                        if ( playerBulletHeight2 <= 40){
                                  
                                   playerBulletHeight2*=1.5;
                                   playerBulletwidth2*=1.5;
                                   playerBulletradius2=(playerBulletHeight2/2)*Math.sqrt(2)
                        }
                        bonusLargeur.splice(h,1);
                           }
                       }  
if (vaisseaux1.visible===true){
    playerOne();
}
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    ctx.fillText('Joueur1SCOOORE: '+score1.toString(),20,35);
    ctx.fillText('Joueur2SCOOORE: '+score2.toString(),20,15);
     if(deuxJoueur&& vaisseaux2.visible===true){
        vaisseaux2.couleurV='cyan';
   playerTwo();
     }
     if(bullets.length !==0&& vaisseaux1.visible===true){
        for (let i = 0;i<bullets.length;i++){
            bullets[i].Update();
            bullets[i].Draw();
        }
     }
     if(bullets2.length !==0&& vaisseaux2.visible===true){
        for (let i = 0;i<bullets2.length;i++){
            bullets2[i].Update();
            bullets2[i].Draw();
        }
     }
     if(bonusLargeur.length!==0){
        for(let k = 0 ; k< bonusLargeur.length;k++){
            bonusLargeur[k].Draw();
        }
     }
     if (score1 === 200|| score2===200){
        if (score1 > score2){
 
        vaisseaux2.visible=false;
        ctx.fillStyle='white';
        ctx.font='50px Arial';
        ctx.fillText('GG JOUEUR 1',canvasWidth/2-150,canvasHeight/2);
        ctx.fillText('Press /"R/" to reload ',canvasWidth/2-150,canvasHeight/2+50);
        }else{
            vaisseaux1.visible=false;
            ctx.fillStyle='white';
        ctx.font='50px Arial';
        ctx.fillText('GG JOUEUR 2',canvasWidth/2-150,canvasHeight/2);
        ctx.fillText('Press \"R\" to reload ',canvasWidth/2-150,canvasHeight/2+50);
        }
        
     }

    requestAnimationFrame(Render);
}
