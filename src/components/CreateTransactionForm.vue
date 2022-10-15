<template>
  <ElCard class="transaction-form__card">
    <ElForm
      ref="addItemForm"
      :model="TransactionFormData"
      :rules="rules"
      @keydown.enter.native="onSubmit"
    >
      <ElFormItem label="Type" prop="type">
        <ElSelect
          class="transaction-form__input transaction-form__input--select"
          v-model="TransactionFormData.type"
          placeholder="Choose type..."
        >
          <ElOption label="Income" value="INCOME" />
          <ElOption label="Outcome" value="OUTCOME" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Comment" prop="comment">
        <ElInput v-model="TransactionFormData.comment" placeholder="Comment " />
      </ElFormItem>
      <ElFormItem :label="getCurrentTypeOfTransaction" prop="value">
        <ElInput
          v-model.number="TransactionFormData.value"
          placeholder="Enter the transaction amount"
          maxlength="17"
        />
      </ElFormItem>
      <ElButton @click="onSubmit" type="primary">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreateTransactionForm",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("Amount cannot be negative"));
      }
      if (value === 0) {
        callback(new Error("Amount cannot be 0"));
      }
      callback();
    };
    return {
      TransactionFormData: {
        type: "INCOME",
        comment: "",
        value: "",
      },
      rules: {
        type: [
          { required: true, message: "Please select type", trigger: "blur" },
        ],
        comment: [
          {
            max: 50,
            message: "Max length is 50 letters",
            trigger: "blur",
          },
        ],
        value: [
          {
            required: true,
            message: "Please input amount",
            trigger: "change",
          },
          {
            type: "number",
            message: "Amount must be a number",
            trigger: "change",
          },

          { validator: validatePass },
        ],
      },
    };
  },
  computed: {
    getCurrentTypeOfTransaction() {
      if (this.TransactionFormData.type === "INCOME") {
        return "Amount of income";
      }
      if (this.TransactionFormData.type === "EXPENCE") {
        return "Amount of expenses";
      }
      return "";
    },
  },
  methods: {
    ...mapActions(["addTransactionItem"]),
    onSubmit() {
      this.$refs.addItemForm.validate((valid) => {
        if (valid) {
          if (this.TransactionFormData.type === "EXPENCE") {
            this.TransactionFormData.value = -this.formData.value;
          }
          this.addTransactionItem({ ...this.TransactionFormData });
          this.$refs.addItemForm.resetFields();
        }
      });
    },
  },
};
</script>
