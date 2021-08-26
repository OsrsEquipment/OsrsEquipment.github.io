<template>
  <div class="loadout-manager">
    <template
      v-if="selectedLoadoutUuid"
    >
      <div class="loadout-details-grid">
        <div class="loadout-details-grid-row">
          <span class="loadout-details-grid-title osrs-text-quill-8">
            <loadout-name-editor :loadout-uuid="selectedLoadoutUuid" />
          </span>
          <loadout-editor
            :loadout-uuid="selectedLoadoutUuid"
            class="loadout-details-grid-item"
          />
        </div>
        <div class="loadout-details-grid-item">
          <span class="loadout-details-grid-title osrs-text-quill-8">
            Results
          </span>
          <calculation-result
            :loadout-uuid="selectedLoadoutUuid"
            class="loadout-details-grid-item"
          />
        </div>
        <div class="loadout-details-grid-item">
          <span class="loadout-details-grid-title osrs-text-quill-8">
            Target
          </span>
          <target-editor
            class="loadout-details-grid-item"
          />
        </div>
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
import LoadoutNameEditor from './LoadoutNameEditor.vue';

export default {
  name: 'LoadoutManager',
  components: {
    LoadoutNameEditor,
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
          .then(() => {
            this.selectedRow = [this.getCalculation(mutation.payload.uuid)];
          });
      }
      if (mutation.type === 'loadouts/update') {
        this.calculate(mutation.payload.uuid);
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
.loadout-manager {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loadout-details-grid {
  display: grid;
  grid-template-columns: repeat(3, 350px);
  grid-gap: 10px;
}

.loadout-details-grid-title {
  display: block;
  text-align: center;
  height: 50px;
}

.loadout-details-grid-row {
  display: flex;
  flex-direction: column;
}

.loadout-details-grid-item {
  height: 500px;
}

.data-table-section {
  margin: 20px 0;
  width: 100%;
}

@media (max-width: 1200px) {
  .loadout-details-grid {
    grid-template-columns: 350px;
    grid-template-rows: repeat(3, 550px);
  }
}
</style>
