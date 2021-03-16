<template>
  <div
    v-click-outside="{
      handler: onClickOutside,
      include: include
    }"
    class="osrs-autocomplete-container"
  >
    <v-menu
      id="osrsAutocompleteMenu"
      ref="osrsAutocompleteMenu"
      :value="menuActive"
      bottom
      offset-y
      :close-on-click="false"
      :close-on-content-click="false"
      :disable-keys="true"
      :open-on-click="false"
      :max-height="300"
      :min-width="350"
      @scroll="onScroll"
    >
      <template #activator="{ on, attrs }">
        <osrs-text-input
          id="osrsAutocompleteSearch"
          ref="osrsAutocompleteSearch"
          v-model="internalSearch"
          v-bind="attrs"
          v-on="on"
          @focus="onFocus"
          @keydown="onKeyDown"
        >
          <slot
            slot="prepend"
            name="prepend"
          />
          <slot
            slot="append"
            name="append"
          />
        </osrs-text-input>
      </template>

      <ul
        class="osrs-autocomplete-list osrs-text-plain-11"
      >
        <li
          v-for="(item, index) of computedItems"
          :key="index"
          class="osrs-autocomplete-list-item"
          :class="{'osrs-autocomplete-active-item': isSelected(item)}"
          @click="selectItem(item)"
        >
          <slot
            name="item"
            :item="item"
          >
            {{ item[itemValue] }}
          </slot>
        </li>
      </ul>
    </v-menu>
  </div>
</template>

<script>
import { uniqWith } from 'lodash';
import OsrsTextInput from './OsrsTextInput.vue';

export default {
  name: 'OsrsAutocomplete',
  components: { OsrsTextInput },
  props: {
    value: {
      type: Object,
      default: undefined,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    itemValue: {
      type: String,
      default: 'name',
    },
    valueComparator: {
      type: Function,
      default: function compare(a, b) { return a[this.itemValue] === b[this.itemValue]; },
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuActive: false,
      lazySearch: undefined,
      localItems: [],
      lastItem: 20,
      selectedItem: this.value,
    };
  },
  computed: {
    internalSearch: {
      get() {
        return this.lazySearch;
      },
      set(value) {
        this.lazySearch = value;
        if (this.getContent()) {
          this.getContent().scrollTop = 0;
        }
        this.$emit('update:search-input', value);
      },
    },
    computedItems() {
      return this.localItems
        .filter(
          (item) => (this.internalSearch
            ? item[this.itemValue].toLowerCase().includes(this.internalSearch.toLowerCase())
            : true),
        )
        .slice(0, this.lastItem);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.selectedItem = val;
        if (val) {
          this.lazySearch = val[this.itemValue];
        }
      },
    },
    items: {
      immediate: true,
      handler(val) {
        this.localItems = uniqWith(val, this.valueComparator.bind(this));
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.requestAnimationFrame(() => {
        if (this.$refs.osrsAutocompleteSearch && this.autoFocus) {
          this.$refs.osrsAutocompleteSearch.focus();
        }
      });
    });
  },
  methods: {
    activateMenu(value) {
      if (!value) {
        this.lastItem = 20;
        if (this.getContent()) {
          this.getContent().scrollTop = 0;
        }
        if (this.$refs.osrsAutocompleteSearch) {
          this.$refs.osrsAutocompleteSearch.blur();
        }
        if (this.selectedItem) {
          this.lazySearch = this.selectedItem[this.itemValue];
        }
        this.$emit('');
      }
      this.menuActive = value;
    },
    onScroll() {
      if (this.lastItem > this.localItems.length) return;

      if (!this.getContent()) return;

      const showMoreItems = (
        this.getContent().scrollHeight
        - (this.getContent().scrollTop
         + this.getContent().clientHeight)
      ) < 200;

      if (showMoreItems) {
        this.lastItem += 20;
      }
    },
    selectItem(item) {
      this.selectedItem = item;
      this.$emit('input', item);
      this.activateMenu(false);
    },
    isSelected(item) {
      if (this.selectedItem && item) {
        return this.selectedItem[this.itemKey] === item[this.itemKey];
      }
      return false;
    },
    getContent() {
      return this.$refs.osrsAutocompleteMenu && this.$refs.osrsAutocompleteMenu.$refs.content;
    },
    onClickOutside() {
      this.lazySearch = this.selectedItem ? this.selectedItem[this.itemValue] : undefined;
      this.activateMenu(false);
    },
    onFocus() {
      this.internalSearch = undefined;
      this.activateMenu(true);
    },
    include() {
      return [document.querySelector('#osrsAutocompleteMenu')];
    },
    onKeyDown(e) {
      const { keyCode } = e;

      // enter
      if (keyCode === 13 && this.computedItems.length > 0) {
        this.selectItem(this.computedItems[0]);
      }
      // esc
      if (keyCode === 27 && this.menuActive) {
        this.activateMenu(false);
      }
    },
    focus() {
      if (this.$refs.osrsAutocompleteMenu) {
        this.$refs.osrsAutocompleteMenu.focus();
      }
    },
  },
};
</script>

<style scoped>
.osrs-autocomplete-container {
  display: block;
  width: 100%;
}

.osrs-autocomplete-list {
  list-style: none;
  background: var(--osrs-brown);
  padding: 5px 0;
  border: 2px solid var(--osrs-dark-brown);
  border-radius: 4px;
}

.osrs-autocomplete-list-item {
  padding: 0 10px;
  cursor: pointer;
}

.osrs-autocomplete-list-item.osrs-autocomplete-active-item {
  background: var(--osrs-pale-brown);
}

.osrs-autocomplete-list-item:hover {
  background: var(--osrs-light-brown);
}
</style>
