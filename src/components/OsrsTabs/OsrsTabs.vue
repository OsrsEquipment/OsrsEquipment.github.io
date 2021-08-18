<template>
  <v-slide-group
    :value="value"
    mandatory
    v-on="listeners"
  >
    <slot />
  </v-slide-group>
</template>

<script>
export default {
  name: 'OsrsTabs',
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
