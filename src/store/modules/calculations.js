import Vue from 'vue';

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
    addOrUpdate(state, { uuid, calculation }) {
      Vue.set(state.list, uuid, calculation);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit }, { uuid, calculation }) {
      commit('addOrUpdate', { uuid, calculation });
    },
    delete({ commit }, uuid) {
      commit('delete', uuid);
    },
  },
  getters: {
    getCalculationByUuid: (state) => (uuid) => state.list[uuid],
  },
};

export default moduleCalculations;
