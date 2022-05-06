<template>
  <div :class="['total-value', totalColor]">Balance : {{ total }}</div>
</template>

<script>
export default {
  name: 'TotalBalance',
  data: () => ({
    positive: 'positive-balance',
    negative: 'negative-balance',
    neutral: 'neutral-balance',
  }),
  computed: {
    totalColor() {
      if (this.total > 0) {
        return this.positive;
      } else if (this.total < 0) {
        return this.negative;
      } else {
        return this.neutral;
      }
    },
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
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
