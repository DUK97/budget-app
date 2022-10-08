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
import { mapActions } from "vuex";
export default {
  name: "BudgetForm",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("Value cannot be negative"));
      } else if (this.formData.value === 0) {
        callback(new Error("Value cannot be 0"));
      } else {
        callback();
      }
    };
    return {
      formData: {
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
            message: "Please input value",
            trigger: "change",
          },
          {
            type: "number",
            message: "Value must be a number",
            trigger: "change",
          },

          { validator: validatePass },
        ],
      },
    };
  },

  methods: {
    ...mapActions(["addBudgetItem"]),
    onSubmit() {
      this.$refs.addItemForm.validate((valid) => {
        if (valid) {
          if (this.formData.type === "OUTCOME") {
            this.formData.value = -this.formData.value;
          }
          console.log({ ...this.formData });
          this.addBudgetItem({ ...this.formData });
          this.$refs.addItemForm.resetFields();
        }
      });
    },

    onFormSubmit(data) {
      const newObj = { ...data, id: String(Math.random()) };
      this.$set(this.list, newObj.id, newObj);
    },
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
