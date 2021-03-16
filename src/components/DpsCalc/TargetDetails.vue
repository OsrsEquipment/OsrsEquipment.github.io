<template>
  <osrs-container class="target-details-container">
    <monster-select
      v-model="internalTarget"
    />
    <template v-if="internalTarget">
      <monster-details
        :monster="internalTarget"
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
  model: {
    prop: 'target',
    event: 'change',
  },
  props: {
    debuffedTargets: {
      type: Array,
      default: undefined,
    },
    target: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      lazyTarget: undefined,
    };
  },
  computed: {
    internalTarget: {
      get() {
        return this.lazyTarget;
      },
      set(value) {
        this.lazyTarget = value;
        this.$emit('change', value);
      },
    },
  },
  watch: {
    target: {
      immediate: true,
      handler(value) {
        this.lazyTarget = value;
      },
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
