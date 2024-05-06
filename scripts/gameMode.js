/*
    게임 모드
    easy:
        - 우선 순위 설정
    normal:
        - 우선 순위 없음
        - 잘못 쌓으면 완성본에서 점수 차감
    hard:
        - 우선 순위 없음
        - 잘못 쌓으면 게임오버
*/
const MODE = {
    EASY: 0,
    NORMAL: 1,
    HARD: 2
};

function easyMode(){
    mode = MODE.EASY;
    console.log("easy: ", mode);
}

function normalMode(){
    mode = MODE.NORMAL;
    console.log("normal: ", mode);
}

function hardMode(){
    mode = MODE.HARD;
    console.log("hard: ", mode);
}