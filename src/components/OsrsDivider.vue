<template>
  <div class="osrs-divider">
    <hr>
  </div>
</template>

<script>
export default {
  name: 'OsrsDivider',
};
</script>

<style scoped>
.osrs-divider {
  display: flex;
  justify-content: center;
}

.osrs-divider > hr {
  border: 1px solid var(--osrs-darker);
  border-radius: 100%;
  min-width: 95%;
  margin: 10px 0;
}
</style>
