function getCookie(name){
    let strcookie = document.cookie;//获取cookie字符串
    let arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( let i = 0; i < arrcookie.length; i++) {
    let arr = arrcookie[i].split("=");
    if (arr[0] == name){
    return decodeURIComponent(arr[1]);
    }
    }
    return "";
}

function initDom(){
    let list = [
        "./libs/three.min.js",
        "./vendor.bundle.js",
        "./app.bundle.js"
    ];
    let script = [], dom = document.getElementsByTagName('body')[0];
    for (let i = 0; i < list.length; i++) {
        script.push(document.createElement('script'));
        script[i].src = list[i];
        if (i === 0) {
            script[0].id = 'treejs';
        }
        dom.appendChild(script[i]);
    }
}
// initDom();

// loading：show
function showLoading(title,time){
    let dom = document.getElementById('loading-bar');
    if( loadingBar().style.display.indexOf('block') > -1 && dom.dataset.intervalIntege){
        console.log('Loading Modal has shown !');
    }else{
        loadingBar().querySelector('.loading-text').innerHTML = title || '加载中...';
        loadingBar().style.display = "block";
        dom.dataset.count = '0%';
        dom.style.width = '0';
        dom.dataset.intervalIntege = loadingInterval(dom,time);
    }
   
}
showLoading();
// loading：hide
function hideLoading(){
    let dom = document.getElementById('loading-bar');
    if(dom.dataset.intervalIntege){
        clearInterval(dom.dataset.intervalIntege);
    }
    dom.dataset.count = null;
    dom.dataset.intervalIntege = null;
    loadingBar().style.display = "none";
    dom.dataset.count = '100%';
    dom.style.width = '100%';
    close(); 
}
function updataLoading(count,width,title){
    let dom = document.getElementById('loading-bar');
    if(loadingBar().style.display.indexOf('block') > -1 && dom.dataset.intervalIntege){
        dom.dataset.count = count + '%';
        dom.style.width = !isUndefined(width)  ? width + '%' : count + '%';
        loadingBar().querySelector('.loading-text').innerHTML = title || '加载中...';
    }else{
        console.log('loading Modal is disvisible!');
    }
}
function isUndefined(value){
    return typeof value === 'undefined';
}
function timeFixedFor(t){
    return +(1000*1000/(t||1000)).toFixed(1);
}
function percent(count,during){
    let result = parseInt(count*100/1000/during);
    return result > 100 ? '100%' : result + '%';
}
function loadingInterval(dom,time){
    dom.dataset.count = '0%';
    let step = 0,during = 20; // 默认20s
    let result = setInterval(function () {
        step++;
        let count = step * timeFixedFor(time);
        if (count > 1000 * during) {
            clearInterval(loadingInterval);
            dom.dataset.count = '100%';
            dom.style.width = '100%';
            close();
            return;
        }
        dom.dataset.count = percent(count,during);
        dom.style.width =  percent(count,during);
    }, 1000);
    return result;
}
function getAuthor(){
    let result = {};
    result.id = getCookie('author').split(':')[0];
    result.key =  getCookie('author').split(':')[1];
    return result;
}
function close(show) {
    setTimeout(function(){
        let dom = document.getElementById('loading-bar');
        dom.dataset.count = '0%';
        dom.style.width = '0';
        document.getElementById("maskbbg").style.display = 'none';
    },100)
}
function loadingBar(){
    return document.getElementById("maskbbg")
}
