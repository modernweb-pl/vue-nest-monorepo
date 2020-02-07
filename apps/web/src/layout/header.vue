<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">@app/web</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="loggedIn" text="User">
          <b-dropdown-item :to="routes.profile">Profile</b-dropdown-item>
          <b-dropdown-item :to="routes.logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="routes.login" v-else>Login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { AuthRoute } from '~app/modules/auth/routes';
import { authGetters } from '~app/modules/auth/store';

export default Vue.extend({
  data() {
    return {
      routes: {
        login: { name: AuthRoute.LOGIN },
        logout: { name: AuthRoute.LOGOUT },
        profile: { name: AuthRoute.PROFILE },
      },
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: authGetters.loggedIn,
    }),
  },
});
</script>
