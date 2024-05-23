// main.html에서 gameMode.js 대신 사용
function nextMode(){
    if (mode == MODE.EASY && score >= 30){  // score 변경
        mode = MODE.NORMAL
        completeEasy();
        setTimeout(showNormalModePage,1500);
        removeModeImage();
        changeModeImage();
    }
    if (mode == MODE.NORMAL && score >= 30 && burgerCount >= 1){
        mode = MODE.HARD
        completeNormal();
        setTimeout(showHardModePage,1500);
        removeModeImage();
        changeModeImage();
    }
}


function gameTimer(){
    remainingTime--;
    if (remainingTime <= 160){      // remainingTime 변경
        if(charimg != "BENJAMIN"){
            updateTime();
            if(mode != MODE.HARD) {drawGameover();}
            else{
                if (burgerCount >= 1){  // burgerCount 변경
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
