<script setup lang="ts">
defineProps<{
  name: string
  value: number
}>()
</script>

<template>
  <div class="stat">
    <span class="stat__name">{{ name }}</span>
    <span class="stat__value">{{ value }}</span>
  </div>
</template>

<style lang="scss" scoped>
.stat {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: $space-3;
  font-family: $font-display;
  font-size: $font-size-base;
  border-bottom: 2px dotted darken($color-screen-bg, 10%);
  
  &__name {
    text-transform: uppercase;
    font-size: $font-size-sm;
    color: $color-screen-text-light;
  }
  
  &__value {
    font-weight: $font-weight-regular;
    font-size: $font-size-lg;
    color: $color-screen-text;
  }
}
</style>
