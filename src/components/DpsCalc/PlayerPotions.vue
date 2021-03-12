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
            @click="selectPotion(category, undefined)"
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
            :class="{ 'active-potion': isSelected(category, potion.name) }"
            @click="selectPotion(category, potion.name)"
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
  model: {
    prop: 'potions',
    event: 'change',
  },
  props: {
    potions: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      lazyPotions: {},
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
    computedPotions() {
      return BoostManager.potions;
    },
    potionsForCategory() {
      return (category) => [...this.computedPotions.values()]
        .filter((potion) => potion.categories.includes(category));
    },
    internalPotions: {
      get() {
        return this.lazyPotions;
      },
      set(value) {
        this.lazyPotions = value;
        this.$emit('change', value);
      },
    },
  },
  watch: {
    potions: {
      immediate: true,
      handler(value) {
        this.lazyPotions = value;
        this.parseLazyPotions();
      },
    },
  },
  methods: {
    parseLazyPotions() {
      if (this.lazyPotions && this.lazyPotions.length > 0) {
        this.lazyPotions.forEach((potionName) => {
          const potion = this.computedPotions.get(potionName);
          const applicableCategories = potion.categories.filter((i) => this.categories.includes(i));
          applicableCategories.forEach((category) => {
            this.selectedPotions[category] = potionName;
          });
        });
      } else {
        this.categories.forEach((category) => {
          this.selectedPotions[category] = undefined;
        });
      }
    },
    getImageSrc(potion) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`../../assets/osrs/${potion.name}.png`);
    },
    selectPotion(category, potion) {
      const oldPotion = this.computedPotions.get(this.selectedPotions[category]);
      const newPotion = this.computedPotions.get(potion);
      let oldCategories;
      let newCategories;

      if (oldPotion) {
        oldCategories = oldPotion.categories;
      }
      if (newPotion) {
        newCategories = newPotion.categories;
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
      this.internalPotions = uniq(
        Object.values(this.selectedPotions).map((potion) => potion),
      ).filter(Boolean);
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
