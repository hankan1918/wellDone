// main.html에서 gameMode.js 대신 사용
// test 모드
// 총 시간 100까지
// EASY: 20점 이상
// NORMAL: 10점 이상 && 버거 카운트 1개 이상
// HARD: 100초 끝나기 전까지 버거 카운트 1개 이상
function nextMode(){
    if (mode == MODE.EASY && score >= 50){
        mode = MODE.NORMAL
        resetGame();
        changeState("굶주린 손님들");
        setModeClearHistory(MODE.EASY)
        showBeforeNormalPage();
    }
    if (mode == MODE.NORMAL && burgerCount >= 1){
        mode = MODE.HARD
        resetGame();
        changeState("아무튼 버거를 주세요");
        setModeClearHistory(MODE.NORMAL)
        showBeforeHardPage();
    }
}

/* 시간 0일 때 처리 함수 */
function gameTimer(){
    remainingTime--;
    if (remainingTime <= 100){
        if(charimg != "BENJAMIN"){
            updateTime();
            if(mode != MODE.HARD) {drawGameover();}
            // mode == MODE.HARD인 경우만, 버거 완성 개수가 3 이상이면 컴플릿, 아니면 게임오버
            else{
                if (burgerCount >= 1 && score >= 80){
                    changeState("제대로 된 버거를 줘");
                    setModeClearHistory(MODE.NORMAL)
                    completeHard();
                }
                else {drawGameover();}
                }
        } else {
            // 캐릭터가 BENJAMIN인 경우 REMAINGTIME 0 일 때 추가 시간(BENJAMINABILITY) 제공
            bencount--;
            remainingTime = BENJAMINABILITY.time;
            console.log(bencount);
            if(bencount < 0){
                remainingTime = 0;
                updateTime();
                if(mode != MODE.HARD) {drawGameover();}
                // mode == MODE.HARD인 경우만, 버거 완성 개수가 3 이상이면 컴플릿, 아니면 게임오버
                else{
                    if (burgerCount >= 1 && score >= 80){
                        changeState("제대로 된 버거를 줘");
                        completeHard();
                        }
                    else {drawGameover();}
                }
            }
        }
    }
}

function drawGameover(){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    showDefeatPage();
}

function completeEasy(){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    setModeClearHistory(0);
}

function completeNormal(){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    setModeClearHistory(1);
}

function completeHard(){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    setModeClearHistory(2);
    showClearPage();
}
