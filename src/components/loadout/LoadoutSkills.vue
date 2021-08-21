<template>
  <div class="player-skills-container">
    <osrs-text-input
      v-model="playerName"
      @enter-pressed="fetchPlayer(playerName)"
    >
      <template #prepend>
        <img
          src="../../static/osrs/HiScores icon.png"
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
        v-for="(skill, name) in internalSkills"
        :key="name"
        class="player-skills-tile"
        :skill="name"
        :skill-name="name"
        :level="skill"
        @update:level="updateLevel(name, $event)"
      />
      <osrs-total-level-tile
        class="player-skills-tile total-level"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DataFetcher from '../../services/data-fetcher';
import OsrsSkillTile from './OsrsSkillTile.vue';
import OsrsTextInput from '../OsrsTextInput.vue';
import OsrsFlatButton from '../OsrsFlatButton.vue';
import OsrsTotalLevelTile from './OsrsTotalLevelTile.vue';

export default {
  name: 'LoadoutSkills',
  components: {
    OsrsTotalLevelTile,
    OsrsFlatButton,
    OsrsTextInput,
    OsrsSkillTile,
  },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      nameRegex: /^[A-Za-z0-9-_ ]{1,12}$/,
      playerName: undefined,
      hiScores: undefined,
      lazySkills: undefined,
    };
  },
  computed: {
    ...mapGetters({
      getSkillsByUuid: 'skills/getSkillsByUuid',
    }),
    total() {
      return Object.values(this.internalSkills).reduce((acc, val) => acc + val, 0);
    },
    internalSkills: {
      get() {
        return this.lazySkills;
      },
      set(value) {
        this.lazySkills = value;
        this.setSkills({ uuid: this.loadoutUuid, skills: value });
      },
    },
  },
  beforeMount() {
    this.lazySkills = this.getSkillsByUuid(this.loadoutUuid);
  },
  methods: {
    ...mapActions({
      setSkills: 'skills/addOrUpdate',
    }),
    async fetchPlayer(name) {
      try {
        if (name && this.nameRegex.test(name)) {
          const { data: hiScores } = await DataFetcher.fetchPlayerHiScores(name);
          if (hiScores) {
            this.hiScores = hiScores;
            this.updateSkills(hiScores);
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
    updateSkills(hiScores) {
      if (hiScores) {
        const { skills } = hiScores;
        const result = {};
        const keys = Object.keys(skills);
        keys.forEach((key) => {
          if (key === 'overall') return;
          result[key] = Number(skills[key].level);
        });
        this.internalSkills = result;
      }
    },
    updateLevel(skill, level) {
      this.internalSkills = {
        ...this.internalSkills,
        [skill]: level,
      };
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
}

.player-skills-grid {
  margin: 5px 0;
  display: grid;
  grid-template-columns: 64px 64px 64px;
  grid-auto-rows: 32px;
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
