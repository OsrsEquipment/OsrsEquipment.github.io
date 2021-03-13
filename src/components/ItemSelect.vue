<template>
  <osrs-autocomplete
    :value="value"
    :items="items"
    :auto-focus="autoFocus"
    @input="$emit('input', $event)"
  >
    <template #item="{ item }">
      <div class="item-select-list-item">
        <img
          :src="`data:image/png;base64,${item.icon}`"
          :alt="item.name"
        >
        <v-list-item-title v-text="item.name" />
      </div>
    </template>
  </osrs-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex';
import OsrsAutocomplete from './OsrsAutocomplete.vue';

export default {
  name: 'ItemSelect',
  components: { OsrsAutocomplete },
  props: {
    value: {
      type: undefined,
      default: undefined,
    },
    itemSlots: {
      type: Array,
      required: false,
      default: undefined,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapGetters({
      getBySlots: 'equipment/getBySlots',
      getDarts: 'equipment/getDarts',
    }),
  },
  watch: {
    itemSlots: function itemSlots() {
      this.items = [];
      this.fetchItems();
    },
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      let slots = [...this.itemSlots];
      let items = [];

      if (slots.includes('darts')) {
        items = this.getDarts();
        slots = slots.filter((i) => i !== 'darts');
      }

      if (slots && slots.length > 0) {
        items = [...items, ...this.getBySlots(slots)];
      }

      this.items = items;
    },
  },
};
</script>

<style>
.item-select-list-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
