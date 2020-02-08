<template>
  <div class="splash">
    <div class="banner">
      <img class="logo" src="../assets/logo.png" alt="Vue" />
    </div>
    <mw-spinner :size="100" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MwSpinner } from '~app/shared/spinner';

export default Vue.extend({
  name: 'app-splash',
  components: {
    MwSpinner,
  },
});
</script>

<style lang="scss" scoped>
.splash {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  align-items: center;

  .logo {
    vertical-align: middle;
    margin-bottom: 40px;
  }
}
</style>
