<template>
  <div>
    <template
      v-if="selectedLoadoutUuid"
    >
      <div class="master-view-grid">
        <loadout-editor
          :loadout-uuid="selectedLoadoutUuid"
        />
        <calculation-result :loadout-uuid="selectedLoadoutUuid" />
        <target-editor />
      </div>
    </template>
    <div class="data-table-section">
      <osrs-text-input v-model="search" />
      <v-data-table
        v-model="selectedRow"
        :headers="headers"
        :items="calculations"
        item-key="loadout.uuid"
        :items-per-page="5"
        :search="search"
        :footer-props="footerProps"
        height="200"
        show-group-by
        fixed-header
        single-select
        multi-sort
        dense
        @click:row="select"
      >
        <template #item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click.stop="copyItem(item)"
          >
            mdi-content-copy
          </v-icon>
          <v-icon
            small
            @click.stop="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import LoadoutEditor from '../loadout/LoadoutEditor.vue';
import CalculationResult from '../results/CalculationResult.vue';
import TargetEditor from '../target/TargetEditor.vue';
import OsrsTextInput from '../OsrsTextInput.vue';

export default {
  name: 'LoadoutManager',
  components: {
    OsrsTextInput,
    TargetEditor,
    CalculationResult,
    LoadoutEditor,
  },
  data() {
    return {
      selectedRow: undefined,
      search: undefined,
      storeUnsubscribe: undefined,
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'loadout.name',
          groupable: false,
        },
        {
          text: 'Combat',
          value: 'dpsType',
        },
        {
          text: 'Max hit',
          value: 'maxHit',
          groupable: false,
        },
        {
          text: 'DPS',
          value: 'dps',
          groupable: false,
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          groupable: false,
        },
      ],
      footerProps: {
        itemsPerPageOptions: [5, 10, 20, -1],
      },
    };
  },
  computed: {
    ...mapState({
      loadouts: (state) => Object.values(state.loadouts.list),
      calculations: (state) => Object.values(state.calculations.list),
    }),
    ...mapGetters({
      getCalculation: 'calculations/getCalculationByUuid',
    }),
    selectedLoadoutUuid() {
      if (this.selectedRow && this.selectedRow.length > 0) {
        return this.selectedRow[0]?.loadout.uuid;
      }
      return undefined;
    },
  },
  beforeMount() {
    this.bulkCalculate(this.loadouts.map((loadout) => loadout.uuid))
      .then(() => {
        if (this.calculations && this.calculations.length > 0) {
          this.selectedRow = [this.calculations[0]];
        }
      });
    this.storeUnsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'target/setTarget') {
        this.bulkCalculate(this.loadouts.map((loadout) => loadout.uuid));
      }
      if (mutation.type === 'loadouts/add') {
        this.calculate(mutation.payload.uuid)
          .then(() => { this.selectedRow = [this.getCalculation(mutation.payload.uuid)]; });
      }
    });
  },
  methods: {
    ...mapActions({
      calculate: 'calculations/calculate',
      bulkCalculate: 'calculations/bulkCalculate',
      deleteLoadout: 'loadouts/delete',
      copyLoadout: 'loadouts/copy',
    }),
    select(item, row) {
      row.select(true);
    },
    copyItem(item) {
      this.copyLoadout(item.loadout.uuid);
    },
    deleteItem(item) {
      this.deleteLoadout(item.loadout.uuid);
    },
  },
};
</script>

<style scoped>
.master-view-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 500px;
  padding: 10px;
  gap: 15px;
}

.data-table-section {
}
</style>
