import Vue from 'vue';

const moduleSpell = {
  namespaced: true,
  state: () => ({
    /**
     * A key:value list
     * Key = loadout uuid
     * Value = selected stance
     */
    list: {},
  }),
  mutations: {
    addOrUpdate(state, { uuid, spell }) {
      Vue.set(state.list, uuid, spell);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit }, { uuid, spell }) {
      commit('addOrUpdate', { uuid, spell });
    },
    delete({ commit }, uuid) {
      commit('delete', uuid);
    },
  },
  getters: {
    getSpellByUuid: (state) => (uuid) => state.list[uuid],
  },
};

export default moduleSpell;
