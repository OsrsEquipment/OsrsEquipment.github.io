<template>
  <div class="player-prayer-grid">
    <osrs-tooltip
      v-for="prayer in prayerObjs"
      :key="prayer.id"
      font-size="24px"
    >
      <template #activator="{ on }">
        <div
          :class="{'active-prayer': isPrayerActive(prayer.name)}"
          class="player-prayer-icon-container"
          @click="prayerToggle(prayer.name)"
          v-on="on"
        >
          <img
            :src="`data:image/png;base64,${prayer.icon}`"
            :alt="prayer.name"
          >
        </div>
      </template>
      <div>
        Level {{ prayerRequirement(prayer) }} <br>
        {{ prayer.name }}
      </div>
    </osrs-tooltip>
  </div>
</template>

<script>
import PrayersManager from '../../services/managers/prayers.manager';
import OsrsTooltip from '../OsrsTooltip.vue';

export default {
  name: 'PlayerPrayer',
  components: { OsrsTooltip },
  model: {
    prop: 'prayers',
    event: 'change',
  },
  props: {
    prayers: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      prayerObjs: [],
      lazyPrayers: [],
      defencePrayers: ['Thick Skin', 'Rock Skin', 'Steel Skin', 'Chivalry', 'Piety', 'Rigour', 'Augury'],
      attackPrayers: ['Clarity of Thought', 'Improved Reflexes', 'Incredible Reflexes', 'Chivalry', 'Piety'],
      strengthPrayers: ['Burst of Strength', 'Superhuman Strength', 'Ultimate Strength', 'Chivalry', 'Piety'],
      rangedPrayers: ['Sharp Eye', 'Hawk Eye', 'Eagle Eye', 'Rigour'],
      magicPrayers: ['Mystic Will', 'Mystic Lore', 'Mystic Might', 'Augury'],
      overheadPrayers: ['Protect from Magic', 'Protect from Missiles', 'Protect from Melee', 'Retribution', 'Redemption', 'Smite'],
    };
  },
  computed: {
    internalPrayers: {
      get() {
        return this.lazyPrayers;
      },
      set(value) {
        this.lazyPrayers = value;
        this.$emit('change', value);
      },
    },
  },
  watch: {
    prayers: {
      immediate: true,
      handler(value) {
        this.lazyPrayers = value;
      },
    },
  },
  created() {
    this.getPrayers();
  },
  methods: {
    async getPrayers() {
      this.prayerObjs = await PrayersManager.getAll();
    },
    prayerToggle(prayerName) {
      let prayers = this.internalPrayers || [];
      if (this.isPrayerActive(prayerName)) {
        prayers = this.internalPrayers
          .filter((name) => name.toLowerCase() !== prayerName.toLowerCase());
      } else {
        prayers = this.checkConflictingPrayers(prayers, prayerName);
        prayers.push(prayerName);
      }
      this.internalPrayers = prayers;
    },
    isPrayerActive(prayerName) {
      return this.internalPrayers
          && this.internalPrayers.some((name) => name.toLowerCase() === prayerName.toLowerCase());
    },
    prayerRequirement(prayer) {
      return prayer.requirements.prayer;
    },
    checkConflictingPrayers(prayers, prayer) {
      if (this.isDefencePrayer(prayer)) {
        prayers = prayers.filter((i) => !this.isDefencePrayer(i));
      }
      if (this.isAttackPrayer(prayer)) {
        prayers = prayers.filter((i) => !this.isAttackPrayer(i)
          && !this.isRangedPrayer(i)
          && !this.isMagicPrayer(i));
      }
      if (this.isStrengthPrayer(prayer)) {
        prayers = prayers.filter((i) => !this.isStrengthPrayer(i)
          && !this.isRangedPrayer(i)
          && !this.isMagicPrayer(i));
      }
      if (this.isRangedPrayer(prayer)) {
        prayers = prayers.filter((i) => !this.isRangedPrayer(i)
          && !this.isStrengthPrayer(i)
          && !this.isAttackPrayer(i)
          && !this.isMagicPrayer(i));
      }
      if (this.isMagicPrayer(prayer)) {
        prayers = prayers.filter((i) => !this.isMagicPrayer(i)
          && !this.isStrengthPrayer(i)
          && !this.isAttackPrayer(i)
          && !this.isRangedPrayer(i));
      }
      if (this.isOverheadPrayer(prayer)) {
        prayers = prayers.filter((i) => !this.isOverheadPrayer(i));
      }
      return prayers;
    },
    isDefencePrayer(prayer) {
      return this.defencePrayers.some((name) => prayer.toLowerCase() === name.toLowerCase());
    },
    isAttackPrayer(prayer) {
      return this.attackPrayers.some((name) => prayer.toLowerCase() === name.toLowerCase());
    },
    isStrengthPrayer(prayer) {
      return this.strengthPrayers.some((name) => prayer.toLowerCase() === name.toLowerCase());
    },
    isRangedPrayer(prayer) {
      return this.rangedPrayers.some((name) => prayer.toLowerCase() === name.toLowerCase());
    },
    isMagicPrayer(prayer) {
      return this.magicPrayers.some((name) => prayer.toLowerCase() === name.toLowerCase());
    },
    isOverheadPrayer(prayer) {
      return this.overheadPrayers.some((name) => prayer.toLowerCase() === name.toLowerCase());
    },
  },
};
</script>

<style scoped>
.player-prayer-grid {
  margin: 5px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: 48px;
  grid-template-areas:
    "thickskin burstofstrength clarityofthought sharpeye mysticwill"
    "rockskin superhumanstrength improvedreflexes rapidrestore rapidheal"
    "protectitem hawkeye mysticlore steelskin ultimatestrength"
    "incrediblereflexes protectfrommagic protectfrommissiles protectfrommelee eagleeye"
    "mysticmight retribution redemption smite preserve"
    "chivalry piety rigour augury .";
  grid-gap: 10px;
  place-items: center;
}

.player-prayer-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background: transparent;
  padding: 2px;
  min-width: 40px;
  min-height: 40px;
  cursor: pointer;
}

.player-prayer-icon-container.active-prayer {
  background: #b7a36d;
}
</style>
