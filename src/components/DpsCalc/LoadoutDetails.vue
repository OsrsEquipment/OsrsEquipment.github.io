<template>
  <osrs-container class="loadout-details-container">
    <osrs-tabs
      v-model="selectedTab"
    >
      <osrs-tab>
        <v-img src="../../assets/osrs/Combat icon.png" />
      </osrs-tab>
      <osrs-tab>
        <v-img src="../../assets/osrs/Stats icon.png" />
      </osrs-tab>
      <osrs-tab>
        <v-img src="../../assets/osrs/Worn equipment.png" />
      </osrs-tab>
      <osrs-tab>
        <v-img src="../../assets/osrs/Prayer tab icon.png" />
      </osrs-tab>
      <osrs-tab>
        <v-img src="../../assets/osrs/Vial.png" />
      </osrs-tab>
      <osrs-tab>
        <v-img src="../../assets/osrs/Cog.png" />
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
            :equipment.sync="loadout.equipment"
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
import BoostManager from '../../dps-calc/boost.manager';
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
  },
  data() {
    return {
      selectedTab: 2,
      loadout: {
        equipment: {},
        skills: {},
        stance: {},
        boosts: [],
        activePrayers: [],
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
  },
  watch: {
    'loadout.equipment': {
      immediate: true,
      handler(equipment) {
        this.$emit('equipment-changed', equipment);
        this.updateBoosts();
      },
    },
    'loadout.skills': {
      immediate: true,
      handler(skills) {
        this.$emit('skills-changed', skills);
      },
    },
    'loadout.stance': {
      immediate: true,
      handler(stance) {
        this.$emit('stance-changed', stance);
      },
    },
    'loadout.boosts': {
      immediate: true,
      handler(boosts) {
        this.$emit('boosts-changed', boosts);
      },
    },
    'loadout.settings': {
      immediate: true,
      handler(settings) {
        this.$emit('settings-changed', settings);
      },
    },
    'loadout.spell': {
      immediate: true,
      handler(spell) {
        this.$emit('spell-changed', spell);
      },
    },
  },
  methods: {
    setStance(stance) {
      this.loadout.stance = stance;
    },
    setSkills(skills) {
      this.loadout.skills = skills;
    },
    updateBoosts() {
      this.loadout.boosts = [
        ...BoostManager.getPrayerBoosts(this.loadout.activePrayers),
        ...BoostManager.getEquipmentBoosts(this.loadout.equipment),
        ...BoostManager.getPotionBoosts(this.loadout.potions),
        ...BoostManager.getOtherBoosts(this.loadout.settings),
      ];
    },
    prayersChanged(activePrayers) {
      this.loadout.activePrayers = activePrayers;
      this.updateBoosts();
    },
    potionsChanged(potions) {
      this.loadout.potions = potions;
      this.updateBoosts();
    },
    settingsChanged(settings) {
      this.loadout.settings = settings;
      this.updateBoosts();
    },
    spellSelected(spell) {
      this.loadout.spell = spell;
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
