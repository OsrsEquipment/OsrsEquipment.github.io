<template>
  <v-item
    v-slot="{ active }"
    ref="osrsTabItem"
    class="osrs-tab-item"
  >
    <template v-if="isBooted">
      <div v-show="active">
        <slot />
      </div>
    </template>
    <template v-else>
      <div v-show="false"></div>
    </template>
  </v-item>
</template>

<script>
export default {
  name: 'OsrsTabItem',
  props: {
    eager: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      booted: false,
    };
  },
  computed: {
    isBooted() {
      return this.booted || this.eager;
    },
  },
  mounted() {
    this.checkBooted();
  },
  beforeUpdate() {
    this.checkBooted();
  },
  methods: {
    checkBooted() {
      if (this.isBooted) return;
      this.$nextTick(() => {
        if (this.$refs.osrsTabItem && this.$refs.osrsTabItem.isActive) {
          this.booted = true;
        }
      });
    },
  },
};
</script>

<style scoped>
.osrs-tab-item {
  height: inherit;
  width: inherit;
}
</style>
