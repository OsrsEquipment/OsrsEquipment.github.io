import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import moduleLoadouts from './modules/loadouts';
import moduleMonsters from './modules/monsters';
import moduleEquipment from './modules/equipment';
import moduleDpsCalc from './modules/dps-calc';
import moduleEquippedItems from './modules/equippedItems';
import moduleStance from './modules/stance';
import moduleSpell from './modules/spell';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: 'OsrsEquipmentData',
  modules: ['loadouts', 'equippedItems', 'stance', 'spell'],
});

const store = new Vuex.Store({
  modules: {
    loadouts: moduleLoadouts,
    dpsCalc: moduleDpsCalc,
    monsters: moduleMonsters,
    equipment: moduleEquipment,
    equippedItems: moduleEquippedItems,
    stance: moduleStance,
    spell: moduleSpell,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
