<template>
  <div class="loadout-settings-container">
    <div class="loadout-settings-grid">
      <!-- Dwh setting -->
      <osrs-tooltip>
        <template #activator="{ on }">
          <img
            v-if="dwhObject"
            :src="`data:image/png;base64,${dwhObject.icon}`"
            alt="Dragon warhammer"
            v-on="on"
          >
        </template>
        <span>Dragon warhammer specials that hit and deal more than 0 damage</span> <br>
        <span>Each hit reduces defence level by 30% of current defence level</span>
      </osrs-tooltip>
      <osrs-number-input
        v-model="settings.dwhSpecials"
        :max="9999"
        @input="updateSettings"
      />
      <!-- Arclight setting -->
      <osrs-tooltip>
        <template #activator="{ on }">
          <img
            v-if="arclightObject"
            :src="`data:image/png;base64,${arclightObject.icon}`"
            alt="Arclight"
            v-on="on"
          >
        </template>
        <span>Arclight/Darklight specials hit</span> <br>
        <span>Each hit reduces defence level by 5% (10% if demon)</span>
      </osrs-tooltip>
      <osrs-number-input
        v-model="settings.arclightSpecials"
        :max="9999"
        @input="updateSettings"
      />
      <!-- Bgs setting -->
      <osrs-tooltip>
        <template #activator="{ on }">
          <img
            v-if="bgsObject"
            :src="`data:image/png;base64,${bgsObject.icon}`"
            alt="Bandos godsword"
            v-on="on"
          >
        </template>
        <span>Bandos godsword specials damage</span> <br>
        <span>Reduces defence (and other stats) by this amount</span> <br>
        <span>Order: Defence > Strength > Attack > Magic > Ranged</span>
      </osrs-tooltip>
      <osrs-number-input
        v-model="settings.bgsSpecialDamage"
        :max="9999"
        @input="updateSettings"
      />
      <!-- Slayer setting -->
      <img
        src="../../assets/osrs/Slayer icon.png"
        alt="Slayer"
      >
      <osrs-tooltip>
        <template #activator="{ on }">
          <osrs-checkbox
            v-model="settings.onSlayerTask"
            @input="updateSettings"
            v-on="on"
          />
        </template>
        <span>Are you on a slayer task?</span>
      </osrs-tooltip>
      <!-- Hitpoints setting -->
      <osrs-tooltip>
        <template #activator="{ on }">
          <img
            src="../../assets/osrs/Hitpoints icon.png"
            alt="Hitpoints"
            v-on="on"
          >
        </template>
        <span>Your current hitpoints</span> <br>
        <span>Used for Dharok's set effect</span>
      </osrs-tooltip>
      <osrs-number-input
        v-model="settings.currentHitpoints"
        :min="1"
        :max="99"
        @input="updateSettings"
      />
      <!-- Wilderness setting -->
      <img
        src="../../assets/osrs/Skull icon.png"
        alt="Skull"
      >
      <osrs-tooltip>
        <template #activator="{ on }">
          <osrs-checkbox
            v-model="settings.inWilderness"
            @input="updateSettings"
            v-on="on"
          />
        </template>
        <span>Is target in wilderness?</span>
      </osrs-tooltip>
    </div>
  </div>
</template>

<script>
import ItemsManager from '../../services/managers/items.manager';
import OsrsNumberInput from '../OsrsNumberInput.vue';
import OsrsCheckbox from '../OsrsCheckbox.vue';
import OsrsTooltip from '../OsrsTooltip.vue';

export default {
  name: 'LoadoutSettings',
  components: {
    OsrsTooltip, OsrsCheckbox, OsrsNumberInput,
  },
  data() {
    return {
      bgsId: 11804,
      bgsObject: undefined,
      dwhId: 13576,
      dwhObject: undefined,
      arclightId: 19675,
      arclightObject: undefined,
      settings: {
        bgsSpecialDamage: 0,
        dwhSpecials: 0,
        arclightSpecials: 0,
        onSlayerTask: true,
        inWilderness: true,
        currentHitpoints: 1,
      },
    };
  },
  created() {
    this.getBgs();
    this.getDwh();
    this.getArclight();
    this.updateSettings();
  },
  methods: {
    async getBgs() {
      this.bgsObject = await ItemsManager.getById(this.bgsId);
    },
    async getDwh() {
      this.dwhObject = await ItemsManager.getById(this.dwhId);
    },
    async getArclight() {
      this.arclightObject = await ItemsManager.getById(this.arclightId);
    },
    updateSettings() {
      this.$emit('settings-changed', {
        ...this.settings,
      });
    },
  },
};
</script>

<style scoped>
.loadout-settings-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
}

.loadout-settings-grid {
  display: grid;
  grid-template-columns: 32px 1fr 32px 1fr;
  grid-auto-rows: 32px;
  grid-gap: 16px;
  align-items: center;
}
</style>
