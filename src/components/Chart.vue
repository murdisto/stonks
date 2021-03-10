<template>
  <div>
    <h2>I am not a cat</h2>
  </div>
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
  },
};
</script>

<style lang="scss" scoped>
</style>