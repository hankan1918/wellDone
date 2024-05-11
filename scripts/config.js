var CHAR_LIST = ['JIM', 'CEO', 'BENJAMIN']; //캐릭터 파일 이름.
var CHAR_SRC_LIST = ['character1', 'character2', 'character3', 'character4']; //캐릭터 파일 이름.
var CHAR = 0; //현재 선택된 캐릭터 인덱스

var THEME_LIST = ['Theme A', 'Theme B', 'Theme C']; //테마 파일 이름.
var THEME = 0; //현재 선택된 테마

var BGM_LIST = ['푸드 파이터', '자신감']; //배경음악 파일 이름.
var BGM = 0; //현재 선택된 배경음악
var bgmPlayer = document.getElementById('bgmPlayer');
var isMuted = true;

var button = document.getElementById("mute-button");
var normalButton = button.children[0];
var hoverButton = button.children[1];

function changeMuteState(){
    if(isMuted){
        isMuted = false;
        normalButton.src = "./img/button/unmute.png"
        hoverButton.src = "./img/button/unmute-hover.png"
        playBGM();
    } else {
        isMuted = true;
        normalButton.src = "./img/button/mute.png"
        hoverButton.src = "./img/button/mute-hover.png"
        bgmPlayer.pause();
    }
}
