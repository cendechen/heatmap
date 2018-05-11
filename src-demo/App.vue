<template>
<canvas ref="canvas" width="600" height="800"></canvas>
</template>
<script>
import HeatMap from '../dist/index.js'
export default {
  mounted () {
    this.heatMap = new HeatMap(this.$refs.canvas)
    this.render()
  },
  data () {
    return {
      heatMap: {
        type: Object,
        default: () => {}
      }
    }
  },
  methods: {
    render () {
      let data = []
      for (var i = 0; i < 1000; i++) {
        data.push({
          x: Math.random() * 600,
          y: Math.random() * 800,
          value: Math.random() * 200
        })
      }
      this.heatMap.render(data)
    }
  }
}
</script>
