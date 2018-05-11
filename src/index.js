import Canvas from './libs/Canvas'
import ColorRange from './libs/ColorRange'
import CONF from './CONF'
import _ from 'lodash'
import {max, min} from 'd3-array'
import * as d3 from 'd3-scale'

class HeatMap {
  constructor (canvas, options = {}) {
    this.width = canvas.width
    this.height = canvas.height
    this.options = _.extend(CONF, options)
    this.ctx = canvas.getContext('2d')
    this.ColorRange = new ColorRange(this.options)
  }
  _initData (data) {
    // 计算最小值 和 最大值
    this.options.max = max(data, (d) => {
      return d.value
    })
    this.options.min = min(data, (d) => {
      return d.value
    })
  }
  /**
   * 渲染函数
   * @param  {Object} data [description]
   * @return {[type]}      [description]
   *
   * data [{
   *   x, // x 坐标
   *   y, // y 坐标
   *   value 值
   * }]
   */
  render (data) {
    this._initData(data)
    // 计算初始值
    let dataOrderByAlpha = {}
    data.forEach(item => {
      const alpha = this._getSpotAlpha(item)
      dataOrderByAlpha[alpha] = dataOrderByAlpha[alpha] || []
      dataOrderByAlpha[alpha].push(item)
    })
    // 绘制灰度图
    let imageData = this._drawHuiDu(dataOrderByAlpha)
    // 颜色替换
    this._colorChange(imageData)
    this.ctx.putImageData(imageData, 0, 0)
  }
  // 渲染单点的元素
  _creatHeatMapCircle () {
    const size = this.options.size
    const shadowBlur = size / 2
    const r = size + shadowBlur
    const offsetDistance = 1000
    const circle = new Canvas(r * 2, r * 2)
    let ctx = circle.getContext()
    ctx.shadowBlur = shadowBlur
    ctx.shadowColor = 'black'
    ctx.shadowOffsetX = ctx.shadowOffsetY = offsetDistance
    ctx.beginPath()
    ctx.arc(r - offsetDistance, r - offsetDistance, size, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    return circle
  }
  // 获取点的归一化的透明度
  _getSpotAlpha (data) {
    let value = data.value || 0
    const scale = this.options.scale
    let scaleFn
    switch(scale) {
      case 'linear' :
        scaleFn = d3.scaleLinear()
        break
      case 'sqrt' :
        scaleFn = d3.scaleSqrt()
        break
      case 'log' :
        scaleFn = d3.scaleLog()
        break
      case 'pow':
        scaleFn = d3.scalePow()
        break
    }
    scaleFn.domain([this.options.min, this.options.max]).range([0, 1])
    const alpha = scaleFn(value).toFixed(2)
    return alpha
  }
  // 绘制灰度图形
  _drawHuiDu (data) {
    const sCanvas = new Canvas(this.width, this.height)
    const circle = this._creatHeatMapCircle()
    const width = circle.width
    const height = circle.height
    const sctx = sCanvas.getContext()
    for (var i in data) {
      var datas = data[i]
      sctx.beginPath()
      sctx.globalAlpha = parseFloat(i)
      datas.forEach(d => {
        sctx.drawImage(circle.canvas, d.x - width / 2, d.y - height / 2)
      })
    }
    return sctx.getImageData(0, 0, this.width, this.height)
  }
  // 颜色替换函数
  _colorChange (imageData) {
    const opacity = this.options.opacity
    const gradient = this.ColorRange.getImageData()
    let i = 3
    let j
    let len = imageData.data.length
    for (; i < len; i += 4) {
      j = imageData.data[i] * 4
      // 是通过透明度来映射， 透明度0 - 255， 每一个透明度映射一个颜色
      if (imageData.data[i] / 256 > opacity) {
        imageData.data[i] = 256 * opacity
      }
      imageData.data[i - 3] = gradient[j]
      imageData.data[i - 2] = gradient[j + 1]
      imageData.data[i - 1] = gradient[j + 2]
    }
  }
}

export default HeatMap
