<template>
  <v-container
    v-scroll="onScroll"
    class="loadout-management-container"
  >
    <div class="loadout-overview-container">
      <div
        class="single-loadout-container"
      >
        <template v-if="addingNewLoadout">
          <osrs-text-input
            v-model="tempLoadoutName"
          />
          <loadout-details
            v-model="tempLoadout"
          />
          <div class="single-loadout-container-actions">
            <osrs-flat-button
              class="manage-loadout-buttons"
              @click="saveLoadout"
            >
              Save
            </osrs-flat-button>
            <osrs-flat-button
              class="manage-loadout-buttons"
              @click="cancelLoadout"
            >
              Cancel
            </osrs-flat-button>
          </div>
        </template>
        <template v-else>
          <osrs-container
            class="single-loadout-container new-loadout-container"
          >
            <osrs-flat-button
              class="manage-loadout-buttons"
              @click="newLoadout"
            >
              New loadout
            </osrs-flat-button>
          </osrs-container>
        </template>
      </div>
      <div
        v-for="(loadout, index) of computedLoadouts"
        :key="loadout.name"
        class="single-loadout-container"
      >
        <osrs-text-input
          v-model="computedLoadouts[index].name"
        />
        <loadout-details
          v-model="computedLoadouts[index]"
        />
        <div class="single-loadout-container-actions">
          <osrs-flat-button
            class="manage-loadout-buttons"
            @click="copyLoadout(computedLoadouts[index])"
          >
            Copy
          </osrs-flat-button>
          <osrs-flat-button
            class="manage-loadout-buttons"
            @click="updateLoadout(computedLoadouts[index])"
          >
            Update
          </osrs-flat-button>
          <osrs-flat-button
            class="manage-loadout-buttons"
            @click="deleteLoadout(computedLoadouts[index])"
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
import OsrsContainer from '../components/OsrsContainer.vue';

export default {
  name: 'LoadoutManagement',
  components: {
    OsrsContainer, OsrsTextInput, OsrsFlatButton, LoadoutDetails,
  },
  data() {
    return {
      tempLoadoutName: undefined,
      tempLoadout: undefined,
      lastItem: 7,
      addingNewLoadout: false,
    };
  },
  computed: {
    ...mapState({
      loadouts: (state) => state.loadouts.list,
    }),
    ...mapGetters({
      getByName: 'loadouts/getByName',
    }),
    computedLoadouts() {
      return [...this.loadouts]
        .slice(0, this.lastItem);
    },
  },
  mounted() {
    // check if we already need to load more
    this.onScroll();
  },
  methods: {
    ...mapActions({
      add: 'loadouts/add',
      remove: 'loadouts/remove',
      update: 'loadouts/update',
      clear: 'loadouts/clear',
    }),
    newLoadout() {
      this.addingNewLoadout = true;
    },
    cancelLoadout() {
      this.addingNewLoadout = false;
      this.tempLoadoutName = undefined;
      this.tempLoadout = undefined;
    },
    saveLoadout() {
      if (
        this.tempLoadout
        && this.tempLoadoutName
        && this.tempLoadoutName.length > 0
        && !this.getByName(this.tempLoadoutName)
      ) {
        this.addingNewLoadout = false;
        this.add({ name: this.tempLoadoutName, loadout: { ...this.tempLoadout } });
        this.tempLoadout = undefined;
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
    copyLoadout(loadout) {
      this.tempLoadout = { ...loadout };
      this.addingNewLoadout = true;
    },
    onScroll() {
      if (this.lastItem > this.loadouts.length) return;

      const showMoreItems = (
        document.documentElement.scrollHeight
        - (document.documentElement.scrollTop
          + document.documentElement.clientHeight)
      ) < 200;

      if (showMoreItems) {
        this.lastItem += 4;
      }
    },
  },
};
</script>

<style scoped>

.loadout-overview-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.single-loadout-container {
  position: relative;
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

.new-loadout-container {
  position: relative;
  min-width: 360px;
  max-width: 400px;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
