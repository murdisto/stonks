<template>
  <nav class="container-fluid">
    <div class="d-flex flex-row justify-content-between">
      <div class="brand-wrapper">
        <h1 class="logo">Stonks 🚀</h1>
      </div>
      <div class="logout-wrapper my-auto">
        <button @click="signOut" class="btn btn-block logout-btn">
          Logout
        </button>
      </div>
    </div>
  </nav>
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

<style lang="scss" scoped>
nav {
  padding: 15px;
  background-color: #15a1ec;
  border-bottom: 1px solid #084464;
}

.logo {
  margin: 0;
  font-family: "Oswald", sans-serif;
}

.logout-wrapper .logout-btn {
  padding: 5px 10px;
  background-color: #fe8f07;
  border-radius: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0px;
  width: 100%;
}

.logout-wrapper .logout-btn:hover {
  border: 1px solid #fe8f07;
  background-color: #15a1ec;
  color: #fff;
}
</style>