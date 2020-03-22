<template>
  <div class="main">
    <h1>Marker pin</h1>
    <div class="flex two">
      <div>
        <range v-model="radius" :min="4" :max="50" :step="1">Radius</range>
        <range v-model="innerRadius" :min="0.0" :max="1" :step="0.1">Inner radius</range>
        <range v-model="perimeter" :min="0.0" :max="3" :step="0.1">Perimeter</range>
      </div>
      <div>
        <canvas id="canvas" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
</template>
<script>

const pin = function(ctx, p, r, options = {}) {
  let h = options.h * r || 2.0 * r;
  let ccw = true;
  let angle = Math.asin(r / h);
  let angle2 = 0.5 * Math.PI - angle;
  let rs = options.ri * r || 0.4 * r;

  ctx.save();
  ctx.fillStyle = options.fill || 'rgba(75,185,155,.5)'
  ctx.strokeStyle = options.stroke || "black";

  ctx.lineWidth = options.weight;

  ctx.translate(p.x, p.y);
  ctx.moveTo(0, -h);
  ctx.beginPath();
  ctx.arc(0, -h, r, -Math.PI - angle, angle);
  ctx.lineTo(0, 0);
  let c1 = 0,
    c2 = -h;
  ctx.lineTo(
    c1 + Math.cos(-Math.PI - angle) * r,
    c2 + Math.sin(-Math.PI - angle) * r
  );
  ctx.closePath();

  ctx.moveTo(rs, c2);
  ctx.arc(c1, c2, rs, 0, Math.PI * 2, ccw);
  ctx.closePath();

  ctx.fill()
  ctx.stroke();

  ctx.restore();
}

import range from './components/Range.vue';

export default {
  components: {range},
  data() {
    return {
      canvas: undefined,
      context: undefined,
      radius: 50,
      innerRadius: 0.3,
      perimeter: 2,
      p: {x: 200, y: 200},
    };
  },
  computed: {
    // innerRadius: {
    //   get() {
    //     console.log('get', this._innerRadius);
    //     return this._innerRadius
    //   },
    //   set(newValue) {
    //     if (newValue + 4 >= this.radius) {
    //       this._innerRadius = this.radius - 4;
    //     } else {
    //       this._innerRadius = newValue;
    //     }
    //     console.log(newValue, this._innerRadius);
    //   }
    // }
  },
  mounted() {
    this.createCanvas();
    this.drawPin();
  },
  methods: {
    createCanvas() {
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
    },
    drawPin() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let p = this.p;
      let r = this.radius;
      let options = {
        ri: this.innerRadius,
        h: this.perimeter,
      };
      console.log(p, r, options)
      pin(this.context, this.p, this.radius, options);
    }
  },
  watch: {
    radius(newVal, oldVal) {this.drawPin()},
    innerRadius(newVal, oldVal) {this.drawPin()},
    perimeter(newVal, oldVal) {this.drawPin()},
  }
}
</script>
<style scoped>
.main {
  margin: 0 auto;
}
label {
  display: inline-block;
}
canvas {
  border: 1px dotted black;
}
</style>