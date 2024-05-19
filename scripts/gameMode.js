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
        completeEasy();
        setTimeout(showNormalModePage,1500);
        removeModeImage();
        changeModeImage();
    }
    if (mode == MODE.NORMAL && score >= 300 && burgerCount >= 3){
        mode = MODE.HARD
        completeNormal();
        setTimeout(showHardModePage,1500);
        removeModeImage();
        changeModeImage();
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
                    console.log("here");
                    completeHard(); }
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
                        console.log("here");
                        completeHard(); }
                    else {drawGameover();}
                }
            }
        }
    }
}

/* 게임 오버 */
function drawGameover(msg="GAME OVER!"){
    showDefeatPage();
    context.clearRect(0, 0, CWIDTH, CHEIGHT);
    // context.fillStyle = "black"
    // context.font = '150px arcade';
    // context.fillText(msg, 210, 300);
    removeCurrentBurger();
    removeBuregerRecipe();
    clearInterval(timer);
    clearInterval(ingredientTimer);
    clearInterval(gTimer);
}

/* EasyMode 성공 */
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
}

/* NormalMode 성공 */
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
}

/* HardMode 성공 */
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

    //최고기록 10위 안인 경우만 이름을 물어본다.
    var scoreList = getScores();
    console.log(scoreList);
    if((scoreList.length<10) || (scoreList[scoreList.length-1].score || 0)<score){
        document.getElementById("userName").style.display="block";
    }
    
    // if(score>highestScore){
    //     document.getElementById("userName").style.display="block";
    //     localStorage.setItem("highScore",score);
    // }
}
