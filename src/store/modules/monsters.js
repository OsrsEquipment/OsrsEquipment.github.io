import MonstersManager from '../../services/managers/monsters.manager';

const moduleMonsters = {
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
    async init({ commit }) {
      commit('SET', await MonstersManager.getAll());
    },
  },
  getters: {
    paged(state) {
      return ({ page = 0, limit = 20, name }) => state.list
        .filter((monster) => {
          if (name && name.length > 0) {
            return monster.name.toLowerCase().includes(name.toLowerCase());
          }
          return true;
        }).slice(page, limit);
    },
  },
};

export default moduleMonsters;
