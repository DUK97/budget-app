<template>
  <span :class="[typeOfArrow, 'arrow']"> </span>
</template>

<script>
export default {
  name: "TransactionTypeArrows",
  computed: {
    typeOfArrow() {
      return this.item.value < 0
        ? "arrow--down"
        : this.item.value > 0
        ? "arrow--up"
        : "arrow--down";
    },
  },
  props: {
    item: {
      value: null,
    },
  },
};
</script>
