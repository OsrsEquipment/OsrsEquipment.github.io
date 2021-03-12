import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import moduleLoadouts from './modules/loadouts';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: 'OsrsEquipmentData',
});

const store = new Vuex.Store({
  modules: {
    loadouts: moduleLoadouts,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
