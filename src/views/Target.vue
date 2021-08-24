<template>
  <v-container>
    <v-row>
      <v-col>
        <osrs-container>
          <p class="osrs-text-quill-8">
            Select a target and your best loadout will be displayed next to it.
          </p>
        </osrs-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="target-section">
          <div class="target-box">
            <span class="target-box-title osrs-text-quill-8">Target</span>
            <target-editor />
          </div>
          <template v-if="bestDps">
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import TargetEditor from '../components/target/TargetEditor.vue';
import OsrsContainer from '../components/OsrsContainer.vue';

export default {
  components: { OsrsContainer, TargetEditor },
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
  justify-content: space-around;
}

.target-box-title {
  display: block;
  width: 100%;
  text-align: center;
}

.target-box {
}
</style>
