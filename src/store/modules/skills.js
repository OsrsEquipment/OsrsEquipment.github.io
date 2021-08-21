import Vue from 'vue';

const defaultSkills = {
  attack: 99,
  hitpoints: 99,
  mining: 99,
  strength: 99,
  agility: 99,
  smithing: 99,
  defence: 99,
  herblore: 73,
  fishing: 99,
  ranged: 99,
  thieving: 99,
  cooking: 99,
  prayer: 99,
  crafting: 99,
  firemaking: 99,
  magic: 99,
  fletching: 69,
  woodcutting: 99,
  runecraft: 1,
  slayer: 99,
  farming: 99,
  construction: 99,
  hunter: 99,
};

const moduleSkills = {
  namespaced: true,
  state: () => ({
    /**
     * A key:value list
     * Key = loadout uuid
     * Value = skills
     */
    list: {},
  }),
  mutations: {
    addOrUpdate(state, { uuid, skills }) {
      Vue.set(state.list, uuid, skills);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit }, { uuid, skills }) {
      commit('addOrUpdate', { uuid, skills });
    },
    delete({ commit }, uuid) {
      commit('delete', uuid);
    },
    copy({ commit, getters }, { copyUuid, newUuid }) {
      commit('addOrUpdate', { uuid: newUuid, skills: { ...getters.getSkillsByUuid(copyUuid) } });
    },
  },
  getters: {
    getSkillsByUuid: (state) => (uuid) => state.list[uuid] || { ...defaultSkills },
  },
};

export default moduleSkills;
