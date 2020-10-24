<template>
  <div class="row">
    <div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
      <div class="card">
        <article class="card-body">
          <h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
          <hr />

          <p class="alert alert-danger text-center" v-if="error">{{ error }}</p>

          <b-form novalidate @submit.prevent="submit">
            <b-form-group invalid-feedback="Field required" :state="valid.login">
              <b-input-group>
                <!-- TODO
                <template #prepend>
                  <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                </template>
                -->
                <b-form-input
                  autofocus
                  placeholder="Login"
                  v-model="form.login"
                  :state="valid.login"
                />
              </b-input-group>
            </b-form-group>

            <b-form-group invalid-feedback="Field required" :state="valid.password">
              <b-input-group>
                <!-- TODO
                <template #prepend>
                  <b-input-group-text><i class="fa fa-lock"></i></b-input-group-text>
                </template>
                -->
                <b-form-input
                  type="password"
                  v-model="form.password"
                  placeholder="Password"
                  :state="valid.password"
                />
              </b-input-group>
            </b-form-group>

            <b-form-group class="text-center">
              <!-- TODO demo mode -->
              <small class="text-muted">
                Use <strong>demo</strong> / <strong>demo</strong> to login
              </small>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary" block>Login</b-button>
            </b-form-group>
            <!-- TODO
            <p class="text-center"><a href="#" class="btn">Forgot password?</a></p>
            -->
          </b-form>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { authActions } from '../store';

export default Vue.extend({
  name: 'auth-login',
  data() {
    return {
      form: {
        login: '',
        password: '',
      },
      valid: {
        login: void 0,
        password: void 0,
      } as { login?: boolean; password?: boolean },
      error: '',
    };
  },
  methods: {
    ...mapActions({
      login: authActions.login,
    }),
    submit() {
      this.valid = { login: void 0, password: void 0 };

      const login = this.form.login.trim();
      this.valid.login = !login ? false : void 0;

      const password = this.form.password.trim();
      this.valid.password = !password ? false : void 0;

      if (!login || !password) {
        return;
      }

      this.error = '';

      return this.login({ login, password })
        .then(() => {
          const back = this.$route.query.back as string;
          this.$router.push(back || { name: 'home' });
        })
        .catch((e) => {
          this.error = e.status === 401 ? 'Wrong login and/or password' : 'Unexpected server error';
        });
    },
  },
});
</script>

<style lang="scss" scoped></style>
