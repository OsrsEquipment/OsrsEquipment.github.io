import Vue from 'vue';

/**
 * Unarmed accurate is default
 */
const defaultStance = {
  attack_style: 'accurate',
  attack_type: 'crush',
  combat_style: 'punch',
  experience: 'attack',
};

const moduleStance = {
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
    copy({ commit, getters }, { copyUuid, newUuid }) {
      commit('addOrUpdate', { uuid: newUuid, stance: { ...getters.getStanceByUuid(copyUuid) } });
    },
  },
  getters: {
    getStanceByUuid: (state) => (uuid) => state.list[uuid] || { ...defaultStance },
  },
};

export default moduleStance;
