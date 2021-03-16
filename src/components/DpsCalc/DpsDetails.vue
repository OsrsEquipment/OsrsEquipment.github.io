<template>
  <osrs-container
    class="calc-result-container"
  >
    <div
      v-if="isReady"
    >
      <div class="calc-result-grid">
        <span class="crg-header">
          Combat
        </span>
        <span class="crg-cell">
          {{ combatType(dps1) }}
        </span>
        <span class="crg-cell" />
        <span class="crg-cell">
          {{ combatType(dps2) }}
        </span>
        <span class="crg-header">
          Max hit
        </span>
        <span class="crg-cell">
          {{ dps1.maxHit }}
        </span>
        <span class="crg-cell crg-cell-middle">
          {{ valueDifference(dps1.maxHit, dps2.maxHit) }}
        </span>
        <span class="crg-cell">
          {{ dps2.maxHit }}
        </span>
        <span class="crg-header">
          Accuracy
        </span>
        <span class="crg-cell">
          {{ formatHitChance(dps1.hitChance) }}
        </span>
        <span class="crg-cell crg-cell-middle">
          {{ valueDifference(dps1.hitChance, dps2.hitChance) }}
        </span>
        <span class="crg-cell">
          {{ formatHitChance(dps2.hitChance) }}
        </span>
        <span class="crg-header">
          DPS
        </span>
        <span class="crg-cell">
          {{ formatDps(dps1.dps) }}
        </span>
        <span class="crg-cell crg-cell-middle">
          {{ valueDifference(dps1.dps, dps2.dps) }}
        </span>
        <span class="crg-cell">
          {{ formatDps(dps2.dps) }}
        </span>
      </div>
      <osrs-tabs
        v-model="boostsTab"
        class="calc-result-boost-tabs"
        :grow="true"
      >
        <osrs-tab
          v-for="(boosts, index) of computedBoosts"
          :key="index"
        >
          <span>Boosts {{ index + 1 }} ({{ boosts.length }})</span>
        </osrs-tab>
      </osrs-tabs>
      <osrs-tab-items
        v-model="boostsTab"
      >
        <osrs-tab-item
          v-for="(boosts, index) of computedBoosts"
          :key="index"
        >
          <ul class="calc-result-boost-list">
            <li
              v-for="boost of boosts"
              :key="boost.name"
              class="calc-result-boost-list-item"
              :class="{'boost-inactive': !boost.active}"
            >
              {{ boost.name }}
            </li>
          </ul>
        </osrs-tab-item>
      </osrs-tab-items>
    </div>
    <div v-else>
      Edit your loadouts and pick a target to start seeing results
    </div>
  </osrs-container>
</template>

<script>
import MagicDps from '../../dps-calc/magic-dps';
import RangedDps from '../../dps-calc/ranged-dps';
import OsrsContainer from '../OsrsContainer.vue';
import OsrsTabs from '../OsrsTabs/OsrsTabs.vue';
import OsrsTab from '../OsrsTabs/OsrsTab.vue';
import OsrsTabItems from '../OsrsTabs/OsrsTabItems.vue';
import OsrsTabItem from '../OsrsTabs/OsrsTabItem.vue';

export default {
  name: 'DpsDetails',
  components: {
    OsrsTabItem, OsrsTabItems, OsrsTab, OsrsTabs, OsrsContainer,
  },
  props: {
    dps1: {
      type: Object,
      default: undefined,
    },
    dps2: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      boostsTab: 0,
    };
  },
  computed: {
    isReady() {
      return !!(this.dps1 && this.dps2);
    },
    computedBoosts() {
      if (this.dps1 && this.dps2) {
        const boosts = [];
        boosts.push(this.dps1.boosts.filter((i) => i.show));
        boosts.push(this.dps2.boosts.filter((i) => i.show));
        return boosts;
      }
      return [];
    },
  },
  watch: {

  },
  methods: {
    valueDifference(a, b) {
      if (a === b) {
        return '-';
      }
      if (a > b) {
        return `< +${((a - b) / a * 100).toFixed(2)}%`;
      }
      return `+${((b - a) / b * 100).toFixed(2)}% >`;
    },
    combatType(dps) {
      if (dps instanceof RangedDps) {
        return 'Ranged';
      }
      if (dps instanceof MagicDps) {
        return 'Magic';
      }
      return 'Melee';
    },
    formatHitChance(hitChance) {
      return `${(hitChance * 100).toFixed(2)}%`;
    },
    formatDps(dps) {
      return `${dps.toFixed(4)}`;
    },
  },
};
</script>

<style scoped>
.calc-result-container {
  width: 320px;
  height: 450px;
  margin: 10px 5px;
}

.calc-result-grid {
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  place-items: center;
  border: 1px solid var(--osrs-dark-brown);
}

.calc-result-grid .crg-solo,
.calc-result-grid .crg-header {
  grid-column: 1/-1;
}

.calc-result-grid .crg-header {
  display: flex;
  justify-content: center;
  width: 100%;
  background: var(--osrs-dark-brown);
  font-family: "runescape_quill_8regular", "Roboto", sans-serif;
  text-shadow: 1px 1px 1px black;
  font-size: 20px;
  padding-top: 5px;
  line-height: 1em;
}

.calc-result-grid .crg-cell {
  font-size: 24px;
}
.calc-result-grid .crg-cell-middle {
  font-size: 18px;
}

.calc-result-boost-tabs {
  margin-top: 10px;
}

.calc-result-boost-list {
  width: 100%;
  max-width: 340px;
  max-height: 140px;
  overflow-y: auto;
  overflow-x: hidden;
  list-style: none;
  padding: 0 4px;
}

.calc-result-boost-list-item {
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
}

.calc-result-boost-list-item.boost-inactive {
  text-decoration: line-through;
}
</style>
