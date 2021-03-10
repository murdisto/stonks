<template>
  <div>
    <div class="stonks-container list-group">
      <div v-if="userProfile.stonks.length < 1" class="oops">
        Oops, looks like you aren't following any stonks yet.
        <router-link class="oops-link" to="/dashboard/search"
          >Search</router-link
        >
        for some to follow.
      </div>
      <div
        v-else
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
          <div class="stonk-price-text my-auto">
            <div class="stonk-price-text-item">
              ${{ stonk.price.toFixed(2) }}
            </div>
            <div
              class="stonk-price-text-item"
              :class="{
                positive: stonk.change > 0,
                negative: stonk.change < 0,
              }"
            >
              {{ stonk.change.toFixed(2) }}
            </div>
            <div
              class="stonk-price-text-item"
              :class="{
                positive: stonk.change > 0,
                negative: stonk.change < 0,
              }"
            >
              ({{ stonk.changesPercentage }}%)
            </div>
          </div>
          <div class="my-auto">
            <button
              v-if="compareStonks(stonk.symbol)"
              @click.stop="followStonk(stonk.symbol)"
              class="btn btn-block follow-btn"
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
        <div
          v-if="show.includes(index)"
          class="stonk-info row justify-content-around"
        >
          <div class="stonk-info-items col-sm-4 justify-content-between">
            <div class="d-flex flex-row justify-content-between">
              <div>Previous Close</div>
              <div>{{ stonk.previousClose }}</div>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div>Open</div>
              <div>{{ stonk.open }}</div>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div>Market Cap</div>
              <div>{{ stonk.marketCap }}</div>
            </div>
          </div>
          <div class="stonk-info-items col-sm-4 justify-content-between">
            <div class="d-flex flex-row justify-content-between">
              <div>Day's Range</div>
              <div>{{ stonk.dayLow }} - {{ stonk.dayHigh }}</div>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div>Year's Range</div>
              <div>{{ stonk.yearLow }} - {{ stonk.yearHigh }}</div>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div>Volume</div>
              <div>{{ stonk.volume }}</div>
            </div>
          </div>
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
      isActive: false,
    };
  },
  created() {
    this.symbols = this.userProfile.stonks;
    const symbolsString = this.symbols.toString();
    const BASE_URL = "https://financialmodelingprep.com/api/v3/";
    const apiURL = `${BASE_URL}quote/${symbolsString}?apikey=${API_KEY}`;

    if (this.symbols.length > 0) {
      axios
        .get(apiURL)
        .then((res) => {
          this.stonks = [...res.data];
        })
        .catch((err) => console.error(err));
    }
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
      this.isActive = !this.isActive;
      this.symbol = symbol;
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
  height: auto;
  border: 3px solid #15a1ec;
  background-color: #084464;
  border-radius: 0px;
  margin-bottom: 10px;
  padding: 10px;
  animation: fadeIn 0.5s linear;
  animation-fill-mode: both;
  cursor: pointer;
}
@for $i from 1 through 50 {
  .stonks-container-item:nth-child(#{$i}) {
    animation-delay: 0.25s * $i;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    top: 100px;
  }

  75% {
    opacity: 0.5;
    top: 0px;
  }

  100% {
    opacity: 1;
  }
}

.stonk-name {
  min-width: 0 !important;
  max-width: 33%;
  flex: 1;
  margin-right: 1rem;
}

.stonk-name-text {
  text-overflow: ellipsis;
  white-space: break-spaces;
  overflow: hidden;
  font-size: 1rem;
  font-family: Oswald;
}
@media (min-width: 576px) {
  .stonk-name-text {
    font-size: 1.5rem;
  }
}

.stonk-price-text {
  font-size: 1rem;
  font-family: Oswald;
}
@media (min-width: 576px) {
  .stonk-price-text {
    font-size: 1.5rem;
    display: flex;
    flex-direction: row;
  }
}

.stonk-price-text-item {
  margin-right: 0.5rem;
}

.stonks-container-item-container {
  min-width: 0 !important;
}

.follow-btn {
  padding: 5px 7px;
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
  max-height: 30px;
}
@media (min-width: 576px) {
  .follow-btn {
    padding: 5px 10px;
    font-size: 1rem;
    height: 100%;
    max-height: 100px;
  }
}

.follow-btn:hover {
  border: 2px solid #15a1ec;
  background-color: #fff;
  color: #15a1ec;
}

.stonk-info {
  font-family: Oswald;
  margin-top: 15px;
}

.stonk-info-items {
  // border: 1px solid red;
  // margin-top: 15px;
  animation: fadeIn 0.25s linear;
  animation-fill-mode: none;
}

.positive {
  color: rgb(37, 234, 37);
}

.negative {
  color: rgb(255, 0, 0);
}

.oops {
  font-size: 1.75rem;
  font-family: Oswald;
  padding: 40px;
}

.oops-link {
  text-decoration: underline;
  color: #15a1ec;
}
</style>