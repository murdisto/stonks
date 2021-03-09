<template>
  <div>
    <div>
      <form @submit.prevent="searchStonks">
        <input type="text" v-model="searchTerm" placeholder="Search..." />
        <input type="submit" value="Go" :disabled="searchTerm === ''" />
      </form>
      <div class="stonks-container list-group">
        <div
          v-for="(result, index) in results"
          :key="index"
          @click="toggleInfo(index)"
          class="stonks-container-item list-group-item"
        >
          {{ result.name }}
          {{ result.change }}
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

const API_KEY = process.env.VUE_APP_FNP_API_KEY;

export default {
  data() {
    return {
      searchTerm: "",
      results: [],
      show: [],
      initialResultSymbols: [],
    };
  },
  created() {
    console.log("results: ", this.results);
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    searchStonks() {
      const searchTerm = this.searchTerm;
      const BASE_URL = "https://financialmodelingprep.com/api/v3/";
      const apiURL = `${BASE_URL}search?query=${searchTerm}&limit=50&apikey=${API_KEY}`;

      axios
        .get(apiURL)
        .then((res) => {
          this.initialResultSymbols = res.data.map(({ symbol }) => symbol);
          const symbolsString = this.initialResultSymbols.toString();
          const secondaryApiURL = `${BASE_URL}quote/${symbolsString}?apikey=${API_KEY}`;

          axios
            .get(secondaryApiURL)
            .then((res) => {
              this.results = [...res.data];
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    },

    followStonk(symbol) {
      this.$store.dispatch("addFollowedStonk", symbol);
    },
    unfollowStonk(symbol) {
      this.$store.dispatch("removeFollowedStonk", symbol);
    },
    compareStonks(symbol) {
      return !this.userProfile.stonks.includes(symbol);
    },
    toggleInfo(index) {
      if (this.show.includes(index)) {
        this.show = this.show.filter((item) => item !== index);
        return;
      }
      this.show.push(index);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>