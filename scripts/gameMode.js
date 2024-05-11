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
    newGame(document.getElementById('gscoreboard'), document.getElementById('lifeboard'), document.getElementById('timeboard'));
}

function normalMode(){
    mode = MODE.NORMAL;
    currentIngredient = -1;
    burgerCount = 0;
    console.log("normal: ", mode);
    newGame(document.getElementById('gscoreboard'), document.getElementById('lifeboard'), document.getElementById('timeboard'));
}


function hardMode(){
    mode = MODE.HARD;
    currentIngredient = -1;
    burgerCount = 0;
    console.log("hard: ", mode);
    newGame(document.getElementById('gscoreboard'), document.getElementById('lifeboard'), document.getElementById('timeboard'));
}

