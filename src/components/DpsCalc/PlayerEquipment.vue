<template>
  <div class="player-equipment-container">
    <div class="player-equipment-grid">
      <player-equip-slot
        class="player-equip-head"
        equip-slot="head"
        :equipped-item="equipment.head"
        @slot-click="selectItem(['head'], equipment.head)"
      />
      <player-equip-slot
        class="player-equip-cape"
        equip-slot="cape"
        :equipped-item="equipment.cape"
        @slot-click="selectItem(['cape'], equipment.cape)"
      />
      <player-equip-slot
        class="player-equip-neck"
        equip-slot="neck"
        :equipped-item="equipment.neck"
        @slot-click="selectItem(['neck'], equipment.neck)"
      />
      <player-equip-slot
        class="player-equip-ammo"
        equip-slot="ammo"
        :equipped-item="equipment.ammo"
        @slot-click="selectItem(['ammo'], equipment.ammo)"
      />
      <player-equip-slot
        class="player-equip-weapon"
        equip-slot="weapon"
        :equipped-item="equipment.weapon"
        @slot-click="selectItem(['weapon', '2h'], equipment.weapon)"
      />
      <player-equip-slot
        class="player-equip-body"
        equip-slot="body"
        :equipped-item="equipment.body"
        @slot-click="selectItem(['body'], equipment.body)"
      />
      <player-equip-slot
        class="player-equip-shield"
        equip-slot="shield"
        :equipped-item="equipment.shield"
        @slot-click="selectItem(['shield'], equipment.shield)"
      />
      <player-equip-slot
        v-if="showDartsSlot"
        class="player-equip-darts"
        equip-slot="ammo"
        :equipped-item="equipment.darts"
        @slot-click="selectItem(['darts'], equipment.darts)"
      />
      <player-equip-slot
        class="player-equip-legs"
        equip-slot="legs"
        :equipped-item="equipment.legs"
        @slot-click="selectItem(['legs'], equipment.legs)"
      />
      <player-equip-slot
        class="player-equip-hands"
        equip-slot="hands"
        :equipped-item="equipment.hands"
        @slot-click="selectItem(['hands'], equipment.hands)"
      />
      <player-equip-slot
        class="player-equip-feet"
        equip-slot="feet"
        :equipped-item="equipment.feet"
        @slot-click="selectItem(['feet'], equipment.feet)"
      />
      <player-equip-slot
        class="player-equip-ring"
        equip-slot="ring"
        :equipped-item="equipment.ring"
        @slot-click="selectItem(['ring'], equipment.ring)"
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
import EquipSelectDialog from '../dialogs/EquipSelectDialog.vue';
import PlayerEquipSlot from './PlayerEquipSlot.vue';
import OsrsFlatButton from '../OsrsFlatButton.vue';

export default {
  name: 'PlayerEquipment',
  components: { OsrsFlatButton, PlayerEquipSlot, EquipSelectDialog },
  props: {
    equipment: {
      type: Object,
      default: () => ({
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
      }),
    },
  },
  data() {
    return {
      internalEquipment: undefined,
      equipSelectDialog: {
        show: false,
        itemSlots: ['weapon', '2h'],
        selectedItem: undefined,
      },
    };
  },
  computed: {
    showDartsSlot() {
      const blowpipeId = 12926;
      return !!(this.computedEquipment.weapon && this.computedEquipment.weapon.id === blowpipeId);
    },
    computedEquipment: {
      get() {
        return this.internalEquipment;
      },
      set(val) {
        this.internalEquipment = val;
        this.$emit('update:equipment', val);
      },
    },
  },
  watch: {
    equipment: {
      immediate: true,
      handler(value) {
        this.internalEquipment = value || {
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
        };
      },
    },
  },
  methods: {
    selectItem(slots, equippedItem) {
      this.equipSelectDialog.itemSlots = slots;
      this.equipSelectDialog.selectedItem = equippedItem;
      this.equipSelectDialog.show = true;
    },
    itemSelected(item) {
      const localEquipment = { ...this.computedEquipment };
      if (item) {
        let { slot } = item.equipment;
        if (/^\w+\sdart$/.test(item.name)) {
          slot = 'darts';
        }
        if (item.equipment.slot === '2h') {
          slot = 'weapon';
          localEquipment.shield = undefined;
        }
        if (item.equipment.slot === 'shield' && this.equipment.weapon && this.equipment.weapon.equipment.slot === '2h') {
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
      this.computedEquipment = localEquipment;
    },
    clear() {
      this.computedEquipment = {
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
      };
    },
  },
};
</script>

<style scoped>
.player-equipment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
