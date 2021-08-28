<template>
  <div class="monster-stats">
    <div class="monster-header">
      <span class="monster-name  osrs-text-quill-8">{{ targetName }}</span>
      <div class="monster-extra-info">
        <div>
          <img
            src="../../static/osrs/Combat icon.png"
            alt="Combat icon"
          >
          <span class="mx-2">{{ targetCombatLevel }}</span>
        </div>
        <div>
          <span class="mx-2">Size: {{ targetSize }}</span>
        </div>
      </div>
    </div>
    <div class="stats-table">
      <div class="stats-header osrs-text-quill-8">
        <img
          src="../../static/osrs/Combat icon.png"
          alt="Combat icon"
        >
        Combat stats
      </div>
      <div class="stat-tiles">
        <monster-stat-tile
          v-for="(value, stat) in combatStats"
          :key="stat"
          :stat="stat"
          :value="value"
        />
      </div>
      <div class="stats-header osrs-text-quill-8">
        <img
          src="../../static/osrs/Attack icon.png"
          alt="Attack icon"
        >
        Aggressive stats
      </div>
      <div class="stat-tiles">
        <monster-stat-tile
          v-for="(value, stat) in aggressiveStats"
          :key="stat"
          :stat="stat"
          :value="value"
          signed
        />
      </div>
      <div class="stats-header osrs-text-quill-8">
        <img
          src="../../static/osrs/Defence icon.png"
          alt="Defence icon"
        >
        Defensive stats
      </div>
      <div class="stat-tiles">
        <monster-stat-tile
          v-for="(value, stat) in defensiveStats"
          :key="stat"
          :stat="stat"
          :value="value"
          signed
        />
      </div>
    </div>
  </div>
</template>

<script>
import MonsterStatTile from './MonsterStatTile.vue';

export default {
  name: 'MonsterStats',
  components: { MonsterStatTile },
  props: {
    target: {
      type: Object,
      required: true,
    },
  },
  computed: {
    targetName() {
      return this.target ? this.target.name : 'Unknown';
    },
    targetCombatLevel() {
      return this.target ? this.target.combat_level : 0;
    },
    targetSize() {
      return this.target ? this.target.size : 0;
    },
    combatStats() {
      const baseStats = {
        hitpoints: 0,
        attack_level: 0,
        strength_level: 0,
        defence_level: 0,
        magic_level: 0,
        ranged_level: 0,
      };

      if (this.target) {
        baseStats.hitpoints = this.target.hitpoints;
        baseStats.attack_level = this.target.attack_level;
        baseStats.strength_level = this.target.strength_level;
        baseStats.defence_level = this.target.defence_level;
        baseStats.magic_level = this.target.magic_level;
        baseStats.ranged_level = this.target.ranged_level;
      }

      return baseStats;
    },
    aggressiveStats() {
      const baseStats = {
        attack_bonus: 0,
        strength_bonus: 0,
        attack_magic: 0,
        magic_bonus: 0,
        attack_ranged: 0,
        ranged_bonus: 0,
      };

      if (this.target) {
        baseStats.attack_bonus = this.target.attack_bonus;
        baseStats.strength_bonus = this.target.strength_bonus;
        baseStats.magic_bonus = this.target.magic_bonus;
        baseStats.attack_magic = this.target.attack_magic;
        baseStats.ranged_bonus = this.target.ranged_bonus;
        baseStats.attack_ranged = this.target.attack_ranged;
      }

      return baseStats;
    },
    defensiveStats() {
      const baseStats = {
        defence_stab: 0,
        defence_slash: 0,
        defence_crush: 0,
        defence_magic: 0,
        defence_ranged: 0,
      };

      if (this.target) {
        baseStats.defence_stab = this.target.defence_stab;
        baseStats.defence_slash = this.target.defence_slash;
        baseStats.defence_crush = this.target.defence_crush;
        baseStats.defence_magic = this.target.defence_magic;
        baseStats.defence_ranged = this.target.defence_ranged;
      }

      return baseStats;
    },
  },
};
</script>

<style scoped>
.monster-stats {
  display: flex;
  flex-direction: column;
}

.monster-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.monster-extra-info {
  display: flex;
}

.stats-header {
  background: var(--osrs-dark-brown);
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stats-header img {
  margin-right: 10px;
}

.stat-tiles {
  display: flex;
  justify-content: space-around;
}
</style>
