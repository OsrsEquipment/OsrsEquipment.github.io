import Vue from 'vue';

const moduleEquippedItems = {
  namespaced: true,
  state: () => ({
    /**
     * A key:value list
     * Key = loadout uuid
     * Value = object containing equipped items
     */
    list: {},
    default: {
      head: undefined,
      cape: undefined,
      neck: undefined,
      ammo: undefined,
      weapon: undefined,
      body: undefined,
      shield: undefined,
      legs: undefined,
      hands: undefined,
      feet: undefined,
      ring: undefined,
      darts: undefined,
    },
  }),
  mutations: {
    addOrUpdate(state, { uuid, items }) {
      Vue.set(state.list, uuid, items);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    addOrUpdate({ commit, dispatch }, { uuid, items }) {
      commit('addOrUpdate', { uuid, items });
      dispatch('loadouts/checkStance', uuid, { root: true });
    },
    delete({ commit, dispatch }, uuid) {
      commit('delete', uuid);
      dispatch('loadouts/checkStance', uuid, { root: true });
    },
  },
  getters: {
    getEquippedItemsByUuid: (state) => (uuid) => state.list[uuid] || { ...state.default },
    getEquippedWeaponByUuid: (state) => (uuid) => {
      const equippedItems = state.list[uuid];
      if (equippedItems && equippedItems.weapon) {
        return equippedItems.weapon;
      }
      return {
        name: 'Unarmed',
        weapon: {
          attack_speed: 4,
          stances: [
            {
              attack_style: 'accurate',
              attack_type: 'crush',
              combat_style: 'punch',
              experience: 'attack',
            },
            {
              attack_style: 'aggressive',
              attack_type: 'crush',
              combat_style: 'kick',
              experience: 'strength',
            },
            {
              attack_style: 'defensive',
              attack_type: 'crush',
              combat_style: 'block',
              experience: 'defence',
            },
          ],
          weapon_type: 'unarmed',
        },
      };
    },
  },
};

export default moduleEquippedItems;
