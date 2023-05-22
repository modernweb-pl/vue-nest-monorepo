<template>
  <div class="layout layout-default">
    <app-header />
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'layout-default',
});
</script>
