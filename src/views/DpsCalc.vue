<template>
  <v-container fluid>
    <osrs-flat-button @click="createLoadout">
      New loadout
    </osrs-flat-button>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import OsrsFlatButton from '../components/OsrsFlatButton.vue';

export default {
  name: 'DpsCalc',
  components: {
    OsrsFlatButton,
  },
  methods: {
    ...mapActions({
      newLoadout: 'loadouts/new',
    }),
    createLoadout() {
      this.newLoadout();
    },
  },
};
</script>

<style scoped>
</style>
