<template>
  <div :class="['total-value', totalColor]">
    Balance : {{ getTotalBalance }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TotalBalance",
  data: () => ({
    positive: "positive-balance",
    negative: "negative-balance",
    neutral: "neutral-balance",
  }),
  computed: {
    totalColor() {
      if (this.getTotalBalance > 0) {
        return this.positive;
      } else if (this.getTotalBalance < 0) {
        return this.negative;
      } else {
        return this.neutral;
      }
    },
    ...mapGetters(["getTotalBalance"]),
  },
};
</script>

<style scoped>
.total-value {
  font-size: 26px;
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
}
.positive-balance {
  color: #67c23a;
}
.negative-balance {
  color: #f56c6c;
}
</style>
