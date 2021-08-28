<template>
  <v-text-field
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
export default {
  name: 'OsrsTextField',
  props: {
    value: {
      type: undefined,
      required: false,
    },
  },
};
</script>

<style scoped>

</style>
