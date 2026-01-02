<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  value: number
  maxValue: number
  index: number
}>()

const percentage = computed(() => (props.value / props.maxValue) * 100)

const barColor = computed(() => {
  if (props.value >= 150) return '#00ff88'
  if (props.value >= 100) return '#00d4ff'
  if (props.value >= 70) return '#ffd93d'
  if (props.value >= 50) return '#ff9f43'
  return '#ff6b6b'
})
</script>

<template>
  <div 
    class="stat-bar"
    :style="{ '--delay': `${index * 100}ms` }"
  >
    <div class="stat-bar__header">
      <span class="stat-bar__name">{{ name }}</span>
      <span class="stat-bar__value">{{ value }}</span>
    </div>
    <div class="stat-bar__track">
      <div 
        class="stat-bar__fill"
        :style="{ 
          width: `${percentage}%`,
          '--bar-color': barColor
        }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stat-bar {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: $space-2;
  }

  &__name {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__value {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    font-family: $font-mono;
    color: $color-text-primary;
  }

  &__track {
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: $radius-full;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, var(--bar-color), lighten(#00d4ff, 10%));
    border-radius: $radius-full;
    box-shadow: 0 0 10px var(--bar-color);
    transform-origin: left;
    animation: fill-bar 0.8s ease-out forwards;
    animation-delay: var(--delay, 0ms);
    transform: scaleX(0);
  }
}

@keyframes fill-bar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>

