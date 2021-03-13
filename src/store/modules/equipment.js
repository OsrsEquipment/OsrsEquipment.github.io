import ItemsManager from '../../services/managers/items.manager';

const moduleEquipment = {
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
      commit('SET', await ItemsManager.getAll());
    },
  },
  getters: {
    getBySlots(state) {
      return (slots) => state.list.filter((equipment) => slots.includes(equipment.equipment.slot));
    },
    getDarts(state) {
      return () => state.list.filter((equipment) => /^\w+\sdart$/.test(equipment.name));
    },
  },
};

export default moduleEquipment;
