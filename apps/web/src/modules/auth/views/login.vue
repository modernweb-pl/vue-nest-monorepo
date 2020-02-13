<template>
  <div class="row">
    <div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
      <div class="card">
        <article class="card-body">
          <h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
          <hr />
          <!-- TODO
          <p class="text-success text-center">Some message goes here</p>
          -->
          <form @submit.prevent="submit">
            <div class="form-group">
              <div class="input-group">
                <!-- TODO
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                </div>
                -->
                <input
                  name="login"
                  class="form-control"
                  type="text"
                  placeholder="Login"
                  v-model="form.login"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <!-- TODO
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                </div>
                -->
                <input
                  class="form-control"
                  name="password"
                  type="password"
                  placeholder="Password"
                  v-model="form.password"
                />
              </div>
            </div>
            <div class="form-group text-center">
              <small class="text-muted">
                Use <strong>demo</strong> / <strong>demo</strong> to login
              </small>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </div>
            <!-- TODO
            <p class="text-center"><a href="#" class="btn">Forgot password?</a></p>
            -->
          </form>
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
    };
  },
  methods: {
    ...mapActions({
      login: authActions.login,
    }),
    submit() {
      this.login(this.form).then(() => {
        const back = this.$route.query.back as string;
        this.$router.push(back || { name: 'home' });
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
