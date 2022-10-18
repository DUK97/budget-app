import Vue from "vue";

export default {
  state: {
    TransactionsList: [
      {
        type: "INCOME",
        value: 100,
        comment: "some comment",
        id: 1,
      },
      {

        type: "EXPENCE",

        value: -50,
        comment: "some comment",
        id: 2,
      },
      {

        type: "EXPENCE",

        value: -50,
        comment: "some comment",
        id: 3,
      },
    ],
  },
  getters: {
    getTransactionsList(state) {
      return state.TransactionsList;
    },
    getCurrentTotalBalance(state) {
      const transactionListArray = state.TransactionsList;

      const totalBalance = transactionListArray.reduce(
        (balance, currentTransaction) => balance + currentTransaction.value,
        0
      );

      return totalBalance;
    },
  },
  mutations: {
    ADD_TRANSACTION_ITEM(state, transactionItem) {

      const id = Math.random();
      if (transactionItem.type === "EXPENCE") {
        transactionItem.value = -transactionItem.value;
      }
      state.TransactionsList.push({ ...transactionItem, id });

    },
    DELETE_TRANSACTION_ITEM(state, transactionId) {
      const id = state.TransactionsList.findIndex(
        ({ id }) => id === transactionId
      );

      Vue.delete(state.TransactionsList, id);

    },
  },
  actions: {
    addTransactionItem({ commit }, transaction) {
      commit("ADD_TRANSACTION_ITEM", transaction);
    },
    deleteTransactionItem({ commit }, transactionId) {
      commit("DELETE_TRANSACTION_ITEM", transactionId);
    },
  },
};
