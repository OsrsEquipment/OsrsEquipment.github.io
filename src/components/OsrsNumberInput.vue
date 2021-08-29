<template>
  <div class="osrs-number-input-container">
    <div class="osrs-number-input-prepend">
      <slot name="prepend" />
    </div>
    <input
      :value="value"
      class="osrs-number-input osrs-text-plain-11"
      type="number"
      :min="min"
      :max="max"
      @input="$emit('input', Number($event.target.value))"
      @keyup="detectEnter"
    >
    <div class="osrs-number-input-append">
      <slot name="append" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'OsrsNumberInput',
  props: {
    value: {
      type: undefined,
      default: undefined,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: undefined,
    },
  },
  methods: {
    detectEnter(event) {
      if (event.key === 'Enter') {
        this.$emit('enter-pressed');
      }
    },
  },
};
</script>

<style scoped>
.osrs-number-input-container {
  display: flex;
  align-items: center;
  margin: 8px 0;
  max-width: 100%;
}

.osrs-number-input {
  appearance: none;
  outline: none;
  background: var(--osrs-dark);
  border-radius: 8px;
  box-shadow: 2px 2px 1px rgba(0,0,0, 0.5) inset;
  caret-color: var(--osrs-font-color);
  text-indent: 10px;
  color: var(--osrs-font-color);
  max-width: 100%;
}

.osrs-number-input-prepend {
}

.osrs-number-input-append {
  display: flex;
  align-items: center;
}
</style>
