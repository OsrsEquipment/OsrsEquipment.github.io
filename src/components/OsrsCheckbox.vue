<template>
  <div>
    <input
      type="checkbox"
      class="osrs-checkbox"
      :checked="isChecked"
      @change="$emit('input', isChecked)"
      @click="toggle"
    />
  </div>
</template>

<script>
export default {
  name: 'OsrsCheckbox',
  props: {
    value: {
      type: undefined,
      default: undefined,
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.isChecked = value;
      },
    },
  },
  methods: {
    toggle() {
      this.isChecked = !this.isChecked;
    },
  },
};
</script>

<style scoped>
.osrs-checkbox {
  position: relative;
  appearance: none;
  display: block;
  background: var(--osrs-lightest-black-brown);
  height: 24px;
  width: 24px;
  cursor: pointer;
  user-select: none;
  outline: none;
  border: 4px double black;
  border-radius: 3px;
}

.osrs-checkbox:after {
  content: '';
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--osrs-darker);
  box-shadow: 1px 1px 1px black inset;

}

.osrs-checkbox:checked:after {
  content: url('../static/osrs/osrs-check.png');
}
</style>
