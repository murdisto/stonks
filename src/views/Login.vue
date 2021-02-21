<template>
  <div class="login">
    <h1>Login</h1>
    <form action="" @submit.prevent="Login">
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <input class="btn" type="submit" value="Login" />
      <p>
        Not signed up? <router-link to="/register">Sign up here!</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { firebase } from "../firebase";
export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => console.log(data))
        .catch((err) => alert(err.message));
    };

    return {
      Login,
      email,
      password,
    };
  },
};
</script>

<style lang="scss" scoped>
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