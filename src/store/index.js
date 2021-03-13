import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import moduleLoadouts from './modules/loadouts';
import moduleMonsters from './modules/monsters';
import moduleEquipment from './modules/equipment';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: 'OsrsEquipmentData',
  modules: ['loadouts'],
});

const store = new Vuex.Store({
  modules: {
    loadouts: moduleLoadouts,
    monsters: moduleMonsters,
    equipment: moduleEquipment,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
