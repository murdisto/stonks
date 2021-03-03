<template>
  <div>
    <div>
      <form @submit.prevent="searchStonks">
        <input type="text" v-model="searchTerm" placeholder="Search..." />
        <input type="submit" value="Go" :disabled="searchTerm === ''" />
      </form>
      <div>
        <div
          v-for="(result, index) in results"
          :key="index"
          @click="toggleInfo(index)"
        >
          {{ result.name }}
          <button
            v-if="compareStonks(result.symbol)"
            @click="followStonk(result.symbol)"
          >
            +follow
          </button>
          <button v-else @click="unfollowStonk(result.symbol)">
            -unfollow
          </button>
          <div v-if="show.includes(index)">THIS IS SUPPOSED TO BE HIDDEN</div>
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
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    searchStonks() {
      console.log("searchStonks called");
      const searchTerm = this.searchTerm;
      const BASE_URL = "https://financialmodelingprep.com/api/v3/";
      const apiURL = `${BASE_URL}search?query=${searchTerm}&limit=50&apikey=${API_KEY}`;
      console.log(apiURL);

      axios
        .get(apiURL)
        .then((res) => {
          console.log("response: ", res);
          this.results = [...res.data];
          console.log("results: ", this.results);
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