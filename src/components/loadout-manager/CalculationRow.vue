<template>
  <v-sheet
    class="calculation-row osrs-text-plain-11"
    :class="{ 'selected-calculation': selected }"
  >
    <div class="calculation-column dps-type-column">
      <div>
        <img
          :class="calculation.dpsType"
        />
      </div>
    </div>
    <div class="calculation-column name-column">
      <div class="calculation-column-title osrs-text-quill-8">
        Loadout name
      </div>
      <div class="calculation-column-content">
        {{ calculation.loadout.name }}
      </div>
    </div>
    <div class="calculation-column combat-type-column">
      <div class="calculation-column-title osrs-text-quill-8">
        Combat
      </div>
      <div class="calculation-column-content">
        <template v-if="spellIcon">
          <img
            :src="`data:image/png;base64,${spellIcon}`"
            class="spell-icon"
          />
        </template>
        <template v-else>
          <span>{{ combatType }}</span>
        </template>
      </div>
    </div>
    <div class="calculation-column max-hit-column">
      <div class="calculation-column-title osrs-text-quill-8">
        Max hit
      </div>
      <div class="calculation-column-content">
        <span>{{ calculation.maxHit }}</span>
      </div>
    </div>
    <div class="calculation-column accuracy-column">
      <div class="calculation-column-title osrs-text-quill-8">
        Accuracy
      </div>
      <div class="calculation-column-content">
        <span>{{ calculation.hitChance | percentage }}</span>
      </div>
    </div>
    <div class="calculation-column dps-column">
      <div class="calculation-column-title osrs-text-quill-8">
        DPS
      </div>
      <div class="calculation-column-content">
        <span>{{ calculation.dps | toFixed(4) }}</span>
      </div>
    </div>
    <div class="calculation-column actions-column">
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <v-btn
            icon
            v-on="on"
            @click.stop="copyLoadout"
          >
            <v-icon small>
              mdi-content-copy
            </v-icon>
          </v-btn>
        </template>
        <span>Copy</span>
      </v-tooltip>
      <v-tooltip
        bottom
        content-class="osrs-tooltip"
      >
        <template #activator="{ on }">
          <v-btn
            icon
            v-on="on"
            @click.stop="deleteLoadout"
          >
            <v-icon small>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </div>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CalculationRow',
  filters: {
    percentage(value) {
      if (!value) return undefined;
      return `${(Number(value) * 100).toFixed(2)}%`;
    },
    toFixed(value, number) {
      if (!value) return undefined;
      return Number(value)
        .toFixed(number);
    },
  },
  props: {
    calculation: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    combatType() {
      if (this.calculation.dpsType === 'melee') {
        return `${this.calculation.loadout.stance.attack_style} ${this.calculation.loadout.stance.attack_type}`;
      }
      if (this.calculation.dpsType === 'ranged') {
        return this.calculation.loadout.stance.combat_style;
      }
      if (this.calculation.dpsType === 'magic') {
        if (this.calculation.isPowered()) {
          return this.calculation.loadout.stance.combat_style;
        }
      }
      return 'Unknown';
    },
    spellIcon() {
      if (this.calculation.dpsType === 'magic' && !this.calculation.isPowered() && this.calculation.loadout.spell) {
        return this.calculation.loadout.spell.icon;
      }
      return undefined;
    },
  },
  methods: {
    ...mapActions({
      delete: 'loadouts/delete',
      copy: 'loadouts/copy',
    }),
    copyLoadout() {
      this.copy(this.calculation.loadout.uuid);
    },
    deleteLoadout() {
      this.delete(this.calculation.loadout.uuid);
    },
  },
};
</script>

<style scoped>
.calculation-row {
  position: relative;
  display: grid;
  grid-template-columns: 40px 1fr 175px 75px 75px 75px 75px;
  height: 60px;
  padding: 5px;
  border-radius: 4px;
  transition: background 200ms;
  cursor: pointer;
}

.calculation-row.selected-calculation {
  background: var(--v-secondary-base);
}

.calculation-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: 0 5px;
  overflow: hidden;
}

.calculation-column.actions-column {
  flex-direction: row;
  align-items: center;
}

.calculation-column-title {
  line-height: 1em;
  font-size: 16px;
  opacity: 0.66;
  text-align: center;
  white-space: nowrap;
  color: inherit;
}

.calculation-column-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.calculation-column.dps-type-column > div{
  display: flex;
}

.name-column {
  flex: 1;
}

.name-column .calculation-column-title {
  text-align: left;
}

.name-column .calculation-column-content {
  align-self: flex-start;
}

.combat-type-column {
  min-width: 175px;
  text-transform: capitalize;
}

.combat-type-column .spell-icon {
  max-width: 24px;
  max-height: 24px;
}

.melee {
  content: url('../../static/osrs/Attack icon.png')
}

.ranged {
  content: url('../../static/osrs/Ranged icon.png')
}

.magic {
  content: url('../../static/osrs/Magic icon.png')
}

@media (max-width: 1200px) {
  .calculation-row {
    flex: 1;
    min-width: 300px;
    grid-template-columns: 40px 1fr 75px 40px;
    grid-template-rows: 50px 50px 50px;
    height: auto;
  }

  .calculation-column {
    align-items: flex-start;
  }

  .calculation-column.name-column {
    grid-column: 2 / span 2;
  }

  .calculation-column.dps-type-column {
    grid-row: 1 / -1;
  }

  .calculation-column.actions-column {
    grid-row: 1 / -1;
    grid-column: 4;
    flex-direction: column;
  }
}
</style>
<!-- 40px 1fr 175px 75px 75px 75px 75px -->
