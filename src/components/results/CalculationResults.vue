<template>
  <osrs-container
    class="calculation-result-container"
  >
    <v-slide-group
      v-model="selectedTab"
    >
      <osrs-tab>
        <img
          src="../../static/osrs/Damage hitsplat.png"
          alt="Hitsplat"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../static/osrs/Death Charge.png"
          alt="Hitsplat"
        >
      </osrs-tab>
      <osrs-tab>
        <img
          src="../../static/osrs/Monster Examine.png"
          alt="Hitsplat"
        >
      </osrs-tab>
    </v-slide-group>
    <v-window
      v-model="selectedTab"
      class="calculation-result-tab-items"
    >
      <osrs-tab-item>
        <calculation-summary :loadout-uuid="loadoutUuid" />
      </osrs-tab-item>
      <osrs-tab-item>
        <effect-summary :loadout-uuid="loadoutUuid" />
      </osrs-tab-item>
      <osrs-tab-item>
        <debuffed-target-summary :loadout-uuid="loadoutUuid" />
      </osrs-tab-item>
    </v-window>
  </osrs-container>
</template>

<script>
import OsrsContainer from '../OsrsContainer.vue';
import OsrsTab from '../OsrsTabs/OsrsTab.vue';
import OsrsTabItem from '../OsrsTabs/OsrsTabItem.vue';
import CalculationSummary from './CalculationSummary.vue';
import EffectSummary from './EffectSummary.vue';
import DebuffedTargetSummary from './DebuffedTargetSummary.vue';

export default {
  name: 'CalculationResults',
  components: {
    DebuffedTargetSummary,
    EffectSummary,
    CalculationSummary,
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
      selectedTab: 0,
    };
  },
};
</script>

<style scoped>
.calculation-result-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
}

.calculation-result-tab-items {
  flex: 1;
}
</style>
