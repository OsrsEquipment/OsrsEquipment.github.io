<template>
  <osrs-autocomplete
    :value="value"
    :items="lazyMonsters"
    :search-input.sync="search"
    :value-comparator="comparisonFn"
    @input="$emit('input', $event)"
    @load-more-items="loadMore"
  >
    <template #item="{ item }">
      <div class="monster-select-item">
        <span>{{ item.name }}</span>
        <v-spacer />
        <img
          class="mx-2"
          src="../assets/osrs/Combat icon.png"
          alt="Combat level"
        >
        {{ item.combat_level }}
        <img
          class="mx-2"
          src="../assets/osrs/Hitpoints icon.png"
          alt="Hitpoints"
        >
        {{ item.hitpoints }}
      </div>
    </template>
    <template #prepend>
      <img
        class="me-2"
        src="../assets/osrs/Monster Examine.png"
        alt="Monster"
      >
    </template>
  </osrs-autocomplete>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import OsrsAutocomplete from './OsrsAutocomplete.vue';

export default {
  name: 'MonsterSelect',
  components: { OsrsAutocomplete },
  props: {
    value: {
      type: undefined,
      default: undefined,
    },
  },
  data() {
    return {
      search: undefined,
      lazyMonsters: [],
    };
  },
  computed: {
    ...mapState({
      monsters: (state) => state.monsters.list,
    }),
    ...mapGetters({
      pagedMonsters: 'monsters/paged',
    }),
    comparisonFn() {
      return function compare(monster1, monster2) {
        if (monster1.name !== monster2.name) return false;

        const propsToCompare = [
          'combat_level',
          'hitpoints',
          'defence_crush',
          'defence_magic',
          'defence_ranged',
          'defence_slash',
          'defence_stab',
          'defence_level',
          'magic_level',
        ];

        for (let i = 0; i < propsToCompare.length; i++) {
          const prop = propsToCompare[i];
          if (monster1[prop] !== monster2[prop]) {
            return false;
          }
        }

        return true;
      };
    },
  },
  watch: {
    search() {
      this.loadMore(100);
    },
  },
  methods: {
    loadMore(pageSize) {
      if (this.lazyMonsters.length < this.monsters.length) {
        this.lazyMonsters = this.pagedMonsters({ page: 0, limit: pageSize, name: this.search });
      }
    },
  },
};
</script>

<style scoped>
.monster-select-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
