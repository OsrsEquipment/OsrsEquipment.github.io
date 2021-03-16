import { cloneDeep } from 'lodash';

const moduleDpsCalc = {
  namespaced: true,
  state: () => ({
    loadout1: undefined,
    loadout2: undefined,
    target: undefined,
  }),
  mutations: {
    SET_LOADOUT1(state, loadout) {
      state.loadout1 = loadout;
    },
    SET_LOADOUT2(state, loadout) {
      state.loadout2 = loadout;
    },
    SET_TARGET(state, target) {
      state.target = target;
    },
  },
  actions: {
    setLoadout1({ commit }, loadout) {
      commit('SET_LOADOUT1', cloneDeep(loadout));
    },
    setLoadout2({ commit }, loadout) {
      commit('SET_LOADOUT2', cloneDeep(loadout));
    },
    setTarget({ commit }, target) {
      commit('SET_TARGET', cloneDeep(target));
    },
  },
  getters: {
    byNumber(state) {
      return (number) => {
        switch (number) {
          case 1:
            return cloneDeep(state.loadout1);
          case 2:
            return cloneDeep(state.loadout2);
          default:
            throw new Error(`Incorrect loadout number ${number}`);
        }
      };
    },
  },
};

export default moduleDpsCalc;
