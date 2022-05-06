<template>
	<div :class="['list-item', changeVisibility]">
		<IncomeOrOutcomeArrows :item="item" />
		<span class="budget-comment">{{ item.comment }}</span>

		<span :class="[changeColorOfNumber, 'budget-value']">
			{{ item.value }}</span
		>
		<ElButton type="danger" size="mini" @click="showConfiramitionDialog"
			>Delete</ElButton
		>
	</div>
</template>

<script>
	import IncomeOrOutcomeArrows from './IncomeOrOutcomeArrows';
	import { EventBus } from './plugins/EventBus';

	export default {
		name: 'BudgetItem',
		components: {
			IncomeOrOutcomeArrows,
		},
		props: {
			item: {
				type: Object,
				default: () => ({}),
			},
		},
		computed: {
			changeColorOfNumber() {
				return this.item.value < 0 ? 'red' : this.item.value > 0 ? 'green' : '';
			},
			changeVisibility() {
				return this.item.visibility === false ? 'hidden' : '';
			},
		},

		methods: {
			deleteItem(id) {
				this.$emit('deleteItem', id);
			},
			showModal() {
				return {
					header: `Confirmation required`,
					body: `Do you really want to delete ${
						this.item.comment
							? this.item.comment
							: `item with ${this.item.value} value`
					}?`,
				};
			},
			onConfirm(responce) {
				if (responce) {
					this.deleteItem(this.item.id);
				}
			},

			showConfiramitionDialog() {
				EventBus.$emit('modal:open', this.showModal());
				EventBus.$on('modal:confirmed', this.onConfirm);
			},
		},
	};
</script>

<style scoped>
	.list-item {
		display: flex;
		align-items: center;
		padding: 10px 15px;
	}

	.budget-value {
		font-weight: bold;
		margin-left: auto;
		margin-right: 20px;
	}

	.red {
		color: #f56c6c;
	}
	.green {
		color: #67c23a;
	}
	.hidden {
		display: none;
	}
</style>
