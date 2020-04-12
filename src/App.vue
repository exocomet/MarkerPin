<template>
  <div class="main">
    <header>
      <img style="position: relative;"
        src="https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA02744-1024x768.jpg">
      <!-- <p>https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA02744</p> -->
      <div style="position: absolute; top: 20px; left: 30px; width: 100%;">
        <h1 class="anaglyph">Marker pin</h1>
      </div>
    </header>

    <div class="main flex two">
      <div class="controls">
        <range v-model="radius" :min="4" :max="50" :step="1">Radius</range>
        <range v-model="options.h" :min="0.0" :max="4" :step="0.1">height</range>
        <range v-model="options.ri" :min="0.0" :max="1" :step="0.01">Inner radius</range>
        <range v-model="options.weight" :min="0.0" :max="20" :step="0.1">Line weight</range>
        <range v-model="options.fillOpacity" :min="0.0" :max="1" :step="0.05">Fill opacity</range>
        <!-- <range v-model="fill" :min="0.0" :max="3" :step="0.1">height</range> -->
        <!-- <range v-model="stroke" :min="0.0" :max="3" :step="0.1">height</range> -->
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

  let fillOpacity = options.fillOpacity !== undefined ? options.fillOpacity : '0.8';

  ctx.save();

  ctx.translate(0.5, 0.5);



  ctx.fillStyle = options.fill || `rgba(75,185,155,${fillOpacity})`;
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
  components: {
    range,
  },
  data() {
    return {
      canvas: undefined,
      context: undefined,
      radius: 50,
      options: {
        h: 2, // height factor of radius
        ri: 0.3, // inner radius factor of radius
        weight: 2,
        fill: undefined,
        stroke: undefined,
      },
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
      pin(this.context, this.p, this.radius, this.options);
    }
  },
  watch: {
    radius(newVal, oldVal) {this.drawPin()},
    height(newVal, oldVal) {this.drawPin()},
    options: {
      handler(newVal, oldVal) {
        this.drawPin()
      },
      deep: true,
    }
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
  .anaglyph {
    padding: 0;
    position: relative;
    font-family: 'Orbitron', sans-serif;
    font-size: 100px;
    letter-spacing: -3px;
    color: rgba(0, 254, 254, 1);
  }
  .anaglyph::after {
    content: "Marker pin";
    position: absolute;
    left: 9px;
    top: -1px;
    color: rgba(254, 0, 2, 1);
    /* mix-blend-mode: multiply; */
    mix-blend-mode: screen;
  }
  header {
    position: absolute;
    top: 20px;
    left: 30px;
    width: 100%;
  }
  .main {
    width: 100%;
    position: absolute;
    top: 250px;
    text-align: center;
  }
  .controls {
    padding-top: 50px;
    background-color: white;
  }
</style>