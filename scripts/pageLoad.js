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

function typingScript(s, callback, clickCheck){
    var script = document.getElementById("script");
    // var scene = document.getElementById("scene");
    var i = 0;

    function typing(){
        if (clickCheck()) {
            clearInterval(timer);
            script.innerHTML = "";
            if (callback) {
                callback();
            }
            return;
        }
        if(i == s.length){
            clearInterval(timer);
            setTimeout(function(){
                script.innerHTML = "";
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
    var click = false;
    showPage('story', 'game'); //modi here
    const scriptList = [
        "한가로운 어느 버거 가게가 있었습니다.",
        "소란스러운 소리에 가게 밖을 보니 사람들이 몰려오고 있었습니다.",
        "굶주린 사람들이 당신의 가게에 몰려왔고 그들은 재료를 마구잡이로 집어먹기 시작했습니다.",
        "재료를 모아 이 굶주린 사람들로부터 가게를 지키세요!"
    ];

    let index = 0;
    function runScripts() {
        if(index < scriptList.length && click == false) {
            scene.setAttribute("src", `./img/scene/easy/${index}.png`);
            typingScript(scriptList[index++], runScripts, () => click); // 현재 스크립트가 끝나면 다음 스크립트를 실행
        }
        else{
            mode = MODE.EASY;
            showPage('game', 'story'); //modi here
            showGamePage();
            // showEasyModePage();
        }
    }

    runScripts();
    document.getElementById("story").addEventListener("click", function(){
        click = true;
    });
}

function showBeforeNormalPage(){
    var scene = document.getElementById("scene");
    var click = false;

    showPage('story', 'game'); //modi here
    const scriptList = [
        "사람들이 더 이상 버거 재료를 집어먹지 않습니다.\n아무래도 이성을 일부 되찾은 것 같습니다.",
        "내용물이 어찌되든 \'버거\'를 주자 집어먹기 시작합니다.",
        "지금부터는 내용물이 뭐가 됐든 버거를 만드세요!"
    ];

    let index = 0;
    function runScripts() {
        if(index < scriptList.length && click == false) {
            scene.setAttribute("src", `./img/scene/normal/${index}.png`);
            typingScript(scriptList[index++], runScripts, () => click); // 현재 스크립트가 끝나면 다음 스크립트를 실행
        }
        else{
            mode = MODE.NORMAL;
            showPage('game','story'); //modi here
            showNormalModePage();
        }
    }

    runScripts();

    document.getElementById("story").addEventListener("click", function(){
        click = true;
    });
}

function showBeforeHardPage(){
    var scene = document.getElementById("scene");
    var click = false;

    showPage('story', 'game'); //modi here
    const scriptList = [
        "엉망인 버거를 내놓아도 이젠 쳐다도 보지 않습니다.",
        "이젠 제대로 된 버거를 달라 요구하는 군요.",
        "\'제대로 된 버거\'를 원합니다.",
        "지금부터는 순서가 맞는 버거를 만드세요!\n잘못된 재료에는 패널티가 부과됩니다."
    ];

    let index = 0;
    function runScripts() {
        if(index < scriptList.length && click == false) {
            scene.setAttribute("src", `./img/scene/hard/${index}.png`);
            typingScript(scriptList[index++], runScripts, () => click); // 현재 스크립트가 끝나면 다음 스크립트를 실행
        }
        else{
            mode = MODE.HARD;
            showPage('game','story'); //modi here
            showHardModePage();
        }
    }

    runScripts();
    
    document.getElementById("story").addEventListener("click", function(){
        click = true;
    });
}

function showClearPage(){
    var scene = document.getElementById("scene");
    var click = false;

    showPage('story', 'game'); //modi here
    const scriptList = [
        "제대로 된 버거를 먹고 사람들이 하나둘 자신의 이성을 찾고 떠났습니다.",
        "당신에게는 돈과 약간 (많이) 어질러진 가게가 남았습니다.",
        "그리고 한가한 일상으로 돌아왔습니다.",
        "버거로 세상을 구했습니다. 영웅의 이름은..."
    ];

    let index = 0;
    function runScripts() {
        if(index < scriptList.length && click == false) {
            scene.setAttribute("src", `./img/scene/clear/${index}.png`);
            typingScript(scriptList[index++], runScripts, () => click); // 현재 스크립트가 끝나면 다음 스크립트를 실행
        }
        else{
            //마지막 장면은 항상 보여준다.
            if(click){
                click = false;
                scene.setAttribute("src", `./img/scene/clear/${scriptList.length-1}.png`);
                typingScript(scriptList[scriptList.length-1], getPlayerName, () => click);
                document.getElementById("scene").innerHTML = scriptList[scriptList.length-1];
            }
            else{
                document.getElementById("scene").innerHTML = scriptList[scriptList.length-1];
                getPlayerName();
            }
        }
    }

    runScripts();
    
    document.getElementById("story").addEventListener("click", function(){
        click = true;
    });
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
    changeChar();
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
    changeChar();
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
    changeChar();
}

function changeModeImage(){
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
