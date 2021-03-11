<template>
  <osrs-container class="target-details-container">
    <monster-select
      v-model="target"
    />
    <template v-if="target">
      <monster-details
        :monster="target"
        :debuffed-monsters="debuffedTargets"
      />
    </template>
    <template v-else>
      Pick a target, any target
    </template>
  </osrs-container>
</template>

<script>
import OsrsContainer from '../OsrsContainer.vue';
import MonsterSelect from '../MonsterSelect.vue';
import MonsterDetails from './MonsterDetails.vue';

export default {
  name: 'TargetDetails',
  components: { MonsterDetails, MonsterSelect, OsrsContainer },
  props: {
    debuffedTargets: {
      type: Array,
      default: undefined,
    },
    value: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      target: undefined,
    };
  },
  watch: {
    target: function targetChanged(target) {
      this.$emit('input', target);
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.target-details-container {
  position: relative;
  width: 320px;
  height: 450px;
  margin: 10px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
