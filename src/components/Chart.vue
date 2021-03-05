<template>
  <div>HEY THIS IS WORKING {{ staticSymbol }}</div>
</template>

<script>
export default {
  data() {
    return {
      staticSymbol: "",
    };
  },
  props: ["symbol"],
  created() {
    this.staticSymbol = this.symbol;
    console.log("props: ", this.symbol);
  },
};
</script>

<style lang="scss" scoped>
</style>