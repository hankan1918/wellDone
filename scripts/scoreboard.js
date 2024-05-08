var SCORE_KEY = "scoreList";
var scoreList;

function showScoreboard(){

}

function removeScore(nickname){
    try {
        // 기존에 로컬 스토리지에 저장된 데이터 불러오기
        let savedData = JSON.parse(localStorage.getItem(SCORE_KEY)) || [];
        
        // 새로운 데이터 추가
        savedData.pop(nickname);
        // 로컬 스토리지에 저장
        localStorage.setItem(SCORE_KEY, JSON.stringify(savedData));
        console.log("데이터가 성공적으로 저장되었습니다.");
    } catch (error) {
        console.error("데이터 저장 중 오류가 발생했습니다:", error);
    }
}

function appendScore(char, nickname, score) {
    try {
        // 기존에 로컬 스토리지에 저장된 데이터 불러오기
        let savedData = JSON.parse(localStorage.getItem(SCORE_KEY)) || [];
        
        // 새로운 데이터 추가
        savedData.push({ char, nickname, score });
        // 로컬 스토리지에 저장
        localStorage.setItem(SCORE_KEY, JSON.stringify(savedData));
        console.log("데이터가 성공적으로 저장되었습니다.");
    } catch (error) {
        console.error("데이터 저장 중 오류가 발생했습니다:", error);
    }
}

function loadFromLocalStorage() {
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