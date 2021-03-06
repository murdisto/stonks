<template>
  <div>
    Logged in:
    <span v-if="loggedIn">Yes</span>
    <span v-else>No</span>
    <div>
      <button @click="signOut">Logout</button>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      loggedIn: false,
    };
  },
  name: "nav-bar",
  mounted() {
    this.userCheck();
  },
  methods: {
    userCheck() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
          console.log("signed out", this.loggedIn);
        }
      });
    },
    signOut() {
      this.$store.dispatch("signout");
    },
  },
};
</script>

<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>