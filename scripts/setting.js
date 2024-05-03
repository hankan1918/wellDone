function showSetting(){
    // console.log(document.getElementById('charMenu').children[CHAR], CHAR);
    selectChar(document.getElementById('charMenu').children[CHAR]);
}

function selectChar(event){
    var charMenu = document.getElementById('charMenu');
    for(var i = 0; i<charMenu.childElementCount; i++){
        charMenu.children[i].style.borderTop = "";
        charMenu.children[i].style.borderBottom = "";
        charMenu.children[i].classList.remove("selected");
    }
    event.style.borderTop = "5px solid blue";
    event.style.borderBottom = "5px solid blue";
    event.classList.add("selected");
    
    var t = CHAR_LIST.indexOf(event.children[0].alt);
    if(t != CHAR){
        CHAR = t
        console.log(CHAR);
    }
}
    
