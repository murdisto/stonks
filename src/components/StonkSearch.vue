<template>
  <div>
    <div>
      <form @submit.prevent="searchStonks" class="search-bar">
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="searchTerm"
            class="form-control search-input"
            placeholder="Search..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary search-btn" type="button">
              Button
            </button>
          </div>
        </div>
      </form>
      <div class="stonks-container list-group">
        <div
          v-for="(stonk, index) in results"
          :key="index"
          @click="toggleInfo(index)"
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

.search-btn {
  // padding: 5px 10px;
  background-color: #fe8f07;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  // margin-bottom: 0px;
  // width: 100%;
}

.search-input {
  border: 0;
}

.search-bar {
  width: 80%;
  margin: auto;
}

@media (min-width: 576px) {
  .search-bar {
    width: 50%;
    margin: auto;
  }
}
</style>