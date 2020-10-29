<template>
  <div>
    <p>User profile:</p>
    <p>{{ profile }}</p>
    <b-button variant="secondary" @click="fetch">Refresh</b-button>
  </div>
</template>

<script lang="ts">
import { AuthProfileDto } from '@app/dto';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { authActions, authGetters } from '../store';

export default Vue.extend({
  name: 'auth-profile',
  computed: {
    ...mapGetters({
      profile: authGetters.profile,
    }),
  },
  created(): Promise<AuthProfileDto | void> {
    return this.fetch();
  },
  methods: {
    ...mapActions({
      fetch: authActions.fetchProfile,
    }),
  },
});
</script>

<style lang="scss" scoped></style>
