<template>
  <v-container fluid>
    <div class="dps-calc-container">
      <div>
        <div class="loadout-title osrs-text-quill-8">
          Loadout 1
        </div>
        <loadout-details
          v-model="internalLoadout1"
          :bonuses="bonusesDps1"
          :loadout-number="1"
        />
      </div>

      <div>
        <div class="loadout-title osrs-text-quill-8">
          Dps details
        </div>
        <dps-details
          :dps1="results.dps1"
          :dps2="results.dps2"
        />
      </div>

      <div>
        <div class="loadout-title osrs-text-quill-8">
          Loadout 2
        </div>
        <loadout-details
          v-model="internalLoadout2"
          :bonuses="bonusesDps2"
          :loadout-number="2"
        />
      </div>

      <div>
        <div class="loadout-title osrs-text-quill-8">
          Target
        </div>
        <target-details
          v-model="internalTarget"
          :debuffed-targets="debuffedTargets"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DpsCalculator from '../dps-calc/dps-calculator';
import LoadoutDetails from '../components/DpsCalc/LoadoutDetails.vue';
import TargetDetails from '../components/DpsCalc/TargetDetails.vue';
import DpsDetails from '../components/DpsCalc/DpsDetails.vue';

export default {
  name: 'DpsCalc',
  components: {
    DpsDetails,
    TargetDetails,
    LoadoutDetails,
  },
  data() {
    return {
      lazyLoadout1: undefined,
      lazyLoadout2: undefined,
      lazyTarget: undefined,
      results: {
        dps1: undefined,
        dps2: undefined,
      },
    };
  },
  computed: {
    ...mapState({
      loadout1: (state) => state.dpsCalc.loadout1,
      loadout2: (state) => state.dpsCalc.loadout2,
      target: (state) => state.dpsCalc.target,
    }),
    internalLoadout1: {
      get() {
        return this.lazyLoadout1;
      },
      set(value) {
        this.lazyLoadout1 = value;
        this.results.dps1 = this.calculateDps(value, this.internalTarget);
        this.setLoadout1(value);
      },
    },
    internalLoadout2: {
      get() {
        return this.lazyLoadout2;
      },
      set(value) {
        this.lazyLoadout2 = value;
        this.results.dps2 = this.calculateDps(value, this.internalTarget);
        this.setLoadout2(value);
      },
    },
    internalTarget: {
      get() {
        return this.lazyTarget;
      },
      set(value) {
        this.lazyTarget = value;
        this.results.dps1 = this.calculateDps(this.internalLoadout1, value);
        this.results.dps2 = this.calculateDps(this.internalLoadout2, value);
        this.setTarget(value);
      },
    },
    bonusesDps1() {
      return this.results.dps1 ? this.results.dps1.bonuses : undefined;
    },
    bonusesDps2() {
      return this.results.dps2 ? this.results.dps2.bonuses : undefined;
    },
    debuffedTargets() {
      if (this.results.dps1 && this.results.dps2) {
        return [
          this.results.dps1.debuffedTarget,
          this.results.dps2.debuffedTarget,
        ];
      }
      return [];
    },
  },
  created() {
    this.lazyLoadout1 = this.loadout1;
    this.lazyLoadout2 = this.loadout2;
    this.lazyTarget = this.target;
    if (this.lazyLoadout1 && this.lazyLoadout2 && this.lazyTarget) {
      this.results.dps1 = this.calculateDps(this.lazyLoadout1, this.lazyTarget);
      this.results.dps2 = this.calculateDps(this.lazyLoadout2, this.lazyTarget);
    }
  },
  methods: {
    ...mapActions({
      setLoadout1: 'dpsCalc/setLoadout1',
      setLoadout2: 'dpsCalc/setLoadout2',
      setTarget: 'dpsCalc/setTarget',
    }),
    calculateDps(loadout, target) {
      return DpsCalculator.calculate(loadout, target);
    },
  },
};
</script>

<style scoped>
.dps-calc-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.loadout-title {
  width: 100%;
  text-align: center;
}
</style>
