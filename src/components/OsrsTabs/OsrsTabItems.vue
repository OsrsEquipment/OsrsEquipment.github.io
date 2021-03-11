<template>
  <v-item-group
    :value="value"
  >
    <slot />
  </v-item-group>
</template>

<script>
export default {
  name: 'OsrsTabItems',
  props: {
    value: {
      type: undefined,
      default: undefined,
    },
  },
};
</script>
