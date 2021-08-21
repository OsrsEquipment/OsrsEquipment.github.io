<template>
  <div
    class="player-equip-slot-container"
    @click="$emit('slot-click')"
  >
    <img
      class="player-equip-slot-bg"
      :class="{'empty': hasItemEquipped, [equipSlot]: !hasItemEquipped}"
      alt="slot"
    >
    <img
      v-if="hasItemEquipped"
      class="player-equip-slot-equipped-item"
      :src="`data:image/png;base64,${equippedItem.icon}`"
      :alt="equippedItem.name"
    >
  </div>
</template>

<script>
export default {
  name: 'LoadoutEquipmentSlot',
  props: {
    equipSlot: {
      type: String,
      default: 'empty',
    },
    equippedItem: {
      type: Object,
      default: undefined,
    },
    width: {
      type: Number,
      default: 36,
    },
    height: {
      type: Number,
      default: 36,
    },
  },
  data() {
    return {};
  },
  computed: {
    hasItemEquipped() {
      return this.equippedItem != null;
    },
    slotBg() {
      return '../../static/osrs/empty_slot.png';
    },
  },
};
</script>

<style scoped>
.player-equip-slot-container {
  display: flex;
  position: relative;
  cursor: pointer;
}

.player-equip-slot-bg.empty {
  content: url('../../static/osrs/empty_slot.png');
}

.player-equip-slot-bg.head {
  content: url('../../static/osrs/head_slot.png');
}

.player-equip-slot-bg.ammo {
  content: url('../../static/osrs/ammo_slot.png');
}

.player-equip-slot-bg.cape {
  content: url('../../static/osrs/cape_slot.png');
}

.player-equip-slot-bg.neck {
  content: url('../../static/osrs/neck_slot.png');
}

.player-equip-slot-bg.weapon {
  content: url('../../static/osrs/weapon_slot.png');
}

.player-equip-slot-bg.body {
  content: url('../../static/osrs/body_slot.png');
}

.player-equip-slot-bg.shield {
  content: url('../../static/osrs/shield_slot.png');
}

.player-equip-slot-bg.legs {
  content: url('../../static/osrs/legs_slot.png');
}

.player-equip-slot-bg.hands {
  content: url('../../static/osrs/hands_slot.png');
}

.player-equip-slot-bg.feet {
  content: url('../../static/osrs/feet_slot.png');
}

.player-equip-slot-bg.ring {
  content: url('../../static/osrs/ring_slot.png');
}

.player-equip-slot-equipped-item {
  position: absolute;
  top: 2px;
  left: 2px;
}
</style>
