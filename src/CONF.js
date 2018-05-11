export default {
  max: 200, // 默认最大值
  min: 0, // 默认最小值
  size: 10, // 单点的尺寸半径
  gradient: { // 颜色渐变色带
    0.25: 'rgb(0,0,255)',
    0.55: 'rgb(0,255,0)',
    0.85: 'yellow',
    1.0: 'rgb(255,0,0)'
  },
  globalAlpha: 0.8, // 全局透明度设置
  scale: 'linear', // 'linear' // 支持d3的 sqrt log pow

}
