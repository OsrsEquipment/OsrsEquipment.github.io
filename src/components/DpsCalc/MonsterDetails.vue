<template>
  <div class="monster-details-container">
    <osrs-tabs
      v-if="computedMonsters.length > 1"
      v-model="monsterTab"
    >
      <osrs-tab
        v-for="(localMonster, index) of computedMonsters"
        :key="index"
      >
        {{ index === 0 ? 'Regular' : `Debuffed #${index}` }}
      </osrs-tab>
    </osrs-tabs>
    <osrs-tab-items
      v-model="monsterTab"
    >
      <osrs-tab-item
        v-for="(localMonster, index) of computedMonsters"
        :key="index"
      >
        <div class="monster-details-grid">
          <div class="monster-detail-header monster-detail-combat-stats-header">
            <img
              src="../../assets/osrs/Combat icon.png"
              alt="combat"
            >
            Combat stats (Lv. {{ localMonster.combat_level }})
          </div>
          <div class="monster-detail-stat monster-detail-hp">
            <img
              src="../../assets/osrs/Hitpoints icon.png"
              alt="hitpoints"
            >
            {{ localMonster.hitpoints }}
          </div>
          <div class="monster-detail-stat monster-detail-attack">
            <img
              src="../../assets/osrs/Attack icon.png"
              alt="attack"
            >
            {{ localMonster.attack_level }}
          </div>
          <div class="monster-detail-stat monster-detail-strength">
            <img
              src="../../assets/osrs/Strength icon.png"
              alt="strength"
            >
            {{ localMonster.strength_level }}
          </div>
          <div class="monster-detail-stat monster-detail-defence">
            <img
              src="../../assets/osrs/Defence icon.png"
              alt="defence"
            >
            {{ localMonster.defence_level }}
          </div>
          <div class="monster-detail-stat monster-detail-magic">
            <img
              src="../../assets/osrs/Magic icon.png"
              alt="magic"
            >
            {{ localMonster.magic_level }}
          </div>
          <div class="monster-detail-stat monster-detail-ranged">
            <img
              src="../../assets/osrs/Ranged icon.png"
              alt="ranged"
            >
            {{ localMonster.ranged_level }}
          </div>
          <div class="monster-detail-header monster-detail-aggressive-stats-header">
            <img
              src="../../assets/osrs/Attack icon.png"
              alt="attack"
            >
            Aggressive stats
          </div>
          <div class="monster-detail-stat monster-detail-aggressive-stat-attack">
            <img
              src="../../assets/osrs/Attack icon.png"
              alt="attack"
            >
            {{ localMonster.attack_bonus }}
          </div>
          <div class="monster-detail-stat monster-detail-aggressive-stat-strength">
            <img
              src="../../assets/osrs/Strength icon.png"
              alt="strength"
            >
            {{ localMonster.strength_bonus }}
          </div>
          <div class="monster-detail-stat monster-detail-aggressive-stat-magic">
            <img
              src="../../assets/osrs/Magic icon.png"
              alt="magic"
            >
            {{ localMonster.attack_magic }}
          </div>
          <div class="monster-detail-stat monster-detail-aggressive-stat-magic-damage">
            <img
              src="../../assets/osrs/Magic Damage icon.png"
              alt="magic damage"
            >
            {{ localMonster.magic_bonus }}
          </div>
          <div class="monster-detail-stat monster-detail-aggressive-stat-ranged">
            <img
              src="../../assets/osrs/Ranged icon.png"
              alt="ranged"
            >
            {{ localMonster.attack_ranged }}
          </div>
          <div class="monster-detail-stat monster-detail-aggressive-stat-ranged-strength">
            <img
              src="../../assets/osrs/Ranged Strength icon.png"
              alt="ranged strength"
            >
            {{ localMonster.ranged_bonus }}
          </div>
          <div class="monster-detail-header monster-detail-defensive-stats-header">
            <img
              src="../../assets/osrs/Defence icon.png"
              alt="defence"
            >
            Defensive stats
          </div>
          <div class="monster-detail-stat monster-detail-stab-defence">
            <img
              src="../../assets/osrs/White dagger.png"
              alt="white dagger"
            >
            {{ localMonster.defence_stab }}
          </div>
          <div class="monster-detail-stat monster-detail-slash-defence">
            <img
              src="../../assets/osrs/White scimitar.png"
              alt="white scimitar"
            >
            {{ localMonster.defence_slash }}
          </div>
          <div class="monster-detail-stat monster-detail-crush-defence">
            <img
              src="../../assets/osrs/White warhammer.png"
              alt="white warhammer"
            >
            {{ localMonster.defence_crush }}
          </div>
          <div class="monster-detail-stat monster-detail-magic-defence">
            <img
              src="../../assets/osrs/Magic icon.png"
              alt="magic"
            >
            {{ localMonster.defence_magic }}
          </div>
          <div class="monster-detail-stat monster-detail-ranged-defence">
            <img
              src="../../assets/osrs/Ranged icon.png"
              alt="ranged"
            >
            {{ localMonster.defence_ranged }}
          </div>
          <div class="monster-detail-header monster-detail-immunities-header">
            Immunities
          </div>
          <div class="monster-detail-stat monster-detail-immunity-poison">
            <img
              src="../../assets/osrs/Poison hitsplat.png"
              alt="poison"
            >
            {{ localMonster.immune_poison ? 'Immune to poison' : 'Not immune to poison' }}
          </div>
          <div class="monster-detail-stat monster-detail-immunity-venom">
            <img
              src="../../assets/osrs/Venom hitsplat.png"
              alt="venom"
            >
            {{ localMonster.immune_venom ? 'Immune to venom' : 'Not immune to venom' }}
          </div>
        </div>
      </osrs-tab-item>
    </osrs-tab-items>
  </div>
