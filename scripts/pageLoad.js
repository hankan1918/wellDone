function showPage(nxt='', cur=''){
    if(cur!= '') document.querySelector(`#${cur}.page`).style.display = 'none';
    document.querySelector(`#${nxt}.page`).style.display = 'block';
}

function bodyOnLoad(){
    showPage('main');
    challengeState = localStorage.getItem(TASK_KEY) || '0'.repeat(tasks.length);
    localStorage.setItem(TASK_KEY, challengeState);
    bgmPlayer.pause();
    createCarouselMenu('bgm', BGM_LIST, 'BGM');
    createCarouselMenu('bgi', THEME_LIST, 'THEME');
}

function showGamePage(){
    resizeCanvas();
    pickBurgerRecipe();
    init(document.getElementById('gscoreboard'), document.getElementById('timeboard'));
    changeModeImage();
    changeChar();
}
