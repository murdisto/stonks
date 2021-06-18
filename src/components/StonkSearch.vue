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
            <button
              @click="searchStonks"
              class="btn btn-outline-secondary search-btn"
              type="button"
              :disabled="searchTerm === ''"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div v-if="loading" class="search-loader-container">
        <div class="search-loader"></div>
      </div>
      <div v-if="initialResults.length < 1" class="oops">
        Oops, we didnt find that stonk. Try shortening your search term, e.g.,
        instead of "google" try "goog" instead.
      </div>
      <div v-else class="stonks-container list-group">
        <div
          v-for="(stonk, index) in results"
          :key="index"
          @click="toggleInfo(stonk, index)"
          class="stonks-container-item list-group-item"
        >
          <div
            class="
              d-flex
              flex-row
              justify-content-between
              stonks-container-item-container
            "
          >
            <div class="d-flex align-items-center stonk-name">
              <div class="stonk-name-text">
                {{ stonk["2. name"] }} ({{ stonk["1. symbol"] }})
              </div>
            </div>
            <!-- <div class="stonk-price-text my-auto">
              <div class="stonk-price-text-item">${{ stonk.price }}</div>
              <div
                class="stonk-price-text-item"
                :class="{
                  positive: stonk.change > 0,
                  negative: stonk.change < 0,
                }"
              >
                {{ stonk.change }}
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
            </div> -->
            <div class="my-auto">
              <button
                v-if="compareStonks(stonk['1. symbol'])"
                @click.stop="followStonk(stonk['1. symbol'])"
                class="btn btn-block follow-btn"
              >
                +follow
              </button>
              <button
                v-else
                @click.stop="unfollowStonk(stonk['1. symbol'], index)"
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
            <div v-if="itemLoading" class="search-loader-container-small">
              <div class="search-loader-small"></div>
            </div>
            <div v-else class="row justify-content-around">
              <div class="stonk-info-items col-sm-4 justify-content-between">
                <div class="d-flex flex-row justify-content-between">
                  <div>Price</div>
                  <div
                    class="stonk-price-text-item"
                    :class="{
                      positive: quote['09. change'] > 0,
                      negative: quote['09. change'] < 0,
                    }"
                  >
                    {{ parseFloat(quote["05. price"]).toFixed(2) }}
                  </div>
                  <!-- <div>{{ parseFloat(quote["05. price"]).toFixed(2) }}</div> -->
                </div>
                <div class="d-flex flex-row justify-content-between">
                  <div>Previous Close</div>
                  <div>
                    {{ parseFloat(quote["08. previous close"]).toFixed(2) }}
                  </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                  <div>Open</div>
                  <div>{{ parseFloat(quote["02. open"]).toFixed(2) }}</div>
                </div>
              </div>
              <div class="stonk-info-items col-sm-4 justify-content-between">
                <div class="d-flex flex-row justify-content-between">
                  <div>Day Change</div>
                  <div
                    class="stonk-price-text-item"
                    :class="{
                      positive: quote['09. change'] > 0,
                      negative: quote['09. change'] < 0,
                    }"
                  >
                    {{ parseFloat(quote["09. change"]).toFixed(2) }}
                    ({{ parseFloat(quote["10. change percent"]).toFixed(2) }}%)
                  </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                  <div>Day's Range</div>
                  <div>
                    {{ parseFloat(quote["04. low"]).toFixed(2) }} -
                    {{ parseFloat(quote["03. high"]).toFixed(2) }}
                  </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                  <div>Volume</div>
                  <div>{{ quote["06. volume"] }}</div>
                </div>
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

const API_KEY = process.env.VUE_APP_AV_API_KEY;

export default {
  data() {
    return {
      searchTerm: "",
      results: [],
      quote: {},
      show: [],
      initialResults: [1],
      loading: false,
      itemLoading: false,
    };
  },
  created() {},
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    searchStonks() {
      this.loading = true;
      this.initialResults = [1];
      this.results = [];
      const searchTerm = this.searchTerm;
      const BASE_URL = "https://www.alphavantage.co/";
      const apiURL = `${BASE_URL}query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${API_KEY}`; // Search Endpoint on AlphaVantage

      axios
        .get(apiURL)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.bestMatches);
            this.results = [...res.data.bestMatches];
            this.initialResults = [...res.data.bestMatches]; // using this to display a no results message
            // this.initialResultSymbols = res.data.map(({ symbol }) => symbol);
            // const symbolsString = this.initialResultSymbols.toString();
            // const secondaryApiURL = `${BASE_URL}quote?symbol=${symbolsString}&token=${API_KEY}`;
            this.loading = false;

            // if (res.data.length > 0) {
            //   this.loading = true;
            //   axios
            //     .get(secondaryApiURL)
            //     .then((res) => {
            //       this.results = [...res.data];
            //       this.results.forEach((Obj) => {
            //         Obj.price =
            //           Math.round((Obj.price + Number.EPSILON) * 100) / 100;
            //         Obj.change =
            //           Math.round((Obj.change + Number.EPSILON) * 100) / 100;
            //       });
            //       this.loading = false;
            //     })
            //     .catch((err) => console.error(err));
            // }
          }
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
    toggleInfo(stonk, index) {
      this.itemLoading = true;
      // console.log(stonk["1. symbol"], index);
      const symbol = stonk["1. symbol"];
      const BASE_URL = "https://www.alphavantage.co/";
      const apiURL = `${BASE_URL}query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`; // Quote Endpoint on AlphaVantage

      axios
        .get(apiURL)
        .then((res) => {
          // console.log(res.status);
          if (res.status === 200) {
            // console.log(res.data["Global Quote"]);
            this.quote = res.data["Global Quote"];
            // console.log("hello", this.quote);
            this.itemLoading = false;
          }
        })
        .catch((err) => console.error(err));

      if (this.show.length > 0) {
        // this.show = this.show.filter((item) => item !== index);
        this.show = [];
        this.show.push(index);
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
  max-width: 50%;
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

// .stonk-price-text-item {
//   margin-right: 0.5rem;
// }

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

.oops {
  padding: 50px;
}

@media (min-width: 576px) {
  .search-bar {
    width: 50%;
    margin: auto;
  }
}

.search-loader-container {
  height: 30vh;
  display: grid;
  place-items: center;
}

.search-loader {
  border: 10px solid #fe8f07;
  border-top: 10px solid #15a1ec;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.search-loader-container-small {
  height: 10vh;
  display: grid;
  place-items: center;
}

.search-loader-small {
  border: 5px solid #fe8f07;
  border-top: 5px solid #15a1ec;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
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