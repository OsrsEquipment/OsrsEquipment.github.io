<template>
  <div class="effect-list">
    <v-tooltip
      v-for="[effectName, effect] in effects"
      :key="effectName"
      bottom
      content-class="osrs-tooltip"
    >
      <template #activator="{ on }">
        <div
          class="effect-line osrs-text-plain-12"
          :class="{'effect-inactive': !effect.activated}"
          v-on="on"
        >
          {{ effect.name || effectName }}
        </div>
      </template>
      <span>{{ effect.description }}</span>
    </v-tooltip>
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
};
</script>

<style scoped>
.effect-list {
  padding: 5px 10px;
  overflow-y: auto;
  max-height: calc(500px - 40px);
}

.effect-line {
  cursor: default;
}
</style>
