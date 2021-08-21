<template>
  <div class="calculation-result-list">
    <div
      v-for="loadout in loadouts"
      :key="loadout.uuid"
    >
      <div class="calculation-result-container">
        <span class="loadout-title osrs-text-quill-8">{{ loadout.name }}</span>
        <loadout-editor
          :loadout-uuid="loadout.uuid"
        />
        <result-controls :loadout-uuid="loadout.uuid" />
        <calculation-result :loadout-uuid="loadout.uuid" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import CalculationResult from './CalculationResult.vue';
import CalculationFactory from '../../classes/CalculationFactory';
import LoadoutEditor from '../loadout/LoadoutEditor.vue';
import ResultControls from './ResultControls.vue';

export default {
  name: 'CalculationResultList',
  components: {
    ResultControls,
    LoadoutEditor,
    CalculationResult,
  },
  data() {
    return {
      slide: undefined,
      storeUnsubscribe: undefined,
    };
  },
  computed: {
    ...mapState({
      loadouts: (state) => state.loadouts.list,
      target: (state) => state.target.target,
    }),
    ...mapGetters({
      getLoadout: 'loadouts/getLoadoutByUuid',
      getStance: 'stance/getStanceByUuid',
      getSpell: 'spell/getSpellByUuid',
      getSkills: 'skills/getSkillsByUuid',
      getEquippedItems: 'equippedItems/getEquippedItemsByUuid',
      getWeapon: 'equippedItems/getEquippedWeaponByUuid',
      getPrayers: 'prayers/getPrayersByUuid',
      getPotions: 'potions/getPotionsByUuid',
    }),
  },
  beforeMount() {
    const listenForChangesTo = ['equippedItems', 'stance', 'spell', 'skills', 'prayers', 'potions', 'settings'];
    this.storeUnsubscribe = this.$store.subscribe((mutation) => {
      const [mutationStore, mutationName] = mutation.type.split('/');
      if (mutationStore && mutationName) {
        if (listenForChangesTo.indexOf(mutationStore) !== -1) {
          let uuid;
          if (mutationName === 'addOrUpdate') {
            uuid = mutation.payload.uuid;
          }
          if (mutationName === 'delete') {
            uuid = mutation.payload;
          }
          this.update(uuid);
        }
      }
    });
  },
  mounted() {
    if (this.loadouts) {
      Object.keys(this.loadouts)
        .forEach(this.update);
    }
  },
  destroyed() {
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();
    }
  },
  methods: {
    ...mapActions({
      setCalculation: 'calculations/addOrUpdate',
    }),
    update(uuid) {
      const loadout = {
        ...this.getLoadout(uuid),
        skills: this.getSkills(uuid),
        equipment: {
          ...this.getEquippedItems(uuid),
          weapon: this.getWeapon(uuid),
        },
        stance: this.getStance(uuid),
        spell: this.getSpell(uuid),
        prayers: this.getPrayers(uuid),
        potions: this.getPotions(uuid),
        settings: undefined,
      };
      const calculation = CalculationFactory.generate(loadout, this.target);
      this.setCalculation({
        uuid,
        calculation,
      });
    },
  },
};
</script>

<style scoped>
.calculation-result-list {
  display: flex;
  flex-wrap: wrap;
}

.calculation-result-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loadout-title {
  text-align: center;
}
</style>
