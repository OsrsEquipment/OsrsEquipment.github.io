<template>
  <v-window-item class="osrs-tab-item">
    <slot />
  </v-window-item>
</template>

<script>
export default {
  name: 'OsrsTabItem',
};
</script>

<style scoped>
.osrs-tab-item {
  flex: 1;
  height: 100%;
  width: 100%;
}
</style>
