<template>
  <div class="container-fluid">
    <password-reset
      v-if="showPasswordReset"
      @close="togglePasswordReset"
    ></password-reset>
    <div class="row">
      <section class="col-sm-6 login-section-wrapper">
        <div class="brand-wrapper">
          <h1 class="logo">Stonks 🚀</h1>
        </div>
        <div class="login-wrapper my-auto">
          <form v-if="showLoginForm" @submit.prevent="login">
            <h2 class="login-title">Login</h2>
            <div class="form-group">
              <input
                type="email"
                v-model.trim="loginForm.email"
                placeholder="email"
                autocomplete="email"
                class="form-control"
                id="email"
              />
            </div>
            <div class="form-group mb-4">
              <input
                type="password"
                v-model.trim="loginForm.password"
                placeholder="password"
                autocomplete="current-password"
                class="form-control"
                id="password"
              />
            </div>

            <input
              class="btn btn-block login-btn"
              type="submit"
              value="Login"
            />
            <a
              @click="togglePasswordReset"
              class="forgot-password-link underline"
              >Forgot Password</a
            >
            <p class="login-wrapper-footer-text">
              Not registered?
              <a @click="switchForms" class="text-reset underline"
                >Sign up here!</a
              >
            </p>
          </form>
          <!-- ****************************************************** -->
          <form v-else @submit.prevent="signup">
            <h1 class="login-title">Sign Up</h1>
            <div class="form-group">
              <input
                type="text"
                v-model.trim="signupForm.name"
                placeholder="Name"
                class="form-control"
                id="name"
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model.trim="signupForm.email"
                placeholder="email"
                autocomplete="email"
                class="form-control"
                id="email"
              />
            </div>
            <div class="form-group mb-4">
              <input
                type="password"
                v-model.trim="signupForm.password"
                placeholder="password"
                autocomplete="current-password"
                class="form-control"
                id="password"
              />
            </div>

            <input
              class="btn btn-block login-btn"
              type="submit"
              value="Signup"
            />

            <p class="login-wrapper-footer-text">
              Already signed up?
              <a @click="switchForms" class="text-reset underline">Login</a>
            </p>
          </form>
        </div>
      </section>
      <section class="col-sm-6 px-0 d-none d-sm-block">
        <img
          src="../assets/images/bull.jpg"
          alt="login image"
          class="login-img"
        />
      </section>
    </div>
  </div>
</template>

<script>
import PasswordReset from "../components/PasswordReset.vue";
export default {
  components: {
    PasswordReset,
  },
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
      showPasswordReset: false,
    };
  },
  methods: {
    switchForms() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
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
body {
  background-color: #212121;
  min-height: 100vh;
}

a {
  cursor: pointer;
}

.underline {
  text-decoration: underline;
  text-decoration-color: #15a1ec;
}

.brand-wrapper {
  padding-top: 7px;
  padding-bottom: 8px;
}

.brand-wrapper .logo {
  font-family: "Oswald", sans-serif;
  height: 25px;
  color: #15a1ec;
}

.login-section-wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  background-color: #212121;
}
@media (min-width: 576px) {
  .login-section-wrapper {
    padding-left: 50px;
    padding-right: 50px;
  }
}

.login-wrapper {
  width: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
}
@media (min-width: 575px) {
  .login-wrapper {
    max-width: 100%;
    width: 400px;
  }
}

.login-wrapper .form-control {
  border: none;
  border-radius: 0;
  padding: 9px 5px;
  min-height: 40px;
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 10px;
}

.login-wrapper .form-control::-webkit-input-placeholder {
  color: #b0adad;
}
.login-wrapper .form-control::-moz-placeholder {
  color: #b0adad;
}
.login-wrapper .form-control:-ms-input-placeholder {
  color: #b0adad;
}
.login-wrapper .form-control::-ms-input-placeholder {
  color: #b0adad;
}
.login-wrapper .form-control::placeholder {
  color: #b0adad;
}

.login-wrapper .login-btn {
  padding: 13px 20px;
  background-color: #fe8f07;
  border-radius: 0;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 14px;
  width: 100%;
}

.login-wrapper .login-btn:hover {
  border: 1px solid #fe8f07;
  background-color: #212121;
  color: #fe8f07;
}

.login-wrapper a.forgot-password-link {
  color: #fff;
  font-size: 14px;
  text-decoration: underline;
  text-decoration-color: #15a1ec;
  display: inline-block;
  margin-bottom: 16px;
}
@media (min-width: 575px) {
  .login-wrapper a.forgot-password-link {
    margin-bottom: 54px;
  }
}

.login-wrapper-footer-text {
  font-size: 16px;
  color: #fff;
  margin-bottom: 0;
}

.login-title {
  font-size: 30px;
  color: #fff;
  margin-bottom: 25px;
}

.login-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: left;
}
</style>