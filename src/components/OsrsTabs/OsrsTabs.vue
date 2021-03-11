<template>
  <v-slide-group
    mandatory
    :value="value"
    @change="$emit('input', $event)"
  >
    <slot />
  </v-slide-group>
</template>

<script>
export default {
  name: 'OsrsTabs',
  provide() {
    return {
      grow: this.grow,
    };
  },
  props: {
    value: {
      type: undefined,
      default: undefined,
    },
    grow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedTab: 0,
    };
  },
  methods: {
  },
};
</script>
