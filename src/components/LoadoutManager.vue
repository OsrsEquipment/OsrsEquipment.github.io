<template>
  <div class="loadout-manager-container">
    <osrs-text-input
      v-model="loadoutName"
      class="lmc-input"
    />
    <osrs-flat-button
      class="lmc-action"
      @click="saveLoadout"
    >
      Save
    </osrs-flat-button>
    <osrs-flat-button
      class="lmc-action"
    >
      Delete
    </osrs-flat-button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import OsrsTextInput from './OsrsTextInput.vue';
import OsrsFlatButton from './OsrsFlatButton.vue';

export default {
  name: 'LoadoutManager',
  components: { OsrsFlatButton, OsrsTextInput },
  inject: ['loadout'],
  data() {
    return {
      loadoutName: undefined,
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
    }),
    saveLoadout() {
      if (this.getByName(this.loadoutName)) {
        throw new Error('Name is not unique');
      } else {
        this.add({ name: this.loadoutName, loadout: this.loadout });
      }
    },
  },
};
</script>

<style scoped>
.loadout-manager-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 64px;
  place-items: center;
}

.lmc-input {
  grid-column: 1/-1;
}

.lmc-action {
  width: 96px;
}
</style>
