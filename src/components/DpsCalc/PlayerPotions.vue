<template>
  <div>
    <div
      v-for="category in categories"
      :key="category"
      class="potion-section-selection"
    >
      <span class="potion-section-header">
        {{ capitalize(category) }}
      </span>
      <osrs-tooltip>
        <template #activator="{ on }">
          <div
            class="player-potion-item"
            :class="{ 'active-potion': isSelected(category, undefined) }"
            @click="selectionPotion(category, undefined)"
            v-on="on"
          >
            <img
              src="../../assets/osrs/Vial.png"
              alt="None"
            >
          </div>
        </template>
        <span>Nothing</span>
      </osrs-tooltip>
      <osrs-tooltip
        v-for="potion in potionsForCategory(category)"
        :key="potion.name"
      >
        <template #activator="{ on }">
          <div
            class="player-potion-item"
            :class="{ 'active-potion': isSelected(category, potion) }"
            @click="selectionPotion(category, potion)"
            v-on="on"
          >
            <img
              :src="getImageSrc(potion)"
              :alt="potion.name"
            >
          </div>
        </template>
        <span>{{ potion.name }}</span>
      </osrs-tooltip>
    </div>
  </div>
</template>

<script>
import { capitalize, difference, uniq } from 'lodash';
import BoostManager from '../../dps-calc/boost.manager';
import OsrsTooltip from '../OsrsTooltip.vue';

export default {
  name: 'PlayerPotions',
  components: { OsrsTooltip },
  data() {
    return {
      categories: [
        'strength',
        'attack',
        'ranged',
        'magic',
      ],
      selectedPotions: {
        strength: undefined,
        attack: undefined,
        ranged: undefined,
        magic: undefined,
      },
    };
  },
  computed: {
    potions() {
      return BoostManager.potions;
    },
    potionsForCategory() {
      return (category) => [...this.potions.values()]
        .filter((potion) => potion.categories.includes(category));
    },
  },
  methods: {
    getImageSrc(potion) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`../../assets/osrs/${potion.name}.png`);
    },
    selectionPotion(category, potion) {
      const oldPotion = this.selectedPotions[category];
      let oldCategories;
      let newCategories;

      if (oldPotion) {
        oldCategories = oldPotion.categories;
      }
      if (potion) {
        newCategories = potion.categories;
      }

      const unsetCategories = difference(oldCategories, newCategories);
      if (unsetCategories) {
        unsetCategories.forEach((i) => { this.selectedPotions[i] = undefined; });
      }
      if (newCategories) {
        newCategories.forEach((i) => { this.selectedPotions[i] = potion; });
      } else {
        this.selectedPotions[category] = undefined;
      }
      this.updatePotions();
    },
    isSelected(category, potion) {
      return this.selectedPotions[category] === potion;
    },
    capitalize,
    updatePotions() {
      this.$emit('potions-changed', uniq(Object.values(this.selectedPotions).map((potion) => (potion ? potion.name : undefined))).filter(Boolean));
    },
  },
};
</script>

<style scoped>
.potion-section-header {
  width: 100%;
}

.potion-section-selection {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.potion-section-selection .player-potion-item {
  margin: 2px 8px;
  opacity: 0.33;
  cursor: pointer;
}

.potion-section-selection .player-potion-item.active-potion {
  opacity: 1;
}

.potion-section-selection .player-potion-item:first-child {
  margin-left: 0;
}

.potion-section-selection .player-potion-item:last-child {
  margin-right: 0;
}
</style>
