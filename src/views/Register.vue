<template>
  <div>
    <h1>Sign Up</h1>
    <div v-if="error" class="error">{{ error.message }}</div>
    <form action="" @submit.prevent="register">
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <input class="btn" type="submit" value="Register" />
      <p>Already signed up? <router-link to="/login">Login</router-link></p>
    </form>
  </div>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    register() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log("user", user);
          this.$router.replace({ name: "dashboard" });
        })
        .catch((error) => (this.error = error));
    },
  },
};

// **************** Vue 3 Composition API ****************
// import { ref } from "vue";
// import { firebase } from "../firebase";
// export default {
//   setup() {
//     const email = ref("");
//     const password = ref("");

//     const Register = () => {
//       firebase
//         .auth()
//         .createUserWithEmailAndPassword(email.value, password.value)
//         .then((user) => console.log(user))
//         .catch((err) => alert(err.message));
//     };

//     return {
//       Register,
//       email,
//       password,
//     };
//   },
// };
console.log(auth.currentUser);
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
a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
