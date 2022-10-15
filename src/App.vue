<template>
  <div id="app">
    <CreateTransactionForm />
    <CurrentTotalBalance />
    <TransactionsList />
    <ConfirmationDialog />
  </div>
</template>

<script>
import TransactionsList from "@/components/TransactionsList";
import CurrentTotalBalance from "@/components/CurrentTotalBalance";
import CreateTransactionForm from "@/components/CreateTransactionForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default {
  name: "App",
  components: {
    TransactionsList,
    CreateTransactionForm,
    ConfirmationDialog,
    CurrentTotalBalance,
  },
};
</script>
