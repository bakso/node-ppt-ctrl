node-ppt-ctrl
============
基于nodejs的impress.js幻灯片遥控器，类似Keynote Remoter  
使用你的移动设备控制impress.js幻灯片

A simple remote controler for impress.js based on Nodejs.

***使用方法：***  
    
    npm install  
    node index.js

在你的impress.js幻灯片页面中加入如下代码：
    
    <script src="/socket.io/socket.io.js"></script>
    <script>
    var im = impress();
    im.init();
    var page = 0;
    var socket = io.connect('http://'+location.hostname);
    socket.on('page', function (cur) {
        console.log(cur);
        var dl = cur -page;
        if(dl == 1){
            im.next();
        }else if(dl == -1){
            im.prev();
        }else{
            im.goto(cur);
        }
        page = cur;
    });
    </script>


ppt展示端通过访问http://127.0.0.1:3000/ppt地址（如index.html） 进行幻灯片展示  

手机端通过访问http://ip地址:3000/ctrl 进行遥控