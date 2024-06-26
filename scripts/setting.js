function showSetting(){
    showPage('setting', 'main'); 
    selectChar(document.getElementById('charMenu').children[CHAR]);
}

function selectChar(event){
    var charMenu = document.getElementById('charMenu');
    for(var i = 0; i<charMenu.childElementCount; i++){
        charMenu.children[i].style.boxShadow = "0 0 50px rgba(0, 0, 0, 0.3)";
        charMenu.children[i].style.padding = "";
        charMenu.children[i].classList.remove("selected");
    }
    event.style.filter = "";
    event.style.padding = "3vh";
    event.classList.add("selected");
    
    var t = CHAR_LIST.indexOf(event.children[0].alt);
    CHAR = t
    console.log(CHAR);
}

var cmMenuWidth = 300;

function createCarouselMenu(pos, content, val){
    var prev, next, container, cmItems, cmItem, parent,img;

    parent = document.querySelector(`#${pos} .carouselMenu`);
    prev = document.createElement('div');
    prev.classList.add('button-box');

    img = document.createElement('img');
    img.src = 'img/button/sub-button/prev/prev.png';
    prev.appendChild(img);
    img = document.createElement('img');
    img.src = 'img/button/sub-button/prev/prev-hover.png';
    prev.appendChild(img);

    parent.appendChild(prev);

    container = document.createElement('div');
    container.classList.add('cmContainer');
    parent.appendChild(container);
    
    cmItems = document.createElement('div');
    cmItems.classList.add('cmItems');
    container.appendChild(cmItems);

    for(var i = 0; i<content.length; i++){
        cmItem = document.createElement('div');
        cmItem.classList.add('cmItem');
        cmItem.innerHTML = content[i];
        cmItems.appendChild(cmItem);
    }

    next = document.createElement('div');
    parent.appendChild(next);
    next.classList.add('button-box');

    img = document.createElement('img');
    img.src = 'img/button/sub-button/next/next.png';
    next.appendChild(img);
    img = document.createElement('img');
    img.src = 'img/button/sub-button/next/next-hover.png';
    next.appendChild(img);

    if(val == "THEME"){
        prev.addEventListener('click', function(){
            if(THEME>0){
                THEME-=1;
                cmItems.style.transform = `translateX(-${THEME*cmMenuWidth}px)`;
                console.log(THEME);
                applyTheme();
                applyBorder();
            }
        });
        next.addEventListener('click', function(){
            if(THEME<THEME_LIST.length-1){
                THEME+=1;
                cmItems.style.transform = `translateX(-${THEME*cmMenuWidth}px)`;
                console.log(THEME);
                applyTheme();
                applyBorder();
            }
        });
    } else if(val == "BGM"){
        prev.addEventListener('click', function(){
            if(BGM>0){
                BGM-=1;
                cmItems.style.transform = `translateX(-${BGM*cmMenuWidth}px)`;
                console.log(BGM);
                if(!isMuted)
                    playBGM();
            }
        });
        next.addEventListener('click', function(){
            if(BGM<BGM_LIST.length-1){
                BGM+=1;
                cmItems.style.transform = `translateX(-${BGM*cmMenuWidth}px)`;
                console.log(BGM);
                if(!isMuted)
                    playBGM();
            }
        });
    }
}

function playBGM(){
    bgmPlayer.src = `bgm/${BGM_LIST[BGM]}.mp3`;
    bgmPlayer.play();
}

function applyTheme(){
    var themeName = THEME_LIST[THEME].replaceAll(' ', '')
    document.body.style.backgroundImage = `url('img/background/${themeName}.png')`;
}

function applyBorder() {
    var borderName = BORDER_LIST[THEME].replaceAll(' ', '');
    var elements = document.querySelectorAll(".border");
    elements.forEach(function (e) {
        e.style.borderImageSource = `url('img/etc/${borderName}.png')`;
    })
}