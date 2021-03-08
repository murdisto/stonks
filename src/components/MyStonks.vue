<template>
  <div>
    <div class="stonks-container list-group">
      <div
        v-for="(stonk, index) in stonks"
        :key="index"
        @click="toggleInfo(index, stonk.symbol)"
        class="stonks-container-item list-group-item"
      >
        <div
          class="d-flex flex-row justify-content-between stonks-container-item-container"
        >
          <div class="d-flex align-items-center stonk-name">
            <div class="stonk-name-text">{{ stonk.name }}</div>
          </div>
          <div class="">
            <button
              v-if="compareStonks(stonk.symbol)"
              @click.stop="followStonk(stonk.symbol)"
            >
              +follow
            </button>
            <button
              v-else
              @click.stop="unfollowStonk(stonk.symbol, index)"
              class="btn btn-block follow-btn"
            >
              -unfollow
            </button>
          </div>
        </div>

        <div v-if="show.includes(index)">
          I am not a cat {{ stonk.price }}
          <!-- <chart :symbol="symbol" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
// import Chart from "./Chart.vue";

const API_KEY = process.env.VUE_APP_FNP_API_KEY;

export default {
  // components: { Chart },
  data() {
    return {
      symbols: [],
      stonks: [],
      show: [],
      symbol: null,
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
    toggleInfo(index, symbol) {
      this.symbol = symbol;
      console.log(this.symbol);
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
.stonks-container {
  margin-left: 1rem;
  margin-right: 1rem;
}

.stonks-container-item {
  border: 3px solid #15a1ec;
  background-color: #084464;
  border-radius: 0px;
  margin-bottom: 10px;
  padding: 10px;
}

.stonk-name {
  min-width: 0 !important;
  flex: 1;
  margin-right: 1rem;
}

.stonk-name-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.5rem;
  font-family: Oswald;
}

.stonks-container-item-container {
  min-width: 0 !important;
}

.follow-btn {
  padding: 2px 5px;
  background-color: #15a1ec;
  border-radius: 75px;
  border: 2px solid #15a1ec;
  font-size: 0.75rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0px;
  width: 100%;
  height: 100%;
  min-width: 0 !important;
}
@media (min-width: 576px) {
  .follow-btn {
    padding: 5px 10px;
    font-size: 1rem;
  }
}

.follow-btn:hover {
  border: 2px solid #15a1ec;
  background-color: #fff;
  color: #15a1ec;
}
</style>