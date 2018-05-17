var travelData = [];
var selectArea = document.getElementById('js-select-area');
var travelBlock = document.querySelector('#js-travel-list');
var popularArea = document.querySelector('#js-popular-btn');

var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onload = function(data){
    var responseData =  JSON.parse(xhr.responseText);
    travelData = responseData.result.records;
    updateList('前鎮區');
}

function updateList(select){
    var template = '';
    var travelLen = travelData.length;
    var haveData = false;
    document.querySelector('#js-travel-area').textContent = select;
    for( var i = 0 ; i < travelLen ; i++){
        if(select == travelData[i].Zone){
            template += '<li>'+
                            '<div class="travel-title" style="background-image: url(' +travelData[i].Picture1 +')";>'+
                               '<h3>'+ travelData[i].Name + '</h3>'+
                               '<span>'+ travelData[i].Zone + '</span>'+
                            '</div>'+
                            '<ul class="travel-info">'+
                                '<li><i class="travel-icon time"></i><span>'+ travelData[i].Opentime + '</span></li>'+
                                '<li><i class="travel-icon address"></i><span>'+ travelData[i].Add + '</span></li>'+
                                '<li><i class="travel-icon telphone"></i><span>'+ travelData[i].Tel + '</span></li>'+
                            '</ul></li>';
            haveData = true;
        }
    }
    if(haveData) {
        travelBlock.innerHTML = template;
    } else {
        travelBlock.innerHTML = '<p class="nodata">目前並無相關資料!</p>';
    }
    
}

function showSelectList(e){
    var select = e.target.value;
    updateList(select);
}

function showPopularList(e){
    if(e.target.nodeName !== 'BUTTON'){return};
    var select = e.target.innerText;
    updateList(select);
}

selectArea.addEventListener('change',showSelectList,false);
popularArea.addEventListener('click',showPopularList,false);





