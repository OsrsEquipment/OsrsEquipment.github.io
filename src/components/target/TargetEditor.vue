<template>
  <osrs-container class="target-editor">
    <monster-select v-model="internalTarget" />
    <monster-stats />
  </osrs-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OsrsContainer from '../OsrsContainer.vue';
import MonsterStats from './MonsterStats.vue';
import MonsterSelect from '../MonsterSelect.vue';

export default {
  name: 'TargetEditor',
  components: { MonsterSelect, MonsterStats, OsrsContainer },
  computed: {
    ...mapState({
      target: (state) => state.target.target,
    }),
    internalTarget: {
      get() {
        return this.target;
      },
      set(value) {
        this.setTarget(value);
      },
    },
  },
  methods: {
    ...mapActions({
      setTarget: 'target/setTarget',
    }),
  },
};
</script>

<style scoped>
.target-editor {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 350px;
  min-height: 420px;
}
</style>
