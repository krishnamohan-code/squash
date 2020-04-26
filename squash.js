
const c=document.getElementById("canvas");
const ctx =c.getContext("2d");

function drawRect(x,y,w,h,color)
{
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}


// ....Create Ball...! 
function createBall(x,y,r,color)
    {
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
    }

 
//.....Create  Text for score...!
function createText(text,x,y,color)
{
    ctx.fillStyle=color;
    ctx.font ="30px Sans-serif"
    ctx.fillText(text,x,y);
}


//....Left side paddle  i.e is player paddle.....!
const playerPaddle={
    x:10,
    y:(canvas.height-100)/2,
    width:10,
    height:100,
    score:0,
    color:"white"
}
//....Moving Player Paddle....!
c.addEventListener("mousemove",moveBat);
function moveBat(mouse)
{
    let rec=c.getBoundingClientRect();
    playerPaddle.y=mouse.clientY-rec.top-playerPaddle.height/2;
}
//.....Right Wall details.....!
const rightWall={
    x:canvas.width-20,
    y:10,
    width:10,
    height:c.height-20,
    // score:0,
    color:"green"

}
// .....Top Wall details.....!
const topWall={
    x:100,
    y:10,
    width:c.width-120,
    height:10,
    color:"green"
}
//.....Bottom Wall details.....!
const bottomwall={
    x:100,
    y:(canvas.height-20),
    width:480,
    height:10,
    color:"green"
}
// .....Ball details......!
const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    radius:10,
    speed:5,
    velocityX:5,
    velocityY:5,
    color :"white"
}
//..... Create Objects like (ball,paddles,walls,Score......)....!
function createObjects()
{    //for canvas.....!
    drawRect(0,0,c.width,c.height,"black");
    //for player paddle...!
    drawRect(playerPaddle.x,playerPaddle.y,playerPaddle.width,playerPaddle.height,playerPaddle.color);
    //for  Right Wall...!
    drawRect(rightWall.x,rightWall.y,rightWall.width,rightWall.height,rightWall.color)
    // for Top Wall...!
    drawRect(topWall.x,topWall.y,topWall.width,topWall.height,topWall.color)
    //For Bottom Wall...!
    drawRect(bottomwall.x,bottomwall.y,bottomwall.width,bottomwall.height,bottomwall.color)
    //for Ball creation
    createBall(ball.x,ball.y,ball.radius,ball.color)
    //for score 
    // createText("score",300,100,"white");
    createText(playerPaddle.score,canvas.width/4,canvas.height/5);
    createText("score",canvas.width/30,canvas.height/5);
    
}
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 5;
    playerPaddle.score=0;
}

function update()
      
    {     
        // resetBall();
        if( ball.x - ball.radius <0)
               {
            // playerPaddle.play();
            resetBall();
             }
        else if( (ball.x - ball.radius) < playerPaddle.x+playerPaddle.width)
         {
            playerPaddle.score++;
            score.play();
            if(playerPaddle.score>10)
            {
                // ProcessingInstruction()
                // pong();
            }
        
           }
          ball.x += ball.velocityX;
          ball.y += ball.velocityY;

          if(ball.y-ball.radius<c.height-375||(ball.y+ball.radius> c.height-25))
            {
                ball.velocityY=-ball.velocityY;
                wall.play();
                
            }
    
        
            else if((ball.x+ball.radius>c.width-25) )
            {
                ball.velocityX=-ball.velocityX;
                wall.play();
            }

            let player=playerPaddle;
            if(collision(ball,player))
            {
                hit.play();
                let collidePoint = (ball.y - (player.y + player.height/2));
                collidePoint = collidePoint / (player.height/2);
                
            
                let angleRad = (Math.PI/4) * collidePoint;
                
                // change the X and Y velocity direction
                let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
                ball.velocityX = direction * ball.speed * Math.cos(angleRad);
                ball.velocityY =direction* ball.speed * Math.sin(angleRad);
                
                // speed up the ball everytime a paddle hits it.
                ball.speed += 1;
            }
            
        }


    
function collision(ball,playerPaddle)
{
    ball.top=ball.y-ball.radius;
    ball.bottom=ball.y+ball.radius;
    ball.left=ball.x-ball.radius;
     ball.right=ball.x+ball.radius;

    playerPaddle.top=playerPaddle.y;
    playerPaddle.bottom=playerPaddle.y+playerPaddle.height;
    playerPaddle.right=playerPaddle.x+playerPaddle.width;
     playerPaddle.left=playerPaddle.x;

    return playerPaddle.left < ball.right && playerPaddle.top < ball.bottom
     && playerPaddle.right > ball.left && playerPaddle.bottom > ball.top;
}
let hit = new Audio();
let wall = new Audio();
let score = new Audio();


hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
score.src = "sounds/userScore.mp3";
//for starting the game 
function startGame()
{    
     update();
      createObjects();
  
}
const framePerSecond=50;
setInterval(startGame,1000/framePerSecond);


