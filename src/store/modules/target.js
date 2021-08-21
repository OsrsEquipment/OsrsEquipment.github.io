const moduleTarget = {
  namespaced: true,
  state: () => ({
    target: undefined,
  }),
  mutations: {
    setTarget(state, target) {
      state.target = target;
    },
  },
  actions: {
    setTarget({ commit }, target) {
      commit('setTarget', target);
    },
  },
};

export default moduleTarget;
