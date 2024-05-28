/* 난이도 관련 변수 */
const MODE = {
    EASY: 0,
    NORMAL: 1,
    HARD: 2
};
var mode = MODE.EASY;                                       /* 0:EASY 1:NORMAL 2:HARD

/* 캔버스 관련 변수 */
var canvas = document.getElementById("gameCanvas");         /* gameCanvas 참조 canvas */
var context = canvas.getContext('2d');                      /* 컨텍스트 객체 */    
var CWIDTH;                                                 /* canvas 너비 */
var CHEIGHT;                                                /* canvas 높이 */
var timer;                                                  /* 타이머 객체 변수 setInterval과 clear를 연결 */

/* 격자 관련 변수 */
const GRIDSIZE = 80;
var grid = [];

/* 캐릭터 관련 변수 */
var charimg;                                                /* 현재 캐릭터 */
const CEOABILITY = 3;                                       /* CEO의 능력 추가 점수 */
const BENJAMINABILITY = {                                   /* BENJAMIN의 능력 추가 시간*/    
    time: 10,
    count: 1
}
var bencount;                                               /* BENJAMIN의 추가 시간 개수 카운트*/

/* 공 관련 변수 */
const BALLRADIUS = 8;                                       /* 공 반지름 */
var ballX;                                                  /* 공의 현재 x방향 위치 */
var ballY;                                                  /* 공의 현재 y방향 위치 */
const BALL_SPEED = 6.5;                                       /* 공의 초기 속도 */
var speed;                                                  /* 공의 속도 */
var ballVx;                                                 /* 공의 현재 x방향 속도 */
var ballVy;                                                 /* 공의 현재 y방향 속도 */
const WEIGHT = 0.07;                                        /* 바운스 */

/* 패들 관련 변수 */
const BARWIDTH = 140;                                       /* 패들 너비 */
const BARHEIGHT = 14;                                       /* 패들 높이 */
var barX;                                                   /* 패들 x 위치 */
var barY;                                                   /* 패들 y 위치 */

/* 제한시간, 점수, 목숨 관련 변수 */
var gTimer;
const TOTALTIME = 180;                                      /* 제한 시간 */
var remainingTime;                                          /* 남은 시간 */
var timeboard;                                              /* 게임 시간판 */
const POINT = 10;
const MIN_SCORE = 0;                                        /* 초기 점수 */
const BONUS = 5;                                            /* 추가 점수 */
const BURGERBONUS = 50;
const PENALTY = 5;                                          /* 감점 */
var score;                                                  /* 점수 */
var gscoreboard;                                            /* 점수판 */


/* 재료 관련 변수 */
loadImage.cache = {};                                       /* 이미지 캐시 객체 */
let ingredientTimer;
let activeingredients = [];                                 /* 활성화 된 재료 배열 */
var FALLSPEED = 0.6;                                        /* 재료 낙하 속도 */
const INGREDIENTW = 60;                                     /* 재료 너비 */
const INGREDIENTH = 30;                                     /* 재료 높이 */


/* init */
function init(sb, tb){
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    gscoreboard = sb;
    timeboard = tb;
    
    /* 캐릭터 능력 */
    charimg = CHAR_LIST[CHAR];
    console.log("init char: ", charimg);
    if (charimg == "BENJAMIN") bencount = BENJAMINABILITY.count;
    console.log("bencount", bencount);
    console.log("starting mode", mode);

    /* 제한시간, 점수, 목숨세팅 */
    remainingTime = TOTALTIME;
    timeboard.innerText = remainingTime;
    score = MIN_SCORE;
    gscoreboard.innerText = score;

    /* 격자 */
    initGrid();
    
    /* 공 초기화 */
    ballX = CWIDTH/2;                                       // 공 x축 초기 위치
    ballY = CHEIGHT/2;                                      // 공 y축 초기 위치
    speed = BALL_SPEED;
    ballVx = 0;                                             // 공 x축 초기 속도 0
    ballVy = -speed;                                        // 공 y축 초기 속도 -5
    
    /* 패들 초기화 */
    barX = CWIDTH/2 - (BARWIDTH/2);                         // 패들 x축 초기 위치
    barY = CHEIGHT - BARHEIGHT*2;                           // 패들 y축 초기 위치

    /* 마우스 컨틀롤 */
    canvas.addEventListener('mousemove', function(e){
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > BARWIDTH/2 && relativeX < CWIDTH-BARWIDTH/2){
            barX = relativeX - BARWIDTH/2;
        }
    })

    ingredientTimer = setInterval(createNewingredient, 1500);
    timer = setInterval(draw, 10);
    gTimer = setInterval(gameTimer, 1000);
    
    /*currentBurger Div 초기화*/
    $("#currentBurger").empty();
}

