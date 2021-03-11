<template>
  <div>
    <template v-if="!selectingSpell">
      <div class="stance-selection-container">
        <span class="osrs-text-quill-8 stance-selection-header">
          {{ weapon.name }}
        </span>
        <div
          class="stance-selection-stances"
        >
          <osrs-tooltip
            v-for="(stance, index) in stances"
            :key="index"
            font-size="24px"
          >
            <template #activator="{ on }">
              <osrs-flat-button
                :active="isSelectedStance(stance)"
                class="stance-selection-stance osrs-text"
                @click="stanceSelected(stance)"
                v-on="on"
              >
                {{ capitalize(stance.combat_style) }}
              </osrs-flat-button>
            </template>
            <span>
              <span v-if="stance.attack_style">
                ({{ capitalize(stance.attack_style) }}) <br>
              </span>
              <span v-if="!stance.attack_style && stance.combat_style">
                ({{ capitalize(stance.combat_style) }}) <br>
              </span>
              <span v-if="stance.attack_type">
                ({{ capitalize(stance.attack_type) }}) <br>
              </span>
              <template v-if="stance.experience">
                <span
                  v-for="experience in parseExperience(stance.experience)"
                  :key="experience"
                >
                  ({{ capitalize(experience) }} XP) <br>
                </span>
              </template>
            </span>
          </osrs-tooltip>
        </div>
        <span class="osrs-text-quill-8 stance-selection-footer">
          Category: {{ category }}
        </span>
        <div
          v-if="selectedSpell"
          class="stance-selection-spell"
        >
          <span class="osrs-text-quill-8">
            Selected spell
          </span>
          <span>
            {{ selectedSpell.name }}
          </span>
          <img
            :src="`data:image/png;base64,${selectedSpell.icon}`"
            :alt="selectedSpell.name"
          >
        </div>
      </div>
    </template>
    <template v-if="selectingSpell">
      <spell-selection
        @spell-selected="spellSelected"
      />
    </template>
  </div>
</template>

<script>
import { capitalize } from 'lodash';
import OsrsFlatButton from '../OsrsFlatButton.vue';
import OsrsTooltip from '../OsrsTooltip.vue';
import SpellSelection from './SpellSelection.vue';

export default {
  name: 'StanceSelection',
  components: { SpellSelection, OsrsTooltip, OsrsFlatButton },
  props: {
    equippedWeapon: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      selectedStance: undefined,
      selectingSpell: false,
      selectedSpell: undefined,
    };
  },
  computed: {
    weapon() {
      let weapon = this.equippedWeapon;
      if (!weapon) {
        weapon = {
          name: 'Unarmed',
          weapon: {
            attack_speed: 4,
            stances: [
              {
                attack_style: 'accurate',
                attack_type: 'crush',
                combat_style: 'punch',
                experience: 'attack',
              },
              {
                attack_style: 'aggressive',
                attack_type: 'crush',
                combat_style: 'kick',
                experience: 'strength',
              },
              {
                attack_style: 'defensive',
                attack_type: 'crush',
                combat_style: 'block',
                experience: 'defence',
              },
            ],
            weapon_type: 'unarmed',
          },
        };
      }
      return weapon;
    },
    stances() {
      return this.weapon.weapon.stances.filter((i) => i.combat_style.indexOf('(defensive)') === -1);
    },
    category() {
      let category = this.weapon.weapon.weapon_type;
      category = category.replace('_', ' ');
      return capitalize(category);
    },
  },
  watch: {
    weapon: {
      immediate: true,
      handler: function weaponChanged() {
        if (this.selectedStance) {
          const currentStance = this.selectedStance;
          const foundSimilarStance = this.stances
            .find((stance) => stance.attack_style === currentStance.attack_style
              || stance.combat_style === currentStance.combat_style);
          if (foundSimilarStance) {
            this.stanceSelected(foundSimilarStance);
            return;
          }
        }
        this.stanceSelected(this.stances[0]);
      },
    },
  },
  methods: {
    capitalize,
    stanceSelected(stance) {
      this.selectedStance = stance;
      this.$emit('stance-changed', stance);
      if (stance.combat_style === 'spell') {
        this.selectingSpell = true;
      } else if (this.selectedSpell !== undefined) {
        this.spellSelected(undefined);
      }
    },
    parseExperience(experience) {
      return experience.split(' and ');
    },
    spellSelected(spell) {
      this.selectingSpell = false;
      this.selectedSpell = spell;
      this.$emit('spell-selected', spell);
    },
    isSelectedStance(stance) {
      return this.selectedStance === stance;
    },
  },
};
</script>

<style scoped>
.stance-selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stance-selection-stances {
  width: calc(128px * 2 + 10px);
  margin: 20px 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 48px;
  gap: 4px;
  place-items: center;
}

.stance-selection-stance {
  width: 96px;
}

.stance-selection-header {
  font-size: 24px;
}

.stance-selection-footer {
  font-size: 24px;
}

.stance-selection-spell {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  margin-top: 20px;
}
</style>
