function nextMode(){
    if (mode == MODE.EASY && score >= 30){ // 테스트 조건 변경
        mode = MODE.NORMAL
        completeEasy();
        setTimeout(showNormalModePage,1500);
        removeModeImage();
        changeModeImage();
    }
    if (mode == MODE.NORMAL && score >= 10 && burgerCount >= 1){ // 테스트 조건 변경
        mode = MODE.HARD
        completeNormal();
        setTimeout(showHardModePage,1500);
        removeModeImage();
        changeModeImage();
    }
}

function gameTimer(){
    remainingTime--;
    if (mode == MODE.HARD && remainingTime <= 170){completeHard();}     // 테스트 추가
    if (remainingTime <= 0){
        if(charimg != "BENJAMIN"){
            updateTime();
            if(mode != MODE.HARD) {drawGameover();}
            else{
                if (burgerCount >= 0){
                    completeHard(); }
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
                    if (burgerCount >= 0){
                        completeHard(); }
                    else {drawGameover();}
                }
            }
        }
    }
}

function drawGameover(msg="GAME OVER!"){
    showDefeatPage();
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
}
function completeEasy(msg="COMPLETE EASY MODE"){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    context.fillStyle = "black";
    context.font = '100px arcade';
    context.fillText(msg, 100, 250);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    setModeClearHistory(0);
}

function completeNormal(msg="COMPLETE NORMAL MODE"){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    context.fillStyle = "black";
    context.font = '100px arcade';
    context.fillText(msg, 60, 250);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    setModeClearHistory(1);
}

function completeHard(msg="COMPLETE HARD MODE"){
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    context.fillStyle = "black";
    context.font = '100px arcade';
    context.fillText(msg, 100, 250);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
    setModeClearHistory(2);

    var scoreList = getScores();
    console.log(scoreList);
    if((scoreList.length<10) || (scoreList[scoreList.length-1].score || 0)<score){
        document.getElementById("playerNameInput").value = "";
        document.getElementById("userName").style.display="block";
    }
}
