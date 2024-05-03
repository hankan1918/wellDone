function showPage(nxt='', cur=''){
    if(cur!= '') document.querySelector(`#${cur}.page`).style.display = 'none';
    document.querySelector(`#${nxt}.page`).style.display = 'block';
}