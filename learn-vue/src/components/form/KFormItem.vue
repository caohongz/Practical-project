<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error" class="error">{{ error }}</p>
    <p>
      <!-- {{ form.rules[prop] }} -->
    </p>
  </div>
</template>

<script>
import Schema from "async-validator";
import mixins from "@/mixins/mixins";

export default {
  name: "KFormItem",
  componentName: "KFormItem",
  inject: ["form"],
  data() {
    return {
      error: "",
    };
  },
  mixins: [mixins],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
    this.dispatch("KForm", "set-field", [this]);
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const descriptor = {
        [this.prop]: rules,
      };
      const validator = new Schema(descriptor);
      // console.log(this.$parent.$parent.$options._componentTag);
      return validator.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
