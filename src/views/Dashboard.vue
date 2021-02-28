<template>
  <div>
    <h1>Dashboard</h1>
    <h2>hello, {{ userProfile.name }}</h2>
    <stonk-search />
  </div>
</template>

<script>
import { mapState } from "vuex";
import StonkSearch from "../components/StonkSearch.vue";

export default {
  components: { StonkSearch },
  computed: {
    ...mapState(["userProfile"]),
  },
};
// console.log(this.userProfile);
</script>

<style lang="scss" scoped>
</style>