<template>
  <v-container fluid>
    <loadout-details :loadout.sync="loadout1" />
    <osrs-container>
      {{ loadout1 }}
    </osrs-container>
  </v-container>
</template>

<script>
import LoadoutDetails from '../components/DpsCalc/LoadoutDetails.vue';
import OsrsContainer from '../components/OsrsContainer.vue';

export default {
  name: 'DpsCalc',
  components: {
    OsrsContainer,
    LoadoutDetails,

  },
  data() {
    return {
      selectedTab: 0,
      loadout1: undefined,
    };
  },
  computed: {},
  created() {
  },
  methods: {},
};
</script>

<style scoped>
</style>
