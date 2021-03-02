<template>
  <div>
    <h1>MYSTONKS</h1>
    <div>
      <div v-for="symbol in symbols" :key="symbol.symbol">
        {{ symbol }}
        <!-- <button
          v-if="compareStonks(symbol.symbol)"
          @click="followStonk(symbol.symbol)"
        >
          +follow
        </button>
        <button v-else @click="unfollowStonk(symbol.symbol)">-unfollow</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      symbols: [],
    };
  },
  created() {
    this.symbols = this.userProfile.stonks;
    console.log("this.symbols: ", this.symbols);
  },
  computed: {
    ...mapState(["userProfile"]),
  },
};
</script>

<style lang="scss" scoped>
</style>