<template>
  <div class="text-field">
    <label :for="$attrs.id">{{ label }}</label>
    <div v-if="isError" class="text-field__error">{{ errorMessage }}</div>
    <input
      v-bind="$attrs"
      :id="$attrs.id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    errorMessage: String,
    isError: Boolean
  },
  emits: ['update:modelValue']
}
</script>
