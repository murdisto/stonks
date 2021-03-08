<template>
  <nav-bar />
  <div class="dashboard-menu">
    <div class="router-links">
      <router-link to="/dashboard/search">Search</router-link> |
      <router-link to="/dashboard/stocks">My Stocks</router-link>
    </div>
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
.dashboard-menu {
  text-align: center;
}

.router-links {
  font-size: 1.75rem;
  font-family: Oswald;
  margin-bottom: 30px;
  margin-top: 10px;
}

a {
  font-weight: bold;
  color: #15a1ec;
  text-decoration: none;

  &.router-link-exact-active {
    color: #fe8f07;
    text-decoration: underline;
    cursor: default;
  }
}
</style>