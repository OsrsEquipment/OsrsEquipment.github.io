<template functional>
  <div
    class="player-equip-slot-container"
    :class="[
      data.class,
      data.staticClass
    ]"
    v-on="listeners"
  >
    <img
      class="player-equip-slot player-equip-slot-bg"
      :class="{'empty': props.equippedItem != null, [props.equipSlot]: props.equippedItem == null}"
      alt="slot"
    >
    <img
      v-if="props.equippedItem != null"
      class="player-equip-slot player-equip-slot-equipped-item"
      :src="`data:image/png;base64,${props.equippedItem.icon}`"
      :alt="props.equippedItem.name"
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
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.player-equip-slot-container {
  display: flex;
  position: relative;
  cursor: pointer;
}

.player-equip-slot {
  max-width: 36px;
  max-height: 36px;
}

.player-equip-slot-equipped-item {
  position: absolute;
  top: 2px;
  left: 2px;
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
