<template>
  <v-container>
    <v-btn @click="checkForUpdates">
      Check for updates
    </v-btn>
  </v-container>
</template>

<script>
import DataManager from '../services/data-manager';

export default {
  name: 'DataManager',
  data() {
    return {
      contents: [],
      content: undefined,
    };
  },
  methods: {
    async checkForUpdates() {
      await DataManager.checkForUpdates().then((updates) => {
        DataManager.update(updates);
      });
    },
  },
};
</script>
