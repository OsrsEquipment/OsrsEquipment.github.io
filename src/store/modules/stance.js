import Vue from 'vue';

const moduleStance = {
  namespaced: true,
  state: () => ({
    /**
     * A key:value list
     * Key = loadout uuid
     * Value = selected stance
     */
    list: {},
    /**
     * Unarmed accurate is default
     */
    default: {
      attack_style: 'accurate',
      attack_type: 'crush',
      combat_style: 'punch',
      experience: 'attack',
    },
  }),
  mutations: {
    addOrUpdate(state, { uuid, stance }) {
      Vue.set(state.list, uuid, stance);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit }, { uuid, stance }) {
      commit('addOrUpdate', { uuid, stance });
    },
    delete({ commit }, uuid) {
      commit('delete', uuid);
    },
  },
  getters: {
    getStanceByUuid: (state) => (uuid) => state.list[uuid] || { ...state.default },
  },
};

export default moduleStance;