</template>

<script>
import OsrsTab from '../OsrsTabs/OsrsTab.vue';
import OsrsTabs from '../OsrsTabs/OsrsTabs.vue';
import OsrsTabItems from '../OsrsTabs/OsrsTabItems.vue';
import OsrsTabItem from '../OsrsTabs/OsrsTabItem.vue';

export default {
  name: 'MonsterDetails',
  components: {
    OsrsTab, OsrsTabs, OsrsTabItem, OsrsTabItems,
  },
  props: {
    monster: {
      type: Object,
      default: () => ({}),
    },
    debuffedMonsters: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      monsterTab: 0,
    };
  },
  computed: {
    computedMonsters() {
      const monsters = [];
      if (this.monster) {
        monsters.push(this.monster);
      }
      if (this.debuffedMonsters) {
        monsters.push(...this.debuffedMonsters);
      }
      return monsters.length > 0 ? monsters : [{}];
    },
  },
};
</script>

<style scoped>
.monster-details-container {
  position: relative;
  min-width: 360px;
  max-width: 360px;
  min-height: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.monster-details-grid {
  display: grid;
  grid-template-columns: 40px 40px 40px 40px 40px 40px;
  grid-template-rows: 1fr 60px 1fr 60px 1fr 60px 1fr 60px;
  grid-template-areas:
    "csheader csheader csheader csheader csheader csheader"
    "hp attack strength defence magic ranged"
    "asheader asheader asheader asheader asheader asheader"
    "asattack asstrength asmagic asmagicstrength asranged asrangedstrength"
    "dsheader dsheader dsheader dsheader dsheader dsheader"
    "stabdefence slashdefence crushdefence magicdefence rangeddefence ."
    "immunities immunities immunities immunities immunities immunities"
    "poison poison poison venom venom venom";
  place-items: center;
  font-size: 16px;
}

.monster-detail-header {
  display: flex;
  font-size: 24px;
}

.monster-detail-header .v-image {
  margin-right: 4px;
  max-height: 32px;
  max-width: 32px;
}

.monster-detail-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.monster-detail-stat .v-image {
}

.monster-detail-combat-stats-header {
  grid-area: csheader;
}

.monster-detail-hp {
  grid-area: hp;
}

.monster-detail-attack {
  grid-area: attack;
}

.monster-detail-strength {
  grid-area: strength;
}

.monster-detail-defence {
  grid-area: defence;
}

.monster-detail-magic {
  grid-area: magic;
}

.monster-detail-ranged {
  grid-area: ranged;
}

.monster-detail-aggressive-stats-header {
  grid-area: asheader;
}

.monster-detail-aggressive-stat-attack {
  grid-area: asattack;
}

.monster-detail-aggressive-stat-strength {
  grid-area: asstrength;
}

.monster-detail-aggressive-stat-magic {
  grid-area: asmagic;
}

.monster-detail-aggressive-stat-magic-damage {
  grid-area: asmagicstrength;
}

.monster-detail-aggressive-stat-ranged {
  grid-area: asranged;
}

.monster-detail-aggressive-stat-ranged-strength {
  grid-area: asrangedstrength;
}

.monster-detail-defensive-stats-header {
  grid-area: dsheader;
}

.monster-detail-stab-defence {
  grid-area: stabdefence;
}

.monster-detail-slash-defence {
  grid-area: slashdefence;
}

.monster-detail-crush-defence {
  grid-area: crushdefence;
}

.monster-detail-magic-defence {
  grid-area: magicdefence;
}

.monster-detail-ranged-defence {
  grid-area: rangeddefence;
}

.monster-detail-immunities-header {
  grid-area: immunities;
}

.monster-detail-immunity-poison {
  grid-area: poison;
}

.monster-detail-immunity-venom {
  grid-area: venom;
}
</style>
