<template>
  <v-window
    :value="value"
    v-on="listeners"
  >
    <slot />
  </v-window>
</template>

<script>
export default {
  name: 'OsrsTabItems',
  props: {
    value: {
      type: undefined,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          console.log(event);
          this.$emit('input', event.target.value);
        },
      };
    },
  },
};
</script>
