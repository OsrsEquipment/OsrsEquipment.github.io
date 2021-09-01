<template>
  <div
    v-if="calculation"
    class="calculation-result-container"
    @click="debug"
  >
    <div class="result-list">
      <div class="result-line">
        <div class="result-line-title osrs-text-quill-8">
          Combat
        </div>
        <div class="result-line-value">
          <span>{{ calculation.dpsType }}</span>
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
          <span>{{ calculation.maxHit }}</span>
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
          <span>{{ calculation.hitChance | percentage }}</span>
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
          <span>{{ calculation.dps | toFixed(6) }}</span>
        </div>
      </div>
      <div class="result-line">
        <div class="result-line-title osrs-text-quill-8">
          Overkill DPS
          <span
            class="result-comparison osrs-text-plain-11"
            :class="{'positive': comparisons.overkillDps > 0,
             'negative': comparisons.overkillDps < 0}"
          >{{ comparisons.overkillDps }}</span>
        </div>
        <div class="result-line-value">
          <span>{{ calculation.overkillDps | toFixed(6) }}</span>
        </div>
      </div>
      <div
        v-if="calculation.hasSpecial"
        class="result-line"
      >
        <div class="result-line-title osrs-text-quill-8">
          Special attack
        </div>
        <div class="result-line-value multi-line-result">
          <div class="multi-line-result-line">
            <span class="multi-line-result-label">Max hit:</span>
            <span class="multi-line-result-text">{{ calculation.specialMaxHit }}</span>
          </div>
          <div class="multi-line-result-line">
            <span class="multi-line-result-label">Accuracy:</span>
            <span class="multi-line-result-text">
              {{ calculation.specialHitChance | percentage }}
            </span>
          </div>
          <div class="multi-line-result-line">
            <span class="multi-line-result-label">DPS:</span>
            <span class="multi-line-result-text">
              {{ calculation.specialDps | toFixed(6) }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="calculation.hasSpecialEffect"
        class="result-line"
      >
        <div class="result-line-title osrs-text-quill-8">
          Special effect
        </div>
        <div class="result-line-value multi-line-result">
          <div class="multi-line-result-line">
            <span class="multi-line-result-label">Max hit:</span>
            <span class="multi-line-result-text">{{ calculation.specialEffectMaxHit }}</span>
          </div>
          <div class="multi-line-result-line">
            <span class="multi-line-result-label">Proc chance:</span>
            <span class="multi-line-result-text">
              {{ calculation.specialEffectHitChance | percentage }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'CalculationSummary',
  components: {},
  filters: {
    percentage(value) {
      if (value == null) return undefined;
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
    comparisons() {
      if (this.calculation && this.bestDps) {
        return {
          maxHit: this.compare(this.calculation.maxHit, this.bestDps.maxHit),
          accuracy: this.compare(this.calculation.accuracy, this.bestDps.hitChance),
          dps: this.compare(this.calculation.dps, this.bestDps.dps),
          overkillDps: this.compare(this.calculation.overkillDps, this.bestDps.overkillDps),
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
    debug() {
      console.log(this.calculation);
    },
  },
};
</script>

<style scoped>

.result-list {
  display: flex;
  flex-direction: column;
  max-height: calc(500px - 42px);
}

.result-line {
  position: relative;
}

.result-line-title {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--osrs-dark);
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

.multi-line-result {
  display: flex;
  flex-direction: column;
  padding: 5px;
  line-height: 1em;
}

.multi-line-result-line {
  display: flex;
  gap: 5px;
  width: 100%;
}

.multi-line-result-label {
  display: block;
  flex: 1;
  text-align: right;
}

.multi-line-result-text {
  flex: 1;
  text-align: left;
}

</style>
