<template>
  <svg
    class="spinner circular"
    viewBox="25 25 50 50"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <circle
      class="path"
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke-width="3"
      stroke-miterlimit="10"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'mw-spinner',
  props: {
    size: Number,
  },
});
</script>

<style lang="scss" scoped>
$green: #008744;
$blue: #0057e7;
$red: #d62d20;
$yellow: #ffa700;

.circular {
  will-change: transform;
  animation: rotate 2s linear infinite;
  transform-origin: center center;
}

.path {
  will-change: transform;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 1;
  animation: dash 1.2s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 1;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes color {
  100%,
  0% {
    stroke: $red;
  }
  40% {
    stroke: $blue;
  }
  66% {
    stroke: $green;
  }
  80%,
  90% {
    stroke: $yellow;
  }
}
</style>
