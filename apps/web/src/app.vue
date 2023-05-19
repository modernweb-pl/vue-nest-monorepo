<template>
  <transition name="fade" mode="out-in">
    <app-splash v-if="loading" key="splash" />

    <component :is="layout" v-if="!loading" key="layout">
      <router-view />
    </component>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { appInitializer } from '~app/core';
import { AppSplash } from '~app/layout';

import './layout';
import './modules';
import './shared/bootstrap-vue';

const DEFAULT_LAYOUT = 'default';

export default Vue.extend({
  components: {
    AppSplash,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    layout() {
      return 'layout-' + (this.$route.meta?.layout || DEFAULT_LAYOUT);
    },
  },

  mounted(): void {
    let timer = Date.now();
    appInitializer.resolve().then(() => {
      // show splash screen for at least 500ms (remove if you don't like this behavior)
      timer = 500 - (Date.now() - timer);
      setTimeout(() => (this.loading = false), timer >= 0 ? timer : 0);
    });
  },
});
</script>

<style lang="scss">
@import 'styles/index';
</style>
