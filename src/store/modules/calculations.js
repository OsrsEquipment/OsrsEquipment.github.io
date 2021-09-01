import Vue from 'vue';
import CalculationFactory from '../../lib/CalculationFactory';

function performCalculation({ rootGetters, rootState }, uuid) {
  const existingLoadout = rootGetters['loadouts/getLoadoutByUuid'](uuid);
  if (!existingLoadout) return undefined;
  const loadout = {
    ...existingLoadout,
    skills: rootGetters['skills/getSkillsByUuid'](uuid),
    equipment: {
      ...rootGetters['equippedItems/getEquippedItemsByUuid'](uuid),
      weapon: rootGetters['equippedItems/getEquippedWeaponByUuid'](uuid),
    },
    stance: rootGetters['stance/getStanceByUuid'](uuid),
    spell: rootGetters['spell/getSpellByUuid'](uuid),
    prayers: rootGetters['prayers/getPrayersByUuid'](uuid),
    potions: rootGetters['potions/getPotionsByUuid'](uuid),
    settings: rootGetters['settings/getSettingsByUuid'](uuid),
  };
  return CalculationFactory.generate(loadout, rootState.target.target);
}

const moduleCalculations = {
  namespaced: true,
  state: () => ({
    /**
     * A key:value list
     * Key = loadout uuid
     * Value = calculation
     */
    list: {},
  }),
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    addOrUpdate(state, {
      uuid,
      calculation,
    }) {
      Vue.set(state.list, uuid, calculation);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit }, {
      uuid,
      calculation,
    }) {
      commit('addOrUpdate', {
        uuid,
        calculation,
      });
    },
    delete({ commit }, uuid) {
      commit('delete', uuid);
    },
    calculate({ commit, rootGetters, rootState }, uuid) {
      const calculation = performCalculation({ rootGetters, rootState }, uuid);
      commit('addOrUpdate', {
        uuid,
        calculation,
      });
    },
    bulkCalculate({
      commit, rootGetters, rootState, state,
    }, uuids) {
      const calculations = {};
      uuids.forEach((uuid) => {
        calculations[uuid] = performCalculation({ rootGetters, rootState }, uuid);
      });
      commit('setList', { ...state.list, ...calculations });
    },
  },
  getters: {
    getCalculationByUuid: (state) => (uuid) => state.list[uuid],
    bestDps(state) {
      if (state.list) {
        const calcs = Object.values(state.list);
        if (calcs.length > 0) {
          return calcs.sort((a, b) => b.dps - a.dps)[0];
        }
      }
      return undefined;
    },
  },
};

export default moduleCalculations;
