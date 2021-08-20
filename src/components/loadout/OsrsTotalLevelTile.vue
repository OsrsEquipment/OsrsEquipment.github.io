<template>
  <svg
    viewBox="0 0 128 64"
    preserveAspectRatio="xMinYMin meet"
    class="osrs-skill-tile"
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
      class="osrs-total-level-tile-inner"
    />
    <text
      x="50%"
      y="22"
      dominant-baseline="central"
      text-anchor="middle"
      class="osrs-text-plain-11 osrs-text-modified"
    >
      Total level:
    </text>
    <text
      x="50%"
      y="47"
      dominant-baseline="central"
      text-anchor="middle"
      class="osrs-text-plain-11 osrs-text-modified"
    >
      {{ total }}
    </text>
  </svg>
</template>

<script>
export default {
  name: 'OsrsTotalLevelTile',
  props: {
    total: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      uniqueId: Math.random().toString().replace('.', '_'),
    };
  },
};
</script>

<style scoped>
.osrs-text-modified {
  fill: var(--osrs-yellow);
  font-size: 32px;
}

.osrs-total-level-tile-inner {
  fill: black;
}
</style>
