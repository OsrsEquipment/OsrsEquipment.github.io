<template>
  <div class="equipment-stats-container osrs-text-plain-12">
    <span class="equipment-stats-list-header osrs-text-bold-12">Attack bonus</span>
    <ul class="equipment-stats-list">
      <li class="equipment-stats-list-item">
        Stab: {{ parseBonus(computedBonuses.attack_stab) }}
      </li>
      <li class="equipment-stats-list-item">
        Slash: {{ parseBonus(computedBonuses.attack_slash) }}
      </li>
      <li class="equipment-stats-list-item">
        Crush: {{ parseBonus(computedBonuses.attack_crush) }}
      </li>
      <li class="equipment-stats-list-item">
        Magic: {{ parseBonus(computedBonuses.attack_magic) }}
      </li>
      <li class="equipment-stats-list-item">
        Range: {{ parseBonus(computedBonuses.attack_ranged) }}
      </li>
    </ul>
    <span class="equipment-stats-list-header osrs-text-bold-12">Defence bonus</span>
    <ul class="equipment-stats-list">
      <li class="equipment-stats-list-item">
        Stab: {{ parseBonus(computedBonuses.defence_stab) }}
      </li>
      <li class="equipment-stats-list-item">
        Slash: {{ parseBonus(computedBonuses.defence_slash) }}
      </li>
      <li class="equipment-stats-list-item">
        Crush: {{ parseBonus(computedBonuses.defence_crush) }}
      </li>
      <li class="equipment-stats-list-item">
        Magic: {{ parseBonus(computedBonuses.defence_magic) }}
      </li>
      <li class="equipment-stats-list-item">
        Range: {{ parseBonus(computedBonuses.defence_ranged) }}
      </li>
    </ul>
    <span class="equipment-stats-list-header osrs-text-bold-12">Other bonuses</span>
    <ul class="equipment-stats-list">
      <li class="equipment-stats-list-item">
        Melee strength: {{ parseBonus(computedBonuses.melee_strength) }}
      </li>
      <li class="equipment-stats-list-item">
        Ranged strength: {{ parseBonus(computedBonuses.ranged_strength) }}
      </li>
      <li class="equipment-stats-list-item">
        Magic damage: {{ parseBonus(computedBonuses.magic_damage, { magicDamage: true }) }}
      </li>
      <li class="equipment-stats-list-item">
        Prayer: {{ parseBonus(computedBonuses.prayer) }}
      </li>
    </ul>
    <span class="equipment-stats-list-header osrs-text-bold-12">Target-specific</span>
    <ul class="equipment-stats-list">
      <osrs-tooltip>
        <template #activator="{ on }">
          <li
            class="equipment-stats-list-item"
            v-on="on"
          >
            Undead: {{ parseBonus(computedBonuses.undead, { targetSpecific: true }) }}
          </li>
        </template>
        <span>
          Increases your damage against undead creatures <br>
          Does not stack with slayer bonus
        </span>
      </osrs-tooltip>
      <osrs-tooltip>
        <template #activator="{ on }">
          <li
            class="equipment-stats-list-item"
            v-on="on"
          >
            Slayer: {{ parseBonus(computedBonuses.slayer, { targetSpecific: true }) }}
          </li>
        </template>
        <span>
          Increases your damage against your slayer target <br>
          Does not stack with undead bonus
        </span>
      </osrs-tooltip>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OsrsTooltip from '../OsrsTooltip.vue';

export default {
  name: 'LoadoutEquipmentStats',
  components: { OsrsTooltip },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getEquippedItemsByUuid: 'equippedItems/getEquippedItemsByUuid',
      getCalculation: 'calculations/getCalculationByUuid',
    }),
    computedBonuses() {
      let bonuses = {
        attack_stab: 0,
        attack_slash: 0,
        attack_crush: 0,
        attack_magic: 0,
        attack_ranged: 0,
        defence_stab: 0,
        defence_slash: 0,
        defence_crush: 0,
        defence_magic: 0,
        defence_ranged: 0,
        melee_strength: 0,
        ranged_strength: 0,
        magic_damage: 0,
        prayer: 0,
        slayer: 1,
        undead: 1,
      };

      // TODO: Hardcode slayer and salve

      const calc = this.getCalculation(this.loadoutUuid);
      if (calc) {
        bonuses = calc.bonuses;
      } else {
        Object.values(this.getEquippedItemsByUuid(this.loadoutUuid))
          .filter(Boolean)
          .forEach((item) => {
            const equipBonuses = item.equipment;
            Object.keys(equipBonuses)
              .forEach((bonus) => {
                const bonusValue = equipBonuses[bonus];
                bonuses[bonus] += bonusValue;
              });
          });
      }

      return bonuses;
    },
  },
  methods: {
    parseBonus(bonus = {}, {
      targetSpecific,
      magicDamage,
    } = {}) {
      if (targetSpecific) {
        return `${((bonus - 1) * 100).toFixed(2)}%`;
      }
      if (magicDamage) {
        return `+${(bonus).toFixed(1)}%`;
      }
      return bonus >= 0 ? `+${bonus}` : bonus;
    },
  },
};
</script>

<style scoped>
.equipment-stats-container {
  display: flex;
  flex-direction: column;
  min-width: 140px;
}

.equipment-stats-list-header {
  line-height: 1em;
  font-size: 16px;
}

.equipment-stats-list {
  list-style: none;
  padding-left: 8px;
}

.equipment-stats-list-item {
  line-height: 1em;
  font-size: 16px;
}
</style>
