<template>
  <div>
    <osrs-tooltip
      font-size="24px"
      @click="editSkill"
    >
      <template #activator="{ on }">
        <svg
          viewBox="0 0 128 64"
          preserveAspectRatio="xMinYMin meet"
          class="osrs-skill-tile"
          v-on="on"
        >
          <clipPath :id="`boundingBoxClip-${uniqueId}`">
            <path
              d="
                M 2 9
                C 6 9, 9 6, 9 2
                L 119 2
                C 119 6, 121 9, 126 9
                L 126 55
                C 121 55, 119 58, 119 62
                L 9 62
                C 9 58, 6 55, 2 55
                Z
              "
              stroke="#726451"
              stroke-width="2"
              fill="transparent"
            />
          </clipPath>
          <g>
            <path
              d="
                M 1 8
                C 5 8, 8 5, 8 1
                L 120 1
                C 120 5, 122 8, 127 8
                L 127 56
                C 122 56, 120 59, 120 63
                L 8 63
                C 8 59, 5 56, 1 56
                Z
              "
              stroke="#2d2b24"
              stroke-width="2"
              fill="transparent"
            />
          </g>
          <g>
            <path
              d="
                M 2 9
                C 6 9, 9 6, 9 2
                L 119 2
                C 119 6, 121 9, 126 9
                L 126 55
                C 121 55, 119 58, 119 62
                L 9 62
                C 9 58, 6 55, 2 55
                Z
              "
              stroke="#726451"
              stroke-width="2"
              fill="transparent"
            />
          </g>
          <rect
            x="0"
            y="0"
            width="128"
            height="64"
            fill="#595a55"
            :clip-path="`url(#boundingBoxClip-${uniqueId})`"
            class="osrs-flat-button-inner"
          />
          <g>
            <foreignObject
              x="10"
              y="8"
              height="48px"
              width="48px"
            >
              <img
                :class="skill"
                height="48px"
                width="48px"
              />
            </foreignObject>
          </g>
          <g v-show="!editing">
            <text
              x="80"
              y="20"
              dominant-baseline="central"
              text-anchor="middle"
              class="osrs-text-plain-11 osrs-text-modified"
            >
              {{ level }}
            </text>
            <line
              x1="75"
              y1="50"
              x2="110"
              y2="15"
              stroke="black"
              stroke-width="2"
            />
            <text
              x="105"
              y="45"
              dominant-baseline="central"
              text-anchor="middle"
              class="osrs-text-plain-11 osrs-text-modified"
            >
              {{ level }}
            </text>
          </g>
          <g v-show="editing">
            <foreignObject
              x="50%"
              y="0"
              width="64"
              height="64"
            >
              <input
                ref="skillEditInput"
                v-model="newLevel"
                class="skill-edit-input osrs-text-plain-11"
                type="text"
                min="0"
                max="99"
                @keyup="keyUp($event)"
                @blur="stopEditing"
              >
            </foreignObject>
          </g>
        </svg>
      </template>
      <span>Click to edit</span>
    </osrs-tooltip>
  </div>
</template>

<script>
import OsrsTooltip from '../OsrsTooltip.vue';

export default {
  name: 'OsrsSkillTile',
  components: { OsrsTooltip },
  props: {
    skill: {
      type: String,
      default: undefined,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      uniqueId: Math.random().toString().replace('.', '-'),
      showSkillEditDialog: false,
      editing: false,
      newLevel: 1,
    };
  },
  computed: {
    // getImageSrc() {
    //   const capitalizedName = capitalize(this.skill);
    //   return require(`../../assets/osrs/${capitalizedName} icon.png`);
    // },
  },
  methods: {
    editSkill() {
      if (!this.editing) {
        this.newLevel = this.level;
        this.editing = true;
      }
      this.$nextTick(() => {
        this.$refs.skillEditInput.focus();
        this.$refs.skillEditInput.select();
      });
    },
    stopEditing() {
      this.editing = false;
      let level = Number(this.newLevel) || 1;
      if (level > 99) {
        level = 99;
      } else if (level < 1) {
        level = 1;
      }
      this.$emit('update:level', level);
    },
    keyUp(event) {
      if (event.key === 'Enter') {
        this.stopEditing();
      }
    },
  },
};
</script>

<style scoped>
.osrs-skill-tile {
  cursor: pointer;
  user-select: none;
}

.osrs-text-modified {
  fill: var(--osrs-yellow);
  font-size: 32px;
}

.skill-edit-input {
  appearance: none;
  outline: none;
  color: var(--osrs-yellow);
  font-size: 44px;
  width: 64px;
  height: 64px;
  text-align: center;
}

img.attack {
  content: url('../../static/osrs/Attack icon.png');
}

img.strength {
  content: url('../../static/osrs/Strength icon.png');
}

img.defence {
  content: url('../../static/osrs/Defence icon.png');
}

img.ranged {
  content: url('../../static/osrs/Ranged icon.png');
}

img.prayer {
  content: url('../../static/osrs/Prayer icon.png');
}

img.magic {
  content: url('../../static/osrs/Magic icon.png');
}

img.runecraft {
  content: url('../../static/osrs/Runecraft icon.png');
}

img.construction {
  content: url('../../static/osrs/Construction icon.png');
}

img.hitpoints {
  content: url('../../static/osrs/Hitpoints icon.png');
}

img.agility {
  content: url('../../static/osrs/Agility icon.png');
}

img.herblore {
  content: url('../../static/osrs/Herblore icon.png');
}

img.thieving {
  content: url('../../static/osrs/Thieving icon.png');
}

img.crafting {
  content: url('../../static/osrs/Crafting icon.png');
}

img.fletching {
  content: url('../../static/osrs/Fletching icon.png');
}

img.slayer {
  content: url('../../static/osrs/Slayer icon.png');
}

img.hunter {
  content: url('../../static/osrs/Hunter icon.png');
}

img.mining {
  content: url('../../static/osrs/Mining icon.png');
}

img.smithing {
  content: url('../../static/osrs/Smithing icon.png');
}

img.fishing {
  content: url('../../static/osrs/Fishing icon.png');
}

img.cooking {
  content: url('../../static/osrs/Cooking icon.png');
}

img.firemaking {
  content: url('../../static/osrs/Firemaking icon.png');
}

img.woodcutting {
  content: url('../../static/osrs/Woodcutting icon.png');
}

img.farming {
  content: url('../../static/osrs/Farming icon.png');
}

img.strength {
  content: url('../../static/osrs/Strength icon.png');
}

img.strength {
  content: url('../../static/osrs/Strength icon.png');
}

img.strength {
  content: url('../../static/osrs/Strength icon.png');
}

</style>
