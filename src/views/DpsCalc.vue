<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <calculation-result-list :loadouts="loadouts" />
      </v-col>
    </v-row>
    <osrs-flat-button @click="createLoadout">
      New loadout
    </osrs-flat-button>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import OsrsFlatButton from '../components/OsrsFlatButton.vue';
import CalculationResultList from '../components/results/CalculationResultList.vue';

export default {
  name: 'DpsCalc',
  components: {
    CalculationResultList,
    OsrsFlatButton,
  },
  data() {
    return {
      selectedTab: 0,
    };
  },
  computed: {
    ...mapState({
      loadouts: (state) => state.loadouts.list,
    }),
    ...mapGetters({
      getStance: 'stance/getStanceByUuid',
      getSpell: 'spell/getSpellByUuid',
      getSkills: 'skills/getSkillsByUuid',
      getEquippedItems: 'equippedItems/getEquippedItemsByUuid',
      getWeapon: 'equippedItems/getEquippedWeaponByUuid',
      getPrayers: 'prayers/getPrayersByUuid',
      getPotions: 'potions/getPotionsByUuid',
    }),
  },
  methods: {
    ...mapActions({
      newLoadout: 'loadouts/new',
      setTarget: 'target/setTarget',
    }),
    createLoadout() {
      this.newLoadout();
    },
  },
};
</script>

<style scoped>
</style>
