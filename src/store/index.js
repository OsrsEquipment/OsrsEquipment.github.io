import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import moduleLoadouts from './modules/loadouts';
import moduleMonsters from './modules/monsters';
import moduleEquipment from './modules/equipment';
import moduleEquippedItems from './modules/equippedItems';
import moduleStance from './modules/stance';
import moduleSpell from './modules/spell';
import moduleSkills from './modules/skills';
import modulePrayers from './modules/prayers';
import modulePotions from './modules/potions';
import moduleCalculations from './modules/calculations';
import moduleTarget from './modules/target';
import moduleSettings from './modules/settings';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  modules: {
    loadouts: moduleLoadouts,
    monsters: moduleMonsters,
    equipment: moduleEquipment,
    equippedItems: moduleEquippedItems,
    stance: moduleStance,
    spell: moduleSpell,
    skills: moduleSkills,
    prayers: modulePrayers,
    potions: modulePotions,
    settings: moduleSettings,
    calculations: moduleCalculations,
    target: moduleTarget,
  },
  plugins: [
    createPersistedState({
      paths: ['loadouts', 'equippedItems', 'stance', 'spell', 'skills', 'prayers', 'potions', 'settings', 'target'],
    }),
  ],
});

export default store;
