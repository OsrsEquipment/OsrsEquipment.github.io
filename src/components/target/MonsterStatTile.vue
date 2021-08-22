<template>
  <div class="monster-stat-tile">
    <div class="stat-icon">
      <img
        :class="stat"
        :alt="stat"
      />
    </div>
    <template v-if="!signed">
      <span>{{ value }}</span>
    </template>
    <template v-else>
      <span>{{ value | signed }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MonsterStatTile',
  filters: {
    signed(value) {
      return value >= 0 ? `+${value}` : value;
    },
  },
  props: {
    stat: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    signed: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>
.monster-stat-tile {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 2px 4px;
}

.stat-icon {
  flex: 1;
  display: flex;
  align-items: center;
}

.hitpoints {
  content: url('../../static/osrs/Hitpoints icon.png');
}

.attack_level {
  content: url('../../static/osrs/Attack icon.png');
}

.strength_level {
  content: url('../../static/osrs/Strength icon.png');
}

.defence_level {
  content: url('../../static/osrs/Defence icon.png');
}

.magic_level {
  content: url('../../static/osrs/Magic icon.png');
}

.ranged_level {
  content: url('../../static/osrs/Ranged icon.png');
}

.attack_bonus {
  content: url('../../static/osrs/Attack icon.png');
}

.strength_bonus {
  content: url('../../static/osrs/Strength icon.png');
}

.magic_bonus {
  content: url('../../static/osrs/Magic Damage icon.png');
}

.attack_magic {
  content: url('../../static/osrs/Magic icon.png');
}

.ranged_bonus {
  content: url('../../static/osrs/Ranged Strength icon.png');
}

.attack_ranged {
  content: url('../../static/osrs/Ranged icon.png');
}

.defence_stab {
  content: url('../../static/osrs/White dagger.png');
}

.defence_slash {
  content: url('../../static/osrs/White scimitar.png');
}

.defence_crush {
  content: url('../../static/osrs/White warhammer.png');
}

.defence_magic {
  content: url('../../static/osrs/Magic icon.png');
}

.defence_ranged {
  content: url('../../static/osrs/Ranged icon.png');
}
</style>
