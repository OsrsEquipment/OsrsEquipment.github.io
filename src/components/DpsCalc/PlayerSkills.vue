<template>
  <div class="player-skills-container">
    <osrs-text-input
      v-model="playerName"
      @enter-pressed="fetchPlayer(playerName)"
    >
      <template #prepend>
        <img
          src="../../assets/osrs/HiScores icon.png"
          alt="Hi scores"
        >
      </template>
      <template #append>
        <osrs-flat-button @click="fetchPlayer(playerName)">
          Lookup
        </osrs-flat-button>
      </template>
    </osrs-text-input>
    <div class="player-skills-grid">
      <osrs-skill-tile
        v-for="(skill, index) in skills"
        :key="index"
        class="player-skills-tile"
        :skill="index"
        :level="skill"
        :skill-name="index"
        @update:level="updateLevel(index, $event)"
      />
      <osrs-total-level-tile
        class="player-skills-tile total-level"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import DataFetcher from '../../services/data-fetcher';
import OsrsSkillTile from './OsrsSkillTile.vue';
import OsrsTextInput from '../OsrsTextInput.vue';
import OsrsFlatButton from '../OsrsFlatButton.vue';
import OsrsTotalLevelTile from './OsrsTotalLevelTile.vue';

export default {
  name: 'PlayerSkills',
  components: {
    OsrsTotalLevelTile,
    OsrsFlatButton,
    OsrsTextInput,
    OsrsSkillTile,
  },
  data() {
    return {
      nameRegex: /^[A-Za-z0-9-_ ]{1,12}$/,
      playerName: undefined,
      defaultSkills: {
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
      skills: undefined,
      hiScores: undefined,
    };
  },
  computed: {
    total() {
      return Object.values(this.skills).reduce((acc, val) => acc + val, 0);
    },
  },
  created() {
    this.setSkills();
  },
  methods: {
    async fetchPlayer(name) {
      try {
        if (name && this.nameRegex.test(name)) {
          const { data: hiScores } = await DataFetcher.fetchPlayerHiScores(name);
          if (hiScores) {
            this.hiScores = hiScores;
            this.setSkills(hiScores);
          } else {
            console.error(`No HiScores found for ${name}`);
          }
        } else {
          console.error('Name does not pass test');
        }
      } catch (err) {
        console.error(err);
      }
    },
    setSkills(hiScores) {
      if (hiScores) {
        const { skills } = hiScores;
        const result = {};
        const keys = Object.keys(skills);
        keys.forEach((key) => {
          if (key === 'overall') return;
          result[key] = Number(skills[key].level);
        });
        this.skills = result;
      } else {
        this.skills = this.defaultSkills;
      }
      this.$emit('skills-changed', this.skills);
    },
    updateLevel(skill, level) {
      this.skills = {
        ...this.skills,
        [skill]: level,
      };
      this.$emit('skills-changed', this.skills);
    },
  },
};
</script>

<style scoped>
.player-skills-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.player-skills-grid {
  margin: 5px 0;
  display: grid;
  grid-template-columns: 96px 96px 96px;
  grid-auto-rows: 48px;
  grid-template-areas:
    "attack hitpoints mining"
    "strength agility smithing"
    "defence herblore fishing"
    "ranged thieving cooking"
    "prayer crafting firemaking"
    "magic fletching woodcutting"
    "runecraft slayer farming"
    "construction hunter totallevel";
  grid-gap: 2px;
}

.player-skills-tile {
}

.player-skills-tile[skill-name="attack"] {
  grid-area: attack;
}

.player-skills-tile[skill-name="strength"] {
  grid-area: strength;
}

.player-skills-tile[skill-name="defence"] {
  grid-area: defence;
}

.player-skills-tile[skill-name="ranged"] {
  grid-area: ranged;
}

.player-skills-tile[skill-name="prayer"] {
  grid-area: prayer;
}

.player-skills-tile[skill-name="magic"] {
  grid-area: magic;
}

.player-skills-tile[skill-name="runecraft"] {
  grid-area: runecraft;
}

.player-skills-tile[skill-name="construction"] {
  grid-area: construction;
}

.player-skills-tile[skill-name="hitpoints"] {
  grid-area: hitpoints;
}

.player-skills-tile[skill-name="agility"] {
  grid-area: agility;
}

.player-skills-tile[skill-name="herblore"] {
  grid-area: herblore;
}

.player-skills-tile[skill-name="thieving"] {
  grid-area: thieving;
}

.player-skills-tile[skill-name="crafting"] {
  grid-area: crafting;
}

.player-skills-tile[skill-name="fletching"] {
  grid-area: fletching;
}

.player-skills-tile[skill-name="slayer"] {
  grid-area: slayer;
}

.player-skills-tile[skill-name="hunter"] {
  grid-area: hunter;
}

.player-skills-tile[skill-name="mining"] {
  grid-area: mining;
}

.player-skills-tile[skill-name="smithing"] {
  grid-area: smithing;
}

.player-skills-tile[skill-name="fishing"] {
  grid-area: fishing;
}

.player-skills-tile[skill-name="cooking"] {
  grid-area: cooking;
}

.player-skills-tile[skill-name="firemaking"] {
  grid-area: firemaking;
}

.player-skills-tile[skill-name="woodcutting"] {
  grid-area: woodcutting;
}

.player-skills-tile[skill-name="farming"] {
  grid-area: farming;
}

.player-skills-tile.total-level {
  grid-area: totallevel;
}
</style>
