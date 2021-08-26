<template>
  <div
    class="calculation-row osrs-text-quill-8"
  >
    <div class="calculation-column dps-type-column">
      <span></span>
    </div>
    <div class="calculation-column name-column">
      <span>Loadout name</span>
    </div>
    <div class="calculation-column align-center combat-type-column">
      <span>Combat</span>
    </div>
    <div class="calculation-column align-center">
      <span>Max hit</span>
    </div>
    <div class="calculation-column align-center accuracy-column">
      <span>Accuracy</span>
    </div>
    <div class="calculation-column align-center dps-column">
      <span>DPS</span>
    </div>
    <div class="calculation-column actions-column">
      <span>Actions</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CalculationRowHeader',
};
</script>

<style scoped>
.calculation-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;
  background: var(--osrs-darkest-brown);
  padding: 5px;
  border-radius: 4px;
  transition: background 200ms;
}

.calculation-column {
  min-width: 75px;
}

.calculation-column.dps-type-column {
  min-width: 25px;
  margin-left: 5px;
}

.calculation-column.align-center {
  text-align: center;
}

.calculation-column.align-right {
  text-align: right;
}

.calculation-column.align-left {
  text-align: left;
}

.name-column {
  flex: 1;
}

.combat-type-column {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: capitalize;
}

.combat-type-column .spell-icon {
  max-width: 24px;
  max-height: 24px;
}

.accuracy-column,
.dps-column {
  min-width: 75px
}
</style>
