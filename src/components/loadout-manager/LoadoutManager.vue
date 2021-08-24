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
      <calculation-iterator
        v-model="selectedRow"
        :calculations="calculations"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import LoadoutEditor from '../loadout/LoadoutEditor.vue';
import CalculationResult from '../results/CalculationResult.vue';
import TargetEditor from '../target/TargetEditor.vue';
import CalculationIterator from './CalculationIterator.vue';

export default {
  name: 'LoadoutManager',
  components: {
    CalculationIterator,
    TargetEditor,
    CalculationResult,
    LoadoutEditor,
  },
  data() {
    return {
      selectedRow: undefined,
      storeUnsubscribe: undefined,
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
