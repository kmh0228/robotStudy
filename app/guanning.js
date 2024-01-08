// Move the mouse across the screen as a sine wave.
var robot = require("robotjs");
 

var base = 1;

var fq = 1000; // 多少毫秒监控一次

// 需要按得键
var keys = [{
    key:2,
    time:4000,
    curTime:4000
},{
    key:3,
    time:9000,
    curTime:9000
},{
    key:4,
    time:15000,
    curTime:15000
},{
    key:5,
    time:5000,
    curTime:5000
}]

var keysLength = keys.length

setInterval(()=>{
    var key = keys.find(function(n){return n.curTime <= 0}) || {key: base}
    robot.keyTap(key.key)
    for(var i=0;i < keysLength; i++){
        var item = keys[i]
        if(item.key === key.key){
            item.curTime = item.time
        }
        item.curTime -= fq
    }

},fq)