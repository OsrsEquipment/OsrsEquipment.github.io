<template>
  <osrs-container>
    Result of calculation
    <pre>
      {{ dps }}
      {{ maxHit }}
      {{ accuracy }}
    </pre>
  </osrs-container>
</template>

<script>
import { mapGetters } from 'vuex';
import OsrsContainer from '../OsrsContainer.vue';

export default {
  name: 'CalculationResult',
  components: { OsrsContainer },
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
    dps() {
      return this.calculation?.dps;
    },
    maxHit() {
      return this.calculation?.maxHit;
    },
    accuracy() {
      return this.calculation?.hitChance;
    },
  },
};
</script>

<style scoped>

</style>
