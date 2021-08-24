<template>
  <div
    class="calculation-row osrs-text-plain-11"
    :class="{ 'selected-calculation': selected }"
  >
    <div class="calculation-column dps-type-column">
      <v-img
        :class="calculation.dpsType"
      />
    </div>
    <div class="calculation-column name-column">
      <span>{{ calculation.loadout.name }}</span>
    </div>
    <div class="calculation-column align-center combat-type-column">
      <template v-if="spellIcon">
        <v-img
          :src="`data:image/png;base64,${spellIcon}`"
          class="spell-icon"
          contain
        />
      </template>
      <template v-else>
        <span>{{ combatType }}</span>
      </template>
    </div>
    <div class="calculation-column align-center">
      <span>{{ calculation.maxHit }}</span>
    </div>
    <div class="calculation-column align-center accuracy-column">
      <span>{{ calculation.hitChance | percentage }}</span>
    </div>
    <div class="calculation-column align-center dps-column">
      <span>{{ calculation.dps | toFixed(4) }}</span>
    </div>
    <div class="calculation-column actions-column">
      <v-btn
        icon
        @click.stop="copyLoadout"
      >
        <v-icon
          small
          color="var(--osrs-orange)"
        >
          mdi-content-copy
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="deleteLoadout"
      >
        <v-icon
          small
          color="var(--osrs-orange)"
        >
          mdi-delete
        </v-icon>
      </v-btn>
    </div>
  </div>
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
        return this.calculation.loadout.stance.attack_type;
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
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;
  background: var(--osrs-dark-brown);
  padding: 5px;
  border-radius: 4px;
  transition: background 200ms;
}

.calculation-row.selected-calculation {
  background: var(--osrs-light-brown);
}

.calculation-column {
  min-width: 50px;
}

.calculation-column.dps-type-column {
  min-width: 0;
  margin-left: 5px;
}

.calculation-column.align-center {
  text-align: center;
}

.calculation-column.align-right {
  text-align: right;
}

.calculation-column.align-left {
  text-align: left;
}

.name-column {
  flex: 1;
}

.combat-type-column {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: capitalize;
}

.combat-type-column .spell-icon {
  max-width: 24px;
  max-height: 24px;
}

.accuracy-column,
.dps-column {
  min-width: 75px
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
</style>
