import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';
import { isEqual } from 'lodash';

function nameExists(list, name) {
  return Object.values(list).some((loadout) => loadout.name === name);
}

function stanceIsSpellRelated(stance) {
  return stance.combat_style === 'spell' && stance.attack_type === 'spellcasting';
}

const moduleLoadouts = {
  namespaced: true,
  state: () => ({
    list: {},
  }),
  mutations: {
    add(state, { uuid, loadout }) {
      Vue.set(state.list, uuid, loadout);
    },
  },
  actions: {
    new({ commit, state }) {
      const uuid = uuidv4();
      let number = 1;
      let generatedName;
      do {
        generatedName = `Loadout ${number++}`;
      } while (nameExists(state.list, generatedName));

      const loadout = {
        uuid,
        loadout: {
          uuid,
          dateAdded: new Date(),
          name: generatedName,
        },
      };

      commit('add', loadout);
      return loadout;
    },
    checkStance({ rootGetters, dispatch }, uuid) {
      const weapon = rootGetters['equippedItems/getEquippedWeaponByUuid'](uuid);
      const currentStance = rootGetters['stance/getStanceByUuid'](uuid);
      if (weapon) {
        const possibleStances = weapon.weapon.stances;
        const matchingStance = possibleStances.some((stance) => isEqual(stance, currentStance));
        if (!matchingStance) {
          const newStance = possibleStances[0];
          if (stanceIsSpellRelated(currentStance) && !stanceIsSpellRelated(newStance)) {
            dispatch('spell/delete', uuid, { root: true });
          }
          dispatch('stance/addOrUpdate', { uuid, stance: newStance }, { root: true });
        }
      } else {
        throw new Error('You somehow have no weapon equipped, even though the default is unarmed...');
      }
    },
  },
  getters: {
    getLoadoutByUuid: (state) => (uuid) => state.list[uuid],
  },
};

export default moduleLoadouts;
