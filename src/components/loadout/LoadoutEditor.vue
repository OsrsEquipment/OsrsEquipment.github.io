<template>
  <osrs-container class="loadout-details-container">
    <v-slide-group
      v-model="selectedTab"
      mandatory
      class="loadout-tabs-container"
    >
      <osrs-tab>
        <img
          src="../../static/osrs/Combat icon.png"
          alt="Combat"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../static/osrs/Stats icon.png"
          alt="Stats"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../static/osrs/Worn equipment.png"
          alt="Equipment"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../static/osrs/Prayer tab icon.png"
          alt="Prayers"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../static/osrs/Vial.png"
          alt="Potions"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../static/osrs/Cog.png"
          alt="Settings"
        >
      </osrs-tab>
    </v-slide-group>
    <v-window
      v-model="selectedTab"
      class="loadout-details-tab-items"
    >
      <osrs-tab-item>
        <loadout-stance :loadout-uuid="loadoutUuid" />
      </osrs-tab-item>
      <osrs-tab-item>
        <loadout-skills :loadout-uuid="loadoutUuid" />
      </osrs-tab-item>
      <osrs-tab-item>
        <div class="equipped-items-interface">
          <loadout-equipped-items :loadout-uuid="loadoutUuid" />
          <loadout-equipment-stats :loadout-uuid="loadoutUuid" />
        </div>
      </osrs-tab-item>
      <osrs-tab-item>
        <loadout-prayers :loadout-uuid="loadoutUuid" />
      </osrs-tab-item>
      <osrs-tab-item>
        <loadout-potions :loadout-uuid="loadoutUuid" />
      </osrs-tab-item>
      <osrs-tab-item>
        <loadout-settings :loadout-uuid="loadoutUuid" />
      </osrs-tab-item>
    </v-window>
  </osrs-container>
</template>

<script>
import OsrsContainer from '../OsrsContainer.vue';
import OsrsTab from '../OsrsTabs/OsrsTab.vue';
import OsrsTabItem from '../OsrsTabs/OsrsTabItem.vue';
import LoadoutEquippedItems from './LoadoutEquippedItems.vue';
import LoadoutEquipmentStats from './LoadoutEquipmentStats.vue';
import LoadoutStance from './LoadoutStance.vue';
import LoadoutSkills from './LoadoutSkills.vue';
import LoadoutPrayers from './LoadoutPrayers.vue';
import LoadoutPotions from './LoadoutPotions.vue';
import LoadoutSettings from './LoadoutSettings.vue';

export default {
  name: 'LoadoutEditor',
  components: {
    LoadoutSettings,
    LoadoutPotions,
    LoadoutPrayers,
    LoadoutSkills,
    LoadoutStance,
    LoadoutEquipmentStats,
    LoadoutEquippedItems,
    OsrsTabItem,
    OsrsTab,
    OsrsContainer,
  },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedTab: 2,
    };
  },
};
</script>

<style scoped>
.loadout-details-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 440px;
  margin: 10px 5px;
}

.loadout-tabs-container {
  margin: 5px;
  height: 40px;
}

.loadout-details-tab-items {
  flex: 1;
}

.equipped-items-interface {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
