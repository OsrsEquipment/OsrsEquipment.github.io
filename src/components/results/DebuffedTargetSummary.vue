<template>
  <div>
    <monster-stats :target="target" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MonsterStats from '../target/MonsterStats.vue';

export default {
  name: 'DebuffedTargetSummary',
  components: { MonsterStats },
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
    target() {
      return this.calculation?.debuffedTarget;
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

</style>
