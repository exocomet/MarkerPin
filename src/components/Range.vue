<template>
  <div>
    <label>
      <slot></slot>
    </label>
    <input type="range" :value="value" :min="min" :max="max" :step="step"
      @input="onInput"
      @change="onChange"
    />
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
      // console.log('change', event, event.target.value);
      this.$emit('change', Number(event.target.value));
    },
    onInput (event) {
      // console.log('input', event, event.target.value);
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