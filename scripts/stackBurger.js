const BURGER_LIST =[
    ['bottom-bun', 'patty', 'cheese', 'patty', 'tomato', 'lettuce' , 'top-bun'],
    ['bottom-bun', 'lettuce', 'patty', 'lettuce', 'cheese', 'top-bun'],
    ['bottom-bun', 'lettuce', 'tomato', 'patty', 'cheese', 'patty', 'lettuce', 'top-bun'],
    ['bottom-bun', 'lettuce', 'tomato', 'cheese', 'tomato', 'lettuce', 'top-bun']
]; //추후 추가 가능하도록
const BURGER_WIDTH = 180;
const INGREDIENT = {'bottom-bun': (7*BURGER_WIDTH)/30, 'lettuce':(3*BURGER_WIDTH)/30, 'tomato':(4*BURGER_WIDTH)/30, 'patty':(5*BURGER_WIDTH)/30, 'cheese':(7*BURGER_WIDTH)/30};
var BURGER = 3;//현재 만들어야하는 버거
const cheeseMargin = 50;

function showBurgerRecipe(){
    var ingredient, h = 30;
    var answerRecipe = BURGER_LIST[BURGER];
    var parent = document.getElementById('burgerRecipe');
    parent.style.width = "300px";
    var div = document.createElement('div');
    div.innerHTML = "";
    div.style.position = 'relative';
    div.style.width = "300px";
    div.style.height = "500px";
    div.style.backgroundColor = "gray";
    
    for(var i = 0; i < answerRecipe.length; i++){
        ingredient = document.createElement('img');
        ingredient.src = `img/ingredient/${answerRecipe[i]}.png`;
        ingredient.style.position = 'absolute';
        ingredient.style.width = `${BURGER_WIDTH}px`;
        if(answerRecipe[i] === 'cheese') {
            h -= cheeseMargin; // 치즈 마진 추가
        }
        ingredient.style.bottom = `${h}px`;
        h += INGREDIENT[answerRecipe[i]];
        
        div.appendChild(ingredient);
    }

    parent.appendChild(div);
}