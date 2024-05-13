function handleMouseMovement(container, overlay) {
    overlay.style = 'filter : opacity(0)';
    
    container.addEventListener('mousemove', function(e){
        var x = e.offsetX;
        var y = e.offsetY;
        rotateY = -1/5 * x + 20;
        rotateX = 4/30 * y -20;
        
        overlay.style = `background-position : ${x/5 + y/5}%`;
        
        container.style = `transform : perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    container.addEventListener('mouseover', function(){
        overlay.style = 'filter : opacity(0.1)';
    });
    container.addEventListener('mouseout', function(){
        overlay.style = 'filter : opacity(0)';
        container.style = 'transform: perspective(400px) rotateX(0) rotateY(0)';
    });
}

function createCards(name, dec, imgUrl, have = true) {
    var title_card = document.createElement('div');
    title_card.classList.add('title-card');
    
    var container = document.createElement('div');
    container.classList.add('container');
    title_card.appendChild(container);
    
    if(have){
        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        container.appendChild(overlay);
    }
    
    var card = document.createElement('div')
    var title = document.createElement('h1');
    title.innerHTML = name;
    card.appendChild(title);
    card.classList.add('card');
    card.style.backgroundImage = `url(img/${imgUrl})`;
    if(!have)
        card.style.filter = "grayscale(100%)";
    card.style.position = "relative";
    container.appendChild(card);
    
    if(have){
        var nameP = document.createElement('p');
        nameP.textContent = dec;
        title_card.appendChild(nameP);
    }
    
    document.querySelector('#cards').appendChild(title_card);
    if(have)
        handleMouseMovement(container, overlay);
}

var tasks = [
    "굶주린 손님들", "버거기만 하면 되는 손님들", "제대로 된 버거를 줘", "세상을 구한 버거",
    "이제 좀 알 것 같아요", "행운 버거", "버거? 눈 감고도 만듭니다", "아 그 버거요?"
];
var taskDescrptions = [
    "Easy 모드 클리어", "Normal 모드 클리어", "Hard 모드 클리어", "모든 모드 클리어",
    "버거 25개 판매", "버거 77개 판매", "버거 100개 판매", "모든 레시피의 버거를 판매하기"
];

var challengeState;
const TASK_KEY = 'challenge';
const BURGER_COUNT_KEY = 'totalBurger';
const BURGER_RECIPE_HISTORY_KEY = 'recipeHistory';

function changeState(achieve){
    var t;
    if((t = tasks.indexOf(achieve))== -1){
        console.log(`도전과제 ${achieve}를 찾을 수 없습니다.`);
    } else if(challengeState[t] == '0'){
        alert(`도전과제 달성! : ${achieve}`);
        var t = tasks.indexOf(achieve);
        challengeState = challengeState.substring(0, t) + '1' + challengeState.substring(t+1, challengeState.length);
        localStorage.setItem(TASK_KEY, challengeState);
    }
}

function showChallenge(){
    showPage('challenge', 'main');  
    get = localStorage.getItem(TASK_KEY);
    var container = document.querySelector('#cards');
    container.innerHTML = "";

    for(i = 0; i<get.length; i++){
        if(get[i] == '1'){
            // createCards(tasks[i],"chellenge/"+String(i+1).padStart(3, "0")+'.png');
            createCards(tasks[i],taskDescrptions[i],"chellenge/001"+'.png');
            // console.log(`${tasks[i]} Card is created from ${String(i+1).padStart(3,"0")}!`);
        } else {
            createCards(tasks[i],taskDescrptions[i],"chellenge/001"+'.png', false);
        }
    }
}

function setTotalBurger(count = burgerCount){
    var total = Number(localStorage.getItem(BURGER_COUNT_KEY)) || 0;
    total += count;
    if(total>=25) changeState('이제 좀 알 것 같아요');
    if(total>=77) changeState('행운 버거');
    if(total>=100) changeState('버거? 눈 감고도 만듭니다');

    localStorage.setItem(BURGER_COUNT_KEY, total);
}

function setBurgerRecipeHistory(recipe = BURGER){
    var history = localStorage.getItem(BURGER_RECIPE_HISTORY_KEY) || '0'.repeat(BURGER_LIST.length);
    console.log('before: ', history);

    history = history.substring(0, recipe) + '1' + history.substring(recipe+1, history.length);
    console.log('after: ', history);

    if(history==('1'.repeat(BURGER_LIST.length))) changeState('아 그 버거요?');

    localStorage.setItem(BURGER_RECIPE_HISTORY_KEY, history);
}