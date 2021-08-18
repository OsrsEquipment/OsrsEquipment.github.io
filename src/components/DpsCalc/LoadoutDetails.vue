<template>
  <osrs-container class="loadout-details-container">
    <v-slide-group
      v-model="selectedTab"
      mandatory
      class="loadout-tabs-container"
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
      <osrs-tab>
        <img
          src="../../assets/osrs/Loadout Management.png"
          alt="Settings"
        >
      </osrs-tab>
    </v-slide-group>
    <v-window
      v-model="selectedTab"
      class="loadout-details-tab-items"
    >
      <osrs-tab-item>
        <stance-selector
          :equipped-weapon="weapon"
          :stance="internalLoadout.stance"
          :spell="internalLoadout.spell"
          @change="stanceChanged"
          @update:spell="spellChanged"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <player-skills
          :skills="internalLoadout.skills"
          @change="skillsChanged"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <div class="loadout-details-equipment-tab">
          <player-equipment
            :equipment="internalLoadout.equipment"
            @update:equipment="equipmentChanged"
          />
          <equipment-stats
            :equipment="internalLoadout.equipment"
            :bonuses="bonuses"
          />
        </div>
      </osrs-tab-item>
      <osrs-tab-item>
        <player-prayer
          :prayers="internalLoadout.prayers"
          @change="prayersChanged"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <player-potions
          :potions="internalLoadout.potions"
          @change="potionsChanged"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <player-settings
          :settings="internalLoadout.settings"
          @change="settingsChanged"
        />
      </osrs-tab-item>
      <osrs-tab-item>
        <loadout-management
          v-model="internalLoadout"
        />
      </osrs-tab-item>
    </v-window>
  </osrs-container>
</template>

<script>
import OsrsContainer from '../OsrsContainer.vue';
import OsrsTab from '../OsrsTabs/OsrsTab.vue';
import StanceSelector from './StanceSelection.vue';
import PlayerEquipment from './PlayerEquipment.vue';
import EquipmentStats from './EquipmentStats.vue';
import PlayerSkills from './PlayerSkills.vue';
import PlayerPrayer from './PlayerPrayer.vue';
import PlayerPotions from './PlayerPotions.vue';
import PlayerSettings from './LoadoutSettings.vue';
import LoadoutManagement from './LoadoutManagement.vue';
import OsrsTabItem from '../OsrsTabs/OsrsTabItem.vue';

export default {
  name: 'LoadoutDetails',
  components: {
    OsrsTabItem,
    LoadoutManagement,
    PlayerSettings,
    PlayerPotions,
    PlayerPrayer,
    PlayerSkills,
    EquipmentStats,
    PlayerEquipment,
    StanceSelector,
    OsrsTab,
    OsrsContainer,
  },
  provide() {
    return {
      loadout: this.internalLoadout,
      defaultLoadout: this.defaultLoadout,
      loadoutNumber: this.loadoutNumber,
    };
  },
  model: {
    prop: 'loadout',
    event: 'change',
  },
  props: {
    bonuses: {
      type: Object,
      default: undefined,
    },
    loadout: {
      type: Object,
      default: undefined,
    },
    loadoutNumber: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      selectedTab: 2,
      defaultLoadout: {
        skills: {
          attack: 99,
          hitpoints: 99,
          mining: 99,
          strength: 99,
          agility: 99,
          smithing: 99,
          defence: 99,
          herblore: 99,
          fishing: 99,
          ranged: 99,
          thieving: 99,
          cooking: 99,
          prayer: 99,
          crafting: 99,
          firemaking: 99,
          magic: 99,
          fletching: 99,
          woodcutting: 99,
          runecraft: 1,
          slayer: 99,
          farming: 99,
          construction: 99,
          hunter: 99,
        },
        settings: {
          bgsSpecialDamage: 0,
          dwhSpecials: 0,
          arclightSpecials: 0,
          onSlayerTask: true,
          inWilderness: true,
          currentHitpoints: 1,
        },
        stance: {
          attack_style: 'accurate',
          attack_type: 'crush',
          combat_style: 'punch',
          experience: 'attack',
        },
      },
      lazyLoadout: undefined,
    };
  },
  computed: {
    weapon() {
      return this.internalLoadout.equipment && this.internalLoadout.equipment.weapon
        ? this.internalLoadout.equipment.weapon : undefined;
    },
    internalLoadout: {
      get() {
        return this.lazyLoadout;
      },
      set(val) {
        this.lazyLoadout = val;
        this.$emit('update:loadout', val);
      },
    },
  },
  watch: {
    loadout: {
      immediate: true,
      handler(value) {
        if (value) {
          this.lazyLoadout = value;
        } else {
          this.internalLoadout = this.defaultLoadout;
        }
      },
    },
  },
  methods: {
    stanceChanged(stance) {
      this.internalLoadout = { ...this.internalLoadout, stance };
    },
    skillsChanged(skills) {
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
    spellChanged(spell) {
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
  display: flex;
  flex-direction: column;
  width: 350px;
  min-height: 450px;
  margin: 10px 5px;
}

.loadout-tabs-container {
  margin: 5px;
  height: 40px;
}

.loadout-details-tab-items {
  flex: 1;
}

.loadout-details-equipment-tab {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.loadout-details-equipment-tab:first-child {
  margin-right: 40px;
}
</style>
