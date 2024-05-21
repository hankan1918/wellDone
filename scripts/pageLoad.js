function showPage(nxt='', cur=''){
    if(cur!= '') document.querySelector(`#${cur}.page`).style.display = 'none';
    document.querySelector(`#${nxt}.page`).style.display = 'block';
}

function bodyOnLoad(){
    showPage('main');
    challengeState = localStorage.getItem(TASK_KEY) || '0'.repeat(tasks.length);
    applyTheme();
    applyBorder();
    localStorage.setItem(TASK_KEY, challengeState);
    bgmPlayer.pause();
    createCarouselMenu('bgm', BGM_LIST, 'BGM');
    createCarouselMenu('bgi', THEME_LIST, 'THEME');
}

function showGamePage(){
    resetGame();
    resizeCanvas();
    pickIngredient();
    init(document.getElementById('gscoreboard'), document.getElementById('timeboard'));
    changeModeImage();
    changeChar();
}

function showDefeatPage(){
    var PAGE_TIMER = 10;
    var pageTimeout, noticeTimeout;
    var notice = document.getElementById('defeatPageNotice');
    
    function setNotice(timer){
        notice.innerHTML = `Return   to   the   home   in   ${String(timer).padStart(2, "   ")}   seconds.`;
    }

    showPage("defeat", "game");
    
    pageTimeout = setTimeout(function(){
        clearInterval(noticeTimeout);
        showPage("main", "defeat");
    }, PAGE_TIMER*1000);

    setNotice(PAGE_TIMER);
    noticeTimeout = setInterval(function(){
        PAGE_TIMER--;
        setNotice(PAGE_TIMER);
    }, 1000);

    document.getElementById("defeat").addEventListener("click", function(){
        clearInterval(pageTimeout);
        clearInterval(noticeTimeout);
        showPage("main", "defeat")
    })
}

function showBeforeEasyPage(){

}

function showEasyModePage(){
    mode = MODE.EASY;
    console.log("easy: ", mode);
    newGame(document.getElementById('gscoreboard'), document.getElementById('timeboard'));
    removeModeImage();
    changeModeImage();
    removeBuregerRecipe();
    removeCurrentBurger();
    pickIngredient();
}

function showNormalModePage(){
    mode = MODE.NORMAL;
    console.log("normal: ", mode);
    newGame(document.getElementById('gscoreboard'), document.getElementById('timeboard'));
    removeModeImage();
    changeModeImage();
    removeBuregerRecipe();
    removeCurrentBurger();
    pickBurgerRecipe();
}

function showHardModePage(){
    mode = MODE.HARD;
    console.log("hard: ", mode);
    console.log("bur1: ", burgerCount);
    newGame(document.getElementById('gscoreboard'), document.getElementById('timeboard'));
    removeModeImage();
    changeModeImage();
    removeBuregerRecipe();
    removeCurrentBurger();
    pickBurgerRecipe();
}

function changeModeImage(){
    console.log(mode)
    var parent = document.getElementById("difficulty");
    var child = document.createElement("img");
        if (mode == MODE.EASY)        child.src = "./img/button/sub-button/easy/easy.png";
        else if (mode == MODE.NORMAL) child.src = "./img/button/sub-button/normal/normal.png";
        else if (mode == MODE.HARD)   child.src = "./img/button/sub-button/hard/hard.png";
        child.alt = "MODE";
        parent.appendChild(child);

}

function removeModeImage(){
    var parent = document.getElementById("difficulty");
    var child = parent.querySelector("img");
    if (child) {
        parent.removeChild(child);
    }
}

/* 제한 시간 출력 */
function updateTime(){
    timeboard.innerText = "시간: " + remainingTime;
}

/* 점수 출력 */
function updateScore(){
    gscoreboard.innerText = "점수: " + score;
}

/*
   캐릭터 이미지 생성
   - config.js의 CHAR_LIST, CHAR(현재 선택한 캐릭터 인덱스)
*/
function changeChar(){
    var parent = document.getElementById("charImage");
    var child = document.createElement("img");
    charimg = CHAR_LIST[CHAR];
    console.log(charimg);
    child.src = `img/char/${charimg}.png`;
    child.alt = "CHAR";
    parent.appendChild(child);
}
/*
    캐릭터 이미지 제거
    resetGame에서 사용
*/
function removeChar(){
    var parent = document.getElementById("charImage");
    var child = parent.querySelector("img");
    if (child) {
        parent.removeChild(child);
    }
}
