import { uniqueId } from 'lodash';

const uniqueIdPrefix = 'loadout_';

const moduleLoadouts = {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  mutations: {
    SET(state, value) {
      state.list = value;
    },
  },
  actions: {
    add({ commit, state }, { name, loadout }) {
      if (!loadout || !name) return;
      loadout.uid = uniqueId(uniqueIdPrefix);
      loadout.name = name;
      // TODO: Sanity check for duplicates?
      commit('SET', [...state.list, loadout]);
    },
    remove({ commit, state }, { loadout }) {
      if (!loadout) return;
      commit('SET', state.list.filter((i) => i.uid !== loadout.uid));
    },
    update({ commit, state }, { name, loadout }) {
      if (!loadout || !name) return;
      loadout.name = name;
      commit('SET', [...state.list.filter((i) => i.uid !== loadout.uid), loadout]);
    },
    clear({ commit }) {
      commit('SET', []);
    },
  },
  getters: {
    getByName(state) {
      return (name) => state.list.find((loadout) => loadout.name === name);
    },
    getByUid(state) {
      return (uid) => state.list.find((loadout) => loadout.uid === uid);
    },
  },
};

export default moduleLoadouts;
