class Canvas {
  constructor (w, h) {
    this.width = w
    this.height = h
    this.canvas = document.createElement('canvas')
    this.canvas.width = w
    this.canvas.height = h
  }
  getContext () {
    return this.canvas.getContext('2d')
  }
  render (dom) {
    dom.append(this.canvas)
  }
}

export default Canvas
