<template>
  <v-container fluid>
    <div class="some-class">
      <player-details
        v-model="loadout1"
      />

      <dps-details
        :loadouts="[loadout1, loadout2]"
        :target="target"
      />

      <player-details
        v-model="loadout2"
      />

      <target-details
        v-model="target"
      />
    </div>
  </v-container>
</template>

<script>
import PlayerDetails from '../components/DpsCalc/LoadoutDetails.vue';
import TargetDetails from '../components/DpsCalc/TargetDetails.vue';
import DpsDetails from '../components/DpsCalc/DpsDetails.vue';

export default {
  name: 'DpsCalc',
  components: {
    DpsDetails,
    TargetDetails,
    PlayerDetails,
  },
  data() {
    return {
      loadout1: undefined,
      loadout2: undefined,
      target: undefined,
    };
  },
  computed: {
  },
  methods: {
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
