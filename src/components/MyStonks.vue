<template>
  <div>
    <h1>MYSTONKS</h1>
    <div>
      <div v-for="stonk in stonks" :key="stonk.symbol">
        {{ stonk.name }} {{ stonk.price }}
        <button
          v-if="compareStonks(stonk.symbol)"
          @click="followStonk(stonk.symbol)"
        >
          +follow
        </button>
        <button v-else @click="unfollowStonk(stonk.symbol, index)">
          -unfollow
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

const API_KEY = process.env.VUE_APP_FNP_API_KEY;

export default {
  data() {
    return {
      symbols: [],
      stonks: [],
    };
  },
  created() {
    this.symbols = this.userProfile.stonks;
    const symbolsString = this.symbols.toString();
    const BASE_URL = "https://financialmodelingprep.com/api/v3/";
    const apiURL = `${BASE_URL}quote/${symbolsString}?apikey=${API_KEY}`;

    axios
      .get(apiURL)
      .then((res) => {
        this.stonks = [...res.data];
        console.log("stonks: ", this.stonks);
      })
      .catch((err) => console.error(err));
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    followStonk(symbol) {
      this.$store.dispatch("addFollowedStonk", symbol);
    },
    unfollowStonk(symbol, index) {
      this.$store.dispatch("removeFollowedStonk", symbol);
      this.stonks.splice(index, 1);
    },
    compareStonks(symbol) {
      return !this.userProfile.stonks.includes(symbol);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>