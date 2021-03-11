<template>
  <div class="player-prayer-grid">
    <osrs-tooltip
      v-for="prayer in prayers"
      :key="prayer.id"
      font-size="24px"
    >
      <template #activator="{ on }">
        <div
          :class="{'active-prayer': isPrayerActive(prayer)}"
          class="player-prayer-icon-container"
          @click="prayerToggle(prayer)"
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
  data() {
    return {
      prayers: [],
      activePrayers: [],
      defencePrayers: ['Thick Skin', 'Rock Skin', 'Steel Skin', 'Chivalry', 'Piety', 'Rigour', 'Augury'],
      attackPrayers: ['Clarity of Thought', 'Improved Reflexes', 'Incredible Reflexes', 'Chivalry', 'Piety'],
      strengthPrayers: ['Burst of Strength', 'Superhuman Strength', 'Ultimate Strength', 'Chivalry', 'Piety'],
      rangedPrayers: ['Sharp Eye', 'Hawk Eye', 'Eagle Eye', 'Rigour'],
      magicPrayers: ['Mystic Will', 'Mystic Lore', 'Mystic Might', 'Augury'],
      overheadPrayers: ['Protect from Magic', 'Protect from Missiles', 'Protect from Melee', 'Retribution', 'Redemption', 'Smite'],
    };
  },
  computed: {
    activePrayerNames() {
      return this.activePrayers.map((prayer) => prayer.name);
    },
  },
  created() {
    this.getPrayers();
  },
  methods: {
    async getPrayers() {
      this.prayers = await PrayersManager.getAll();
    },
    prayerToggle(prayer) {
      if (this.isPrayerActive(prayer)) {
        this.activePrayers = this.activePrayers.filter((i) => i.id !== prayer.id);
      } else {
        this.conflictingPrayers(prayer);
        this.activePrayers.push(prayer);
      }
      this.$emit('active-prayers', this.activePrayerNames);
    },
    isPrayerActive(prayer) {
      return this.activePrayers.some((i) => i.id === prayer.id);
    },
    prayerRequirement(prayer) {
      return prayer.requirements.prayer;
    },
    conflictingPrayers(prayer) {
      if (this.isDefencePrayer(prayer)) {
        this.activePrayers = this.activePrayers.filter((i) => !this.isDefencePrayer(i));
      }
      if (this.isAttackPrayer(prayer)) {
        this.activePrayers = this.activePrayers.filter((i) => !this.isAttackPrayer(i)
          && !this.isRangedPrayer(i)
          && !this.isMagicPrayer(i));
      }
      if (this.isStrengthPrayer(prayer)) {
        this.activePrayers = this.activePrayers.filter((i) => !this.isStrengthPrayer(i)
          && !this.isRangedPrayer(i)
          && !this.isMagicPrayer(i));
      }
      if (this.isRangedPrayer(prayer)) {
        this.activePrayers = this.activePrayers.filter((i) => !this.isRangedPrayer(i)
          && !this.isStrengthPrayer(i)
          && !this.isAttackPrayer(i)
          && !this.isMagicPrayer(i));
      }
      if (this.isMagicPrayer(prayer)) {
        this.activePrayers = this.activePrayers.filter((i) => !this.isMagicPrayer(i)
          && !this.isStrengthPrayer(i)
          && !this.isAttackPrayer(i)
          && !this.isRangedPrayer(i));
      }
      if (this.isOverheadPrayer(prayer)) {
        this.activePrayers = this.activePrayers.filter((i) => !this.isOverheadPrayer(i));
      }
    },
    isDefencePrayer(prayer) {
      return this.defencePrayers.some((name) => prayer.name.toLowerCase() === name.toLowerCase());
    },
    isAttackPrayer(prayer) {
      return this.attackPrayers.some((name) => prayer.name.toLowerCase() === name.toLowerCase());
    },
    isStrengthPrayer(prayer) {
      return this.strengthPrayers.some((name) => prayer.name.toLowerCase() === name.toLowerCase());
    },
    isRangedPrayer(prayer) {
      return this.rangedPrayers.some((name) => prayer.name.toLowerCase() === name.toLowerCase());
    },
    isMagicPrayer(prayer) {
      return this.magicPrayers.some((name) => prayer.name.toLowerCase() === name.toLowerCase());
    },
    isOverheadPrayer(prayer) {
      return this.overheadPrayers.some((name) => prayer.name.toLowerCase() === name.toLowerCase());
    },
  },
};
</script>

<style scoped>
.player-prayer-grid {
  margin: 5px 0;
  display: grid;
  grid-template-columns: 48px 48px 48px 48px 48px;
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
