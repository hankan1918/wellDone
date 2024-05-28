/*
    게임 모드
    easy:
        - 재료 찾기
        - 일정 점수 이상이면 노말 모드로 이동
    normal:
        - 우선 순위에 따른 햄버거 완성하기
        - 우선 순위에 따라 현재 햄버거 재료만 먹어짐
        - 다른 재료 먹어도 감점 없음
        - 햄버거 일정 개수 완성하면 하드 모드로 이동
    hard:
        - 우선 순위 없음
        - 다른 재료 먹으면 감점
        - 시간 끝났을 때 햄버거 일정 개수 완성하지 못하면 게임오버
        - 일정 개수 이상 완성하면 점수 기록
*/

/*
다음 게임 모드로 넘어가는 함수
  - collisionDetection에서 호출
*/

function nextMode(){
    if (mode == MODE.EASY && score >= 200){
        mode = MODE.NORMAL
        resetGame();
        changeState("굶주린 손님들");
        setModeClearHistory(MODE.EASY)
        showBeforeNormalPage();
    }
    if (mode == MODE.NORMAL && score >= 300 && burgerCount >= 2){
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
    if (remainingTime <= 0){
        if(charimg != "BENJAMIN"){
            updateTime();
            if(mode != MODE.HARD) {drawGameover();}
            // mode == MODE.HARD인 경우만, 버거 완성 개수가 3 이상이면 컴플릿, 아니면 게임오버
            else{
                if (burgerCount >= 3){
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
                    if (burgerCount >= 3){
                        changeState("제대로 된 버거를 줘");
                        completeHard();
                        }
                    else {drawGameover();}
                }
            }
        }
    }
}

/* 게임 오버 */
function drawGameover(){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    showDefeatPage();
}

/* EasyMode 성공 */
function completeEasy(){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    setModeClearHistory(0);
}

/* NormalMode 성공 */
function completeNormal(){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    setModeClearHistory(1);
}

/* HardMode 성공 */
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
