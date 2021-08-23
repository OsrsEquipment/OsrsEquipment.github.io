<template>
  <osrs-container
    class="calculation-result-container"
    @click.native="debug"
  >
    <div class="result-list">
      <div class="result-line">
        <div class="result-line-title osrs-text-quill-8">
          Combat
        </div>
        <div class="result-line-value">
          <span>{{ combatType }}</span>
        </div>
      </div>
      <div class="result-line">
        <div class="result-line-title osrs-text-quill-8">
          Maximum hit
          <span
            class="result-comparison osrs-text-plain-11"
            :class="{'positive': comparisons.maxHit > 0, 'negative': comparisons.maxHit < 0}"
          >{{ comparisons.maxHit }}</span>
        </div>
        <div class="result-line-value">
          <span>{{ maxHit }}</span>
        </div>
      </div>
      <div class="result-line">
        <div class="result-line-title osrs-text-quill-8">
          Accuracy
          <span
            class="result-comparison osrs-text-plain-11"
            :class="{'positive': comparisons.accuracy > 0, 'negative': comparisons.accuracy < 0}"
          >{{ comparisons.accuracy }}</span>
        </div>
        <div class="result-line-value">
          <span>{{ accuracy | percentage }}</span>
        </div>
      </div>
      <div class="result-line">
        <div class="result-line-title osrs-text-quill-8">
          DPS
          <span
            class="result-comparison osrs-text-plain-11"
            :class="{'positive': comparisons.dps > 0, 'negative': comparisons.dps < 0}"
          >{{ comparisons.dps }}</span>
        </div>
        <div class="result-line-value">
          <span>{{ dps | toFixed(6) }}</span>
        </div>
      </div>
    </div>
    <v-divider/>
    <div class="effect-list">
      <div
        v-for="[effectName, active] in effects"
        :key="effectName"
        class="effect-line osrs-text-quill-8"
        :class="{'effect-inactive': !active}"
      >
        {{ parseEffect(effectName, active) }}
      </div>
    </div>
  </osrs-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import OsrsContainer from '../OsrsContainer.vue';

export default {
  name: 'CalculationResult',
  components: { OsrsContainer },
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
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      storeUnsubscribe: undefined,
    };
  },
  computed: {
    ...mapState({
      target: (state) => state.target.target,
    }),
    ...mapGetters({
      getCalculationByUuid: 'calculations/getCalculationByUuid',
      bestDps: 'calculations/bestDps',
    }),
    calculation() {
      return this.getCalculationByUuid(this.loadoutUuid);
    },
    combatType() {
      return this.calculation?.dpsType;
    },
    dps() {
      return this.calculation?.dps;
    },
    maxHit() {
      return this.calculation?.maxHit;
    },
    accuracy() {
      return this.calculation?.hitChance;
    },
    effects() {
      return this.calculation?.visibleEffects;
    },
    effectCount() {
      return this.calculation?.visibleEffects.size;
    },
    comparisons() {
      if (this.bestDps) {
        return {
          maxHit: this.compare(this.maxHit, this.bestDps.maxHit),
          accuracy: this.compare(this.accuracy, this.bestDps.hitChance),
          dps: this.compare(this.dps, this.bestDps.dps),
        };
      }
      return {};
    },
  },
  watch: {
    loadoutUuid() {
      this.update();
    },
  },
  beforeMount() {
    const listenForChangesTo = ['loadouts', 'equippedItems', 'stance', 'spell', 'skills', 'prayers', 'potions', 'settings'];
    this.storeUnsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'target/setTarget') {
        this.update();
        return;
      }
      const [mutationStore, mutationName] = mutation.type.split('/');
      if (mutationStore && mutationName) {
        if (listenForChangesTo.indexOf(mutationStore) !== -1) {
          let uuid;
          if (mutationName === 'addOrUpdate' || mutationName === 'add') {
            uuid = mutation.payload.uuid;
          }
          if (mutationName === 'delete') {
            uuid = mutation.payload;
          }
          if (this.loadoutUuid === uuid) {
            this.update();
          }
        }
      }
    });
  },
  mounted() {
    this.update();
  },
  destroyed() {
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();
    }
  },
  methods: {
    ...mapActions({
      calculate: 'calculations/calculate',
    }),
    update() {
      this.calculate(this.loadoutUuid);
    },
    compare(a, b) {
      if (a === b) {
        return 0;
      }
      if (a > b) {
        return ((a / b - 1) * 100).toFixed(2);
      }
      return -((b / a - 1) * 100).toFixed(2);
    },
    parseEffect(effectName, active) {
      if (typeof active === 'object') {
        if (active.name) return active.name;
      }
      return effectName;
    },
    debug() {
      console.log(this.calculation);
    },
  },
};
</script>

<style scoped>
.calculation-result-container {
  display: flex;
  flex-direction: column;
  width: 350px;
  max-height: 100%;
}

.result-list {
  display: flex;
  flex-direction: column;
}

.result-line {
  position: relative;
}

.result-line-title {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--osrs-dark-brown);
  text-align: center;
}

.result-line-value {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  text-align: center;
}

.result-comparison {
  position: absolute;
  right: 5px;
  display: none;
  font-size: 24px;
}

.result-comparison:after {
  content: '%';
}

.result-comparison.positive {
  display: block;
  color: var(--osrs-green);
}

.result-comparison.positive:before {
  content: '+';
}

.result-comparison.negative {
  display: block;
  color: var(--osrs-red);
}

.effect-list {
  overflow: auto;
}

.effect-line {
  padding: 2px 4px;
}

.effect-inactive {
  opacity: 0.5;
}
</style>
