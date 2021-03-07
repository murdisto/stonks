<template>
  <nav-bar />
  <div>
    <h1>Dashboard</h1>
    <h2>hello, {{ userProfile.name }}</h2>
    <router-link to="/dashboard/search">Search</router-link> |
    <router-link to="/dashboard/stocks">My Stocks</router-link>

    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "../components/NavBar.vue";

export default {
  computed: {
    ...mapState(["userProfile"]),
  },
  components: {
    NavBar,
  },
};
// console.log(this.userProfile);
</script>

<style lang="scss" scoped>
a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>