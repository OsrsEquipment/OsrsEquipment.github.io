<template>
  <v-data-iterator
    :value="value"
    :items="calculations"
    item-key="loadout.uuid"
    :items-per-page="5"
    :search="search"
    :custom-filter="searchFilter"
    :page.sync="currentPage"
    hide-default-footer
    single-select
    @input="$emit('input', $event)"
  >
    <template #header>
      <div
        class="header-toolbar"
      >
        <osrs-text-input
          v-model="search"
          class="header-search"
        >
          <template #prepend>
            <v-icon large>
              mdi-magnify
            </v-icon>
          </template>
        </osrs-text-input>
        <v-spacer></v-spacer>
        <v-btn
          color="accent"
          class="mx-1"
          @click="previousPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="osrs-text-bold-12 mx-2">{{ currentPage }}/{{ maxPages }}</span>
        <v-btn
          color="accent"
          class="mx-1"
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn
          color="accent"
          class="ml-4"
          @click="newLoadout"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </template>
    <template #default="{ items, select, isSelected }">
      <v-row>
        <v-col
          class="data-iteration-section"
        >
          <calculation-row
            v-for="calculation in items"
            :key="calculation.loadout.uuid"
            :calculation="calculation"
            :selected="isSelected(calculation)"
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
import OsrsTextInput from '../OsrsTextInput.vue';

export default {
  name: 'CalculationIterator',
  components: {
    OsrsTextInput,
    CalculationRow,
  },
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
      currentPage: 1,
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
    maxPages() {
      return Math.ceil(this.calculations.length / 5);
    },
  },
  methods: {
    ...mapActions({
      calculate: 'calculations/calculate',
      bulkCalculate: 'calculations/bulkCalculate',
      deleteLoadout: 'loadouts/delete',
      copyLoadout: 'loadouts/copy',
      newLoadout: 'loadouts/new',
    }),
    copyItem(item) {
      this.copyLoadout(item.loadout.uuid);
    },
    deleteItem(item) {
      this.deleteLoadout(item.loadout.uuid);
    },
    searchFilter(items, search) {
      if (items && search) {
        return items.filter((item) => item.loadout.name.toLowerCase().includes(search));
      }
      return items;
    },
    previousPage() {
      this.currentPage = Math.max(1, this.currentPage - 1);
    },
    nextPage() {
      this.currentPage = Math.min(this.maxPages, this.currentPage + 1);
    },
  },
};
</script>

<style scoped>
.header-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: var(--osrs-light-brown);
  padding: 5px 10px;
  border-radius: 4px;
}

.header-search {
  flex: 1;
  min-width: 300px;
}

.data-iteration-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding: 0 12px;
  margin-top: 24px;
}

@media (max-width: 1200px) {
  .data-iteration-section {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .header-search {
    margin-bottom: 10px;
  }
}
</style>
