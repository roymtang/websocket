var websocket = '';
var ajaxPageNum = 1;
var last_health;
var health_timeout = 10;
var tDates = [], tData=[];
var rightIndex;

var userName = 'aa';

if (window.WebSocket) {
    websocket = new WebSocket(encodeURI('ws://' + document.domain + ':8085'));
    websocket.onopen = function () {
        console.log('已连接');
        websocket.send(userName);
        health_timer = setInterval(function () {
            keepalive(websocket)
        }, 60000)
    }

    websocket.onerror = function () {
        console.log('连接发生错误');
    }

    websocket.onclose = function () {
        console.log('连接已断开');
        initWs();
    }

    websocket.onmessage = function (message) {
        showNotice(message);
    }
} else {
    alert('浏览器不支持')
}


var initWs = function () {
    if (window.WebSocket) {
        websocket = new WebSocket(encodeURI('ws://' + document.domain + ':8085'));
        websocket.onopen = function () {
            console.log('已连接');
            websocket.send('online' + userName);
            health_timer = setInterval(function () {
                keepalive(websocket)
            }, 60000)
        }

        websocket.onerror = function () {
            console.log('连接发生错误');
        }

        websocket.onclose = function () {
            console.log('连接已断开');
            initWs();
        }

        websocket.onmessage = function (ev) {
            showNotice(ev);
        }
    } else {
        alert('浏览器不支持')
    }
}

function showNotice(msg) {
    console.log('接收到信息:' + msg);
}



function keepalive(ws) {
    var time = new Date();
    if (last_health != -1 && (time.getTime() - last_health > health_timeout)) {

        // ws.close();
    } else {
        if (ws.bufferedAmount == 0) {
            ws.send('~HC~');
        }
    }
}