<template>
  <osrs-container class="loadout-details-container">
    <osrs-tabs
      v-model="selectedTab"
    >
      <osrs-tab>
        <img
          src="../../assets/osrs/Combat icon.png"
          alt="Combat"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../assets/osrs/Stats icon.png"
          alt="Stats"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../assets/osrs/Worn equipment.png"
          alt="Equipment"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../assets/osrs/Prayer tab icon.png"
          alt="Prayers"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../assets/osrs/Vial.png"
          alt="Potions"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../assets/osrs/Cog.png"
          alt="Settings"
        >
      </osrs-tab>
    </osrs-tabs>
    <osrs-tab-items
      v-model="selectedTab"
      class="loadout-details-tab-items"
    >
      <osrs-tab-item>
        <stance-selector
          :equipped-weapon="weapon"
          @stance-changed="setStance"
          @spell-selected="spellSelected"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <player-skills
          @skills-changed="setSkills"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <div class="loadout-details-equipment-tab">
          <player-equipment
            :equipment="loadout.equipment"
            @update:equipment="equipmentChanged"
          />
          <equipment-stats
            :equipment="loadout.equipment"
            :bonuses="bonuses"
          />
        </div>
      </osrs-tab-item>
      <osrs-tab-item>
        <player-prayer
          @active-prayers="prayersChanged"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <player-potions
          @potions-changed="potionsChanged"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <player-settings
          @settings-changed="settingsChanged"
        />
      </osrs-tab-item>
    </osrs-tab-items>
  </osrs-container>
</template>

<script>
import OsrsContainer from '../OsrsContainer.vue';
import OsrsTabs from '../OsrsTabs/OsrsTabs.vue';
import OsrsTab from '../OsrsTabs/OsrsTab.vue';
import StanceSelector from './StanceSelection.vue';
import OsrsTabItems from '../OsrsTabs/OsrsTabItems.vue';
import OsrsTabItem from '../OsrsTabs/OsrsTabItem.vue';
import PlayerEquipment from './PlayerEquipment.vue';
import EquipmentStats from './EquipmentStats.vue';
import PlayerSkills from './PlayerSkills.vue';
import PlayerPrayer from './PlayerPrayer.vue';
import PlayerPotions from './PlayerPotions.vue';
import PlayerSettings from './LoadoutSettings.vue';

export default {
  name: 'LoadoutDetails',
  components: {
    PlayerSettings,
    PlayerPotions,
    PlayerPrayer,
    PlayerSkills,
    EquipmentStats,
    PlayerEquipment,
    OsrsTabItems,
    OsrsTabItem,
    StanceSelector,
    OsrsTabs,
    OsrsTab,
    OsrsContainer,
  },
  provide() {
    return {
      loadout: this.loadout,
    };
  },
  props: {
    bonuses: {
      type: Object,
      default: undefined,
    },
    value: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      selectedTab: 2,
      loadout: {
        equipment: {},
        skills: {},
        stance: {},
        boosts: [],
        prayers: [],
        potions: [],
        settings: {},
        spell: undefined,
      },
    };
  },
  computed: {
    weapon() {
      return this.loadout.equipment && this.loadout.equipment.weapon
        ? this.loadout.equipment.weapon : undefined;
    },
    internalLoadout: {
      get() {
        return this.loadout;
      },
      set(val) {
        this.loadout = val;
        this.$emit('input', val);
      },
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.loadout = value || {};
      },
    },
  },
  methods: {
    setStance(stance) {
      this.internalLoadout = { ...this.internalLoadout, stance };
    },
    setSkills(skills) {
      this.internalLoadout = { ...this.internalLoadout, skills };
    },
    prayersChanged(prayers) {
      this.internalLoadout = { ...this.internalLoadout, prayers };
    },
    potionsChanged(potions) {
      this.internalLoadout = { ...this.internalLoadout, potions };
    },
    settingsChanged(settings) {
      this.internalLoadout = { ...this.internalLoadout, settings };
    },
    spellSelected(spell) {
      this.internalLoadout = { ...this.internalLoadout, spell };
    },
    equipmentChanged(equipment) {
      this.internalLoadout = { ...this.internalLoadout, equipment };
    },
  },
};
</script>

<style scoped>
.loadout-details-container {
  position: relative;
  min-width: 360px;
  max-width: 400px;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loadout-details-tab-items {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loadout-details-equipment-tab {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
