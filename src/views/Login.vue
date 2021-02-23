<template>
  <div class="login">
    <form v-if="showLoginForm" @submit.prevent="login">
      <h1>Login</h1>
      <div class="email">
        <input
          type="email"
          v-model.trim="loginForm.email"
          placeholder="email"
        />
      </div>
      <div class="password">
        <input
          type="password"
          v-model.trim="loginForm.password"
          placeholder="password"
        />
      </div>

      <input class="btn" type="submit" value="Login" />
      <br />
      <a @click="switchForms"> Not signed up? Sign up here! </a>
    </form>
    <!-- ****************************************************** -->
    <form v-else @submit.prevent="signup">
      <h1>Sign Up</h1>
      <div class="name">
        <input
          type="text"
          v-model.trim="signupForm.name"
          placeholder="Name"
          id="name"
        />
      </div>
      <div class="email">
        <input
          type="email"
          v-model.trim="signupForm.email"
          placeholder="email"
        />
      </div>
      <div class="password">
        <input
          type="password"
          v-model.trim="signupForm.password"
          placeholder="password"
        />
      </div>
      <div class="button">
        <input class="btn" type="submit" value="Signup" />
      </div>
      <div class="options">
        <a @click="switchForms">Already signed up? Login</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        email: "",
        password: "",
      },
      showLoginForm: true,
    };
  },
  methods: {
    switchForms() {
      this.showLoginForm = !this.showLoginForm;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        name: this.signupForm.name,
        email: this.signupForm.email,
        password: this.signupForm.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
  margin-bottom: 0;
}
.btn {
  width: 400px;
  height: 75px;
  font-size: 100%;
  margin-top: 20px;
  background-color: #42b983;
}
</style>