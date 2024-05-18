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
    
    showPage("defeat", "game");
    
    pageTimeout = setTimeout(function(){
        clearInterval(noticeTimeout);
        showPage("main", "defeat");
    }, PAGE_TIMER*1000);

    notice.innerText = `Return\0to\0the\0home\0in\0${String(PAGE_TIMER).padStart(2, "\0")}\0seconds.`;
    noticeTimeout = setInterval(function(){
        PAGE_TIMER--;
        notice.innerText = `Return\0to\0the\0home\0in\0${String(PAGE_TIMER).padStart(2, "\0")}\0seconds.`;
    }, 1000)

    document.getElementById("defeat").addEventListener("click", function(){
        clearInterval(pageTimeout);
        clearInterval(noticeTimeout);
        showPage("main", "defeat")
    })
}

function showBeforeEasyPage(){

}