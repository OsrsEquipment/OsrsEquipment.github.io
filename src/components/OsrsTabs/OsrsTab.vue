<template>
  <v-slide-item
    v-slot="{ active, toggle }"
    v-bind="$attrs"
    class="osrs-tab-slide-item"
  >
    <div
      class="osrs-tab-container"
      :class="{'osrs-active-tab': active}"
      @click="toggle"
    >
      <slot/>
    </div>
  </v-slide-item>
</template>

<script>
export default {
  name: 'OsrsTab',
  inheritAttrs: false,
};
</script>

<style scoped>
.osrs-tab-container {
  border: 2px solid var(--osrs-pale-brown);
  border-radius: 8px 8px 0 0;
  padding: 2px 8px;
  background: var(--osrs-darker-brown);
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;
}

.osrs-tab-container:first-child {
  margin: 0 2px 0 0;
}

.osrs-tab-container:last-child {
  margin: 0 0 0 2px;
}

.osrs-tab-container.osrs-active-tab {
  background: var(--osrs-brown);
  border-bottom: 2px solid transparent;
}

.osrs-tab-container.osrs-stretch-tab {
  flex: 1;
}
</style>
