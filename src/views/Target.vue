<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="target-section">
          <target-editor />
          <template v-if="bestDps">
            <calculation-result-list
              :loadouts="{ [bestDps.loadout.uuid]: bestDps.loadout }"
            />
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import TargetEditor from '../components/target/TargetEditor.vue';
import CalculationResultList from '../components/results/CalculationResultList.vue';

export default {
  components: { CalculationResultList, TargetEditor },
  computed: {
    ...mapGetters({
      bestDps: 'calculations/bestDps',
    }),
  },
};
</script>

<style scoped>
.target-section {
  display: flex;
}
</style>
