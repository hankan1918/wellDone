/*
    - 기능:
        - 블럭:
            - 위에서 아래로 내려오도록
            - easy -> 메뉴에 따른 우선순위
            - 
        - 공: 
            - 바닥에 떨어지면 목숨 -1
        - 패들:
        - 점수(돈):
        - 목숨: 
            - 총 3목숨
        - 만들어야하는 햄버거:
            - 만들기 성공 -> 완성도에 따른 점수 -> 다음 햄버거
        - 제한시간
            - 제한 시간 안에 못하면 목숨 -1
        - 추가
            - 일정 점수 -> 난이도 상승 (목숨, 점수 초기화)
            - 제한시간 구현
            - 블록 아래로 떨어지게
            - 공 각도 튀는거 수정해야할 듯
*/

/* 난이도 관련 변수 */
var mode = 0;                       /* 0:EASY 1:NORMAL 2:HARD

/* 사운드 관련 변수 */
// var hitSound = new Audio("");
// var breakSound = new Audio("");

/* 캔버스 관련 변수 */
var canvas;                         /* gameCanvas 참조 canvas */
var context;                        /* 컨텍스트 객체 */    
var timer;                          /* 타이머 객체 변수 setInterval과 clear를 연결 */
var width;                          /* canvas 너비 */
var height;                         /* canvas 높이 */

/* 공 관련 변수 */
var ballRadius = 5;                 /* 공 반지름 */
var ballX;                          /* 공의 현재 x방향 위치 */
var ballY;                          /* 공의 현재 y방향 위치 */
var speed;                          /* 공의 속도 */
var ballVx;                         /* 공의 현재 x방향 속도 */
var ballVy;                         /* 공의 현재 y방향 속도 */
var weight;                         /* 무게 */

/* 패들 관련 변수 */
var barWidth = 100;                 /* 패들 너비 */
var barHeight = 15;                 /* 패들 높이 */
var barX;                           /* 패들 x */
var barY;                           /* 패들 y */

/* 점수 및 목숨 관련 변수 */
var scoreboard;                     /* 점수판 */
var MIN_SCORE = 0;                  /* 초기 점수 */
var score;                          /* 점수 */
var lifeboard;                      /* 목숨판 */
var MAX_LIFE = 3;                   /* 최대목숨 */
var life;                           /* 목숨 */

/* 블록 관련 변수 */
var brickSpeed = 0.5;               /* 블록 낙하 속도 */
var brickRowCount = 5;              /* 블록 배열의 행 */
var brickColumnCount = 9;           /* 블록 배열의 열 */
var brickWidth = 75;                /* 블록 너비 */
var brickHeight = 20;               /* 블록 높이 */
var brickPadding = 10;              /* 블록 사이 간격 */
var brickOffsetTop = 30;            /* 윗쪽 벽과 간격 */
var brickOffsetLeft = 20;           /* 좌우 벽과 간격 */
var bricks = [];                    /* 블록 리스트 */
for (var col = 0; col < brickColumnCount; col++){
  bricks[col] = [];
  for (var row = 0; row < brickRowCount; row++){
    bricks[col][row] = { x: 0, y: 0, status: 1 };
  }
}

/* 메뉴 선택 시 게임 화면 보여주기 */
function showGame(){
    document.getElementById("game").style = "display: block: border: 2px solid black";
}

function init(c, sb, lb, w){
    clearInterval(timer);
    canvas = c;
    weight = w;
    scoreboard = sb;
    lifeboard = lb;

    /* 점수, 목숨세팅 */
    score = MIN_SCORE;
    scoreboard.innerText = score;
    life = MAX_LIFE
    lifeboard.innerText = life;
    
    
    /* 캔버스 */
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    console.log(width, height);

    /* 블록 */
    
    /* 패들 */
    barX = width/2 - (barWidth/2);      // 패들 x축 초기 위치
    barY = height - barHeight*2;        // 패들 y축 초기 위치

    /* 공 */
    ballX = width/2;                    // 공 x축 초기 위치
    ballY = height/2;                   // 공 y축 초기 위치
    speed = 5;
    ballVx = 0;                         // 공 x축 초기 속도 0
    ballVy = -speed;                    // 공 y축 초기 속도 -5

    /* 마우스 컨틀롤 */
    canvas.addEventListener('mousemove', function(e){
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > + barWidth/2 && relativeX < canvas.width-barWidth/2) {
            barX = relativeX - barWidth/2;
        }
    })
    console.log(`speed: ${speed}`);
    console.log(`x: ${ballX}`, `y: ${ballY}`);
    timer = setInterval(draw, 10);
}

