/*
    - 기능:
        - 재료:
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
            - 공 각도 튀는거 수정해야할 듯
            - start 버튼 누를 때 동작 수정
*/
/* 프레임 */
const FRAME_RATE = 1000 / 60; // 60 FPS (1 frame per 16.67 milliseconds)

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

/* 격자 관련 변수 */
var gridSize = 80;
var grid = [];


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
var barHeight = 10;                 /* 패들 높이 */
var barX;                           /* 패들 x */
var barY;                           /* 패들 y */

/* 제한시간, 점수, 목숨 관련 변수 */
var gTimer;
const TOTALTIME = 10;               /* 제한 시간 */
var remainingTime;                  /* 남은 시간 */
var timeboard;                      /* 게임 시간판 */
var scoreboard;                     /* 점수판 */
const MIN_SCORE = 0;                /* 초기 점수 */
var score;                          /* 점수 */
var lifeboard;                      /* 목숨판 */
const MAX_LIFE = 3;                 /* 최대목숨 */
var life;                           /* 목숨 */

/* 재료 관련 변수 */
loadImage.cache = {};               /* 이미지 캐시 객체 */
let ingredientTimer;
let activeingredients = [];         /* 활성화 된 재료 배열 */
var ingredientFallSpeed = 0.5;      /* 재료 낙하 속도 */
var ingredientWidth = 60;           /* 재료 너비 */
var ingredientHeight = 30;          /* 재료 높이 */
var ingredientPadding = 10;         /* 재료 사이 간격 */
var ingredientOffsetTop = 30;       /* 윗쪽 벽과 간격 */
var ingredientOffsetLeft = 20;      /* 좌우 벽과 간격 */

/* 메뉴 선택 시 게임 화면 보여주기 */
// 필요 없어보임
function showGame(){
    document.getElementById("game").style = "display: block: border: 2px solid black";
}

/* init */
function init(c, sb, lb, tb, w){
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    canvas = c;
    weight = w;
    scoreboard = sb;
    lifeboard = lb;
    timeboard = tb;
    

    /* 제한시간, 점수, 목숨세팅 */
    remainingTime = TOTALTIME;
    timeboard.innerText = remainingTime;
    score = MIN_SCORE;
    scoreboard.innerText = score;
    life = MAX_LIFE
    lifeboard.innerText = life;
    
    
    /* 캔버스 */
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    console.log(width, height);

    /* 격자 */
    initGrid();
    
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
        if(relativeX > + barWidth/2 && relativeX < canvas.width-barWidth/2){
            barX = relativeX - barWidth/2;
        }
    })
    console.log(`speed: ${speed}`);
    console.log(`x: ${ballX}`, `y: ${ballY}`);

    ingredientTimer = setInterval(createNewingredient, 2000);
    timer = setInterval(draw, 10);
    gTimer = setInterval(gameTimer, 1000);
}

/*
    공 바운스
    - 벽에 끼이는 문제 있었음 해결:
        - 벽에 끼인 만큼 벽 안으로 밀어내는 코드 추가
        - Math.max(): 가장 큰 값 반환, Math.min(): 가장 작은 값 반환
*/
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
        ballX = Math.max(ballRadius, Math.min(width - ballRadius, ballX)); // 벽끼임 문제 해결.겹친 영역만큼 공의 위치를 밖으로 이동
    }
    else if(ballY <= ballRadius){
        ballVy *= -1;
        ballY = Math.max(ballRadius, ballY);
    }
}

/* 그리기 */
function draw(){
    if(ballY>=height-ballRadius){
        /*
            공이 바닥에 떨어지면 공의 위치 초기화
            목숨 -1
        */
        ballX = width/2;                    
        ballY = height/2;                   
        ballVy *= -1;
        life -= 1;
        drawBall();
        updateLife();
        if(life <= 0)
            drawGameover();
    }
    else{
        bounce();                        
        ballX += ballVx; 
        ballY += ballVy; 
        context.clearRect(0, 0, width, height); 
        updateTime();
        updateLife();
        updateScore();
        drawBall();
        drawBar();
        drawIngredients();
        collisionDetection();
    }
}


