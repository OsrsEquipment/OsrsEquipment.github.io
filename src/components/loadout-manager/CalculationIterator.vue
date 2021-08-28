<template>
  <v-data-iterator
    :value="value"
    :items="calculations"
    item-key="loadout.uuid"
    :items-per-page="showItems"
    :search="search"
    :custom-filter="searchFilter"
    :page.sync="currentPage"
    :sort-by="sortBy"
    :sort-desc="sortDesc"
    hide-default-footer
    single-select
    @input="$emit('input', $event)"
  >
    <template #no-data>
      <div class="no-data-section">
        <span>Add a new loadout to get started</span>
      </div>
    </template>
    <template #no-results>
      <div class="no-data-section">
        <span>No matching loadouts found</span>
      </div>
    </template>
    <template #header>
      <v-sheet
        class="header-toolbar"
        color="secondary"
      >
        <osrs-text-field
          v-model="search"
          label="Search"
          class="header-search"
          clearable
          solo
          hide-details
        ></osrs-text-field>
        <osrs-select
          v-model="sortBy"
          :items="sortOptions"
          label="Sort by"
          class="header-sort"
          clearable
          solo
          hide-details
        ></osrs-select>
        <v-btn-toggle
          v-model="sortDesc"
          borderless
          mandatory
        >
          <v-btn
            :value="false"
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn
            :value="true"
          >
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-1"
          @click="previousPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="header-page-text">
          {{ computedPage }}/{{ maxPages }}
        </span>
        <v-btn
          class="mx-1"
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn
          class="ml-4"
          @click="newLoadout"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-sheet>
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
import { mapActions } from 'vuex';
import CalculationRow from './CalculationRow.vue';
import OsrsSelect from '../OsrsSelect.vue';
import OsrsTextField from '../OsrsTextField.vue';

export default {
  name: 'CalculationIterator',
  components: {
    OsrsTextField,
    OsrsSelect,
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
      showItems: 10,
      search: undefined,
      currentPage: 1,
      sortBy: 'dps',
      sortDesc: true,
      sortOptions: [
        {
          text: 'Loadout name',
          value: 'loadout.name',
        },
        {
          text: 'Max hit',
          value: 'maxHit',
        },
        {
          text: 'Accuracy',
          value: 'hitChance',
        },
        {
          text: 'DPS',
          value: 'dps',
        },
      ],
    };
  },
  computed: {
    selectedLoadoutUuid() {
      if (this.selectedRow && this.selectedRow.length > 0) {
        return this.selectedRow[0]?.loadout.uuid;
      }
      return undefined;
    },
    computedPage() {
      if (this.calculations && this.calculations.length > 0) {
        return this.currentPage;
      }
      return 0;
    },
    maxPages() {
      return Math.ceil(this.calculations.length / this.showItems);
    },
  },
  methods: {
    ...mapActions({
      newLoadout: 'loadouts/new',
    }),
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
  padding: 5px 10px;
  border-radius: 4px;
  gap: 10px;
}

.header-search {
  flex: 1;
  min-width: 300px;
}

.header-sort {
  flex: 1;
  min-width: 200px;
}

.header-page-text {
  line-height: 1em;
}

.data-iteration-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding: 0 12px;
  margin-top: 24px;
}

.no-data-section {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  user-select: none;
  min-height: 100px;
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
