<template>
  <div id="app">
    <Form />
    <TotalBalance />
    <BudgetList />
    <ConfirmationDialog />
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import Form from "@/components/BudgetForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default {
  name: "App",
  components: {
    BudgetList,
    Form,
    ConfirmationDialog,
    TotalBalance,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.d-none {
  display: none;
}
</style>
