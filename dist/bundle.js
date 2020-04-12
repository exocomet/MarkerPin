(function (Vue, Vuex) {
  'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  Vuex = Vuex && Object.prototype.hasOwnProperty.call(Vuex, 'default') ? Vuex['default'] : Vuex;

  const SET_VALUE = 'SET_VALUE';

  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      value: undefined,
    },
    getters: {
      getValue: state => {
        return state.value;
      },
    },
    actions: {
      setValue ({commit}, payload) {
        this.commit(SET_VALUE, payload);
      },

    },
    mutations: {
      [SET_VALUE] (state, value) {
        state.value = value * 1;
      }
    }
  });

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'Range',
    props: [
      'value',
      'min',
      'max',
      'step'
    ],
    methods: {
      onChange (event) {
        this.$emit('change', Number(event.target.value));
      },
      onInput (event) {
        this.$emit('input', Number(event.target.value));
      },
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "flex three" }, [
      _c("span", [_c("label", [_vm._t("default")], 2)]),
      _vm._v(" "),
      _c("span", {}, [
        _c("input", {
          attrs: { type: "range", min: _vm.min, max: _vm.max, step: _vm.step },
          domProps: { value: _vm.value },
          on: { input: _vm.onInput, change: _vm.onChange }
        })
      ]),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.value))])
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-0d8ece85_0", { source: "\nlabel[data-v-0d8ece85] {\r\n  display: inline-block;\n}\r\n", map: {"version":3,"sources":["C:\\code\\MarkerPin\\src\\components\\Range.vue"],"names":[],"mappings":";AAkCA;EACA,qBAAA;AACA","file":"Range.vue","sourcesContent":["<template>\r\n  <div class=\"flex three\">\r\n    <span>\r\n      <label>\r\n        <slot></slot>\r\n      </label>\r\n    </span>\r\n    <span class=\"\">\r\n      <input type=\"range\" :value=\"value\" :min=\"min\" :max=\"max\" :step=\"step\"\r\n        @input=\"onInput\" @change=\"onChange\" />\r\n    </span>\r\n    <span>{{value}}</span>\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'Range',\r\n  props: [\r\n    'value',\r\n    'min',\r\n    'max',\r\n    'step'\r\n  ],\r\n  methods: {\r\n    onChange (event) {\r\n      this.$emit('change', Number(event.target.value));\r\n    },\r\n    onInput (event) {\r\n      this.$emit('input', Number(event.target.value));\r\n    },\r\n  },\r\n}\r\n</script>\r\n<style scoped>\r\nlabel {\r\n  display: inline-block;\r\n}\r\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-0d8ece85";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  const pin = function(ctx, p, r, options = {}) {
    let h = options.h * r || 2.0 * r;
    let ccw = true;
    let angle = Math.asin(r / h);
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

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  var script$1 = {
    components: {
      range: __vue_component__,
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
      radius(newVal, oldVal) {this.drawPin();},
      height(newVal, oldVal) {this.drawPin();},
      options: {
        handler(newVal, oldVal) {
          this.drawPin();
        },
        deep: true,
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "main" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "main flex two" }, [
        _c(
          "div",
          { staticClass: "controls" },
          [
            _c(
              "range",
              {
                attrs: { min: 4, max: 50, step: 1 },
                model: {
                  value: _vm.radius,
                  callback: function($$v) {
                    _vm.radius = $$v;
                  },
                  expression: "radius"
                }
              },
              [_vm._v("Radius")]
            ),
            _vm._v(" "),
            _c(
              "range",
              {
                attrs: { min: 0.0, max: 4, step: 0.1 },
                model: {
                  value: _vm.options.h,
                  callback: function($$v) {
                    _vm.$set(_vm.options, "h", $$v);
                  },
                  expression: "options.h"
                }
              },
              [_vm._v("height")]
            ),
            _vm._v(" "),
            _c(
              "range",
              {
                attrs: { min: 0.0, max: 1, step: 0.01 },
                model: {
                  value: _vm.options.ri,
                  callback: function($$v) {
                    _vm.$set(_vm.options, "ri", $$v);
                  },
                  expression: "options.ri"
                }
              },
              [_vm._v("Inner radius")]
            ),
            _vm._v(" "),
            _c(
              "range",
              {
                attrs: { min: 0.0, max: 20, step: 0.1 },
                model: {
                  value: _vm.options.weight,
                  callback: function($$v) {
                    _vm.$set(_vm.options, "weight", $$v);
                  },
                  expression: "options.weight"
                }
              },
              [_vm._v("Line weight")]
            ),
            _vm._v(" "),
            _c(
              "range",
              {
                attrs: { min: 0.0, max: 1, step: 0.05 },
                model: {
                  value: _vm.options.fillOpacity,
                  callback: function($$v) {
                    _vm.$set(_vm.options, "fillOpacity", $$v);
                  },
                  expression: "options.fillOpacity"
                }
              },
              [_vm._v("Fill opacity")]
            )
          ],
          1
        ),
        _vm._v(" "),
        _vm._m(1)
      ])
    ])
  };
  var __vue_staticRenderFns__$1 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("header", [
        _c("img", {
          staticStyle: { position: "relative" },
          attrs: {
            src:
              "https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA02744-1024x768.jpg"
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          {
            staticStyle: {
              position: "absolute",
              top: "20px",
              left: "30px",
              width: "100%"
            }
          },
          [_c("h1", { staticClass: "anaglyph" }, [_vm._v("Marker pin")])]
        )
      ])
    },
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c("canvas", { attrs: { id: "canvas", width: "400", height: "400" } })
      ])
    }
  ];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-f7450aa8_0", { source: "\n.main[data-v-f7450aa8] {\n  margin: 0 auto;\n}\nlabel[data-v-f7450aa8] {\n  display: inline-block;\n}\ncanvas[data-v-f7450aa8] {\n  border: 1px dotted black;\n}\n.anaglyph[data-v-f7450aa8] {\n  padding: 0;\n  position: relative;\n  font-family: 'Orbitron', sans-serif;\n  font-size: 100px;\n  letter-spacing: -3px;\n  color: rgba(0, 254, 254, 1);\n}\n.anaglyph[data-v-f7450aa8]::after {\n  content: \"Marker pin\";\n  position: absolute;\n  left: 9px;\n  top: -1px;\n  color: rgba(254, 0, 2, 1);\n  /* mix-blend-mode: multiply; */\n  mix-blend-mode: screen;\n}\nheader[data-v-f7450aa8] {\n  position: absolute;\n  top: 20px;\n  left: 30px;\n  width: 100%;\n}\n.main[data-v-f7450aa8] {\n  width: 100%;\n  position: absolute;\n  top: 250px;\n  text-align: center;\n}\n.controls[data-v-f7450aa8] {\n  padding-top: 50px;\n  background-color: white;\n}\n", map: {"version":3,"sources":["C:\\code\\MarkerPin\\src\\App.vue"],"names":[],"mappings":";AAyIA;EACA,cAAA;AACA;AACA;EACA,qBAAA;AACA;AACA;EACA,wBAAA;AACA;AACA;EACA,UAAA;EACA,kBAAA;EACA,mCAAA;EACA,gBAAA;EACA,oBAAA;EACA,2BAAA;AACA;AACA;EACA,qBAAA;EACA,kBAAA;EACA,SAAA;EACA,SAAA;EACA,yBAAA;EACA,8BAAA;EACA,sBAAA;AACA;AACA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;AACA;AACA;EACA,WAAA;EACA,kBAAA;EACA,UAAA;EACA,kBAAA;AACA;AACA;EACA,iBAAA;EACA,uBAAA;AACA","file":"App.vue","sourcesContent":["<template>\r\n  <div class=\"main\">\r\n    <header>\r\n      <img style=\"position: relative;\"\r\n        src=\"https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA02744-1024x768.jpg\">\r\n      <!-- <p>https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA02744</p> -->\r\n      <div style=\"position: absolute; top: 20px; left: 30px; width: 100%;\">\r\n        <h1 class=\"anaglyph\">Marker pin</h1>\r\n      </div>\r\n    </header>\r\n\r\n    <div class=\"main flex two\">\r\n      <div class=\"controls\">\r\n        <range v-model=\"radius\" :min=\"4\" :max=\"50\" :step=\"1\">Radius</range>\r\n        <range v-model=\"options.h\" :min=\"0.0\" :max=\"4\" :step=\"0.1\">height</range>\r\n        <range v-model=\"options.ri\" :min=\"0.0\" :max=\"1\" :step=\"0.01\">Inner radius</range>\r\n        <range v-model=\"options.weight\" :min=\"0.0\" :max=\"20\" :step=\"0.1\">Line weight</range>\r\n        <range v-model=\"options.fillOpacity\" :min=\"0.0\" :max=\"1\" :step=\"0.05\">Fill opacity</range>\r\n        <!-- <range v-model=\"fill\" :min=\"0.0\" :max=\"3\" :step=\"0.1\">height</range> -->\r\n        <!-- <range v-model=\"stroke\" :min=\"0.0\" :max=\"3\" :step=\"0.1\">height</range> -->\r\n      </div>\r\n      <div>\r\n        <canvas id=\"canvas\" width=\"400\" height=\"400\"></canvas>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n<script>\r\nconst pin = function(ctx, p, r, options = {}) {\r\n  let h = options.h * r || 2.0 * r;\r\n  let ccw = true;\r\n  let angle = Math.asin(r / h);\r\n  let angle2 = 0.5 * Math.PI - angle;\r\n  let rs = options.ri * r || 0.4 * r;\r\n\r\n  let fillOpacity = options.fillOpacity !== undefined ? options.fillOpacity : '0.8';\r\n\r\n  ctx.save();\r\n\r\n  ctx.translate(0.5, 0.5);\r\n\r\n\r\n\r\n  ctx.fillStyle = options.fill || `rgba(75,185,155,${fillOpacity})`;\r\n  ctx.strokeStyle = options.stroke || \"black\";\r\n\r\n  ctx.lineWidth = options.weight;\r\n\r\n  ctx.translate(p.x, p.y);\r\n  ctx.moveTo(0, -h);\r\n  ctx.beginPath();\r\n  ctx.arc(0, -h, r, -Math.PI - angle, angle);\r\n  ctx.lineTo(0, 0);\r\n  let c1 = 0,\r\n    c2 = -h;\r\n  ctx.lineTo(\r\n    c1 + Math.cos(-Math.PI - angle) * r,\r\n    c2 + Math.sin(-Math.PI - angle) * r\r\n  );\r\n  ctx.closePath();\r\n\r\n  ctx.moveTo(rs, c2);\r\n  ctx.arc(c1, c2, rs, 0, Math.PI * 2, ccw);\r\n  ctx.closePath();\r\n\r\n  ctx.fill()\r\n  ctx.stroke();\r\n\r\n  ctx.restore();\r\n}\r\n\r\nimport range from './components/Range.vue';\r\n\r\nexport default {\r\n  components: {\r\n    range,\r\n  },\r\n  data() {\r\n    return {\r\n      canvas: undefined,\r\n      context: undefined,\r\n      radius: 50,\r\n      options: {\r\n        h: 2, // height factor of radius\r\n        ri: 0.3, // inner radius factor of radius\r\n        weight: 2,\r\n        fill: undefined,\r\n        stroke: undefined,\r\n      },\r\n      p: {x: 200, y: 200},\r\n    };\r\n  },\r\n  computed: {\r\n    // innerRadius: {\r\n    //   get() {\r\n    //     console.log('get', this._innerRadius);\r\n    //     return this._innerRadius\r\n    //   },\r\n    //   set(newValue) {\r\n    //     if (newValue + 4 >= this.radius) {\r\n    //       this._innerRadius = this.radius - 4;\r\n    //     } else {\r\n    //       this._innerRadius = newValue;\r\n    //     }\r\n    //     console.log(newValue, this._innerRadius);\r\n    //   }\r\n    // }\r\n  },\r\n  mounted() {\r\n    this.createCanvas();\r\n    this.drawPin();\r\n  },\r\n  methods: {\r\n    createCanvas() {\r\n      this.canvas = document.getElementById('canvas');\r\n      this.context = this.canvas.getContext('2d');\r\n    },\r\n    drawPin() {\r\n      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n      let p = this.p;\r\n      let r = this.radius;\r\n      pin(this.context, this.p, this.radius, this.options);\r\n    }\r\n  },\r\n  watch: {\r\n    radius(newVal, oldVal) {this.drawPin()},\r\n    height(newVal, oldVal) {this.drawPin()},\r\n    options: {\r\n      handler(newVal, oldVal) {\r\n        this.drawPin()\r\n      },\r\n      deep: true,\r\n    }\r\n  }\r\n}\r\n</script>\r\n<style scoped>\r\n  .main {\r\n    margin: 0 auto;\r\n  }\r\n  label {\r\n    display: inline-block;\r\n  }\r\n  canvas {\r\n    border: 1px dotted black;\r\n  }\r\n  .anaglyph {\r\n    padding: 0;\r\n    position: relative;\r\n    font-family: 'Orbitron', sans-serif;\r\n    font-size: 100px;\r\n    letter-spacing: -3px;\r\n    color: rgba(0, 254, 254, 1);\r\n  }\r\n  .anaglyph::after {\r\n    content: \"Marker pin\";\r\n    position: absolute;\r\n    left: 9px;\r\n    top: -1px;\r\n    color: rgba(254, 0, 2, 1);\r\n    /* mix-blend-mode: multiply; */\r\n    mix-blend-mode: screen;\r\n  }\r\n  header {\r\n    position: absolute;\r\n    top: 20px;\r\n    left: 30px;\r\n    width: 100%;\r\n  }\r\n  .main {\r\n    width: 100%;\r\n    position: absolute;\r\n    top: 250px;\r\n    text-align: center;\r\n  }\r\n  .controls {\r\n    padding-top: 50px;\r\n    background-color: white;\r\n  }\r\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-f7450aa8";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  new Vue({
    el: '#app',
    store,
    render: h => h(__vue_component__$1),
  });

}(Vue, Vuex));
