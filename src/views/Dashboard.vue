<template>
  <div>
    <h1>Dashboard</h1>
    <h2>hello, {{ userProfile.name }}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userProfile"]),
  },
};
// console.log(this.userProfile);
</script>

<style lang="scss" scoped>
</style>