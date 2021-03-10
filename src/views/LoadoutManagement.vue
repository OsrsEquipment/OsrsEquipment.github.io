<template>
  <v-container class="loadout-management-container">
    <div class="loadout-overview-container">
      <div
        class="single-loadout-container"
      >
        <osrs-text-input
          v-model="tempLoadout.name"
        />
        <loadout-details
          :value="tempLoadout"
        />
        <div class="single-loadout-container-actions">
          <osrs-flat-button
            class="manage-loadout-buttons"
            @click="saveLoadout"
          >
            Save
          </osrs-flat-button>
        </div>
      </div>
      <div
        v-for="loadout of loadouts"
        :key="loadout.name"
        class="single-loadout-container"
      >
        <osrs-text-input
          v-model="loadout.name"
        />
        <loadout-details
          :value="loadout"
        />
        <div class="single-loadout-container-actions">
          <osrs-flat-button
            class="manage-loadout-buttons"
            @click="updateLoadout(loadout)"
          >
            Update
          </osrs-flat-button>
          <osrs-flat-button
            class="manage-loadout-buttons"
            @click="deleteLoadout(loadout)"
          >
            Delete
          </osrs-flat-button>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import LoadoutDetails from '../components/DpsCalc/LoadoutDetails.vue';
import OsrsFlatButton from '../components/OsrsFlatButton.vue';
import OsrsTextInput from '../components/OsrsTextInput.vue';

export default {
  name: 'LoadoutManagement',
  components: { OsrsTextInput, OsrsFlatButton, LoadoutDetails },
  data() {
    return {
      tempLoadout: {
        name: 'New loadout',
        equipment: {},
        skills: {},
        stance: {},
        boosts: [],
        activePrayers: [],
        potions: [],
        settings: {},
        spell: undefined,
      },
    };
  },
  computed: {
    ...mapState({
      loadouts: (state) => state.loadouts.list,
    }),
    ...mapGetters({
      getByName: 'loadouts/getByName',
    }),
  },
  methods: {
    ...mapActions({
      add: 'loadouts/add',
      remove: 'loadouts/remove',
      update: 'loadouts/update',
      clear: 'loadouts/clear',
    }),
    saveLoadout() {
      if (
        this.tempLoadout
        && this.tempLoadout.name
        && this.tempLoadout.name.length > 0
        && !this.getByName(this.tempLoadout.name)
      ) {
        console.log(this.tempLoadout);
        this.add({ name: this.tempLoadout.name, loadout: { ...this.tempLoadout } });
        this.tempLoadout = {
          name: 'New loadout',
          equipment: {},
          skills: {},
          stance: {},
          boosts: [],
          activePrayers: [],
          potions: [],
          settings: {},
          spell: undefined,
        };
      } else {
        alert('Could not save, make sure you use a unique name');
      }
    },
    updateLoadout(loadout) {
      this.update({ name: loadout.name, loadout });
    },
    deleteLoadout(loadout) {
      this.remove({ loadout });
    },
  },
};
</script>

<style scoped>

.loadout-overview-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.single-loadout-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.single-loadout-container:first-child {
  margin-left: 0;
}

.single-loadout-container:last-child {
  margin-right: 0;
}

.single-loadout-container-actions {
  display: flex;
  margin: 10px;
}

.manage-loadout-buttons {
  width: 96px;
  margin: 0 5px;
}

</style>
