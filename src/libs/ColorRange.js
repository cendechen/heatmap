import Canvas from './Canvas'
export default class ColorRange {
  constructor (options = {}) {
    this.gradient = options.gradient || {
      0.25: 'rgba(0, 0, 255, 1)',
      0.55: 'rgba(0, 255, 0, 1)',
      0.85: 'rgba(255, 255, 0, 1)',
      1.0: 'rgba(255, 0, 0, 1)'
    }
    this.max = options.max || 30
    this.min = options.min || 0
    this.initPalette()
  }
  initPalette () {
    const gradient = this.gradient
    const canvas = new Canvas(256, 1)
    const ctx = this.ctx = canvas.getContext()
    const lineGradient = ctx.createLinearGradient(0, 0, 256, 1)
    for (let key in gradient) {
      lineGradient.addColorStop(parseFloat(key), gradient[key])
    }
    ctx.fillStyle = lineGradient
    ctx.fillRect(0, 0, 256, 1)
  }
  getColor (value) {
    var imageData = this.getImageData(value)
    return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3] / 256})`
  }
  getImageData (v) {
    const imageData = this.ctx.getImageData(0, 0, 256, 1).data
    if (v === undefined) {
      return imageData
    }
    const max = this.max
    const min = this.min
    if (v > max) {
      v = max
    }
    if (v < min) {
      v = min
    }
    var index = Math.floor((v - min) / (max - min) * (256 - 1)) * 4
    return [imageData[index], imageData[index + 1], imageData[index + 2], imageData[index + 3]]
  }
}
