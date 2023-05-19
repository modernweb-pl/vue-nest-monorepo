<template>
  <div class="home text-center">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import HelloWorld from '~app/components/HelloWorld.vue';

export default {
  name: 'home-page',
  components: {
    HelloWorld,
  },
};
</script>
