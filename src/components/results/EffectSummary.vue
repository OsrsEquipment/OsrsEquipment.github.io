<template>
  <div class="effect-list">
    <div
      v-for="[effectName, active] in effects"
      :key="effectName"
      class="effect-line osrs-text-plain-12"
      :class="{'effect-inactive': !active}"
    >
      {{ parseEffect(effectName, active) }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EffectSummary',
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getCalculationByUuid: 'calculations/getCalculationByUuid',
    }),
    calculation() {
      return this.getCalculationByUuid(this.loadoutUuid);
    },
    effects() {
      return this.calculation?.visibleEffects;
    },
  },
  methods: {
    parseEffect(effectName, active) {
      if (typeof active === 'object') {
        if (active.name) return active.name;
      }
      return effectName;
    },
  },
};
</script>

<style scoped>
.effect-list {
  padding: 5px 10px;
  overflow-y: auto;
  max-height: calc(500px - 40px);
}
</style>
