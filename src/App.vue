<template>
	<div id="app">
		<Form @submitForm="onFormSubmit" />
		<TotalBalance :total="totalBalance" />
		<BudgetList :list="list" @deleteItem="onDeleteItem" />
		<ConfirmationDialog />
	</div>
</template>

<script>
	import BudgetList from '@/components/BudgetList';
	import TotalBalance from '@/components/TotalBalance';
	import Form from '@/components/BudgetForm';
	import ConfirmationDialog from '@/components/ConfirmationDialog';
	import { EventBus } from './components/plugins/EventBus';
	export default {
		name: 'App',
		components: {
			BudgetList,
			TotalBalance,
			Form,
			ConfirmationDialog,
		},
		data: () => ({
			list: {
				1: {
					type: 'INCOME',
					value: 100,
					comment: 'some comment',
					visibility: true,
					id: 1,
				},
				2: {
					type: 'OUTCOME',
					value: -50,
					comment: 'some comment',
					visibility: true,
					id: 2,
				},
				3: {
					type: 'OUTCOME',
					value: -50,
					comment: 'some comment',
					visibility: true,
					id: 3,
				},
			},
		}),
		methods: {
			onDeleteItem(id) {
				this.$delete(this.list, id);
			},
			onFormSubmit(data) {
				const newObj = { ...data, id: String(Math.random()) };
				this.$set(this.list, newObj.id, newObj);
			},
			showIncomeOnly() {
				Object.values(this.list).forEach((element) => {
					element.visibility = element.type !== 'INCOME' ? false : true;
				});
			},
			showOutcomeOnly() {
				Object.values(this.list).forEach((element) => {
					element.visibility = element.type !== 'OUTCOME' ? false : true;
				});
			},
			showAll() {
				Object.values(this.list).forEach((element) => {
					element.visibility = true;
				});
			},
			onListChange(change) {
				console.log(change);
			},
		},
		computed: {
			totalBalance() {
				return Object.values(this.list).reduce((acc, item) => {
					return acc + item.value;
				}, 0);
			},
		},
		mounted() {
			EventBus.$on('showIncome', this.showIncomeOnly);
			EventBus.$on('showOutcome', this.showOutcomeOnly);
			EventBus.$on('showAll', this.showAll);
		},
		watch: {
			list: 'showAll',
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
