# heatmap

>   浏览器端绘制热力图

## start

1. 安装热力图
```
 npm i ce-heatmap --save-dev
```

2. 引用热力组件
```
import HeatMap from 'ce-heatmap'
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
   const options = {
        grediant: {}, // 配置渐变色，
        max: 0, // 最大的value值
        min: 0, // 最小的value值
        size：19, // 单点最小的半径
        globalAlpha：0.8, // 全局的透明度，
        scale: 'linear' // 默认的数据归一化使用的变化函数  
    }
```

``` 
# 重新编译生产目标文件
npm run libbuild
```

