<template>
  <div
    class="osrs-container osrs-text-plain-11"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'OsrsContainer',
};
</script>

<style scoped>
.osrs-container {
  display: block;
  border: 5px ridge var(--osrs-light-brown);
  background-color: var(--osrs-brown);
  padding: 4px 8px;
  box-shadow: 1px 1px 6px black;
}
</style>
