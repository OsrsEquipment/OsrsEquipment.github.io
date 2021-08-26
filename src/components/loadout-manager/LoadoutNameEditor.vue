<template>
  <osrs-text-input
    v-model="loadoutName"
  ></osrs-text-input>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { debounce } from 'lodash';
import OsrsTextInput from '../OsrsTextInput.vue';

export default {
  name: 'LoadoutNameEditor',
  components: { OsrsTextInput },
  props: {
    loadoutUuid: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getLoadout: 'loadouts/getLoadoutByUuid',
    }),
    loadout() {
      return this.getLoadout(this.loadoutUuid);
    },
    loadoutName: {
      get() {
        return this.loadout.name;
      },
      set: debounce(function update(value) {
        this.updateLoadout({ ...this.loadout, name: value });
      }, 500),
    },
  },
  methods: {
    ...mapActions({
      updateLoadout: 'loadouts/update',
    }),
  },
};
</script>

<style scoped>

</style>
