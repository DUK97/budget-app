<template>
  <span :class="[typeOfArrow, 'arrow']"> </span>
</template>

<script>
export default {
  name: 'IncomeOrOutcomeArrows',
  computed: {
    typeOfArrow() {
      return this.item.value < 0 ? 'el-icon-bottom' : this.item.value > 0 ? 'el-icon-top' : 'el-icon-minus';
    },
  },
  props: {
    item: {
      value: null,
    },
  },
};
</script>

<style scoped>
.arrow {
  font-size: 24px;
}
.el-icon-bottom {
  color: #f56c6c;
}

.el-icon-top {
  color: #67c23a;
}
</style>
