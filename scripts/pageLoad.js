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

function typingScript(s, callback){
    var script = document.getElementById("script");
    // var scene = document.getElementById("scene");

    var i = 0;
    function typing(){
        if(i == s.length){
            clearInterval(timer);
            setTimeout(function(){
                script.innerHTML = "";
                // scene.setAttribute("src", "");
                if(callback) {
                    callback();
                }
            }, 1000);
            
        }
        else{
            let letter = (s[i] == '\0') ? "   " : s[i];
            i++;
            script.innerHTML += (letter == '\n' ? "<br/>" : letter);
        }
    }

    var timer = setInterval(typing, 150); // 타이핑 속도 조절
}

function showBeforeEasyPage(){
    var scene = document.getElementById("scene");

    showPage('story', 'main'); //modi here
    const scriptList = [
        "한가로운 어느 버거 가게가 있었습니다.",
        "소란스러운 소리에 가게 밖을 보니 사람들이 몰려오고 있었습니다.",
        "굶주린 사람들이 당신의 가게에 몰려왔고 그들은 재료를 마구잡이로 집어먹기 시작했습니다.",
        "재료를 모아 이 굶주린 사람들로부터 가게를 지키세요!"
    ];

    let index = 0;
    function runScripts() {
        if(index < scriptList.length) {
            scene.setAttribute("src", `./img/scene/easy/${index}.png`);
            typingScript(scriptList[index++], runScripts); // 현재 스크립트가 끝나면 다음 스크립트를 실행
        }
        else{
            document.querySelector(`#story.page`).style.display = 'none';
            showPage('game', 'main'); //modi here
            showGamePage();
        }
    }

    runScripts();
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
    removeInput();
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
    removeInput();
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
    removeInput();
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

function removeInput(){
    document.getElementById("userName").style.display="none";
}
