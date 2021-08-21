<template>
  <div class="player-potions-container">
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
import { mapActions, mapGetters } from 'vuex';
import { capitalize, difference, uniq } from 'lodash';
import OsrsTooltip from '../OsrsTooltip.vue';
import EffectDirectory from '../../classes/EffectDirectory';

export default {
  name: 'LoadoutPotions',
  components: { OsrsTooltip },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      lazyPotions: undefined,
      categories: [
        'strength',
        'attack',
        'ranged',
        'magic',
      ],
    };
  },
  computed: {
    ...mapGetters({
      getPotionsByUuid: 'potions/getPotionsByUuid',
    }),
    potionsDirectory() {
      return EffectDirectory.potions;
    },
    potionsForCategory() {
      return (category) => [...this.potionsDirectory.values()]
        .filter((potion) => potion.categories.includes(category));
    },
    internalPotions: {
      get() {
        return this.lazyPotions;
      },
      set(value) {
        this.lazyPotions = value;
        this.setPotions({ uuid: this.loadoutUuid, potions: value });
      },
    },
    selectedPotions() {
      const result = {};

      if (this.internalPotions && this.internalPotions.length > 0) {
        this.internalPotions.forEach((potionName) => {
          const potion = this.potionsDirectory.get(potionName);
          const applicableCategories = potion.categories.filter((i) => this.categories.includes(i));
          applicableCategories.forEach((category) => {
            result[category] = potionName;
          });
        });
      }

      return result;
    },
  },
  beforeMount() {
    this.lazyPotions = this.getPotionsByUuid(this.loadoutUuid);
  },
  methods: {
    ...mapActions({
      setPotions: 'potions/addOrUpdate',
    }),
    getImageSrc(potion) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`../../assets/osrs/${potion.name}.png`);
    },
    selectPotion(category, potion) {
      const oldPotion = this.potionsDirectory.get(this.selectedPotions[category]);
      const newPotion = this.potionsDirectory.get(potion);
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
.player-potions-container {
  display: block;
  padding: 0 20px;
}

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