/*
    재료 생성
    - 재료가 없는 칸 찾아서 좌표값 설정
    - x: 격자 칸 왼쪽 위 x 좌표(gridX * gridSize) + 랜덤한 x 좌표 처리
    - y: 화면 밖에서부터 시작
    - activeingredient: 재료 객체 생성 (x좌표, y좌표, stats, 재료 타입, 이미지 경로)
    - 생성한 재료 객체를 activeingredients 배열에 추가
*/
// var ingredientColor = ["red", "green",  "orange", "black", "pink"];
var ingredientType = ["top-bun", "bottom-bun", "cheese", "lettuce","patty", "tomato"];
function createNewingredient(){
    const emptyCell = findEmptyGridCell();
    const gridX = emptyCell.x;
    const gridY = emptyCell.y;
    const x = gridX * gridSize + Math.random() * (gridSize - ingredientWidth);
    const y = -ingredientHeight;
    const type = ingredientType[Math.floor(Math.random() * ingredientType.length)];
    // const color = ingredientColor[Math.floor(Math.random() * ingredientColor.length)];
    const ingredientName = type + ".png";
    const ingredientIMGSrc = "./img/ingredient/" + ingredientName;
    const activeingredient = { x, y, status: 1, type, image: ingredientIMGSrc };
    activeingredients.push(activeingredient);
    grid[gridX][gridY] = true;      // 격자 활성화
}

/*
    재료 그리기
    - activeingredients 배열에서 활성화 재료 찾기
    - 활성화 재료의 y좌표값을 낙하속도만큼 증가
    - 재료가 캔버스 아래로 내려가면 제거 처리 (격자 칸을 비움)
*/
function drawIngredients(){
    for (var i = 0; i < activeingredients.length; i++){
        const ingredient = activeingredients[i];
        ingredient.y += ingredientFallSpeed;                                  // 재료 아래로 이동
        console.log(ingredient);
        if (ingredient.y > canvas.height){
            // 재료가 화면 아래로 사라지면 제거
            updateGrid(ingredient.x, ingredient.y);
            activeingredients.splice(i, 1);
            i--;                                                     // 배열 인덱스 조정
        } else {
            loadImage(ingredient.image, function(img){
                context.beginPath();
                context.drawImage(img, ingredient.x, ingredient.y, ingredientWidth, ingredientHeight);
                context.closePath();
            });
        }
    }
}

/*
    이미지 로드
    - 이미지 캐시 객체 생성: 이미지 재사용
    - 캐시 이미지가 존재하면 바로 콜백
    - 존재하지 않으면 이미지 생성
*/
function loadImage(src, callback) {
    if (loadImage.cache[src]) {
        callback(loadImage.cache[src]);
    } else {
        var ingredientImg = new Image();
        ingredientImg.onload = function () {
            loadImage.cache[src] = ingredientImg;
            callback(ingredientImg);
        };
        ingredientImg.src = src;
    }
}

/* 
    재료 충돌 감지
    - 공과 재료 충돌 감지 후 처리
    - activeingredients: 활성화 된 재료 순회 status가 1인 경우에만 충돌 검사
    - 충돌 재료의 범위에 들어오는지(반지름 고려)
    - y방향 속도 반전, status 0으로 변경(재료 삭제), 점수 증가,
      재료가 있던 격자 지우기, 배열에서 활성화였던 재료 비활성화(인덱스 조정)
*/
function collisionDetection(){
    for (let i = 0; i < activeingredients.length; i++){
        const b = activeingredients[i];
        if (b.status === 1){
            if ((ballY >= b.y - ballRadius) && (ballY <= b.y + ingredientHeight + ballRadius) &&(ballX >= b.x - ballRadius) && (ballX <= b.x + ingredientWidth + ballRadius)) {
                ballVy *= -1;
                b.status = 0;
                score++;

                updateGrid(b.x, b.y);   // 격자 업데이트 (재료가 있던 칸 비우기)
  
                // 파괴된 재료 제거
                activeingredients.splice(i, 1);      // activeingredients.splice(제거 시작할 인덱스, 제거할 요소의 개수)
                i--;                                // splice로 요소 제거하면 인덱스가 하나씩 앞으로 당겨지므로 -1 해야함
            }
        }
    }
}

/* 공 그리기 */
function drawBall(){
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, 2.0*Math.PI);
    context.fillStyle = 'red';
    context.fill();
}

