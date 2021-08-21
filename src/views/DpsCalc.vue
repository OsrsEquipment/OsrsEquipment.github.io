<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <calculation-result-list />
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
    rockCrab() {
      return {
        id: 100,
        name: 'Rock Crab',
        last_updated: '2020-12-25',
        incomplete: true,
        members: true,
        release_date: '2004-11-02',
        combat_level: 13,
        size: 1,
        hitpoints: 50,
        max_hit: 1,
        attack_type: ['crush'],
        attack_speed: 4,
        aggressive: true,
        poisonous: false,
        venomous: false,
        immune_poison: false,
        immune_venom: false,
        attributes: [],
        category: [],
        slayer_monster: false,
        slayer_level: null,
        slayer_xp: null,
        slayer_masters: [],
        duplicate: false,
        examine: 'No one likes crabs...',
        wiki_name: 'Rock Crab (Active)',
        wiki_url: 'https://oldschool.runescape.wiki/w/Rock_Crab#Active',
        attack_level: 1,
        strength_level: 1,
        defence_level: 1,
        magic_level: 1,
        ranged_level: 1,
        attack_bonus: 0,
        strength_bonus: 0,
        attack_magic: 0,
        magic_bonus: 0,
        attack_ranged: 0,
        ranged_bonus: 0,
        defence_stab: 0,
        defence_slash: 0,
        defence_crush: 0,
        defence_magic: 0,
        defence_ranged: 0,
      };
    },
  },
  beforeMount() {
    this.setTarget(this.rockCrab);
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
