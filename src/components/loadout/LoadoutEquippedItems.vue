<template>
  <div class="player-equipment-container">
    <div class="player-equipment-grid">
      <loadout-equipment-slot
        class="player-equip-head"
        equip-slot="head"
        :equipped-item="internalEquipment.head"
        @slot-click="selectItem(['head'], internalEquipment.head)"
      />
      <loadout-equipment-slot
        class="player-equip-cape"
        equip-slot="cape"
        :equipped-item="internalEquipment.cape"
        @slot-click="selectItem(['cape'], internalEquipment.cape)"
      />
      <loadout-equipment-slot
        class="player-equip-neck"
        equip-slot="neck"
        :equipped-item="internalEquipment.neck"
        @slot-click="selectItem(['neck'], internalEquipment.neck)"
      />
      <loadout-equipment-slot
        class="player-equip-ammo"
        equip-slot="ammo"
        :equipped-item="internalEquipment.ammo"
        @slot-click="selectItem(['ammo'], internalEquipment.ammo)"
      />
      <loadout-equipment-slot
        class="player-equip-weapon"
        equip-slot="weapon"
        :equipped-item="internalEquipment.weapon"
        @slot-click="selectItem(['weapon', '2h'], internalEquipment.weapon)"
      />
      <loadout-equipment-slot
        class="player-equip-body"
        equip-slot="body"
        :equipped-item="internalEquipment.body"
        @slot-click="selectItem(['body'], internalEquipment.body)"
      />
      <loadout-equipment-slot
        class="player-equip-shield"
        equip-slot="shield"
        :equipped-item="internalEquipment.shield"
        @slot-click="selectItem(['shield'], internalEquipment.shield)"
      />
      <loadout-equipment-slot
        v-if="showDartsSlot"
        class="player-equip-darts"
        equip-slot="ammo"
        :equipped-item="internalEquipment.darts"
        @slot-click="selectItem(['darts'], internalEquipment.darts)"
      />
      <loadout-equipment-slot
        class="player-equip-legs"
        equip-slot="legs"
        :equipped-item="internalEquipment.legs"
        @slot-click="selectItem(['legs'], internalEquipment.legs)"
      />
      <loadout-equipment-slot
        class="player-equip-hands"
        equip-slot="hands"
        :equipped-item="internalEquipment.hands"
        @slot-click="selectItem(['hands'], internalEquipment.hands)"
      />
      <loadout-equipment-slot
        class="player-equip-feet"
        equip-slot="feet"
        :equipped-item="internalEquipment.feet"
        @slot-click="selectItem(['feet'], internalEquipment.feet)"
      />
      <loadout-equipment-slot
        class="player-equip-ring"
        equip-slot="ring"
        :equipped-item="internalEquipment.ring"
        @slot-click="selectItem(['ring'], internalEquipment.ring)"
      />
      <equip-select-dialog
        :dialog.sync="equipSelectDialog.show"
        :item-slots="equipSelectDialog.itemSlots"
        :selected-item="equipSelectDialog.selectedItem"
        @item-selected="itemSelected"
      />
    </div>
    <osrs-flat-button
      class="player-equipment-clear-button"
      @click="clear"
    >
      Clear
    </osrs-flat-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EquipSelectDialog from '../dialogs/EquipSelectDialog.vue';
import OsrsFlatButton from '../OsrsFlatButton.vue';
import LoadoutEquipmentSlot from './LoadoutEquipmentSlot.vue';

export default {
  name: 'LoadoutEquippedItems',
  components: { LoadoutEquipmentSlot, OsrsFlatButton, EquipSelectDialog },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      equipSelectDialog: {
        show: false,
        itemSlots: ['weapon', '2h'],
        selectedItem: undefined,
      },
    };
  },
  computed: {
    ...mapGetters({
      getEquippedItemsByUuid: 'equippedItems/getEquippedItemsByUuid',
    }),
    showDartsSlot() {
      const blowpipeId = 12926;
      return !!(this.internalEquipment.weapon && this.internalEquipment.weapon.id === blowpipeId);
    },
    internalEquipment: {
      get() {
        return this.getEquippedItemsByUuid(this.loadoutUuid);
      },
      set(val) {
        this.addOrUpdate({ uuid: this.loadoutUuid, items: val });
      },
    },
  },
  methods: {
    ...mapActions({
      addOrUpdate: 'equippedItems/addOrUpdate',
      delete: 'equippedItems/delete',
    }),
    selectItem(slots, equippedItem) {
      this.equipSelectDialog.itemSlots = slots;
      this.equipSelectDialog.selectedItem = equippedItem;
      this.equipSelectDialog.show = true;
    },
    itemSelected(item) {
      const localEquipment = { ...this.internalEquipment };
      if (item) {
        let { slot } = item.equipment;
        if (/^\w+\sdart$/.test(item.name)) {
          slot = 'darts';
        }
        if (item.equipment.slot === '2h') {
          slot = 'weapon';
          localEquipment.shield = undefined;
        }
        if (item.equipment.slot === 'shield' && this.internalEquipment.weapon && this.internalEquipment.weapon.equipment.slot === '2h') {
          localEquipment.weapon = undefined;
          localEquipment.darts = undefined;
        }
        localEquipment[slot] = item;
      } else {
        let slot = this.equipSelectDialog.itemSlots[0];
        if (slot === '2h') {
          slot = 'weapon';
        }
        localEquipment[slot] = undefined;
      }
      this.internalEquipment = localEquipment;
    },
    clear() {
      this.delete(this.loadoutUuid);
    },
  },
};
</script>

<style scoped>
.player-equipment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px;
}

.player-equipment-clear-button {
  width: 64px;
  margin-top: 10px;
}

.player-equipment-grid {
  display: grid;
  grid-template-columns: 40px 40px 40px;
  grid-template-rows: 40px 40px 40px 40px 40px;
  grid-template-areas:
    ". head ."
    "cape neck ammo"
    "weapon body shield"
    "darts legs ."
    "hands feet ring";
  place-items: center;
}

.player-equip-head {
  grid-area: head;
}

.player-equip-cape {
  grid-area: cape;
}

.player-equip-neck {
  grid-area: neck;
}

.player-equip-ammo {
  grid-area: ammo;
}

.player-equip-weapon {
  grid-area: weapon;
}

.player-equip-body {
  grid-area: body;
}

.player-equip-shield {
  grid-area: shield;
}

.player-equip-legs {
  grid-area: legs;
}

.player-equip-hands {
  grid-area: hands;
}

.player-equip-feet {
  grid-area: feet;
}

.player-equip-ring {
  grid-area: ring;
}

.player-equip-darts {
  grid-area: darts;
}
</style>
