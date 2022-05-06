<template>
	<el-dialog :visible.sync="dialogVisible" width="30%">
		<h3 slot="title">{{ header }}</h3>
		<span class="modal-body">{{ body }}</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="closeModal">Cancel</el-button>
			<el-button type="primary" @click="onConfirm">Confirm</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import { EventBus } from '@/components/plugins/EventBus';
	export default {
		name: 'ConfirmationDialog',

		data() {
			return {
				dialogVisible: false,
				header: '',
				body: '',
			};
		},

		methods: {
			closeModal() {
				this.dialogVisible = false;
			},
			onConfirm() {
				EventBus.$emit('modal:confirmed', true);
				this.closeModal();
			},
			openModal({ header, body }) {
				this.header = header;
				this.body = body;
				console.log(arguments);

				this.dialogVisible = true;
			},
		},
		created() {
			EventBus.$on('modal:open', this.openModal);
		},
	};
</script>

<style scoped>
	.modal-body {
		font-size: 24px;
	}
	.modal-bold {
		font-weight: 700;
	}
	.modal-body {
		word-break: break-word;
	}
</style>
