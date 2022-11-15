<template>
  <div class="transactions-list-wrap">
    <ElCard>
      <header class="transactions-list__header" slot="header">
        <h2 class="transactions-list__heading">{{ header }}</h2>
        <DropdownList />
      </header>
      <ElAlert v-if="isEmpty" type="info" :title="title" :closable="false" />
      <TransactionItem
        @deleteTransactionItem="onDeleteTransactionItem"
        v-else
        v-for="transaction in currentExpenceList"
        :key="transaction.id"
        :transaction="transaction"
      />
    </ElCard>
  </div>
</template>

<script>
import TransactionItem from "./TransactionItem.vue";
import DropdownList from "./DropdownList";

import { mapGetters } from "vuex";

import { EventBus } from "./plugins/EventBus";

export default {
  components: { TransactionItem, DropdownList },
  name: "TransactionsList",

  data: () => ({
    header: "Transactions List",
    title: "Empty List",
    currentListType: "",
  }),
  computed: {
    isEmpty() {
      return this.currentExpenceList.length === 0;
    },
    ...mapGetters({
      getTransactions: "getTransactionsList",
    }),
    currentExpenceList() {
      const currentType = this.currentListType;
      if (currentType === "INCOME") {
        return this.getTransactions.filter((TransactionItem) => {
          return TransactionItem.type === "INCOME";
        });
      }
      if (currentType === "EXPENCE") {
        return this.getTransactions.filter((TransactionItem) => {
          return TransactionItem.type === "EXPENCE";
        });
      }

      return this.getTransactions;
    },
  },
  methods: {
    onDeleteTransactionItem(id) {
      this.$store.dispatch("deleteTransactionItem", id);
    },
    showIncomeOnly() {
      this.currentListType = "INCOME";
    },
    showExpencesOnly() {
      this.currentListType = "EXPENCE";
    },
    showAll() {
      this.currentListType = "ALL";
    },
  },
  mounted() {
    EventBus.$on("showIncome", this.showIncomeOnly);
    EventBus.$on("showExpences", this.showExpencesOnly);
    EventBus.$on("showAll", this.showAll);
  },
};
</script>
