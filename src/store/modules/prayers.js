import Vue from 'vue';

const modulePrayers = {
  namespaced: true,
  state: () => ({
    /**
     * A key:value list
     * Key = loadout uuid
     * Value = prayers
     */
    list: {},
  }),
  mutations: {
    addOrUpdate(state, { uuid, prayers }) {
      Vue.set(state.list, uuid, prayers);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit }, { uuid, prayers }) {
      commit('addOrUpdate', { uuid, prayers });
    },
    delete({ commit }, uuid) {
      commit('delete', uuid);
    },
    copy({ commit, getters }, { copyUuid, newUuid }) {
      commit('addOrUpdate', { uuid: newUuid, prayers: [...getters.getPrayersByUuid(copyUuid)] });
    },
  },
  getters: {
    getPrayersByUuid: (state) => (uuid) => state.list[uuid] || [],
  },
};

export default modulePrayers;