/* 공 바운스 */
function bounce(){
    if((ballY >= barY - ballRadius) && (ballY <= barY + barHeight + ballRadius) && (ballX >= barX - ballRadius) && (ballX <= (barX + barWidth + ballRadius))){
        var distanceFromCenter = ballX - (barX + barWidth / 2);
        ballVx = distanceFromCenter* weight;
        ballVy = Math.sqrt(speed**2 - ballVx**2);
        ballVy *= -1;
        console.log(`ballVx: ${ballVx}, ballvy: ${ballVy}`);
    }
    else if(ballX <= ballRadius || ballX >= width-ballRadius){
        ballVx *= -1;
    }
    else if(ballY <= ballRadius){
        ballVy *= -1;
    }
}

/* 그리기 */
function draw(){
    if(ballY>=height-ballRadius){
        /*
            바닥에 떨어지면 공의 위치 초기화
            목숨 -1
        */
        ballX = width/2;                    
        ballY = height/2;                   
        ballVy *= -1;
        life -= 1;
        drawBall();
        howLife();
        if(life <= 0)
            drawGameover();
    }
    else{
        bounce();
        ballX += ballVx;
        ballY += ballVy;
        context.clearRect(0, 0, width, height);
        howScore();
        howLife();          // 필요없으면 제거
        drawBall();
        drawBar();
        drawBricks();
        collisionDetection();
    }
}

/* 블록 */
var brickColor = ["red", "blue", "green", "yellow", "orange"];
function drawBricks(){
    for (var col = 0; col < brickColumnCount; col++){
        for (var row = 0; row < brickRowCount; row++){
            if (bricks[col][row].status == 1) {
                const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;
                if (bricks[col][row].y > canvas.height){
                bricks[col][row].y = 0;
                }
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = brickColor[row % brickColor.length];
                context.fill();
                context.closePath();
            }
        }
    }
}

/* 블록 충돌 */
function collisionDetection() {
    for (var col = 0; col < brickColumnCount; col++){
        for (var row = 0; row < brickRowCount; row++){
            const b = bricks[col][row];
            if (b.status == 1) {
                if((ballY >= b.y - ballRadius) && (ballY <= b.y + brickHeight + ballRadius) && (ballX >= b.x - ballRadius) && (ballX <= b.x + brickWidth + ballRadius)){
                    ballVy *= -1;
                    b.status = 0;
                    score++;
                }
            }
        }
    }
}

/* 공 */
function drawBall(){
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, 2.0*Math.PI);
    context.fillStyle = 'red';
    context.fill();
}

/* 패들 */
function drawBar(){
    context.beginPath();
    context.rect(barX, barY, barWidth, barHeight);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
}
/* 점수 출력 */
function howScore(){
    scoreboard.innerText = score;
}

/* 목숨 출력 */
function howLife(){
    lifeboard.innerText = life;
}

/* newgame */
function newGame(c, sb, lb, w){
/*
    목숨 초기화, 점수 초기화, 부사진 블럭 초기화
*/  
    rc = c;
    rw = w;
    rsb = sb;
    rlb = lb;

    life = MAX_LIFE;
    score = MIN_SCORE;
    ballX = width/2;                    
    ballY = height/2;                   

    for (var col = 0; col < brickColumnCount; col++){
        bricks[col] = [];
        for (var row = 0; row < brickRowCount; row++){
          bricks[col][row] = { x: 0, y: 0, status: 1 };
        }
    }
    init(rc, rsb, rlb, rw);
}


  function drawGameover(msg="게임오버"){
    context.clearRect(0, 0, width, height);
    context.font = '50px serif';
    context.fillText(msg, 100, 100);
    clearInterval(timer);
}
