<template>
  <div
    class="player-equip-slot-container"
    @click="$emit('slot-click')"
  >
    <img
      class="player-equip-slot-bg"
      :width="width"
      :height="height"
      :src="slotBg"
    />
    <img
      v-if="hasItemEquipped"
      class="player-equip-slot-equipped-item"
      :width="width"
      :height="height"
      :src="`data:image/png;base64,${equippedItem.icon}`"
    />
  </div>
</template>

<script>
export default {
  name: 'PlayerEquipSlot',
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
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`../../assets/osrs/${this.hasItemEquipped ? 'empty' : this.equipSlot}_slot.png`);
    },
  },
};
</script>

<style scoped>
.player-equip-slot-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.player-equip-slot-bg {
}

.player-equip-slot-equipped-item {
  position: absolute;
  top: 0;
}
</style>
