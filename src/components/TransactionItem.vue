<template>
  <div class="transaction-item">
    <TransactionTypeArrows :item="transaction" />
    <span class="transaction-comment">{{ transaction.comment }}</span>

    <span :class="[changeColorOfNumber, 'transaction-item__value']">
      {{ transaction.value }}
    </span>
    <ElButton type="danger" size="mini" @click="showConfirmaitionDialog"
      >Delete</ElButton
    >
  </div>
</template>

<script>
import TransactionTypeArrows from "./TransactionTypeArrows";
import { EventBus } from "./plugins/EventBus";

export default {
  name: "TransactionItem",
  components: {
    TransactionTypeArrows,
  },
  props: {
    transaction: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    changeColorOfNumber() {
      return this.transaction.value < 0
        ? "red"
        : this.transaction.value > 0
        ? "green"
        : "";
    },
  },

  methods: {
    deleteTransaction(id) {
      this.$emit("deleteTransactionItem", id);
    },
    showModal() {
      return {
        header: `Confirmation required`,
        body: `Are you sure you want to delete ${
          this.transaction.comment
            ? this.transaction.comment
            : `item with ${this.transaction.value} value`
        }?`,
      };
    },
    onConfirm(responce) {
      if (responce) {
        this.deleteTransaction(this.transaction.id);
      }
    },

    showConfirmaitionDialog() {
      EventBus.$emit("modal:open", this.showModal());
      EventBus.$on("modal:confirmed", this.onConfirm);
    },
  },
};
</script>
