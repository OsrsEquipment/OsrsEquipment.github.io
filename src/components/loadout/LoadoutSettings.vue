<template>
  <div class="loadout-settings-container">
    <div class="loadout-settings-grid">
      <!-- Dwh setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Dragon warhammer.png"
            alt="Dragon warhammer"
            v-on="on"
          >
        </template>
        <span>Dragon warhammer specials that hit and deal more than 0 damage
          reduce the target's defence by 30%</span>
      </v-tooltip>
      <osrs-number-input
        v-model="internalSettings.dwhSpecials"
        :max="9999"
      />
      <!-- Arclight setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Arclight.png"
            alt="Arclight"
            v-on="on"
          >
        </template>
        <span>Arclight/Darklight specials that hit
          reduce the target's defence level by 5% (10% if demon)</span>
      </v-tooltip>
      <osrs-number-input
        v-model="internalSettings.arclightSpecials"
        :max="9999"
      />
      <!-- Bgs setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Bandos godsword.png"
            alt="Bandos godsword"
            v-on="on"
          >
        </template>
        <span>Bandos godsword specials  drains the target's combat levels equivalent to the
          damage hit in the following order: Defence, Strength, Prayer, Attack, Magic, Ranged</span>
      </v-tooltip>
      <osrs-number-input
        v-model="internalSettings.bgsSpecialDamage"
        :max="9999"
      />
      <!-- Hitpoints setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Hitpoints icon.png"
            alt="Hitpoints"
            v-on="on"
          >
        </template>
        <span>Your current hitpoints</span> <br>
        <span>Certain effects need this information (e.g. Dharok's set effect)</span>
      </v-tooltip>
      <osrs-number-input
        v-model="internalSettings.currentHitpoints"
        :min="1"
        :max="99"
      />
      <!-- Prayer setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Prayer icon.png"
            alt="Prayer"
            v-on="on"
          >
        </template>
        <span>Your current prayer points</span> <br>
        <span>Certain effects need this information (e.g. Abyssal bludgeon special)</span>
      </v-tooltip>
      <osrs-number-input
        v-model="internalSettings.currentPrayerPoints"
        :min="0"
        :max="99"
      />
      <!-- Special energy setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Special attack orb.png"
            alt="Prayer"
            v-on="on"
          >
        </template>
        <span>Your special attack energy</span> <br>
        <span>Certain effects need this information (e.g. Dragon hasta special)</span>
      </v-tooltip>
      <osrs-number-input
        v-model="internalSettings.currentSpecialEnergy"
        :min="0"
        :max="100"
      />
      <!-- Slayer setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Slayer icon.png"
            alt="Slayer"
            v-on="on"
          >
        </template>
        <span>Are you on a slayer task?</span>
      </v-tooltip>
      <osrs-checkbox
        v-model="internalSettings.onSlayerTask"
      />
      <!-- Wilderness setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Skull icon.png"
            alt="Skull"
            v-on="on"
          >
        </template>
        <span>Is target in wilderness?</span>
      </v-tooltip>
      <osrs-checkbox
        v-model="internalSettings.inWilderness"
      />
      <!-- Kandarin diary setting -->
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <img
            src="../../static/osrs/Achievement Diaries icon.png"
            alt="Achievement diaries"
            v-on="on"
          >
        </template>
        <span>If you have hard Kandarin diary completed
          your bolt specs have a 10% increased proc chance</span>
      </v-tooltip>
      <osrs-checkbox
        v-model="internalSettings.completedHardKandarinDiary"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import OsrsNumberInput from '../OsrsNumberInput.vue';
import OsrsCheckbox from '../OsrsCheckbox.vue';

export default {
  name: 'LoadoutSettings',
  components: {
    OsrsCheckbox,
    OsrsNumberInput,
  },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
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
            this.setSettings({
              uuid: this.loadoutUuid,
              settings: obj,
            });
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
        this.setSettings({
          uuid: this.loadoutUuid,
          settings: value,
        });
      },
    },
  },
  watch: {
    loadoutUuid() {
      this.computedSettings = this.getSettingsByUuid(this.loadoutUuid);
    },
  },
  beforeMount() {
    this.computedSettings = this.getSettingsByUuid(this.loadoutUuid);
  },
  methods: {
    ...mapActions({
      setSettings: 'settings/addOrUpdate',
    }),
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

.loadout-name {
  grid-column: 1 / span 4;
  padding-right: 20px;
}
</style>
