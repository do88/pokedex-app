<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div class="spinner" :class="`spinner--${size || 'md'}`">
    <div class="spinner__ring">
      <div class="spinner__pokeball">
        <div class="spinner__pokeball-top" />
        <div class="spinner__pokeball-line" />
        <div class="spinner__pokeball-center" />
        <div class="spinner__pokeball-bottom" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;

  &--sm {
    --size: 32px;
  }

  &--md {
    --size: 48px;
  }

  &--lg {
    --size: 64px;
  }

  &__ring {
    width: var(--size);
    height: var(--size);
    animation: rotate 1s linear infinite;
  }

  &__pokeball {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    border: 3px solid $color-text-primary;
    box-shadow: 
      inset 0 0 10px rgba(0, 0, 0, 0.3),
      0 0 20px rgba($color-accent-cyan, 0.3);
  }

  &__pokeball-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
  }

  &__pokeball-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  }

  &__pokeball-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background: $color-text-primary;
    transform: translateY(-50%);
    z-index: 1;
  }

  &__pokeball-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30%;
    height: 30%;
    background: white;
    border: 3px solid $color-text-primary;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 50%;
      background: $color-accent-cyan;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: pulse-glow 1s ease-in-out infinite;
    }
  }
}
</style>

