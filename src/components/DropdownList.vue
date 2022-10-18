<template>
  <el-dropdown
    size="medium"
    @command="handleCommand"
    :hide-on-click="false"
    trigger="click"
    type="primary"
  >
    <span class="el-dropdown-link"> Filter</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="showAll">Show all</el-dropdown-item>
      <el-dropdown-item command="showOutcome"
        >Show only outcome</el-dropdown-item
      >
      <el-dropdown-item command="showIncome">Show only income</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { EventBus } from "./plugins/EventBus";
export default {
  name: "dropdownList",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleCommand(command) {
      EventBus.$emit(command, { command });
    },
  },
};
</script>
