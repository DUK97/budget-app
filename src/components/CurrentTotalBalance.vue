<template>
  <div :class="['balance__value', totalBallanceColor]">
    Balance : {{ getCurrentTotalBalance }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TotalBalance",
  data: () => ({
    positive: "balance__type--positive",
    negative: "balance__type--negative",
  }),
  computed: {
    totalBallanceColor() {
      if (this.getCurrentTotalBalance > 0) {
        return this.positive;
      }
      if (this.getCurrentTotalBalance < 0) {
        return this.negative;
      }
      return this.neutral;
    },
    ...mapGetters(["getCurrentTotalBalance"]),
  },
};
</script>
