<template>
  <div v-if="loadingStatus" class="loader-container">
    <div class="loader"></div>
  </div>
  <div v-else class="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userProfile"]),
    loadingStatus() {
      return this.$store.getters.loadingStatus;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #fff;
  // background-color: #2c3e50;
  // display: grid;
  // place-items: center;
}

.loader-container {
  height: 100vh;
  display: grid;
  place-items: center;
}

.loader {
  border: 16px solid #fe8f07;
  border-top: 16px solid #15a1ec;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
