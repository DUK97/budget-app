<template>
	<ElCard class="form-card">
		<ElForm :model="formData" ref="addItemForm" :rules="rules">
			<ElFormItem label="Type" prop="type">
				<ElSelect
					class="type-select"
					v-model="formData.type"
					placeholder="Choose type..."
				>
					<ElOption label="Income" value="INCOME" />
					<ElOption label="Outcome" value="OUTCOME" />
				</ElSelect>
			</ElFormItem>
			<ElFormItem label="Comments" prop="comment">
				<ElInput
					v-model="formData.comment"
					@keydown.enter.native="onSubmit"
					placeholder="Write some comment "
				/>
			</ElFormItem>
			<ElFormItem label="Value" prop="value">
				<ElInput
					v-model.number="formData.value"
					@keydown.enter.native="onSubmit"
					placeholder="Input your value "
					maxlength="17"
				/>
			</ElFormItem>
			<ElButton @click="onSubmit" type="primary">Submit</ElButton>
		</ElForm>
	</ElCard>
</template>

<script>
	import { EventBus } from './plugins/EventBus';
	export default {
		name: 'BudgetForm',
		data() {
			let validatePass = (rule, value, callback) => {
				if (value < 0) {
					callback(new Error('Value cannot be negative'));
				} else if (this.formData.value === 0) {
					callback(new Error('Value cannot be 0'));
				} else {
					callback();
				}
			};
			return {
				formData: {
					type: 'INCOME',
					comment: '',
					value: '',
					visibility: '',
				},

				rules: {
					type: [
						{ required: true, message: 'Please select type', trigger: 'blur' },
					],
					comment: [
						{
							max: 50,
							message: 'Length should be up to 50',
							trigger: 'blur',
						},
					],

					value: [
						{
							required: true,
							message: 'Please input value',
							trigger: 'change',
						},
						{
							type: 'number',
							message: 'Value must be a number',
							trigger: 'change',
						},

						{ validator: validatePass },
					],
				},
			};
		},

		methods: {
			onSubmit() {
				this.$refs.addItemForm.validate((valid) => {
					if (valid) {
						if (this.formData.type === 'OUTCOME') {
							this.formData.value = -this.formData.value;
						}

						this.$emit('submitForm', { ...this.formData });
						this.$refs.addItemForm.resetFields();
					}
				});
			},
		},
		mounted() {
			setTimeout(() => {
				EventBus.$on('showIncome', () => {
					console.log('income');
				});
			}, 2000);
		},
	};
</script>

<style scoped>
	.form-card {
		max-width: 500px;
		margin: auto;
	}
	.type-select {
		width: 100%;
	}
</style>
