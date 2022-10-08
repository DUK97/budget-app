import Vue from "vue";

export default {
  state: {
    budgetList: {
      0: {
        type: "INCOME",
        value: 100,
        comment: "some comment",
        id: 1,
      },
      1: {
        type: "OUTCOME",
        value: -50,
        comment: "some comment",
        id: 2,
      },
      2: {
        type: "OUTCOME",
        value: -50,
        comment: "some comment",
        id: 3,
      },
    },
  },
  getters: {
    getBudgetList(state) {
      console.log(Object.values(state.budgetList));
      return state.budgetList;
    },
    getTotalBalance(state) {
      const budgetListArray = Object.values(state.budgetList);
      let totalBalance = 0;
      budgetListArray.forEach(({ value }) => (totalBalance += value));
      return totalBalance;
    },
  },
  mutations: {
    ADD_BUDGET_ITEM(state, budgetItem) {
      const newBudgetItemId = budgetItem.id;
      Vue.set(state.budgetList, budgetItem.id, budgetItem);
      state.budgetList[newBudgetItemId] = budgetItem;
    },
    DELETE_BUDGET_ITEM(state, userId) {
      console.log(userId);
      const id = Object.entries(state.budgetList).find(([, { id }]) => {
        return id === userId;
      })[0];
      Vue.delete(state.budgetList, id);
    },
  },
  actions: {
    addBudgetItem({ commit }, user) {
      const newUser = { ...user, id: Math.random() };
      commit("ADD_BUDGET_ITEM", newUser);
    },
    deleteBudgetItem({ commit }, userId) {
      commit("DELETE_BUDGET_ITEM", userId);
    },
  },
};
