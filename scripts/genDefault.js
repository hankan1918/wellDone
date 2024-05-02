var canvas;
var context;
var timer;
var width;
var height;
var ballRadius = 5;
var barWidth = 100;
var barX;
var barY;
var ballX;
var ballY;
var speed;
var ballVx;
var ballVy;
var weight;
var scoreboard;
var score;

function init(c, s, w = 0.05){
    clearInterval(timer);
    weight = w;
    scoreboard = s;
    score = 0;
    scoreboard.innerText = score;
    canvas = c;
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    console.log(width, height);
    barX = width/2 - (barWidth/2);
    barY = height - 30;
    ballX = width/2;
    ballY = height/2;
    speed = 5;
    ballVx = 0;
    ballVy = -speed;
    canvas.addEventListener('mousemove', function(event){
        if(event.x >= (barWidth/2) && event.x<=width-(barWidth/2)){
            barX = event.x - (barWidth/2);
            console.log(event.x)
        }
    })
    console.log(`speed: ${speed}`);
    timer = setInterval(draw, 10);
}

function bounce(){
    if((ballY >= barY-ballRadius) && (ballY <= barY+15) && (ballX>=barX) && (ballX<=(barX+barWidth))){
        ballVx = -1*(barX+(barWidth/2) - ballX) * weight;
        ballVy = Math.sqrt(speed**2 - ballVx**2);
        ballVy *= -1;
        console.log(`ballVx: ${ballVx}, ballvy: ${ballVy}`);
        score += 1;
    }
    else if(ballX < ballRadius || ballX > width-ballRadius){
        ballVx *= -1;
    }
    else if(ballY-ballRadius < 0){
        ballVy *= -1;
    }
}

function draw(){
    if(ballY>height-ballRadius){
        drawGameover();
    }
    else{
        bounce();
        ballX += ballVx;
        ballY += ballVy;
        context.clearRect(0, 0, width,height);
        context.beginPath();
        context.arc(ballX, ballY, ballRadius, 0, 2.0*Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.beginPath();
        context.fillStyle='blue';
        context.fillRect(barX, barY, barWidth, 15);
        scoreboard.innerText = score;
    }
}

function drawGameover(msg="게임오버"){
    context.clearRect(0, 0, width, height);
    context.font = '50px serif';
    context.fillText(msg, 100, 100);
    clearInterval(timer);
}