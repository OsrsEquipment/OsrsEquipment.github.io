<template>
  <v-item
    v-slot="{ active }"
    class="osrs-tab-item"
  >
    <div
      class="osrs-tab-item-container"
      :class="{'osrs-active-tab-item': active}"
    >
      <v-lazy
        class="lazy-tab-item"
        :transition="''"
      >
        <slot />
      </v-lazy>
    </div>
  </v-item>
</template>

<script>
export default {
  name: 'OsrsTabItem',
};
</script>

<style scoped>
.osrs-tab-item-container {
  background: var(--osrs-brown);
  display: none;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.osrs-tab-item-container.osrs-active-tab-item {
  display: flex;
}

.lazy-tab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
