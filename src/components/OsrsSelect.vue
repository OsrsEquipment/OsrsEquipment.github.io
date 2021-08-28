<template>
  <v-select
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
    @input="$emit('input', $event)"
  ></v-select>
</template>

<script>
export default {
  name: 'OsrsSelect',
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