/*
    공 바운스
    - 벽에 끼이는 문제 있었음 해결:
        - 벽에 끼인 만큼 벽 안으로 밀어내는 코드 추가
        - Math.max(): 가장 큰 값 반환, Math.min(): 가장 작은 값 반환
*/
function bounce(){
    if((ballY >= barY - BALLRADIUS) &&
        (ballY <= barY + BARHEIGHT + BALLRADIUS) && 
        (ballX >= barX - BALLRADIUS) && 
        (ballX <= (barX + BARWIDTH + BALLRADIUS))){
        var distanceFromCenter = ballX - (barX + BARWIDTH / 2);
        ballVx = distanceFromCenter* WEIGHT;
        ballVy = Math.sqrt(speed**2 - ballVx**2);
        ballVy *= -1;
    }
    else if(ballX <= BALLRADIUS || ballX >= CWIDTH-BALLRADIUS){
        ballVx *= -1;
        ballX = Math.max(BALLRADIUS, Math.min(CWIDTH - BALLRADIUS, ballX));     // 벽끼임 문제 해결.겹친 영역만큼 공의 위치를 밖으로 이동
    }
    else if(ballY <= BALLRADIUS){
        ballVy *= -1;
        ballY = Math.max(BALLRADIUS, ballY);
    }
}

