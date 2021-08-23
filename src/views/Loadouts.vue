<template>
  <v-container>
    <v-row>
      <v-col>
        <loadout-manager/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoadoutManager from '../components/loadout-manager/LoadoutManager.vue';

export default {
  name: 'Loadouts',
  components: { LoadoutManager },
};
</script>

<style scoped>
</style>
