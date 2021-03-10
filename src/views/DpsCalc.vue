<template>
  <v-container fluid>
    <div class="some-class">
      <player-details
        :bonuses="bonuses(player1)"
        @equipment-changed="setEquipment(player1, $event)"
        @skills-changed="setSkills(player1, $event)"
        @stance-changed="setStance(player1, $event)"
        @boosts-changed="setBoosts(player1, $event)"
        @settings-changed="setSettings(player1, $event)"
        @spell-changed="setSpell(player1, $event)"
      />

      <calculation-result
        :dps-result="player1.dpsCalc"
        :comparison-dps-result="player2.dpsCalc"
      />

      <player-details
        :bonuses="bonuses(player2)"
        @equipment-changed="setEquipment(player2, $event)"
        @skills-changed="setSkills(player2, $event)"
        @stance-changed="setStance(player2, $event)"
        @boosts-changed="setBoosts(player2, $event)"
        @settings-changed="setSettings(player2, $event)"
        @spell-changed="setSpell(player2, $event)"
      />

      <target-details
        :debuffed-targets="computedDebuffedTargets"
        @target-changed="setTarget"
      />
    </div>
  </v-container>
</template>

<script>
import PlayerDetails from '../components/DpsCalc/LoadoutDetails.vue';
import TargetDetails from '../components/DpsCalc/TargetDetails.vue';
import CalculationResult from '../components/DpsCalc/CalculationResult.vue';
import DpsCalculator from '../dps-calc/dps-calculator';
import Player from '../dps-calc/player';

export default {
  name: 'DpsCalc',
  components: {
    CalculationResult,
    TargetDetails,
    PlayerDetails,
  },
  data() {
    return {
      player1: {
        dpsCalc: undefined,
        settings: undefined,
        details: {
          equipment: undefined,
          skills: undefined,
          stance: undefined,
          boosts: undefined,
          spell: undefined,
        },
      },
      player2: {
        dpsCalc: undefined,
        settings: undefined,
        details: {
          equipment: undefined,
          skills: undefined,
          stance: undefined,
          boosts: undefined,
          spell: undefined,
        },
      },
      target: undefined,
    };
  },
  computed: {
    computedDebuffedTargets() {
      if (this.player1.dpsCalc && this.player2.dpsCalc) {
        return [this.player1.dpsCalc.debuffedTarget, this.player2.dpsCalc.debuffedTarget];
      }
      return undefined;
    },
  },
  methods: {
    calculate(player) {
      if (!player && this.target) {
        this.calculate(this.player1);
        this.calculate(this.player2);
      }
      if (player && this.target) {
        player.dpsCalc = DpsCalculator.calculate(
          new Player({
            ...player.details,
          }),
          this.target,
          player.settings,
        );
      }
    },
    bonuses(player) {
      if (player && player.dpsCalc) {
        return player.dpsCalc.bonuses;
      }
      return undefined;
    },
    setEquipment(player, equipment) {
      player.details.equipment = equipment;
      this.calculate(player);
    },
    setSkills(player, skills) {
      player.details.skills = skills;
      this.calculate(player);
    },
    setStance(player, stance) {
      player.details.stance = stance;
      this.calculate(player);
    },
    setBoosts(player, boosts) {
      player.details.boosts = boosts;
      this.calculate(player);
    },
    setTarget(target) {
      this.target = target;
      this.calculate();
    },
    setSettings(player, settings) {
      player.settings = settings;
      this.calculate(player);
    },
    setSpell(player, spell) {
      player.details.spell = spell;
      this.calculate(player);
    },
  },
};
</script>

<style scoped>
.some-class {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
