// main.html에서 gameMode.js 대신 사용
function nextMode(){
    if (mode == MODE.EASY && score >= 20){
        mode = MODE.NORMAL
        resetGame();
        changeState("굶주린 손님들");
        showBeforeNormalPage();
    }
    if (mode == MODE.NORMAL && score >= 10 && burgerCount >= 1){
        mode = MODE.HARD
        resetGame();
        changeState("아무튼 버거를 주세요");
        showBeforeHardPage();
    }
}


function gameTimer(){
    remainingTime--;
    if (remainingTime <= 100){      // remainingTime 변경
        if(charimg != "BENJAMIN"){
            updateTime();
            if(mode != MODE.HARD) {drawGameover();}
            else{
                if (burgerCount >= 1){  // burgerCount 변경
                    changeState("제대로 된 버거를 줘");
                    completeHard();
                }
                else {drawGameover();}
                }
        } else {
            bencount--;
            remainingTime = BENJAMINABILITY.time;
            console.log(bencount);
            if(bencount < 0){
                remainingTime = 0;
                updateTime();
                if(mode != MODE.HARD) {drawGameover();}

                else{
                    if (burgerCount >= 1){ // burgerCount 변경
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
