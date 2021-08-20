<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="loadout in loadouts" :key="loadout.uuid">
        <loadout-editor
          :loadout-uuid="loadout.uuid"
        />
      </v-col>
    </v-row>
    <osrs-container>
      {{ loadouts }}
    </osrs-container>
    <osrs-flat-button @click="createLoadout">
      New loadout
    </osrs-flat-button>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OsrsContainer from '../components/OsrsContainer.vue';
import LoadoutEditor from '../components/loadout/LoadoutEditor.vue';
import OsrsFlatButton from '../components/OsrsFlatButton.vue';

export default {
  name: 'DpsCalc',
  components: {
    OsrsFlatButton,
    LoadoutEditor,
    OsrsContainer,
  },
  data() {
    return {
      selectedTab: 0,
    };
  },
  computed: {
    ...mapState({
      loadouts: (state) => state.loadouts.list,
    }),
  },
  created() {
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
