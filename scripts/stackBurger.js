const BURGER_LIST =[
    ['bottom-bun', 'patty', 'cheese', 'patty', 'tomato', 'lettuce' , 'top-bun'],
    ['bottom-bun', 'lettuce', 'patty', 'lettuce', 'cheese', 'top-bun'],
    ['bottom-bun', 'lettuce', 'tomato', 'patty', 'cheese', 'patty', 'lettuce', 'top-bun'],
    ['bottom-bun', 'lettuce', 'tomato', 'cheese', 'tomato', 'lettuce', 'top-bun']
]; //추후 추가 가능하도록
const BURGER_WIDTH = 180;
const INGREDIENT = {'bottom-bun': (7*BURGER_WIDTH)/30, 'lettuce':(3*BURGER_WIDTH)/30, 'tomato':(4*BURGER_WIDTH)/30, 'patty':(5*BURGER_WIDTH)/30, 'cheese':(7*BURGER_WIDTH)/30};
const ingredientType = ["top-bun", "bottom-bun", "cheese", "lettuce","patty", "tomato"];
var BURGER = 3;//현재 만들어야하는 버거
var MAKEINGREDIENT; // 현재 만들어야 하는 재료
const cheeseMargin = 30;
var ingredientNexth;
var currentIngredient;
var answerRecipe;
var answerIngredient;
var burgerCount = 0; //완성된 버거 개수

function pickIngredient(){
    MAKEINGREDIENT = Math.floor(Math.random() * ingredientType.length);
    currentIngredient = -1;
    answerRecipe = ingredientType[MAKEINGREDIENT];
    document.getElementById('currentBurger').innerHTML = '';
    showIngredient();
}

function showIngredient(){
    var ingredient;
    var div = document.getElementById("burgerRecipe");
    div.innerHTML = "";
    ingredient = document.createElement('img');
    ingredient.src = `img/ingredient/${answerRecipe}.png`
    ingredient.style.position = 'absolute';
    ingredient.style.left = "50%"
    ingredient.style.top = "40%"
    ingredient.style.transform = "translateX(-50%)";
    ingredient.style.width = `${BURGER_WIDTH}px`;
    div.appendChild(ingredient);
}

function pickBurgerRecipe(){
    BURGER = Math.floor(Math.random() * BURGER_LIST.length);
    ingredientNexth = 30;//초기화
    currentIngredient = -1;
    answerRecipe = BURGER_LIST[BURGER];
    document.getElementById('currentBurger').innerHTML = '';
    showBurgerRecipe();
}

function showBurgerRecipe(){
    //css 관한 부분은 css로 옮겨서 설정해줘도 좋을 것 같음. 택!
    var ingredient, h = 30;
    var answerRecipe = BURGER_LIST[BURGER];
    var div = document.getElementById('burgerRecipe');
    div.innerHTML = "";
    
    for(var i = 0; i < answerRecipe.length; i++){
        ingredient = document.createElement('img');
        ingredient.src = `img/ingredient/${answerRecipe[i]}.png`;
        ingredient.style.width = `${BURGER_WIDTH}px`;
        if(answerRecipe[i] === 'cheese') {
            h -= cheeseMargin; // 치즈 마진 추가
        }
        ingredient.style.bottom = `${h}px`;
        h += INGREDIENT[answerRecipe[i]];
        
        div.appendChild(ingredient);
    }
}

function isComplete(){
    answerRecipe = BURGER_LIST[BURGER];
    switch(mode){
        case MODE.EASY: //todo 구현 필요 
            break;
        case MODE.NORMAL:
            if(currentIngredient == answerRecipe.length-1){
                console.log("****complete*****");
                burgerCount++;
                return true;
            }
            else
                return false;
        case MODE.HARD: //todo 구현 필요
            break;    
    }

    return false;
}

function appendIngredient(i){
    // i : genDefault에서 전달받는 재료의 type ( 충돌한 재료의 type )
    // 추후 mode별 기능 차이를 두기 위해 인자 추가

    //난이도 별로 판정이 달라서 판정 후에 본 함수를 호출하여 추가하면 됨.

    //수정 필요해 보임. 
    //완성이 되었으면 새로운 레시피 선택하도록 함. 현재의 완성품은 없앰.
    //console.log(mode);
    switch(mode){
        case MODE.EASY : appendIngredientEasy(i); break;
        case MODE.NORMAL: appendIngredientNormal(i); break;
        case MODE.HARD: appendIngredientHard(i); break;
    }
    if(isComplete()){
        setBurgerRecipeHistory();
        setTotalBurger();
        console.log("complete:", burgerCount);
        // removeBuregerRecipe();
        return;
    }
}

// 충돌한 재료의 type을 받음
// 충돌한 재료를 currentBurger에 그림
function appendIngredientEasy(i){
    var ingredient;
    var div = document.getElementById('currentBurger');
    ingredient = document.createElement('img');
    div.innerHTML = "";
    console.log("current: "+ i + ": answer " + answerIngredient + currentIngredient);
    ingredient.src = `img/ingredient/${i}.png`;
    ingredient.style.position = 'absolute';
    ingredient.style.left = "50%"
    ingredient.style.top = "40%"
    ingredient.style.transform = "translateX(-50%)";
    ingredient.style.width = `${BURGER_WIDTH}px`;
    console.log("ingred", ingredient);
    div.appendChild(ingredient);
}

function appendIngredientNormal(i){
    var ingredient;
    var div = document.getElementById('currentBurger');
    console.log(i+", "+answerRecipe[currentIngredient+1]+", "+currentIngredient); 
    console.log("burgerRecipe length: ", answerRecipe.length-1);
    if(i != answerRecipe[currentIngredient+1]){
        return;
    }
    currentIngredient += 1;
    console.log("currnt", currentIngredient);
    ingredient = document.createElement('img');
    ingredient.src = `img/ingredient/${i}.png`;
    ingredient.style.width = `${BURGER_WIDTH}px`;
    if(answerRecipe[currentIngredient] === 'cheese') {
        ingredientNexth -= cheeseMargin; // 치즈 마진 추가
    }
    ingredient.style.bottom = `${ingredientNexth}px`;
    ingredientNexth += INGREDIENT[answerRecipe[currentIngredient]];
    
    div.appendChild(ingredient);
}

function appendIngredientHard(i){
    // todo 구현 필요
}
function removeIngredient(){
    var answerRecipe = BURGER_LIST[BURGER];
    var div = document.getElementById('currentBurger');
    if(div.childElementCount>0){
        div.removeChild(div.lastChild);
        if(answerRecipe[currentIngredient] === 'cheese') {
            ingredientNexth += cheeseMargin; // 치즈 마진 추가
        }
        ingredientNexth -= INGREDIENT[answerRecipe[currentIngredient]];
        currentIngredient -= 1;
    }
}

function removeBuregerRecipe(){
    var parent = document.getElementById("burgerRecipe");
    var children = parent.querySelectorAll("img");
    children.forEach(function(child) {
        parent.removeChild(child);
    });
}
