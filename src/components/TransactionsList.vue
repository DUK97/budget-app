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
        v-for="(transaction, index) in currentExpenceList"
        :key="index"
        :transaction="transaction"
      />
    </ElCard>
  </div>
</template>

<script>
import TransactionItem from "./TransactionItem.vue";
import DropdownList from "./DropdownList";
import { mapGetters, mapActions } from "vuex";
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
      return !this.currentExpenceList.length;
    },
    ...mapGetters({
      getTransactions: "getTransactionsList",
    }),
    currentExpenceList() {
      const currentType = this.currentTransactionListType;
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
    ...mapActions({ deleteItem: "deleteTransactionItem" }),
    onDeleteTransactionItem(id) {
      this.deleteItem(id);
    },
    showIncomeOnly() {
      this.currentList = this.incomeList;
      this.currentListType = "INCOME";
    },
    showExpencesOnly() {
      this.currentList = this.outcomeList;
      this.currentListType = "EXPENCE";
    },
    showAll() {
      this.currentTransactionList = this.getTransactions;
      this.currentTransactionListType = "ALL";
    },
  },
  mounted() {
    EventBus.$on("showIncome", this.showIncomeOnly);
    EventBus.$on("showExpences", this.showExpensesOnly);
    EventBus.$on("showAll", this.showAll);
  },
};
</script>
