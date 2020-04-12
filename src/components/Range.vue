<template>
  <div class="flex three">
    <span>
      <label>
        <slot></slot>
      </label>
    </span>
    <span class="">
      <input type="range" :value="value" :min="min" :max="max" :step="step"
        @input="onInput" @change="onChange" />
    </span>
    <span>{{value}}</span>
  </div>
</template>
<script>
export default {
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
}
</script>
<style scoped>
label {
  display: inline-block;
}
</style>