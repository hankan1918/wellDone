var SCORE_KEY = "scoreList";
var SCORE_SHOW_FORM = ['rank', 'char', 'name', 'score']; //여기가 수정되면 appendScore()의 인자 이름도 수정되어야함.

function showScoreboard(){
    showPage('scoreboard', 'main');
    var td, tr, th, img;
    var parent = document.getElementById('scoreboardList');
    // start test code
    resetScoreStorage();
    // end test code
    var scoreList = getScores();
    parent.innerHTML = "";
    parent = document.createElement('table');

    tr = document.createElement('tr');
    for(var j = 0; j<SCORE_SHOW_FORM.length; j++){
        th=document.createElement('th');
        th.innerHTML = SCORE_SHOW_FORM[j];
        tr.appendChild(th);
    }
    parent.appendChild(tr);

    for(var i = 0; i<scoreList.length; i++){
        tr = document.createElement('tr');
        for(var j = 0; j<SCORE_SHOW_FORM.length; j++){
            td=document.createElement('td');
            td.setAttribute('align', 'right');
            if(j == 0) {
                td.innerHTML = i+1;
            }
            else{
                if(SCORE_SHOW_FORM[j] == 'char'){
                    img = document.createElement('img');
                    console.log(scoreList[i].char);
                    img.setAttribute('src', `img/char/${scoreList[i].char}.png`);
                    td.appendChild(img);
                }
                else td.innerHTML = scoreList[i][SCORE_SHOW_FORM[j]];
                console.log(scoreList[i][SCORE_SHOW_FORM[j]]);
            }
            tr.appendChild(td);
        }
        parent.appendChild(tr);
    }

    document.getElementById('scoreboardList').appendChild(parent);
}

function resetScoreStorage(){
    localStorage.setItem(SCORE_KEY,null);
}

function appendScore(score, name, char=CHAR_LIST[CHAR]) {
    try {
        // 기존에 로컬 스토리지에 저장된 데이터 불러오기
        let savedData = JSON.parse(localStorage.getItem(SCORE_KEY)) || [];
        
        // 새로운 데이터 추가
        savedData.push({ score, name, char });

        savedData.sort((a,b) => b.score - a.score)
        if(savedData.length >10){
            // console.log("개수 조정")
            savedData = savedData.slice(0,10)
        }
        // 로컬 스토리지에 저장
        localStorage.setItem(SCORE_KEY, JSON.stringify(savedData));
        console.log("데이터가 성공적으로 저장되었습니다.");
    } catch (error) {
        console.error("데이터 저장 중 오류가 발생했습니다:", error);
    }
}

function getScores() {
    try {
        // 로컬 스토리지에서 데이터 가져오기
        let savedData = JSON.parse(localStorage.getItem(SCORE_KEY)) || [];
        console.log(savedData)
        // 가져온 데이터 반환
        return savedData;
    } catch (error) {
        console.error("데이터 불러오기 중 오류가 발생했습니다:", error);
        return []; // 오류 발생 시 빈 배열 반환
    }
}