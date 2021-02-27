<template>
  <div class="home">
    <h1>Welcome HOME</h1>
    <div>
      <button @click="getStonks">I AM NOT A CAT</button>
    </div>
    <h2>{{ stonkData[0].name }}: {{ stonkData[0].price }}</h2>
  </div>
</template>

<script>
import axios from "axios";

const API_KEY = process.env.VUE_APP_FNP_API_KEY;

export default {
  data() {
    return {
      stonkData: null,
      stonks: ["GME"], // hard coded for now but will be dynamic later based on
      //stocks followed or searched for by the user
    };
  },
  methods: {
    getStonks() {
      console.log("getStonks called");
      const stonks = this.stonks;
      const apiURL = `https://financialmodelingprep.com/api/v3/quote/${stonks[0]}?apikey=${API_KEY}`;
      console.log(apiURL);

      axios
        .get(apiURL)
        .then((res) => {
          console.log(res);
          this.stonkData = res.data;
          console.log("stonkData: ", this.stonkData);
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>
