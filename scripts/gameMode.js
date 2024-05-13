/*
    게임 모드
    easy:
        - 재료 찾기
        - 일정 점수 이상이면 노말 모드로 이동
    normal:
        - 우선 순위에 따른 햄버거 완성하기
        - 우선 순위에 따라 현재 햄버거 재료만 먹어짐
        - 다른 재료 먹어도 감점 없음
        - 햄버거 1개 완성하면 하드 모드로 이동
    hard:
        - 우선 순위 없음
        - 잘못 쌓으면 목숨 -1
        - 다른 재료 먹으면 -3점
        - 시간 끝났을 때 햄버거 1개 제대로 완성하지 못하면 게임오버
*/
function easyMode(){
    mode = MODE.EASY;
    console.log("easy: ", mode);
    newGame(document.getElementById('gscoreboard'), document.getElementById('timeboard'));
    removeModeImage();
    changeModeImage();
    removeBuregerRecipe();
    removeCurrentBurger();
    pickIngredient();
}

function normalMode(){
    mode = MODE.NORMAL;
    console.log("normal: ", mode);
    newGame(document.getElementById('gscoreboard'), document.getElementById('timeboard'));
    removeModeImage();
    changeModeImage();
    removeBuregerRecipe();
    removeCurrentBurger();
    pickBurgerRecipe();
}

function hardMode(){
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
