<template>
  <v-container>
    <v-row>
      <v-col v-if="hasValidData">
        <loadout-manager/>
      </v-col>
      <v-col v-else>
        <div class="no-data-disclaimer">
          <span>You have no valid data</span>
          <v-btn
            class="my-2"
            to="data"
          >
            Manage data
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import LoadoutManager from '../components/loadout-manager/LoadoutManager.vue';

export default {
  name: 'Loadouts',
  components: { LoadoutManager },
  computed: {
    ...mapState({
      equipment: (state) => state.equipment.list,
      monsters: (state) => state.monsters.list,
    }),
    hasValidData() {
      return this.equipment && this.equipment.length > 0
        && this.monsters && this.monsters.length > 0;
    },
  },
};
</script>

<style scoped>
.no-data-disclaimer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 24px;
}
</style>
