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
				v-for="(item, index) in list"
				:key="index"
				:item="item"
			/>
		</ElCard>
	</div>
</template>

<script>
	import BudgetItem from './BudgetItem.vue';
	import DropdownList from './DropdownList';

	export default {
		components: { BudgetItem, DropdownList },
		name: 'BudgetList',
		props: {
			list: {
				type: Object,
				default: () => ({}),
			},
		},
		data: () => ({
			header: 'Budget List',
			title: 'Empty List',
		}),
		computed: {
			isEmpty() {
				return !Object.keys(this.list).length;
			},
		},
		methods: {
			onDeleteItem(id) {
				this.$emit('deleteItem', id);
			},
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
