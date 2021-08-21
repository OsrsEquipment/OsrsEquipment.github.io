import Vue from 'vue';

const modulePotions = {
  namespaced: true,
  state: () => ({
    /**
     * A key:value list
     * Key = loadout uuid
     * Value = potions
     */
    list: {},
  }),
  mutations: {
    addOrUpdate(state, { uuid, potions }) {
      Vue.set(state.list, uuid, potions);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit }, { uuid, potions }) {
      commit('addOrUpdate', { uuid, potions });
    },
    delete({ commit }, uuid) {
      commit('delete', uuid);
    },
  },
  getters: {
    getPotionsByUuid: (state) => (uuid) => state.list[uuid],
  },
};

export default modulePotions;
