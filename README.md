# heatmap

>  热力图组建，可以方便绘制热力图，使用非常简单

## start

1. 安装热力图
```
 npm i heatMap --save-dev
```

2. 引用热力组件
```
import HeatMap from 'heatMap'
var canvas = document.getElementById('canvas')
const w = canvas.width
const h = canvas.height
const heatMap = new HeatMap(canvas)

let data = []
for (var i = 0; i < 100 ; i ++) {
    data.push({
        x: Math.random() * w,
        y: Math.random() * h,
        value: Math.random() * 100
    })
}

heatMap.render(data)
```
3. 配置参数介绍
```
    options = {
        grediant: {} // 配置渐变色，
        max: 0 // 最大的value值
        min: 0 // 最小的value值
        size：19 // 单点最小的半径
        globalAlpha： 0.8 全局的透明度，
        scale: 'linear', // 默认的数据归一化使用的变化函数  
    }
```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

