<template>
  <v-item
    v-slot="{ active }"
    ref="osrsTabItem"
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
  data() {
    return {
      isBooted: false,
    };
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
          this.isBooted = true;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
