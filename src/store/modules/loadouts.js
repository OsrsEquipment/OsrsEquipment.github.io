import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';
import { isEqual } from 'lodash';

function nameExists(list, name) {
  return Object.values(list)
    .some((loadout) => loadout.name === name);
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
    add(state, {
      uuid,
      loadout,
    }) {
      Vue.set(state.list, uuid, loadout);
    },
    update(state, {
      uuid,
      loadout,
    }) {
      Vue.set(state.list, uuid, loadout);
    },
    delete(state, uuid) {
      Vue.delete(state.list, uuid);
    },
  },
  actions: {
    new({
      commit,
      state,
    }) {
      const uuid = uuidv4();
      let number = 1;
      let generatedName;
      do {
        generatedName = `Loadout ${number++}`;
      } while (nameExists(state.list, generatedName));

      const loadout = {
        uuid,
        dateAdded: new Date(),
        name: generatedName,
      };

      commit('add', {
        uuid,
        loadout,
      });
    },
    update({ commit }, loadout) {
      commit('update', {
        uuid: loadout.uuid,
        dateUpdated: new Date(),
        loadout,
      });
    },
    copy({
      commit,
      dispatch,
      state,
      getters,
    }, copyUuid) {
      const existingLoadout = getters.getLoadoutByUuid(copyUuid);
      const newUuid = uuidv4();
      let number = 1;
      let generatedName = `Copy of ${existingLoadout.name}`;
      while (nameExists(state.list, generatedName)) {
        generatedName = `Copy of ${existingLoadout.name} (${number++})`;
      }

      const loadout = {
        uuid: newUuid,
        dateAdded: new Date(),
        name: generatedName,
      };

      commit('add', {
        uuid: newUuid,
        loadout,
      });
      dispatch('equippedItems/copy', {
        copyUuid,
        newUuid,
      }, { root: true });
      dispatch('stance/copy', {
        copyUuid,
        newUuid,
      }, { root: true });
      dispatch('spell/copy', {
        copyUuid,
        newUuid,
      }, { root: true });
      dispatch('skills/copy', {
        copyUuid,
        newUuid,
      }, { root: true });
      dispatch('prayers/copy', {
        copyUuid,
        newUuid,
      }, { root: true });
      dispatch('potions/copy', {
        copyUuid,
        newUuid,
      }, { root: true });
      dispatch('settings/copy', {
        copyUuid,
        newUuid,
      }, { root: true });
    },
    delete({
      commit,
      dispatch,
    }, uuid) {
      commit('delete', uuid);
      dispatch('equippedItems/delete', uuid, { root: true });
      dispatch('skills/delete', uuid, { root: true });
      dispatch('stance/delete', uuid, { root: true });
      dispatch('spell/delete', uuid, { root: true });
      dispatch('prayers/delete', uuid, { root: true });
      dispatch('potions/delete', uuid, { root: true });
      dispatch('settings/delete', uuid, { root: true });
      dispatch('calculations/delete', uuid, { root: true });
    },
    checkStance({
      rootGetters,
      dispatch,
    }, uuid) {
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
          dispatch('stance/addOrUpdate', {
            uuid,
            stance: newStance,
          }, { root: true });
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
