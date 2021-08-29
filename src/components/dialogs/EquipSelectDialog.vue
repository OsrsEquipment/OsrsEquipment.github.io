<template>
  <v-dialog
    max-width="600px"
    :value="dialog"
    :transition="false"
    @input="close"
  >
    <div class="equip-select-dialog-container">
      <item-select
        v-if="dialog"
        auto-focus
        :value="selectedItem"
        :item-slots="itemSlots"
        @input="selectItem"
      />
      <osrs-flat-button
        class="equip-select-dialog-clear-slot"
        @click="clearSlot"
      >
        Clear slot
      </osrs-flat-button>
    </div>
  </v-dialog>
</template>

<script>
import ItemSelect from '../ItemSelect.vue';
import OsrsFlatButton from '../OsrsFlatButton.vue';

export default {
  name: 'EquipSelectDialog',
  components: { OsrsFlatButton, ItemSelect },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    itemSlots: {
      type: Array,
      default: undefined,
    },
    selectedItem: {
      type: Object,
      default: undefined,
    },
  },
  methods: {
    open() {
      this.$emit('update:dialog', true);
    },
    close() {
      this.$emit('update:dialog', false);
    },
    selectItem(item) {
      this.$emit('item-selected', item);
      this.close();
    },
    clearSlot() {
      this.$emit('item-selected', undefined);
      this.close();
    },
  },
};
</script>

<style scoped>
.equip-select-dialog-container {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: var(--osrs-black-brown);
}

.equip-select-dialog-clear-slot {
  margin-left: 10px;
}
</style>
