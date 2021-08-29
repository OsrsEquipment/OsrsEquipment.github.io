<template>
  <osrs-container class="result-controls">
    <v-btn
      color="var(--osrs-font-color)"
      icon
      @click="copyLoadout(loadoutUuid)"
    >
      <v-icon>mdi-content-copy</v-icon>
    </v-btn>
    <v-btn
      color="var(--osrs-font-color)"
      icon
      @click="deleteLoadout(loadoutUuid)"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </osrs-container>
</template>

<script>
import { mapActions } from 'vuex';
import OsrsContainer from '../OsrsContainer.vue';

export default {
  name: 'ResultControls',
  components: { OsrsContainer },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      deleteLoadout: 'loadouts/delete',
      copyLoadout: 'loadouts/copy',
    }),
  },
};
</script>

<style scoped>
.result-controls {
  width: 350px;
  margin: 0 5px;
  display: flex;
  justify-content: space-around;
  color: var(--osrs-font-color);
}
</style>
