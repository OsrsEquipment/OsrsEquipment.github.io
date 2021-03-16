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
          v-if="internalSpell"
          class="stance-selection-spell"
        >
          <span class="osrs-text-quill-8">
            Selected spell
          </span>
          <span>
            {{ internalSpell.name }}
          </span>
          <img
            :src="`data:image/png;base64,${internalSpell.icon}`"
            :alt="internalSpell.name"
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
import { capitalize, isEqual } from 'lodash';
import OsrsFlatButton from '../OsrsFlatButton.vue';
import OsrsTooltip from '../OsrsTooltip.vue';
import SpellSelection from './SpellSelection.vue';

export default {
  name: 'StanceSelection',
  components: { SpellSelection, OsrsTooltip, OsrsFlatButton },
  model: {
    prop: 'stance',
    event: 'change',
  },
  props: {
    equippedWeapon: {
      type: Object,
      default: undefined,
    },
    stance: {
      type: Object,
      default: undefined,
    },
    spell: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      lazyStance: undefined,
      lazySpell: undefined,
      selectingSpell: false,
    };
  },
  computed: {
    internalStance: {
      get() {
        return this.lazyStance;
      },
      set(value) {
        this.lazyStance = value;
        this.$emit('change', value);
      },
    },
    internalSpell: {
      get() {
        return this.lazySpell;
      },
      set(value) {
        this.lazySpell = value;
        this.$emit('update:spell', value);
      },
    },
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
    stance: {
      immediate: true,
      handler(value) {
        this.lazyStance = value ?? this.stances[0];
      },
    },
    spell: {
      immediate: true,
      handler(value) {
        this.lazySpell = value;
      },
    },
    // attempt to select same stance if available
    weapon: {
      immediate: true,
      handler: function weaponChanged() {
        if (this.internalStance) {
          const currentStance = this.internalStance;
          const foundSameStance = this.stances
            .find((stance) => isEqual(currentStance, stance));
          if (foundSameStance) {
            this.lazyStance = foundSameStance;
            return;
          }
        }
        [this.lazyStance] = this.stances;
        this.lazyStance = undefined;
      },
    },
  },
  methods: {
    capitalize,
    stanceSelected(stance) {
      this.internalStance = stance;
      if (stance.combat_style === 'spell') {
        this.selectingSpell = true;
      }
      if (this.internalSpell) {
        this.internalSpell = undefined;
      }
    },
    parseExperience(experience) {
      return experience.split(' and ');
    },
    spellSelected(spell) {
      this.selectingSpell = false;
      this.internalSpell = spell;
    },
    isSelectedStance(stance) {
      return isEqual(this.internalStance, stance);
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
