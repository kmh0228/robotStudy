const express = require('express')
var robot = require("robotjs");
const app = express()
const port = 8020

//设置跨域访问
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    // //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 可以带cookies
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  })

app.get('/', (req, res) => {

    // 操作电脑
    robot.keyTap('tab','alt') // 按一下 alt + tab
    robot.keyTap('v', 'control') // 按一下ctrl + V
    robot.keyTap('enter')  // 按一下回车
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})