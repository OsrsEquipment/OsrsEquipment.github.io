import { v4 as uuidv4 } from 'uuid';

function isDuplicateName(state, name, loadout) {
  if (loadout) {
    const foundExistingLoadout = state.list.find((i) => i.name === name);
    if (foundExistingLoadout) {
      return foundExistingLoadout.uuid !== loadout.uuid;
    }
    return false;
  }
  return state.list.some((i) => i.name.toLowerCase() === name.toLowerCase());
}

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
      if (!loadout || !name) return undefined;
      if (isDuplicateName(state, name)) throw new Error('Duplicate loadout name');
      const localLoadout = { ...loadout };
      localLoadout.uuid = uuidv4();
      localLoadout.name = name;
      commit('SET', [...state.list, localLoadout]);
      return localLoadout;
    },
    remove({ commit, state }, { loadout }) {
      if (!loadout) return;
      commit('SET', state.list.filter((i) => i.uuid !== loadout.uuid));
    },
    update({ commit, state }, { name, loadout }) {
      if (!loadout || !name) return;
      if (isDuplicateName(state, name, loadout)) throw new Error('Duplicate loadout name');
      if (!loadout.uuid) throw new Error('Loadout has no uuid');
      loadout.name = name;
      commit('SET', [...state.list.filter((i) => i.uuid !== loadout.uuid), loadout]);
    },
    clear({ commit }) {
      commit('SET', []);
    },
  },
  getters: {
    getNames(state) {
      return state.list.map((loadout) => loadout.name);
    },
    getByName(state) {
      return (name) => state.list.find((loadout) => loadout.name === name);
    },
    getByUuid(state) {
      return (uuid) => state.list.find((loadout) => loadout.uuid === uuid);
    },
  },
};

export default moduleLoadouts;
