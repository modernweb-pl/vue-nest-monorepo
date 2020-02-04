<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import Vue from 'vue';

import './layout';
import './modules';

const DEFAULT_LAYOUT = 'default';

export default Vue.extend({
  computed: {
    layout() {
      return 'layout-' + (this.$route.meta.layout || DEFAULT_LAYOUT);
    },
  },
});
</script>

<style lang="scss">
@import 'styles/index';
</style>
