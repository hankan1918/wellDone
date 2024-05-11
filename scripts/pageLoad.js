function showPage(nxt='', cur=''){
    if(cur!= '') document.querySelector(`#${cur}.page`).style.display = 'none';
    document.querySelector(`#${nxt}.page`).style.display = 'block';
}

function bodyOnLoad(){
    showPage('main');
    bgmPlayer.pause();
    createCarouselMenu('bgm', BGM_LIST, 'BGM');
    createCarouselMenu('bgi', THEME_LIST, 'THEME');
}

function showGamePage(){
    resizeCanvas();
    showBurgerRecipe();
    init(document.getElementById('gscoreboard'), document.getElementById('lifeboard'), document.getElementById('timeboard'));
}