/* 패들 그리기 */
function drawBar(){
    context.beginPath();
    context.rect(barX, barY, barWidth, barHeight);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
}

/*
    격자 초기화 함수 
    - 사용하는 이유: 재료가 겹쳐서 생성되는 문제 해결, 충돌 감지, 재료 위치 관리
    - 게임 화면을 격자로 나눔. 격자에 재료가 존재하는지(있을 때 true, 없을 때 false)
*/
function initGrid() {
    for (let i = 0; i < Math.ceil(width / gridSize); i++) {
        grid[i] = [];
        for (let j = 0; j < Math.ceil(height / gridSize); j++) {
            grid[i][j] = false;
        }
    }
}
  
/*
    격자에서 랜덤한 빈 공간 찾기 함수
    - 재료가 존재하지 않는 격자 칸 찾기
    - 좌표값 gridX, gridY 반환
*/
function findEmptyGridCell(){
    var gridX, gridY;
    do {
        gridX = Math.floor(Math.random() * grid.length);
        gridY = Math.floor(Math.random() * grid[0].length);
    } while (grid[gridX][gridY]);
    return { x: gridX, y: gridY };
}
   
/*
    재료 파괴 시 격자 업데이트 함수
    - 재료가 충돌하면(파괴) 해당 격자 칸 비움
    - ingredientX, ingredientkY: 재료의 실제 좌표
    - gridX, gridY: 재료가 위치한 격자 좌표
    - ingredientX = 120, ingredientY = 80, gridSize = 80이면 격자(1,1)
*/
function updateGrid(ingredientX, ingredientY){
    const gridX = Math.floor(ingredientX / gridSize);
    const gridY = Math.floor(ingredientY / gridSize);
    grid[gridX][gridY] = false;                     // 격자 비움 표시
}

/* 시간 계산 */
function gameTimer(){
    remainingTime--;
    if (remainingTime <= 0){
        life -= 1;
        updateTime();
        updateLife();
        remainingTime = TOTALTIME;
        if(life <= 0){
            drawGameover();
            resetGame();
        }
    }
}

/* 제한 시간 출력 */
function updateTime(){
    timeboard.innerText = "시간: " + remainingTime;
}

/* 점수 출력 */
function updateScore(){
    scoreboard.innerText = "점수: " + score;
}

/* 목숨 출력 */
function updateLife(){
    var parentElement = document.getElementById("lifeboard");
    lifeboard.innerHTML = ""; // 이전 하트 이미지 제거
    for(var i = 0; i<life; i++){
        var imgElement = document.createElement("img");
        imgElement.src = "./img/etc/heart.png";
        imgElement.style.width = "50px";
        imgElement.style.height = "50px";
        imgElement.alt = "하트";
        parentElement.appendChild(imgElement);
    }
}


/* newgame replay 처리 */
function newGame(c, sb, lb, tb, w){
    // init에 보낼 인수
    rc = c;         // canvas
    rw = w;         // weight
    rsb = sb;       // scoreboard
    rlb = lb;       // lifeboard
    rtb = tb;       // timeboard

    // 점수, 목숨 초기화
    life = MAX_LIFE;
    score = MIN_SCORE;
    remainingTime = TOTALTIME;

    // 공 위치 초기화
    ballX = width/2;                    
    ballY = height/2;
    
    // 재료 초기화
    activeingredients = [];
    clearInterval(ingredientTimer);
    createNewingredient();
    init(rc, rsb, rlb, rtb, rw);

    // 격자 초기화
    initGrid();
}

/*
    init함수를 부르는 거 제외 한 초기화
*/
function resetGame(){
    // 점수, 목숨 초기화
    life = MAX_LIFE;
    score = MIN_SCORE;
    remainingTime = TOTALTIME;

    // 공 위치 초기화
    ballX = width/2;                    
    ballY = height/2;
    
    // 재료 초기화
    activeingredients = [];
    clearInterval(ingredientTimer);
    createNewingredient();

    // 격자 초기화
    initGrid();
}

/* 게임 오버 */
function drawGameover(msg="게임오버"){
    context.clearRect(0, 0, width, height);
    context.fillStyle = "red"
    context.font = '50px serif';
    context.fillText(msg, 100, 100);
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
}
