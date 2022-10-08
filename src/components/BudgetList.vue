<template>
  <div class="bugdet-list-wrap">
    <ElCard>
      <header class="budget-list__header" slot="header">
        <h2 class="budget-list__heading">{{ header }}</h2>
        <DropdownList />
      </header>
      <ElAlert v-if="isEmpty" type="info" :title="title" :closable="false" />
      <BudgetItem
        @deleteItem="onDeleteItem"
        v-else
        v-for="(item, index) in currentList"
        :key="index"
        :item="item"
      />
    </ElCard>
  </div>
</template>

<script>
import BudgetItem from "./BudgetItem.vue";
import DropdownList from "./DropdownList";
import { mapGetters, mapActions } from "vuex";
import { EventBus } from "./plugins/EventBus";

export default {
  components: { BudgetItem, DropdownList },
  name: "BudgetList",

  data: () => ({
    header: "Budget List",
    title: "Empty List",
    currentListType: "",
  }),
  computed: {
    isEmpty() {
      return !Object.keys(this.currentList).length;
    },
    ...mapGetters({
      getBudget: "getBudgetList",
    }),
    currentList() {
      switch (this.currentListType) {
        case "ALL":
          return this.getBudget;
        case "INCOME":
          return Object.values(this.getBudget).filter((budgetItem) => {
            return budgetItem.type === "INCOME";
          });
        case "OUTCOME":
          return Object.values(this.getBudget).filter((budgetItem) => {
            return budgetItem.type === "OUTCOME";
          });
        default:
          return this.getBudget;
      }
    },
  },
  methods: {
    ...mapActions({ deleteItem: "deleteBudgetItem" }),
    onDeleteItem(id) {
      this.deleteItem(id);
    },
    showIncomeOnly() {
      this.currentList = this.incomeList;
      this.currentListType = "INCOME";
    },
    showOutcomeOnly() {
      this.currentList = this.outcomeList;
      this.currentListType = "OUTCOME";
    },
    showAll() {
      this.currentList = this.getBudget;
      this.currentListType = "ALL";
    },
  },
  mounted() {
    EventBus.$on("showIncome", this.showIncomeOnly);
    EventBus.$on("showOutcome", this.showOutcomeOnly);
    EventBus.$on("showAll", this.showAll);
  },
};
</script>

<style scoped>
.bugdet-list-wrap {
  max-width: 500px;
  margin: 0 auto;
}

.budget-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.budget-list__heading {
  margin: 0 auto;
}
</style>
