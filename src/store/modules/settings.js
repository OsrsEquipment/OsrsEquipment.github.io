import Vue from 'vue';

const defaultSettings = {
  bgsSpecialDamage: 0,
  dwhSpecials: 0,
  arclightSpecials: 0,
  onSlayerTask: true,
  inWilderness: true,
  currentHitpoints: 1,
  completedHardKandarinDiary: true,
};

const moduleSettings = {
  namespaced: true,
  state: () => ({
    /**
     * A key:value list
     * Key = loadout uuid
     * Value = settings
     */
    list: {},
  }),
  mutations: {
    addOrUpdate(state, { uuid, settings }) {
      Vue.set(state.list, uuid, settings);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit }, { uuid, settings }) {
      commit('addOrUpdate', { uuid, settings });
    },
    delete({ commit }, uuid) {
      commit('delete', uuid);
    },
    copy({ commit, getters }, { copyUuid, newUuid }) {
      commit('addOrUpdate', { uuid: newUuid, settings: { ...getters.getSettingsByUuid(copyUuid) } });
    },
  },
  getters: {
    getSettingsByUuid: (state) => (uuid) => state.list[uuid] || { ...defaultSettings },
  },
};

export default moduleSettings;