/* 그리기 */
function draw(){
    if(ballY>=CHEIGHT-BALLRADIUS){ drawGameover(); }
    else{
        bounce();                        
        ballX += ballVx; 
        ballY += ballVy; 
        context.clearRect(0, 0, CWIDTH, CHEIGHT); 
        updateTime();
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
function createNewingredient(){
    const emptyCell = findEmptyGridCell();
    const gridX = emptyCell.x;
    const gridY = emptyCell.y;
    const x = gridX * GRIDSIZE + Math.random() * (GRIDSIZE - INGREDIENTW);
    const y = -INGREDIENTH;
    const type = ingredientType[Math.floor(Math.random() * ingredientType.length)];
    const IINGREDIENTNAME = type + ".png";
    const INGREDIENTSRC = "./img/ingredient/" + IINGREDIENTNAME;
    const ACTIVEINGREDIENT = { x, y, status: 1, type, src: INGREDIENTSRC };
    activeingredients.push(ACTIVEINGREDIENT);
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
        const INGRED = activeingredients[i];
        INGRED.y += FALLSPEED;                                          // 재료 아래로 이동
        if (INGRED.y > CHEIGHT){
            // 재료가 화면 아래로 사라지면 제거
            updateGrid(INGRED.x, INGRED.y);
            activeingredients.splice(i, 1);
            i--;                                                        // 배열 인덱스 조정
        } else {
            loadImage(INGRED.src, function(img){
                context.beginPath();
                context.drawImage(img, INGRED.x, INGRED.y, INGREDIENTW, INGREDIENTH);
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
    nextMode();
    // HARD: 버거 완성 개수가 1이상, 목숨이 0, 남은 시간이 있는 경우 --> 땅에 공이 떨어져서 죽은 경우 -->draw()함수 참고
    // 시간이 다 되어서 목숨이 0이 된 경우는 --> gameTimer()함수 참고
    for (let i = 0; i < activeingredients.length; i++){
        const b = activeingredients[i];
        if (b.status === 1){
            if ((ballY >= b.y - BALLRADIUS) &&
                (ballY <= b.y + INGREDIENTH + BALLRADIUS) &&
                (ballX >= b.x - BALLRADIUS) &&
                (ballX <= b.x + INGREDIENTW + BALLRADIUS)) {
                ballVy *= -1;
                b.status = 0;
                score += POINT;
                if (charimg == "CEO") score += CEOABILITY;

                updateGrid(b.x, b.y);   // 격자 업데이트 (재료가 있던 칸 비우기)

                appendIngredient(b.type);
  
                // 파괴된 재료 제거
                activeingredients.splice(i, 1);         // activeingredients.splice(제거 시작할 인덱스, 제거할 요소의 개수)
                i--;                                    // splice로 요소 제거하면 인덱스가 하나씩 앞으로 당겨지므로 -1 해야함
            }
        }
    }
}



/* 공 그리기 */
function drawBall(){
    context.beginPath();
    context.arc(ballX, ballY, BALLRADIUS, 0, 2.0*Math.PI);
    context.fillStyle = 'red';
    context.fill();
}

/* 패들 그리기 */
function drawBar(){
    context.beginPath();
    context.rect(barX, barY, BARWIDTH, BARHEIGHT);
    console.log(THEME);
    if ( THEME == 1) context.fillStyle = "#2979ff";
    else if ( THEME == 2) context.fillStyle = "#f06292";
    else context.fillStyle = "#f09116";
    context.fill();
    context.closePath();
}

/*
    격자 초기화 함수 
    - 사용하는 이유: 재료가 겹쳐서 생성되는 문제 해결, 충돌 감지, 재료 위치 관리
    - 게임 화면을 격자로 나눔. 격자에 재료가 존재하는지(있을 때 true, 없을 때 false)
    - 화면 너비 끝에 이미지가 짤리는 문제 -> Math.floor로 해결
*/
function initGrid() {
    for (let i = 0; i < Math.floor(CWIDTH / GRIDSIZE); i++) {
        grid[i] = [];
        for (let j = 0; j < Math.ceil(CHEIGHT / GRIDSIZE); j++) {
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
    - ingredientX = 120, ingredientY = 80, GRIDSIZE = 80이면 격자(1,1)
*/
function updateGrid(ingredientX, ingredientY){
    const gridX = Math.floor(ingredientX / GRIDSIZE);
    const gridY = Math.floor(ingredientY / GRIDSIZE);
    grid[gridX][gridY] = false;                     // 격자 비움 표시
}


/* replay 버튼 이벤트 처리 */
function replay(){
    console.log("replay", mode);
    resetGame();
    switch (mode) {
        case MODE.NORMAL:
            showNormalModePage();
            break;
        case MODE.HARD:
            showHardModePage();
            break;
        case MODE.EASY:
        default:
            showEasyModePage();
            break;
    }
}

/* newgame newgame 처리 */
function newGame(sb, tb){
    // 캐릭터별 처리
    if(charimg == "BENJAMIN") bencount = BENJAMINABILITY.count;
    console.log("new game bencount: ", bencount);
    //if(charimg == "CEO") bencount = BENJAMINABILITY.count;
    // init에 보낼 인수
    rsb = sb;       // scoreboard
    rtb = tb;       // timeboard
    console.log("re mode: ", mode);
    // 점수 초기화
    score = MIN_SCORE;
    remainingTime = TOTALTIME;

    // 공 위치 초기화
    ballX = CWIDTH/2;                    
    ballY = CHEIGHT/2;
    
    // 재료 초기화
    currentIngredient = -1;
    burgerCount = 0;
    activeingredients = [];
    clearInterval(ingredientTimer);
    createNewingredient();
    // 격자 초기화
    initGrid();

    init(rsb, rtb);
}

/* init함수를 부르는 거 제외 한 초기화 */
function resetGame(){
    if(charimg == "BENJAMIN") bencount = BENJAMINABILITY.count;
    // 공 초기화
    ballX = CWIDTH/2;                    
    ballY = CHEIGHT/2;
    speed = 0;
    ballVx = 0;                         // 공 x축 초기 속도 0
    ballVy = -speed;                    // 공 y축 초기 속도 -5
    
    /* 패들 위치 초기화 */
    barX = CWIDTH/2 - (BARWIDTH/2);      // 패들 x축 초기 위치
    barY = CHEIGHT - BARHEIGHT*2;        // 패들 y축 초기 위치

    // 점수 초기화
    score = MIN_SCORE;
    remainingTime = TOTALTIME;
    
    // 재료 초기화
    currentIngredient = -1;
    burgerCount = 0;
    activeingredients = [];
    clearInterval(ingredientTimer);
    clearInterval(timer);
    clearInterval(gTimer);
    initGrid();
    removeBuregerRecipe();
    removeCurrentBurger();
    removeModeImage();
    removeChar();
}

// Canvas Resizing
// Get the canvas element
// Resize the canvas to maintain aspect ratio
function resizeCanvas(){
    var aspectRatio = 1000 / 700; // Width / Height
    var targetWidth = window.innerWidth * 0.6;
    var targetHeight = targetWidth / aspectRatio;

    var maxHeight = window.innerHeight * 0.6;
    if (targetHeight > maxHeight) {
        targetHeight = maxHeight;
        targetWidth = targetHeight * aspectRatio;
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    CWIDTH = canvas.width;
    CHEIGHT = canvas.height;    
}

window.addEventListener('resize', resizeCanvas);
