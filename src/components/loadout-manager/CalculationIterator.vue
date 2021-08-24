<template>
  <v-data-iterator
    :value="value"
    :items="calculations"
    item-key="loadout.uuid"
    hide-default-footer
    single-select
    @input="$emit('input', $event)"
  >
    <template #default="{ items, select, isSelected }">
      <v-row>
        <v-col>
          <calculation-row
            v-for="calculation in items"
            :key="calculation.loadout.uuid"
            :calculation="calculation"
            :selected="isSelected(calculation)"
            class="my-2"
            @click.native="select(calculation)"
          />
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import CalculationRow from './CalculationRow.vue';

export default {
  name: 'CalculationIterator',
  components: { CalculationRow },
  props: {
    value: {
      type: Array,
      required: false,
    },
    calculations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: undefined,
    };
  },
  computed: {
    ...mapState({
      loadouts: (state) => Object.values(state.loadouts.list),
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
  methods: {
    ...mapActions({
      calculate: 'calculations/calculate',
      bulkCalculate: 'calculations/bulkCalculate',
      deleteLoadout: 'loadouts/delete',
      copyLoadout: 'loadouts/copy',
    }),
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

</style>
