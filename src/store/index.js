import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import moduleLoadouts from './modules/loadouts';
import moduleMonsters from './modules/monsters';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: 'OsrsEquipmentData',
  modules: ['loadouts'],
});

const store = new Vuex.Store({
  modules: {
    loadouts: moduleLoadouts,
    monsters: moduleMonsters,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
