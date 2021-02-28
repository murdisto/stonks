<template>
  <div>
    <div>
      <form @submit.prevent="searchStonks">
        <input type="text" v-model="searchTerm" placeholder="Search..." />
        <input type="submit" value="Go" :disabled="searchTerm === ''" />
      </form>
    </div>
    <div>
      <div v-for="result in results" :key="result.url">
        {{ result.name }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const API_KEY = process.env.VUE_APP_FNP_API_KEY;

export default {
  data() {
    return {
      searchTerm: "",
      results: [],
    };
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
  },
};
</script>

<style lang="scss" scoped>
</style>