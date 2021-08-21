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
        v-model="internalSettings.dwhSpecials"
        :max="9999"
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
        v-model="internalSettings.arclightSpecials"
        :max="9999"
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
        v-model="internalSettings.bgsSpecialDamage"
        :max="9999"
      />
      <!-- Slayer setting -->
      <img
        src="../../static/osrs/Slayer icon.png"
        alt="Slayer"
      >
      <osrs-tooltip>
        <template #activator="{ on }">
          <osrs-checkbox
            v-model="internalSettings.onSlayerTask"
            v-on="on"
          />
        </template>
        <span>Are you on a slayer task?</span>
      </osrs-tooltip>
      <!-- Hitpoints setting -->
      <osrs-tooltip>
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Hitpoints icon.png"
            alt="Hitpoints"
            v-on="on"
          >
        </template>
        <span>Your current hitpoints</span> <br>
        <span>Used for Dharok's set effect</span>
      </osrs-tooltip>
      <osrs-number-input
        v-model="internalSettings.currentHitpoints"
        :min="1"
        :max="99"
      />
      <!-- Wilderness setting -->
      <img
        src="../../static/osrs/Skull icon.png"
        alt="Skull"
      >
      <osrs-tooltip>
        <template #activator="{ on }">
          <osrs-checkbox
            v-model="internalSettings.inWilderness"
            v-on="on"
          />
        </template>
        <span>Is target in wilderness?</span>
      </osrs-tooltip>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ItemsManager from '../../services/managers/items.manager';
import OsrsNumberInput from '../OsrsNumberInput.vue';
import OsrsCheckbox from '../OsrsCheckbox.vue';
import OsrsTooltip from '../OsrsTooltip.vue';

export default {
  name: 'LoadoutSettings',
  components: {
    OsrsTooltip, OsrsCheckbox, OsrsNumberInput,
  },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      bgsId: 11804,
      bgsObject: undefined,
      dwhId: 13576,
      dwhObject: undefined,
      arclightId: 19675,
      arclightObject: undefined,
      lazySettings: undefined,
    };
  },
  computed: {
    ...mapGetters({
      getSettingsByUuid: 'settings/getSettingsByUuid',
    }),
    computedSettings: {
      get() {
        return this.lazySettings;
      },
      set(value) {
        this.lazySettings = new Proxy(value, {
          set: (obj, prop, val) => {
            obj[prop] = val;
            this.setSettings({ uuid: this.loadoutUuid, settings: obj });
            return true;
          },
        });
      },
    },
    internalSettings: {
      get() {
        return this.computedSettings;
      },
      set(value) {
        this.computedSettings = value;
        this.setSettings({ uuid: this.loadoutUuid, settings: value });
      },
    },
  },
  created() {
    this.getBgs();
    this.getDwh();
    this.getArclight();
  },
  beforeMount() {
    this.computedSettings = this.getSettingsByUuid(this.loadoutUuid);
  },
  methods: {
    ...mapActions({
      setSettings: 'settings/addOrUpdate',
    }),
    async getBgs() {
      this.bgsObject = await ItemsManager.getById(this.bgsId);
    },
    async getDwh() {
      this.dwhObject = await ItemsManager.getById(this.dwhId);
    },
    async getArclight() {
      this.arclightObject = await ItemsManager.getById(this.arclightId);
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
